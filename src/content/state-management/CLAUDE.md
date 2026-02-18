# State Management Guide — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning React state management. Compares React Context, Zustand, and Redux Toolkit with practical code examples, and explains how React Query (TanStack Query) handles server state separately.

## Section Structure

Defined in `SM_GUIDE_SECTIONS` in `src/data/stateManagementData/navigation.ts`.

| Section Label | Page IDs |
|---|---|
| *(start)* | `sm-start` |
| Deep Dives | `sm-context`, `sm-zustand`, `sm-redux` |
| Choosing & Building | `sm-compare`, `sm-decide`, `sm-architecture` |

## Interactive Components

| Component | Props | Purpose |
|---|---|---|
| `StateDeepDive` | `techId` (`"context"`, `"zst"`, `"redux"`) | Full deep dive: stats, strengths/weaknesses, code examples with standalone/React Query tabs |
| `StateComparison` | *(none)* | Side-by-side feature comparison table across all three tools |
| `StateDecisionTree` | *(none)* | Step-by-step decision tree for choosing the right tool, with golden rule callout |
| `StateArchitecture` | *(none)* | Recommended layered architecture (4 layers) plus common anti-patterns grid |

## Data Files

- `src/data/stateManagementData/types.ts` — TypeScript interfaces
- `src/data/stateManagementData/techData.ts` — All data: `TECH_DATA`, `COMPARISON_DATA`, `DECISION_TREE`, `ARCH_LAYERS`, `ANTI_PATTERNS`, `SM_COLORS`
- `src/data/stateManagementData/navigation.ts` — Guide sections and start page data

## Guide-Specific Conventions

- Each deep dive page uses `<StateDeepDive techId="..." />` — the component handles stats, pros/cons, and dual code tabs internally.
- Tech IDs are `"context"`, `"zst"`, and `"redux"` (matching keys in `TECH_DATA`).
- Accent colors are defined in `SM_COLORS` and work on both light and dark backgrounds.
- The comparison and decision tree pages are purely data-driven from `COMPARISON_DATA` and `DECISION_TREE`.

## Adding New Content

To add a new state management tool:
1. Add a `TechData` entry to `TECH_DATA` in `techData.ts`
2. Add a row for each feature in `COMPARISON_DATA`
3. Create a new MDX page in this directory with `<StateDeepDive techId="newId" />`
4. Add the page ID to `SM_GUIDE_SECTIONS` in `navigation.ts`
