# Architecture Guide — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning frontend architecture patterns — tech stacks, full-stack frameworks, and how layers connect. Assumes familiarity with databases, servers, and APIs.

## Section Structure

Defined in `ARCH_GUIDE_SECTIONS` in `src/data/archData/navigation.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `arch-start`, `arch-what-is-a-stack` |
| Stack Alternatives | `arch-stack-mern`, `arch-stack-pfrn`, `arch-stack-mean`, `arch-stack-lamp`, `arch-stack-django`, `arch-stack-rails` |
| Full-Stack Frameworks | `arch-frameworks-intro`, `arch-fw-nextjs`, `arch-fw-react-router`, `arch-fw-tanstack-start`, `arch-fw-remix` |
| Putting It Together | `arch-how-it-connects` |

Data directory: `src/data/archData/` — `types.ts`, `stacks.ts`, `frameworks.ts`, `navigation.ts` (barrel-exported).

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
