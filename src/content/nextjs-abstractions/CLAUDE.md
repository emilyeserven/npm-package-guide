# Next.js Abstractions Guide — CLAUDE.md

## Audience & Purpose

Engineers separating a Next.js app into a standalone React SPA frontend and a Node.js backend (Express, Fastify). Covers backend and middleware concepts that Next.js abstracts away.

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `nja-start` |
| Request Lifecycle | `nja-routing`, `nja-ssr`, `nja-api-routes`, `nja-middleware` |
| Security & Auth | `nja-auth`, `nja-cors`, `nja-csp` |
| Data & Config | `nja-data-fetching`, `nja-env-config`, `nja-database` |
| Build & Ship | `nja-build-bundling`, `nja-error-handling`, `nja-deployment` |

Data directory: `src/data/njaData/` — concepts, checklist, navigation.

## Interactive Components

- **`ConceptDetail`** (`conceptId: string`) — Two side-by-side cards ("What Next.js Does" vs. "What You Need"), difficulty badge, and "For Your Stack" section with framework-specific bullets.
- **`NjaChecklist`** — Wraps shared `ChecklistBase` with a 6-phase migration checklist. Data from `njaData/checklist.ts`.

## Conventions

- Each concept page uses `<ConceptDetail conceptId="..." />` — no inline data.
- "For Your Stack" notes are generalized (no TanStack/airgapped-specific references).
- Key terms auto-enrich from glossary via `enrichGlossaryTermsDOM`.
- Checklist uses shared `ChecklistBase` pattern.
