import type { Artifact } from '#/data/artifacts'

export function ArtifactVisual({
  artifact,
  expanded = false,
}: {
  artifact: Artifact
  expanded?: boolean
}) {
  if (artifact.imageUrl) {
    const imageUrl = expanded
      ? artifact.imageUrl
      : artifact.imageUrl.replace(/\.webp$/, '-thumb.webp')

    return (
      <div
        className="artifact-visual artifact-visual--image"
        style={{ '--accent': artifact.accent } as React.CSSProperties}
      >
        <img
          src={imageUrl}
          alt={artifact.imageAlt ?? `${artifact.name} interface`}
          loading={expanded ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    )
  }

  return (
    <div
      className={`artifact-visual artifact-visual--${artifact.visual} ${expanded ? 'artifact-visual--expanded' : ''}`}
      style={{ '--accent': artifact.accent } as React.CSSProperties}
      aria-label={`A graphic reconstruction of the ${artifact.name} interface`}
      role="img"
    >
      <div className="interface-chrome">
        <span />
        <span />
        <span />
        <strong>{artifact.name}</strong>
      </div>
      <VisualBody artifact={artifact} />
      <span className="reconstruction-label">Graphic reconstruction</span>
    </div>
  )
}

function VisualBody({ artifact }: { artifact: Artifact }) {
  switch (artifact.visual) {
    case 'voice':
      return (
        <div className="voice-ui">
          <div className="voice-orb">
            <i />
            <i />
            <i />
          </div>
          <div className="waveform">
            {Array.from({ length: 19 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
          <p>Listening…</p>
        </div>
      )
    case 'cards':
      return (
        <div className="cards-ui">
          <div className="search-pill">Good morning</div>
          <div className="info-card info-card--large">
            <span>8:42</span>
            <strong>24°</strong>
            <small>12 min to work</small>
          </div>
          <div className="info-row">
            <div className="info-card" />
            <div className="info-card" />
          </div>
        </div>
      )
    case 'vision':
      return (
        <div className="vision-ui">
          <div className="vision-scene">
            <div className="focus-box">
              <span>Recognized</span>
            </div>
          </div>
          <div className="vision-query">
            What am I looking at?<b>↗</b>
          </div>
        </div>
      )
    case 'canvas':
      return (
        <div className="canvas-ui">
          <div className="canvas-sidebar">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="canvas-stage">
            <div className="canvas-object canvas-object--one" />
            <div className="canvas-object canvas-object--two" />
            <div className="canvas-prompt">Describe a change…</div>
          </div>
        </div>
      )
    case 'code':
      return (
        <div className="code-ui">
          <div className="code-files">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="code-editor">
            {Array.from({ length: 9 }, (_, index) => (
              <i
                key={index}
                style={{ width: `${42 + ((index * 17) % 48)}%` }}
              />
            ))}
            <div className="code-suggestion">
              <span>AI</span>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      )
    case 'search':
      return (
        <div className="search-ui">
          <div className="search-input">
            Ask anything <span>⌘ ↵</span>
          </div>
          <div className="search-heading">Here’s what I found</div>
          <p>
            <b>1</b> Intelligence becomes easier to inspect when the answer
            carries its sources.
          </p>
          <div className="citation-row">
            <i>1</i>
            <i>2</i>
            <i>3</i>
          </div>
        </div>
      )
    case 'agent':
      return (
        <div className="agent-ui">
          <div className="agent-browser">
            <div className="browser-bar">
              <i />
              <span>Working in a new tab</span>
            </div>
            <div className="browser-page">
              <div />
              <div />
              <div />
              <b className="cursor">↖</b>
            </div>
          </div>
          <div className="agent-trace">
            <span className="agent-dot" />
            <p>Task in progress</p>
            <small>3 steps completed</small>
          </div>
        </div>
      )
    default:
      return (
        <div className="chat-ui">
          <div className="chat-mark">{artifact.name.slice(0, 1)}</div>
          <div className="message message--user">
            Can you help me understand this?
          </div>
          <div className="message message--ai">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="composer">
            Message {artifact.name}
            <span>↑</span>
          </div>
        </div>
      )
  }
}
