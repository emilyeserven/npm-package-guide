# Zustand Deep Dive Guide — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning Zustand state management for React. Covers the full lifecycle from first store creation through production patterns (slices, middleware, testing).

## Section Structure

Defined in `ZST_GUIDE_SECTIONS` in `src/data/zustandData/navigation.ts`.

| Section Label | Page IDs |
|---|---|
| *(start)* | `zst-start` |
| Fundamentals | `zst-basics`, `zst-incorrect`, `zst-correct` |
| Pitfalls & Patterns | `zst-gotchas`, `zst-slices` |
| Production | `zst-middleware`, `zst-advanced` |

## Interactive Components

| Component | Props | Purpose |
|---|---|---|
| `ZstCodeBlock` | `exampleId` (string) | Renders a single code example with variant-colored label |
| `ZstCodeGroup` | `ids` (comma-separated string) | Renders multiple code blocks in sequence |
| `ZstApiRef` | *(none)* | API quick-reference table |
| `ZstCounter` | *(none)* | Live counter demo (Basics page) |
| `ZstTodo` | *(none)* | Live todo list demo (Correct Usage page) |
| `ZstRerenderViz` | *(none)* | Re-render visualizer demo (Advanced page) |
| `ZstStats` | *(none)* | Stats grid (Basics page) |
| `ZstSlicesCompare` | *(none)* | Single vs multiple stores comparison cards |

## Data Files

- `src/data/zustandData/types.ts` — TypeScript interfaces
- `src/data/zustandData/codeExamples.ts` — All code examples, stats, and API reference data
- `src/data/zustandData/navigation.ts` — Guide sections and start page data

## Guide-Specific Conventions

- Code examples are identified by `exampleId` strings (e.g., `"basic-store"`, `"bad-sub"`, `"good-sub"`).
- Example variants: `good` (green border), `bad` (red border), `info` (blue border), `neutral` (gray border).
- Use `ZstCodeGroup` with comma-separated IDs for bad/good pairs: `<ZstCodeGroup ids="bad-sub, good-sub" />`.
- All demos use local React state to simulate Zustand behavior in the static site context.

## Adding New Content

1. Add a new `CodeExample` entry to the appropriate array in `codeExamples.ts`
2. Reference it in MDX via `<ZstCodeBlock exampleId="new-id" />` or `<ZstCodeGroup ids="..." />`
3. Add the page ID to `ZST_GUIDE_SECTIONS` in `navigation.ts`
