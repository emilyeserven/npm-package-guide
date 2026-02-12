# CLAUDE.md

## Project Overview

Educational single-page application (SPA) with multiple guides for backend engineers learning frontend development. Deployed as a static site to GitHub Pages.

## Guides

The site contains two independent guides, each with its own Start Here page, navigation order, and Previous/Next links:

### NPM Package Guide (`Web App vs. NPM Package`)
- **Start page:** `roadmap` (`src/components/RoadmapPage.tsx`)
- **Content pages:** MDX files in `src/content/sections/`, `src/content/ci/`, `src/content/bonus/`
- **Data:** `src/data/roadmapSteps.ts`

### Architecture Guide
- **Start page:** `arch-start` (`src/components/ArchStartPage.tsx`)
- **Content pages:** MDX files in `src/content/architecture/`
- **Data:** `src/data/archData.ts` (stack data, layer data, data flow)
- **Interactive MDX components:** `src/components/mdx/StackExplorer.tsx`, `StackProsCons.tsx`, `DataFlowDiagram.tsx`, `LayerDiagram.tsx`
- **Page IDs:** `arch-start`, `arch-what-is-a-stack`, `arch-stack-{mern,pfrn,mean,lamp,django,rails}`, `arch-how-it-connects`

## Tech Stack

- **Framework:** React 19 + TanStack Router (hash-based routing for GitHub Pages) + TanStack Table (External Resources, Glossary)
- **Language:** TypeScript (strict mode)
- **Build Tool:** Vite 7
- **Package Manager:** pnpm
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + `clsx` for conditional classes
- **Hosting:** GitHub Pages at `/npm-package-guide/` subpath

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server |
| `pnpm build` | TypeScript check (`tsc -b`) + Vite build |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build |

## Project Structure

- `src/components/` — React functional components (TSX)
- `src/components/mdx/` — MDX-available components (registered in `src/components/mdx/index.ts`)
- `src/content/` — MDX content pages, auto-discovered by `src/content/registry.ts`
  - `src/content/sections/` — NPM Package Guide main sections
  - `src/content/ci/` — NPM Package Guide CI pipeline sections
  - `src/content/bonus/` — NPM Package Guide bonus sections
  - `src/content/architecture/` — Architecture Guide pages
- `src/data/` — Content stored as TypeScript objects (roadmap steps, architecture data, checklists, etc.)
- `src/helpers/` — Utility functions (`cmd.ts` for package manager commands, `fnRef.ts` for footnotes)
- `src/hooks/` — Custom React hooks (`usePMContext.tsx` for npm/pnpm switching)
- `src/router.tsx` — TanStack Router configuration with all routes
- `src/main.tsx` — Application entry point

## Key Patterns

- **Content as data:** Page content lives in `src/data/` as TypeScript objects with HTML strings, not inline JSX. Content updates go in data files, not components.
- **HTML rendering:** Components use `HtmlContent` (wraps `dangerouslySetInnerHTML`) to render HTML strings from data files.
- **Package manager context:** `usePM()` hook + `cmd()` helper handle npm/pnpm command display switching throughout the app.
- **Functional components only:** No class components. Props typed with TypeScript interfaces.
- **Interactive tables:** The External Resources page (`ExternalResourcesPage.tsx`) and Glossary page (`GlossaryPage.tsx`) use TanStack Table for sortable, filterable, searchable tables.
- **Styling:** Use inline Tailwind utility classes on JSX elements. Avoid defining component-level classes with `@apply` in `App.css`. CSS is only for things that genuinely require it: pseudo-elements (`::before`, `::after`), complex nested selectors, body-level toggles, animations/transitions, and third-party library attribute selectors (e.g., cmdk `[cmdk-input]`). Using `@apply` within those CSS-only rules is acceptable.

## Footnotes & References

Content pages can include two kinds of external links at the bottom, managed via the `links` array in each content page's frontmatter/registry entry:

- **Footnotes** are numbered references tied to specific content via `<FnRef>` markers (e.g., `<FnRef n={1} />`). They appear in a "Footnotes" section with their number, link, source, and optional note. The `data-fn` attributes on `<FnRef>` elements are used by `FootnoteTooltip.tsx` for hover/click tooltip behavior.
- **References** ("Further Reading") are supplemental links not tied to specific content — any link in the `links` array that is NOT referenced by a `<FnRef>` in the MDX body becomes a "Further Reading" entry.

Both should include descriptions (`note` field in `SectionLink`) when possible to help readers understand relevance.

## TypeScript Configuration

Strict mode with additional checks enabled:
- `noUnusedLocals`, `noUnusedParameters`
- `noFallthroughCasesInSwitch`
- `noUncheckedSideEffectImports`
- `erasableSyntaxOnly`
- Target: ES2022, JSX: react-jsx

## Linting

ESLint uses flat config format (`eslint.config.js`), extending:
- `js.configs.recommended`
- `tseslint.configs.recommended`
- `reactHooks.configs.flat.recommended`
- `reactRefresh.configs.vite`

## Page Ordering

Each guide has its own independent navigation order. Pages must appear in the same order in all four places per guide:

1. **Navigation sidebar** (`src/components/Sidebar.tsx`) — the section groups and items
2. **Start Page** (guide's Start Here page) — the roadmap steps and links
3. **`getNavOrder()` in `src/data/navigation.ts`** — the ordered array that drives Previous/Next links
4. **Command menu** (`src/components/CommandMenu.tsx`) — the `buildingPackageOrder`, `ciOrder`, `bonusOrder`, and `resourceIds` arrays that populate the Cmd+K palette

The `getNavOrder(currentId)` function returns the correct guide's order based on the current page ID. NPM Package Guide pages use the default order; Architecture Guide pages (matching `ARCH_PAGE_IDS` from `src/data/archData.ts`) use the architecture order.

When adding, removing, or reordering pages, update all four locations for the affected guide to stay in sync.

## Adapting Claude Artifacts into Guides

Claude artifacts are typically monolithic JSX or HTML files with embedded data and inline styles. This section describes how to decompose them into the multi-page MDX architecture used by this app. The Architecture Guide conversion is the canonical example: the original single-component `ArchitecturePage.tsx` (504 lines) was split into 8 MDX pages, 4 interactive components, and a centralized data file.

### Conversion steps

| Step | Action |
|------|--------|
| 1. Identify content boundaries | Find natural page breaks in the monolithic component. Each distinct topic or section heading becomes its own MDX page. |
| 2. Extract data to `src/data/` | Move inline constants, arrays, and objects into a new typed `.ts` file. Define interfaces for data shapes. Export a `NAV_ORDER` array and `PAGE_IDS` set for use by `navigation.ts`. |
| 3. Create MDX pages in `src/content/<guide>/` | One `.mdx` file per page with frontmatter (`id`, `title`). Use existing MDX components (`SectionIntro`, `Toc`, `TocLink`, `ColItem`, `Explainer`, etc.). Pages are auto-discovered by `src/content/registry.ts` — no manual import needed. |
| 4. Extract interactive components to `src/components/mdx/` | Stateful or interactive UI (explorers, diagrams, accordions) becomes a standalone component that reads data from `src/data/` via a prop (e.g., `<StackExplorer stackId="mern" />`). Register it in `src/components/mdx/index.ts`. |
| 5. Create Start page in `src/components/` | Build the learning path using HTML template literals + `HtmlContent`. Reference `contentPages` from the registry for page titles. Include `<PrevNextNav>`. |
| 6. Add router entry in `src/router.tsx` | Add the start page ID to `SectionRouter`. MDX pages auto-route via `contentPages`. |
| 7. Update navigation in 4 places | See the **Page Ordering** section above. |

### MDX page template

```mdx
---
id: "guide-page-id"
title: "Page Title"
---

<h1 className="section-title">{frontmatter.title}</h1>

<Toc>
  <TocLink id="toc-first">First section</TocLink>
</Toc>

<SectionIntro>
Brief intro paragraph.
</SectionIntro>

<h2 className="section-subheading" id="toc-first">First section</h2>

<div className="section-list">
<ColItem>Content here.</ColItem>
</div>
```

### Common pitfalls

- Use `className`, not `class` — MDX is JSX, not HTML.
- Use self-closing JSX tags: `<br />`, `<img />`, not `<br>`, `<img>`.
- Normalize inline styles and CSS classes into Tailwind utility classes. Prefer Tailwind's built-in scale over arbitrary values (e.g., use `text-sm` instead of `text-[13px]`).
- Keep data in `src/data/`, not inline in MDX files or components.
- Only Start page components use `HtmlContent` / `dangerouslySetInnerHTML`. MDX pages use MDX components directly.
- Export `NAV_ORDER` and `PAGE_IDS` from the data file so `navigation.ts` can import them.
- Register any new interactive MDX components in `src/components/mdx/index.ts` or they won't be available in MDX files.

## Pre-Push Checklist

- Run `pnpm install` before running lint or build to ensure dependencies are installed.
- Run `pnpm lint` first, then `pnpm build`. Lint catches issues faster and cheaper than a full build.
- When fixing lint errors, try `pnpm lint --fix` first to auto-fix what ESLint can handle, then manually fix any remaining issues.
