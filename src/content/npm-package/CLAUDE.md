# Web App vs. NPM Package — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **npm-package**-specific context only.

## Audience & Purpose

Backend engineers learning to build and publish npm packages. Assumes familiarity with backend CI/CD, package managers, and compiled languages. Teaches npm/pnpm, bundlers, TypeScript config, `package.json` exports, semver, CI pipelines, and publishing workflows.

## Section Structure

Sections are defined in `NPM_GUIDE_SECTIONS` in `src/data/npmPackageData.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `roadmap` |
| Building a Package | `bigpicture`, `monorepo`, `npm-vs-pnpm`, `build`, `tsconfig`, `deps`, `dist`, `packagejson`, `typescript`, `versioning`, `workflow` |
| CI Pipeline & Checks | `ci-overview`, `ci-linting`, `ci-build`, `ci-testing`, `ci-repo-maintenance` |
| Developer Experience | `storybook` |

The `checklist` page is part of the cross-guide Checklists group (see `checklistPages` in `guideRegistry.ts`).

## File Locations

| Category | Path |
|----------|------|
| Content pages | `src/content/npm-package/*.mdx` |
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

| Component | Props | Purpose |
|-----------|-------|---------|
| `CIOverviewCards` | `children` | Grid container for numbered overview cards |
| `CIFullExample` | `children` | Full workflow YAML example with emoji header and syntax-highlighted `<span>` elements |
| `CIStep` | `heading: string`, `id?: string` | Section heading with optional TOC anchor |
| `CIStepText` | `children` | Body text block within a `CIStep` |
| `CIYaml` | `children` | Monospace YAML code block (dark background) |
| `YamlHeading` | `children?` (default: "GitHub Actions Example") | Label above YAML blocks |
| `CITip` | `children` | Blue callout box for tips and advice |
| `MaintenanceTool` | `name`, `emoji`, `desc`, `why`, `yaml?`, `children?` | Tool card with description, rationale, and optional YAML |
| `GoodTestsList` | `children` | Styled `<ul>` for test best practices |
| `AiPromptsAccordion` | `prompts: { label, prompt }[]` | Collapsible accordion with copy-to-clipboard AI prompt examples |

## Guide-Specific Conventions

### Dual comparison structure

Most main section pages present content in a **"Web App" vs. "NPM Package"** side-by-side format. Each side is introduced with a `<SectionSubheading>` using globe (web app) and package (npm) emojis. New main section pages should follow this pattern.

### Package manager switching

All command references use `<Cmd npm="..." pnpm="..." />`, never hardcoded command strings. The component reads the global npm/pnpm toggle from `usePM()` context.

### CI page layout

CI pages (`ci-overview`, `ci-linting`, `ci-build`, `ci-testing`, `ci-repo-maintenance`) use the CI-specific layout components listed above instead of the standard `SectionList`/`ColItem` pattern. This provides a structured visual style for CI pipeline content with YAML blocks, tip callouts, and overview cards. Each CI page follows a consistent structure: `<SectionTitle>` → `<SectionIntro>` → content sections with `<YamlHeading>` + `<CIYaml>` blocks → `<CITip>`.

### Cross-guide links

CI pages link to related pages in other guides using `<NavLink>` and `<NavPill>`:
- Testing Guide pages (e.g., `test-overview`, `test-best-practices`)
- Prompt Engineering pages (e.g., `prompt-mistakes-style`)
- Other npm-package pages (e.g., `build`, `storybook`)

### Footnote usage

This guide uses footnotes heavily — typically 3–7 per page. Set the `usedFootnotes` frontmatter array and use `<FnRef n={N} />` markers in the MDX body for each inline citation.

## Adding a New Page

1. Create a new `.mdx` file in `src/content/npm-package/`.
2. Add frontmatter with `id`, `title` (must end with emoji), `guide: "npm-package"`, and optionally `linkRefs`/`usedFootnotes`.
3. Add the page ID to `NPM_GUIDE_SECTIONS` in `src/data/npmPackageData.ts` under the correct section label.
4. For main section pages, follow the dual comparison structure (Web App vs. NPM Package).
5. For CI pages, use the CI layout components from `CILayout.tsx`.
6. Add any new link registry entries to `src/data/linkRegistry/npmPackageLinks.ts`.
