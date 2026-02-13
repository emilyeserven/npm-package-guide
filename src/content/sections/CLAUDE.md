# Web App vs. NPM Package — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **npm-package**-specific context only.

## Audience & Purpose

Backend engineers learning to build and publish npm packages. Assumes familiarity with backend CI/CD, package managers, and compiled languages. Teaches npm/pnpm, bundlers, TypeScript config, `package.json` exports, semver, CI pipelines, and publishing workflows.

## Section Structure

| Section Label | Page IDs | Content Directory |
|--------------|----------|-------------------|
| *(start)* | `roadmap` | `src/content/sections/` |
| Building a Package | `bigpicture`, `monorepo`, `npm-vs-pnpm`, `build`, `tsconfig`, `deps`, `dist`, `packagejson`, `typescript`, `versioning`, `workflow` | `src/content/sections/` |
| CI Pipeline & Checks | `ci-overview`, `ci-linting`, `ci-build`, `ci-testing`, `ci-repo-maintenance` | `src/content/ci/` |
| Developer Experience | `storybook` | `src/content/bonus/` |

The `checklist` page is part of the cross-guide Checklists group (see `checklistPages` in `guideRegistry.ts`).

## File Locations

| Category | Path |
|----------|------|
| Main content pages | `src/content/sections/*.mdx` |
| CI content pages | `src/content/ci/*.mdx` |
| Bonus content pages | `src/content/bonus/*.mdx` |
| Guide data | `src/data/npmPackageData.ts` |
| Roadmap step data | `src/data/roadmapSteps.ts` |
| Checklist item data | `src/data/checklistItems.ts` |
| Interactive components | `src/components/mdx/npm-package/` |
| Link registry | `src/data/linkRegistry/npmPackageLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/npmPackageTerms.ts` |

## Interactive Components

### Standard section components (all main pages)

- **`RoadmapSteps`** — Renders the interactive roadmap visualization on the start page. Data from `src/data/roadmapSteps.ts`. No props needed.
- **`PublishChecklist`** — Pre-publish checklist with progress bar and "Copy as Markdown" button. Data from `src/data/checklistItems.ts`. No props needed.

### CI page layout components (CI pages only)

All exported from `src/components/mdx/npm-package/CILayout.tsx`:

| Component | Purpose |
|-----------|---------|
| `CIStep` | Section heading with optional `id` for TOC |
| `CIStepText` | Body text blocks |
| `CIYaml` | YAML code block (monospace dark background) |
| `YamlHeading` | Label for YAML sections |
| `CITip` | Blue callout box for tips |
| `CIOverviewCards` | Grid container for numbered overview cards |
| `CIOverviewCard` | Individual card with number, title, optional YAML |
| `CIFullExample` | Full workflow example with emoji header and pre-wrapped code |
| `AiPromptsAccordion` | Collapsible accordion with AI prompts; each prompt has a copy button |
| `MaintenanceTool` | Tool section with name, emoji, description, optional YAML |
| `GoodTestsList` | Styled list for test examples |

## Guide-Specific Conventions

### Dual comparison structure

Most main section pages present content in a **"Web App" vs. "NPM Package"** side-by-side format. Each side is introduced with a `<SectionSubheading>` using globe (web app) and package (npm) emojis. New main section pages should follow this pattern.

### Package manager switching

All command references use `<Cmd npm="..." pnpm="..." />`, never hardcoded command strings. The component reads the global npm/pnpm toggle from `usePM()` context.

### CI page layout

Pages in `src/content/ci/` use the CI-specific layout components listed above instead of the standard `SectionList`/`ColItem` pattern. This provides a structured visual style for CI pipeline content with YAML blocks, tip callouts, and overview cards.

### Footnote usage

This guide uses footnotes heavily — typically 3–7 per page. Set the `usedFootnotes` frontmatter array and use `<FnRef n={N} />` markers in the MDX body for each inline citation.

## Adding a New Page

1. Create a new `.mdx` file in the appropriate content directory (`sections/`, `ci/`, or `bonus/`).
2. Add frontmatter with `id`, `title` (must end with emoji), `guide: "npm-package"`, and optionally `linkRefs`/`usedFootnotes`.
3. Add the page ID to `NPM_GUIDE_SECTIONS` in `src/data/npmPackageData.ts` under the correct section label.
4. For main section pages, follow the dual comparison structure (Web App vs. NPM Package).
5. For CI pages, use the CI layout components from `CILayout.tsx`.
