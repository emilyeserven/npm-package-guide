# Prompt Engineering — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **prompt-engineering**-specific context only.

## Audience & Purpose

Developers (any background) learning practical patterns for working with AI coding assistants. This is the largest guide with 22+ pages. Covers common AI-generated code mistakes, context management techniques, CLI commands, and advanced tooling (MCP, skills, hooks).

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `prompt-start` |
| Common AI Mistakes | `prompt-mistakes-logic`, `prompt-mistakes-apis`, `prompt-mistakes-structural`, `prompt-mistakes-style`, `prompt-mistakes-react`, `prompt-mistakes-security`, `prompt-mistakes-design`, `prompt-mistakes-tailwind`, `prompt-testing` |
| Context Management | `prompt-ctx-system-prompt`, `prompt-ctx-claude-md`, `prompt-ctx-chaining`, `prompt-ctx-few-shot`, `prompt-ctx-window`, `prompt-ctx-thinking` |
| Tooling & Reference | `prompt-coding-tools`, `prompt-cli-reference`, `prompt-meta-tooling` |
| Advanced Tools | `prompt-tools-mcp`, `prompt-tools-skills`, `prompt-tools-hooks`, `prompt-tools-optimization` |

The `prompt-claudemd-checklist` page is part of the cross-guide Checklists group (see `checklistPages` in `guideRegistry.ts`).

Defined in `PROMPT_GUIDE_SECTIONS` in `src/data/promptData/navigation.ts`.

## File Locations

| Category | Path |
|----------|------|
| Content pages | `src/content/prompt-engineering/*.mdx` |
| Data directory | `src/data/promptData/` (barrel-exported) |
| Type definitions | `src/data/promptData/types.ts` |
| Mistake data | `src/data/promptData/mistakes.ts` |
| Technique data | `src/data/promptData/techniques.ts` |
| CLI command data | `src/data/promptData/cli.ts` |
| Coding tools data | `src/data/promptData/codingTools.ts` |
| Navigation & start page | `src/data/promptData/navigation.ts` |
| Interactive components | `src/components/mdx/prompt-engineering/` |
| Link registry | `src/data/linkRegistry/promptLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/promptTerms.ts` |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `MistakeList` | `categoryId: string` | `MISTAKE_CATEGORIES` in `mistakes.ts` | Renders mistakes for a category with severity badge |
| `TechniqueDetail` | `techniqueId: string` | `CONTEXT_TECHNIQUES` in `techniques.ts` | Deep-dive technique explainer with code example |
| `CLIReference` | *(none)* | `CLI_GROUPS` in `cli.ts` | Searchable, filterable CLI command table |
| `TestingMistakes` | `context?: 'e2e' \| 'unit'` | `TESTING_MISTAKES` in `mistakes.ts` | Testing-specific mistake cards, optionally filtered |
| `ClaudeMdChecklist` | *(none)* | `CLAUDEMD_CHECKLIST` in `navigation.ts` | Interactive CLAUDE.md configuration checklist |
| `ToolDetail` | `toolId: string`, `section?: string` | `TOOL_TECHNIQUES` in `techniques.ts` | Tool explainer with conditional sections (overview, bestFor, implementation, examples, tips) |
| `MetaTooling` | `toolId: string` | `META_TOOLS` in `techniques.ts` | Meta-tooling pattern details |
| `CodingToolExplorer` | *(none)* | `AI_CODING_TOOLS` in `codingTools.ts` | Interactive AI coding tool comparison |

## Guide-Specific Conventions

### Mistake category pages

Pages in "Common AI Mistakes" use `<MistakeList categoryId="..." />`. Each `MistakeCategory` in `mistakes.ts` has a `severity` level (`high`, `medium`, `low`) that controls badge color. The `SEVERITY_COLORS` object defines light/dark theme colors for each level.

### Technique detail pages

Context management pages use `<TechniqueDetail techniqueId="..." />`. Each technique has a `details` array and optional `codeExample` with monospace rendering.

### CLI reference

`<CLIReference />` renders a complex table with search, category filtering, and type filtering (all/AI-only/human-only). Commands in `CLI_GROUPS` can be tagged as `human: true` to distinguish human-typed from AI-triggered commands.

### Tool detail sections

`<ToolDetail toolId="..." section="overview" />` supports section-conditional rendering. Valid sections: `overview`, `bestFor`, `implementation`, `examples`, `tips`. When `section` is omitted, all sections render.

### Adding a new mistake category

1. Add a `MistakeCategory` to `MISTAKE_CATEGORIES` in `src/data/promptData/mistakes.ts`.
2. Create `src/content/prompt-engineering/prompt-mistakes-<slug>.mdx` using `<MistakeList categoryId="..." />`.
3. Add the page ID to `PROMPT_GUIDE_SECTIONS` under "Common AI Mistakes" in `navigation.ts`.

### Adding a new technique

1. Add a `ContextTechnique` to `CONTEXT_TECHNIQUES` in `src/data/promptData/techniques.ts`.
2. Create the MDX page using `<TechniqueDetail techniqueId="..." />`.
3. Add the page ID to the appropriate section in `PROMPT_GUIDE_SECTIONS`.
