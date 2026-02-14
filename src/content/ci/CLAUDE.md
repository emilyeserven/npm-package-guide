# CI Pipeline & Checks — Content Directory CLAUDE.md

> This directory contains CI-related pages for the **npm-package** guide. Root `/CLAUDE.md` covers project-wide patterns; `src/content/sections/CLAUDE.md` covers the full npm-package guide structure including this section.

## Audience & Purpose

Backend engineers who understand CI/CD concepts (Jenkins, GitLab CI) but need to learn what a JavaScript/TypeScript CI pipeline looks like. Teaches linting, build verification, testing (unit, E2E, component), and repo maintenance tools in the context of npm packages and web apps.

## Pages in This Directory

| Page ID | Title | Content |
|---------|-------|---------|
| `ci-overview` | CI Overview 🔄 | Overview of the 4 CI checks with numbered cards and a full workflow YAML example |
| `ci-linting` | Linting & Formatting 🧹 | ESLint, Prettier, eslint-stylistic comparison, IDE integration |
| `ci-build` | Build Verification 🔨 | TypeScript compilation and bundling as a CI step |
| `ci-testing` | Testing 🧪 | Unit tests, E2E tests, component tests (Storybook), coverage, best practices |
| `ci-repo-maintenance` | Repo Maintenance 🧹 | knip (unused code) and syncpack (dependency version consistency) |

These pages belong to the **CI Pipeline & Checks** section in `NPM_GUIDE_SECTIONS` (defined in `src/data/npmPackageData.ts`).

## Interactive Components

All CI layout components are exported from `src/components/mdx/npm-package/CILayout.tsx`:

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

## Conventions

### CI-specific layout

Pages in this directory use the CI layout components above instead of the standard `SectionList`/`ColItem` pattern used elsewhere in the npm-package guide. Each page follows a consistent structure: `<SectionTitle>` → `<SectionIntro>` → content sections with `<YamlHeading>` + `<CIYaml>` blocks → `<CITip>`.

### Package manager switching

All CLI commands use `<Cmd npm="..." pnpm="..." />` — never hardcoded strings. This integrates with the global npm/pnpm toggle via `usePM()` context.

### Cross-guide links

CI pages link to related pages in other guides using `<NavLink>` and `<NavPill>`:
- Testing Guide pages (e.g., `test-overview`, `test-best-practices`)
- Prompt Engineering pages (e.g., `prompt-mistakes-style`)
- npm-package main section pages (e.g., `build`, `storybook`)

### Footnote usage

CI pages use footnotes for tool documentation references. Set `usedFootnotes` in frontmatter and use `<FnRef n={N} />` markers in the MDX body.

## Adding a New CI Page

1. Create `src/content/ci/<page-id>.mdx` with frontmatter: `id`, `title` (with emoji suffix), `guide: "npm-package"`.
2. Add the page ID to `NPM_GUIDE_SECTIONS` in `src/data/npmPackageData.ts` under the "CI Pipeline & Checks" section.
3. Use CI layout components (`CIStep`, `CIYaml`, `CITip`, etc.) from `CILayout.tsx`.
4. Add any new link registry entries to `src/data/linkRegistry/npmPackageLinks.ts`.
