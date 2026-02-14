# Kubernetes & Helm — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers who deploy apps but want to understand what happens after `git push`. Teaches containers, Docker, Kubernetes, Helm, and deployment pipelines using frontend-to-infrastructure analogies.

## Section Structure

Defined in `K8S_GUIDE_SECTIONS` in `src/data/k8sData.ts`. All data in this single file.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `k8s-start` |
| Foundations | `k8s-big-picture`, `k8s-containers`, `k8s-kubernetes` |
| Configuration | `k8s-yaml`, `k8s-helm` |
| The Full Picture | `k8s-ecosystem`, `k8s-flow` |

## Interactive Components

All accept `sectionId: string` matching a `K8sSection.id` in `K8S_SECTIONS`.

| Component | Props | Purpose |
|-----------|-------|---------|
| `K8sAnalogyCard` | `sectionId` | Frontend ↔ infra analogy card |
| `K8sConceptList` | `sectionId` | Concept term/definition list |
| `K8sCodeBlock` | `sectionId` | Code example (Dockerfile, YAML manifest) |
| `K8sFlowDiagram` | `sectionId` | Color-coded flow diagram |

## Guide-Specific Conventions

- **Dual perspective:** Every `K8sSection` has `frontend` and `infra` fields — same concept from two viewpoints.
- **Analogy mapping:** `K8sAnalogy` maps `frontend` concept to `infra` concept with `explain` field. `K8sAnalogyCard` renders as visual comparison.
- **Section structure:** Each `K8sSection` has: `id`, `icon`, `title`, `subtitle`, `frontend`, `infra`, optional `analogy`/`concepts`/`codeExample`/`flow`, and `keyTakeaway`.
