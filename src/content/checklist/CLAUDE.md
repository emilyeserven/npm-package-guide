# Checklists — Content CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns. This file covers
> checklist-specific conventions only.

## Purpose

Cross-guide implementation checklists. Each checklist is associated with
a source guide but lives in this shared directory.

## Conventions

### MDX Template

Every checklist page follows this structure:

```mdx
---
id: "<checklist-id>"
title: "<Title> ✅"
---

<SectionTitle>{frontmatter.title}</SectionTitle>

<SectionIntro>
[Overview/instructions — how to use the checklist]
</SectionIntro>

<ChecklistComponent />
```

### Styling

All checklists use the shared `ChecklistBase` component
(`src/components/mdx/ChecklistBase.tsx`), which provides:

- **Progress bar** at top: blue-500/blue-400, showing count + percentage
- **Copy as Markdown** button above the checklist
- **Deselect All** button (appears when items are checked)
- **Sections** with icon + name headings
- **Items** as `<label>` with native checkbox, accent-blue-500
- **Checked state**: line-through text-slate-400

### Data

Each checklist's data lives in its source guide's data file:

| Checklist | Data Source | Wrapper Component |
|-----------|-----------|-------------------|
| Publish Checklist | `src/data/checklistItems.ts` | `PublishChecklist` |
| Quick Test Review | `src/data/testingData.ts` | `TestChecklist` |
| Auth Implementation | `src/data/authData/concepts.ts` | `AuthChecklist` |
| CLAUDE.md Checklist | `src/data/promptData/navigation.ts` | `ClaudeMdChecklist` |

### Floating Header

Checklist pages show a "Go to Guide" link in the floating header that
navigates to the source guide's start page. The mapping is defined in
`checklistPages` in `src/data/guideRegistry.ts`.

### DO NOT

- Do NOT add `<NavPill>` "Back to Start Here" links
- Do NOT add a `guide:` field to frontmatter (guide association is
  managed by `checklistPages` in `guideRegistry.ts`)
- Do NOT include `<Toc>` sections in checklist pages
- Do NOT create custom checkbox styling — use `ChecklistBase`
