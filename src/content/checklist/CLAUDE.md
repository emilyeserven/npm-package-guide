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

All checklists use `<GuideChecklist checklistId="..." />` — a single component with a built-in registry. Do NOT create per-guide wrapper components. To add a new checklist, add its data and metadata to the registry in `src/components/mdx/GuideChecklist.tsx`.

| Checklist ID | Title | Data Source |
|-------------|-------|-----------|
| `publish` | Publish Checklist | `src/data/checklistItems.ts` |
| `test` | Quick Test Review | `src/data/testingData.ts` |
| `auth` | Auth Implementation | `src/data/authData/concepts.ts` |
| `claudemd` | CLAUDE.md Checklist | `src/data/promptData/navigation.ts` |
| `arch` | Architecture Checklist | `src/data/archData/checklist.ts` |
| `cicd` | CI/CD Checklist | `src/data/cicdChecklist.ts` |
| `k8s` | Kubernetes Checklist | `src/data/k8sChecklist.ts` |
| `ai-infra` | AI Infrastructure Checklist | `src/data/aiInfraData/checklist.ts` |
| `nja` | Next.js Migration Checklist | `src/data/njaData/checklist.ts` |
| `git-worktrees` | Git Worktrees Checklist | `src/data/gitWorktreesData.ts` |
| `coolify` | Coolify Deploy Checklist | `src/data/coolifyData.ts` |
| `cmd-review` | CLAUDE.md Self-Review | `src/data/claudeMdData.ts` |

## Rules

- Do NOT add `guide:` field to frontmatter (guide association managed by `checklistPages` in `guideRegistry.ts`)
- Do NOT add `<NavPill>` "Back to Start Here" links, `<Toc>` sections, or custom checkbox styling
- Checklist pages show a "Go to Guide" floating header link (mapping in `checklistPages` in `guideRegistry.ts`)
