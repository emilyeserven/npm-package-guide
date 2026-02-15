# AI Infrastructure — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers learning AI infrastructure — from model serving and vector databases to GPU clusters and training pipelines. Each layer explained with analogies to familiar frontend concepts.

## Section Structure

Defined in `AI_INFRA_GUIDE_SECTIONS` in `src/data/aiInfraData/navigation.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `ai-start`, `ai-overview` |
| The Stack | `ai-inference`, `ai-orchestration`, `ai-data`, `ai-training`, `ai-compute` |
| Workflows | `ai-workflows`, `ai-wf-simple-chat`, `ai-wf-rag`, `ai-wf-agent`, `ai-wf-finetune` |
| Putting It Together | `ai-key-terms` |

Data directory: `src/data/aiInfraData/` — `types.ts`, `layers.ts`, `workflows.ts`, `navigation.ts`.

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `InfraLayerExplorer` | `layerId` | Layer overview with expandable concept headers |
| `WorkflowDetail` | `workflowId` | Single workflow step-by-step flow with layer badges |

## Guide-Specific Conventions

- **Layer-based architecture:** 5 layers in `INFRA_LAYERS`. Each has `concepts` array of `InfraConcept` objects with `name`, `what`, `analogy`, and `tools`.
- **Frontend analogy pattern:** Every `InfraConcept.analogy` maps AI concept to a frontend equivalent. Primary teaching device.
- **Workflow visualization:** `INFRA_WORKFLOWS` defines 4 AI architectures. Individual workflow pages use `<WorkflowDetail workflowId="..." />`.
- **Workflow page template:** `<SectionTitle>` + `<Toc>` + `<SectionIntro>` → overview → when to use → `<WorkflowDetail>` → key considerations → `<Explainer>`.
