import { motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import type { Artifact } from '#/data/artifacts'
import { searchArtifacts } from '#/data/artifact-search'

type ArtifactSearchProps = {
  artifacts: ReadonlyArray<Artifact>
  onClose: () => void
  onSelect: (artifact: Artifact) => void
}

const resultDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function ArtifactSearch({
  artifacts,
  onClose,
  onSelect,
}: ArtifactSearchProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultRefs = useRef<Array<HTMLButtonElement | null>>([])
  const results = useMemo(
    () => searchArtifacts(artifacts, query),
    [artifacts, query],
  )
  const activeResult = results.at(activeIndex)

  useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    resultRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setActiveIndex(0)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) =>
        Math.max(0, Math.min(index + 1, results.length - 1)),
      )
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
      return
    }
    if (event.key === 'Enter' && activeResult) {
      event.preventDefault()
      onSelect(activeResult)
    }
  }

  const stopPropagation = (event: MouseEvent) => event.stopPropagation()

  return (
    <motion.div
      className="search-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      onKeyDown={handleKeyDown}
    >
      <motion.section
        className="search-palette"
        initial={{ opacity: 0, y: -18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.985 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        onMouseDown={stopPropagation}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
      >
        <div className="search-input-row">
          <span aria-hidden="true">⌕</span>
          <label className="visually-hidden" htmlFor="artifact-search-input">
            Search interfaces
          </label>
          <input
            id="artifact-search-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={changeQuery}
            placeholder="Search interfaces, forms, or makers…"
            autoComplete="off"
            role="combobox"
            aria-expanded="true"
            aria-controls="artifact-search-results"
            aria-activedescendant={
              activeResult ? `search-result-${activeResult.id}` : undefined
            }
          />
          <kbd>Esc</kbd>
        </div>

        <div className="search-summary">
          <p id="search-title">
            {query ? 'Best matches' : 'Popular interfaces'}
          </p>
          <span>{artifacts.length} artifacts</span>
        </div>

        <div
          className="search-results"
          id="artifact-search-results"
          role="listbox"
        >
          {results.length ? (
            results.map((artifact, index) => (
              <button
                id={`search-result-${artifact.id}`}
                key={artifact.id}
                ref={(node) => {
                  resultRefs.current[index] = node
                }}
                className="search-result"
                data-active={index === activeIndex}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onSelect(artifact)}
              >
                <span className="search-result-date">
                  {resultDate.format(new Date(`${artifact.date}T00:00:00Z`))}
                </span>
                <span className="search-result-title">
                  <strong>{artifact.name}</strong>
                  <small>{artifact.edition}</small>
                </span>
                <span className="search-result-meta">
                  {artifact.maker} · {artifact.forms.slice(0, 2).join(' · ')}
                </span>
                <span className="search-result-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))
          ) : (
            <div className="search-empty">
              <strong>No interface found</strong>
              <p>
                Try a product, maker, year, or form like “voice” or “agent.”
              </p>
            </div>
          )}
        </div>

        <div className="search-footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> Navigate
          </span>
          <span>
            <kbd>↵</kbd> Open
          </span>
        </div>
      </motion.section>
    </motion.div>
  )
}
