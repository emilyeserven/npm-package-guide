import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Guide sections (sidebar & navigation) ─────────────────────────
export const TSAI_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['tsai-start'] },
  { label: 'Getting Started', ids: ['tsai-overview'] },
  { label: 'Core Concepts', ids: ['tsai-architecture', 'tsai-server', 'tsai-client'] },
  { label: 'Advanced', ids: ['tsai-tools', 'tsai-streaming'] },
  { label: 'Reference', ids: ['tsai-reference'] },
]

// ── Start page data ───────────────────────────────────────────────
export const TSAI_START_PAGE_DATA: StartPageData = {
  subtitle:
    'A type-safe, provider-agnostic SDK for building production-ready AI experiences. No vendor lock-in. No proprietary formats. Just clean TypeScript.',
  tip: 'This guide is for frontend engineers who want to integrate AI features into their apps. Start with Overview if you\u2019re new to TanStack AI, or jump to any section that interests you.',
  headingText: '\u2728 Learning TanStack AI',
  headingDescription:
    'Follow the sections in order for a complete picture, or jump to what you need.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Getting Started',
      description:
        'Understand what TanStack AI is, its core principles, and the package ecosystem.',
      sectionLabel: 'Getting Started',
      subItemDescriptions: {
        'tsai-overview':
          'Core features, design philosophy, and the modular package ecosystem.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Core Concepts',
      description:
        'Learn the client-server architecture, set up your first server endpoint, and build a chat UI with the useChat hook.',
      sectionLabel: 'Core Concepts',
      subItemDescriptions: {
        'tsai-architecture':
          'How the React UI, useChat hook, SSE connection, and LLM adapter fit together.',
        'tsai-server':
          'Set up a streaming chat endpoint with OpenAI, Anthropic, or Gemini.',
        'tsai-client':
          'The useChat hook \u2014 messages, streaming state, tool execution, and approval flows.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Advanced',
      description:
        'Master the isomorphic tool system, human-in-the-loop approval flows, and streaming transports.',
      sectionLabel: 'Advanced',
      subItemDescriptions: {
        'tsai-tools':
          'Define tools once with Zod schemas, implement for server or client, with built-in approval flows.',
        'tsai-streaming':
          'SSE, HTTP streams, custom WebSocket transports, and per-model type-safe provider options.',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Reference',
      description:
        'Quick comparison with Vercel AI SDK and a complete API cheatsheet.',
      sectionLabel: 'Reference',
      subItemDescriptions: {
        'tsai-reference':
          'Feature comparison table and essential import patterns for server, client, and tools.',
      },
    },
  ],
  relatedGuides: ['tanstack-query', 'tanstack-router', 'ai-infra'],
}

// ── Feature cards ────────────────────────────────────────────────

export interface TsaiFeature {
  id: string
  icon: string
  title: string
  description: string
  accent: string
  darkAccent: string
}

export const TSAI_FEATURES: TsaiFeature[] = [
  {
    id: 'provider-agnostic',
    icon: '\uD83D\uDD0C',
    title: 'Provider Agnostic',
    description: 'Swap between OpenAI, Anthropic, Gemini, or Ollama with a one-line adapter change. No code rewrite needed.',
    accent: '#f97316',
    darkAccent: '#fb923c',
  },
  {
    id: 'type-safety',
    icon: '\uD83D\uDD12',
    title: 'End-to-End Type Safety',
    description: 'From adapter selection to model options to tool schemas \u2014 your IDE catches errors at compile time, not runtime.',
    accent: '#3b82f6',
    darkAccent: '#60a5fa',
  },
  {
    id: 'isomorphic-tools',
    icon: '\uD83D\uDD27',
    title: 'Isomorphic Tools',
    description: 'Define a tool once with toolDefinition(), then implement with .server() or .client() for either environment.',
    accent: '#22c55e',
    darkAccent: '#4ade80',
  },
  {
    id: 'streaming',
    icon: '\uD83D\uDCE1',
    title: 'Built-in Streaming',
    description: 'Server-Sent Events, HTTP streams, or custom transports. The protocol is open and documented.',
    accent: '#a855f7',
    darkAccent: '#c084fc',
  },
  {
    id: 'tool-approval',
    icon: '\uD83D\uDEE1\uFE0F',
    title: 'Tool Approval Flow',
    description: 'Human-in-the-loop approvals for sensitive tool calls. Built-in, not bolted on.',
    accent: '#06b6d4',
    darkAccent: '#22d3ee',
  },
  {
    id: 'devtools',
    icon: '\uD83D\uDD0D',
    title: 'DevTools',
    description: 'A full AI devtools panel showing messages, tool calls, thinking tokens, and more \u2014 on both server and client.',
    accent: '#ef4444',
    darkAccent: '#f87171',
  },
]

// ── Package ecosystem ────────────────────────────────────────────

export interface TsaiPackage {
  name: string
  description: string
}

export const TSAI_PACKAGES: TsaiPackage[] = [
  { name: '@tanstack/ai', description: 'Core: chat(), toolDefinition(), streaming, toServerSentEventsResponse()' },
  { name: '@tanstack/ai-client', description: 'Headless client: ChatClient, clientTools(), createChatClientOptions()' },
  { name: '@tanstack/ai-react', description: 'React integration: useChat hook, fetchServerSentEvents' },
  { name: '@tanstack/ai-solid', description: 'Solid integration: useChat for SolidJS' },
  { name: '@tanstack/ai-openai', description: 'Adapter: openaiText, openaiEmbed, openaiSummarize' },
  { name: '@tanstack/ai-anthropic', description: 'Adapter: anthropicText for Claude models' },
  { name: '@tanstack/ai-gemini', description: 'Adapter: geminiText for Google Gemini' },
  { name: '@tanstack/ai-ollama', description: 'Adapter: ollamaText for local Ollama models' },
]

// ── Code examples (tabbed) ───────────────────────────────────────

export interface TsaiCodeTab {
  id: string
  label: string
  filename: string
  dotColor: string
  code: string
}

export interface TsaiCodeGroup {
  tabs: TsaiCodeTab[]
}

export const TSAI_CODE_EXAMPLES: Record<string, TsaiCodeGroup> = {
  'server-providers': {
    tabs: [
      {
        id: 'openai',
        label: 'OpenAI',
        filename: 'api/chat.ts',
        dotColor: '#f97316',
        code: `import { chat, toServerSentEventsResponse } from "@tanstack/ai"
import { openaiText } from "@tanstack/ai-openai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  // Create a streaming chat response
  const stream = chat({
    adapter: openaiText("gpt-4o"),
    messages,
  })

  // Convert to SSE HTTP response
  return toServerSentEventsResponse(stream)
}`,
      },
      {
        id: 'anthropic',
        label: 'Anthropic',
        filename: 'api/chat.ts',
        dotColor: '#a855f7',
        code: `import { chat, toServerSentEventsResponse } from "@tanstack/ai"
import { anthropicText } from "@tanstack/ai-anthropic"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const stream = chat({
    adapter: anthropicText("claude-sonnet-4-5-20250514"),
    messages,
  })

  return toServerSentEventsResponse(stream)
}`,
      },
      {
        id: 'gemini',
        label: 'Gemini',
        filename: 'api/chat.ts',
        dotColor: '#06b6d4',
        code: `import { chat, toServerSentEventsResponse } from "@tanstack/ai"
import { geminiText } from "@tanstack/ai-gemini"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const stream = chat({
    adapter: geminiText("gemini-2.0-flash"),
    messages,
  })

  return toServerSentEventsResponse(stream)
}`,
      },
    ],
  },
  'tool-steps': {
    tabs: [
      {
        id: 'definition',
        label: '1. Definition',
        filename: 'tools/definitions.ts',
        dotColor: '#eab308',
        code: `import { toolDefinition } from "@tanstack/ai"
import { z } from "zod"

// Step 1: Define the tool schema (shared between server & client)
export const getWeatherDef = toolDefinition({
  name: "get_weather",
  description: "Get the current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("City and state, e.g. San Francisco, CA"),
    unit: z.enum(["celsius", "fahrenheit"]).optional(),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    conditions: z.string(),
    location: z.string(),
  }),
})`,
      },
      {
        id: 'server-impl',
        label: '2. Server Impl',
        filename: 'tools/weather.server.ts',
        dotColor: '#22c55e',
        code: `import { getWeatherDef } from "./definitions"

// Step 2a: Create server implementation
// Input is FULLY TYPED from your Zod schema!
export const getWeather = getWeatherDef.server(
  async ({ location, unit }) => {
    // TypeScript knows: location is string, unit is optional enum
    const response = await fetch(
      \`https://api.weather.com/v1?location=\${location}\`
    )
    return await response.json()
    // Return type is also validated against outputSchema
  }
)`,
      },
      {
        id: 'client-impl',
        label: '3. Client Impl',
        filename: 'tools/weather.client.ts',
        dotColor: '#3b82f6',
        code: `import { getWeatherDef } from "./definitions"

// Step 2b: Or create a client implementation (runs in browser)
export const getWeatherClient = getWeatherDef.client(
  ({ location, unit }) => {
    // Same typed inputs, different execution environment
    // Maybe use browser geolocation or cached data
    return {
      temperature: 72,
      conditions: "sunny",
      location: location,
    }
  }
)`,
      },
      {
        id: 'usage',
        label: '4. Usage',
        filename: 'api/chat.ts',
        dotColor: '#f97316',
        code: `import { chat, toServerSentEventsResponse } from "@tanstack/ai"
import { openaiText } from "@tanstack/ai-openai"
import { getWeather } from "./tools/weather.server"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const stream = chat({
    adapter: openaiText("gpt-4o"),
    messages,
    tools: [getWeather], // Pass server tools here
  })

  return toServerSentEventsResponse(stream)
}

// Or pass the definition only — TanStack AI will
// send it to the CLIENT for execution instead:
// tools: [getWeatherDef]  ← client executes this!`,
      },
    ],
  },
  streaming: {
    tabs: [
      {
        id: 'sse',
        label: 'SSE (Default)',
        filename: 'Server-Sent Events',
        dotColor: '#22c55e',
        code: `import { fetchServerSentEvents } from "@tanstack/ai-react"

// SSE is the default and recommended transport
const { messages, sendMessage } = useChat({
  connection: fetchServerSentEvents("/api/chat"),
})

// Server converts stream to SSE response:
// return toServerSentEventsResponse(stream)`,
      },
      {
        id: 'http',
        label: 'HTTP Stream',
        filename: 'HTTP Stream',
        dotColor: '#3b82f6',
        code: `import { fetchHttpStream } from "@tanstack/ai-react"

// Use HTTP streaming instead of SSE
const { messages, sendMessage } = useChat({
  connection: fetchHttpStream("/api/chat"),
})`,
      },
      {
        id: 'custom',
        label: 'Custom',
        filename: 'Custom Connection',
        dotColor: '#f97316',
        code: `import type { ConnectionAdapter } from "@tanstack/ai-react"

// Build your own transport (WebSocket, gRPC, etc)
const myCustomAdapter: ConnectionAdapter = {
  async *connect(options) {
    // Your custom streaming logic here
    // Must yield stream chunks that match the protocol
    const ws = new WebSocket("wss://...")
    // ... yield chunks as they arrive
  }
}`,
      },
    ],
  },
  reference: {
    tabs: [
      {
        id: 'ref-server',
        label: 'Server',
        filename: 'Server Essentials',
        dotColor: '#f97316',
        code: `// Core imports
import { chat, toServerSentEventsResponse, toolDefinition } from "@tanstack/ai"

// Adapters (pick one)
import { openaiText }    from "@tanstack/ai-openai"
import { anthropicText } from "@tanstack/ai-anthropic"
import { geminiText }    from "@tanstack/ai-gemini"
import { ollamaText }    from "@tanstack/ai-ollama"

// Basic pattern
const stream = chat({ adapter, messages, tools })
return toServerSentEventsResponse(stream)`,
      },
      {
        id: 'ref-client',
        label: 'Client',
        filename: 'Client (React) Essentials',
        dotColor: '#3b82f6',
        code: `// React hook + connection
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react"

// Client tools & typed options
import {
  clientTools,
  createChatClientOptions,
  type InferChatMessages,
} from "@tanstack/ai-client"

// Basic usage
const { messages, sendMessage, isLoading } = useChat({
  connection: fetchServerSentEvents("/api/chat"),
})

// With client tools
const tools = clientTools(myClientTool1, myClientTool2)
const opts = createChatClientOptions({ connection, tools })
type Msgs = InferChatMessages<typeof opts>  // Full type inference!`,
      },
      {
        id: 'ref-tools',
        label: 'Tools',
        filename: 'Tool Patterns',
        dotColor: '#22c55e',
        code: `// 1. Define (shared)
const myToolDef = toolDefinition({ name, inputSchema, outputSchema })

// 2a. Server implementation
const myToolServer = myToolDef.server(async (input) => { /* ... */ })

// 2b. Client implementation
const myToolClient = myToolDef.client((input) => { /* ... */ })

// 3a. Server executes
chat({ tools: [myToolServer] })

// 3b. Client executes (pass definition only)
chat({ tools: [myToolDef] })

// With approval
const protectedDef = toolDefinition({
  name: "dangerous_action",
  needsApproval: true,
  // ...
})`,
      },
    ],
  },
}

// ── useChat API ──────────────────────────────────────────────────

export interface TsaiApiEntry {
  property: string
  type: string
  purpose: string
}

export const TSAI_USE_CHAT_API: TsaiApiEntry[] = [
  { property: 'messages', type: 'UIMessage[]', purpose: 'All messages with typed parts (text, thinking, tool-call, tool-result)' },
  { property: 'sendMessage', type: '(content: string) => Promise', purpose: 'Sends a user message and triggers streaming' },
  { property: 'isLoading', type: 'boolean', purpose: 'True while waiting for a response' },
  { property: 'error', type: 'Error | undefined', purpose: 'Any error from the last request' },
  { property: 'stop', type: '() => void', purpose: 'Cancels the current stream' },
  { property: 'reload', type: '() => Promise', purpose: 'Re-sends the last user message' },
  { property: 'clear', type: '() => void', purpose: 'Resets all messages' },
  { property: 'addToolApprovalResponse', type: '(response) => Promise', purpose: 'Approve or deny a tool call' },
  { property: 'setMessages', type: '(msgs) => void', purpose: 'Manually set message state' },
]

// ── Tool lifecycle states ────────────────────────────────────────

export interface TsaiToolState {
  label: string
  accent: string
  darkAccent: string
}

export const TSAI_TOOL_STATES: TsaiToolState[] = [
  { label: 'pending', accent: '#eab308', darkAccent: '#facc15' },
  { label: 'running', accent: '#3b82f6', darkAccent: '#60a5fa' },
  { label: 'approval-requested', accent: '#f97316', darkAccent: '#fb923c' },
  { label: 'output-available', accent: '#22c55e', darkAccent: '#4ade80' },
  { label: 'output-error', accent: '#ef4444', darkAccent: '#f87171' },
]

// ── Comparison table ─────────────────────────────────────────────

export interface TsaiComparisonRow {
  feature: string
  tanstack: string
  vercel: string
  tanstackHighlight?: boolean
}

export const TSAI_COMPARISON: TsaiComparisonRow[] = [
  { feature: 'Open Source', tanstack: '\u2713 MIT, no service', vercel: '\u2713 Apache 2.0' },
  { feature: 'Framework Lock-in', tanstack: '\u2713 None', vercel: 'Favors Next.js', tanstackHighlight: true },
  { feature: 'Type-Safe Provider Options', tanstack: '\u2713 Per-model', vercel: 'Partial', tanstackHighlight: true },
  { feature: 'Isomorphic Tools', tanstack: '\u2713 Server + Client', vercel: 'Server-focused', tanstackHighlight: true },
  { feature: 'Tool Approval Flow', tanstack: '\u2713 Built-in', vercel: 'Manual', tanstackHighlight: true },
  { feature: 'Multi-Language Server', tanstack: '\u2713 TS, PHP, Python', vercel: 'TypeScript only', tanstackHighlight: true },
  { feature: 'DevTools', tanstack: '\u2713 Full panel', vercel: '\u2014' },
  { feature: 'Tree-Shaking', tanstack: '\u2713 Per adapter', vercel: 'Partial' },
  { feature: 'Production Readiness', tanstack: 'Alpha', vercel: 'Stable' },
]

// ── Architecture flow steps ──────────────────────────────────────

export interface TsaiFlowStep {
  icon: string
  label: string
  accent: string
  darkAccent: string
}

export const TSAI_ARCH_FLOW: TsaiFlowStep[] = [
  { icon: '\u269B\uFE0F', label: 'React UI', accent: '#3b82f6', darkAccent: '#60a5fa' },
  { icon: '\uD83E\uDE9D', label: 'useChat()', accent: '#06b6d4', darkAccent: '#22d3ee' },
  { icon: '\uD83D\uDCE1', label: 'SSE Connection', accent: '#a855f7', darkAccent: '#c084fc' },
  { icon: '\u2699\uFE0F', label: 'chat() Server', accent: '#f97316', darkAccent: '#fb923c' },
  { icon: '\u2705', label: 'LLM Adapter', accent: '#22c55e', darkAccent: '#4ade80' },
]

// ── Chat demo responses ──────────────────────────────────────────

export interface TsaiChatResponse {
  thinking: string
  tool?: string
  toolResult?: string
  reply: string
}

export const TSAI_CHAT_RESPONSES: Record<string, TsaiChatResponse> = {
  weather: {
    thinking: 'The user is asking about weather. I should use the get_weather tool to fetch current conditions...',
    tool: '\uD83D\uDD27 get_weather({ location: "Tokyo, Japan", unit: "celsius" })',
    toolResult: '\u2705 { temperature: 18, conditions: "partly cloudy", location: "Tokyo" }',
    reply: 'It\u2019s currently 18\u00B0C and partly cloudy in Tokyo. A pleasant day \u2014 great for exploring the city!',
  },
  code: {
    thinking: 'The user is asking about code. Let me provide a helpful example using TanStack AI patterns...',
    reply: 'Here\u2019s the pattern: import chat from @tanstack/ai, pick your adapter (openaiText, anthropicText, etc.), define tools with Zod schemas, and stream responses with toServerSentEventsResponse. The beauty is that swapping providers is literally a one-line change.',
  },
  default: {
    thinking: 'Let me think about how to respond to this query...',
    reply: 'That\u2019s a great question! In TanStack AI, you\u2019d handle this by defining tools with toolDefinition() and connecting them to your chat endpoint. The useChat hook makes the frontend integration seamless.',
  },
}

// ── Install command examples ─────────────────────────────────────

export const TSAI_INSTALL_EXAMPLES = [
  { label: 'Core + React + OpenAI', cmd: 'npm install @tanstack/ai @tanstack/ai-react @tanstack/ai-openai' },
  { label: 'With Anthropic', cmd: 'npm install @tanstack/ai @tanstack/ai-react @tanstack/ai-anthropic' },
  { label: 'Multi-provider', cmd: 'npm install @tanstack/ai @tanstack/ai-react @tanstack/ai-openai @tanstack/ai-anthropic @tanstack/ai-gemini' },
]

export const TSAI_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'tanstack-ai',
    icon: '✨',
    title: 'TanStack AI',
    startPageId: 'tsai-start',
    description: 'Build type-safe, provider-agnostic AI experiences with TanStack AI \u2014 streaming, isomorphic tools, and tool approval flows.',
    category: 'frontend',
    dateCreated: '2026-02-26',
    dateModified: '2026-02-26',
    sections: TSAI_GUIDE_SECTIONS,
  },
  startPageData: TSAI_START_PAGE_DATA,
}
