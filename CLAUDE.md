# CLAUDE.md

## Project Overview

Educational single-page application (SPA) with multiple guides for backend engineers learning frontend development. Deployed as a static site to GitHub Pages.

## Guides

Eight independent guides plus top-level resource pages. All metadata centralized in `src/data/guideRegistry.ts`. Each guide has its own `CLAUDE.md` in its content directory with guide-specific audience info, section conventions, interactive component usage, and data file locations.

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

Each guide follows the same structure:
- **Data:** `src/data/<guideId>Data.ts` (or `src/data/<guideId>Data/` directory)
- **Content pages:** `src/content/<guide-id>/*.mdx`
- **Interactive components:** `src/components/mdx/<guide-id>/`
- **Glossary terms:** `src/data/glossaryTerms/<guideId>Terms.ts`
- **Link registry:** `src/data/linkRegistry/<guideId>Links.ts`
- **Guide-specific docs:** `src/content/<guide-id>/CLAUDE.md`

### Top-Level Resources
- **External Resources** (`src/components/ExternalResourcesPage.tsx`) — searchable, filterable table. Data in `src/data/overallResources.ts`.
- **Glossary** (`src/components/GlossaryPage.tsx`) — searchable glossary with Guide and Category filters. Data in `src/data/glossaryTerms/`.
- Both support `?guide=` URL param to pre-select a guide filter. Glossary also supports `?search=` for CMD-K term navigation.
- Appear in the sidebar under "Resources" icon, command menu under "Resources" group, and on the home page.

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
| `pnpm validate:data` | Cross-reference integrity checks (link IDs, glossary refs, guide sections) |
| `pnpm validate` | Full validation pipeline: `validate:data` + `lint` + `build` |
| `pnpm preview` | Preview production build |

## Project Structure

- `src/components/` — Shared React functional components (TSX)
- `src/components/mdx/` — Shared MDX-available components (registered in `src/components/mdx/index.ts`)
  - `src/components/mdx/<guide-id>/` — Per-guide interactive MDX components
- `src/content/` — MDX content pages, auto-discovered by `src/content/registry.ts`
  - `src/content/<guide-id>/` — Per-guide MDX pages (see **Guides** table above)
- `src/data/` — Content stored as TypeScript objects (roadmap steps, architecture data, checklists, etc.)
  - `src/data/linkRegistry/` — External URL registry, split by guide; barrel `index.ts` re-exports merged array + lookup maps
  - `src/data/glossaryTerms/` — Glossary terms, split by guide; barrel `index.ts` re-exports merged array
  - `src/data/<guideId>Data.ts` (or `<guideId>Data/` directory) — Per-guide data with `*_GUIDE_SECTIONS` and `*_START_PAGE_DATA`
  - `src/data/guideTypes.ts` — Shared `GuideSection` and `GuideDefinition` interfaces
  - `src/data/guideRegistry.ts` — Central guide registry (all guide metadata, section definitions, lookup helpers)
  - `src/data/componentPages.tsx` — Registry of component-rendered (non-MDX) pages, mapping page IDs to components for the router
- `src/helpers/` — Utility functions (`cmd.ts` for package manager commands, `fnRef.ts` for footnotes, `darkStyle.ts` for theme-conditional values)
- `src/hooks/` — Custom React hooks (`usePMContext.tsx` for npm/pnpm switching)
- `src/router.tsx` — TanStack Router configuration; resolves pages via `componentPages` registry and MDX content auto-discovery
- `src/main.tsx` — Application entry point

## Key Patterns

- **Content as data:** Page content lives in `src/data/` as TypeScript objects with HTML strings, not inline JSX. Content updates go in data files, not components.
- **HTML rendering:** Components use `HtmlContent` (wraps `dangerouslySetInnerHTML`) to render HTML strings from data files.
- **Package manager context:** `usePM()` hook + `cmd()` helper handle npm/pnpm command display switching throughout the app.
- **Functional components only:** No class components. Props typed with TypeScript interfaces.
- **Interactive tables:** The External Resources page (`ExternalResourcesPage.tsx`) and Glossary page (`GlossaryPage.tsx`) use TanStack Table for sortable, filterable, searchable tables.
- **Styling:** Use inline Tailwind utility classes on JSX elements. Prefer Tailwind utility classes over adding CSS rules whenever possible. Avoid defining component-level classes with `@apply` in `App.css`. CSS is only for things that genuinely require it: pseudo-elements (`::before`, `::after`), complex nested selectors, body-level toggles, animations/transitions, and third-party library attribute selectors (e.g., cmdk `[cmdk-input]`). Using `@apply` within those CSS-only rules is acceptable. Use Tailwind's built-in scale values; arbitrary values (e.g., `[360px]`) should only be used when strictly necessary (no built-in equivalent exists).
- **Dark mode:** The app uses class-based dark mode via a `useTheme()` hook (`src/hooks/useTheme.tsx`) that toggles `.dark` on `<body>`. Tailwind's custom variant `@custom-variant dark (&:where(.dark, .dark *))` enables `dark:` utility classes. For components using Tailwind classes, use `dark:` variants directly (e.g., `dark:bg-slate-800 dark:text-slate-100`). For interactive components with dynamic inline styles (where colors come from data like `comp.color`), use the `useTheme()` hook + `ds()` helper from `src/helpers/darkStyle.ts` to select light/dark values. Standard dark palette: backgrounds `#1e293b` (slate-800), text `#e2e8f0` (slate-200), borders `#334155` (slate-700). All new interactive MDX components must support dark mode.

## MDX Frontmatter Reference

Every MDX content page has YAML frontmatter with these fields:

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | `string` | Unique page identifier (kebab-case). Must match the ID used in the guide's `*_GUIDE_SECTIONS` array. Duplicate IDs cause a build error. |
| `title` | Yes | `string` | Display title with emoji suffix (e.g., `"Build & Output ⚙️"`). Must end with emoji — see **Navigation Item Formatting**. |
| `guide` | No | `string` | Guide ID (e.g., `"npm-package"`, `"architecture"`, `"testing"`, `"prompt-engineering"`). Validated against known guide IDs at build time. |
| `group` | No | `string` | Section grouping label within the guide (used for display grouping in some contexts). |
| `linkRefs` | No | `array` | Array of `{id, note?}` objects referencing link registry entries. Resolved to `SectionLink[]` at build time — unknown IDs throw an error. |
| `usedFootnotes` | No | `number[]` | Footnote numbers referenced in the MDX body via `<FnRef n={N} />`. Controls which links appear in the "Footnotes" section vs. "Further Reading". |

## Dark Style Helper (`ds()`)

The `ds()` function in `src/helpers/darkStyle.ts` selects between light and dark values for inline styles:

```typescript
ds(light: string, dark: string, isDark: boolean): string
```

**When to use `ds()`** — For interactive components with dynamic inline styles where colors come from data (e.g., `item.color`, `item.accent`). These can't use Tailwind `dark:` variants because the values aren't known at build time.

**When to use Tailwind `dark:` variants** — For all other dark mode styling where values are static and known at build time (e.g., `dark:bg-slate-800 dark:text-slate-100`).

```tsx
// Dynamic colors from data → use ds()
<div style={{ background: ds(item.accent, item.darkAccent, isDark) }}>

// Static colors → use Tailwind dark: variants
<div className="bg-white dark:bg-slate-800">
```

## Routing (Component Pages)

The router resolves pages in this order:

1. **Search-param pages** — `searchParamPages` in `src/data/componentPages.tsx` (pages that receive `?guide=` or `?search=` params, e.g., `external-resources`, `glossary`)
2. **Simple component pages** — `simpleComponentPages` in `src/data/componentPages.tsx` (legacy `architecture` redirect)
3. **MDX content pages** — auto-discovered via `import.meta.glob` in `src/content/registry.ts` (all guide pages including start pages)

All guide start pages and content pages are MDX and auto-route via the content registry. Only non-MDX pages (search-param pages, legacy redirects) need `componentPages.tsx` entries.

## Build Validation (`pnpm validate:data`)

The validation script (`scripts/validate-data.ts`) runs cross-reference integrity checks that catch common mistakes before lint/build:

| Check | What it catches |
|-------|----------------|
| Duplicate link registry IDs | Two entries with the same `id` in `src/data/linkRegistry/` |
| Glossary `linkId` references | Glossary term pointing to a non-existent link registry entry |
| Glossary `sectionId` references | Glossary term pointing to a non-existent page ID |
| Duplicate page IDs across guides | Same page ID used in two different guides' section arrays |
| `startPageId` not in sections | Guide's start page ID missing from its own `*_GUIDE_SECTIONS` |

Run `pnpm validate:data` to check these, or `pnpm validate` for the full pipeline (`validate:data` + `lint` + `build`).

## Link Registry

All external URLs are managed centrally in `src/data/linkRegistry/`. This is the single source of truth for link metadata (URL, label, source, description, tags). Other systems reference the registry by ID instead of duplicating URL metadata. Entries are split by guide into separate files; the barrel `index.ts` re-exports the merged array and lookup maps so all existing imports work unchanged.

### Adding a new link
1. Add a `RegistryLink` entry to the appropriate guide file in `src/data/linkRegistry/<guideId>Links.ts` with a slug ID following the `{source}-{topic}` convention (e.g., `"npm-package-json-deps"`, `"mdn-tree-shaking"`). Choose the file matching the entry's `guide:*` tag.
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

### GlossaryTerm fields

Each term is defined in the `GlossaryTerm` interface (`src/data/glossaryTerms/index.ts`):

| Field | Required | Description |
|-------|----------|-------------|
| `term` | Yes | Display name. Title-case for proper nouns, lowercase for general concepts. |
| `definition` | Yes | One to two sentences for a backend engineer. Use `<code>` tags for inline code. Self-contained. |
| `linkId` | Yes | `id` of a `RegistryLink` in `src/data/linkRegistry/`. Must already exist in the registry. |
| `sectionId` | No | `id` of a content page where this concept is taught. Shows a "go to guide page" link. |

### Adding a glossary term

1. **Ensure the link exists** — Check `src/data/linkRegistry/` for a matching `RegistryLink`. If none exists, add one following the Link Registry conventions above.
2. **Add the term** — In `src/data/glossaryTerms/`, find the appropriate guide file and `GlossaryCategory` object, then add a new `GlossaryTerm` to its `terms` array.
3. **Set `sectionId`** — If the term is explained on a guide page, set `sectionId` to that page's `id`.
4. **Verify** — Run `pnpm validate` to catch any broken `linkId` references.

For editorial guidance on what qualifies as a glossary term and how to add new categories, see the `/add-guide` skill.

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

Start pages use the data-driven `<GuideStartContent>` component, which auto-derives learning-path sub-items from the `*_GUIDE_SECTIONS` definition via `sectionLabel` references in `StartPageData`. No manual sync needed.

**Top-level resource pages** (`external-resources`, `glossary`) are NOT part of any guide's navigation order. They appear in the sidebar under a dedicated "Resources" icon, in the command menu under a "Resources" group, and on the home page. They do not have Previous/Next navigation.

When adding, removing, or reordering pages within a guide, update the `*_GUIDE_SECTIONS` array in the guide's data file. Everything else updates automatically.

## Command Menu (CMD-K)

The command menu (`src/components/CommandMenu.tsx`) provides searchable access to:

1. **Pages** — all guide pages, grouped by guide section
2. **Glossary terms** — all terms from `src/data/glossaryTerms/`. Selecting a term navigates to the Glossary page with the search bar prefilled.
3. **External resources** — all resources from `src/data/overallResources.ts`. Selecting a resource opens the URL in a new tab.

## Cross-Page Links (NavLink / NavPill)

`NavLink` and `NavPill` (`src/components/mdx/NavLink.tsx`) create inline cross-page links in MDX content. Both components accept an optional `children` prop — when omitted, the link text auto-resolves to the page's full title (via `getNavTitle()`) including its emoji suffix.

```mdx
{/* Auto-resolves to "Build & Output ⚙️" */}
<NavLink to="build" />

{/* Custom text for contextual links */}
<NavLink to="build">bundlers and build tools</NavLink>
```

Prefer the self-closing form (`<NavLink to="..." />`) when linking to a page by its title. Use custom children only when the surrounding sentence needs different wording for readability.

## Adding a New Guide

Use the `/add-guide` skill for the full 9-step conversion workflow, MDX page and component templates, glossary editorial guidance, and common pitfalls.

## Navigation Item Formatting

Every content page's MDX frontmatter `title` must include an emoji suffix (e.g., `"Logic & Condition Errors ⚡"`). This convention applies to all guides (NPM Package, Architecture, Testing, Prompt Engineering, and any future guides).

The sidebar `SidebarItem` component (`src/components/Sidebar.tsx`) parses each title with the regex `/^(.+)\s+([\u0080-\u{10FFFF}]+)$/u` to split the text from the trailing emoji. The `PageItem` in `CommandMenu.tsx` uses the same pattern.

Layout rules for navigation items:
- Text and icon/badge must always be in **separate `<span>` elements** within navigation items.
- The parent container uses `justify-between` so text aligns left and icons/badges align to the right edge.
- New pages must follow this emoji-suffix pattern for consistency across all guides.

## Error Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Duplicate page ID "foo"` | Two MDX files have the same `id` in frontmatter | Change one of the IDs to be unique |
| `unknown guide "bar"` | MDX frontmatter `guide` field doesn't match a registered guide ID | Use a valid guide ID from the **Guides** table above |
| `Unknown link ID "baz"` | `linkRefs` in MDX frontmatter references an ID that doesn't exist in `src/data/linkRegistry/` | Add the link entry to the appropriate guide file in `src/data/linkRegistry/` |
| `startPageId not in sections` | Guide's `startPageId` isn't listed in its `*_GUIDE_SECTIONS` array | Add the start page ID to the first section of the guide |
| Sidebar shows raw page ID instead of title | Page title missing emoji suffix, or page not in `staticTitles`/`contentPages` | Ensure the MDX `title` ends with an emoji, or add a `staticTitles` entry for non-MDX pages |

## Pre-Push Checklist

- Run `pnpm install` before running lint or build to ensure dependencies are installed.
- Run `pnpm validate` for the full pipeline (`validate:data` + `lint` + `build`), or run each step individually: `pnpm validate:data`, then `pnpm lint`, then `pnpm build`. Validation and lint catch issues faster and cheaper than a full build.
- When fixing lint errors, try `pnpm lint --fix` first to auto-fix what ESLint can handle, then manually fix any remaining issues.
