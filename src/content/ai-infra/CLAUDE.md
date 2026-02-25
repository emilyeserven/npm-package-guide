# AI Infrastructure — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers learning AI infrastructure — from model serving and vector databases to GPU clusters and training pipelines. Each layer explained with analogies to familiar frontend concepts.

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
