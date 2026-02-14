# CI/CD & GitHub Actions — Guide CLAUDE.md

## Audience & Purpose

Developers who understand building apps but have not set up CI/CD before. Teaches pipelines, GitHub Actions, YAML workflows, and deployment patterns from scratch.

## Section Structure

Defined in `CICD_GUIDE_SECTIONS` in `src/data/cicdData.ts`. All data in this single file.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `cicd-start` |
| Core Concepts | `cicd-big-picture`, `cicd-pipeline`, `cicd-github-actions` |
| Hands-On | `cicd-yaml`, `cicd-patterns` |
| Reference | `cicd-gotchas` |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `PipelineStages` | *(none)* | Visualizes the 5 pipeline stages |
| `YamlExplorer` | *(none)* | Interactive line-by-line YAML annotation |
| `PatternCards` | *(none)* | CI/CD pattern cards with color-coded tags |
| `GotchaAccordion` | *(none)* | Expandable gotchas and tips |

## Guide-Specific Conventions

- **YAML annotation:** `YAML_LINES` array of `{ line, note }` objects. Lines with non-null `note` are interactive in `YamlExplorer`.
- **Pattern categorization:** `CICD_PATTERNS` assigns tags; `PATTERN_TAG_STYLES` maps to `{ bg, text, border, darkBg, darkText, darkBorder }`.
- **GHA terminology:** `GHA_CONCEPTS` defines term/definition pairs for GitHub Actions building blocks (Workflow, Event, Job, Step, Action, Runner).
