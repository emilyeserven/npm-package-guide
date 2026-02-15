# Prompt Engineering — Guide CLAUDE.md

## Audience & Purpose

Developers (any background) learning practical patterns for working with AI coding assistants. Largest guide with 22+ pages. Covers common AI-generated code mistakes, context management techniques, CLI commands, and advanced tooling (MCP, skills, hooks).

## Section Structure

Defined in `PROMPT_GUIDE_SECTIONS` in `src/data/promptData/navigation.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `prompt-start` |
| Common AI Mistakes | `prompt-mistakes-logic`, `prompt-mistakes-apis`, `prompt-mistakes-structural`, `prompt-mistakes-style`, `prompt-mistakes-react`, `prompt-mistakes-security`, `prompt-mistakes-design`, `prompt-mistakes-tailwind`, `prompt-testing` |
| Context Management | `prompt-ctx-system-prompt`, `prompt-ctx-claude-md`, `prompt-ctx-chaining`, `prompt-ctx-few-shot`, `prompt-ctx-window`, `prompt-ctx-thinking` |
| Tooling & Reference | `prompt-coding-tools`, `prompt-cli-reference`, `prompt-meta-tooling` |
| Advanced Tools | `prompt-tools-mcp`, `prompt-tools-skills`, `prompt-tools-hooks`, `prompt-tools-optimization` |

Data directory: `src/data/promptData/` — `types.ts`, `mistakes.ts`, `techniques.ts`, `cli.ts`, `codingTools.ts`, `navigation.ts`.

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `SeverityBadge` | `categoryId` | Severity level badge (high/medium/low) for a mistake category |
| `MistakeList` | `categoryId` | Mistake items for a category (no badge) |
| `TechniqueDetail` | `techniqueId` | Deep-dive technique explainer with code example |
| `CLIReference` | *(none)* | Searchable, filterable CLI command table |
| `TestingMistakes` | `context?: 'e2e' \| 'unit'` | Testing-specific mistake cards |
| `GuideChecklist` | `checklistId` | Unified checklist component. Use `checklistId="claudemd"` for this guide. |
| `ToolDetail` | `toolId`, `section?` | Tool explainer; sections: overview, bestFor, implementation, examples, tips |
| `MetaTooling` | `toolId` | Meta-tooling pattern details |
| `CodingToolExplorer` | *(none)* | Interactive AI coding tool comparison |

## Guide-Specific Conventions

### Mistake category pages

**Exception to emoji convention:** Mistake pages do NOT have emoji suffixes in `title`. They use severity badges (H/M/L) in sidebar/command menu and `<SeverityBadge>` on-page.

Layout: `<SectionTitle>` → `<SeverityBadge categoryId="..." />` → `<SectionIntro>` → `<Toc>` → `<MistakeList categoryId="..." />`.

When adding a new mistake page, also add severity badge entries to `severityBadges` in both `Sidebar.tsx` and `CommandMenu.tsx`.

### Technique pages

Context management pages use `<TechniqueDetail techniqueId="..." />`. Each technique has a `details` array and optional `codeExample`.

### CLI reference

`<CLIReference />` renders a table with search, category filtering, and type filtering (all/AI-only/human-only). Commands can be tagged `human: true`.

### Tool detail sections

`<ToolDetail toolId="..." section="overview" />` supports section-conditional rendering. Omit `section` to render all.
