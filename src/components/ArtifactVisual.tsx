import type { Artifact } from '#/data/artifacts'

export function ArtifactVisual({
  artifact,
  expanded = false,
}: {
  artifact: Artifact
  expanded?: boolean
}) {
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
        alt={artifact.imageAlt}
        loading={expanded ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
