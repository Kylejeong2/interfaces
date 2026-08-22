import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import { ArtifactVisual } from './ArtifactVisual'
import type { CSSProperties, KeyboardEvent } from 'react'
import type { Artifact } from '#/data/artifacts'

type ConstellationTimelineProps = {
  artifacts: ReadonlyArray<Artifact>
  onSelect: (artifact: Artifact) => void
}

export function ConstellationTimeline({
  artifacts,
  onSelect,
}: ConstellationTimelineProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [focusIndex, setFocusIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const orderedArtifacts = useMemo(
    () => [...artifacts].sort((a, b) => a.date.localeCompare(b.date)),
    [artifacts],
  )
  const { scrollXProgress } = useScroll({ container: viewportRef })
  const progress = useSpring(scrollXProgress, {
    stiffness: 82,
    damping: 19,
    mass: 0.5,
  })
  const atmosphereX = useTransform(progress, [0, 1], ['0%', '-18%'])

  const moveFocus = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, orderedArtifacts.length - 1))
    setFocusIndex(nextIndex)
    nodeRefs.current[nextIndex]?.focus()
    nodeRefs.current[nextIndex]?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  const onNodeKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveFocus(index + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveFocus(index - 1)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      moveFocus(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      moveFocus(orderedArtifacts.length - 1)
    }
  }

  if (orderedArtifacts.length === 0) {
    return <p className="constellation-empty">Archive in progress.</p>
  }

  return (
    <div
      className="constellation-timeline"
      ref={viewportRef}
      role="region"
      aria-label="AI interface chronology"
      tabIndex={0}
    >
      <motion.div
        className="constellation-atmosphere"
        style={reduceMotion ? undefined : { x: atmosphereX }}
        aria-hidden="true"
      />
      <div
        className="constellation-track"
        style={{ '--node-count': orderedArtifacts.length } as CSSProperties}
      >
        <motion.div
          className="constellation-axis"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <motion.span
            className="constellation-progress"
            style={{ scaleX: progress }}
          />
          <span className="constellation-pulse" />
        </motion.div>

        {orderedArtifacts.map((artifact, index) => {
          const side = index % 2 === 0 ? 'above' : 'below'
          const startsYear =
            index === 0 || orderedArtifacts[index - 1]?.year !== artifact.year

          return (
            <div
              className="constellation-slot"
              data-side={side}
              key={artifact.id}
              style={{ '--accent': artifact.accent } as CSSProperties}
            >
              {startsYear && (
                <motion.span
                  className="constellation-year"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: side === 'above' ? 34 : -34 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: viewportRef, once: true, amount: 0.5 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                >
                  {artifact.year}
                </motion.span>
              )}
              <span className="constellation-stem" aria-hidden="true" />
              <span className="constellation-dot" aria-hidden="true" />
              <motion.button
                ref={(node) => {
                  nodeRefs.current[index] = node
                }}
                className="constellation-card"
                type="button"
                tabIndex={focusIndex === index ? 0 : -1}
                layoutId={`card-${artifact.id}`}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: side === 'above' ? 74 : -74,
                        rotateZ: side === 'above' ? -4 : 4,
                        filter: 'blur(14px)',
                        scale: 0.58,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateZ: side === 'above' ? -1.2 : 1.2,
                  filter: 'blur(0px)',
                  scale: 1,
                }}
                viewport={{ root: viewportRef, once: true, amount: 0.25 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: side === 'above' ? -12 : 12,
                        rotateZ: 0,
                        scale: 1.055,
                      }
                }
                whileFocus={{ scale: 1.025 }}
                transition={{ type: 'spring', stiffness: 135, damping: 17 }}
                onFocus={() => setFocusIndex(index)}
                onKeyDown={(event) => onNodeKeyDown(event, index)}
                onClick={() => onSelect(artifact)}
              >
                <ArtifactVisual artifact={artifact} />
                <span className="constellation-caption">
                  <strong>{artifact.name}</strong>
                  <small>{artifact.edition}</small>
                </span>
              </motion.button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
