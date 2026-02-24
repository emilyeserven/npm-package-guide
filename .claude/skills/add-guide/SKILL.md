---
description: Convert a Claude artifact into a multi-page MDX guide with data files, interactive components, glossary terms, and link registry entries.
---

# Adding a New Guide

Decompose a monolithic Claude artifact into the multi-page MDX architecture. The scaffold script automates all boilerplate file creation and registry wiring; this skill focuses on the content steps that require judgment.

> Reference docs (read on-demand): `docs/COMPONENT_REFERENCE.md` (shared components), `docs/CONTENT_REFERENCE.md` (MDX/links/glossary), `docs/DEVELOPMENT_REFERENCE.md` (dark mode, routing, validation).

## Workflow

### Step 1 — Identify content boundaries

Find natural page breaks in the artifact. Each distinct topic or section heading becomes its own MDX page (or a single page for `--single-page` guides).

### Step 2 — Run scaffold script

```bash
pnpm scaffold-guide --id <guide-id> --title <title> --icon <emoji> \
  --desc <description> --prefix <PREFIX> --camel <camelName> --start <startPageId> \
  [--single-page]
```

This creates all stub files and updates all registries:

| Created | Updated |
|---------|---------|
| `src/data/<camel>Data.ts` | `src/data/guideRegistry.ts` (import + entry + map) |
| `src/content/<guide-id>/<start>.mdx` | `src/data/linkRegistry/index.ts` (import + spread) |
| `src/content/<guide-id>/CLAUDE.md` | `src/data/glossaryTerms/index.ts` (import + spread) |
| `src/data/linkRegistry/<camel>Links.ts` | |
| `src/data/glossaryTerms/<camel>Terms.ts` | |

Naming conventions for `--prefix` and `--camel`: check existing guides in `guideRegistry.ts` imports for the pattern (e.g., `kubernetes` → prefix `K8S`, camel `k8s`; `coolify-deploy` → prefix `COOLIFY`, camel `coolify`).

### Step 3 — Fill in guide data

Edit `src/data/<camel>Data.ts`. The scaffold creates the stub; fill in:

1. Add sections to `*_GUIDE_SECTIONS` with labeled groups and page IDs. First section always has `label: null` — it holds only the start page ID.
2. For multi-page guides, populate `*_START_PAGE_DATA`:
   - `sectionLabel` in steps must exactly match a `label` in `*_GUIDE_SECTIONS`
   - `subItemDescriptions` keys must match page IDs in that section
   - Cross-guide links via `customSubItems`

The start page MDX (`<GuideStartContent guideId="..." />`) auto-renders: learning path, Resources tiles (External Resources, Glossary, Checklist). Do **not** add manual Resources steps.

Use a `<guide>Data/` directory with `index.ts` re-exports only when the file exceeds ~500 lines.

### Step 4 — Create MDX content pages

One `.mdx` file per page in `src/content/<guide-id>/`. Pages are auto-discovered — no manual import needed.

```mdx
---
id: "ex-basics"
title: "Basics 📚"
guide: "example"
linkRefs:
  - id: "example-docs"
    note: "Official documentation"
---

<SectionTitle>{frontmatter.title}</SectionTitle>

<Toc>
  <TocLink id="toc-first">First section</TocLink>
  <TocLink id="toc-second">Second section</TocLink>
</Toc>

<SectionIntro>
Brief intro paragraph.
</SectionIntro>

<SectionSubheading id="toc-first">First section</SectionSubheading>

Content here. Use `<SectionList>` + `<ColItem>` for indented lists, `<SectionNote>` for info callouts, `<Explainer>` for tips, `<Gotcha>` for warnings.

<SectionSubheading id="toc-second">Second section</SectionSubheading>

<MyInteractiveComponent itemId="example-id" />
```

Notes:
- Every `title` **must** end with an emoji suffix. Use the guide's icon emoji for the start page; pick contextually appropriate emojis for other pages.
- `linkRefs` is optional — only add if the page has footnotes or further reading.
- For key terms / definition lists, use `<DefinitionTable>` + `<DefRow>` directly in MDX (do not create guide-specific concept list components).

### Step 5 — Extract interactive components

Place in `src/components/mdx/<guide-id>/`. Register in `src/components/mdx/index.ts`.

**Before creating a component**, check `docs/COMPONENT_REFERENCE.md` for shared bases: `AccordionList`, `TimelineFlow`, `ProsCons`, `CardBase`, `StatusBadge`, `YamlExplorerBase`, `useExplorer`. Thin data-lookup wrappers are fine; do not reimplement shared patterns.

```tsx
// src/components/mdx/<guide-id>/MyComponent.tsx
import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { MY_DATA } from '../../../data/myGuideData'
import type { MyDataItem } from '../../../data/myGuideData'

export function MyComponent({ itemId }: { itemId: string }) {
  const isDark = useIsDark()
  const [activeId, setActiveId] = useState<string | null>(null)

  const item = MY_DATA.find((d: MyDataItem) => d.id === itemId)
  if (!item) return null

  return (
    <div
      style={{
        color: tc(theme.textPrimary, isDark),           // common pair — use tc()
        background: ds(item.accent, item.darkAccent, isDark), // data-driven — use ds()
        boxShadow: tc(theme.shadowSm, isDark),
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

Component conventions:
- Use `useIsDark()` for the dark mode boolean (not `useTheme()` + manual check).
- Use `tc(theme.X, isDark)` for common color pairs (text, backgrounds, borders, shadows). Use `ds(light, dark, isDark)` for data-driven accent colors.
- Use Tailwind `dark:` variants for static class-based styling.
- Import data from `src/data/`, never inline in components or MDX.

### Step 6 — Add links and glossary terms

Stub files exist from Step 2. Fill in entries:

- **Links** (`src/data/linkRegistry/<camel>Links.ts`): ID convention `{source}-{topic-slug}`. Include `tags: ['guide:<guide-id>']` and `resourceCategory` for External Resources visibility. See `docs/CONTENT_REFERENCE.md` for full field reference.
- **Glossary** (`src/data/glossaryTerms/<camel>Terms.ts`): Each term needs `linkId` (must exist in link registry), optional `sectionId`/`guides`. See `docs/CONTENT_REFERENCE.md` for editorial guidance on what qualifies as a glossary term.

### Step 7 — Verify

```bash
pnpm validate
```

This runs `validate:data` + `lint` + `build`. Catches broken link/glossary references, missing emoji suffixes, orphaned pages, and TypeScript errors.

## What updates automatically

- **Sidebar, Command menu, Home page**: read from `guides` array — new guide appears automatically.
- **Prev/next navigation**: derived from guide sections.
- **Content registry**: auto-discovers MDX files in `src/content/`.
- **Start page sub-items**: derived from sections via `sectionLabel` — adding/removing pages updates the learning path.
- **Start page Resources tiles**: External Resources, Glossary, and Checklist tiles auto-populate — no manual `customSubItems` needed.
- **Router**: resolves MDX via auto-discovery — no `router.tsx` edits.

## Common pitfalls

- `className`, not `class` — MDX is JSX. Self-closing tags: `<br />` not `<br>`.
- Tailwind utility classes over inline styles. Prefer built-in scale (`text-sm`) over arbitrary values (`text-[13px]`).
- Data in `src/data/`, not inline in MDX or components.
- Start pages: `<GuideStartContent guideId="..." />` only — never build manually.
- Guide-specific components go in `src/components/mdx/<guide-id>/`, not at the top level. Always register in `index.ts`.
- Every MDX `title` must end with an emoji suffix.
- Interactive components must support dark mode via `useIsDark()` + `ds()`/`tc()`.

## Post-creation

1. Fill in `src/content/<guide-id>/CLAUDE.md` (audience, section table, component table, conventions). The scaffold creates a stub; see existing guides for examples.
2. Run `pnpm validate` — fix any errors before committing.
