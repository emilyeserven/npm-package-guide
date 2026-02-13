# Plan: Refactor for Improved Agent Experience

## Problem

When an AI agent works with this codebase, several friction points emerge:

1. **Scattered registration** — Adding a new guide or page requires updating 4-6 files with no validation that they're in sync. An agent must know to update `router.tsx`, `guideRegistry.ts` (sections + pageHeadings), `navigation.ts` (staticTitles), and the appropriate data file.

2. **Inconsistent guide data patterns** — The NPM Package guide's sections are inlined in `guideRegistry.ts` while every other guide has a dedicated data file with its own `*_GUIDE_SECTIONS` export. An agent following the pattern of one guide will be wrong for another.

3. **Hardcoded router dispatch** — `SectionRouter` in `router.tsx` uses a chain of `if` statements to map page IDs to components. Adding a new start page requires manual edits to this file, which is not obvious from the guide registration process.

4. **Redundant title registration** — `staticTitles` in `navigation.ts` duplicates information already in the guide registry (start page titles are always "Start Here" + guide icon). This creates an extra sync point.

5. **Validation gaps** — The `validate-data.ts` script checks link and glossary integrity but misses several common agent mistakes: missing emoji suffixes on titles, `startPageId` pointing to nonexistent pages, `pageHeadings` referencing unknown page IDs, and guide section IDs not matching actual content pages.

6. **CLAUDE.md documentation gaps** — The build validation pipeline (`pnpm validate:data`) isn't documented, the complete MDX frontmatter field reference is missing, `ds()` helper is mentioned but not explained, and there's no error troubleshooting section.

## Changes

### 1. Extract NPM Package guide data to its own file

**What:** Move `NPM_GUIDE_SECTIONS` from `guideRegistry.ts` to a new `src/data/npmPackageData.ts`, following the same pattern as `archData/`, `testingData.ts`, and `promptData/`.

**Why:** Makes the pattern consistent — every guide has a dedicated data file. An agent following the Architecture or Testing guide pattern will now produce correct code for the NPM guide too.

**Files:**
- Create `src/data/npmPackageData.ts` (new)
- Edit `src/data/guideRegistry.ts` (import from new file)

### 2. Data-driven SectionRouter

**What:** Replace the hardcoded `if`-chain in `router.tsx` with a registry-based approach. Create a `componentPages` map that associates page IDs with their component, so `SectionRouter` becomes a simple map lookup.

**Why:** Adding a new start page or special page currently requires an agent to know it must edit `router.tsx`. With a data-driven approach, new pages register themselves and the router resolves automatically.

**Files:**
- Create `src/data/componentPages.ts` — maps page IDs to lazy-imported components
- Edit `src/router.tsx` — replace `if`-chain with map lookup

### 3. Derive start page titles from guide registry

**What:** Reduce `staticTitles` in `navigation.ts` to only truly special pages (`external-resources`, `glossary`, `checklist`). Start page titles ("Start Here" + guide icon) will be derived from the guide registry automatically.

**Why:** Eliminates a manual sync point. When a new guide is added, its start page title appears automatically without editing `navigation.ts`.

**Files:**
- Edit `src/data/navigation.ts` — derive start page titles from `guides` array

### 4. Enhance validation script

**What:** Add the following checks to `scripts/validate-data.ts`:

- **Emoji suffix validation** — Every page title (MDX + static) must end with an emoji. Catches the #1 formatting mistake.
- **startPageId validation** — Every guide's `startPageId` must either be in the component pages map or in content pages.
- **pageHeadings validation** — Every key in the `pageHeadings` record must reference a page that exists in the guide sections.
- **Section page ID validation** — Every page ID listed in guide sections must exist as either an MDX content page or a registered component page.

**Why:** Build-time validation catches mistakes that currently fail silently (broken CMD-K search, missing navigation items, broken page rendering).

**Files:**
- Edit `scripts/validate-data.ts`

### 5. Update CLAUDE.md

**What:** Fill documented gaps that directly impact agent effectiveness:

- **Build & Validation section** — Document `pnpm validate:data` and the full validation pipeline order.
- **Complete MDX frontmatter reference** — Document all accepted fields (`id`, `title`, `guide`, `group`, `linkRefs`, `usedFootnotes`) with types and validation rules.
- **Router documentation** — Explain how to add new component-rendered pages via the `componentPages` map (post-refactor).
- **`ds()` helper documentation** — Function signature, when to use it vs. Tailwind `dark:` variants.
- **Error troubleshooting** — Common errors and how to resolve them (duplicate page IDs, broken linkId references, missing emoji suffix, unknown guide ID).

**Files:**
- Edit `CLAUDE.md`

## Out of Scope

- **Auto-extracting pageHeadings from MDX** — This would require MDX AST parsing at build time, which is a significant complexity addition. The manual record + validation (change 4) is a better tradeoff.
- **Auto-discovering MDX components** — Components need explicit TypeScript imports for type safety; a glob pattern would lose that.
- **Glossary category enums** — While an enum would be more type-safe, the current string approach works and the validation script already catches broken references.

## Verification

After all changes: `pnpm install && pnpm lint && pnpm build` must pass with no regressions.
