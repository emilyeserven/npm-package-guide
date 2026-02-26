# TanStack Start — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers learning about full-stack React frameworks. This guide covers TanStack Start from architecture through deployment, comparing it with Next.js and showing how it builds on TanStack Router.

## Sections

| Section | Pages | Purpose |
|---------|-------|---------|
| Core Concepts | tss-intro, tss-architecture | What Start is, the 5-layer stack, project structure |
| Routing & Server | tss-routing, tss-server-fns, tss-middleware | File-based routing, server functions, composable middleware |
| Integration | tss-data-loading, tss-comparison, tss-getting-started | Data loading patterns, Next.js comparison, quick start |

## Interactive Components

| Component | Props | Data Source | Used On |
|-----------|-------|-------------|---------|
| `TssFeatureCards` | *(none)* | `TSS_FEATURES` | tss-intro |
| `TssArchitectureDiagram` | *(none)* | `TSS_ARCH_LAYERS` | tss-architecture |
| `TssFileTree` | *(none)* | `TSS_FILE_TREE` | tss-architecture |
| `TssCodeTabs` | `exampleId: string` | `TSS_CODE_EXAMPLES` | tss-routing, tss-server-fns, tss-middleware, tss-data-loading, tss-getting-started |
| `TssComparisonView` | *(none)* | `TSS_COMPARISON_FEATURES`, `TSS_PHILOSOPHY_*`, `TSS_WHEN_TO_USE` | tss-comparison |

## Guide-Specific Conventions

- All code examples stored as strings in `TSS_CODE_EXAMPLES`, keyed by `exampleId`.
- Architecture layers render top-to-bottom (Deploy → Nitro → Start → Router → Vite).
- Comparison view has three toggled sub-views: table, philosophy, when-to-use.
- Dark mode: all components use `useIsDark()` + `ds()`/`tc()` from helpers.
