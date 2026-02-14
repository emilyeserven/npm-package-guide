# Development Reference

Detailed conventions for component development, routing, and tooling. See root `CLAUDE.md` for project overview and essential patterns.

## Dark Style Helper (`ds()`)

`ds()` in `src/helpers/darkStyle.ts` selects between light/dark values for inline styles:

```typescript
ds(light: string, dark: string, isDark: boolean): string
```

Use for interactive components with dynamic colors from data (can't use Tailwind `dark:` variants). Use Tailwind `dark:` variants for all static colors.

```tsx
<div style={{ background: ds(item.accent, item.darkAccent, isDark) }}>  {/* dynamic */}
<div className="bg-white dark:bg-slate-800">                           {/* static */}
```

## Routing

The router resolves pages in order:

1. **Search-param pages** — `searchParamPages` in `src/data/componentPages.tsx`
2. **Simple component pages** — `simpleComponentPages` in `src/data/componentPages.tsx`
3. **MDX content pages** — auto-discovered via `import.meta.glob` in `src/content/registry.ts`

All guide pages are MDX and auto-route. Only non-MDX pages need `componentPages.tsx` entries.

## Page Ordering

Each guide's `*_GUIDE_SECTIONS` array (in its data file) automatically drives: sidebar, command menu, prev/next links, and home page tiles via `src/data/guideRegistry.ts`.

`<GuideStartContent>` auto-derives learning-path sub-items from sections and renders a Resources section at the bottom (External Resources, Glossary, Checklist tiles). Do not add manual Resources steps to `StartPageData`.

Top-level resource pages (`external-resources`, `glossary`) are NOT in any guide's navigation.

## Build Validation (`pnpm validate:data`)

| Check | What it catches |
|-------|----------------|
| Duplicate link registry IDs | Two entries with the same `id` in `src/data/linkRegistry/` |
| Glossary `linkId` references | Term pointing to non-existent link registry entry |
| Glossary `sectionId` references | Term pointing to non-existent page ID |
| Duplicate page IDs | Same page ID in two different guides |
| `startPageId` not in sections | Guide start page missing from its `*_GUIDE_SECTIONS` |

## Command Menu (CMD-K)

Provides searchable access to: all guide pages (grouped by section), glossary terms (navigates to Glossary with prefilled search), and external resources (opens URL in new tab).

## TypeScript & Linting

**TypeScript:** Strict mode, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly`. Target ES2022.

**ESLint:** Flat config (`eslint.config.js`), extending `js.configs.recommended`, `tseslint.configs.recommended`, `reactHooks.configs.flat.recommended`, `reactRefresh.configs.vite`.

## Error Troubleshooting

| Error | Fix |
|-------|-----|
| `Duplicate page ID "foo"` | Change one MDX `id` to be unique |
| `unknown guide "bar"` | Use a valid guide ID from the Guides table |
| `Unknown link ID "baz"` | Add entry to `src/data/linkRegistry/<guideId>Links.ts` |
| `startPageId not in sections` | Add start page ID to guide's `*_GUIDE_SECTIONS` |
| Sidebar shows raw page ID | Ensure MDX `title` ends with emoji |
