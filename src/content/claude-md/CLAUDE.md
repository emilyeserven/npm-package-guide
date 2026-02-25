# Writing Effective CLAUDE.md Files — Guide CLAUDE.md

## Audience & Purpose

Developers learning to configure Claude Code effectively. Teaches how to write, structure, and maintain CLAUDE.md files — the persistent memory system that gives Claude project context.

## Section Structure

Defined in `CMD_GUIDE_SECTIONS` in `src/data/claudeMdData.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `cmd-start` |
| Foundations | `cmd-intro`, `cmd-hierarchy` |
| Writing | `cmd-content`, `cmd-principles`, `cmd-structure` |
| Pitfalls & Tools | `cmd-anti-patterns`, `cmd-features` |
| Reference | `cmd-example` |

## Interactive Components

| Component | Data Source | Purpose |
|-----------|------------|---------|
| `CmdPrinciples` | `CMD_PRINCIPLES` | AccordionList of 6 writing principles with do/don't cards |
| `CmdAntiPatterns` | `CMD_ANTI_PATTERNS` | AccordionList of 5 common mistakes with problem/consequence/fix |
| `CmdCategories` | `CMD_CATEGORIES` | AccordionList of WHY/WHAT/HOW content categories with examples |
| `CmdLayouts` | `CMD_LAYOUTS` | AccordionList of 3 project structure patterns with code blocks |
| `CmdFeatures` | `CMD_FEATURES` | AccordionList of 6 Claude Code features with optional code |
| `CmdHierarchyTable` | `CMD_HIERARCHY_ROWS` | 4-column table of file hierarchy locations |

All components are thin AccordionList wrappers in `src/components/mdx/claude-md/`.

## Checklist

Self-review checklist registered as `cmd-review` in `GuideChecklist.tsx`. Data in `CMD_REVIEW_CHECKLIST` in `claudeMdData.ts`. Covers Content, Length & Clarity, Structure, and Maintenance categories.

## Guide-Specific Conventions

- **Accordion-heavy layout:** Most pages use a single AccordionList component — the intro text goes in `<SectionIntro>`, interactive content in the component.
- **Do/Don't pattern:** Principles page uses green/red cards inside each accordion item (similar to `SkillDosDonts`).
- **Code examples in data:** All code snippets live in the data file as template strings, rendered via `CopyButton` + `<pre>` blocks.
- **Sources:** Content sourced from Anthropic official docs, HumanLayer blog, and community best practices.
