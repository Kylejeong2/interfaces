import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArtifactVisual } from './ArtifactVisual'
import type { CSSProperties, KeyboardEvent } from 'react'
import type { Artifact } from '#/data/artifacts'

type ConstellationTimelineProps = {
  artifacts: ReadonlyArray<Artifact>
  onSelect: (artifact: Artifact) => void
}

const shortDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const shortMonth = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function ConstellationTimeline({
  artifacts,
  onSelect,
}: ConstellationTimelineProps) {
  const scrollSectionRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [focusIndex, setFocusIndex] = useState(0)
  const [scrollDistance, setScrollDistance] = useState(0)
  const reduceMotion = useReducedMotion()
  const orderedArtifacts = useMemo(
    () => [...artifacts].sort((a, b) => a.date.localeCompare(b.date)),
    [artifacts],
  )
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 82,
    damping: 19,
    mass: 0.5,
  })
  const trackX = useTransform(progress, [0, 1], [0, -scrollDistance])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const measure = () => {
      setScrollDistance(Math.max(0, track.scrollWidth - viewport.clientWidth))
    }
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(track)
    measure()

    return () => observer.disconnect()
  }, [orderedArtifacts.length])

  const moveFocus = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, orderedArtifacts.length - 1))
    setFocusIndex(nextIndex)
    const node = nodeRefs.current[nextIndex]
    const viewport = viewportRef.current
    const section = scrollSectionRef.current
    const slot = node?.parentElement
    if (!node || !slot || !viewport || !section) return

    node.focus({ preventScroll: true })
    const targetX = Math.max(
      0,
      Math.min(
        slot.offsetLeft + slot.offsetWidth / 2 - viewport.clientWidth / 2,
        scrollDistance,
      ),
    )
    const progressToNode = scrollDistance === 0 ? 0 : targetX / scrollDistance
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const verticalTravel = section.offsetHeight - window.innerHeight
    window.scrollTo({
      top: sectionTop + verticalTravel * progressToNode,
      behavior: reduceMotion ? 'auto' : 'smooth',
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
      className="constellation-scroll"
      ref={scrollSectionRef}
      style={
        { '--timeline-scroll-distance': `${scrollDistance}px` } as CSSProperties
      }
    >
      <div
        className="constellation-timeline"
        ref={viewportRef}
        role="region"
        aria-label="AI interface chronology"
        tabIndex={0}
      >
        <div className="constellation-atmosphere" aria-hidden="true" />
        <m.div
          ref={trackRef}
          className="constellation-track"
          style={
            {
              '--node-count': orderedArtifacts.length,
              x: trackX,
            } as CSSProperties
          }
        >
          <m.div
            className="constellation-axis"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <m.span
              className="constellation-progress"
              style={{ scaleX: progress }}
            />
            <span className="constellation-pulse" />
          </m.div>

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
                  <m.span
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
                  </m.span>
                )}
                <span className="constellation-stem" aria-hidden="true" />
                <span className="constellation-dot" aria-hidden="true" />
                <m.button
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
                          scale: 0.58,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateZ: side === 'above' ? -1.2 : 1.2,
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
                  <span className="constellation-date">
                    {formatReleaseDate(artifact)}
                  </span>
                  <ArtifactVisual artifact={artifact} />
                  <span className="constellation-caption">
                    <strong>{artifact.name}</strong>
                    <small>{artifact.edition}</small>
                  </span>
                </m.button>
              </div>
            )
          })}
        </m.div>
      </div>
    </div>
  )
}

function formatReleaseDate(artifact: Artifact) {
  const date = new Date(`${artifact.date}T00:00:00Z`)
  return artifact.datePrecision === 'month'
    ? shortMonth.format(date)
    : shortDate.format(date)
}
