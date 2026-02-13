---
description: Convert a Claude artifact into a multi-page MDX guide with data files, interactive components, glossary terms, and link registry entries. Covers the full 9-step workflow, MDX and component templates, glossary editorial guidance, and common pitfalls.
---

# Adding a New Guide

Claude artifacts are typically monolithic JSX or HTML files with embedded data and inline styles. Every guide in this app originates as a Claude artifact. This skill describes how to decompose an artifact into the multi-page MDX architecture used by this app. The Architecture Guide conversion is the canonical example: the original single-component `ArchitecturePage.tsx` (504 lines) was split into 8 MDX pages, 4 interactive components, and a centralized data file.

> For conventions referenced below (link registry format, MDX frontmatter fields, dark mode helper, navigation formatting), see root `CLAUDE.md`.

## Conversion steps

| Step | Action | Files |
|------|--------|-------|
| 1. Identify content boundaries | Find natural page breaks in the monolithic component. Each distinct topic or section heading becomes its own MDX page. | (analysis only) |
| 2. Create data file | Move inline constants, arrays, and objects into a new typed `.ts` file. Define TypeScript interfaces for data shapes. Import `GuideSection` from `src/data/guideTypes.ts`. Export `<GUIDE>_GUIDE_SECTIONS: GuideSection[]` with labeled section groups. | `src/data/<guide>Data.ts` |
| 3. Register the guide | Import `<GUIDE>_GUIDE_SECTIONS` from your data file. Add a new entry to the `guides` array in `src/data/guideRegistry.ts` with `id`, `icon`, `title`, `startPageId`, `description`, `sections`. | `src/data/guideRegistry.ts` |
| 4. Create MDX content pages | One `.mdx` file per page with frontmatter (`id`, `title` with emoji suffix, `guide`). Use existing MDX components (`SectionIntro`, `Toc`, `TocLink`, `ColItem`, `Explainer`, etc.). Pages are auto-discovered by `src/content/registry.ts` — no manual import needed. | `src/content/<guide>/*.mdx` |
| 5. Create Start page data + MDX file | Export `<GUIDE>_START_PAGE_DATA: StartPageData` from the guide's data file. Define `subtitle`, `tip`, and `steps` array with `sectionLabel` references matching the `*_GUIDE_SECTIONS` labels — this makes the learning path auto-derive sub-items from section page lists. Then create `src/content/<guide>/<start-page-id>.mdx` with frontmatter and `<GuideStartContent guideId="<guide-id>" />`. See **Start page MDX template** below. | `src/data/<guide>Data.ts`, `src/content/<guide>/<start>.mdx` |
| 6. Register start page data | Import the `*_START_PAGE_DATA` in `src/data/guideRegistry.ts` and add it to `startPageDataMap`. The MDX file auto-routes via content registry — no `componentPages.tsx` changes needed. | `src/data/guideRegistry.ts` |
| 7. Extract interactive components | Stateful or interactive UI (explorers, diagrams, accordions) becomes a standalone component in `src/components/mdx/<guide-id>/` that reads data from `src/data/` via a prop (e.g., `<StackExplorer stackId="mern" />`). Register it in `src/components/mdx/index.ts`. See **Interactive MDX Component Template** below. | `src/components/mdx/<guide-id>/` |
| 8. Add glossary terms | Add relevant terms to the appropriate file in `src/data/glossaryTerms/` following the glossary conventions below. Ensure each `linkId` exists in the link registry. | `src/data/glossaryTerms/`, `src/data/linkRegistry/` |
| 9. Verify | Run `pnpm validate` (runs `validate:data` + `lint` + `build`). This catches broken link references, invalid page headings, and TypeScript errors. | — |

## MDX page template

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

## Start page MDX template

```mdx
---
id: "<guide>-start"
title: "Start Here 🔹"
guide: "<guide-id>"
---

<GuideStartContent guideId="<guide-id>" />
```

The `GuideStartContent` component reads `StartPageData` from `guideRegistry.ts` and renders the learning path automatically. Sub-items are auto-derived from guide sections via `sectionLabel` references. Per-item descriptions are provided via `subItemDescriptions` in the start page data. For items not derivable from sections (cross-guide links, resource page links), use `customSubItems`.

## Interactive MDX Component Template

Minimal template for a new interactive MDX component with dark mode support.

### Component file: `src/components/mdx/<guide-id>/MyComponent.tsx`

```tsx
import { useState } from 'react'
import { useTheme } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { MY_DATA } from '../../../data/myGuideData'
import type { MyDataItem } from '../../../data/myGuideData'

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
import { MyComponent } from './<guide-id>/MyComponent'
// Add to the mdxComponents object:
MyComponent,
```

### Usage in MDX

```mdx
<MyComponent itemId="example-id" />
```

### Component conventions

- Import data from `src/data/`, never inline in the component
- Use `useTheme()` + `ds()` for dynamic inline styles with dark mode
- Use Tailwind `dark:` variants for class-based styling
- Data interfaces should include `darkAccent` field when components use dynamic accent colors
- Standard dark palette: backgrounds `#1e293b`, text `#e2e8f0`, borders `#334155`

## Common pitfalls

- Use `className`, not `class` — MDX is JSX, not HTML.
- Use self-closing JSX tags: `<br />`, `<img />`, not `<br>`, `<img>`.
- Normalize inline styles and CSS classes into Tailwind utility classes. Prefer Tailwind's built-in scale over arbitrary values (e.g., use `text-sm` instead of `text-[13px]`).
- Keep data in `src/data/`, not inline in MDX files or components.
- Start pages use `<GuideStartContent guideId="..." />` — do not build start page layouts manually. Add `StartPageData` to the guide's data file instead.
- Export `*_GUIDE_SECTIONS` from the data file. Register the guide in `src/data/guideRegistry.ts`.
- Place new guide-specific interactive MDX components in `src/components/mdx/<guide-id>/`, not at the top level. Register them in `src/components/mdx/index.ts` with the subfolder import path.
- Register any new interactive MDX components in `src/components/mdx/index.ts` or they won't be available in MDX files.
- Interactive components with inline styles must support dark mode. Use `useTheme()` and `ds()` helper for theme-conditional values. Add `darkAccent` fields to data interfaces when components use dynamic accent colors.
- Every MDX page `title` must end with an emoji suffix (see root CLAUDE.md **Navigation Item Formatting**).

## What updates automatically

- **Sidebar**: reads `guides` array from `guideRegistry.ts` — new guide appears automatically
- **Command menu**: reads `guides` array — new guide sections appear automatically
- **Home page**: reads `guides` array — new guide tile appears automatically
- **Navigation (prev/next)**: derived from guide sections — works automatically
- **Content registry**: auto-discovers new MDX files in `src/content/`
- **Start page sub-items**: derived from guide sections via `sectionLabel` in `StartPageData` — adding/removing pages from a section automatically updates the start page learning path
- **Start page header**: title, description, and icon read from `guideRegistry.ts` — changing them updates the start page automatically
- **Router**: resolves MDX pages via auto-discovery and component pages via `componentPages.tsx` registry — no `router.tsx` edits needed

## Glossary editorial guidance

### What should be a glossary term

Add a glossary entry for:
- **Technical terms introduced or explained in a guide page** — e.g., "Tree Shaking", "Peer Dependency", "Mocking"
- **Acronyms and abbreviations** — e.g., "ESM", "CJS", "CI", "ORM"
- **Tools, libraries, and frameworks** referenced across guides — e.g., "Vitest", "Storybook", "Playwright"
- **Concepts a backend engineer might not know** — the target audience is backend developers learning frontend; if a term would need a sidebar explanation, it deserves a glossary entry

Do NOT add glossary entries for generic programming terms that any developer would know (e.g., "variable", "function", "loop") unless a guide gives them a specialized frontend meaning.

### Category conventions

Terms are grouped into `GlossaryCategory` objects. Current categories: Package Management, Dependencies, Build & Bundling, TypeScript, Package Configuration, Development Workflow, Web Architecture, Databases, Full-Stack Frameworks, Testing Fundamentals, Prompt Engineering, AI Coding Tools.

When adding a new category:
- Pick a name that describes the domain, not a specific guide (categories can span guides).
- Add a corresponding `cat:<slug>` entry to the `badgeMap` in `src/data/overallResources.ts` so the category filter badge renders on the Glossary page. The slug convention is the category name lowercased with spaces replaced by hyphens and `&` dropped (e.g., `"Build & Bundling"` → `cat:build-bundling`).

## Post-creation checklist

After creating a new guide, also:
- Add a per-guide `CLAUDE.md` in the content directory (see existing guides for template)
- Update the Guides table in root `CLAUDE.md` with the new guide ID, title, and start page
- Create link registry and glossary terms files for the guide
