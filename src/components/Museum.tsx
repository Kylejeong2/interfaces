import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { ArtifactVisual } from './ArtifactVisual'
import type { Artifact, InteractionForm } from '#/data/artifacts'
import { artifacts, interactionForms } from '#/data/artifacts'

const formatDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export function Museum() {
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null)
  const [activeForm, setActiveForm] = useState<'All' | InteractionForm>('All')

  const filteredArtifacts = useMemo(
    () =>
      artifacts.filter(
        (artifact) =>
          activeForm === 'All' || artifact.forms.includes(activeForm),
      ),
    [activeForm],
  )

  const years = useMemo(() => {
    return filteredArtifacts.reduce<
      Array<{ year: number; artifacts: Array<Artifact> }>
    >((groups, artifact) => {
      const current = groups.at(-1)
      if (current?.year === artifact.year) current.artifacts.push(artifact)
      else groups.push({ year: artifact.year, artifacts: [artifact] })
      return groups
    }, [])
  }, [filteredArtifacts])

  useEffect(() => {
    if (!activeArtifact) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveArtifact(null)
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const index = filteredArtifacts.findIndex(
          (artifact) => artifact.id === activeArtifact.id,
        )
        const offset = event.key === 'ArrowRight' ? 1 : -1
        const next =
          filteredArtifacts[
            (index + offset + filteredArtifacts.length) %
              filteredArtifacts.length
          ]
        setActiveArtifact(next)
      }
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeArtifact, filteredArtifacts])

  return (
    <main className="museum-shell">
      <header className="museum-header">
        <a
          className="museum-wordmark"
          href="#top"
          aria-label="The AI Interface Museum home"
        >
          <span>AIM</span>
          <span>Archive № 001</span>
        </a>
        <div className="header-meta">
          <span>2011—2026</span>
          <span>{artifacts.length} artifacts</span>
          <span>Curated by Kyle Jeong</span>
        </div>
      </header>

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
        <div className="collection-intro">
          <p>Chronological index</p>
          <p>
            Selected for adoption, cultural impact, and the interaction they
            made possible.
          </p>
          <p className="collection-count">
            Showing {filteredArtifacts.length.toString().padStart(2, '0')}
          </p>
        </div>

        <nav className="filter-rail" aria-label="Filter by interaction form">
          {interactionForms.map((form) => (
            <button
              key={form}
              className={activeForm === form ? 'is-active' : ''}
              onClick={() => setActiveForm(form)}
              type="button"
            >
              {form}
              <sup>
                {form === 'All'
                  ? artifacts.length
                  : artifacts.filter((artifact) =>
                      artifact.forms.includes(form),
                    ).length}
              </sup>
            </button>
          ))}
        </nav>

        <div className="timeline">
          {years.map((yearGroup) => (
            <section
              className="year-group"
              key={yearGroup.year}
              aria-labelledby={`year-${yearGroup.year}`}
            >
              <div className="year-marker">
                <h2 id={`year-${yearGroup.year}`}>{yearGroup.year}</h2>
                <span>
                  {yearGroup.artifacts.length.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="artifact-grid">
                {yearGroup.artifacts.map((artifact) => (
                  <motion.button
                    className={`artifact-card ${artifact.popularity >= 94 ? 'artifact-card--major' : ''}`}
                    key={artifact.id}
                    onClick={() => setActiveArtifact(artifact)}
                    type="button"
                    layoutId={`card-${artifact.id}`}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="card-index">
                      <span>{artifact.date.slice(5).replace('-', '.')}</span>
                      {artifact.popularity >= 93 && (
                        <span className="landmark-label">Landmark</span>
                      )}
                    </div>
                    <ArtifactVisual artifact={artifact} />
                    <div className="card-caption">
                      <div>
                        <h3>{artifact.name}</h3>
                        <p>{artifact.edition}</p>
                      </div>
                      <span className="open-mark">↗</span>
                    </div>
                    <div className="card-tags">
                      {artifact.forms.slice(0, 3).map((form) => (
                        <span key={form}>{form}</span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>
          ))}
        </div>
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
              setActiveArtifact(
                getAdjacent(filteredArtifacts, activeArtifact, -1),
              )
            }
            onNext={() =>
              setActiveArtifact(
                getAdjacent(filteredArtifacts, activeArtifact, 1),
              )
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
              {artifact.maker} ·{' '}
              {formatDate.format(new Date(`${artifact.date}T00:00:00Z`))}
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
