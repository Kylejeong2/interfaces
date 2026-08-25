import { AnimatePresence, LazyMotion, m } from 'motion/react'
import { useEffect, useState } from 'react'
import { ArtifactSearch } from './ArtifactSearch'
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

const loadMotionFeatures = () =>
  import('../motion-features').then((module) => module.default)

export function Museum() {
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!activeArtifact && !searchOpen) return
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [activeArtifact, searchOpen])

  useEffect(() => {
    if (!activeArtifact) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (searchOpen) return
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
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeArtifact, searchOpen])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <main className="museum-shell museum-shell--constellation">
        <section className="hero" id="top">
          <button
            className="search-trigger"
            type="button"
            onMouseDown={(event) => {
              event.preventDefault()
              setSearchOpen(true)
            }}
            onClick={() => setSearchOpen(true)}
            aria-label="Search interfaces"
          >
            <span>Search interfaces</span>
            <kbd>⌘K</kbd>
          </button>
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
          <p>
            Built by Kyle Jeong
            <br />© 2026
          </p>
        </footer>

        <AnimatePresence>
          {activeArtifact && (
            <ArtifactDetail
              artifact={activeArtifact}
              onClose={() => setActiveArtifact(null)}
            />
          )}
          {searchOpen && (
            <ArtifactSearch
              artifacts={artifacts}
              onClose={() => setSearchOpen(false)}
              onSelect={(artifact) => {
                setActiveArtifact(artifact)
                setSearchOpen(false)
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </LazyMotion>
  )
}

function ArtifactDetail({
  artifact,
  onClose,
}: {
  artifact: Artifact
  onClose: () => void
}) {
  return (
    <m.div
      className="detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      onMouseDown={onClose}
    >
      <m.article
        className="artifact-detail"
        layoutId={`card-${artifact.id}`}
        transition={{
          layout: {
            type: 'spring',
            stiffness: 260,
            damping: 30,
            mass: 0.7,
          },
        }}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="artifact-title"
      >
        <div className="detail-toolbar">
          <div>
            <strong>
              {artifact.year} / {artifact.name}
            </strong>
          </div>
          <div className="detail-controls">
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
      </m.article>
    </m.div>
  )
}

function formatArtifactDate(artifact: Artifact) {
  const date = new Date(`${artifact.date}T00:00:00Z`)
  return artifact.datePrecision === 'month'
    ? formatMonth.format(date)
    : formatDate.format(date)
}
