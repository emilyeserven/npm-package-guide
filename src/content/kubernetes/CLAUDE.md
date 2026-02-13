# Kubernetes & Helm — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **kubernetes**-specific context only.

## Audience & Purpose

Frontend engineers who deploy apps but want to understand what happens after `git push`. Teaches containers, Docker, Kubernetes, Helm, and deployment pipelines using frontend-to-infrastructure analogies throughout.

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `k8s-start` |
| Foundations | `k8s-big-picture`, `k8s-containers`, `k8s-kubernetes` |
| Configuration | `k8s-yaml`, `k8s-helm` |
| The Full Picture | `k8s-ecosystem`, `k8s-flow` |

Defined in `K8S_GUIDE_SECTIONS` in `src/data/k8sData.ts`.

## File Locations

| Category | Path |
|----------|------|
| Content pages | `src/content/kubernetes/*.mdx` |
| All guide data | `src/data/k8sData.ts` (single file) |
| Interactive components | `src/components/mdx/kubernetes/` |
| Link registry | `src/data/linkRegistry/kubernetesLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/kubernetesTerms.ts` |

## Interactive Components

All components accept a `sectionId: string` prop that looks up the matching `K8sSection` from `K8S_SECTIONS` by its `id` field.

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `K8sAnalogyCard` | `sectionId: string` | `K8S_SECTIONS` | Renders the frontend ↔ infra analogy card for a section |
| `K8sConceptList` | `sectionId: string` | `K8S_SECTIONS` | Renders the concept term/definition list for a section |
| `K8sCodeBlock` | `sectionId: string` | `K8S_SECTIONS` | Renders the code example (e.g., Dockerfile, YAML manifest) for a section |
| `K8sFlowDiagram` | `sectionId: string` | `K8S_SECTIONS` | Renders a color-coded flow diagram (e.g., deployment pipeline steps) |

## Guide-Specific Conventions

### Dual perspective structure

Every `K8sSection` has both a `frontend` and an `infra` field — short paragraphs that explain the same concept from the frontend engineer's familiar perspective and the infrastructure perspective. This is the defining convention of the guide.

### Analogy mapping

The `K8sAnalogy` type maps a `frontend` concept to an `infra` concept with an `explain` field. For example: `npm / package.json` maps to `Kubernetes / Helm Charts`. The `K8sAnalogyCard` component renders these as a visual comparison.

### Single data file

All data lives in `k8sData.ts` — types (`K8sSection`, `K8sAnalogy`, `K8sConcept`, `K8sCodeExample`, `K8sFlowStep`), the `K8S_SECTIONS` array, and navigation/start page data.

### K8sSection structure

Each section in `K8S_SECTIONS` has:

- `id` — Matches the section prop passed to all components
- `icon`, `title`, `subtitle` — Display metadata
- `frontend`, `infra` — Dual perspective text
- `analogy?` — Optional `K8sAnalogy` (frontend ↔ infra mapping)
- `concepts?` — Optional `K8sConcept[]` (term/definition pairs)
- `codeExample?` — Optional `K8sCodeExample` (title + code string)
- `flow?` — Optional `K8sFlowStep[]` (step/label/detail with `color`/`darkColor`)
- `keyTakeaway` — Summary sentence rendered as a callout

### Flow diagram colors

`K8sFlowStep` entries have `color` and `darkColor` fields for light/dark mode rendering in `K8sFlowDiagram`.

## Adding a New Page

1. Add a `K8sSection` entry to `K8S_SECTIONS` in `src/data/k8sData.ts` with all required fields.
2. Create `src/content/kubernetes/k8s-<slug>.mdx` with frontmatter (`id`, `title` with emoji, `guide: "kubernetes"`).
3. Use the section components in the MDX body: `<K8sAnalogyCard sectionId="..." />`, `<K8sConceptList sectionId="..." />`, etc.
4. Add the page ID to `K8S_GUIDE_SECTIONS` in `k8sData.ts` under the correct section label.
