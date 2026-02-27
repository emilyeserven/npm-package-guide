# Fastify for Frontend Engineers — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers who want to understand the backend framework their API is built on — or build one themselves. Covers Fastify v5 foundations, the plugin system, request lifecycle hooks, JSON Schema validation, security plugin stack, Vite + React integration patterns, and TanStack Query/Router pairing.

## Sections

| Section | Pages | Content |
|---------|-------|---------|
| Foundations | `fastify-foundations`, `fastify-getting-started` | Architecture, performance model, minimal server setup |
| Plugin System | `fastify-plugins`, `fastify-lifecycle` | Encapsulation, `fastify-plugin`, request lifecycle hooks |
| Validation & Security | `fastify-validation`, `fastify-security` | JSON Schema, TypeBox, security plugin grid |
| Integration | `fastify-vite-react`, `fastify-tanstack` | Three Vite patterns, TanStack Query/Router pairing |
| Production | `fastify-production`, `fastify-cheatsheet` | Shutdown, errors, logging, API quick reference |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `FastifyLifecycleFlow` | *(none)* | `FASTIFY_LIFECYCLE_STEPS` | Interactive request lifecycle flow diagram — click steps to see descriptions |
| `FastifyPluginCards` | `filter?: 'essential' \| 'recommended' \| 'all'` | `FASTIFY_SECURITY_PLUGINS` | Grid of security plugin cards with status badges |
| `FastifyServerTabs` | *(none)* | `FASTIFY_SERVER_PATTERNS` | Tabbed comparison of Vite+Fastify integration approaches |

## Guide-Specific Conventions

- Lifecycle steps data includes `isHook: boolean` — hooks render in blue, non-hooks in default or green (handler).
- Plugin cards use `StatusBadge` with `FASTIFY_TAG_COLORS` for essential/recommended/integration badges.
- Server tabs display code with filename header and lang badge, plus a tip footer per tab.
