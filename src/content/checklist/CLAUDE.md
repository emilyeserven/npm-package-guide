# Checklists — Content CLAUDE.md

## Purpose

Cross-guide implementation checklists. Each checklist is associated with a source guide but lives in this shared directory.

## MDX Template

```mdx
---
id: "<checklist-id>"
title: "<Title> ✅"
---

<SectionTitle>{frontmatter.title}</SectionTitle>

<SectionIntro>
[Overview/instructions — how to use the checklist]
</SectionIntro>

<GuideChecklist checklistId="<id>" />
```

## Styling

All checklists use `ChecklistBase` (`src/components/mdx/ChecklistBase.tsx`): progress bar, "Copy as Markdown" button, "Deselect All" button, sections with icon headings, checkbox items with checked line-through styling.

## Unified Checklist Component

All checklists use `<GuideChecklist checklistId="..." />` — a single component that looks up data from the auto-discovered checklist registry. Do NOT create per-guide wrapper components.

### Adding a new checklist

1. Export a `*_CHECKLIST_MANIFEST` from the guide's data file (must match `*Data.ts` or `*Data/index.ts` glob pattern):

```typescript
import type { ChecklistManifest } from './guideTypes'

export const MY_CHECKLIST_MANIFEST: ChecklistManifest = {
  id: 'my-checklist',          // used in MDX: <GuideChecklist checklistId="my-checklist" />
  pageId: 'my-checklist-page', // MDX page ID (omit if no checklist page)
  sourceGuideId: 'my-guide',   // guide ID for "Go to Guide" link
  title: 'My Checklist',
  sections: MY_CHECKLIST,      // ChecklistBaseSection[]
}
```

2. Create the MDX page in `src/content/checklist/` using the template above.

No manual registration needed — `guideRegistry.ts` auto-discovers all `*_CHECKLIST_MANIFEST` exports.

## Rules

- Do NOT add `guide:` field to frontmatter (guide association derived from `*_CHECKLIST_MANIFEST.sourceGuideId`)
- Do NOT add `<NavPill>` "Back to Start Here" links, `<Toc>` sections, or custom checkbox styling
- Checklist pages show a "Go to Guide" floating header link (auto-derived from `checklistPages` in `guideRegistry.ts`)
