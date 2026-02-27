# TwelveLabs API — Guide CLAUDE.md

## Audience & Purpose

Backend and full-stack engineers integrating video AI into their applications. Covers TwelveLabs' three core APIs (Search, Analyze, Embed), model configuration, and end-to-end workflows including frontend integration with TanStack Query.

## Sections

| Page ID | Title | Content |
|---------|-------|---------|
| `tl-overview` | What is TwelveLabs? | Platform overview, API cards, core concepts |
| `tl-models` | Models & Capabilities | Marengo/Pegasus model families, modality options |
| `tl-setup` | Getting Started | SDK installation, client init, REST API usage |
| `tl-indexes` | Indexes & Uploading | Interactive index creation flow, video requirements |
| `tl-search` | Search API | Tabbed search examples (text/image/combined), search options |
| `tl-analyze` | Analyze API | Prompt-based analysis, structured JSON, streaming, prompt ideas |
| `tl-embed` | Embed API | Text/image/video embeddings, use cases |
| `tl-workflow` | Full Workflow | End-to-end example, TanStack Query integration |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `TlApiCards` | *(none)* | `TL_API_CARDS` | Three API overview cards (Search, Analyze, Embed) |
| `TlModelCards` | *(none)* | `TL_MODELS` | Marengo/Pegasus model cards with capabilities |
| `TlModalityCards` | *(none)* | `TL_MODALITIES` | Visual/audio/conversation modality cards |
| `TlIndexFlow` | *(none)* | `TL_INDEX_STEPS` | Interactive stepper with code (uses `useExplorer`) |
| `TlSearchTabs` | *(none)* | `TL_SEARCH_TABS` | Tabbed search code examples |
| `TlPromptIdeas` | *(none)* | `TL_PROMPT_IDEAS` | Expandable prompt suggestions (uses `AccordionList`) |
| `TlEmbedUseCases` | *(none)* | `TL_EMBED_USE_CASES` | Grid of embedding use case cards |

## Guide-Specific Conventions

- **Color scheme:** Indigo (`#6366f1`/`#818cf8`) for Marengo/Search, green (`#059669`/`#34d399`) for Pegasus/Analyze, orange (`#ea580c`/`#fb923c`) for Embed.
- **All data** lives in `src/data/twelvelabsData.ts` — components are thin wrappers that read from data and delegate to shared bases.
- **Code examples** use `CodeAccordion` in MDX for static code blocks; `CopyButton` in interactive components.
