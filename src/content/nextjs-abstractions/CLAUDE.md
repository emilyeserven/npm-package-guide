# Next.js Abstractions Guide — CLAUDE.md

## Audience & Purpose

Engineers who have been working with Next.js and are separating their architecture into a standalone React SPA frontend and a Node.js backend (Express, Fastify, or similar). The guide covers the backend and middleware concepts that Next.js abstracts away, helping readers understand what they need to implement themselves.

## Section Structure

| Section Label | Page IDs | Topic |
|--------------|----------|-------|
| *(start)* | `nja-start` | Learning path overview |
| Request Lifecycle | `nja-routing`, `nja-ssr`, `nja-api-routes`, `nja-middleware` | How requests flow from URL to response |
| Security & Auth | `nja-auth`, `nja-cors`, `nja-csp` | Authentication, CORS, and content security |
| Data & Config | `nja-data-fetching`, `nja-env-config`, `nja-database` | Data fetching, env vars, and database access |
| Build & Ship | `nja-build-bundling`, `nja-error-handling`, `nja-deployment` | Build pipelines, error handling, and deployment |

## File Locations

| Type | Path |
|------|------|
| Data (types, concepts, checklist, navigation) | `src/data/njaData/` |
| Link registry | `src/data/linkRegistry/njaLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/njaTerms.ts` |
| MDX content pages | `src/content/nextjs-abstractions/` |
| Checklist page | `src/content/checklist/nja-checklist.mdx` |
| Interactive components | `src/components/mdx/nextjs-abstractions/` |

## Interactive Components

### ConceptDetail
- **File:** `src/components/mdx/nextjs-abstractions/ConceptDetail.tsx`
- **Props:** `{ conceptId: string }` — matches `NjaConcept.id` in `concepts.ts`
- **Data:** `NJA_CONCEPTS` from `src/data/njaData/concepts.ts`
- **Renders:** Two side-by-side cards ("What Next.js Does" vs. "What You Need"), a difficulty badge, and a "For Your Stack" section with framework-specific bullets (Express, Fastify, and optionally PostgreSQL)

### NjaChecklist
- **File:** `src/components/mdx/nextjs-abstractions/NjaChecklist.tsx`
- **Props:** None
- **Data:** `NJA_CHECKLIST` from `src/data/njaData/checklist.ts`
- **Renders:** Wraps shared `ChecklistBase` with a 6-phase migration checklist

## Data Types

### NjaConcept
Each concept page maps to one `NjaConcept` object:
- `id` — matches the concept page suffix (e.g., `routing`, `ssr`)
- `title` — display name
- `icon` — emoji
- `color` / `darkColor` — accent colors for the comparison cards
- `whatNextDoes` — HTML string describing what Next.js handles
- `whatYouNeed` — HTML string describing what you implement yourself
- `keyTerms` — array of term names (cross-reference glossary)
- `difficulty` — `beginner` | `intermediate` | `advanced`
- `stackNotes` — array of `StackNote` objects with per-framework guidance

### StackNote
Framework-specific migration guidance:
- `framework` — `Express` | `Fastify` | `PostgreSQL`
- `icon` — emoji identifier
- `note` — HTML string with the guidance
- `packages` — optional array of npm package names

## Conventions

- Each concept page uses `<ConceptDetail conceptId="..." />` — no inline data
- "For Your Stack" notes are generalized (no TanStack/airgapped-specific references)
- Key terms auto-enrich from the glossary via `enrichGlossaryTermsDOM`
- CSP is an original section not in the source artifact
- Checklist uses shared `ChecklistBase` pattern
- All titles end with emoji suffix per project convention
