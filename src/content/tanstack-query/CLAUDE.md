# TanStack Query Guide

## Audience
Backend engineers learning frontend data management — specifically the gap between making HTTP requests (fetch/axios) and managing server state in React applications.

## Conventions
- **Accent colors:** amber (`#f59e0b`/`#d97706`), teal (`#14b8a6`/`#0d9488`), rose (`#f43f5e`/`#e11d48`), violet (`#8b5cf6`/`#7c3aed`), sky (`#38bdf8`/`#0284c7`). Stored as `[light, dark]` tuples in the data file.

## Interactive Components
All in `src/components/mdx/tanstack-query/`:

| Component | Used On | Purpose |
|-----------|---------|---------|
| `TsqCodeComparison` | `tsq-side-by-side` | Tabbed code comparison (fetch/XHR/Axios/TanStack Query) |
| `TsqComparisonTable` | `tsq-feature-matrix` | Filterable feature matrix with category pills |
| `TsqCacheDemo` | `tsq-cache-demo` | Interactive cache simulation (fetch, stale, invalidate) |
| `TsqQueryLifecycle` | `tsq-lifecycle` | Step-through 10-step lifecycle with auto-play |
| `TsqStateDiagram` | `tsq-state-taxonomy` | Expandable state type cards |
| `TsqProsCons` | `tsq-strengths-weaknesses` | Toggle between strengths/weaknesses grid |
| `TsqWhyBoth` | `tsq-architecture` | Misconception callout + tool comparison + code |

## Content Notes
- Section 06 (mutations) uses a standard MDX code block rather than a custom component
- Section 10 (decision) uses inline MDX cards with Tailwind classes
- The `tsq-problem` page uses inline MDX card grid rather than a component
