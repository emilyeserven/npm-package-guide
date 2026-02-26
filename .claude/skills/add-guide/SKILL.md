---
description: Convert a Claude artifact into a multi-page MDX guide with data files, interactive components, glossary terms, and link registry entries.
---

# Adding a New Guide

Decompose a monolithic Claude artifact into the multi-page MDX architecture. The scaffold script automates all boilerplate file creation and registry wiring; this skill focuses on the content steps that require judgment.

> **Reference files** (read on-demand):
> - `REFERENCE.md` (in this skill directory) — scaffold command flags, MDX page template, component template, data file structure
> - `docs/COMPONENT_REFERENCE.md` — shared components, pattern matching, duplication anti-patterns
> - `docs/CONTENT_REFERENCE.md` — MDX frontmatter, link registry, glossary, footnotes
> - `docs/DEVELOPMENT_REFERENCE.md` — dark mode, routing, validation, error troubleshooting

## Workflow

### Step 1 — Identify content boundaries

Find natural page breaks in the artifact. Each distinct topic or section heading becomes its own MDX page (or a single page for `--single-page` guides).

### Step 2 — Run scaffold script

Run `pnpm scaffold-guide` with the appropriate flags. See `REFERENCE.md` § "Scaffold command" for all flags, naming conventions, and the list of files created/updated.

### Step 3 — Fill in guide data

Edit `src/data/<camel>Data.ts`. If you used `--pages`, sections are already populated — fill in `*_START_PAGE_DATA` only. See `REFERENCE.md` § "Data file structure" for field requirements and the directory threshold rule.

### Step 4 — Create or fill in MDX content pages

If `--pages` was used, MDX stubs already exist with frontmatter pre-filled — fill in their content. Otherwise, create one `.mdx` file per page in `src/content/<guide-id>/`. Pages are auto-discovered — no manual import needed. See `REFERENCE.md` § "MDX page template" for the full template and notes.

### Step 5 — Extract interactive components

Place in `src/components/mdx/<guide-id>/`. Register in `src/components/mdx/index.ts`.

**Before creating a component**, use the `/find-component` skill to check for shared bases. See `REFERENCE.md` § "Component template" for the full boilerplate with dark mode patterns.

### Step 6 — Add links and glossary terms

Stub files exist from Step 2. Fill in entries. See `docs/CONTENT_REFERENCE.md` for full field references:

- **Links** (`src/data/linkRegistry/<camel>Links.ts`): ID convention `{source}-{topic-slug}`. Include `tags: ['guide:<guide-id>']` and `resourceCategory` for External Resources visibility.
- **Glossary** (`src/data/glossaryTerms/<camel>Terms.ts`): Each term needs `linkId` (must exist in link registry), optional `sectionId`/`guides`.

### Step 7 — Verify

```bash
pnpm validate
```

Catches broken link/glossary references, missing emoji suffixes, orphaned pages, and TypeScript errors.

## What updates automatically

- **Sidebar, Command menu, Home page**: read from `guides` array — new guide appears automatically.
- **Prev/next navigation**: derived from guide sections.
- **Content registry**: auto-discovers MDX files in `src/content/`.
- **Start page sub-items**: derived from sections via `sectionLabel`.
- **Start page Resources tiles**: External Resources, Glossary, and Checklist tiles auto-populate.
- **Router**: resolves MDX via auto-discovery — no `router.tsx` edits.
- **Guide dates**: `dateCreated` and `dateModified` are auto-set to today's date in the scaffold. Update `dateModified` when making significant content changes to an existing guide.

## Common pitfalls

- `className`, not `class` — MDX is JSX. Self-closing tags: `<br />` not `<br>`.
- Tailwind utility classes over inline styles. Prefer built-in scale (`text-sm`) over arbitrary values (`text-[13px]`).
- Data in `src/data/`, not inline in MDX or components.
- Start pages: `<GuideStartContent guideId="..." />` only — never build manually.
- Guide-specific components go in `src/components/mdx/<guide-id>/`, not at the top level. Always register in `index.ts`.
- Every MDX `title` must end with an emoji suffix.
- Interactive components must support dark mode via `useIsDark()` + `ds()`/`tc()`.

## Post-creation

1. Fill in `src/content/<guide-id>/CLAUDE.md` (audience, section table, component table, conventions). The scaffold creates a stub; see existing guides for examples.
2. Run `pnpm validate` — fix any errors before committing.
