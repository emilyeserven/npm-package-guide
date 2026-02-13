# CLAUDE.md

## Project Overview

Educational single-page application (SPA) with multiple guides for backend engineers learning frontend development. Deployed as a static site to GitHub Pages.

## Guides

The site contains four independent guides, each with its own Start Here page, navigation order, and Previous/Next links, plus top-level resource pages shared across all guides. All guide metadata (id, icon, title, sections, page headings) is centralized in `src/data/guideRegistry.ts`.

### NPM Package Guide (`Web App vs. NPM Package`)
- **Start page:** `roadmap` (`src/components/RoadmapPage.tsx`)
- **Content pages:** MDX files in `src/content/sections/`, `src/content/ci/`, `src/content/bonus/`
- **Data:** `src/data/roadmapSteps.ts`

### Architecture Guide
- **Start page:** `arch-start` (`src/components/ArchStartPage.tsx`)
- **Content pages:** MDX files in `src/content/architecture/`
- **Data:** `src/data/archData/` (stacks, frameworks, layer colors, data flow, `ARCH_GUIDE_SECTIONS`)
- **Interactive MDX components:** `src/components/mdx/StackExplorer.tsx`, `StackProsCons.tsx`, `DataFlowDiagram.tsx`, `LayerDiagram.tsx`, `FrameworkExplorer.tsx`, `FrameworkProsCons.tsx`

### Testing Guide
- **Start page:** `test-start` (`src/components/TestingStartPage.tsx`)
- **Content pages:** MDX files in `src/content/testing/`
- **Data:** `src/data/testingData.ts` (pyramid levels, comparison rows, practice cards, `TESTING_GUIDE_SECTIONS`)
- **Interactive MDX components:** `src/components/mdx/TestingPyramid.tsx`, `ComparisonTable.tsx`, `TestingMistakeList.tsx`

### Prompt Engineering Guide
- **Start page:** `prompt-start` (`src/components/PromptStartPage.tsx`)
- **Content pages:** MDX files in `src/content/prompt-engineering/`
- **Data:** `src/data/promptData/` (mistakes, techniques, CLI reference, `PROMPT_GUIDE_SECTIONS`)
- **Interactive MDX components:** `src/components/mdx/MistakeList.tsx`, `MistakeSeverityBadge.tsx`, `ContextAccordion.tsx`

### Top-Level Resources
- **External Resources** (`src/components/ExternalResourcesPage.tsx`) — searchable, filterable table of documentation, articles, courses, and tools. Tagged with Guide, Type, and Topic filters. Data in `src/data/overallResources.ts`.
- **Glossary** (`src/components/GlossaryPage.tsx`) — searchable glossary with Guide and Category filters. Data in `src/data/glossaryTerms/`.
- Both pages support a `?guide=` URL search param to pre-select a guide filter (e.g., `/#/glossary?guide=npm-package`). The Glossary also supports `?search=` to prefill the search bar (used by CMD-K glossary term navigation). Links from within guides use these params to show guide-relevant content by default.
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
  - `src/data/linkRegistry/` — External URL registry, split by guide (`npmPackageLinks.ts`, `architectureLinks.ts`, `testingLinks.ts`, `promptLinks.ts`); barrel `index.ts` re-exports merged array + lookup maps
  - `src/data/glossaryTerms/` — Glossary terms, split by guide (`npmPackageTerms.ts`, `architectureTerms.ts`, `testingTerms.ts`, `promptTerms.ts`); barrel `index.ts` re-exports merged array
  - `src/data/archData/` — Architecture guide data (`types.ts`, `stacks.ts`, `frameworks.ts`, `navigation.ts`); barrel `index.ts` re-exports all
  - `src/data/promptData/` — Prompt engineering guide data (`types.ts`, `mistakes.ts`, `techniques.ts`, `cli.ts`, `navigation.ts`); barrel `index.ts` re-exports all
  - `src/data/guideTypes.ts` — Shared `GuideSection`, `GuideDefinition`, and `PageHeading` interfaces
  - `src/data/guideRegistry.ts` — Central guide registry (all guide metadata, section definitions, page headings, lookup helpers)
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

## Link Registry

All external URLs are managed centrally in `src/data/linkRegistry/`. This is the single source of truth for link metadata (URL, label, source, description, tags). Other systems reference the registry by ID instead of duplicating URL metadata. Entries are split by guide into separate files; the barrel `index.ts` re-exports the merged array and lookup maps so all existing imports work unchanged.

### Adding a new link
1. Add a `RegistryLink` entry to the appropriate guide file in `src/data/linkRegistry/` (`npmPackageLinks.ts`, `architectureLinks.ts`, `testingLinks.ts`, or `promptLinks.ts`) with a slug ID following the `{source}-{topic}` convention (e.g., `"npm-package-json-deps"`, `"mdn-tree-shaking"`). Choose the file matching the entry's `guide:*` tag.
2. Reference it from MDX frontmatter via `linkRefs`:
   ```yaml
   linkRefs:
     - id: "your-registry-id"
     - id: "another-id"
       note: "Page-specific context for this link"
   usedFootnotes: [1, 2]
   ```
3. If it should appear on the External Resources page, add `resourceCategory` (e.g., `"Official Documentation"`) and `tags`/`desc` fields.
4. For glossary terms, use the `linkId` field in `GlossaryTerm` to reference a registry entry.

### How the registry connects to other systems
- **MDX frontmatter** → `linkRefs` array of `{id, note?}` objects, resolved to `SectionLink[]` by `src/content/registry.ts`
- **External Resources page** → curated entries have `resourceCategory`; all entries with `tags` appear on the page. Page associations are derived from `ContentPage.linkRefIds`.
- **Glossary** → `GlossaryTerm.linkId` references a registry entry for the term's external documentation URL and source.
- **`overallResources.ts`** → derives `ResourceGroup[]` from registry entries with `resourceCategory` (no longer hardcoded).

## Footnotes & References

Content pages can include two kinds of external links at the bottom, managed via `linkRefs` in each content page's MDX frontmatter:

- **Footnotes** are numbered references tied to specific content via `<FnRef>` markers (e.g., `<FnRef n={1} />`). They appear in a "Footnotes" section with their number, link, source, and optional note. The `data-fn` attributes on `<FnRef>` elements are used by `FootnoteTooltip.tsx` for hover/click tooltip behavior.
- **References** ("Further Reading") are supplemental links not tied to specific content — any link in the `linkRefs` array that is NOT referenced by a `<FnRef>` in the MDX body becomes a "Further Reading" entry.

Both should include descriptions (`note` field in `linkRefs`) when possible to help readers understand relevance.

## Glossary

The Glossary page (`src/components/GlossaryPage.tsx`) displays a searchable, filterable table of technical terms drawn from `src/data/glossaryTerms/`. Each term links to its official documentation (via the link registry) and optionally to the guide page where the concept is taught. Terms are split by guide into separate files; the barrel `index.ts` re-exports the merged array.

### What should be a glossary term

Add a glossary entry for:
- **Technical terms introduced or explained in a guide page** — e.g., "Tree Shaking", "Peer Dependency", "Mocking"
- **Acronyms and abbreviations** — e.g., "ESM", "CJS", "CI", "ORM"
- **Tools, libraries, and frameworks** referenced across guides — e.g., "Vitest", "Storybook", "Playwright"
- **Concepts a backend engineer might not know** — the target audience is backend developers learning frontend; if a term would need a sidebar explanation, it deserves a glossary entry

Do NOT add glossary entries for generic programming terms that any developer would know (e.g., "variable", "function", "loop") unless a guide gives them a specialized frontend meaning.

### GlossaryTerm fields

Each term is defined in the `GlossaryTerm` interface (`src/data/glossaryTerms/index.ts`):

| Field | Required | Description |
|-------|----------|-------------|
| `term` | Yes | Display name. Use title-case for proper nouns (`"React Server Components"`), lowercase for general concepts (`"dependency"`). Use the most recognizable form of the name. |
| `definition` | Yes | One to two sentences explaining the term for a backend engineer. Use `<code>` tags for inline code (e.g., `<code>package.json</code>`). Keep it self-contained — the reader should understand the term without visiting the linked docs. |
| `linkId` | Yes | The `id` of a `RegistryLink` in `src/data/linkRegistry/`. This provides the "source docs" link displayed below the definition. The link must already exist in the registry (add one first if needed — see **Link Registry** above). |
| `sectionId` | No | The `id` of a content page where this concept is taught. When present, a "go to guide page" link appears next to the docs link. Use the page where the term is most thoroughly explained. |

### Adding a glossary term

1. **Ensure the link exists** — Check `src/data/linkRegistry/` for a `RegistryLink` whose `id` matches the documentation you want to link. If none exists, add one to the appropriate guide file following the Link Registry conventions above.
2. **Add the term** — In `src/data/glossaryTerms/`, find the appropriate guide file and `GlossaryCategory` object, then add a new `GlossaryTerm` to its `terms` array.
3. **Set `sectionId`** — If the term is explained on a guide page, set `sectionId` to that page's `id`.
4. **Verify** — Run `pnpm lint && pnpm build` to catch any broken `linkId` references (the registry throws at build time for unknown IDs).

### Category conventions

Terms are grouped into `GlossaryCategory` objects. Current categories: Package Management, Dependencies, Build & Bundling, TypeScript, Package Configuration, Development Workflow, Web Architecture, Databases, Full-Stack Frameworks, Testing Fundamentals, Prompt Engineering, AI Coding Tools.

When adding a new category:
- Pick a name that describes the domain, not a specific guide (categories can span guides).
- Add a corresponding `cat:<slug>` entry to the `badgeMap` in `src/data/overallResources.ts` so the category filter badge renders on the Glossary page. The slug convention is the category name lowercased with spaces replaced by hyphens and `&` dropped (e.g., `"Build & Bundling"` → `cat:build-bundling`).

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

Each guide's page order is defined in **one place**: the `*_GUIDE_SECTIONS` array in the guide's data file (e.g., `ARCH_GUIDE_SECTIONS` in `src/data/archData/navigation.ts`). This single definition automatically drives:

1. **Navigation sidebar** — imported via `src/data/guideRegistry.ts`
2. **Command menu** — imported via `src/data/guideRegistry.ts`
3. **Previous/Next links** — derived via `getNavOrderForPage()` in `src/data/guideRegistry.ts`
4. **Home page tiles** — imported via `src/data/guideRegistry.ts`

The only additional sync point is the **Start page component**, which must match the section structure for its learning-path roadmap display.

**Top-level resource pages** (`external-resources`, `glossary`) are NOT part of any guide's navigation order. They appear in the sidebar under a dedicated "Resources" icon, in the command menu under a "Resources" group, and on the home page. They do not have Previous/Next navigation.

When adding, removing, or reordering pages within a guide, update the `*_GUIDE_SECTIONS` array in the guide's data file. Everything else updates automatically.

## Page Headings

Page section headings (the `<TocLink>` / `<SectionSubheading>` pairs in MDX pages) are tracked in the `pageHeadings` map in `src/data/guideRegistry.ts`. This map powers CMD-K sub-item search — users can search for and jump directly to a specific section heading within a page.

### How it works
- Each entry maps a page ID to an array of `PageHeading` objects (`{ id: string; title: string }`)
- The `id` is the anchor ID (e.g., `"toc-webapp"`) matching the `<TocLink id>` and `<SectionSubheading id>`
- The `title` is the heading text, which must match the `<TocLink>` and `<SectionSubheading>` text exactly
- Pages without headings are simply omitted from the map
- `getPageHeadings(pageId)` returns headings or an empty array

### Keeping headings in sync
When adding, removing, or renaming `<TocLink>` / `<SectionSubheading>` entries in an MDX page, update the corresponding `pageHeadings` entry in `src/data/guideRegistry.ts`. The heading text in the registry, the `<TocLink>`, and the `<SectionSubheading>` must all match — the page header (`<SectionSubheading>`) is the source of truth.

### Heading ID convention
All heading anchor IDs use the `toc-{slug}` prefix (e.g., `toc-overview`, `toc-explainer`, `toc-off-by-one`).

## Command Menu (CMD-K)

The command menu (`src/components/CommandMenu.tsx`) provides searchable access to:

1. **Pages** — all guide pages, grouped by guide section
2. **Page headings** — section headings within each page (from `pageHeadings` in `guideRegistry.ts`). Selecting a heading navigates to the page and scrolls to the heading anchor.
3. **Glossary terms** — all terms from `src/data/glossaryTerms/`. Selecting a term navigates to the Glossary page with the search bar prefilled.
4. **External resources** — all resources from `src/data/overallResources.ts`. Selecting a resource opens the URL in a new tab.

Navigation to heading anchors uses `useNavigateToSection(id, anchorId?)` which navigates to the page then scrolls to the anchor element after a brief render delay.

## Cross-Page Links (NavLink / NavPill)

`NavLink` and `NavPill` (`src/components/mdx/NavLink.tsx`) create inline cross-page links in MDX content. Both components accept an optional `children` prop — when omitted, the link text auto-resolves to the page's full title (via `getNavTitle()`) including its emoji suffix.

```mdx
{/* Auto-resolves to "Build & Output ⚙️" */}
<NavLink to="build" />

{/* Custom text for contextual links */}
<NavLink to="build">bundlers and build tools</NavLink>
```

Prefer the self-closing form (`<NavLink to="..." />`) when linking to a page by its title. Use custom children only when the surrounding sentence needs different wording for readability.

## Adapting Claude Artifacts into Guides

Claude artifacts are typically monolithic JSX or HTML files with embedded data and inline styles. Every guide in this app originates as a Claude artifact. This section describes how to decompose an artifact into the multi-page MDX architecture used by this app. The Architecture Guide conversion is the canonical example: the original single-component `ArchitecturePage.tsx` (504 lines) was split into 8 MDX pages, 4 interactive components, and a centralized data file.

### Conversion steps

| Step | Action | Files |
|------|--------|-------|
| 1. Identify content boundaries | Find natural page breaks in the monolithic component. Each distinct topic or section heading becomes its own MDX page. | (analysis only) |
| 2. Create data file | Move inline constants, arrays, and objects into a new typed `.ts` file. Define TypeScript interfaces for data shapes. Import `GuideSection` from `src/data/guideTypes.ts`. Export `<GUIDE>_GUIDE_SECTIONS: GuideSection[]` with labeled section groups. Derive and export: `<GUIDE>_NAV_ORDER = <GUIDE>_GUIDE_SECTIONS.flatMap(s => s.ids)` and `<GUIDE>_PAGE_IDS = new Set(<GUIDE>_NAV_ORDER)`. | `src/data/<guide>Data.ts` |
| 3. Register the guide | Import `<GUIDE>_GUIDE_SECTIONS` from your data file. Add a new entry to the `guides` array in `src/data/guideRegistry.ts` with `id`, `icon`, `title`, `startPageId`, `description`, `sections`. Add entries to `pageHeadings` for any pages that have `<TocLink>` headings (see **Page Headings**). | `src/data/guideRegistry.ts` |
| 4. Create MDX content pages | One `.mdx` file per page with frontmatter (`id`, `title` with emoji suffix, `guide`). Use existing MDX components (`SectionIntro`, `Toc`, `TocLink`, `ColItem`, `Explainer`, etc.). Pages are auto-discovered by `src/content/registry.ts` — no manual import needed. | `src/content/<guide>/*.mdx` |
| 5. Create Start page | Build the learning-path component using HTML template literals + `HtmlContent`. Reference `contentPages` from the registry for page titles. Include `<PrevNextNav currentId="<start-page-id>" />`. Follow the pattern in `ArchStartPage.tsx` or `TestingStartPage.tsx`. | `src/components/<Guide>StartPage.tsx` |
| 6. Add Start page title | Add `'<start-page-id>': 'Start Here <emoji>'` to the `staticTitles` map. | `src/data/navigation.ts` |
| 7. Add route | Add `if (sectionId === '<start-page-id>') return <<Guide>StartPage />` to `SectionRouter`. Import the Start page component. MDX pages auto-route via `contentPages`. | `src/router.tsx` |
| 8. Extract interactive components | Stateful or interactive UI (explorers, diagrams, accordions) becomes a standalone component that reads data from `src/data/` via a prop (e.g., `<StackExplorer stackId="mern" />`). Register it in `src/components/mdx/index.ts`. See **Interactive MDX Component Template** below. | `src/components/mdx/` |
| 9. Add glossary terms | Add relevant terms to the appropriate file in `src/data/glossaryTerms/` following the conventions in the **Glossary** section above. Ensure each `linkId` exists in the link registry. | `src/data/glossaryTerms/`, `src/data/linkRegistry/` |
| 10. Verify | Run `pnpm lint && pnpm build`. Lint catches issues faster; the build catches broken link references and TypeScript errors. | — |

### MDX page template

```mdx
---
id: "guide-page-id"
title: "Page Title 🔹"
guide: "guide-id"
---

<SectionTitle>{frontmatter.title}</SectionTitle>

<Toc>
  <TocLink id="toc-first">First section</TocLink>
</Toc>

<SectionIntro>
Brief intro paragraph.
</SectionIntro>

<SectionSubheading id="toc-first">First section</SectionSubheading>

<SectionList>
<ColItem>Content here.</ColItem>
</SectionList>
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
- Every MDX page `title` must end with an emoji suffix (see **Navigation Item Formatting**).

### What updates automatically

- **Sidebar**: reads `guides` array from `guideRegistry.ts` — new guide appears automatically
- **Command menu**: reads `guides` array and `pageHeadings` — new guide sections and heading sub-items appear automatically
- **Home page**: reads `guides` array — new guide tile appears automatically
- **Navigation (prev/next)**: derived from guide sections — works automatically
- **Content registry**: auto-discovers new MDX files in `src/content/`

## Navigation Item Formatting

Every content page's MDX frontmatter `title` must include an emoji suffix (e.g., `"Logic & Condition Errors ⚡"`). This convention applies to all guides (NPM Package, Architecture, Testing, Prompt Engineering, and any future guides).

The sidebar `SidebarItem` component (`src/components/Sidebar.tsx`) parses each title with the regex `/^(.+)\s+([\u0080-\u{10FFFF}]+)$/u` to split the text from the trailing emoji. The `PageItem` in `CommandMenu.tsx` uses the same pattern.

Layout rules for navigation items:
- Text and icon/badge must always be in **separate `<span>` elements** within navigation items.
- The parent container uses `justify-between` so text aligns left and icons/badges align to the right edge.
- New pages must follow this emoji-suffix pattern for consistency across all guides.

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
