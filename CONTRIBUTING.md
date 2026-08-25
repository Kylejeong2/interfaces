# Contributing to The AI Interface Museum

The museum documents interfaces that changed how people understand or interact with AI. Contributions should make a clear historical case, use traceable evidence, and preserve the collection's opinionated scope.

## What belongs in the museum

We prioritize interfaces that changed a behavior, established a durable pattern, or brought an existing interaction model to a large audience.

Adoption and cultural impact carry the most weight. Interaction novelty, technical novelty, and influence on later products strengthen the case. A product with little usage needs unusually clear evidence that its interface shaped what came next.

A product generation can be its own artifact when the human interaction changed meaningfully. ChatGPT Canvas, for example, is distinct from the original ChatGPT chat interface because it moved the work into a persistent editing surface beside the conversation.

## Look beyond chat

AI interfaces are larger than prompt boxes. Contributions can document how people:

- speak and listen through assistants, live voice, translation, and generated audio
- see and point through cameras, visual search, spatial interfaces, and screen understanding
- write and program through inline completion, code agents, terminals, and intent-based editing
- make through image, video, music, 3D, and multimodal canvases
- search and discover through answer engines, recommendations, predictive cards, and personalized feeds
- delegate through agents, computer use, background work, and multi-agent coordination
- coexist with ambient systems in homes, devices, vehicles, wearables, and operating systems
- act through robots, autonomous vehicles, and other embodied systems

These are prompts, not a closed taxonomy. If an interface exposes a new relationship between human intent and machine behavior, make the case for it.

## Artifact standard

Every proposed artifact needs:

- the earliest defensible public release date and the precision of that date
- the product edition or interface generation being documented
- a short description of what the person sees, hears, or controls
- what changed relative to the preceding interface
- a product lineage that connects predecessors and successors
- evidence of adoption, cultural impact, or downstream influence
- interaction forms and product layers from the existing taxonomy
- links to primary announcements, documentation, demos, or launch videos
- a real historical interface image with clear provenance

Use first-party sources for release claims whenever possible. Reporting and archived sources can fill gaps, but the pull request should state what remains uncertain.

## Images and provenance

Add interface captures to `public/artifacts/` and use a descriptive `product-year.webp` filename. New PNG, JPEG, and other raster formats are not accepted.

Prefer, in order:

1. an official product screenshot
2. a frame from an official product demo or launch video
3. a clearly dated capture from a reputable publication

Do not submit logos, promotional key art, AI-generated replacements, or images that do not show the interface. Include the page or video URL that establishes provenance and write alt text that describes the visible interface rather than the product name alone.

Product names, marks, and images remain the property of their respective owners. This project uses them for historical and editorial documentation.

### Image format and performance

Every artifact image needs 2 WebP files with the same base name:

- `product-year.webp` is the full-size image used in the expanded detail view. Keep it at or below 1600 px wide.
- `product-year-thumb.webp` is the timeline image. Keep it at or below 640 px wide.

Preserve the source aspect ratio and do not upscale a smaller capture. In `src/data/artifacts.ts`, point `imageUrl` to the full-size file. The timeline derives the `-thumb.webp` path automatically, so a pull request that adds only one file will leave one of the views without an image.

You can use `cwebp` to create both variants. These commands are appropriate when the source is wider than the target size:

```bash
cwebp -q 84 -m 6 -sharp_yuv -resize 1600 0 source.png -o public/artifacts/product-year.webp
cwebp -q 82 -m 6 -sharp_yuv -resize 640 0 source.png -o public/artifacts/product-year-thumb.webp
```

If the source is already narrower than a target, omit `-resize` for that variant. Inspect both files after conversion, especially screenshots with small text, thin lines, or gradients. Compression should reduce transfer and decode cost without making the historical interface harder to read.

Before opening a pull request, confirm that `public/artifacts/` contains only WebP captures and that every full-size image has a matching thumbnail:

```bash
find public/artifacts -type f ! -name '*.webp'

for image in public/artifacts/*.webp; do
  case "$image" in *-thumb.webp) continue ;; esac
  test -f "${image%.webp}-thumb.webp" || echo "Missing thumbnail for $image"
done
```

The command should print nothing.

## Contributor workflow

1. Fork the repository and create a focused branch.
2. Install the pinned toolchain with `pnpm install`.
3. Add or update the artifact in `src/data/artifacts.ts`.
4. Add full-size and thumbnail WebP captures to `public/artifacts/`, then reference the full-size file through `imageUrl` and describe it through `imageAlt`.
5. Run the site with `pnpm dev` and inspect the card and expanded detail view.
6. Run `pnpm check` and `pnpm build`.
7. Open a pull request that explains why the interface belongs in the timeline and links every source used.

## Pull request checklist

- [ ] The contribution documents a meaningful interface change, not only a model or company launch.
- [ ] The release date, lineage, and impact claims are supported by linked sources.
- [ ] The screenshot is a real interface capture with traceable provenance.
- [ ] The full-size and `-thumb` images are WebP files with useful alt text.
- [ ] Both image variants load in the timeline card and expanded detail view without visible compression damage.
- [ ] `pnpm check` and `pnpm build` pass locally.
- [ ] The pull request stays focused on one artifact or one coherent improvement.

The collection is intentionally opinionated. A well-researched proposal may still be declined if it repeats an existing interaction pattern or lacks enough evidence of adoption and influence.
