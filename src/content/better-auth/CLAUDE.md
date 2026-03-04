# BetterAuth — Guide CLAUDE.md

## Audience & Purpose

Backend engineers evaluating or adopting BetterAuth for TypeScript projects. Covers setup, database adapters, client SDK, social auth, plugins, session management, TanStack Start integration, and comparison with Auth.js and Clerk.

## Sections

| Page ID | Title | Content |
|---------|-------|---------|
| ba-overview | Overview | What BetterAuth is, key features |
| ba-why | Why BetterAuth | Advantages over alternatives |
| ba-architecture | Architecture | Server-client split, core tables, diagram |
| ba-setup | Setup & Installation | Install, env vars, server config, handler mounting |
| ba-database | Database & Adapters | Drizzle, Prisma, MongoDB, raw SQL, Redis |
| ba-client | Client SDK | createAuthClient, hooks, sign up/in, type inference |
| ba-social | Social Auth | OAuth providers config, client usage, additional state |
| ba-tanstack | TanStack Integration | Cookie plugin, API routes, SSR session access |
| ba-plugins | Plugin Ecosystem | Plugin browser, 2FA + passkey example |
| ba-sessions | Session Management | Strategies (compact/jwt/jwe), config, stateless mode |
| ba-comparison | vs Others | Feature comparison table, quiz |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `BauthFeatureCards` | none | `BAUTH_FEATURE_CARDS` | Grid of key feature highlights |
| `BauthArchDiagram` | none | `BAUTH_ARCH_BOXES`, `BAUTH_ARCH_ARROWS` | SVG architecture diagram |
| `BauthPluginBrowser` | none | `BAUTH_PLUGINS` | Filterable plugin grid with category tabs |
| `BauthComparisonTable` | none | `BAUTH_COMPARISON_FEATURES` | Feature comparison vs Auth.js and Clerk |
| `BauthSessionCards` | none | `BAUTH_SESSION_STRATEGIES` | Session strategy cards |
| `BauthQuiz` | none | `BAUTH_QUIZ_QUESTIONS` | Multi-question quiz via QuizBase |

## Guide-Specific Conventions

- All data lives in `src/data/betterAuthData.ts` (under the 500-line threshold, no directory split needed).
- Plugin data includes `cat` (auth/enterprise/infra) and `difficulty` (easy/medium/hard) for filtering.
- Comparison table uses `boolean | string` values — `true`/`false` render as check/cross marks, strings render as yellow labels.
- Quiz uses the shared `QuizBase` component with pink accent colors (`#db2777` light / `#e879a0` dark).
