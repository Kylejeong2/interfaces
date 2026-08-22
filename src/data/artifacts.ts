export type InteractionForm =
  | 'Chat'
  | 'Voice'
  | 'Vision'
  | 'Canvas'
  | 'Code'
  | 'Search'
  | 'Agents'
  | 'Computer use'
  | 'Ambient'
  | 'Video'
  | 'Audio'
  | 'Embodied'
  | 'Recommendation'

export type ProductLayer =
  | 'Assistant'
  | 'Creative tool'
  | 'Developer tool'
  | 'Consumer product'
  | 'Search engine'
  | 'Device'
  | 'Knowledge tool'
  | 'Embodied system'

export type ArtifactSource = {
  label: string
  url: string
  kind: 'source' | 'watch'
}

export type Artifact = {
  id: string
  date: string
  datePrecision?: 'day' | 'month'
  year: number
  name: string
  edition: string
  maker: string
  description: string
  changed: string
  lineage: string
  impact: string
  forms: Array<InteractionForm>
  layers: Array<ProductLayer>
  sources: Array<ArtifactSource>
  popularity: number
  visual:
    | 'voice'
    | 'cards'
    | 'chat'
    | 'vision'
    | 'canvas'
    | 'code'
    | 'search'
    | 'agent'
  accent: string
  imageUrl?: string
  imageAlt?: string
}

export const artifacts: Array<Artifact> = [
  {
    id: 'siri-2011',
    date: '2011-10-04',
    year: 2011,
    name: 'Siri',
    edition: 'iPhone 4S',
    maker: 'Apple',
    description:
      'A voice assistant built directly into the phone, presented as a conversational utility rather than a separate search product.',
    changed:
      'Siri made speaking to software a mainstream behavior. The microphone button became an invitation to ask rather than navigate.',
    lineage:
      'Voice command systems → Siri app → iOS assistant → ambient assistants',
    impact:
      'Bundling Siri with the iPhone 4S put a conversational AI interface into millions of pockets.',
    forms: ['Voice', 'Chat'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 96,
    visual: 'voice',
    accent: '#7d6bff',
    imageUrl: '/artifacts/siri-2011.png',
    imageAlt: 'The original Siri interface in iOS 5',
    sources: [
      {
        label: 'Apple introduces iPhone 4S',
        url: 'https://www.apple.com/newsroom/2011/10/04Apple-Launches-iPhone-4S-iOS-5-iCloud/',
        kind: 'source',
      },
      {
        label: 'Watch the Siri introduction',
        url: 'https://www.youtube.com/watch?v=rNsrl86inpo',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'google-now-2012',
    date: '2012-06-27',
    year: 2012,
    name: 'Google Now',
    edition: 'Predictive cards',
    maker: 'Google',
    description:
      'A stream of contextual cards that surfaced useful information before the user explicitly searched for it.',
    changed:
      'The interface shifted from request and response toward prediction. AI began arranging a personalized feed around context.',
    lineage:
      'Search results → predictive cards → Google Assistant → ambient intelligence',
    impact:
      'Google Now established cards as a durable visual grammar for proactive machine intelligence.',
    forms: ['Ambient', 'Search'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 82,
    visual: 'cards',
    accent: '#5f87ff',
    sources: [
      {
        label: 'Google I/O 2012 keynote',
        url: 'https://www.youtube.com/watch?v=VuC0i4xTyrI',
        kind: 'watch',
      },
      {
        label: 'Google Now overview',
        url: 'https://blog.google/products-and-platforms/platforms/android/android-io-playground-is-open/',
        kind: 'source',
      },
    ],
  },
  {
    id: 'amazon-echo-2014',
    date: '2014-11-01',
    datePrecision: 'month',
    year: 2014,
    name: 'Amazon Echo',
    edition: 'Alexa',
    maker: 'Amazon',
    description:
      'A voice-first assistant with almost no screen, designed to live in the room and respond from across it.',
    changed:
      'Echo detached the assistant from the phone. Wake words, light rings, and spoken confirmations became a new interface system.',
    lineage:
      'Phone assistants → smart speaker → voice ecosystem → ambient computing',
    impact:
      'Echo turned voice interaction into a household behavior and created a major third-party skill ecosystem.',
    forms: ['Voice', 'Ambient'],
    layers: ['Device', 'Assistant'],
    popularity: 94,
    visual: 'voice',
    accent: '#39a8df',
    imageUrl: '/artifacts/amazon-echo.jpg',
    imageAlt: 'The team behind Amazon Alexa with early Echo devices',
    sources: [
      {
        label: 'Introducing Amazon Echo',
        url: 'https://www.youtube.com/watch?v=KkOCeAtKHIc',
        kind: 'watch',
      },
      {
        label: 'Amazon Echo announcement',
        url: 'https://www.aboutamazon.com/news/devices/seven-women-behind-alexa',
        kind: 'source',
      },
    ],
  },
  {
    id: 'google-photos-2015',
    date: '2015-05-28',
    year: 2015,
    name: 'Google Photos',
    edition: 'Semantic search',
    maker: 'Google',
    description:
      'A photo library that let people search their own images by subject, place, and visual concept without manual tagging.',
    changed:
      'Computer vision became an invisible interface layer. A text box could suddenly navigate the visual contents of your life.',
    lineage:
      'Photo folders → automatic organization → semantic visual search → multimodal memory',
    impact:
      'It made large-scale computer vision tangible through an everyday, high-frequency consumer product.',
    forms: ['Vision', 'Search'],
    layers: ['Consumer product'],
    popularity: 91,
    visual: 'vision',
    accent: '#f5b82e',
    imageUrl: '/artifacts/google-photos.png',
    imageAlt: 'The Google Photos interface at launch',
    sources: [
      {
        label: 'Introducing Google Photos',
        url: 'https://blog.google/products-and-platforms/products/photos/picture-this-fresh-approach-to-photos/',
        kind: 'source',
      },
      {
        label: 'Google Photos launch film',
        url: 'https://www.youtube.com/watch?v=ydBjsZnHrwM',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'prisma-2016',
    date: '2016-06-11',
    year: 2016,
    name: 'Prisma',
    edition: 'Neural styles',
    maker: 'Prisma Labs',
    description:
      'A mobile camera interface that transformed ordinary photos into stylized images with a single visual choice.',
    changed:
      'Generative transformation became a consumer gesture: choose an image, tap a style, and wait for the model to reinterpret it.',
    lineage: 'Photo filters → neural style transfer → generative image editing',
    impact:
      'Prisma became a viral demonstration that neural networks could produce a recognizable creative aesthetic.',
    forms: ['Vision', 'Canvas'],
    layers: ['Creative tool', 'Consumer product'],
    popularity: 79,
    visual: 'canvas',
    accent: '#ff4b63',
    sources: [
      {
        label: 'Prisma product history',
        url: 'https://prisma-ai.com/',
        kind: 'source',
      },
      {
        label: 'Prisma demonstration',
        url: 'https://www.youtube.com/watch?v=0Y2JzUYsP2s',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'google-assistant-2016',
    date: '2016-05-18',
    year: 2016,
    name: 'Google Assistant',
    edition: 'Conversational search',
    maker: 'Google',
    description:
      'A cross-device conversational assistant that carried context between turns and across phones, speakers, and services.',
    changed:
      'Search became a dialogue. Follow-up questions and persistent context made the assistant feel less like a command parser.',
    lineage: 'Google Search → Google Now → Assistant → Gemini',
    impact:
      'Assistant brought conversational AI into Android and Google’s growing home-device ecosystem.',
    forms: ['Voice', 'Chat', 'Ambient'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 92,
    visual: 'chat',
    accent: '#4285f4',
    imageUrl: '/artifacts/google-assistant-2016.png',
    imageAlt: 'The original Google Assistant conversational interface',
    sources: [
      {
        label: 'Google Assistant announcement',
        url: 'https://blog.google/products-and-platforms/products/assistant/io-building-next-evolution-of-google/',
        kind: 'source',
      },
      {
        label: 'Google I/O introduction',
        url: 'https://www.youtube.com/watch?v=T8AVN8B3hX8',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'google-lens-2017',
    date: '2017-05-17',
    year: 2017,
    name: 'Google Lens',
    edition: 'Point and understand',
    maker: 'Google',
    description:
      'A camera interface that identified objects, read text, and connected the physical world to search and actions.',
    changed:
      'The camera became an input field. Instead of describing an object, a person could point at it.',
    lineage: 'Image recognition → visual search → multimodal assistants',
    impact:
      'Lens normalized visual querying and later became one of Google’s most-used multimodal surfaces.',
    forms: ['Vision', 'Search'],
    layers: ['Consumer product', 'Search engine'],
    popularity: 89,
    visual: 'vision',
    accent: '#2bb673',
    imageUrl: '/artifacts/google-lens-2017.png',
    imageAlt: 'Google Lens recognizing the world through a phone camera',
    sources: [
      {
        label: 'Google Lens introduction',
        url: 'https://blog.google/innovation-and-ai/products/making-ai-work-for-everyone/',
        kind: 'source',
      },
      {
        label: 'Google I/O Lens demo',
        url: 'https://www.youtube.com/watch?v=7Wlkv_BVQ5E',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'google-duplex-2018',
    date: '2018-05-08',
    year: 2018,
    name: 'Google Duplex',
    edition: 'Calling on your behalf',
    maker: 'Google',
    description:
      'An assistant demonstration that placed a real phone call and negotiated an appointment through natural speech.',
    changed:
      'The AI crossed from answering into acting. The human interface was a request and a confirmation; the agent handled the conversation.',
    lineage:
      'Voice assistant → delegated task → phone agent → autonomous agents',
    impact:
      'The demo became a cultural reference point for both the promise and unease of human-like AI agents.',
    forms: ['Voice', 'Agents'],
    layers: ['Assistant'],
    popularity: 84,
    visual: 'agent',
    accent: '#e65f51',
    imageUrl: '/artifacts/google-duplex-2018.png',
    imageAlt: 'Google Assistant showing a completed Duplex reservation',
    sources: [
      {
        label: 'Google Duplex research and principles',
        url: 'https://ai.googleblog.com/2018/05/duplex-ai-system-for-natural-conversation.html',
        kind: 'source',
      },
      {
        label: 'Google I/O Duplex demo',
        url: 'https://www.youtube.com/watch?v=D5VN56jQMWM',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'smart-compose-2018',
    date: '2018-05-08',
    year: 2018,
    name: 'Smart Compose',
    edition: 'Ghost text',
    maker: 'Google',
    description:
      'Predictive writing embedded inside Gmail as faint inline text that could be accepted with a single keypress.',
    changed:
      'AI stopped demanding a separate destination. It appeared inside the act of writing as a small, reversible suggestion.',
    lineage:
      'Autocomplete → inline generation → AI writing companions → copilots',
    impact:
      'Smart Compose established ghost text as one of the most durable conventions in AI-assisted software.',
    forms: ['Chat'],
    layers: ['Consumer product'],
    popularity: 87,
    visual: 'code',
    accent: '#587df2',
    imageUrl: '/artifacts/smart-compose-2018.png',
    imageAlt: 'Gmail Smart Compose suggesting inline email text',
    sources: [
      {
        label: 'Gmail Smart Compose announcement',
        url: 'https://blog.google/products/gmail/subject-write-emails-faster-smart-compose-gmail/',
        kind: 'source',
      },
      {
        label: 'Smart Compose at Google I/O',
        url: 'https://www.youtube.com/watch?v=9l4EMX-VZgU',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'dall-e-2021',
    date: '2021-01-05',
    year: 2021,
    name: 'DALL·E',
    edition: 'Text becomes image',
    maker: 'OpenAI',
    description:
      'A research interface that paired short written prompts with grids of synthetic images generated from them.',
    changed:
      'Natural language became a creative control surface. A prompt could describe subject, material, composition, and impossible combinations.',
    lineage:
      'Text-conditioned image research → DALL·E 2 → consumer image generation',
    impact:
      'Its result grids gave the public an early visual grammar for understanding text-to-image models.',
    forms: ['Canvas', 'Vision'],
    layers: ['Creative tool'],
    popularity: 85,
    visual: 'canvas',
    accent: '#e4a647',
    sources: [
      {
        label: 'Introducing DALL·E',
        url: 'https://openai.com/index/dall-e/',
        kind: 'source',
      },
      {
        label: 'DALL·E examples',
        url: 'https://www.youtube.com/watch?v=qTgPSKKjfVg',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'github-copilot-2021',
    date: '2021-06-29',
    year: 2021,
    name: 'GitHub Copilot',
    edition: 'Technical preview',
    maker: 'GitHub',
    description:
      'An AI pair programmer embedded in the code editor, proposing lines and whole functions as translucent completions.',
    changed:
      'The model entered the tool where work already happened. Code generation became a tab key rather than a trip to another app.',
    lineage:
      'IDE autocomplete → neural completion → coding copilots → coding agents',
    impact:
      'Copilot made the copilot pattern legible and commercially important across the software industry.',
    forms: ['Code'],
    layers: ['Developer tool'],
    popularity: 94,
    visual: 'code',
    accent: '#8a7cff',
    imageUrl: '/artifacts/github-copilot.png',
    imageAlt: 'GitHub Copilot completing code inside an editor',
    sources: [
      {
        label: 'Introducing GitHub Copilot',
        url: 'https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/',
        kind: 'source',
      },
      {
        label: 'GitHub Copilot demo',
        url: 'https://www.youtube.com/watch?v=iqXnuaZaKxs',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'dall-e-2-2022',
    date: '2022-04-06',
    year: 2022,
    name: 'DALL·E 2',
    edition: 'Generative editing',
    maker: 'OpenAI',
    description:
      'A polished text-to-image product that added variations and inpainting to a prompt-driven generation workflow.',
    changed:
      'The interface moved from generating candidates to iterating on an image. Selection, masking, and variation became part of prompting.',
    lineage: 'DALL·E → generative canvas → ChatGPT image creation',
    impact:
      'DALL·E 2 helped turn text-to-image generation from research spectacle into a broadly understood creative product.',
    forms: ['Canvas', 'Vision'],
    layers: ['Creative tool'],
    popularity: 91,
    visual: 'canvas',
    accent: '#ff795f',
    sources: [
      {
        label: 'DALL·E 2 announcement',
        url: 'https://openai.com/index/dall-e-2/',
        kind: 'source',
      },
      {
        label: 'DALL·E 2 product film',
        url: 'https://www.youtube.com/watch?v=qTgPSKKjfVg',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'midjourney-discord-2022',
    date: '2022-07-12',
    year: 2022,
    name: 'Midjourney',
    edition: 'Discord bot',
    maker: 'Midjourney',
    description:
      'A text-to-image system accessed by typing commands into public Discord channels and choosing among a four-image grid.',
    changed:
      'Creation became social and observable. Prompts, failures, remixes, and techniques unfolded in a shared stream.',
    lineage:
      'Chat bots + image generation → community prompting → web creation canvas',
    impact:
      'Midjourney’s Discord workflow shaped prompt culture and produced one of generative AI’s first mass creative communities.',
    forms: ['Chat', 'Canvas'],
    layers: ['Creative tool'],
    popularity: 93,
    visual: 'canvas',
    accent: '#6a8cff',
    imageUrl: '/artifacts/midjourney-discord-2022.jpg',
    imageAlt: 'Midjourney image generation inside Discord',
    sources: [
      {
        label: 'Midjourney documentation',
        url: 'https://docs.midjourney.com/',
        kind: 'source',
      },
      {
        label: 'Midjourney getting started',
        url: 'https://docs.midjourney.com/hc/en-us/articles/33329232037133-Quick-Start',
        kind: 'source',
      },
    ],
  },
  {
    id: 'chatgpt-2022',
    date: '2022-11-30',
    year: 2022,
    name: 'ChatGPT',
    edition: 'Research preview',
    maker: 'OpenAI',
    description:
      'A sparse chat page that made an instruction-following language model approachable through the most familiar conversational interface on the internet.',
    changed:
      'Chat turned prompting into dialogue. Follow-ups, corrections, and examples allowed people to steer the model without learning a specialized tool.',
    lineage:
      'Chatbots → instruction-tuned LLMs → general assistant → multimodal workspace',
    impact:
      'ChatGPT passed one million registered users in five days and reset expectations for how software could be operated.',
    forms: ['Chat'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 100,
    visual: 'chat',
    accent: '#10a37f',
    sources: [
      {
        label: 'Introducing ChatGPT',
        url: 'https://openai.com/index/chatgpt/',
        kind: 'source',
      },
      {
        label: 'ChatGPT launch thread',
        url: 'https://x.com/OpenAI/status/1598014522098208769',
        kind: 'source',
      },
    ],
  },
  {
    id: 'perplexity-2022',
    date: '2022-12-07',
    year: 2022,
    name: 'Perplexity',
    edition: 'Answer engine',
    maker: 'Perplexity AI',
    description:
      'A conversational search interface that answered directly while keeping numbered citations attached to its claims.',
    changed:
      'The result page became a synthesized answer. Sources moved from blue links into the response itself as inspectable evidence.',
    lineage: 'Web search → answer boxes → cited generation → AI search',
    impact:
      'Perplexity established citations and follow-up questions as core conventions for AI-native search.',
    forms: ['Search', 'Chat'],
    layers: ['Search engine', 'Assistant'],
    popularity: 90,
    visual: 'search',
    accent: '#20a39e',
    sources: [
      {
        label: 'Perplexity product',
        url: 'https://www.perplexity.ai/',
        kind: 'source',
      },
      {
        label: 'Perplexity company story',
        url: 'https://www.perplexity.ai/hub/blog/announcing-our-series-a-funding-round-and-mobile-app-launch',
        kind: 'source',
      },
    ],
  },
  {
    id: 'new-bing-2023',
    date: '2023-02-07',
    year: 2023,
    name: 'The New Bing',
    edition: 'Search plus chat',
    maker: 'Microsoft',
    description:
      'A mainstream search engine rebuilt around an AI answer panel and a separate conversational mode.',
    changed:
      'The browser search box became an entry point into generated synthesis, with the web acting as live context.',
    lineage: 'Bing search → AI answer engine → Copilot',
    impact:
      'Microsoft’s launch turned generative AI into a platform contest and pushed AI answers into a global search product.',
    forms: ['Search', 'Chat'],
    layers: ['Search engine', 'Assistant'],
    popularity: 92,
    visual: 'search',
    accent: '#2176ff',
    imageUrl: '/artifacts/new-bing-2023.png',
    imageAlt: 'The New Bing conversational search interface',
    sources: [
      {
        label: 'Reinventing search with AI',
        url: 'https://news.microsoft.com/source/features/ai/behind-the-scenes-how-the-new-bing-came-to-be/',
        kind: 'source',
      },
      {
        label: 'Microsoft launch event',
        url: 'https://www.youtube.com/watch?v=rOeRWRJ16yY',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'adobe-firefly-2023',
    date: '2023-03-21',
    year: 2023,
    name: 'Adobe Firefly',
    edition: 'Generative Fill',
    maker: 'Adobe',
    description:
      'Generative image models entered Photoshop through contextual prompts, selections, and editable variations.',
    changed:
      'Prompting became one operation inside a professional canvas. The AI worked through existing layer, mask, and selection conventions.',
    lineage:
      'Photoshop tools → content-aware fill → generative fill → AI creative suite',
    impact:
      'Firefly brought generative imaging into the dominant professional creative workflow rather than asking creators to leave it.',
    forms: ['Canvas', 'Vision'],
    layers: ['Creative tool'],
    popularity: 92,
    visual: 'canvas',
    accent: '#e54d4d',
    imageUrl: '/artifacts/adobe-firefly.jpg',
    imageAlt: 'Adobe Firefly generative image interface and outputs',
    sources: [
      {
        label: 'Adobe introduces Firefly',
        url: 'https://news.adobe.com/news/news-details/2023/Adobe-Unveils-Firefly-a-Family-of-new-Creative-Generative-AI/default.aspx',
        kind: 'source',
      },
      {
        label: 'Generative Fill demonstration',
        url: 'https://www.youtube.com/watch?v=Sp6K3qpVFO0',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'gpt4-vision-2023',
    date: '2023-09-25',
    year: 2023,
    name: 'ChatGPT Vision',
    edition: 'See, hear, speak',
    maker: 'OpenAI',
    description:
      'Images and live voice joined the chat composer, allowing people to show the model a problem or speak naturally through it.',
    changed:
      'The attachment button became a new sensory channel. Users could point, annotate, photograph, and talk instead of translating everything into text.',
    lineage:
      'Text chat → image understanding + voice → real-time multimodal assistant',
    impact:
      'ChatGPT made multimodal interaction available inside an already familiar mass-market interface.',
    forms: ['Chat', 'Vision', 'Voice'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 96,
    visual: 'vision',
    accent: '#8d79ff',
    sources: [
      {
        label: 'ChatGPT can now see, hear, and speak',
        url: 'https://openai.com/index/chatgpt-can-now-see-hear-and-speak/',
        kind: 'source',
      },
      {
        label: 'Vision demonstration',
        url: 'https://www.youtube.com/watch?v=--khbXchTeE',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'rabbit-r1-2024',
    date: '2024-01-09',
    year: 2024,
    name: 'Rabbit R1',
    edition: 'AI pocket device',
    maker: 'Rabbit',
    description:
      'A dedicated handheld AI device organized around a push-to-talk button, camera, scroll wheel, and animated assistant.',
    changed:
      'R1 tested whether AI deserved new hardware and a reduced interface built around intent rather than app icons.',
    lineage: 'Voice assistants → dedicated AI hardware → agent devices',
    impact:
      'Its launch and troubled reception became a useful boundary marker for what an AI-first device still needed to prove.',
    forms: ['Voice', 'Vision', 'Agents'],
    layers: ['Device', 'Assistant'],
    popularity: 72,
    visual: 'agent',
    accent: '#ff5b48',
    sources: [
      {
        label: 'Rabbit R1 launch keynote',
        url: 'https://www.youtube.com/watch?v=22wlLy7hKP4',
        kind: 'watch',
      },
      {
        label: 'Rabbit R1 product',
        url: 'https://www.rabbit.tech/rabbit-r1',
        kind: 'source',
      },
    ],
  },
  {
    id: 'sora-2024',
    date: '2024-12-09',
    year: 2024,
    name: 'Sora',
    edition: 'Storyboard interface',
    maker: 'OpenAI',
    description:
      'A standalone generative-video studio combining prompts, uploads, a frame-level storyboard, remixing, blending, and extension.',
    changed:
      'Text-to-video moved from a prompt-and-wait demonstration into a temporal creative interface with direct control over sequence and pacing.',
    lineage:
      'Text-to-image → research video demos → storyboard-based generative video editor',
    impact:
      'The February preview changed expectations for generated video; the December release turned that capability into a public creative product.',
    forms: ['Canvas', 'Vision'],
    layers: ['Creative tool'],
    popularity: 91,
    visual: 'canvas',
    accent: '#ff664f',
    sources: [
      {
        label: 'Sora is here',
        url: 'https://openai.com/index/sora-is-here/',
        kind: 'source',
      },
      {
        label: 'Sora product',
        url: 'https://openai.com/sora/',
        kind: 'source',
      },
    ],
  },
  {
    id: 'claude-artifacts-2024',
    date: '2024-06-20',
    year: 2024,
    name: 'Claude Artifacts',
    edition: 'Chat beside the work',
    maker: 'Anthropic',
    description:
      'A persistent pane beside the conversation where generated documents, code, diagrams, and interactive apps could be viewed and revised.',
    changed:
      'The output escaped the message bubble. Conversation became a control layer beside a living object.',
    lineage: 'Chat response → split-pane artifact → generative workspace',
    impact:
      'Artifacts established the chat-plus-canvas pattern that quickly spread across general-purpose AI products.',
    forms: ['Chat', 'Canvas', 'Code'],
    layers: ['Assistant', 'Creative tool'],
    popularity: 92,
    visual: 'canvas',
    accent: '#d97757',
    imageUrl: '/artifacts/claude-artifacts.png',
    imageAlt:
      'Claude Artifacts split-pane interface with chat and generated code',
    sources: [
      {
        label: 'Introducing Artifacts',
        url: 'https://www.anthropic.com/news/projects',
        kind: 'source',
      },
      {
        label: 'Claude Artifacts demo',
        url: 'https://www.youtube.com/watch?v=k38bAp7GmAQ',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'gemini-live-2024',
    date: '2024-08-13',
    year: 2024,
    name: 'Gemini Live',
    edition: 'Continuous voice',
    maker: 'Google',
    description:
      'A mobile voice conversation designed for interruption, topic changes, and hands-free back-and-forth.',
    changed:
      'Voice interaction became less turn-based. The interface emphasized listening state, interruption, and conversational continuity.',
    lineage:
      'Voice commands → conversational assistant → real-time multimodal dialogue',
    impact:
      'Gemini Live helped make fluid, interruptible voice a standard expectation for frontier assistants.',
    forms: ['Voice', 'Chat'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 88,
    visual: 'voice',
    accent: '#796eff',
    imageUrl: '/artifacts/gemini-live.jpg',
    imageAlt: 'Gemini Live running on a mobile phone',
    sources: [
      {
        label: 'Gemini Live announcement',
        url: 'https://blog.google/products/gemini/made-by-google-gemini-ai-updates/',
        kind: 'source',
      },
      {
        label: 'Gemini Live demonstration',
        url: 'https://www.youtube.com/watch?v=N4rB7vXYU7k',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'notebooklm-audio-2024',
    date: '2024-09-11',
    year: 2024,
    name: 'NotebookLM',
    edition: 'Audio Overviews',
    maker: 'Google',
    description:
      'A research notebook that transformed a private source collection into a conversational, podcast-like audio discussion.',
    changed:
      'Synthesis became a media format. Instead of reading a generated summary, people could listen to two voices unpack their material.',
    lineage:
      'Document Q&A → grounded synthesis → generated audio → interactive audio',
    impact:
      'Audio Overviews went viral and created a recognizable new interface between personal knowledge and generative media.',
    forms: ['Voice', 'Chat'],
    layers: ['Consumer product', 'Assistant'],
    popularity: 90,
    visual: 'voice',
    accent: '#e7a528',
    imageUrl: '/artifacts/notebooklm-audio.png',
    imageAlt: 'NotebookLM Audio Overview player and source notebook',
    sources: [
      {
        label: 'NotebookLM Audio Overviews',
        url: 'https://blog.google/technology/ai/notebooklm-audio-overviews/',
        kind: 'source',
      },
      {
        label: 'NotebookLM product',
        url: 'https://notebooklm.google/',
        kind: 'source',
      },
    ],
  },
  {
    id: 'chatgpt-canvas-2024',
    date: '2024-10-03',
    year: 2024,
    name: 'ChatGPT Canvas',
    edition: 'Writing and coding workspace',
    maker: 'OpenAI',
    description:
      'A side-by-side workspace for editing longer writing and code with targeted inline assistance from ChatGPT.',
    changed:
      'The assistant gained spatial context. Users could select, revise, and directly manipulate a shared document instead of requesting complete replacements.',
    lineage: 'ChatGPT → split-pane artifacts → collaborative AI workspace',
    impact:
      'Canvas marked ChatGPT’s transition from conversational answer box toward a general creation environment.',
    forms: ['Chat', 'Canvas', 'Code'],
    layers: ['Assistant', 'Creative tool'],
    popularity: 90,
    visual: 'canvas',
    accent: '#10a37f',
    sources: [
      {
        label: 'Introducing Canvas',
        url: 'https://openai.com/index/introducing-canvas/',
        kind: 'source',
      },
      {
        label: 'Canvas demonstration',
        url: 'https://www.youtube.com/watch?v=q-qn5N0xWRw',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'computer-use-2024',
    date: '2024-10-22',
    year: 2024,
    name: 'Claude Computer Use',
    edition: 'Screen, cursor, keyboard',
    maker: 'Anthropic',
    description:
      'A model interface for observing screenshots and operating ordinary software through mouse and keyboard actions.',
    changed:
      'Existing graphical interfaces became an API. The visible cursor and action trace made the model’s operation inspectable.',
    lineage:
      'Vision models + tool use → computer control → general software agents',
    impact:
      'The preview made screen-based computer use a concrete product primitive for the broader agent ecosystem.',
    forms: ['Computer use', 'Vision', 'Agents'],
    layers: ['Developer tool', 'Assistant'],
    popularity: 86,
    visual: 'agent',
    accent: '#d97757',
    sources: [
      {
        label: 'Computer use announcement',
        url: 'https://www.anthropic.com/news/3-5-models-and-computer-use',
        kind: 'source',
      },
      {
        label: 'Computer use demonstration',
        url: 'https://www.youtube.com/watch?v=ODaHJzOyVCQ',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'operator-2025',
    date: '2025-01-23',
    year: 2025,
    name: 'Operator',
    edition: 'Browser agent',
    maker: 'OpenAI',
    description:
      'A consumer agent that opened a visible remote browser and completed web tasks while narrating progress and requesting confirmation.',
    changed:
      'The interface made delegation visible. A live browser, cursor, status text, and takeover controls let users supervise work rather than perform each step.',
    lineage:
      'Chat assistant → tool use → computer use → consumer browser agent',
    impact:
      'Operator crystallized the supervised agent interface for everyday web tasks.',
    forms: ['Agents', 'Computer use', 'Vision'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 88,
    visual: 'agent',
    accent: '#111111',
    imageUrl: '/artifacts/operator-2025.png',
    imageAlt: 'Operator working through a task in a visible browser',
    sources: [
      {
        label: 'Introducing Operator',
        url: 'https://openai.com/index/introducing-operator/',
        kind: 'source',
      },
      {
        label: 'Operator research preview',
        url: 'https://www.youtube.com/watch?v=ObutCFdjQYU',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'deep-research-2025',
    date: '2025-02-02',
    year: 2025,
    name: 'Deep Research',
    edition: 'Long-running synthesis',
    maker: 'OpenAI',
    description:
      'A research mode that searched, read, and synthesized many web sources over several minutes before returning a cited report.',
    changed:
      'Waiting became part of the interface. A progress trace showed an AI working through a task whose result arrived later.',
    lineage: 'Cited search → tool-using research → asynchronous knowledge work',
    impact:
      'Deep Research popularized the idea that higher-value AI work could be delegated and observed rather than answered instantly.',
    forms: ['Agents', 'Search'],
    layers: ['Assistant', 'Search engine'],
    popularity: 91,
    visual: 'search',
    accent: '#3266d5',
    imageUrl: '/artifacts/deep-research-2025.png',
    imageAlt: 'ChatGPT Deep Research activity and source panel',
    sources: [
      {
        label: 'Introducing deep research',
        url: 'https://openai.com/index/introducing-deep-research/',
        kind: 'source',
      },
      {
        label: 'Deep research demonstration',
        url: 'https://www.youtube.com/watch?v=jVj6Ryp-DYg',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'claude-code-2025',
    date: '2025-02-24',
    year: 2025,
    name: 'Claude Code',
    edition: 'Terminal agent',
    maker: 'Anthropic',
    description:
      'An agentic coding tool that lived in the terminal, inspected a codebase, edited files, ran commands, and showed its work as a text stream.',
    changed:
      'The command line became a conversational workbench. Permission prompts and diffs turned agentic action into a reviewable loop.',
    lineage:
      'Code completion → editor chat → coding agent → delegated software work',
    impact:
      'Claude Code helped move AI programming from suggestion toward sustained, tool-using implementation.',
    forms: ['Code', 'Agents'],
    layers: ['Developer tool'],
    popularity: 92,
    visual: 'code',
    accent: '#d97757',
    imageUrl: '/artifacts/claude-code-2025.png',
    imageAlt: 'Claude Code running as a terminal coding agent',
    sources: [
      {
        label: 'Claude Code announcement',
        url: 'https://www.anthropic.com/news/claude-3-7-sonnet',
        kind: 'source',
      },
      {
        label: 'Claude Code documentation',
        url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
        kind: 'source',
      },
    ],
  },
  {
    id: 'chatgpt-images-2025',
    date: '2025-03-25',
    year: 2025,
    name: '4o Image Generation',
    edition: 'Images inside chat',
    maker: 'OpenAI',
    description:
      'Native image generation inside ChatGPT that followed conversation context and supported iterative, instruction-based editing.',
    changed:
      'The prompt box stopped being a one-shot image form. Image creation became a conversational thread with memory and revision.',
    lineage: 'DALL·E → multimodal chat → native conversational image creation',
    impact:
      'The release produced a mass wave of image creation and made stylistic transformation a mainstream chat behavior.',
    forms: ['Chat', 'Canvas', 'Vision'],
    layers: ['Creative tool', 'Assistant'],
    popularity: 97,
    visual: 'canvas',
    accent: '#ef8f59',
    sources: [
      {
        label: 'Introducing 4o image generation',
        url: 'https://openai.com/index/introducing-4o-image-generation/',
        kind: 'source',
      },
      {
        label: 'Image generation launch demo',
        url: 'https://www.youtube.com/watch?v=2fDPCxK8G2I',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'manus-2025',
    date: '2025-03-06',
    year: 2025,
    name: 'Manus',
    edition: 'Cloud computer agent',
    maker: 'Butterfly Effect',
    description:
      'A general agent with its own cloud computer that exposed planning and execution while returning websites, reports, files, and other finished artifacts.',
    changed:
      'The interface centered on delegated outcomes. A visible plan and subtask stream turned long-running work into something a user could supervise.',
    lineage:
      'General assistants → tool-using cloud agents → delegated digital work',
    impact:
      'Manus made the general cloud agent culturally legible and later reported millions of users and $100 million in annual recurring revenue.',
    forms: ['Agents', 'Computer use', 'Vision'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 88,
    visual: 'agent',
    accent: '#4978ee',
    sources: [
      {
        label: 'Manus three-month retrospective',
        url: 'https://manus.im/blog/what-we-saw-in-the-past-three-months-and-what-we-see-in-the-future',
        kind: 'source',
      },
      {
        label: 'Manus adoption report',
        url: 'https://manus.im/blog/manus-100m-arr',
        kind: 'source',
      },
    ],
  },
  {
    id: 'codex-2025',
    date: '2025-05-16',
    year: 2025,
    name: 'Codex',
    edition: 'Parallel coding tasks',
    maker: 'OpenAI',
    description:
      'A cloud coding agent interface where multiple repository tasks could run in parallel, each producing logs, patches, and reviewable results.',
    changed:
      'Coding work became a queue of delegated jobs. The central interface shifted from a single chat to parallel task supervision.',
    lineage:
      'Code completion → coding chat → terminal agent → parallel cloud agents',
    impact:
      'Codex made multi-agent task management a first-class interface for software development.',
    forms: ['Code', 'Agents'],
    layers: ['Developer tool'],
    popularity: 89,
    visual: 'agent',
    accent: '#111111',
    sources: [
      {
        label: 'Introducing Codex',
        url: 'https://openai.com/index/introducing-codex/',
        kind: 'source',
      },
      {
        label: 'Codex launch demo',
        url: 'https://www.youtube.com/watch?v=hhdpnbfH6NU',
        kind: 'watch',
      },
    ],
  },
  {
    id: 'flow-2025',
    date: '2025-05-20',
    year: 2025,
    name: 'Flow',
    edition: 'Generative filmmaking',
    maker: 'Google',
    description:
      'A purpose-built filmmaking workspace that joined prompts, reusable visual ingredients, camera controls, scene building, and Veo video generation.',
    changed:
      'Generative video became a scene-based creative workflow. People could direct continuity, movement, and sound instead of submitting a single prompt.',
    lineage:
      'Text-to-video demos → VideoFX and Veo → scene-based generative filmmaking',
    impact:
      'Flow and Veo 3 made synchronized dialogue, sound, and controlled scene construction part of the public expectation for generated video.',
    forms: ['Video', 'Audio', 'Canvas'],
    layers: ['Creative tool'],
    popularity: 86,
    visual: 'canvas',
    accent: '#4578f8',
    imageUrl: '/artifacts/flow.png',
    imageAlt: 'Google Flow generative filmmaking workspace',
    sources: [
      {
        label: 'Introducing Flow',
        url: 'https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/',
        kind: 'source',
      },
      {
        label: 'Veo 3 and generative media models',
        url: 'https://blog.google/innovation-and-ai/products/generative-media-models-io-2025/',
        kind: 'source',
      },
    ],
  },
  {
    id: 'chatgpt-agent-2025',
    date: '2025-07-17',
    year: 2025,
    name: 'ChatGPT Agent',
    edition: 'Thinking and acting',
    maker: 'OpenAI',
    description:
      'One assistant mode that moved between a visual browser, research, terminal work, connected services, and artifact creation.',
    changed:
      'Separate research and browser agents collapsed into one mode. The interface showed the virtual computer and paused for consequential approvals.',
    lineage:
      'Deep Research + Operator → unified assistant agent → general digital work',
    impact:
      'ChatGPT Agent brought research, action, and computer control into the main ChatGPT product rather than a standalone experiment.',
    forms: ['Agents', 'Computer use', 'Search', 'Vision'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 89,
    visual: 'agent',
    accent: '#111111',
    sources: [
      {
        label: 'Introducing ChatGPT agent',
        url: 'https://openai.com/index/introducing-chatgpt-agent/',
        kind: 'source',
      },
      {
        label: 'ChatGPT agent system card',
        url: 'https://openai.com/index/chatgpt-agent-system-card/',
        kind: 'source',
      },
    ],
  },
  {
    id: 'suno-studio-2025',
    date: '2025-09-25',
    year: 2025,
    name: 'Suno Studio',
    edition: 'Generative music canvas',
    maker: 'Suno',
    description:
      'A browser-based multitrack music workspace combining a familiar timeline with generative stems, variations, uploads, and export controls.',
    changed:
      'Music generation moved beyond “prompt and receive a song.” The model became one operation inside a spatial, time-based editing surface.',
    lineage:
      'Prompt-to-song → stems and covers → generative digital audio workstation',
    impact:
      'Studio marked the shift from AI music as a novelty output toward a controllable production workflow.',
    forms: ['Audio', 'Canvas'],
    layers: ['Creative tool'],
    popularity: 80,
    visual: 'canvas',
    accent: '#ff3f7f',
    imageUrl: '/artifacts/suno-studio.png',
    imageAlt: 'Suno Studio multitrack generative music canvas',
    sources: [
      {
        label: 'Introducing Suno Studio',
        url: 'https://suno.com/blog/suno-studio',
        kind: 'source',
      },
      {
        label: 'Suno Studio release notes',
        url: 'https://suno.com/release-notes/introducing-suno-studio',
        kind: 'source',
      },
    ],
  },
  {
    id: 'claude-cowork-2026',
    date: '2026-01-12',
    year: 2026,
    name: 'Claude Cowork',
    edition: 'Desktop knowledge agent',
    maker: 'Anthropic',
    description:
      'A desktop agent that applied Claude Code’s working model to non-code projects through selected local folders, plans, files, and integrations.',
    changed:
      'The filesystem became the canvas. Folder scope, visible plans, and isolated execution gave knowledge workers a way to delegate local work.',
    lineage:
      'Claude Code + file creation + integrations → desktop knowledge-work agent',
    impact:
      'Cowork extended the agent interface beyond software development and into ordinary documents, research, and local project folders.',
    forms: ['Agents', 'Computer use'],
    layers: ['Knowledge tool', 'Assistant'],
    popularity: 81,
    visual: 'agent',
    accent: '#d97757',
    sources: [
      {
        label: 'Introducing Anthropic Labs',
        url: 'https://www.anthropic.com/news/introducing-anthropic-labs',
        kind: 'source',
      },
      {
        label: 'Claude product evolution',
        url: 'https://www.anthropic.com/news/claude-opus-4-6',
        kind: 'source',
      },
    ],
  },
  {
    id: 'figure-helix-2026',
    date: '2026-01-27',
    year: 2026,
    name: 'Figure Helix 02',
    edition: 'Whole-body autonomy',
    maker: 'Figure',
    description:
      'A visual-language-action system demonstrated controlling a humanoid through a long sequence of perception, touch, movement, and physical manipulation.',
    changed:
      'Natural-language goals and a shared physical environment became the interface. The system responded through full-body action rather than pixels alone.',
    lineage:
      'Language-conditioned robotics → upper-body Helix → whole-body embodied agent',
    impact:
      'The demonstration made an embodied AI interface concrete, though its significance is technical novelty rather than mass adoption.',
    forms: ['Embodied', 'Vision', 'Agents'],
    layers: ['Embodied system'],
    popularity: 74,
    visual: 'vision',
    accent: '#f0bd25',
    imageUrl: '/artifacts/helix-02.jpg',
    imageAlt: 'Figure Helix 02 humanoid performing a household task',
    sources: [
      {
        label: 'Helix 02 demonstration',
        url: 'https://www.figure.ai/news/helix-02',
        kind: 'source',
      },
      {
        label: 'The original Helix system',
        url: 'https://www.figure.ai/news/helix',
        kind: 'source',
      },
    ],
  },
  {
    id: 'codex-app-2026',
    date: '2026-02-02',
    year: 2026,
    name: 'Codex App',
    edition: 'Multi-agent command center',
    maker: 'OpenAI',
    description:
      'A desktop interface for supervising parallel coding agents across projects, worktrees, environments, reviews, skills, and scheduled work.',
    changed:
      'The developer moved from pair programmer to agent manager. The primary interface became a portfolio of concurrent tasks and changes.',
    lineage: 'Codex cloud + CLI + editor → multi-thread desktop command center',
    impact:
      'OpenAI reported more than one million developers using Codex in the preceding month when the app launched.',
    forms: ['Code', 'Agents'],
    layers: ['Developer tool'],
    popularity: 88,
    visual: 'agent',
    accent: '#111111',
    sources: [
      {
        label: 'Introducing the Codex app',
        url: 'https://openai.com/index/introducing-the-codex-app/',
        kind: 'source',
      },
      {
        label: 'Codex product evolution',
        url: 'https://openai.com/index/work-with-codex-from-anywhere/',
        kind: 'source',
      },
    ],
  },
  {
    id: 'spotify-discover-weekly-2015',
    date: '2015-07-01',
    datePrecision: 'month',
    year: 2015,
    name: 'Discover Weekly',
    edition: 'A playlist made for you',
    maker: 'Spotify',
    description:
      'A personalized playlist refreshed every Monday from each listener’s behavior and taste graph.',
    changed:
      'The recommendation model became a finite editorial object with cover art, a cadence, and a clear promise rather than an invisible ranking layer.',
    lineage:
      'Algorithmic radio → Discover Weekly → Release Radar, Blend, DJ, and AI Playlist',
    impact:
      'Within its first year Spotify said Discover Weekly connected 40 million listeners with nearly five billion tracks.',
    forms: ['Recommendation', 'Audio'],
    layers: ['Consumer product'],
    popularity: 91,
    visual: 'cards',
    accent: '#1db954',
    sources: [
      {
        label: 'Five years of Discover Weekly',
        url: 'https://newsroom.spotify.com/2020-07-09/spotify-users-have-spent-over-2-3-billion-hours-streaming-discover-weekly-playlists-since-2015/',
        kind: 'source',
      },
      {
        label: 'Spotify discovery and artist impact',
        url: 'https://artists.spotify.com/it/blog/discovery-on-spotify-what-it-means-for-artists',
        kind: 'source',
      },
    ],
  },
  {
    id: 'tesla-autopilot-2015',
    date: '2015-10-01',
    datePrecision: 'month',
    year: 2015,
    name: 'Tesla Autopilot',
    edition: 'Supervising the machine',
    maker: 'Tesla',
    description:
      'An instrument-cluster interface visualizing lanes, nearby vehicles, driver-assistance availability, engagement, and takeover states.',
    changed:
      'Partial autonomy created a new interface problem: the person had to understand what the system perceived, what it controlled, and when to intervene.',
    lineage:
      'Driver assistance → Autosteer visualization → Navigate on Autopilot → FSD visualization',
    impact:
      'Autopilot made human-machine handoff one of the most visible and debated AI interface problems in consumer products.',
    forms: ['Embodied', 'Vision'],
    layers: ['Device', 'Embodied system'],
    popularity: 89,
    visual: 'vision',
    accent: '#d13a35',
    sources: [
      {
        label: 'Tesla Autopilot support',
        url: 'https://www.tesla.com/support/autopilot',
        kind: 'source',
      },
      {
        label: 'Instrument panel owner’s manual',
        url: 'https://www.tesla.com/ownersmanual/2015_2020_modelx/en_us/GUID-EE80FB8A-9118-47E6-A1C6-2EE080B92B18.html',
        kind: 'source',
      },
    ],
  },
  {
    id: 'tiktok-for-you-2018',
    date: '2018-08-02',
    year: 2018,
    name: 'TikTok For You',
    edition: 'The interest graph',
    maker: 'TikTok',
    description:
      'An immediately personalized, full-screen video stream where watching, replaying, skipping, liking, and sharing continuously reshaped discovery.',
    changed:
      'The inferred interest graph replaced the social graph as the dominant home interface. A swipe became both navigation and training signal.',
    lineage:
      'Musical.ly + Douyin → unified TikTok feed → short-form recommendation interfaces across social media',
    impact:
      'TikTok reported one billion monthly users by 2021, and its full-screen recommendation feed was copied across the consumer internet.',
    forms: ['Recommendation', 'Vision', 'Video'],
    layers: ['Consumer product'],
    popularity: 97,
    visual: 'cards',
    accent: '#fe2c55',
    sources: [
      {
        label: 'The unified TikTok launch',
        url: 'https://newsroom.tiktok.com/musical-ly-and/?lang=en',
        kind: 'source',
      },
      {
        label: 'How the For You feed recommends',
        url: 'https://newsroom.tiktok.com/how-tiktok-recommends-videos-for-you?lang=en',
        kind: 'source',
      },
    ],
  },
  {
    id: 'waymo-one-2018',
    date: '2018-12-05',
    year: 2018,
    name: 'Waymo One',
    edition: 'Riding with no driver',
    maker: 'Waymo',
    description:
      'A ride-hailing and in-car interface for finding, entering, understanding, and getting help inside a self-driving vehicle.',
    changed:
      'Autonomous driving became a service experience. The interface had to explain vehicle intent without the social cues of a human driver.',
    lineage:
      'Google self-driving project → early rider program → Waymo One → fully driverless public service',
    impact:
      'Waymo described it as the first public self-driving ride-hailing service and reported thousands of Phoenix-area riders after its first year.',
    forms: ['Embodied', 'Vision', 'Agents'],
    layers: ['Consumer product', 'Embodied system'],
    popularity: 84,
    visual: 'agent',
    accent: '#1573e6',
    sources: [
      {
        label: 'Waymo One launch',
        url: 'https://waymo.com/blog/2018/12/waymo-one-next-step-on-our-self-driving/',
        kind: 'source',
      },
      {
        label: 'Waymo One’s first year',
        url: 'https://waymo.com/blog/2019/12/waymo-one-year-of-firsts/',
        kind: 'source',
      },
    ],
  },
  {
    id: 'gpt3-playground-2020',
    date: '2020-06-11',
    year: 2020,
    name: 'GPT-3 Playground',
    edition: 'Prompt as programming',
    maker: 'OpenAI',
    description:
      'A text-in, text-out workbench for writing prompts and examples, generating completions, and tuning model parameters.',
    changed:
      'Natural-language prompting became a visible developer primitive before chat emerged as the dominant LLM interface.',
    lineage:
      'GPT-2 demos → GPT-3 API Playground → InstructGPT → ChatGPT and model studios',
    impact:
      'The Playground established prompt design and few-shot examples as a practical way to program a general language model.',
    forms: ['Chat', 'Code'],
    layers: ['Developer tool'],
    popularity: 82,
    visual: 'code',
    accent: '#10a37f',
    sources: [
      {
        label: 'OpenAI API launch',
        url: 'https://openai.com/index/openai-api/',
        kind: 'source',
      },
      {
        label: 'InstructGPT paper and Playground lineage',
        url: 'https://cdn.openai.com/papers/Training_language_models_to_follow_instructions_with_human_feedback.pdf',
        kind: 'source',
      },
    ],
  },
  {
    id: 'stable-diffusion-2022',
    date: '2022-08-22',
    year: 2022,
    name: 'Stable Diffusion',
    edition: 'The interface becomes forkable',
    maker: 'Stability AI',
    description:
      'An open image model paired with DreamStudio and a fast-growing ecosystem of local, community-built generation interfaces.',
    changed:
      'Users could leave the hosted prompt box, run models locally, and gain deep control through independently designed tools and node graphs.',
    lineage:
      'Diffusion research tools → DreamStudio → AUTOMATIC1111, ComfyUI, and open creative ecosystems',
    impact:
      'Stability reported more than 10 million users in two months, while the open release produced thousands of specialized interfaces.',
    forms: ['Canvas', 'Vision'],
    layers: ['Creative tool', 'Developer tool'],
    popularity: 93,
    visual: 'canvas',
    accent: '#7f62d9',
    sources: [
      {
        label: 'Stable Diffusion public release',
        url: 'https://stability.ai/news-updates/stable-diffusion-public-release',
        kind: 'source',
      },
      {
        label: 'One-year retrospective',
        url: 'https://stability.ai/news-updates/celebrating-one-year-of-stable-diffusion',
        kind: 'source',
      },
    ],
  },
  {
    id: 'character-ai-2022',
    date: '2022-09-01',
    datePrecision: 'month',
    year: 2022,
    name: 'Character.AI',
    edition: 'A directory of personalities',
    maker: 'Character.AI',
    description:
      'A social catalog where people chose or created a persona and entered an open-ended role-play conversation.',
    changed:
      'The character, rather than the general assistant, became the unit of interaction. Personality and fiction organized the product.',
    lineage:
      'Companion chatbots → Character.AI → custom assistants and character marketplaces',
    impact:
      'Its mobile app passed 1.7 million installs in its first week, proving substantial demand for personality-driven AI interaction.',
    forms: ['Chat'],
    layers: ['Consumer product'],
    popularity: 89,
    visual: 'chat',
    accent: '#6f58d9',
    sources: [
      {
        label: 'Introducing Character',
        url: 'https://blog.character.ai/introducing-character/',
        kind: 'source',
      },
      {
        label: 'Character.AI mobile launch',
        url: 'https://blog.character.ai/character-ai-launches-mobile-app-for-ios-and-android/',
        kind: 'source',
      },
    ],
  },
  {
    id: 'cursor-inline-2023',
    date: '2023-07-03',
    year: 2023,
    name: 'Cursor Cmd+K',
    edition: 'Edit by intent',
    maker: 'Cursor',
    description:
      'An AI-native code editor where a developer selected code, stated an intent, inspected a diff, and applied a multi-line change in place.',
    changed:
      'AI code generation shifted from completing the next tokens to transforming an existing codebase through direct, reviewable edits.',
    lineage:
      'Copilot ghost text → inline intent edits → Composer → background coding agents',
    impact:
      'Cursor established the AI-native editor as a distinct product category rather than an assistant added to an existing IDE.',
    forms: ['Code', 'Chat'],
    layers: ['Developer tool'],
    popularity: 92,
    visual: 'code',
    accent: '#faf7ee',
    sources: [
      {
        label: 'Cursor 0.2.39 inline edits',
        url: 'https://cursor.com/changelog/0-2-39',
        kind: 'source',
      },
      {
        label: 'Cursor’s 2023 product retrospective',
        url: 'https://www.cursor.com/blog/problems-2023',
        kind: 'source',
      },
    ],
  },
  {
    id: 'v0-2023',
    date: '2023-10-11',
    year: 2023,
    name: 'v0',
    edition: 'Generative UI',
    maker: 'Vercel',
    description:
      'A prompt-driven workspace that returned multiple functional interface variants, live previews, and usable React code.',
    changed:
      'The model’s answer became an interactive interface. Generation, selection, preview, iteration, and code export formed one loop.',
    lineage: 'Text-to-code → generative UI variants → prompt-to-app builders',
    impact:
      'Vercel reported 100,000 waitlist registrations in three weeks and later more than four million generated designs.',
    forms: ['Canvas', 'Code', 'Chat'],
    layers: ['Creative tool', 'Developer tool'],
    popularity: 87,
    visual: 'canvas',
    accent: '#111111',
    sources: [
      {
        label: 'Announcing v0',
        url: 'https://vercel.com/blog/announcing-v0-generative-ui',
        kind: 'source',
      },
      {
        label: 'v0 adoption and team plans',
        url: 'https://vercel.com/blog/v0-plans-for-teams',
        kind: 'source',
      },
    ],
  },
  {
    id: 'gpt4o-2024',
    date: '2024-05-13',
    year: 2024,
    name: 'GPT-4o Voice',
    edition: 'Real-time multimodality',
    maker: 'OpenAI',
    description:
      'A low-latency assistant interface that could speak expressively, accept interruptions, and reason across live audio and visual context.',
    changed:
      'Voice stopped behaving like speech-to-text wrapped around chat. Timing, tone, interruption, and camera context became part of the interaction.',
    lineage:
      'Turn-based voice chat → native multimodal model → real-time assistants',
    impact:
      'OpenAI reported average audio response latency of 320 milliseconds, close to ordinary human conversational timing.',
    forms: ['Voice', 'Vision', 'Chat'],
    layers: ['Assistant', 'Consumer product'],
    popularity: 96,
    visual: 'voice',
    accent: '#4ec8ab',
    sources: [
      {
        label: 'Hello GPT-4o',
        url: 'https://openai.com/index/hello-gpt-4o/',
        kind: 'source',
      },
      {
        label: 'GPT-4o system card',
        url: 'https://cdn.openai.com/gpt-4o-system-card.pdf',
        kind: 'source',
      },
    ],
  },
].sort((a, b) => a.date.localeCompare(b.date))
