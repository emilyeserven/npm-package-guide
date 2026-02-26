import type { GlossaryCategory } from './index'

export const tsaiGlossary: GlossaryCategory[] = [
  {
    category: 'TanStack AI Core',
    terms: [
      {
        term: 'chat()',
        definition: 'The server-side function that orchestrates LLM conversations. Accepts an adapter, messages, and optional tools; returns an async iterable stream. Handles the full tool loop automatically.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-server',
      },
      {
        term: 'useChat',
        definition: 'React hook from <code>@tanstack/ai-react</code> that manages all client-side chat state — messages, streaming, tool execution, and approval flows.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-client',
      },
      {
        term: 'toolDefinition()',
        definition: 'Function that creates a type-safe tool definition using Zod schemas. The definition can then be implemented with <code>.server()</code> or <code>.client()</code> for isomorphic tool execution.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-tools',
      },
      {
        term: 'Adapter (TanStack AI)',
        definition: 'A provider-specific module that translates between TanStack AI\'s unified interface and a specific LLM API. Examples: <code>openaiText</code>, <code>anthropicText</code>, <code>geminiText</code>, <code>ollamaText</code>.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-overview',
      },
      {
        term: 'Server-Sent Events (SSE)',
        definition: 'A web standard for streaming data from server to client over HTTP. TanStack AI uses SSE as its default transport via <code>fetchServerSentEvents</code> and <code>toServerSentEventsResponse</code>.',
        linkId: 'mdn-sse-api',
        sectionId: 'tsai-streaming',
      },
    ],
  },
  {
    category: 'TanStack AI Patterns',
    terms: [
      {
        term: 'Isomorphic Tools',
        definition: 'TanStack AI\'s pattern of defining a tool once and implementing it for server (<code>.server()</code>) or client (<code>.client()</code>) environments. The same Zod schema provides type safety in both.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-tools',
      },
      {
        term: 'Tool Approval Flow',
        definition: 'A built-in human-in-the-loop pattern where tools with <code>needsApproval: true</code> pause execution and wait for user consent before running. Handled via <code>addToolApprovalResponse</code>.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-tools',
      },
      {
        term: 'UIMessage',
        definition: 'The message type returned by <code>useChat</code>. Contains typed <code>parts</code> (text, thinking, tool-call, tool-result) rather than a single string, enabling rich rendering.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-client',
      },
      {
        term: 'Provider Options',
        definition: 'Type-safe, per-model configuration passed to <code>chat()</code>. TypeScript infers which options are valid for each model — e.g., <code>reasoning.effort</code> is only available on reasoning models.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-streaming',
      },
      {
        term: 'Connection Adapter',
        definition: 'The transport layer between client and server in TanStack AI. Built-in options: <code>fetchServerSentEvents</code> (SSE) and <code>fetchHttpStream</code>. Custom adapters can be built for WebSocket or gRPC.',
        linkId: 'tanstack-ai-docs',
        sectionId: 'tsai-streaming',
      },
    ],
  },
]
