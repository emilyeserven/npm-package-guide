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

### Accordion List (`AccordionList.tsx`)

Generic single-open accordion with render props for header and body. Wraps the `useAccordion` hook with customizable item containers, indicators, and styling.

```tsx
<AccordionList
  items={data}
  renderHeader={(item, i, isDark) => <span>{item.title}</span>}
  renderBody={(item, i, isDark) => <p>{item.body}</p>}
  renderIndicator={(expanded, isDark) => <span>{expanded ? '−' : '+'}</span>}
  itemStyle={(item, isDark, expanded) => ({ borderColor: expanded ? '#blue' : '#gray' })}
/>
```

**Guide wrappers using it:** `GotchaAccordion` (ci-cd), `AuthPatterns` (auth), `K8sConceptList` (kubernetes).

### Status Badge (`StatusBadge.tsx`)

Themed pill badge for severity/status labels. Pass light/dark color pairs.

```tsx
<StatusBadge label="critical" colors={{ bg, darkBg, text, darkText, border?, darkBorder? }} />
```

**Guide wrappers using it:** `SeverityBadge` (prompt-engineering), `SecurityThreats` (auth), `PatternCards` (ci-cd).

### Card Base (`CardBase.tsx`)

Themed card container with consistent border, background, and optional left accent strip.

```tsx
<CardBase accentColor="#6366f1">
  <h3>Title</h3>
  <p>Content</p>
</CardBase>
```

**Guide components using it:** `ConceptCards` (auth), `SecurityThreats` (auth).

### Mistake Item (`MistakeItem.tsx`)

Shared rendering for mistake entries (title + inline-code example + fix). Avoids duplicating the `parseInlineCode` pattern.

```tsx
<MistakeItemCard item={{ mistake, example, fix }} headingLevel="h3" />
```

**Guide components using it:** `MistakeList` (prompt-engineering), `TestingMistakes` (prompt-engineering).

### Explorer Hook (`useExplorer` in `src/hooks/useExplorer.ts`)

Shared state management for "select item → show detail" explorer UIs. Provides `activeId`, `setActiveId`, `active` item, and `toggle`.

```tsx
const { activeId, setActiveId, active, toggle } = useExplorer(items, defaultId)
```

**Guide components using it:** `StackExplorer` (architecture), `FrameworkExplorer` (architecture), `CodingToolExplorer` (prompt-engineering).

## Creating New Components Checklist

Before creating a component in `src/components/mdx/<guide-id>/`:

1. **Check shared components** — Does `SectionLayout`, `TimelineFlow`, `ProsCons`, `AccordionList`, `CardBase`, `StatusBadge`, `MistakeItemCard`, `YamlExplorerBase`, `ChecklistBase`, or `DefinitionTable` already handle this?
2. **Check shared hooks** — Does `useExplorer`, `useAccordion`, or `useIsDark` already cover the interactivity you need?
3. **Check other guide directories** — Does another guide have a similar component? If so, extract a shared base first.
4. **Evaluate scope** — Will only one guide ever need this? If uncertain, build it as a shared component from the start.
5. **Keep wrappers thin** — If you do create a guide-specific wrapper, it should only handle data lookup. All rendering logic belongs in the shared base.
6. **Register in `index.ts`** — All MDX-available components must be exported from `src/components/mdx/index.ts`.
