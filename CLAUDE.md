# CLAUDE.md

## Project Overview

Educational single-page application (SPA) with multiple guides for backend engineers learning frontend development. Deployed as a static site to GitHub Pages.

## Guides

Twelve independent guides plus top-level resource pages. All metadata centralized in `src/data/guideRegistry.ts`. Each guide has its own `CLAUDE.md` in its content directory with guide-specific audience, conventions, and component usage.

| Guide ID | Title | Start Page |
|----------|-------|------------|
| `npm-package` | Web App vs. NPM Package | `roadmap` |
| `architecture` | Architecture Guide | `arch-start` |
| `testing` | Testing Guide | `test-start` |
| `prompt-engineering` | Prompt Engineering | `prompt-start` |
| `ci-cd` | CI/CD & GitHub Actions | `cicd-start` |
| `auth` | Auth for Frontend Engineers | `auth-start` |
| `kubernetes` | Kubernetes & Helm | `k8s-start` |
| `ai-infra` | AI Infrastructure | `ai-start` |
| `nextjs-abstractions` | Next.js Abstractions | `nja-start` |
| `wp-agents` | WordPress API & Agents | `wp-agents-guide` |
| `git-worktrees` | Git Worktrees & Claude Code | `git-worktrees-guide` |
| `security` | Security Awareness | `sec-start` |
| `state-management` | React State Management | `sm-start` |
| `claude-skills` | Anatomy of a Claude Skill | `cs-start` |
| `zustand` | Zustand Deep Dive | `zst-start` |

Guides are multi-page by default. `wp-agents` is a single-page guide (`singlePage: true` in registry).

Every guide follows the same file layout:
- **Data:** `src/data/<guideId>Data.ts` (or `src/data/<guideId>Data/` directory)
- **Content pages:** `src/content/<guide-id>/*.mdx` (auto-discovered)
- **Interactive components:** `src/components/mdx/<guide-id>/`
- **Glossary terms:** `src/data/glossaryTerms/<guideId>Terms.ts`
- **Link registry:** `src/data/linkRegistry/<guideId>Links.ts`
- **Guide-specific docs:** `src/content/<guide-id>/CLAUDE.md`

### Top-Level Resources

- **External Resources** (`src/components/ExternalResourcesPage.tsx`) — searchable, filterable table derived from `src/data/linkRegistry/`.
- **Glossary** (`src/components/GlossaryPage.tsx`) — searchable glossary. Data in `src/data/glossaryTerms/`.
- Both support `?guide=` URL param to pre-select a guide filter.

## Tech Stack

React 19 · TanStack Router (hash-based) · TanStack Table · Zustand · TypeScript (strict) · Vite 7 · pnpm · Tailwind CSS v4 + `clsx` · GitHub Pages at `/npm-package-guide/`

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server |
| `pnpm build` | TypeScript check + Vite build |
| `pnpm lint` | Run ESLint |
| `pnpm validate` | Full pipeline: `validate:data` + `lint` + `build` |

## Project Structure

- `src/components/` — Shared React components; `src/components/mdx/` has MDX-available components (register in `index.ts`)
- `src/content/<guide-id>/` — MDX pages, auto-discovered by `src/content/registry.ts`
- `src/data/` — TypeScript data objects; `linkRegistry/` and `glossaryTerms/` split by guide
- `src/data/guideRegistry.ts` — Central guide registry (metadata, sections, lookup helpers)
- `src/helpers/` — Utilities (`cmd.ts`, `fnRef.ts`, `darkStyle.ts`, `themeColors.ts`)
- `src/hooks/` — Zustand stores and hooks (`useTheme.tsx`, `usePMContext.tsx`, `useUIStore.ts`)

## Key Patterns

- **State management:** Zustand stores in `src/hooks/` — no React Context providers. `useTheme()` and `useIsDark()` for theme, `usePM()` for package manager, `useUIStore` for sidebar/command-menu/scroll/pin state. Stores sync to DOM and localStorage via module-level subscriptions.
- **Content as data:** Page content in `src/data/` as TypeScript objects with HTML strings, not inline JSX.
- **Styling:** Tailwind utility classes. CSS only for pseudo-elements, animations, and third-party selectors.
- **Dark mode:** Use Tailwind `dark:` variants for static colors. Use `ds()` from `src/helpers/darkStyle.ts` for dynamic inline styles from data. For common color pairs (text, backgrounds, borders, shadows), prefer `tc(theme.X, isDark)` from `src/helpers/themeColors.ts` instead of raw `ds()` calls. Dark palette: bg `#1e293b`, text `#e2e8f0`, borders `#334155`.
- **Checklists:** Use `<GuideChecklist checklistId="..." />` in MDX. All checklist data and metadata is registered in `src/components/mdx/GuideChecklist.tsx`. Do not create per-guide checklist wrapper components.
- **YAML explorers:** Use `YamlExplorerBase` (`src/components/mdx/YamlExplorerBase.tsx`) for interactive YAML annotation UIs. Guide-specific wrappers pass data and file name to the base.
- **Shared over guide-specific:** Always prefer shared components (`SectionLayout`, `TimelineFlow`, `ProsCons`, `DefinitionTable`, etc.) over creating guide-specific ones. Only create a component in `src/components/mdx/<guide-id>/` when the UI is genuinely unique to that guide or when a thin data-lookup wrapper is needed. See `docs/COMPONENT_REFERENCE.md` for the full list of shared bases and consolidation guidance.
- **Page ordering:** Each guide's `*_GUIDE_SECTIONS` array is the single source of truth — sidebar, command menu, prev/next, and home tiles derive automatically.
- **MDX titles:** Every `title` must end with an emoji suffix (parsed by sidebar and command menu).
- **Checklists content:** Checklist MDX pages live in `src/content/checklist/` (shared directory, not a guide). See `src/content/checklist/CLAUDE.md` for template and rules. Do not add `guide:` frontmatter to checklist pages.

## Adding or Modifying Guide Pages

1. Create `src/content/<guide-id>/<page-id>.mdx` with frontmatter: `id`, `title` (emoji suffix), `guide`.
2. Add the page ID to the guide's `*_GUIDE_SECTIONS` in its data file.
3. Register any new components in `src/components/mdx/index.ts`.
4. Add link entries to `src/data/linkRegistry/<guideId>Links.ts` as needed.

For full guide creation, use the `/add-guide` skill.

## Pre-Push Checklist

- `pnpm install` then `pnpm validate` (or `validate:data` + `lint` + `build` individually).
- Try `pnpm lint --fix` first for auto-fixable lint errors.

## Reference

Detailed conventions (read on-demand, not needed for most tasks):

- `docs/CONTENT_REFERENCE.md` — MDX frontmatter, link registry, glossary, footnotes, cross-page links, navigation formatting
- `docs/DEVELOPMENT_REFERENCE.md` — `ds()` helper, routing, page ordering, build validation, TypeScript/ESLint config, error troubleshooting
- `docs/COMPONENT_REFERENCE.md` — Shared base components, when to create (or avoid) guide-specific components, consolidation opportunities
