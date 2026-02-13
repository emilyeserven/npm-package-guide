# Architecture Guide — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **architecture**-specific context only.

## Audience & Purpose

Backend engineers learning frontend architecture patterns — tech stacks, full-stack frameworks, and how layers connect. Assumes familiarity with databases, servers, and APIs. Teaches how frontend stacks are assembled, what each layer does, and how to compare alternatives.

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `arch-start`, `arch-what-is-a-stack` |
| Stack Alternatives | `arch-stack-mern`, `arch-stack-pfrn`, `arch-stack-mean`, `arch-stack-lamp`, `arch-stack-django`, `arch-stack-rails` |
| Full-Stack Frameworks | `arch-frameworks-intro`, `arch-fw-nextjs`, `arch-fw-react-router`, `arch-fw-tanstack-start`, `arch-fw-remix` |
| Putting It Together | `arch-how-it-connects` |

Defined in `ARCH_GUIDE_SECTIONS` in `src/data/archData/navigation.ts`.

## File Locations

| Category | Path |
|----------|------|
| Content pages | `src/content/architecture/*.mdx` |
| Data directory | `src/data/archData/` (barrel-exported) |
| Type definitions | `src/data/archData/types.ts` |
| Stack data | `src/data/archData/stacks.ts` |
| Framework data | `src/data/archData/frameworks.ts` |
| Navigation & start page | `src/data/archData/navigation.ts` |
| Interactive components | `src/components/mdx/architecture/` |
| Shared ProsCons component | `src/components/mdx/ProsCons.tsx` |
| Link registry | `src/data/linkRegistry/architectureLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/architectureTerms.ts` |

## Interactive Components

All components accept a string ID prop that looks up data from the `archData/` files.

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `StackExplorer` | `stackId: string` | `STACK_PAGES` in `stacks.ts` | Interactive stack layer explorer with clickable component bars |
| `StackProsCons` | `stackId: string` | `STACK_PAGES` in `stacks.ts` | Pros/cons comparison (delegates to shared `ProsCons`) |
| `LayerDiagram` | *(none)* | `LAYER_COLORS` in `stacks.ts` | 4-layer architecture visualization (Frontend, Server, Runtime, Database) |
| `DataFlowDiagram` | *(none)* | `DATA_FLOW` + `LAYER_COLORS` in `stacks.ts` | 6-step data flow through a web app stack |
| `FrameworkExplorer` | `frameworkId: string` | `FRAMEWORK_PAGES` in `frameworks.ts` | Interactive framework capability explorer |
| `FrameworkProsCons` | `frameworkId: string` | `FRAMEWORK_PAGES` in `frameworks.ts` | Pros/cons for frameworks (delegates to shared `ProsCons`) |

## Guide-Specific Conventions

### Stack page template

Every stack page (`arch-stack-*.mdx`) follows an identical structure:

1. `<SectionTitle>` + `<Toc>` + `<SectionIntro>`
2. Overview with `<SectionList>` / `<ColItem>`
3. `<StackExplorer stackId="..." />`
4. `<StackProsCons stackId="..." />`
5. Backend `<Explainer>` analogy box

New stack pages must follow this template exactly.

### Framework page template

Framework pages (`arch-fw-*.mdx`) follow a similar structure:

1. `<SectionTitle>` + `<Toc>` + `<SectionIntro>`
2. `<FrameworkExplorer frameworkId="..." />`
3. `<FrameworkProsCons frameworkId="..." />`

### Data types

- **`StackPageData`** — Contains `id`, `name`, `components` array (`StackComponent[]`), `pros`, `cons`, `bestFor`, and color fields.
- **`FrameworkPageData`** — Contains `id`, `name`, `capabilities` array (`FrameworkCapability[]`), `pros`, `cons`, `bestFor`, and color fields.
- Both types include `color`, `accent`, and `darkAccent` for dark mode support in interactive components.

### Adding a new stack

1. Add a `StackPageData` entry to `STACK_PAGES` in `src/data/archData/stacks.ts`.
2. Create `src/content/architecture/arch-stack-<name>.mdx` following the stack page template.
3. Add the page ID to `ARCH_GUIDE_SECTIONS` in `navigation.ts` under "Stack Alternatives".

### Adding a new framework

1. Add a `FrameworkPageData` entry to `FRAMEWORK_PAGES` in `src/data/archData/frameworks.ts`.
2. Create `src/content/architecture/arch-fw-<name>.mdx` following the framework page template.
3. Add the page ID to `ARCH_GUIDE_SECTIONS` in `navigation.ts` under "Full-Stack Frameworks".
