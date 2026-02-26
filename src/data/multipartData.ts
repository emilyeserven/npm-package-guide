import type { GuideSection, GuideManifest } from './guideTypes'

export const MULTIPART_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['multipart-uploads-guide'] },
]

export const MULTIPART_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'multipart-uploads',
    icon: '📤',
    title: 'Multipart Uploads',
    startPageId: 'multipart-uploads-guide',
    description: 'How files travel from browser to server — multipart encoding, the upload pipeline, common pitfalls, and how to evaluate upload libraries.',
    category: 'frontend',
    dateCreated: '2026-02-26',
    dateModified: '2026-02-26',
    singlePage: true,
    sections: MULTIPART_GUIDE_SECTIONS,
  },
}

// ── Pipeline steps ──────────────────────────────────────────────────

export interface PipelineStep {
  id: string
  label: string
  icon: string
  color: string
  darkColor: string
  description: string
  detail: string
}

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'select',
    label: 'File Selected',
    icon: '\u{1F4C4}',
    color: '#2563eb',
    darkColor: '#3b82f6',
    description: 'User selects a file from their device via an <input type="file"> or drag-and-drop zone.',
    detail: 'The browser creates a File object (a subclass of Blob). At this point, nothing has been uploaded — the File only exists in memory.',
  },
  {
    id: 'validate',
    label: 'Client Validation',
    icon: '\u{1F50D}',
    color: '#d97706',
    darkColor: '#f59e0b',
    description: 'Before building the request, validate the file client-side.',
    detail: "Check file size, MIME type, and extension. This prevents wasting bandwidth uploading files the server will reject. Never trust client-side validation alone — always re-validate server-side.",
  },
  {
    id: 'build',
    label: 'Build FormData',
    icon: '\u{1F4E6}',
    color: '#7c3aed',
    darkColor: '#a78bfa',
    description: 'Construct a FormData object and append the file (and any metadata fields).',
    detail: "FormData automatically sets the Content-Type header to 'multipart/form-data' with the correct boundary string. NEVER set the Content-Type header manually — the browser must generate the boundary.",
  },
  {
    id: 'send',
    label: 'HTTP Request',
    icon: '\u{1F680}',
    color: '#0891b2',
    darkColor: '#22d3ee',
    description: 'Send the FormData via fetch() or an HTTP client like axios/ky.',
    detail: "The browser encodes each FormData field as a separate 'part' in the request body, separated by boundary strings. Binary file data is sent as-is (not base64), keeping the payload smaller.",
  },
  {
    id: 'parse',
    label: 'Server Parsing',
    icon: '\u2699\uFE0F',
    color: '#059669',
    darkColor: '#10b981',
    description: 'The server reads the multipart stream and reassembles each part.',
    detail: 'Server frameworks use libraries like multer (Node/Express), python-multipart (FastAPI), or busboy to parse the stream. Files are typically streamed to disk or cloud storage to avoid loading them entirely into memory.',
  },
  {
    id: 'store',
    label: 'Storage',
    icon: '\u{1F4BE}',
    color: '#2563eb',
    darkColor: '#3b82f6',
    description: 'The parsed file is persisted — to disk, S3, GCS, R2, or another store.',
    detail: 'The server responds with metadata (URL, ID, etc.) that the frontend stores for future reference. Large files may use presigned URLs to upload directly to the storage provider, bypassing the server entirely.',
  },
]

// ── Package scorecard criteria ──────────────────────────────────────

export type ScorecardWeight = 'Critical' | 'Important' | 'Nice-to-have'

export interface ScorecardCriterion {
  name: string
  weight: ScorecardWeight
  good: string
  bad: string
}

export const SCORECARD_CRITERIA: ScorecardCriterion[] = [
  {
    name: 'Streaming support',
    weight: 'Critical',
    good: 'Reads chunks as they arrive; never buffers the whole file in memory.',
    bad: 'Loads entire file into a Buffer/ArrayBuffer before parsing. Will crash or OOM on large uploads.',
  },
  {
    name: 'Progress events',
    weight: 'Important',
    good: 'Exposes upload progress via XMLHttpRequest or ReadableStream. Lets you build progress bars.',
    bad: 'fetch() alone does NOT emit upload progress in most browsers. The package should use XHR under the hood or document this limitation.',
  },
  {
    name: 'Abort/cancel support',
    weight: 'Important',
    good: 'Accepts an AbortSignal or provides a cancel() method. Cleans up partial uploads.',
    bad: "No cancellation API — once an upload starts, it can't be stopped without closing the tab.",
  },
  {
    name: 'Retry & resumability',
    weight: 'Nice-to-have',
    good: 'Retries failed chunks with exponential backoff. Supports resumable protocols (e.g. tus).',
    bad: 'A single network hiccup means re-uploading the entire file from scratch.',
  },
  {
    name: 'Content-Type handling',
    weight: 'Critical',
    good: 'Lets FormData set the Content-Type header automatically with the boundary.',
    bad: "Manually sets Content-Type to 'multipart/form-data' WITHOUT the boundary. The server won't be able to parse the request body.",
  },
  {
    name: 'TypeScript types',
    weight: 'Important',
    good: 'Ships first-party .d.ts files or is written in TypeScript. Types match runtime behavior.',
    bad: 'No types, or @types/ package is outdated and mismatched with actual API surface.',
  },
  {
    name: 'Bundle size',
    weight: 'Important',
    good: '< 5 KB gzipped for a focused upload utility. Tree-shakable ESM exports.',
    bad: "> 20 KB for something that's essentially a wrapper around FormData + fetch. Likely bundling polyfills you don't need.",
  },
  {
    name: 'Framework agnostic',
    weight: 'Nice-to-have',
    good: 'Core logic is vanilla JS. Offers thin framework bindings (React hook, Vue composable) separately.',
    bad: 'Couples upload logic to React state or a specific framework. Hard to use in a service worker or shared utility.',
  },
]

// ── Decision tree questions ─────────────────────────────────────────

export interface DecisionQuestion {
  id: string
  question: string
  yes: string
  no: string
}

export const DECISION_QUESTIONS: DecisionQuestion[] = [
  {
    id: 'binary',
    question: 'Does your request include binary data (files, images, audio, video)?',
    yes: 'multipart',
    no: 'json_check',
  },
  {
    id: 'json_check',
    question: 'Are you sending structured data along with one or more files?',
    yes: 'multipart',
    no: 'mixed_check',
  },
  {
    id: 'mixed_check',
    question: 'Is all your data plain text / JSON with no files?',
    yes: 'json',
    no: 'multipart',
  },
]

// ── Data type examples ──────────────────────────────────────────────

export interface DataTypeExample {
  label: string
  desc: string
  icon: string
}

export const DATA_TYPE_EXAMPLES: DataTypeExample[] = [
  { label: 'Images', desc: 'Avatars, thumbnails, photo galleries, screenshots', icon: '\u{1F5BC}\uFE0F' },
  { label: 'Documents', desc: 'PDFs, Word docs, spreadsheets, CSVs', icon: '\u{1F4C4}' },
  { label: 'Audio / Video', desc: 'Recordings, music files, video clips', icon: '\u{1F3AC}' },
  { label: 'Archives', desc: 'ZIP, tar.gz, or any compressed bundle', icon: '\u{1F4E6}' },
  { label: 'Rich form submissions', desc: 'A profile update that includes both text fields AND a new avatar image', icon: '\u{1F4DD}' },
  { label: 'Bulk imports', desc: 'CSV or Excel file with thousands of rows to process server-side', icon: '\u{1F4CA}' },
]

// ── File size limit layers ──────────────────────────────────────────

export const FILE_SIZE_LAYERS: [string, string][] = [
  ['Reverse proxy', 'nginx: client_max_body_size, Cloudflare: 100 MB free tier'],
  ['Application server', 'Express: express.json() has a 100 KB default; multer has its own limits'],
  ['Cloud provider', 'S3 single PUT: 5 GB max; multipart upload: 5 TB max'],
  ['Browser', 'No hard limit, but FormData with huge files will consume memory'],
]
