import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ArtifactVisual } from './ArtifactVisual'
import { ConstellationTimeline } from './ConstellationTimeline'
import type { Artifact } from '#/data/artifacts'
import { artifacts } from '#/data/artifacts'

const formatDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const formatMonth = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function Museum() {
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null)

  useEffect(() => {
    if (!activeArtifact) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveArtifact(null)
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const index = artifacts.findIndex(
          (artifact) => artifact.id === activeArtifact.id,
        )
        const offset = event.key === 'ArrowRight' ? 1 : -1
        const next =
          artifacts[(index + offset + artifacts.length) % artifacts.length]
        setActiveArtifact(next)
      }
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeArtifact])

  return (
    <main className="museum-shell museum-shell--constellation">
      <section className="hero" id="top">
        <p className="eyebrow">A living collection of machine interfaces</p>
        <h1>
          <span>The AI</span>
          <span>Interface Museum</span>
        </h1>
        <div className="hero-footer">
          <p className="hero-thesis">
            A visual history of how humans learned to talk to, look through,
            create with, and delegate work to artificial intelligence.
          </p>
          <a href="#collection" className="explore-link">
            Explore the collection <span>↓</span>
          </a>
        </div>
      </section>

      <section className="collection" id="collection">
        <ConstellationTimeline
          artifacts={artifacts}
          onSelect={setActiveArtifact}
        />
      </section>

      <footer className="museum-footer">
        <div>
          <span>AIM</span>
          <p>
            The interfaces change.
            <br />
            The human intent persists.
          </p>
        </div>
        <div>
          <p>
            Research-led
            <br />
            Read-only
            <br />
            Continuously revised
          </p>
        </div>
        <div>
          <p>
            Built in California
            <br />© {new Date().getFullYear()} Kyle Jeong
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {activeArtifact && (
          <ArtifactDetail
            artifact={activeArtifact}
            onClose={() => setActiveArtifact(null)}
            onPrevious={() =>
              setActiveArtifact(getAdjacent(artifacts, activeArtifact, -1))
            }
            onNext={() =>
              setActiveArtifact(getAdjacent(artifacts, activeArtifact, 1))
            }
          />
        )}
      </AnimatePresence>
    </main>
  )
}

function ArtifactDetail({
  artifact,
  onClose,
  onPrevious,
  onNext,
}: {
  artifact: Artifact
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <motion.div
      className="detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.article
        className="artifact-detail"
        layoutId={`card-${artifact.id}`}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="artifact-title"
      >
        <div className="detail-toolbar">
          <div>
            <span>Artifact</span>
            <strong>
              {artifact.year} / {artifact.name}
            </strong>
          </div>
          <div className="detail-controls">
            <button
              onClick={onPrevious}
              type="button"
              aria-label="Previous artifact"
            >
              ←
            </button>
            <button onClick={onNext} type="button" aria-label="Next artifact">
              →
            </button>
            <button onClick={onClose} type="button" aria-label="Close artifact">
              Close <span>×</span>
            </button>
          </div>
        </div>
        <div className="detail-visual-wrap">
          <ArtifactVisual artifact={artifact} expanded />
        </div>
        <div className="detail-copy">
          <div className="detail-heading">
            <p>
              {artifact.maker} · {formatArtifactDate(artifact)}
            </p>
            <h2 id="artifact-title">{artifact.name}</h2>
            <h3>{artifact.edition}</h3>
          </div>
          <div className="detail-story">
            <p className="detail-description">{artifact.description}</p>
            <div className="detail-section">
              <span>What changed</span>
              <p>{artifact.changed}</p>
            </div>
            <div className="detail-section">
              <span>Why it mattered</span>
              <p>{artifact.impact}</p>
            </div>
            <div className="detail-section">
              <span>Product lineage</span>
              <p className="lineage">{artifact.lineage}</p>
            </div>
          </div>
        </div>
        <div className="detail-footer">
          <div className="detail-taxonomy">
            <span>Interaction</span>
            <p>{artifact.forms.join(' · ')}</p>
            <span>Product layer</span>
            <p>{artifact.layers.join(' · ')}</p>
          </div>
          <div className="source-list">
            <span>Original material</span>
            {artifact.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
              >
                <em>{source.kind === 'watch' ? 'Watch' : 'Source'}</em>
                {source.label}
                <b>↗</b>
              </a>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

function getAdjacent(items: Array<Artifact>, active: Artifact, offset: number) {
  const index = items.findIndex((artifact) => artifact.id === active.id)
  return items[(index + offset + items.length) % items.length] ?? active
}

function formatArtifactDate(artifact: Artifact) {
  const date = new Date(`${artifact.date}T00:00:00Z`)
  return artifact.datePrecision === 'month'
    ? formatMonth.format(date)
    : formatDate.format(date)
}
