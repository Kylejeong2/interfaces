# The AI Interface Museum

A visual history of how humans learned to interact with AI.

The museum follows one chronological timeline from 2011 onward. Entries are selected for adoption and cultural impact first, with technical and interaction novelty as supporting evidence. Distinct product generations become separate artifacts when they introduce a genuinely different interface.

The collection currently spans chat, voice, vision, canvas, code, search, recommendation, ambient computing, audio, video, computer use, agents, autonomous vehicles, and embodied systems.

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

Add interface captures to `public/artifacts/` and use a descriptive `product-year.ext` filename.

Prefer, in order:

1. an official product screenshot
2. a frame from an official product demo or launch video
3. a clearly dated capture from a reputable publication

Do not submit logos, promotional key art, AI-generated replacements, or images that do not show the interface. Include the page or video URL that establishes provenance and write alt text that describes the visible interface rather than the product name alone.

Product names, marks, and images remain the property of their respective owners. This project uses them for historical and editorial documentation.

## Development

The site is a single-route TanStack Start application.

```bash
pnpm install
pnpm dev
```

Run the same checks as CI before committing:

```bash
pnpm check
pnpm build
```

The Husky pre-commit hook runs formatting and lint checks. If it fails, run `pnpm format`, review the resulting changes, and commit again.

## Contributing

1. Fork the repository and create a focused branch.
2. Install the pinned toolchain with `pnpm install`.
3. Add or update the artifact in `src/data/artifacts.ts`.
4. Add the interface capture to `public/artifacts/` and reference it through `imageUrl` and `imageAlt`.
5. Run the site with `pnpm dev` and inspect the card and expanded detail view.
6. Run `pnpm check` and `pnpm build`.
7. Open a pull request that explains why the interface belongs in the timeline and links every source used.

### Pull request checklist

- [ ] The contribution documents a meaningful interface change, not only a model or company launch.
- [ ] The release date, lineage, and impact claims are supported by linked sources.
- [ ] The screenshot is a real interface capture with traceable provenance.
- [ ] The image has useful alt text and loads in both the timeline card and detail view.
- [ ] `pnpm check` and `pnpm build` pass locally.
- [ ] The pull request stays focused on one artifact or one coherent improvement.

The collection is intentionally opinionated. A well-researched proposal may still be declined if it repeats an existing interaction pattern or lacks enough evidence of adoption and influence.

## License

The source code is available under the [MIT License](LICENSE). Product names, marks, and archival imagery remain the property of their respective owners and are included for historical and editorial reference.
