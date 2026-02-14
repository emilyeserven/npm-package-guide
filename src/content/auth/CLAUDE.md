# Auth for Frontend Engineers — Guide CLAUDE.md

## Audience & Purpose

Backend engineers who understand server-side auth but need to implement it in a frontend context. Teaches tokens, JWTs, OAuth 2.0/OIDC, frontend auth patterns, and security threats.

## Section Structure

Defined in `AUTH_GUIDE_SECTIONS` in `src/data/authData/navigation.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `auth-start` |
| Foundations | `auth-core`, `auth-tokens`, `auth-jwt` |
| Protocols & Patterns | `auth-oauth`, `auth-frontend` |
| Security & Review | `auth-security`, `auth-quiz` |

Data directory: `src/data/authData/` — `types.ts`, `concepts.ts`, `navigation.ts`. See type definitions in `types.ts`.

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `ConceptCards` | `sectionId` | Cards with term, definition, analogy, and examples |
| `JwtParts` | *(none)* | Interactive JWT header/payload/signature breakdown |
| `OAuthFlow` | *(none)* | Step-by-step Authorization Code flow diagram |
| `AuthPatterns` | *(none)* | Recommended vs. avoid patterns with code examples |
| `SecurityThreats` | *(none)* | Threats with severity levels (critical/high/medium) |
| `AuthChecklist` | *(none)* | Categorized implementation checklist |
| `AuthQuiz` | *(none)* | Multiple-choice questions with explanations |

## Guide-Specific Conventions

- **Sequential learning path:** Pages designed to be read in order (steps 1–5 plus bonus).
- **SectionMeta pattern:** Data arrays include `SectionMeta` objects with `heading`, `intro`, `keyTakeaway` for structured section rendering. Unique to auth guide.
- **Concept cards:** Four fields each: `term`, `definition`, `analogy` (maps backend→frontend), `examples`. Colors via `color`/`darkColor`.
- **Threat severity:** `SecurityThreats` uses `ThreatSeverity` union (`'critical' | 'high' | 'medium'`) for color-coded threat cards.
