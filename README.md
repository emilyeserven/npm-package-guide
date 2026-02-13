# npm-package-guide

Educational single-page application with multiple guides for backend engineers learning frontend development. Deployed as a static site to GitHub Pages.

## Guides

| Guide | Description |
|-------|-------------|
| Web App vs. NPM Package | Building, testing, and publishing npm packages |
| Architecture Guide | Web app tech stacks, layers, and full-stack frameworks |
| Testing Guide | Testing pyramid, unit/component/E2E tests, and tooling |
| Prompt Engineering | AI coding assistant patterns, mistakes, and context management |

## Tech Stack

React 19, TypeScript, Vite 7, Tailwind CSS v4, TanStack Router, pnpm. See [CLAUDE.md](./CLAUDE.md) for the full technical reference.

## Quick Start

```bash
pnpm install
pnpm dev        # Start dev server
pnpm lint       # Run ESLint
pnpm build      # TypeScript check + Vite build
```

## Adding a New Guide from a Claude Artifact

Every guide in this project started as a single monolithic Claude artifact (a self-contained JSX/HTML component). The workflow below uses Claude Code on claude.ai to decompose that artifact into the multi-page MDX architecture.

### Prerequisites

- A Claude artifact file (`.tsx` or `.html`) containing the guide content
- A Claude Code session on [claude.ai](https://claude.ai) with access to this repository
- Familiarity with the project conventions in [CLAUDE.md](./CLAUDE.md)

### Workflow

1. **Open the project in Claude Code on claude.ai** and ensure dependencies are installed (`pnpm install`).

2. **Provide the artifact and your intent.** Paste or attach the artifact file and tell Claude Code what guide you want to create. Example prompt:

   > Here is a Claude artifact for a "Git Workflow Guide" [paste or attach file]. Convert this into a new guide following the conventions in CLAUDE.md. The guide ID should be "git-workflow" and the start page ID should be "git-start".

3. **Claude Code will follow the conversion steps** from CLAUDE.md automatically:
   - Identify content boundaries and plan page splits
   - Create the data file (`src/data/<guide>Data.ts`) with types, data, and `*_GUIDE_SECTIONS`
   - Register the guide in `src/data/guideRegistry.ts`
   - Create MDX content pages in `src/content/<guide>/`
   - Create the Start page component
   - Add `staticTitles` entry and router entry
   - Extract interactive components if needed
   - Add glossary terms and link registry entries

4. **Review the generated files.** Check that:
   - MDX page titles have emoji suffixes
   - Interactive components support dark mode (`useTheme()` + `ds()`)
   - Data lives in `src/data/`, not inline in components
   - `linkId` references in glossary terms exist in the link registry

5. **Verify the build:**
   ```bash
   pnpm lint && pnpm build
   ```

6. **Test locally** with `pnpm dev` — check the sidebar, command menu, home page tile, page navigation (prev/next), and dark mode.

### Tips for better results

- **Give Claude Code the full artifact** rather than describing what you want. The artifact contains the exact content, data structures, and interactive patterns to convert.
- **Specify the guide ID and start page ID** up front so naming is consistent from the first file created.
- **Ask for glossary terms explicitly** if the artifact introduces many new concepts — Claude Code may not add them unless prompted.
- **Review interactive components carefully** — dark mode support and data extraction are the most common areas needing manual fixes.
- **Run `pnpm lint --fix`** before manual review to auto-fix formatting issues.

## Project Documentation

See [CLAUDE.md](./CLAUDE.md) for the complete technical reference including:
- Project structure and key patterns
- Link registry and footnote system
- Glossary system conventions
- Interactive MDX component template
- Dark mode guidelines
- Pre-push checklist
