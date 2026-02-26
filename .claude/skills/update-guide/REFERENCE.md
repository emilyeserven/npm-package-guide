# Update Guide — Reference

Detailed templates and examples for the update-guide skill workflow. Read on-demand during specific steps.

## Expanding guide data

When adding entries to existing data arrays or objects in `src/data/<camel>Data.ts`:

1. **Read the guide's CLAUDE.md** (`src/content/<guide-id>/CLAUDE.md`) — it documents the data structures, their types, and naming conventions.
2. **Match the existing shape exactly.** Import the TypeScript type/interface from the data file and follow it. Do not add new fields unless the type already supports them.
3. **Co-locate with existing data.** Add entries to the same array/object, not a separate file, unless the data file already uses a `<camel>Data/` directory split.
4. **Directory threshold:** If the data file exceeds ~500 lines after your additions, consider splitting into a `<camel>Data/` directory with `index.ts` re-exports.

## Adding a section

Add a new entry to `*_GUIDE_SECTIONS` in the guide's data file:

```typescript
// Existing sections
export const EXAMPLE_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['example-start'] },           // start page — always first, always null label
  { label: 'Basics', ids: ['example-intro', 'example-setup'] },
  // ↓ New section added here
  { label: 'Advanced', ids: ['example-patterns', 'example-testing'] },
]
```

**Rules:**
- First entry always has `label: null` and holds only the start page ID.
- Each subsequent entry has a non-null `label` (section heading) and one or more page IDs.
- Array order = sidebar order = prev/next order.
- `label` values must be unique across the guide's sections.
- Page IDs must match the `id` frontmatter in the corresponding MDX files.

## Adding a start page step

When adding pages or sections to a multi-page guide, sync `*_START_PAGE_DATA.steps`:

### Numbered step (main learning path)

```typescript
{
  type: 'numbered',
  num: 3,                          // sequential number in the learning path
  title: 'Advanced Patterns',
  description: 'Learn real-world patterns for production use.',
  jumpTo: 'example-patterns',     // page ID to navigate to
}
```

### Bonus step (section overview with sub-items)

```typescript
{
  type: 'bonus',
  title: 'Reference',
  description: 'Quick-access reference material.',
  sectionLabel: 'Reference',       // MUST exactly match a label in *_GUIDE_SECTIONS
  subItemDescriptions: {
    'example-cheatsheet': 'Common commands and shortcuts.',
    'example-faq': 'Answers to frequently asked questions.',
  },
}
```

### Adding a page to an existing section

If you add a page to a section that already has a step with `subItemDescriptions`, add the page's entry:

```typescript
subItemDescriptions: {
  'example-cheatsheet': 'Common commands and shortcuts.',
  'example-faq': 'Answers to frequently asked questions.',
  'example-tips': 'Pro tips from experienced practitioners.',  // ← new
},
```

### Cross-guide links via customSubItems

For steps that link to pages in other guides or filtered views:

```typescript
{
  type: 'bonus',
  title: 'Related Resources',
  description: 'Explore related content across guides.',
  customSubItems: [
    {
      title: 'Testing Patterns',
      description: 'Testing strategies from the Testing guide.',
      jumpTo: 'testing-patterns',
      jumpType: 'page',
    },
    {
      title: 'Related External Resources',
      description: 'Curated links for this topic.',
      jumpTo: 'example',
      jumpType: 'guide-filter',
      tags: [{ icon: '🔗', name: 'External' }],
    },
  ],
}
```

### Constraint summary

| Field | Constraint |
|-------|-----------|
| `sectionLabel` | Must exactly match a `label` in `*_GUIDE_SECTIONS`. Case-sensitive. |
| `subItemDescriptions` keys | Must match page IDs in the corresponding section. |
| `num` | Sequential integer. Only for `type: 'numbered'`. |
| `jumpTo` | Must be a valid page ID or guide ID (for `guide-filter`). |

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

## Checklist registration

Adding a checklist requires wiring four files across three directories.

### Wiring summary

| File | What to add |
|------|-------------|
| `src/data/<camel>Data.ts` | Export checklist data (`ChecklistBaseSection[]` or transformable array) |
| `src/components/mdx/GuideChecklist.tsx` | Import + add to `CHECKLIST_REGISTRY` |
| `src/data/guideRegistry.ts` | Add entry to `checklistPages` array |
| `src/content/checklist/<id>.mdx` | Create checklist MDX page |

### Pattern A — Direct ChecklistBaseSection[] import

The simplest pattern. Export data that already matches `ChecklistBaseSection[]`:

```typescript
// In src/data/<camel>Data.ts
import type { ChecklistBaseSection } from '../components/mdx/ChecklistBase'

export const MY_CHECKLIST: ChecklistBaseSection[] = [
  {
    id: 'setup',
    name: 'Setup',
    icon: '🔧',
    items: [
      { label: 'Install dependencies' },
      { label: 'Configure environment', description: 'Optional detail text' },
    ],
  },
]
```

```typescript
// In GuideChecklist.tsx — import + registry entry
import { MY_CHECKLIST } from '../../data/myGuideData'

// In CHECKLIST_REGISTRY:
'my-guide': { title: 'My Guide Checklist', sections: MY_CHECKLIST },
```

### Pattern B — groupBy transform

When data uses a flat array with a category field:

```typescript
// In src/data/<camel>Data.ts
export const MY_CHECKLIST_ITEMS = [
  { text: 'Install deps', cat: 'Setup' },
  { text: 'Run tests', cat: 'Verify' },
]
```

```typescript
// In GuideChecklist.tsx
import { MY_CHECKLIST_ITEMS } from '../../data/myGuideData'

const MY_ICONS: Record<string, string> = { Setup: '🔧', Verify: '✅' }

// In CHECKLIST_REGISTRY:
'my-guide': { title: 'My Guide Checklist', sections: groupBy(MY_CHECKLIST_ITEMS, it => it.cat, MY_ICONS) },
```

### Pattern C — Inline transform

When the source data shape doesn't match either pattern:

```typescript
// In GuideChecklist.tsx
import { MY_DATA } from '../../data/myGuideData'

// In CHECKLIST_REGISTRY:
'my-guide': {
  title: 'My Guide Checklist',
  sections: MY_DATA.map(g => ({
    id: g.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: g.heading,
    icon: MY_ICONS[g.heading] ?? '✅',
    items: g.items.map(label => ({ label })),
  })),
},
```

### Checklist MDX template

Create `src/content/checklist/<checklist-page-id>.mdx`:

```mdx
---
id: "<checklist-page-id>"
title: "<Guide Name> Checklist ✅"
---

<SectionTitle>{frontmatter.title}</SectionTitle>

<SectionIntro>
Use this checklist to verify your implementation covers all key areas.
</SectionIntro>

<GuideChecklist checklistId="<registry-key>" />
```

**Rules** (from `src/content/checklist/CLAUDE.md`):
- Do NOT add `guide:` field to frontmatter — guide association is managed by `checklistPages` in `guideRegistry.ts`.
- Do NOT add `<NavPill>`, `<Toc>`, or custom checkbox styling.
- The `checklistId` prop must match a key in `CHECKLIST_REGISTRY`.
- The `id` frontmatter must match the `id` in the `checklistPages` entry.

### ID spaces (avoid confusion)

| ID | Where used | Example |
|----|-----------|---------|
| Registry key | `CHECKLIST_REGISTRY` in `GuideChecklist.tsx`, `<GuideChecklist checklistId="...">` | `cicd` |
| Page ID | `checklistPages` in `guideRegistry.ts`, MDX `id` frontmatter | `cicd-checklist` |

These are different — the registry key is typically shorter (e.g., `cicd`), while the page ID includes a `-checklist` suffix (e.g., `cicd-checklist`).

## Guide CLAUDE.md template

Update `src/content/<guide-id>/CLAUDE.md` when:

- **New components added** — add a row to the Interactive Components table.
- **Data conventions changed** — update or add bullet points in Guide-Specific Conventions.
- **Sections added/removed** — the section table (if present) should reflect the current structure.

The standard format:

```markdown
# <Guide Title> — Guide CLAUDE.md

## Audience & Purpose

<Who the guide is for and what it teaches.>

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `ComponentName` | `propName: type` | Brief description |

## Guide-Specific Conventions

- **Data structure name:** Description of shape and naming pattern.
- **Convention name:** Explanation.
```
