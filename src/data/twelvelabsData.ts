import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Guide sections (sidebar & navigation) ─────────────────────────
export const TWELVELABS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['tl-start'] },
  { label: 'Foundations', ids: ['tl-overview', 'tl-models', 'tl-setup'] },
  { label: 'Core APIs', ids: ['tl-indexes', 'tl-search', 'tl-analyze', 'tl-embed'] },
  { label: 'Integration', ids: ['tl-workflow'] },
]

// ── Start page data ───────────────────────────────────────────────
export const TWELVELABS_START_PAGE_DATA: StartPageData = {
  subtitle:
    'Video understanding APIs for search, analysis, and embeddings — process video content across visual, audio, and conversational modalities.',
  tip: 'This guide is for backend and full-stack engineers integrating video AI into their applications. Start with the Overview to understand TwelveLabs\u2019 architecture, or jump directly to an API section.',
  headingText: '\u2728 Learning TwelveLabs',
  headingDescription:
    'Follow the foundations first, then explore each API. The workflow page ties everything together.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Foundations',
      description:
        'Understand TwelveLabs\u2019 platform, model families, and how to set up the SDK.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'tl-overview':
          'Core concepts — indexes, tasks, models, and modalities.',
        'tl-models':
          'Marengo (search & embeddings) and Pegasus (text generation) model families.',
        'tl-setup':
          'Install the SDK, initialize the client, and use the REST API directly.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Core APIs',
      description:
        'Learn each API: create indexes, upload videos, search content, generate analysis, and create embeddings.',
      sectionLabel: 'Core APIs',
      subItemDescriptions: {
        'tl-indexes':
          'Create indexes, upload videos from files or URLs, attach metadata, and track indexing progress.',
        'tl-search':
          'Text-to-video, image-to-video, and combined multimodal search across visual, audio, and conversation.',
        'tl-analyze':
          'Generate summaries, chapters, Q&A, and structured JSON from video content with custom prompts.',
        'tl-embed':
          'Create 1024-dimensional multimodal embeddings for semantic search, RAG, and recommendations.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Integration',
      description:
        'See a complete end-to-end workflow combining all APIs, plus frontend integration patterns.',
      sectionLabel: 'Integration',
      subItemDescriptions: {
        'tl-workflow':
          'Full pipeline: create index, upload, search, analyze, embed — plus TanStack Query integration.',
      },
    },
  ],
  relatedGuides: ['ai-infra', 'video-pipeline', 'tanstack-query'],
}

// ── Model data ────────────────────────────────────────────────────
export interface TlModel {
  name: string
  type: string
  description: string
  capabilities: string[]
  color: string
  darkColor: string
}

export const TL_MODELS: TlModel[] = [
  {
    name: 'Marengo 2.7',
    type: 'Embedding & Search',
    description:
      'A multimodal embedding model that generates 1024-dimensional vectors. Powers search, retrieval, classification, and similarity tasks. Processes videos from 4 seconds to 2 hours.',
    capabilities: ['visual', 'audio', 'text-to-video', 'image-to-video', 'embeddings'],
    color: '#6366f1',
    darkColor: '#818cf8',
  },
  {
    name: 'Pegasus 1.2',
    type: 'Generative',
    description:
      'A video-native language model that understands video content and generates coherent text. Powers summaries, chapters, Q&A, and custom analysis prompts.',
    capabilities: ['visual', 'audio', 'summarization', 'Q&A', 'custom prompts'],
    color: '#059669',
    darkColor: '#34d399',
  },
]

// ── Modality data ─────────────────────────────────────────────────
export interface TlModality {
  name: string
  description: string
  icon: string
}

export const TL_MODALITIES: TlModality[] = [
  { name: 'visual', description: 'Frames, objects, scenes, actions, text on screen', icon: '\uD83D\uDC41' },
  { name: 'audio', description: 'Music, sound effects, environmental audio', icon: '\uD83D\uDD0A' },
  { name: 'conversation', description: 'Speech, dialogue, spoken words', icon: '\uD83D\uDCAC' },
]

// ── Core concept data ─────────────────────────────────────────────
export interface TlConcept {
  term: string
  definition: string
}

export const TL_CORE_CONCEPTS: TlConcept[] = [
  { term: 'Index', definition: 'A container for your videos, similar to a database table. Each index is configured with specific models and modalities.' },
  { term: 'Task', definition: 'A video upload/processing job. When you upload a video, a task tracks its indexing progress until it\u2019s ready.' },
  { term: 'Model', definition: 'The AI model used for processing. Marengo handles search & embeddings; Pegasus handles text generation.' },
  { term: 'Modality', definition: 'The type of data to analyze \u2014 visual (frames), audio (sounds/music), or conversation (speech).' },
]

// ── API overview cards ────────────────────────────────────────────
export interface TlApiCard {
  api: string
  description: string
  color: string
  darkColor: string
}

export const TL_API_CARDS: TlApiCard[] = [
  { api: 'Search', description: 'Find exact moments in video libraries using natural language, images, or audio', color: '#6366f1', darkColor: '#818cf8' },
  { api: 'Analyze', description: 'Generate text from videos \u2014 summaries, chapters, action items, custom prompts', color: '#059669', darkColor: '#34d399' },
  { api: 'Embed', description: 'Create multimodal vector embeddings for semantic search & RAG pipelines', color: '#ea580c', darkColor: '#fb923c' },
]

// ── Index flow steps ──────────────────────────────────────────────
export interface TlIndexStep {
  id: string
  title: string
  description: string
  fileName: string
  code: string
}

export const TL_INDEX_STEPS: TlIndexStep[] = [
  {
    id: 'create',
    title: 'Create an Index',
    description: 'Configure models and modalities',
    fileName: 'create-index.js',
    code: `const index = await client.indexes.create({
  indexName: "my-video-library",
  models: [
    {
      modelName: "marengo2.7",
      modelOptions: ["visual", "audio"],
    },
    {
      modelName: "pegasus1.2",
      modelOptions: ["visual", "audio"],
    },
  ],
  addons: ["thumbnail"],  // optional
});
console.log(\`Created index: \${index.id}\`);`,
  },
  {
    id: 'upload',
    title: 'Upload a Video',
    description: 'From file or public URL',
    fileName: 'upload-video.js',
    code: `const task = await client.tasks.create({
  indexId: index.id,
  videoFile: fs.createReadStream("./videos/sample.mp4"),
});
console.log(\`Created task: \${task.id}\`);`,
  },
  {
    id: 'metadata',
    title: 'Add Metadata',
    description: 'Attach custom fields to videos',
    fileName: 'upload-with-metadata.js',
    code: `const task = await client.tasks.create({
  indexId: index.id,
  video_url: "https://example.com/video.mp4",
});

// Attach custom metadata
const taskWithMeta = await client.tasks.create({
  indexId: index.id,
  video_url: "https://example.com/lecture.mp4",
  userMetadata: {
    category: "tutorial",
    author: "jane@example.com",
    series: "ML Fundamentals"
  },
});`,
  },
  {
    id: 'wait',
    title: 'Wait for Indexing',
    description: 'Poll until processing completes',
    fileName: 'wait-for-done.js',
    code: `const completedTask = await client.tasks.waitForDone(
  task.id,
  {
    callback: (task) => {
      console.log(\`  Status: \${task.status}\`);
    },
  }
);
if (completedTask.status === "ready") {
  console.log(\`✓ Video indexed: \${completedTask.videoId}\`);
} else {
  console.error(\`✗ Indexing failed: \${completedTask.status}\`);
}`,
  },
]

// ── Search options data ───────────────────────────────────────────
export interface TlSearchOption {
  option: string
  description: string
}

export const TL_SEARCH_OPTIONS: TlSearchOption[] = [
  { option: 'visual', description: 'Matches based on what\u2019s visible in frames \u2014 objects, scenes, actions, people, colors' },
  { option: 'conversation', description: 'Matches based on spoken words and dialogue in the video' },
  { option: 'text_in_video', description: 'Matches text visible on screen \u2014 titles, captions, signs, code on screen' },
  { option: 'audio', description: 'Matches based on sounds, music, and environmental audio' },
]

// ── Search tab examples ───────────────────────────────────────────
export interface TlSearchTab {
  key: string
  label: string
  fileName: string
  code: string
}

export const TL_SEARCH_TABS: TlSearchTab[] = [
  {
    key: 'text',
    label: 'Text Search',
    fileName: 'search-text.js',
    code: `// Text-to-video search
const results = await client.search.create({
  indexId: index.id,
  searchOptions: ["visual", "audio"],
  query_text: "person explaining neural networks at a whiteboard",
});

// Iterate through results
for (const match of results.data) {
  console.log(\`Video: \${match.videoId}\`);
  console.log(\`Score: \${match.score}\`);
  console.log(\`Time: \${match.start} → \${match.end}\`);
  console.log(\`Confidence: \${match.confidence}\`);
  console.log("---");
}`,
  },
  {
    key: 'image',
    label: 'Image Search',
    fileName: 'search-image.js',
    code: `// Image-to-video search
// Find video moments similar to a reference image
const results = await client.search.create({
  indexId: index.id,
  searchOptions: ["visual"],
  query_media_type: "image",
  query_media_url: "https://example.com/reference-frame.jpg",
});

for (const match of results.data) {
  console.log(\`Found similar moment at \${match.start}s\`);
  console.log(\`Similarity score: \${match.score}\`);
}`,
  },
  {
    key: 'combined',
    label: 'Combined',
    fileName: 'search-combined.js',
    code: `// Combine search options for richer results
const results = await client.search.create({
  indexId: index.id,
  searchOptions: ["visual", "conversation", "text_in_video"],
  query_text: "discussion about transfer learning",
});

// Results include transcription when available
for (const match of results.data) {
  console.log(\`\${match.start}s → \${match.end}s\`);
  console.log(\`Score: \${match.score}\`);
  if (match.transcription) {
    console.log(\`Transcript: \${match.transcription}\`);
  }
}`,
  },
]

// ── Analyze prompt ideas ──────────────────────────────────────────
export interface TlPromptIdea {
  label: string
  prompt: string
}

export const TL_PROMPT_IDEAS: TlPromptIdea[] = [
  { label: 'Summarization', prompt: 'Summarize this video in 3-4 sentences, highlighting the main topic, key events, and conclusion.' },
  { label: 'Chapter Generation', prompt: 'Create a table of contents with timestamps, chapter titles, and one-sentence descriptions for each section.' },
  { label: 'Action Items', prompt: 'Extract all action items, decisions, and follow-ups mentioned in this video meeting.' },
  { label: 'Accessibility', prompt: 'Generate detailed audio descriptions of the visual content for accessibility purposes.' },
  { label: 'Social Media', prompt: 'Write a compelling Twitter thread summarizing this video\u2019s key insights. Use engaging hooks and include relevant hashtags.' },
  { label: 'Q&A Extraction', prompt: 'List all questions asked during this video and the corresponding answers given.' },
]

// ── Embed use cases ───────────────────────────────────────────────
export interface TlEmbedUseCase {
  title: string
  description: string
}

export const TL_EMBED_USE_CASES: TlEmbedUseCase[] = [
  { title: 'Semantic Search', description: 'Build text-to-video, image-to-video, or audio-to-video search' },
  { title: 'Video RAG', description: 'Retrieve relevant clips and feed them to an LLM for context-aware answers' },
  { title: 'Recommendations', description: 'Find similar videos using cosine similarity between embeddings' },
  { title: 'Anomaly Detection', description: 'Identify outlier content like corrupt videos or unexpected scenes' },
  { title: 'Clustering', description: 'Group similar videos together for content organization' },
  { title: 'Fine-tuning Data', description: 'Create labeled training data from video content at scale' },
]

// ── Manifest ──────────────────────────────────────────────────────
export const TWELVELABS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'twelvelabs',
    icon: '🎬',
    title: 'TwelveLabs API',
    startPageId: 'tl-start',
    description: 'Video understanding APIs for search, analysis, and embeddings',
    category: 'ai-tooling',
    dateCreated: '2026-02-27',
    dateModified: '2026-02-27',
    sections: TWELVELABS_GUIDE_SECTIONS,
  },
  startPageData: TWELVELABS_START_PAGE_DATA,
}
