# WordPress API & Agents Guide

## Audience & Purpose

For backend and full-stack engineers who use WordPress as a headless CMS and want to generate type-safe TypeScript interfaces, mock factories, and test fixtures from their WordPress REST API schema using Claude Code Web.

## Section Structure

This is a **single-page guide** — all content lives in one MDX file.

| Page ID | Section |
|---------|---------|
| `wp-agents-guide` | Full tutorial (Steps 1–10, security, troubleshooting) |

## Interactive Components

No guide-specific custom components. Uses only shared MDX components:

- `SectionTitle`, `SectionSubheading`, `Toc`, `TocLink`, `SectionIntro`
- `SectionList`, `ColItem`, `SectionNote`, `Gotcha`
- `CodeAccordion` — wraps the two MJS scripts (schema discovery + sample data fetcher) in expandable panels
- `FnRef` — footnote references to link registry entries
- Standard markdown code fences for bash commands, TypeScript, and code examples

## Guide-Specific Conventions

- **Tutorial structure:** Numbered steps (1–10) with sub-steps (1a, 1b, 1c)
- **Scripts as-is:** The two MJS scripts inside `CodeAccordion` components must remain verbatim — do not edit or refactor them
- **Code examples are illustrative:** The TypeScript interfaces and mock factory examples in Steps 6–7 show what Claude Code Web *would* generate; they are not files in this project
- **Prompt blocks:** Claude Code Web prompts shown in fenced code blocks (no language tag or `text`)
