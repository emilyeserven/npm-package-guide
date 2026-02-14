# Web App vs. NPM Package — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning to build and publish npm packages. Assumes familiarity with backend CI/CD, package managers, and compiled languages. Teaches npm/pnpm, bundlers, TypeScript config, `package.json` exports, semver, CI pipelines, and publishing workflows.

## Section Structure

Sections defined in `NPM_GUIDE_SECTIONS` in `src/data/npmPackageData.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `roadmap` |
| Building a Package | `bigpicture`, `monorepo`, `npm-vs-pnpm`, `build`, `tsconfig`, `deps`, `dist`, `packagejson`, `typescript`, `versioning`, `workflow` |
| CI Pipeline & Checks | `ci-overview`, `ci-linting`, `ci-build`, `ci-testing`, `ci-repo-maintenance` |
| Developer Experience | `storybook` |

Additional data files beyond the standard layout: `src/data/roadmapSteps.ts` (roadmap step data), `src/data/checklistItems.ts` (checklist item data).

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `RoadmapSteps` | *(none)* | Interactive roadmap on start page. Data from `roadmapSteps.ts`. |
| `PublishChecklist` | *(none)* | Pre-publish checklist with progress bar. Data from `checklistItems.ts`. |
| `CIOverviewCards` | `children` | Grid container for numbered overview cards |
| `CIFullExample` | `children` | Full workflow YAML with syntax-highlighted `<span>` elements |
| `CIStep` | `heading`, `id?` | Section heading with optional TOC anchor |
| `CIStepText` | `children` | Body text within a `CIStep` |
| `CIYaml` | `children` | Monospace YAML code block |
| `YamlHeading` | `children?` | Label above YAML blocks |
| `CITip` | `children` | Blue callout box |
| `MaintenanceTool` | `name`, `emoji`, `desc`, `why`, `yaml?`, `children?` | Tool card with description and optional YAML |
| `GoodTestsList` | `children` | Styled `<ul>` for test best practices |
| `AiPromptsAccordion` | `prompts: { label, prompt }[]` | Collapsible accordion with copy-to-clipboard AI prompts |

## Guide-Specific Conventions

- **Dual comparison:** Most pages use "Web App" vs. "NPM Package" side-by-side format with `<SectionSubheading>` using globe/package emojis.
- **Package manager switching:** All commands use `<Cmd npm="..." pnpm="..." />`, never hardcoded strings.
- **CI page layout:** CI pages (`ci-*`) use CI layout components (above) instead of `SectionList`/`ColItem`. Structure: `<SectionTitle>` → `<SectionIntro>` → content with `<YamlHeading>` + `<CIYaml>` → `<CITip>`.
- **Footnote usage:** Typically 3–7 footnotes per page. Set `usedFootnotes` frontmatter and use `<FnRef n={N} />`.
