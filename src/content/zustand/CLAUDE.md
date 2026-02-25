# Zustand Deep Dive Guide — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning Zustand state management for React. Covers the full lifecycle from first store creation through production patterns (slices, middleware, testing).

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

## Guide-Specific Conventions

- Code examples are identified by `exampleId` strings (e.g., `"basic-store"`, `"bad-sub"`, `"good-sub"`).
- Example variants: `good` (green border), `bad` (red border), `info` (blue border), `neutral` (gray border).
- Use `ZstCodeGroup` with comma-separated IDs for bad/good pairs: `<ZstCodeGroup ids="bad-sub, good-sub" />`.
- All demos use local React state to simulate Zustand behavior in the static site context.
- **Adding examples:** Add a `CodeExample` entry to `codeExamples.ts`, then reference in MDX via `<ZstCodeBlock exampleId="new-id" />` or `<ZstCodeGroup ids="..." />`.
