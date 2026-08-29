import type { Artifact, InteractionForm, ProductLayer } from './artifacts'

const formKeywords: Record<InteractionForm, ReadonlyArray<string>> = {
  Chat: ['chatbot', 'conversation', 'messaging', 'prompt', 'text'],
  Voice: ['speech', 'speaking', 'spoken', 'microphone', 'talking', 'listening'],
  Vision: ['camera', 'image', 'multimodal', 'sight', 'visual understanding'],
  Canvas: ['workspace', 'editor', 'document', 'creative surface', 'split pane'],
  Code: ['coding', 'programming', 'developer', 'IDE', 'autocomplete'],
  Search: ['answer engine', 'web', 'research', 'citations', 'retrieval'],
  Agents: ['agentic', 'automation', 'delegate', 'tasks', 'autonomous'],
  'Computer use': [
    'browser',
    'screen',
    'cursor',
    'clicking',
    'keyboard control',
  ],
  Ambient: ['proactive', 'background', 'context aware', 'always on'],
  Video: ['film', 'filmmaking', 'moving image', 'generative video'],
  Audio: ['music', 'sound', 'podcast', 'generative audio'],
  Embodied: ['robot', 'robotics', 'vehicle', 'physical', 'spatial'],
  Recommendation: [
    'feed',
    'discovery',
    'personalization',
    'ranking',
    'algorithm',
  ],
}

const layerKeywords: Record<ProductLayer, ReadonlyArray<string>> = {
  Assistant: ['copilot', 'helper', 'personal assistant'],
  'Creative tool': ['creation', 'generative media', 'maker tool'],
  'Developer tool': ['software development', 'engineering', 'coding tool'],
  'Consumer product': ['consumer app', 'everyday product'],
  'Search engine': ['answers', 'information retrieval', 'web search'],
  Device: ['hardware', 'gadget'],
  'Knowledge tool': ['documents', 'knowledge work', 'productivity'],
  'Embodied system': ['robotics', 'autonomy', 'physical world'],
}

const artifactKeywords: Record<string, ReadonlyArray<string>> = {
  'siri-2011': ['iOS', 'iPhone', 'mobile assistant'],
  'google-now-2012': ['predictive cards', 'Android', 'anticipatory computing'],
  'amazon-echo-2014': ['Alexa', 'smart speaker', 'wake word'],
  'spotify-discover-weekly-2015': ['Spotify', 'playlist', 'music discovery'],
  'tesla-autopilot-2015': ['driver assistance', 'dashboard', 'self driving'],
  'google-photos-2015': ['photo library', 'semantic image search'],
  'google-duplex-2018': ['phone call', 'restaurant booking', 'voice agent'],
  'tiktok-for-you-2018': ['For You page', 'FYP', 'interest graph'],
  'waymo-one-2018': ['robotaxi', 'self driving car', 'driverless ride'],
  'gpt3-playground-2020': ['OpenAI API', 'prompt engineering', 'completion'],
  'dall-e-2021': ['text to image', 'image generation'],
  'github-copilot-2021': ['inline completion', 'pair programmer'],
  'dall-e-2-2022': ['inpainting', 'outpainting', 'image editing'],
  'midjourney-discord-2022': ['Discord bot', 'text to image'],
  'stable-diffusion-2022': ['open source image generation', 'local model'],
  'character-ai-2022': ['characters', 'roleplay', 'personality'],
  'chatgpt-2022': ['OpenAI', 'LLM', 'large language model'],
  'perplexity-2022': ['answer engine', 'cited answers'],
  'new-bing-2023': ['Microsoft', 'Bing Chat', 'search chatbot'],
  'cursor-inline-2023': ['Cmd K', 'AI code editor', 'inline edit'],
  'gpt4-vision-2023': ['GPT-4V', 'image understanding'],
  'v0-2023': ['generative UI', 'frontend', 'React interface'],
  'rabbit-r1-2024': ['AI hardware', 'large action model', 'pocket device'],
  'gpt4o-2024': ['advanced voice mode', 'real time multimodal'],
  'claude-artifacts-2024': ['Anthropic', 'preview', 'generated app'],
  'gemini-live-2024': ['Google Gemini', 'live conversation'],
  'notebooklm-audio-2024': ['Audio Overview', 'AI podcast', 'sources'],
  'chatgpt-canvas-2024': ['writing editor', 'coding workspace'],
  'computer-use-2024': ['Anthropic', 'screen control', 'desktop automation'],
  'sora-2024': ['storyboard', 'text to video'],
  'operator-2025': ['OpenAI', 'browser agent', 'web automation'],
  'deep-research-2025': ['research agent', 'long running task', 'report'],
  'claude-code-2025': ['terminal', 'CLI', 'coding agent'],
  'manus-2025': ['cloud computer', 'general agent'],
  'chatgpt-images-2025': ['4o images', 'native image generation'],
  'codex-2025': ['OpenAI coding agent', 'cloud coding'],
  'flow-2025': ['Google filmmaking', 'Veo', 'movie making'],
  'chatgpt-agent-2025': ['OpenAI agent mode', 'browser automation'],
  'suno-studio-2025': ['song generation', 'multitrack', 'music editor'],
  'claude-cowork-2026': ['Anthropic', 'desktop agent', 'knowledge work'],
  'figure-helix-2026': ['humanoid', 'whole body autonomy'],
  'codex-app-2026': ['multi agent', 'coding command center'],
  'openclaw-2026': [
    'open source',
    'self hosted',
    'Clawdbot',
    'Moltbot',
    'lobster',
    'gateway',
    'Telegram',
    'WhatsApp',
    'messaging agent',
  ],
  'hermes-agent-2026': [
    'Nous Research',
    'self improving',
    'learning loop',
    'skills',
    'memory',
    'open source agent',
    'Hermes Desktop',
    'TUI',
  ],
  'poke-2026': [
    'Interaction Company',
    'iMessage',
    'Apple Messages',
    'SMS agent',
    'personal agent',
    'proactive assistant',
    'recipes',
    'texting',
  ],
  'instinct-2026': [
    'Spear Street Technology',
    'iMessage',
    'WhatsApp',
    'email agent',
    'personal agent',
    'personal operator',
    'persistent assistant',
    'connected services',
    'no new interfaces',
    'texting',
  ],
}

export function getArtifactSearchKeywords(artifact: Artifact) {
  return Array.from(
    new Set([
      artifact.name,
      artifact.maker,
      artifact.edition,
      artifact.year.toString(),
      ...artifact.forms,
      ...artifact.layers,
      ...artifact.forms.flatMap((form) => formKeywords[form]),
      ...artifact.layers.flatMap((layer) => layerKeywords[layer]),
      ...(artifactKeywords[artifact.id] ?? []),
    ]),
  )
}

export function searchArtifacts(
  artifacts: ReadonlyArray<Artifact>,
  query: string,
  limit = 10,
) {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) {
    return [...artifacts]
      .sort(
        (a, b) => b.popularity - a.popularity || b.date.localeCompare(a.date),
      )
      .slice(0, limit)
  }

  const compactQuery = compact(normalizedQuery)
  const terms = normalizedQuery.split(' ').filter(Boolean)

  return artifacts
    .map((artifact) => {
      const normalizedName = normalize(artifact.name)
      const normalizedMaker = normalize(artifact.maker)
      const normalizedEdition = normalize(artifact.edition)
      const normalizedKeywords =
        getArtifactSearchKeywords(artifact).map(normalize)
      const searchableText = normalize(
        [
          ...normalizedKeywords,
          artifact.description,
          artifact.changed,
          artifact.impact,
          artifact.lineage,
        ].join(' '),
      )
      const matchesTerms = terms.every((term) => searchableText.includes(term))
      const matchesCompact = compact(searchableText).includes(compactQuery)
      if (!matchesTerms && !matchesCompact) return null

      let score = artifact.popularity / 100
      if (normalizedName === normalizedQuery) score += 120
      else if (normalizedName.startsWith(normalizedQuery)) score += 80
      else if (normalizedName.includes(normalizedQuery)) score += 55
      if (normalizedMaker === normalizedQuery) score += 45
      else if (normalizedMaker.includes(normalizedQuery)) score += 25
      if (normalizedEdition.includes(normalizedQuery)) score += 30
      if (compact(normalizedName).includes(compactQuery)) score += 45

      for (const term of terms) {
        if (normalizedName.includes(term)) score += 18
        if (normalizedMaker.includes(term)) score += 10
        if (normalizedEdition.includes(term)) score += 8
        if (normalizedKeywords.some((keyword) => keyword.includes(term)))
          score += 5
      }

      return { artifact, score }
    })
    .filter(
      (result): result is { artifact: Artifact; score: number } => !!result,
    )
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.artifact.popularity - a.artifact.popularity ||
        a.artifact.date.localeCompare(b.artifact.date),
    )
    .slice(0, limit)
    .map((result) => result.artifact)
}

function normalize(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function compact(value: string) {
  return value.replace(/\s+/g, '')
}
