# The AI Interface Museum

A visual history of how humans learned to interact with AI.

The museum follows one chronological timeline from 2011 onward. Entries are selected for adoption and cultural impact first, with technical and interaction novelty as supporting evidence. Distinct product generations become separate artifacts when they introduce a genuinely different interface.

The collection currently spans chat, voice, vision, canvas, code, search, recommendation, ambient computing, audio, video, computer use, agents, autonomous vehicles, and embodied systems.

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

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the artifact standard, research and image requirements, development workflow, and pull request checklist.

## License

The source code is available under the [MIT License](LICENSE). Product names, marks, and archival imagery remain the property of their respective owners and are included for historical and editorial reference.
