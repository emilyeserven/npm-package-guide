---
description: Convert a Claude artifact into a multi-page MDX guide with data files, interactive components, glossary terms, and link registry entries. Covers the full 7-step workflow with copy-pasteable templates for every file type.
---

# Adding a New Guide

Claude artifacts are typically monolithic JSX or HTML files with embedded data and inline styles. This skill describes how to decompose an artifact into the multi-page MDX architecture used by this app.

> For conventions referenced below (link registry format, MDX frontmatter fields, dark mode helpers, navigation formatting), see root `CLAUDE.md`.

## Conversion steps

| Step | Action | Files touched |
|------|--------|---------------|
| 1. Identify content boundaries | Find natural page breaks in the monolithic component. Each distinct topic or section heading becomes its own MDX page. | (analysis only) |
| 2. Create data file | Move inline constants, arrays, and objects into a typed `.ts` file. Export `*_GUIDE_SECTIONS` and `*_START_PAGE_DATA`. See **Data file template**. | `src/data/<guide>Data.ts` |
| 3. Register the guide | Import sections + start page data. Add to `guides` array and `startPageDataMap`. See **Guide registration**. | `src/data/guideRegistry.ts` |
| 4. Create MDX content pages | One `.mdx` per page + a start page. Auto-discovered — no imports needed. See **MDX page template** and **Start page template**. | `src/content/<guide-id>/*.mdx` |
| 5. Extract interactive components | Stateful UI becomes a component in `src/components/mdx/<guide-id>/`. Register in `src/components/mdx/index.ts`. See **Component template**. | `src/components/mdx/<guide-id>/`, `src/components/mdx/index.ts` |
| 6. Add link registry + glossary | Create per-guide files and wire into barrel `index.ts` files. See **Link registry template** and **Glossary template**. | `src/data/linkRegistry/`, `src/data/glossaryTerms/` |
| 7. Verify | Run `pnpm validate`. Catches broken link references, missing page IDs, TypeScript errors. | — |

---

## Data file template

Single-file layout (use a `<guide>Data/` directory with `index.ts` re-exports only when the file exceeds ~500 lines).

```ts
import type { GuideSection, StartPageData } from './guideTypes'

// ── Guide sections ──────────────────────────────────────────────────

export const EXAMPLE_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['ex-start'] },
  {
    label: 'Fundamentals',
    ids: ['ex-basics', 'ex-concepts'],
  },
  {
    label: 'Advanced',
    ids: ['ex-patterns', 'ex-tips'],
  },
]

// ── Start page data ─────────────────────────────────────────────────

export const EXAMPLE_START_PAGE_DATA: StartPageData = {
  subtitle: 'One-line summary of what the reader will learn.',
  tip: 'Suggested reading order or prerequisite advice.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Fundamentals',
      description: 'What this section covers.',
      sectionLabel: 'Fundamentals',          // must match a label above
      subItemDescriptions: {
        'ex-basics': 'What the Basics page teaches.',
        'ex-concepts': 'What the Concepts page teaches.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Advanced',
      description: 'What this section covers.',
      sectionLabel: 'Advanced',
      subItemDescriptions: {
        'ex-patterns': 'What the Patterns page teaches.',
        'ex-tips': 'What the Tips page teaches.',
      },
    },
  ],
  // relatedGuides: ['other-guide-id'],  // optional
}

// ── Page-specific data ──────────────────────────────────────────────

export interface ExampleItem {
  id: string
  title: string
  description: string
  // ... guide-specific fields
}

export const EXAMPLE_ITEMS: ExampleItem[] = [
  // ...
]
```

Key points:
- Import `GuideSection` and `StartPageData` from `./guideTypes` (not `guideRegistry`).
- First section always has `label: null` — it holds only the start page ID.
- `sectionLabel` in `StartPageData.steps` must exactly match a `label` in `*_GUIDE_SECTIONS`.
- `subItemDescriptions` keys must match the page IDs in that section.

---

## Guide registration

Two edits to `src/data/guideRegistry.ts`:

**1. Add to `guides` array** (at the bottom, before the closing `]`):

```ts
import { EXAMPLE_GUIDE_SECTIONS, EXAMPLE_START_PAGE_DATA } from './exampleData'

// in the guides array:
{
  id: 'example',
  icon: '\u{1F4DA}',        // 📚  ← use Unicode escape
  title: 'Example Guide',
  startPageId: 'ex-start',
  description: 'One-line description for the home page tile.',
  sections: EXAMPLE_GUIDE_SECTIONS,
},
```

**2. Add to `startPageDataMap`**:

```ts
'example': EXAMPLE_START_PAGE_DATA,
```

---

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

Notes:
- Every `title` **must** end with an emoji suffix. Use the guide's icon emoji for the start page; pick contextually appropriate emojis for other pages.
- `linkRefs` is optional — only add if the page has footnotes or further reading.
- `group` frontmatter is optional — used only for special grouping overrides.

## Start page template

```mdx
---
id: "ex-start"
title: "Start Here 📚"
guide: "example"
---

<GuideStartContent guideId="example" />
```

The start page emoji should match the guide's `icon` from the registry. `GuideStartContent` auto-renders the learning path, resources tiles, and header from `StartPageData` — never build start page layouts manually.

## Key terms / definition lists

Use the shared `DefinitionTable` directly in MDX — do **not** create guide-specific concept list components.

```mdx
<DefinitionTable termHeader="Term" descHeader="Definition">
  <DefRow term="Example term">Description of the term.</DefRow>
</DefinitionTable>
```

---

## Interactive component template

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

### Registration in `src/components/mdx/index.ts`

```ts
// <guide-id>
import { MyComponent } from './<guide-id>/MyComponent'

// add to mdxComponents object:
MyComponent,
```

### Component conventions

- Use `useIsDark()` for the dark mode boolean (not `useTheme()` + manual check).
- Use `tc(theme.X, isDark)` for common color pairs (text, backgrounds, borders, shadows). Use `ds(light, dark, isDark)` for data-driven accent colors.
- Use Tailwind `dark:` variants for static class-based styling.
- Import data from `src/data/`, never inline in components or MDX.
- Prefer shared bases (`AccordionList`, `TimelineFlow`, `ProsCons`, `CardBase`, `StatusBadge`, `YamlExplorerBase`, `useExplorer`) over building from scratch. See `docs/COMPONENT_REFERENCE.md`.

---

## Link registry template

Create `src/data/linkRegistry/<guideId>Links.ts`:

```ts
import type { RegistryLink } from './index'

export const exampleLinks: RegistryLink[] = [
  {
    id: 'example-docs',
    url: 'https://example.com/docs',
    label: 'Example Documentation',
    source: 'Example',
    desc: 'Official documentation for Example.',
    tags: ['docs', 'free', 'guide:example'],
    resourceCategory: 'Official Documentation',
  },
]
```

Then register in `src/data/linkRegistry/index.ts`:

```ts
import { exampleLinks } from './exampleLinks'

// add to the linkRegistry array:
...exampleLinks,
```

ID convention: `{source}-{topic-slug}` (e.g., `"mdn-tree-shaking"`, `"docker-get-started"`). Every link tagged `guide:<id>` appears on that guide's External Resources filter. Set `resourceCategory` for links that should appear on the External Resources page.

---

## Glossary terms template

Create `src/data/glossaryTerms/<guideId>Terms.ts`:

```ts
import type { GlossaryCategory } from './index'

export const exampleGlossary: GlossaryCategory[] = [
  {
    category: 'Example Concepts',
    terms: [
      {
        term: 'Example Term',
        definition:
          'One to two sentences for a backend engineer. Use <code>inline code</code> for API names.',
        linkId: 'example-docs',
        sectionId: 'ex-basics',
      },
    ],
  },
]
```

Then register in `src/data/glossaryTerms/index.ts`:

```ts
import { exampleGlossary } from './exampleTerms'

// add to the glossaryTerms array:
...exampleGlossary,
```

### What should be a glossary term

Add entries for: technical terms introduced by the guide, acronyms, tools/libraries/frameworks, and concepts a backend engineer might not know. Skip generic programming terms (e.g., "variable", "function") unless the guide gives them a specialized meaning.

### Category conventions

Reuse existing categories when possible. When adding a new one, also add a `cat:<slug>` entry to `badgeMap` in `src/data/overallResources.ts` (slug convention: lowercase, spaces → hyphens, drop `&`).

---

## Guide CLAUDE.md template

Create `src/content/<guide-id>/CLAUDE.md`:

```markdown
# <Guide Title> — Guide CLAUDE.md

## Audience & Purpose

<One paragraph: who this guide is for and what it covers.>

## Section Structure

Defined in `<PREFIX>_GUIDE_SECTIONS` in `src/data/<guide>Data.ts`.

| Section Label | Page IDs |
|---|---|
| *(start)* | `<start-id>` |
| <Section 1> | `<id-1>`, `<id-2>` |
| <Section 2> | `<id-3>`, `<id-4>` |

## Interactive Components

| Component | Props | Purpose |
|---|---|---|
| `<ComponentName>` | `<prop>` (type) | <One-line description> |

## Data Files

- `src/data/<guide>Data.ts` — <Brief description of what data it contains.>

## Guide-Specific Conventions

- <Bullet points about data keying, component patterns, or anything unique to this guide.>

## Adding New Content

1. <Steps to add a new page or extend existing content.>
```

---

## Common pitfalls

- `className`, not `class` — MDX is JSX.
- Self-closing tags: `<br />`, `<img />`, not `<br>`, `<img>`.
- Normalize inline styles into Tailwind utility classes. Prefer Tailwind's built-in scale over arbitrary values.
- Data in `src/data/`, not inline in MDX or components.
- Guide-specific components go in `src/components/mdx/<guide-id>/`, not at the top level. Always register in `index.ts`.
- Every MDX `title` must end with an emoji suffix.
- Interactive components must support dark mode via `useIsDark()` + `ds()`/`tc()`.

## What updates automatically

- **Sidebar, Command menu, Home page**: read from `guides` array — new guide appears automatically.
- **Prev/next navigation**: derived from guide sections.
- **Content registry**: auto-discovers MDX files in `src/content/`.
- **Start page sub-items**: derived from sections via `sectionLabel` — adding/removing pages updates the learning path.
- **Start page Resources tiles**: External Resources, Glossary, and Checklist tiles auto-populate — no manual `customSubItems` needed.
- **Router**: resolves MDX via auto-discovery — no `router.tsx` edits.

## Post-creation checklist

1. Add the per-guide `CLAUDE.md` in the content directory (see template above).
2. Run `pnpm validate` — fix any errors before committing.
