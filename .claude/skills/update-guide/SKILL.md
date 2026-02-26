---
description: Add content, data, pages, components, glossary terms, link entries, or checklists to an existing guide — or restructure its sections.
---

# Updating an Existing Guide

Use this skill for any modification to an already-scaffolded guide: expanding data for existing components, adding new pages or sections, adding supporting data (links, glossary, checklist), restructuring, or any combination of these. For creating a brand-new guide from scratch, use `/add-guide` instead.

> **Reference files** (read on-demand):
> - `REFERENCE.md` (in this skill directory) — section templates, start page step templates, checklist registration patterns, MDX page template
> - `docs/COMPONENT_REFERENCE.md` — shared components, pattern matching, duplication anti-patterns
> - `docs/CONTENT_REFERENCE.md` — MDX frontmatter, link registry, glossary, footnotes
> - `docs/DEVELOPMENT_REFERENCE.md` — dark mode, routing, validation, error troubleshooting

## Workflow

Steps 1–7 are scenario-based — **skip any that don't apply**. Step 0 and Step 8 always apply.

### Step 0 — Identify the guide and read current state

Read the guide's data file (`src/data/<camel>Data.ts`) and content CLAUDE.md (`src/content/<guide-id>/CLAUDE.md`). Note the naming conventions (prefix, camel name), current `*_GUIDE_SECTIONS`, `*_START_PAGE_DATA`, and existing component inventory. Every subsequent step depends on this context.

### Step 1 — Add or expand guide data

Add new entries to data objects in `src/data/<camel>Data.ts` that feed existing interactive components (e.g., new items for explorers, new rows for tables, new pattern entries). **Follow the existing data shape** — the guide's CLAUDE.md documents data conventions and types. See `REFERENCE.md` § "Expanding guide data" for guidance.

### Step 2 — Add new pages

1. Create `src/content/<guide-id>/<page-id>.mdx` with frontmatter (`id`, `title` with emoji suffix, `guide`). See `REFERENCE.md` § "MDX page template".
2. Add the page ID to the appropriate section in `*_GUIDE_SECTIONS`. See `REFERENCE.md` § "Adding a section" if a new section group is needed.
3. For multi-page guides, sync `*_START_PAGE_DATA`: add `subItemDescriptions` entry for pages in existing sections, or add a new step for new sections. See `REFERENCE.md` § "Adding a start page step".

### Step 3 — Add new components

**Before creating a component**, use the `/find-component` skill to check for shared bases. Place guide-specific components in `src/components/mdx/<guide-id>/` and export from the directory's `index.ts` barrel file. See `/add-guide` `REFERENCE.md` § "Component template" for the boilerplate with dark mode patterns.

### Step 4 — Add link registry entries

Add entries to `src/data/linkRegistry/<camel>Links.ts`. ID convention: `{source}-{topic-slug}`. Include `tags: ['guide:<guide-id>']` and `resourceCategory` for External Resources visibility. See `docs/CONTENT_REFERENCE.md` for full field reference.

### Step 5 — Add glossary terms

Add entries to `src/data/glossaryTerms/<camel>Terms.ts`. Each term needs `linkId` (must exist in link registry), optional `sectionId`/`guides`. See `docs/CONTENT_REFERENCE.md` for full field reference.

### Step 6 — Add a checklist

Four files to wire. See `REFERENCE.md` § "Checklist registration" for all patterns and examples.

1. **Data:** Export checklist data from `src/data/<camel>Data.ts` (shape: `ChecklistBaseSection[]` or a transformable array).
2. **Registry:** Import and register in `CHECKLIST_REGISTRY` in `src/components/mdx/GuideChecklist.tsx`.
3. **Navigation:** Add entry to `checklistPages` in `src/data/guideRegistry.ts` (`{ id: '<checklist-page-id>', sourceGuideId: '<guide-id>' }`).
4. **MDX:** Create `src/content/checklist/<checklist-page-id>.mdx`. See `src/content/checklist/CLAUDE.md` for template and rules. Do **not** add `guide:` frontmatter.

### Step 7 — Reorder or restructure sections

Edit the `*_GUIDE_SECTIONS` array — this is the single source of truth for sidebar, command menu, and prev/next navigation. Then sync `*_START_PAGE_DATA`:
- Reorder `steps` to match the new section order.
- Ensure every `sectionLabel` exactly matches a `label` in `*_GUIDE_SECTIONS`.
- Ensure every `subItemDescriptions` key matches a page ID in its section.

### Step 8 — Finalize

1. **Update `dateModified`** in the guide's `*_GUIDE_MANIFEST` to today's date (ISO `YYYY-MM-DD`).
2. **Update `src/content/<guide-id>/CLAUDE.md`** if you added components (add to component table), changed data conventions (update convention bullets), or added/removed sections.
3. **Verify:**

```bash
pnpm validate
```

Catches broken link/glossary references, missing emoji suffixes, orphaned pages, and TypeScript errors.

## What updates automatically

- **Sidebar, Command menu, Home page**: derived from `*_GUIDE_SECTIONS` — new pages appear automatically.
- **Prev/next navigation**: derived from section order.
- **Content registry**: auto-discovers MDX files in `src/content/`.
- **Component registry**: auto-discovers exports from guide barrel files in `src/components/mdx/<guide-id>/index.ts`.
- **Link/glossary registries**: auto-discover from `src/data/linkRegistry/` and `src/data/glossaryTerms/`.
- **Router**: resolves MDX via auto-discovery — no `router.tsx` edits.

## What requires manual wiring

- **`*_START_PAGE_DATA`**: Must be synced whenever pages or sections change (Step 2, Step 7).
- **`CHECKLIST_REGISTRY`** in `GuideChecklist.tsx`: Must be updated to register new checklist data (Step 6).
- **`checklistPages`** in `guideRegistry.ts`: Must be updated for checklist navigation mapping (Step 6).
- **Guide CLAUDE.md**: Must be updated when components or conventions change (Step 8).

## Common pitfalls

- **Forgotten `dateModified`** — always update when making significant content changes.
- **`sectionLabel` mismatch** — `sectionLabel` in start page steps must exactly match a `label` in `*_GUIDE_SECTIONS`. Case-sensitive.
- **Missing `subItemDescriptions` key** — every page ID in a section should have an entry when using `subItemDescriptions`.
- **Checklist ID collision** — `CHECKLIST_REGISTRY` keys and `checklistPages` IDs are different ID spaces. The registry key is used in `<GuideChecklist checklistId="..." />`, the page ID is the MDX `id` frontmatter.
- **Missing barrel export** — new components must be exported from `src/components/mdx/<guide-id>/index.ts` to be available in MDX.
- **`className`, not `class`** — MDX is JSX. Self-closing tags: `<br />` not `<br>`.
- **Every MDX `title` must end with an emoji suffix.**
- **Stale guide CLAUDE.md** — keep the component table and convention bullets current.
