# Component Reference

Conventions for MDX components, shared base components, and when to create (or avoid) guide-specific components. See root `CLAUDE.md` for project overview and essential patterns.

## Prefer Shared Components Over Guide-Specific Ones

Guide-specific components (`src/components/mdx/<guide-id>/`) should only be created when no shared component can serve the purpose. Before creating a new component in a guide directory, check whether a shared base already handles the pattern.

**Rule of thumb:** If a shared component exists for a pattern, use it — even if it requires a thin data-lookup wrapper. Do not reimplement the same UI pattern in a guide-specific file.

### When a guide-specific component IS appropriate

- The UI is genuinely unique to one guide (e.g., `TestingPyramid` renders a scaled triangle — no other guide needs this shape).
- A thin wrapper that only looks up guide data by ID and delegates to a shared base (e.g., `K8sYamlExplorer` passes data to `YamlExplorerBase`). Keep these minimal.
- The component requires domain-specific interactivity not generalizable to other guides (e.g., `AuthQuiz` with answer scoring).

### When a guide-specific component is NOT appropriate

- The pattern already exists as a shared component. Use the shared one directly in MDX or create a minimal data-lookup wrapper — do not rebuild the UI.
- Two or more guides need the same pattern. Extract to a shared base instead of duplicating.
- The component is a styled container, card, accordion, or layout primitive. Use `SectionLayout` exports or other shared components.

## Shared Base Components

These components are designed to be reused across all guides. Always check this list before creating something new.

### Layout & Structure (`SectionLayout.tsx`)

Semantic wrappers for MDX page structure. Use these instead of raw HTML/divs:

| Component | Purpose |
|-----------|---------|
| `SectionTitle` | H1 page heading |
| `SectionSubheading` | H2 heading with anchor ID |
| `SectionIntro` | Intro paragraph |
| `SectionNote` | Blue info callout box |
| `Explainer` | Section with 💡 heading |
| `Gotcha` | Section with ⚠️ heading |
| `Toc` | "On this page" box |
| `ColItem` | Indented list item |
| `SectionList` | Flex container for lists |
| `CodeAccordion` | Collapsible code block with copy button |
| `MdxPre` | Styled `<pre>` for code |
| `DefinitionTable` + `DefRow` | Two-column term/definition table (TanStack Table) |

### Timeline & Flow (`TimelineFlow.tsx`)

Generic vertical timeline with render-prop customization. Use for any sequential process, pipeline, or flow diagram.

```tsx
<TimelineFlow
  items={steps}
  renderIndicator={(item, i, isDark) => <Circle />}
  renderContent={(item, i, isDark) => <Card />}
  renderConnector={(item, i, isDark) => <Line />}  // optional
/>
```

**Guides using it correctly:** `PipelineStages` (ci-cd), `OAuthFlow` (auth), `K8sFlowDiagram` (kubernetes), `WorkflowDetail` (ai-infra).

### Pros & Cons (`ProsCons.tsx`)

Side-by-side strengths/tradeoffs card with "Best for" section. Accepts color theming props.

```tsx
<ProsCons pros={[...]} cons={[...]} bestFor="..." color="..." accent="..." darkAccent="..." />
```

Guide wrappers like `ArchProsCons` are acceptable — they only look up data by ID and pass props through.

### YAML Explorer (`YamlExplorerBase.tsx`)

Interactive two-panel YAML annotation UI. Guide wrappers pass data and filename:

```tsx
<YamlExplorerBase lines={annotatedLines} fileName="ci.yml" />
```

### Checklists (`GuideChecklist.tsx` + `ChecklistBase.tsx`)

All checklists use a single registry in `GuideChecklist.tsx`. To add a checklist for a new guide, add an entry to `CHECKLIST_REGISTRY` — do not create a per-guide checklist component.

### Navigation (`NavLink.tsx`, `NavPill.tsx`, `StepJump.tsx`)

Inline cross-page links and navigation pills. Self-closing form auto-resolves page titles.

## Consolidation Opportunities

The following guide-specific components duplicate patterns that could benefit from shared bases. These are documented here for future refactoring reference.

### Accordion pattern

Multiple guide components implement expand/collapse UIs independently:

| Component | Guide | Pattern |
|-----------|-------|---------|
| `GotchaAccordion` | ci-cd | List of tips, click to expand |
| `AuthPatterns` | auth | Patterns with code examples, click to expand |
| `K8sConceptList` | kubernetes | Term/definition accordion |

All three use the `useAccordion` hook but build their own container, indicator, and animation. A shared `AccordionList` base component accepting `renderHeader` / `renderBody` props could unify them.

### Card / info-card pattern

Several components render styled cards with badges, descriptions, and color-coded borders:

| Component | Guide | Pattern |
|-----------|-------|---------|
| `ConceptCards` | auth | Cards with left border, badge, sections |
| `SecurityThreats` | auth | Cards with severity badge, risk/defense |
| `PatternCards` | ci-cd | Cards with colored tag, description |
| `TestPracticeCards` | testing | Do/don't cards with green/red border |
| `K8sAnalogyCard` | kubernetes | Two-column analogy card |

A shared `InfoCard` base with props for title, badge/tag, sections, and border color would reduce duplication.

### Mistake / do-don't list pattern

| Component | Guide | Pattern |
|-----------|-------|---------|
| `MistakeList` | prompt-engineering | Mistake title + example + fix |
| `TestingMistakes` | prompt-engineering | Same structure, grouped by context |

These two are nearly identical in structure and could share a base or be merged.

### Explorer pattern (select item → detail panel)

| Component | Guide | Pattern |
|-----------|-------|---------|
| `StackExplorer` | architecture | Clickable list → multi-section detail |
| `FrameworkExplorer` | architecture | Clickable list → detail with "Built on" |
| `CodingToolExplorer` | prompt-engineering | Grid → detail with strengths/considerations |

All three manage `activeId` state and render a conditional detail panel. A `useExplorer<T>()` hook or `ExplorerBase` component with `renderItem` / `renderDetail` props could eliminate repeated selection logic.

### Flow diagram without `TimelineFlow`

| Component | Guide | Could use `TimelineFlow`? |
|-----------|-------|---------------------------|
| `DataFlowDiagram` | architecture | Yes — vertical numbered steps |
| `LayerDiagram` | architecture | No — static layer stack, not a flow |
| `TestingPyramid` | testing | No — scaled triangle, not sequential |

`DataFlowDiagram` renders a vertical step list that maps directly to `TimelineFlow`'s API.

## Severity / Status Badge

`SeverityBadge` exists in `src/components/mdx/prompt-engineering/` but is also reimplemented inline in `SecurityThreats` (auth) and `PatternCards` (ci-cd). If badges are needed in future guides, promote `SeverityBadge` to a shared component.

## Creating New Components Checklist

Before creating a component in `src/components/mdx/<guide-id>/`:

1. **Check shared components** — Does `SectionLayout`, `TimelineFlow`, `ProsCons`, `YamlExplorerBase`, `ChecklistBase`, or `DefinitionTable` already handle this?
2. **Check other guide directories** — Does another guide have a similar component? If so, extract a shared base first.
3. **Evaluate scope** — Will only one guide ever need this? If uncertain, build it as a shared component from the start.
4. **Keep wrappers thin** — If you do create a guide-specific wrapper, it should only handle data lookup. All rendering logic belongs in the shared base.
5. **Register in `index.ts`** — All MDX-available components must be exported from `src/components/mdx/index.ts`.
