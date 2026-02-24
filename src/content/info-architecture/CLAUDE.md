# Information Architecture — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning how to organize, structure, and label information in frontend applications, documentation sites, and codebases. Bridges database/API design thinking to user-facing IA concepts.

## Section Structure

Defined in `IA_GUIDE_SECTIONS` in `src/data/iaData.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `ia-start` |
| Core Concepts | `ia-foundations`, `ia-organization` |
| Design Systems | `ia-navigation`, `ia-labeling` |
| Application | `ia-patterns`, `ia-ai-readability`, `ia-practice` |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `IaPillarCards` | none | Expandable cards for the 4 IA pillars with backend analogies |
| `IaSchemeExplorer` | none | Accordion list of organization schemes with strengths/weaknesses |
| `IaNavPatternCards` | none | Accordion list of navigation pattern types with examples |
| `IaPatternCards` | none | Pill selector for structural patterns (hierarchy, hub-spoke, etc.) |
| `IaAiPrincipleCards` | none | Accordion showing dual human/AI benefits of IA principles |

## Guide-Specific Conventions

- All data arrays live in `src/data/iaData.ts` (single file, not a directory).
- Components use shared `AccordionList` base where possible; only `IaPillarCards` and `IaPatternCards` are fully custom.
- Backend analogies appear throughout to bridge concepts for the target audience.
- The "IA for AI Agents" page uses this project's own structure as a running example.
