---
description: Find the right shared component for a guide UI need. Prevents duplication by matching requirements to existing bases, hooks, and thin-wrapper patterns.
---

# Finding the Right Component

Use this skill when adding interactive UI to a guide page. It prevents duplication by checking shared components first, then existing guide-specific implementations, before creating anything new.

> **Reference:** Read `docs/COMPONENT_REFERENCE.md` for the full pattern-matching quick reference table, shared component API details, existing guide implementations, and known duplication anti-patterns.

## Step 1 — Identify the UI pattern

Read `docs/COMPONENT_REFERENCE.md` § "Pattern Matching Quick Reference" to classify your need. If it maps to a shared component, **use it directly in MDX or create a thin data-lookup wrapper** — do not reimplement.

## Step 2 — Search existing guide components

Before creating a new component, check if another guide already solves the same problem:

```bash
# Find components by pattern name
ls src/components/mdx/*/

# Search for a UI pattern across guides
grep -r "useExplorer\|AccordionList\|TimelineFlow\|ProsCons\|CardBase\|StatusBadge\|YamlExplorerBase" src/components/mdx/
```

See `docs/COMPONENT_REFERENCE.md` § "Existing guide patterns worth knowing about" for a table of common patterns and which guides implement them.

## Step 3 — Decide: use shared, wrap, or create

1. **Shared component handles it directly?** → Use it in MDX. Done.
2. **Shared component handles it but you need guide-specific data?** → Create a thin wrapper in `src/components/mdx/<guide-id>/` that imports data and delegates to the shared base. The wrapper should contain zero rendering logic.
3. **Two+ guides need the same new pattern?** → Create a new shared base in `src/components/mdx/`, then create thin wrappers per guide.
4. **Genuinely unique UI for one guide?** → Create in `src/components/mdx/<guide-id>/`. Use shared hooks (`useIsDark`, `useExplorer`, `useAccordion`) and helpers (`ds()`, `tc()`) for consistency.

### Thin wrapper template

```tsx
// src/components/mdx/<guide-id>/MyWrapper.tsx
import { MY_DATA } from '../../../data/myGuideData'
import { SharedBase } from '../SharedBase'

export function MyWrapper({ itemId }: { itemId: string }) {
  const item = MY_DATA.find(d => d.id === itemId)
  if (!item) return null
  return <SharedBase {...item} />
}
```

**Key rule:** If your wrapper exceeds ~30 lines of rendering code, you're probably reimplementing a shared pattern. Step back and check Step 1 again.

## Step 4 — Register and verify

1. **Shared components** (used across guides): Add import and entry to `src/components/mdx/index.ts`.
2. **Guide-specific components**: Export from `src/components/mdx/<guide-id>/index.ts` barrel file (auto-discovered — no edit to root `index.ts` needed).
3. Use in MDX: `<MyWrapper itemId="example-id" />`.
4. Run `pnpm validate` to catch TypeScript errors and build issues.
