# Auth for Frontend Engineers — Guide CLAUDE.md

## Audience & Purpose

Backend engineers who understand server-side auth but need to implement it in a frontend context. Teaches tokens, JWTs, OAuth 2.0/OIDC, PKCE implementation, frontend auth patterns, token lifecycle management, RBAC, backend integration, and security threats.

## Section Structure

Defined in `AUTH_GUIDE_SECTIONS` in `src/data/authData/navigation.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `auth-start` |
| Foundations | `auth-core`, `auth-tokens`, `auth-jwt` |
| Protocols & Patterns | `auth-oauth`, `auth-pkce`, `auth-frontend`, `auth-refresh` |
| Advanced Patterns | `auth-rbac`, `auth-integration` |
| Security & Review | `auth-security`, `auth-quiz` |

Data directory: `src/data/authData/` — `types.ts`, `concepts.ts`, `navigation.ts`. See type definitions in `types.ts`.

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `ConceptCards` | `sectionId` | Cards with term, definition, analogy, and examples |
| `JwtParts` | *(none)* | Interactive JWT header/payload/signature breakdown |
| `OAuthFlow` | *(none)* | Step-by-step Authorization Code flow diagram |
| `PkceFlow` | *(none)* | PKCE implementation timeline with expandable code blocks |
| `AuthPatterns` | *(none)* | Recommended vs. avoid patterns with code examples |
| `TokenLifecycle` | *(none)* | Token refresh patterns: queuing, rotation, error recovery |
| `RbacPatterns` | *(none)* | RBAC patterns with frontend + backend code side by side |
| `IntegrationFlow` | *(none)* | Backend integration scenarios with triple code blocks + gotchas |
| `SecurityThreats` | *(none)* | Threats with severity levels (critical/high/medium) |
| `GuideChecklist` | `checklistId` | Unified checklist component. Use `checklistId="auth"` for this guide. |
| `AuthQuiz` | *(none)* | Multiple-choice questions with explanations |

## Guide-Specific Conventions

- **Sequential learning path:** Pages designed to be read in order (steps 1–7 plus bonus sections).
- **SectionMeta pattern:** Data arrays include `SectionMeta` objects with `heading`, `intro`, `keyTakeaway` for structured section rendering. Unique to auth guide.
- **Concept cards:** Four fields each: `term`, `definition`, `analogy` (maps backend→frontend), `examples`. Colors via `color`/`darkColor`.
- **Threat severity:** `SecurityThreats` uses `ThreatSeverity` union (`'critical' | 'high' | 'medium'`) for color-coded threat cards.
- **Dual code blocks:** `RbacPatterns` shows frontend and backend code side by side (responsive grid).
- **Triple code blocks:** `IntegrationFlow` shows frontend, backend, and HTTP headers with a gotcha callout.
- **Backend bridge:** Each new page explicitly connects frontend patterns to backend concepts the audience already knows.
