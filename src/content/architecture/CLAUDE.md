# Architecture Guide — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning frontend architecture patterns — tech stacks, full-stack frameworks, and how layers connect. Assumes familiarity with databases, servers, and APIs.

## Interactive Components

All accept a string ID prop that looks up data from `archData/`.

| Component | Props | Purpose |
|-----------|-------|---------|
| `StackExplorer` | `stackId` | Interactive stack layer explorer with clickable component bars |
| `StackProsCons` | `stackId` | Pros/cons comparison (delegates to shared `ProsCons`) |
| `LayerDiagram` | *(none)* | 4-layer architecture visualization |
| `DataFlowDiagram` | *(none)* | 6-step data flow through a web app stack |
| `FrameworkExplorer` | `frameworkId` | Interactive framework capability explorer |
| `FrameworkProsCons` | `frameworkId` | Pros/cons for frameworks |

## Guide-Specific Conventions

### Stack page template

Every `arch-stack-*.mdx`: `<SectionTitle>` + `<Toc>` + `<SectionIntro>` → overview with `<SectionList>`/`<ColItem>` → `<StackExplorer>` → `<StackProsCons>` → backend `<Explainer>` analogy.

### Framework page template

Every `arch-fw-*.mdx`: `<SectionTitle>` + `<Toc>` + `<SectionIntro>` → `<FrameworkExplorer>` → `<FrameworkProsCons>`.

### Adding a new stack

1. Add `StackPageData` entry to `STACK_PAGES` in `stacks.ts`.
2. Create `arch-stack-<name>.mdx` following the stack page template.
3. Add page ID to `ARCH_GUIDE_SECTIONS` under "Stack Alternatives".

### Adding a new framework

1. Add `FrameworkPageData` entry to `FRAMEWORK_PAGES` in `frameworks.ts`.
2. Create `arch-fw-<name>.mdx` following the framework page template.
3. Add page ID to `ARCH_GUIDE_SECTIONS` under "Full-Stack Frameworks".
