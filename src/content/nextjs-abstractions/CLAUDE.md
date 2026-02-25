# Next.js Abstractions Guide — CLAUDE.md

## Audience & Purpose

Engineers separating a Next.js app into a standalone React SPA frontend and a Node.js backend (Express, Fastify). Covers backend and middleware concepts that Next.js abstracts away.

## Interactive Components

- **`ConceptDetail`** (`conceptId: string`) — Two side-by-side cards ("What Next.js Does" vs. "What You Need"), difficulty badge, and "For Your Stack" section with framework-specific bullets.
- **`GuideChecklist`** (`checklistId="nja"`) — Unified checklist component. Data from `njaData/checklist.ts`.

## Guide-Specific Conventions

- Each concept page uses `<ConceptDetail conceptId="..." />` — no inline data.
- "For Your Stack" notes are generalized (no TanStack/airgapped-specific references).
- Key terms auto-enrich from glossary via `enrichGlossaryTermsDOM`.
- Checklist uses shared `ChecklistBase` pattern.
