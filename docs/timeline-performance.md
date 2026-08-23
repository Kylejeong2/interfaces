# Timeline performance

The timeline benchmark measures the complete 2011–2026 scroll in a production build. It drives the page from the beginning to the end of the sticky timeline over six seconds, while Chrome records animation frames and main-thread rendering work.

## Results

These are the median results from seven trials at 1440×900 and device scale factor 1 in Chrome 151 on macOS. Both versions used the same benchmark script and production server configuration.

| Metric                         |   Before |    After | Result                     |
| ------------------------------ | -------: | -------: | -------------------------- |
| Frame rate                     |  120 FPS |  120 FPS | Maintained                 |
| Average frame time             |  8.33 ms |  8.33 ms | Maintained                 |
| p95 frame time                 |  9.10 ms |  9.10 ms | Maintained                 |
| Frames over 16.7 ms            |        0 |        0 | No regression              |
| Long tasks                     |        0 |        0 | No regression              |
| Style recalculations           |    1,037 |      872 | 15.9% fewer                |
| Style recalculation time       | 70.29 ms | 66.17 ms | 5.9% less                  |
| Initial route JavaScript, gzip | 65.81 kB | 46.16 kB | 29.9% smaller              |
| React Doctor warnings          |        8 |        4 | 4 motion warnings resolved |

Process-wide task duration varied with local machine load and is intentionally excluded from the improvement claims. The frame, long-task, style, and bundle measurements above were stable enough to use as acceptance criteria.

## Changes

- Motion features are loaded on demand through `LazyMotion`; the full feature bundle is deferred into its own chunk.
- The moving atmospheric layer became static, removing a second scroll-linked transform.
- Card reveals no longer animate CSS blur, which avoids an expensive raster effect while preserving their position, rotation, opacity, and scale motion.
- Timeline cards no longer apply backdrop blur or unnecessary 3D transform preservation.
- Timeline images use lazy loading and asynchronous decoding; expanded artifact images remain eager.
- The scroll spring remains in place. Directly mapping scroll progress to the track was profiled and produced more main-thread work, so it was rejected.

## Reproduce the benchmark

Build and serve the production application:

```bash
pnpm build
PORT=4173 HOST=127.0.0.1 node .output/server/index.mjs
```

In another terminal, run:

```bash
pnpm benchmark:timeline
```

The harness defaults to five trials. Its environment variables can change the target URL, trial count, duration, or Chrome binary:

```bash
TIMELINE_BENCHMARK_TRIALS=7 \
TIMELINE_BENCHMARK_URL=http://127.0.0.1:4173 \
pnpm benchmark:timeline
```

Use `node scripts/benchmark-timeline.mjs --json` when machine-readable output is needed.
