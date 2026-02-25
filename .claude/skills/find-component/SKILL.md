---
description: Find the right shared component for a guide UI need. Prevents duplication by matching requirements to existing bases, hooks, and thin-wrapper patterns.
---

# Finding the Right Component

Use this skill when adding interactive UI to a guide page. It prevents duplication by checking shared components first, then existing guide-specific implementations, before creating anything new.

## Step 1 — Identify the UI pattern

Classify what you need from the list below. If your need maps to a shared component, **use it directly in MDX or create a thin data-lookup wrapper** — do not reimplement.

### Pattern Quick Reference

| You need... | Use this shared component | Wrapper examples |
|---|---|---|
| Sequential steps / pipeline / flow | `TimelineFlow` | `PipelineStages`, `OAuthFlow`, `K8sFlowDiagram` |
| Strengths vs tradeoffs comparison | `ProsCons` | `ArchProsCons` (lookup by ID) |
| Collapsible list of items | `AccordionList` | `GotchaAccordion`, `AuthPatterns`, `K8sConceptList` |
| Annotated YAML/config file | `YamlExplorerBase` | `YamlExplorer` (ci-cd), `K8sYamlExplorer` |
| Themed card container | `CardBase` | `ConceptCards`, `SecurityThreats` |
| Severity/status label pill | `StatusBadge` | `SeverityBadge`, used inside `SecurityThreats` |
| Mistake → example → fix list | `MistakeItemCard` | `MistakeList`, `TestingMistakes` |
| Select item → show detail panel | `useExplorer` hook | `StackExplorer`, `FrameworkExplorer`, `CodingToolExplorer` |
| Single-open expand/collapse | `useAccordion` hook | Used internally by `AccordionList` |
| Two-column term/definition table | `DefinitionTable` + `DefRow` | Use directly in MDX |
| Collapsible code block with copy | `CodeAccordion` | Use directly in MDX |
| Cross-page link | `NavLink`, `NavPill`, `StepJump` | Use directly in MDX |
| Page table of contents | `Toc` + `TocLink` | Use directly in MDX |
| Checklist with progress tracking | `GuideChecklist` (add to `CHECKLIST_REGISTRY`) | Never create per-guide checklist components |
| Info/tip/warning callout | `SectionNote` / `Explainer` / `Gotcha` | Use directly in MDX |
| Copy-to-clipboard button | `CopyButton` (pass `className` for inline usage) | Used in `JcsPlayground`, `JcsRecipeAccordion` |
| Hover tooltip with timer/positioning | `useHoverTooltip` hook | `GlossaryTooltip`, `FootnoteTooltip` |
| Searchable filterable table page | `FilterableTableShell` | `GlossaryPage`, `ExternalResourcesPage` |
| Multi-question quiz with scoring | `QuizBase` | `AuthQuiz`, `S3Quiz` |

### Shared component locations

All shared bases live at `src/components/mdx/` (top-level, not in guide subdirectories):

- **Layout:** `SectionLayout.tsx` (exports `SectionTitle`, `SectionSubheading`, `SectionIntro`, `SectionNote`, `Explainer`, `Gotcha`, `Toc`, `ColItem`, `SectionList`, `CodeAccordion`, `MdxPre`, `DefinitionTable`, `DefRow`)
- **Interactive bases:** `TimelineFlow.tsx`, `ProsCons.tsx`, `AccordionList.tsx`, `YamlExplorerBase.tsx`, `CardBase.tsx`, `StatusBadge.tsx`, `MistakeItem.tsx`, `CopyButton.tsx`, `QuizBase.tsx`
- **Navigation:** `NavLink.tsx`, `NavPill.tsx`, `StepJump.tsx`, `TocLink.tsx`
- **Hooks:** `src/hooks/useExplorer.ts`, `src/hooks/useHoverTooltip.ts`, `useAccordion` (inside `AccordionList.tsx`)
- **Page shells:** `src/components/FilterableTableShell.tsx` (search + badge filters + results count + wide/compact toggle)
- **Checklists:** `GuideChecklist.tsx` (single registry — add entries to `CHECKLIST_REGISTRY`)
- **Data helpers:** `Cmd.tsx`, `FnRef.tsx`
- **Shared data:** `src/data/severityBadges.ts` (severity badge mapping used by Sidebar + CommandMenu)

## Step 2 — Search existing guide components

Before creating a new component, check if another guide already solves the same problem. Search with:

```bash
# Find components by pattern name
ls src/components/mdx/*/

# Search for a UI pattern across guides
grep -r "useExplorer\|AccordionList\|TimelineFlow\|ProsCons\|CardBase\|StatusBadge\|YamlExplorerBase" src/components/mdx/
```

**Common patterns already implemented across guides:**

| Pattern | Existing implementations |
|---|---|
| Data-lookup detail panel (topicId → rendered sections) | `SecurityTopicDetail`, `PwaTopicDetail`, `TsrTopicDetail`, `ConceptDetail`, `TestTypeDetail` |
| Explorer with selection grid + detail | `StackExplorer`, `FrameworkExplorer`, `CodingToolExplorer`, `AwsServiceExplorer`, `InfraLayerExplorer` |
| Gotcha/tip accordion | `GotchaAccordion` (ci-cd), `CoolifyGotchaAccordion`, `PiGotchaAccordion`, `JcsPitfallAccordion` |
| Comparison table | `TsqComparisonTable`, `CoworkComparisonTable`, `S3ComparisonTable`, `NginxComparison` |
| Interactive code demo | `ZstCounter`, `ZstTodo`, `JcsPlayground`, `S3CostCalculator` |
| Step cards with expandable detail | `CoworkStepCards`, `RoadmapSteps` |
| Quiz with multi-choice questions | `AuthQuiz`, `S3Quiz` (both thin wrappers around `QuizBase`) |

If an existing guide component is similar to what you need, check whether the shared base it delegates to can serve your purpose directly.

## Step 3 — Decide: use shared, wrap, or create

Follow this decision tree:

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

**Key rule:** If your wrapper file exceeds ~30 lines of rendering code, you're probably reimplementing a shared pattern. Step back and check Step 1 again.

## Step 4 — Register and verify

1. Export from `src/components/mdx/index.ts` (add import + add to `mdxComponents` object).
2. Use in MDX: `<MyWrapper itemId="example-id" />`.
3. Run `pnpm validate` to catch TypeScript errors and build issues.

## Known duplication to avoid

These patterns have been reimplemented unnecessarily in the past. Always use the shared version:

- **Gotcha/tip accordions** — Always use `AccordionList` with a thin wrapper. Do not build custom accordion UIs.
- **Pros/cons** — Always use `ProsCons`. Do not build toggle-based strengths/weaknesses UIs separately.
- **Copy buttons** — Use shared `CopyButton` from `src/components/mdx/CopyButton.tsx`. Pass `className` for inline positioning instead of the default absolute positioning. Use `CodeAccordion` for collapsible code blocks with copy. Do not create per-guide copy button components.
- **Checklists** — Always use `GuideChecklist` + `CHECKLIST_REGISTRY`. Do not create per-guide checklist components.
- **Definition lists** — Use `DefinitionTable` + `DefRow` directly in MDX. Do not create concept-list components that render term/definition pairs.
- **Hover tooltips** — Use `useHoverTooltip` hook for timer/positioning logic. Do not reimplement hover delay, viewport clamping, or above/below flip.
- **Filterable table pages** — Use `FilterableTableShell` for search + badge filters + results count + wide/compact toggle. Do not duplicate this layout.
- **Quizzes** — Use `QuizBase` for multi-question quizzes with scoring and result messages. Do not create per-guide quiz components.
- **Accordion indicators** — Do not pass `renderIndicator` to `AccordionList` if the indicator is the default rotating "+". Only pass it for genuinely custom indicators (different icon, color, or behavior).
- **Severity badge data** — Import from `src/data/severityBadges.ts`. Do not duplicate the badge mapping.
