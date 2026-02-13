# Auth for Frontend Engineers — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **auth**-specific context only.

## Audience & Purpose

Backend engineers who understand authentication and authorization on the server side but need to implement them in a frontend context. Teaches tokens, JWTs, OAuth 2.0/OIDC, frontend auth patterns (React context, protected routes, silent refresh), and security threats.

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `auth-start` |
| Foundations | `auth-core`, `auth-tokens`, `auth-jwt` |
| Protocols & Patterns | `auth-oauth`, `auth-frontend` |
| Security & Review | `auth-security`, `auth-quiz` |

The `auth-checklist` page is part of the cross-guide Checklists group (see `checklistPages` in `guideRegistry.ts`).

Defined in `AUTH_GUIDE_SECTIONS` in `src/data/authData/navigation.ts`.

## File Locations

| Category | Path |
|----------|------|
| Content pages | `src/content/auth/*.mdx` |
| Data directory | `src/data/authData/` (barrel-exported) |
| Type definitions | `src/data/authData/types.ts` |
| Concept data | `src/data/authData/concepts.ts` |
| Navigation & start page | `src/data/authData/navigation.ts` |
| Interactive components | `src/components/mdx/auth/` |
| Link registry | `src/data/linkRegistry/authLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/authTerms.ts` |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `ConceptCards` | `sectionId: string` | `AuthConceptSection[]` in `concepts.ts` | Cards with term, definition, analogy, and examples |
| `JwtParts` | *(none)* | `JwtPart[]` in `concepts.ts` | Interactive JWT header/payload/signature breakdown |
| `OAuthFlow` | *(none)* | `OAuthFlowStep[]` in `concepts.ts` | Step-by-step Authorization Code flow diagram |
| `AuthPatterns` | *(none)* | `AuthPattern[]` in `concepts.ts` | Recommended vs. avoid patterns with code examples |
| `SecurityThreats` | *(none)* | `SecurityThreat[]` in `concepts.ts` | Threats with severity levels (critical/high/medium) |
| `AuthChecklist` | *(none)* | `AuthChecklistItem[]` in `concepts.ts` | Categorized implementation checklist |
| `AuthQuiz` | *(none)* | `QuizQuestion[]` in `concepts.ts` | Multiple-choice questions with explanations |

## Guide-Specific Conventions

### Sequential learning path

The start page uses numbered steps 1–5 plus a bonus section. Pages are designed to be read in order — each builds on the previous.

### SectionMeta pattern

Several data arrays include a `SectionMeta` object (e.g., `JwtSectionMeta`, `OAuthSectionMeta`, `SecuritySectionMeta`) with `heading`, `intro`, and `keyTakeaway` fields. Components render these as section structure: a heading, an introductory paragraph, and a key takeaway callout. This is unique to the auth guide.

### Concept cards

`ConceptCards` renders terms with four fields each: `term`, `definition`, `analogy` (maps backend concept to frontend), and `examples` array. The `color`/`darkColor` fields control card accent colors.

### Threat severity

`SecurityThreats` uses the `ThreatSeverity` union (`'critical' | 'high' | 'medium'`) to color-code threat cards by risk level.

### Data types

Key interfaces in `src/data/authData/types.ts`:

- `AuthConcept` — term/definition/analogy/color/darkColor/examples
- `AuthConceptSection` — id/heading/intro/keyTakeaway + concepts array
- `JwtPart` — name/color/json/desc
- `OAuthFlowStep` — step/label/detail/actor
- `AuthPattern` — name/recommendation/avoid/code
- `SecurityThreat` — name/risk/defense/severity
- `QuizQuestion` — q/options/answer/explanation

## Adding a New Page

1. Create `src/content/auth/<page-id>.mdx` with frontmatter (`id`, `title` with emoji, `guide: "auth"`).
2. Add the page ID to `AUTH_GUIDE_SECTIONS` in `src/data/authData/navigation.ts` under the correct section label.
3. If adding data-driven content, define the data types in `types.ts` and add the data to `concepts.ts`.
4. Create the component in `src/components/mdx/auth/` and register it in `src/components/mdx/index.ts`.
