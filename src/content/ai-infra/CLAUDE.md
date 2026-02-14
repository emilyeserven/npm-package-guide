# AI Infrastructure — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **ai-infra**-specific context only.

## Audience & Purpose

Frontend engineers learning AI infrastructure — from model serving and vector databases to GPU clusters and training pipelines. Each layer is explained with analogies to familiar frontend concepts like Express middleware, React state, and data-fetching patterns.

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `ai-start`, `ai-overview` |
| The Stack | `ai-inference`, `ai-orchestration`, `ai-data`, `ai-training`, `ai-compute` |
| Workflows | `ai-workflows`, `ai-wf-simple-chat`, `ai-wf-rag`, `ai-wf-agent`, `ai-wf-finetune` |
| Putting It Together | `ai-key-terms` |

Defined in `AI_INFRA_GUIDE_SECTIONS` in `src/data/aiInfraData/navigation.ts`.

## File Locations

| Category | Path |
|----------|------|
| Content pages | `src/content/ai-infra/*.mdx` |
| Data directory | `src/data/aiInfraData/` (barrel-exported) |
| Type definitions | `src/data/aiInfraData/types.ts` |
| Layer data | `src/data/aiInfraData/layers.ts` |
| Workflow data | `src/data/aiInfraData/workflows.ts` |
| Navigation & start page | `src/data/aiInfraData/navigation.ts` |
| Interactive components | `src/components/mdx/ai-infra/` |
| Link registry | `src/data/linkRegistry/aiInfraLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/aiInfraTerms.ts` |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `InfraLayerExplorer` | `layerId: string` | `INFRA_LAYERS` in `layers.ts` | Interactive layer explorer with clickable concept cards showing name, description, frontend analogy, and tools |
| `WorkflowExplorer` | *(none)* | `INFRA_WORKFLOWS` in `workflows.ts` | Interactive workflow selector showing all workflows with tab navigation |
| `WorkflowDetail` | `workflowId: string` | `INFRA_WORKFLOWS` in `workflows.ts` | Single workflow step-by-step flow with layer badges |

## Guide-Specific Conventions

### Layer-based architecture

The guide is organized around 5 infrastructure layers defined in `INFRA_LAYERS`. Each `InfraLayer` has:

- `id`, `title`, `subtitle`, `icon` — Display metadata
- `color`, `accent`, `darkAccent` — Theme colors for dark mode support
- `summary` — Layer overview text
- `concepts` — Array of `InfraConcept` objects, each with `name`, `what` (description), `analogy` (frontend analogy), and `tools` (real-world tools list)

### Frontend analogy pattern

Every `InfraConcept` includes an `analogy` field that maps the AI concept to a familiar frontend equivalent. This is the primary teaching device of the guide.

### Workflow visualization

`INFRA_WORKFLOWS` defines 4 common AI architectures (simple chat, RAG, agents, fine-tuning). Each workflow has `steps` referencing infrastructure layers by name, showing how data flows through the stack. The overview page (`ai-workflows`) uses `<WorkflowExplorer />` for comparing all workflows; individual workflow pages (`ai-wf-*.mdx`) use `<WorkflowDetail workflowId="..." />` for single-workflow detail.

### Workflow page template

Workflow pages (`ai-wf-*.mdx`) follow a consistent structure:

1. `<SectionTitle>` + `<Toc>` + `<SectionIntro>`
2. Overview with `<SectionList>` / `<ColItem>`
3. When to use this pattern
4. `<WorkflowDetail workflowId="..." />`
5. Key considerations
6. Frontend `<Explainer>` analogy box

### Key terms

Key terms for the guide are defined as glossary entries in `src/data/glossaryTerms/aiInfraTerms.ts`. The `ai-key-terms` page links to the Glossary filtered by the AI Infrastructure guide.

### Data types

Key interfaces in `src/data/aiInfraData/types.ts`:

- `InfraLayer` — id/title/subtitle/icon/color/accent/darkAccent/summary/concepts
- `InfraConcept` — name/what/analogy/tools
- `InfraWorkflow` — id/title/description/steps
- `WorkflowStep` — layer/label/icon

## Adding a New Page

1. Create `src/content/ai-infra/ai-<slug>.mdx` with frontmatter (`id`, `title` with emoji, `guide: "ai-infra"`).
2. Add the page ID to `AI_INFRA_GUIDE_SECTIONS` in `src/data/aiInfraData/navigation.ts` under the correct section label.
3. For layer pages, add an `InfraLayer` entry to `INFRA_LAYERS` in `layers.ts` and use `<InfraLayerExplorer layerId="..." />` in the MDX.
4. Register any new components in `src/components/mdx/index.ts`.
