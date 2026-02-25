# Add Guide — Reference

Detailed templates and examples for the add-guide skill workflow. Read on-demand during specific steps.

## Scaffold command

```bash
pnpm scaffold-guide --id <guide-id> --title <title> --icon <emoji> \
  --desc <description> --prefix <PREFIX> --camel <camelName> --start <startPageId> \
  [--single-page] \
  [--pages "Group:pageId:Title Emoji,Group:pageId2:Title2 Emoji2,..."] \
  [--check-links "link-id-1,link-id-2,..."]
```

### Flags

| Flag | Description |
|------|-------------|
| `--id` | Kebab-case guide ID (matches content directory name) |
| `--title` | Display title |
| `--icon` | Unicode emoji |
| `--desc` | Short description |
| `--prefix` | UPPER_CASE prefix for constants (e.g., `K8S`, `COOLIFY`) |
| `--camel` | camelCase name for files (e.g., `k8s`, `coolify`) |
| `--start` | Start page ID |
| `--single-page` | Mark as single-page guide |
| `--pages` | Comma-separated page specs: `Group:pageId:Title Emoji` |
| `--check-links` | Comma-separated link IDs to check for duplicates |

### Naming conventions

Check existing guides in `guideRegistry.ts` imports for the pattern:
- `kubernetes` → prefix `K8S`, camel `k8s`
- `coolify-deploy` → prefix `COOLIFY`, camel `coolify`
- `tanstack-query` → prefix `TSQ`, camel `tsq`

### Files created and updated

| Created | Updated |
|---------|---------|
| `src/data/<camel>Data.ts` (with sections pre-populated) | `src/data/guideRegistry.ts` (import + entry + map) |
| `src/content/<guide-id>/<start>.mdx` | `src/data/linkRegistry/index.ts` (import + spread) |
| `src/content/<guide-id>/<page-id>.mdx` (per `--pages` entry) | `src/data/glossaryTerms/index.ts` (import + spread) |
| `src/content/<guide-id>/CLAUDE.md` (with section table) | |
| `src/data/linkRegistry/<camel>Links.ts` | |
| `src/data/glossaryTerms/<camel>Terms.ts` | |

## Data file structure

Edit `src/data/<camel>Data.ts`. If you used `--pages`, sections are already populated — you only need to fill in `*_START_PAGE_DATA`. Otherwise fill in both:

### Guide sections

Add sections to `*_GUIDE_SECTIONS` with labeled groups and page IDs. First section always has `label: null` — it holds only the start page ID. *(Skip if `--pages` was used.)*

### Start page data (multi-page guides)

Populate `*_START_PAGE_DATA`:
- `sectionLabel` in steps must exactly match a `label` in `*_GUIDE_SECTIONS`
- `subItemDescriptions` keys must match page IDs in that section
- Cross-guide links via `customSubItems`

The start page MDX (`<GuideStartContent guideId="..." />`) auto-renders: learning path, Resources tiles (External Resources, Glossary, Checklist). Do **not** add manual Resources steps.

### Directory threshold

Use a `<guide>Data/` directory with `index.ts` re-exports only when the file exceeds ~500 lines.

## MDX page template

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

### MDX notes

- Every `title` **must** end with an emoji suffix. Use the guide's icon emoji for the start page; pick contextually appropriate emojis for other pages.
- `linkRefs` is optional — only add if the page has footnotes or further reading.
- For key terms / definition lists, use `<DefinitionTable>` + `<DefRow>` directly in MDX (do not create guide-specific concept list components).
- `className`, not `class` — MDX is JSX. Self-closing tags: `<br />` not `<br>`.

## Component template

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

### Component conventions

- Use `useIsDark()` for the dark mode boolean (not `useTheme()` + manual check).
- Use `tc(theme.X, isDark)` for common color pairs (text, backgrounds, borders, shadows). Use `ds(light, dark, isDark)` for data-driven accent colors.
- Use Tailwind `dark:` variants for static class-based styling.
- Import data from `src/data/`, never inline in components or MDX.
