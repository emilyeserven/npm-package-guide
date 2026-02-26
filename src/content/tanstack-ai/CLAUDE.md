# TanStack AI — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers exploring AI SDK options for building chat interfaces and AI-powered features. This guide covers TanStack AI's type-safe, provider-agnostic approach — from basic server setup through isomorphic tools and approval flows.

## Sections

| Section | Pages | Purpose |
|---------|-------|---------|
| Getting Started | tsai-overview | What TanStack AI is, core features, package ecosystem |
| Core Concepts | tsai-architecture, tsai-server, tsai-client | Client-server architecture, provider setup, useChat hook |
| Advanced | tsai-tools, tsai-streaming | Isomorphic tools, approval flows, streaming transports |
| Reference | tsai-reference | Comparison with Vercel AI SDK, API cheatsheet |

## Interactive Components

| Component | Props | Data Source | Used On |
|-----------|-------|-------------|---------|
| `TsaiCodeTabs` | `exampleId: string` | `TSAI_CODE_EXAMPLES` | tsai-server, tsai-tools, tsai-streaming, tsai-reference |
| `TsaiFeatureCards` | *(none)* | `TSAI_FEATURES` | tsai-overview |
| `TsaiPackageGrid` | *(none)* | `TSAI_PACKAGES`, `TSAI_INSTALL_EXAMPLES` | tsai-overview |
| `TsaiChatDemo` | *(none)* | `TSAI_CHAT_RESPONSES` | tsai-tools |
| `TsaiApprovalDemo` | *(none)* | *(inline)* | tsai-tools |
| `TsaiComparisonTable` | *(none)* | `TSAI_COMPARISON` | tsai-reference |

## Guide-Specific Conventions

- **Accent color:** `#f97316` (orange, matching TanStack branding). Dark: `#fb923c`.
- **Code examples:** All code stored as plain text strings in `TSAI_CODE_EXAMPLES`, keyed by `exampleId`. The `TsaiCodeTabs` component handles tabbed rendering.
- **Chat demo:** Simulated responses in `TSAI_CHAT_RESPONSES` keyed by topic (weather, code, default). The demo includes thinking tokens, tool calls, and streamed text.
- **No real API calls:** All demos are simulated — no actual LLM connections.
