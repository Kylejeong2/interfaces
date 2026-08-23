import { spawn } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const url = process.env.TIMELINE_BENCHMARK_URL ?? 'http://127.0.0.1:4173'
const chromium =
  process.env.CHROMIUM_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : 'chromium')
const trials = Number(process.env.TIMELINE_BENCHMARK_TRIALS ?? 5)
const durationMs = Number(process.env.TIMELINE_BENCHMARK_DURATION_MS ?? 6000)
const profile = process.argv.includes('--json') ? false : true

async function main() {
  const userDataDir = await mkdtemp(join(tmpdir(), 'timeline-benchmark-'))
  const browser = spawn(
    chromium,
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${userDataDir}`,
      '--window-size=1440,900',
      '--force-device-scale-factor=1',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-features=Translate,BackForwardCache',
      '--no-first-run',
      '--no-default-browser-check',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  )
  const browserExit = new Promise((resolve) => browser.once('exit', resolve))

  try {
    const websocketUrl = await waitForWebSocket(browser)
    const cdp = new CdpConnection(websocketUrl)
    await cdp.ready

    const results = []
    for (let index = 0; index < trials; index += 1) {
      results.push(await runTrial(cdp, index + 1))
    }

    const summary = summarize(results)
    const report = {
      benchmark: 'timeline-scroll',
      url,
      viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
      durationMs,
      trials,
      summary,
      results,
    }

    if (profile) printReport(report)
    else process.stdout.write(`${JSON.stringify(report)}\n`)

    await cdp.close()
  } finally {
    if (browser.exitCode === null) browser.kill('SIGTERM')
    await browserExit
    await rm(userDataDir, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    })
  }
}

async function runTrial(cdp, trial) {
  const { targetId } = await cdp.send('Target.createTarget', {
    url: 'about:blank',
  })
  const { sessionId } = await cdp.send('Target.attachToTarget', {
    targetId,
    flatten: true,
  })

  try {
    await cdp.send('Page.enable', {}, sessionId)
    await cdp.send('Runtime.enable', {}, sessionId)
    await cdp.send('Performance.enable', {}, sessionId)
    await cdp.send('Page.bringToFront', {}, sessionId)
    await cdp.send(
      'Emulation.setDeviceMetricsOverride',
      {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      },
      sessionId,
    )
    await cdp.send('Page.navigate', { url }, sessionId)
    await waitForPage(cdp, sessionId)

    const before = toMetricMap(
      (await cdp.send('Performance.getMetrics', {}, sessionId)).metrics,
    )
    const result = await evaluate(
      cdp,
      sessionId,
      `(${scrollBenchmark.toString()})(${durationMs})`,
      true,
    )
    const after = toMetricMap(
      (await cdp.send('Performance.getMetrics', {}, sessionId)).metrics,
    )

    return {
      trial,
      ...result,
      mainThread: {
        taskMs: delta(after, before, 'TaskDuration') * 1000,
        scriptMs: delta(after, before, 'ScriptDuration') * 1000,
        layoutMs: delta(after, before, 'LayoutDuration') * 1000,
        styleMs: delta(after, before, 'RecalcStyleDuration') * 1000,
        layouts: delta(after, before, 'LayoutCount'),
        styleRecalculations: delta(after, before, 'RecalcStyleCount'),
        heapBeforeMb: (before.get('JSHeapUsedSize') ?? 0) / (1024 * 1024),
        heapAfterMb: (after.get('JSHeapUsedSize') ?? 0) / (1024 * 1024),
        heapDeltaMb: delta(after, before, 'JSHeapUsedSize') / (1024 * 1024),
      },
    }
  } finally {
    await cdp.send('Target.closeTarget', { targetId })
  }
}

async function waitForPage(cdp, sessionId) {
  const deadline = Date.now() + 20_000
  while (Date.now() < deadline) {
    const ready = await evaluate(
      cdp,
      sessionId,
      `document.readyState === 'complete' && document.querySelectorAll('.constellation-card').length > 0`,
    )
    if (ready) {
      await evaluate(
        cdp,
        sessionId,
        `Promise.all([document.fonts.ready, ...Array.from(document.images, image => { image.loading = 'eager'; return image.decode().catch(() => undefined) })]).then(() => new Promise(resolve => setTimeout(() => resolve(true), 500)))`,
        true,
      )
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error(`Timeline did not become ready at ${url}`)
}

function scrollBenchmark(duration) {
  return new Promise((resolve) => {
    const section = document.querySelector('.constellation-scroll')
    const timeline = document.querySelector('.constellation-timeline')
    const track = document.querySelector('.constellation-track')
    if (!section || !timeline || !track) {
      throw new Error('Timeline benchmark selectors are missing')
    }

    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const verticalTravel = section.offsetHeight - window.innerHeight
    window.scrollTo(0, sectionTop)

    const longTasks = []
    const longFrames = []
    const observers = []
    for (const [type, output] of [
      ['longtask', longTasks],
      ['long-animation-frame', longFrames],
    ]) {
      try {
        const observer = new PerformanceObserver((list) => {
          output.push(...list.getEntries().map((entry) => entry.duration))
        })
        observer.observe({ type, buffered: true })
        observers.push(observer)
      } catch {
        // The metrics stay optional on browsers without this entry type.
      }
    }

    const deltas = []
    let startedAt
    let previousAt

    requestAnimationFrame(function step(now) {
      startedAt ??= now
      previousAt ??= now
      deltas.push(now - previousAt)
      previousAt = now

      const progress = Math.min((now - startedAt) / duration, 1)
      window.scrollTo(0, sectionTop + verticalTravel * progress)

      if (progress < 1) {
        requestAnimationFrame(step)
        return
      }

      requestAnimationFrame(() => {
        observers.forEach((observer) => observer.disconnect())
        const sorted = deltas.slice(1).sort((a, b) => a - b)
        const elapsedMs = now - startedAt
        resolve({
          elapsedMs,
          frameCount: sorted.length,
          fps: sorted.length / (elapsedMs / 1000),
          averageFrameMs:
            sorted.reduce((total, value) => total + value, 0) / sorted.length,
          p95FrameMs: percentile(sorted, 0.95),
          p99FrameMs: percentile(sorted, 0.99),
          framesOverBudget: sorted.filter((value) => value > 16.7).length,
          framesOver50Ms: sorted.filter((value) => value > 50).length,
          longestFrameMs: sorted.at(-1) ?? 0,
          longTaskCount: longTasks.length,
          longTaskMs: longTasks.reduce((total, value) => total + value, 0),
          longAnimationFrameCount: longFrames.length,
          longAnimationFrameMs: longFrames.reduce(
            (total, value) => total + value,
            0,
          ),
          horizontalTravelPx: track.scrollWidth - timeline.clientWidth,
          verticalTravelPx: verticalTravel,
        })
      })
    })

    function percentile(values, quantile) {
      if (values.length === 0) return 0
      return values[
        Math.min(values.length - 1, Math.floor(values.length * quantile))
      ]
    }
  })
}

function summarize(results) {
  const paths = [
    'fps',
    'averageFrameMs',
    'p95FrameMs',
    'p99FrameMs',
    'framesOverBudget',
    'framesOver50Ms',
    'longTaskCount',
    'longTaskMs',
    'longAnimationFrameCount',
    'longAnimationFrameMs',
    'mainThread.taskMs',
    'mainThread.scriptMs',
    'mainThread.layoutMs',
    'mainThread.styleMs',
    'mainThread.layouts',
    'mainThread.styleRecalculations',
    'mainThread.heapBeforeMb',
    'mainThread.heapAfterMb',
    'mainThread.heapDeltaMb',
  ]

  return Object.fromEntries(
    paths.map((path) => {
      const values = results
        .map((result) => readPath(result, path))
        .sort((a, b) => a - b)
      return [path, median(values)]
    }),
  )
}

function printReport(report) {
  const rows = Object.entries(report.summary).map(([metric, value]) => ({
    metric,
    median: Number(value.toFixed(2)),
  }))
  console.log(`Timeline scroll benchmark: ${report.url}`)
  console.log(
    `${report.trials} trials · ${report.durationMs} ms · ${report.viewport.width}×${report.viewport.height}`,
  )
  console.table(rows)
}

function toMetricMap(metrics) {
  return new Map(metrics.map(({ name, value }) => [name, value]))
}

function delta(after, before, name) {
  return (after.get(name) ?? 0) - (before.get(name) ?? 0)
}

function readPath(value, path) {
  return path.split('.').reduce((current, key) => current[key], value)
}

function median(values) {
  const middle = Math.floor(values.length / 2)
  return values.length % 2 === 0
    ? (values[middle - 1] + values[middle]) / 2
    : values[middle]
}

function waitForWebSocket(child) {
  return new Promise((resolve, reject) => {
    let output = ''
    const timeout = setTimeout(
      () => reject(new Error(`Chromium did not expose CDP. ${output}`)),
      10_000,
    )
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (chunk) => {
      output += chunk
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/)
      if (!match) return
      clearTimeout(timeout)
      resolve(match[1])
    })
    child.once('exit', (code) => {
      clearTimeout(timeout)
      reject(
        new Error(`Chromium exited before CDP was ready (${code}). ${output}`),
      )
    })
  })
}

async function evaluate(cdp, sessionId, expression, awaitPromise = false) {
  const response = await cdp.send(
    'Runtime.evaluate',
    {
      expression,
      awaitPromise,
      returnByValue: true,
    },
    sessionId,
  )
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.text)
  }
  return response.result.value
}

class CdpConnection {
  nextId = 1
  pending = new Map()

  constructor(url) {
    this.socket = new WebSocket(url)
    this.ready = new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true })
      this.socket.addEventListener('error', reject, { once: true })
    })
    this.socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data)
      if (!message.id) return
      const pending = this.pending.get(message.id)
      if (!pending) return
      this.pending.delete(message.id)
      if (message.error) pending.reject(new Error(message.error.message))
      else pending.resolve(message.result ?? {})
    })
  }

  async send(method, params = {}, sessionId) {
    await this.ready
    const id = this.nextId++
    const message = { id, method, params }
    if (sessionId) message.sessionId = sessionId
    this.socket.send(JSON.stringify(message))
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
    })
  }

  close() {
    if (this.socket.readyState === WebSocket.CLOSED) return Promise.resolve()
    return new Promise((resolve) => {
      const timeout = setTimeout(resolve, 1000)
      this.socket.addEventListener(
        'close',
        () => {
          clearTimeout(timeout)
          resolve()
        },
        { once: true },
      )
      this.socket.close()
    })
  }
}

await main()
await new Promise((resolve) => process.stdout.write('', resolve))
process.exit(0)
