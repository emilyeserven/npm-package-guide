# Git Worktrees & Claude Code Guide

## Audience & Purpose

For developers who want to use git worktrees for parallel development, particularly with AI coding assistants like Claude Code. Covers worktree concepts, setup, management, and real workflow patterns.

## Section Structure

This is a **single-page guide** — all content lives in one MDX file.

| Page ID | Description |
|---------|-------------|
| `git-worktrees-guide` | Full guide covering concept, setup, management, Claude Code integration, workflows, and cleanup |

## Interactive Components

Guide-specific:
- `WorktreeDiagram` — Visual tree showing bare repo branching to worktree directories

Shared:
- `SectionTitle`, `SectionSubheading`, `Toc`, `TocLink`, `SectionIntro`
- `SectionNote`, `Explainer`, `Gotcha`
- `GuideChecklist` — Cleanup checklist (`checklistId="git-worktrees"`)
- Standard markdown code fences for bash commands

## Guide-Specific Conventions

- **Flat section structure:** Original HTML had step-based tabs; converted to flat scrollable sections with `SectionSubheading` headers
- **Code blocks:** Standard markdown fenced code blocks with `bash` language tag
- **Emoji in subheadings:** Use Unicode escapes: `{'\u{emoji}'}`
