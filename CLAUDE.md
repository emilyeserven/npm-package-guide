# CLAUDE.md

## Project Overview

Educational single-page application (SPA) with multiple guides for backend engineers learning frontend development. Deployed as a static site to GitHub Pages.

## Guides

The site contains four independent guides, each with its own Start Here page, navigation order, and Previous/Next links, plus top-level resource pages shared across all guides. All guide metadata (id, icon, title, sections) is centralized in `src/data/guideRegistry.ts`.

### NPM Package Guide (`Web App vs. NPM Package`)
- **Start page:** `roadmap` (`src/components/RoadmapPage.tsx`)
- **Content pages:** MDX files in `src/content/sections/`, `src/content/ci/`, `src/content/bonus/`
- **Data:** `src/data/roadmapSteps.ts`

### Architecture Guide
- **Start page:** `arch-start` (`src/components/ArchStartPage.tsx`)
- **Content pages:** MDX files in `src/content/architecture/`
- **Data:** `src/data/archData.ts` (stack data, layer data, data flow, framework data, `ARCH_GUIDE_SECTIONS`)
- **Interactive MDX components:** `src/components/mdx/StackExplorer.tsx`, `StackProsCons.tsx`, `DataFlowDiagram.tsx`, `LayerDiagram.tsx`, `FrameworkExplorer.tsx`, `FrameworkProsCons.tsx`

### Testing Guide
- **Start page:** `test-start` (`src/components/TestingStartPage.tsx`)
- **Content pages:** MDX files in `src/content/testing/`
- **Data:** `src/data/testingData.ts` (pyramid levels, comparison rows, practice cards, `TESTING_GUIDE_SECTIONS`)
- **Interactive MDX components:** `src/components/mdx/TestingPyramid.tsx`, `ComparisonTable.tsx`, `TestingMistakeList.tsx`

### Prompt Engineering Guide
- **Start page:** `prompt-start` (`src/components/PromptStartPage.tsx`)
- **Content pages:** MDX files in `src/content/prompt-engineering/`
- **Data:** `src/data/promptData.ts` (mistake categories, context techniques, `PROMPT_GUIDE_SECTIONS`)
- **Interactive MDX components:** `src/components/mdx/MistakeList.tsx`, `MistakeSeverityBadge.tsx`, `ContextAccordion.tsx`

### Top-Level Resources
- **External Resources** (`src/components/ExternalResourcesPage.tsx`) — searchable, filterable table of documentation, articles, courses, and tools. Tagged with Guide, Type, and Topic filters. Data in `src/data/overallResources.ts`.
- **Glossary** (`src/components/GlossaryPage.tsx`) — searchable glossary with Guide and Category filters. Data in `src/data/glossaryTerms.ts`.
- Both pages support a `?guide=` URL search param to pre-select a guide filter (e.g., `/#/glossary?guide=npm-package`). Links from within guides use this param to show guide-relevant content by default.
- These pages appear in the sidebar under a dedicated "Resources" icon, in the command menu under a "Resources" group, and on the home page in a "Resources" section.

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
  - `src/content/testing/` — Testing Guide pages
  - `src/content/prompt-engineering/` — Prompt Engineering Guide pages
- `src/data/` — Content stored as TypeScript objects (roadmap steps, architecture data, checklists, etc.)
  - `src/data/guideTypes.ts` — Shared `GuideSection` and `GuideDefinition` interfaces
  - `src/data/guideRegistry.ts` — Central guide registry (all guide metadata, section definitions, lookup helpers)
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
- **Styling:** Use inline Tailwind utility classes on JSX elements. Prefer Tailwind utility classes over adding CSS rules whenever possible. Avoid defining component-level classes with `@apply` in `App.css`. CSS is only for things that genuinely require it: pseudo-elements (`::before`, `::after`), complex nested selectors, body-level toggles, animations/transitions, and third-party library attribute selectors (e.g., cmdk `[cmdk-input]`). Using `@apply` within those CSS-only rules is acceptable. Use Tailwind's built-in scale values; arbitrary values (e.g., `[360px]`) should only be used when strictly necessary (no built-in equivalent exists).
- **Dark mode:** The app uses class-based dark mode via a `useTheme()` hook (`src/hooks/useTheme.tsx`) that toggles `.dark` on `<body>`. Tailwind's custom variant `@custom-variant dark (&:where(.dark, .dark *))` enables `dark:` utility classes. For components using Tailwind classes, use `dark:` variants directly (e.g., `dark:bg-slate-800 dark:text-slate-100`). For interactive components with dynamic inline styles (where colors come from data like `comp.color`), use the `useTheme()` hook + `ds()` helper from `src/helpers/darkStyle.ts` to select light/dark values. Standard dark palette: backgrounds `#1e293b` (slate-800), text `#e2e8f0` (slate-200), borders `#334155` (slate-700). All new interactive MDX components must support dark mode.

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

## Page Ordering (Guide Registration)

Each guide's page order is defined in **one place**: the `*_GUIDE_SECTIONS` array in the guide's data file (e.g., `ARCH_GUIDE_SECTIONS` in `src/data/archData.ts`). This single definition automatically drives:

1. **Navigation sidebar** — imported via `src/data/guideRegistry.ts`
2. **Command menu** — imported via `src/data/guideRegistry.ts`
3. **Previous/Next links** — derived via `getNavOrderForPage()` in `src/data/guideRegistry.ts`
4. **Home page tiles** — imported via `src/data/guideRegistry.ts`

The only additional sync point is the **Start page component**, which must match the section structure for its learning-path roadmap display.

**Top-level resource pages** (`external-resources`, `glossary`) are NOT part of any guide's navigation order. They appear in the sidebar under a dedicated "Resources" icon, in the command menu under a "Resources" group, and on the home page. They do not have Previous/Next navigation.

When adding, removing, or reordering pages within a guide, update the `*_GUIDE_SECTIONS` array in the guide's data file. Everything else updates automatically.

## Adapting Claude Artifacts into Guides

Claude artifacts are typically monolithic JSX or HTML files with embedded data and inline styles. This section describes how to decompose them into the multi-page MDX architecture used by this app. The Architecture Guide conversion is the canonical example: the original single-component `ArchitecturePage.tsx` (504 lines) was split into 8 MDX pages, 4 interactive components, and a centralized data file.

### Conversion steps

| Step | Action |
|------|--------|
| 1. Identify content boundaries | Find natural page breaks in the monolithic component. Each distinct topic or section heading becomes its own MDX page. |
| 2. Extract data to `src/data/` | Move inline constants, arrays, and objects into a new typed `.ts` file. Define interfaces for data shapes. Export `*_GUIDE_SECTIONS: GuideSection[]` with labeled sections. Derive `*_NAV_ORDER` and `*_PAGE_IDS` from the sections array. |
| 3. Create MDX pages in `src/content/<guide>/` | One `.mdx` file per page with frontmatter (`id`, `title`, `guide`). Use existing MDX components (`SectionIntro`, `Toc`, `TocLink`, `ColItem`, `Explainer`, etc.). Pages are auto-discovered by `src/content/registry.ts` — no manual import needed. |
| 4. Extract interactive components to `src/components/mdx/` | Stateful or interactive UI (explorers, diagrams, accordions) becomes a standalone component that reads data from `src/data/` via a prop (e.g., `<StackExplorer stackId="mern" />`). Register it in `src/components/mdx/index.ts`. |
| 5. Create Start page in `src/components/` | Build the learning path using HTML template literals + `HtmlContent`. Reference `contentPages` from the registry for page titles. Include `<PrevNextNav>`. |
| 6. Add router entry in `src/router.tsx` | Add the start page ID to `SectionRouter`. MDX pages auto-route via `contentPages`. |
| 7. Register the guide in `src/data/guideRegistry.ts` | Add a new entry to the `guides` array. Sidebar, command menu, and home page update automatically. |

### MDX page template

```mdx
---
id: "guide-page-id"
title: "Page Title 🔹"
guide: "guide-id"
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
- Export `*_GUIDE_SECTIONS` from the data file and derive `*_NAV_ORDER`/`*_PAGE_IDS` from it. Register the guide in `src/data/guideRegistry.ts`.
- Register any new interactive MDX components in `src/components/mdx/index.ts` or they won't be available in MDX files.
- Interactive components with inline styles must support dark mode. Use `useTheme()` and `ds()` helper for theme-conditional values. Add `darkAccent` fields to data interfaces when components use dynamic accent colors.

## Navigation Item Formatting

Every content page's MDX frontmatter `title` must include an emoji suffix (e.g., `"Logic & Condition Errors ⚡"`). This convention applies to all guides (NPM Package, Architecture, Testing, Prompt Engineering, and any future guides).

The sidebar `SidebarItem` component (`src/components/Sidebar.tsx`) parses each title with the regex `/^(.+)\s+([\u0080-\u{10FFFF}]+)$/u` to split the text from the trailing emoji. The `PageItem` in `CommandMenu.tsx` uses the same pattern.

Layout rules for navigation items:
- Text and icon/badge must always be in **separate `<span>` elements** within navigation items.
- The parent container uses `justify-between` so text aligns left and icons/badges align to the right edge.
- New pages must follow this emoji-suffix pattern for consistency across all guides.

## Adding a New Guide

Follow these steps to add a new guide. The sidebar, command menu, and home page update automatically from `guideRegistry.ts`.

### Checklist

1. **Create a data file** (`src/data/<guide>Data.ts`)
   - Define guide-specific types and data (e.g., practice cards, diagram data)
   - Import `GuideSection` from `src/data/guideTypes.ts`
   - Export `<GUIDE>_GUIDE_SECTIONS: GuideSection[]` with labeled section groups
   - Derive and export: `<GUIDE>_NAV_ORDER = <GUIDE>_GUIDE_SECTIONS.flatMap(s => s.ids)` and `<GUIDE>_PAGE_IDS = new Set(<GUIDE>_NAV_ORDER)`

2. **Register the guide** (`src/data/guideRegistry.ts`)
   - Import `<GUIDE>_GUIDE_SECTIONS` from your data file
   - Add a new entry to the `guides` array with `id`, `icon`, `title`, `startPageId`, `description`, `sections`

3. **Create MDX content pages** (`src/content/<guide>/`)
   - One `.mdx` file per page with frontmatter: `id`, `title` (with emoji suffix), `guide: "<guide-id>"`
   - Pages are auto-discovered by `src/content/registry.ts` — no manual import needed

4. **Create the Start page component** (`src/components/<Guide>StartPage.tsx`)
   - Follow the pattern in `ArchStartPage.tsx` or `TestingStartPage.tsx`
   - Use `HtmlContent` for HTML template literals
   - Include `<PrevNextNav currentId="<start-page-id>" />`

5. **Add Start page title to staticTitles** (`src/data/navigation.ts`)
   - Add `'<start-page-id>': 'Start Here <emoji>'` to `staticTitles`

6. **Add route** (`src/router.tsx`)
   - Add `if (sectionId === '<start-page-id>') return <<Guide>StartPage />`
   - Import the Start page component

7. **Create interactive MDX components** (if needed) (`src/components/mdx/`)
   - See **Interactive MDX Component Template** below
   - Register in `src/components/mdx/index.ts`

8. **Verify** — run `pnpm lint && pnpm build`

### What updates automatically

- **Sidebar**: reads `guides` array from `guideRegistry.ts` — new guide appears automatically
- **Command menu**: reads `guides` array — new guide sections appear automatically
- **Home page**: reads `guides` array — new guide tile appears automatically
- **Navigation (prev/next)**: derived from guide sections — works automatically
- **Content registry**: auto-discovers new MDX files in `src/content/`

## Interactive MDX Component Template

Minimal template for a new interactive MDX component with dark mode support.

### Component file: `src/components/mdx/MyComponent.tsx`

```tsx
import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'
import { MY_DATA } from '../../data/myGuideData'
import type { MyDataItem } from '../../data/myGuideData'

export function MyComponent({ itemId }: { itemId: string }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeId, setActiveId] = useState<string | null>(null)

  const item = MY_DATA.find((d: MyDataItem) => d.id === itemId)
  if (!item) return null

  return (
    <div
      style={{
        background: ds(item.accent, item.darkAccent, isDark),
        borderColor: ds(item.color, item.color, isDark),
      }}
      className="rounded-xl border p-6 mb-6"
    >
      <button onClick={() => setActiveId(activeId === itemId ? null : itemId)}>
        {item.name}
      </button>
    </div>
  )
}
```

### Registration: `src/components/mdx/index.ts`

```tsx
import { MyComponent } from './MyComponent'
// Add to the mdxComponents object:
MyComponent,
```

### Usage in MDX

```mdx
<MyComponent itemId="example-id" />
```

### Key conventions

- Import data from `src/data/`, never inline in the component
- Use `useTheme()` + `ds()` for dynamic inline styles with dark mode
- Use Tailwind `dark:` variants for class-based styling
- Data interfaces should include `darkAccent` field when components use dynamic accent colors
- Standard dark palette: backgrounds `#1e293b`, text `#e2e8f0`, borders `#334155`

## Pre-Push Checklist

- Run `pnpm install` before running lint or build to ensure dependencies are installed.
- Run `pnpm lint` first, then `pnpm build`. Lint catches issues faster and cheaper than a full build.
- When fixing lint errors, try `pnpm lint --fix` first to auto-fix what ESLint can handle, then manually fix any remaining issues.
