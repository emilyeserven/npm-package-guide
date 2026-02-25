# State Management Guide — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning React state management. Compares React Context, Zustand, and Redux Toolkit with practical code examples, and explains how React Query (TanStack Query) handles server state separately.

## Interactive Components

| Component | Props | Purpose |
|---|---|---|
| `StateDeepDive` | `techId` (`"context"`, `"zst"`, `"redux"`) | Full deep dive: stats, strengths/weaknesses, code examples with standalone/React Query tabs |
| `StateComparison` | *(none)* | Side-by-side feature comparison table across all three tools |
| `StateDecisionTree` | *(none)* | Step-by-step decision tree for choosing the right tool, with golden rule callout |
| `StateArchitecture` | *(none)* | Recommended layered architecture (4 layers) plus common anti-patterns grid |

## Guide-Specific Conventions

- Each deep dive page uses `<StateDeepDive techId="..." />` — the component handles stats, pros/cons, and dual code tabs internally.
- Tech IDs are `"context"`, `"zst"`, and `"redux"` (matching keys in `TECH_DATA`).
- Accent colors are defined in `SM_COLORS` and work on both light and dark backgrounds.
- The comparison and decision tree pages are purely data-driven from `COMPARISON_DATA` and `DECISION_TREE`.
- **Adding a new tool:** Add a `TechData` entry to `TECH_DATA` in `techData.ts`, add comparison rows in `COMPARISON_DATA`, then create an MDX page with `<StateDeepDive techId="newId" />`.
