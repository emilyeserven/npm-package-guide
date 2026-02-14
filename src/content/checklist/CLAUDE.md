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

<ChecklistComponent />
```

## Styling

All checklists use `ChecklistBase` (`src/components/mdx/ChecklistBase.tsx`): progress bar, "Copy as Markdown" button, "Deselect All" button, sections with icon headings, checkbox items with checked line-through styling.

## Data Sources

| Checklist | Data Source | Wrapper Component |
|-----------|-----------|-------------------|
| Publish Checklist | `src/data/checklistItems.ts` | `PublishChecklist` |
| Quick Test Review | `src/data/testingData.ts` | `TestChecklist` |
| Auth Implementation | `src/data/authData/concepts.ts` | `AuthChecklist` |
| CLAUDE.md Checklist | `src/data/promptData/navigation.ts` | `ClaudeMdChecklist` |

## Rules

- Do NOT add `guide:` field to frontmatter (guide association managed by `checklistPages` in `guideRegistry.ts`)
- Do NOT add `<NavPill>` "Back to Start Here" links, `<Toc>` sections, or custom checkbox styling
- Checklist pages show a "Go to Guide" floating header link (mapping in `checklistPages` in `guideRegistry.ts`)
