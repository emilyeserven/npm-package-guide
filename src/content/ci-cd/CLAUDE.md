# CI/CD & GitHub Actions — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **ci-cd**-specific context only.

## Audience & Purpose

Developers who understand building apps but have not set up CI/CD before. Teaches pipelines, GitHub Actions, YAML workflows, and common deployment patterns from scratch.

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `cicd-start` |
| Core Concepts | `cicd-big-picture`, `cicd-pipeline`, `cicd-github-actions` |
| Hands-On | `cicd-yaml`, `cicd-patterns` |
| Reference | `cicd-gotchas` |

Defined in `CICD_GUIDE_SECTIONS` in `src/data/cicdData.ts`.

## File Locations

| Category | Path |
|----------|------|
| Content pages | `src/content/ci-cd/*.mdx` |
| All guide data | `src/data/cicdData.ts` (single file) |
| Interactive components | `src/components/mdx/ci-cd/` |
| Link registry | `src/data/linkRegistry/cicdLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/cicdTerms.ts` |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `PipelineStages` | *(none)* | `PIPELINE_STAGES` | Visualizes the 5 pipeline stages (Trigger, Build, Test, Lint & Quality, Deploy) |
| `YamlExplorer` | *(none)* | `YAML_LINES` | Interactive line-by-line YAML annotation; click any line to see its explanation |
| `PatternCards` | *(none)* | `CICD_PATTERNS` + `PATTERN_TAG_STYLES` | CI/CD pattern cards with color-coded tags |
| `GotchaAccordion` | *(none)* | `CICD_TIPS` | Expandable gotchas and tips |

## Guide-Specific Conventions

### Single data file

All data lives in `cicdData.ts` — types, pipeline stages, GHA concepts, YAML lines, patterns, tag styles, tips, and navigation. The guide is compact enough that a single file works well.

### YAML annotation system

`YAML_LINES` is an array of `{ line: string, note: string | null }` objects. Each line represents a line from a real GitHub Actions workflow file. Lines with a non-null `note` are interactive — clicking them reveals the annotation. The `YamlExplorer` component renders this.

### Pattern categorization

`CICD_PATTERNS` assigns each pattern a `tag` string (e.g., "Essential", "Testing", "Performance"). `PATTERN_TAG_STYLES` maps each tag to `{ bg, text, border, darkBg, darkText, darkBorder }` for consistent badge rendering in light/dark modes.

### GHA terminology

`GHA_CONCEPTS` defines term/definition pairs for GitHub Actions building blocks (Workflow, Event, Job, Step, Action, Runner). These are used on the `cicd-github-actions` page.

### Dark mode

Pipeline stages use `color`/`darkColor` fields. Pattern tags use the `PatternTagStyle` interface with separate light/dark properties.

## Adding a New Page

1. Create `src/content/ci-cd/<page-id>.mdx` with frontmatter (`id`, `title` with emoji, `guide: "ci-cd"`).
2. Add the page ID to `CICD_GUIDE_SECTIONS` in `src/data/cicdData.ts` under the correct section label.
3. If adding new data-driven content, add the data interface and constants to `cicdData.ts`.
