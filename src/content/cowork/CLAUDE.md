# Cowork Organization Guide — Guide CLAUDE.md

## Audience & Purpose

Users learning how to use Claude Cowork for file organization tasks — local documents, Google Drive integration, and media server library management. Covers setup, step-by-step workflows with copy-pasteable prompts, and best practices.

## Interactive Components

| Component | Props | Purpose |
|---|---|---|
| `CoworkStepCards` | `pageId` (string) | Accordion list of numbered steps with command prompts and tips. Reads from `getStepsForPage()` in data file. |
| `CoworkComparisonTable` | *(none)* | Feature comparison matrix across Local Docs, Google Drive, and Media Server. |
| `CoworkCapabilities` | *(none)* | Supported/unsupported capability pills for the Media Server page. |
| `CoworkPluginCards` | *(none)* | Cards for recommended plugins on the Tips page. |
| `CoworkOverviewCards` | *(none)* | Three use-case cards on the Overview page. |

## Guide-Specific Conventions

- Step data is keyed by page ID and retrieved via `getStepsForPage(pageId)`.
- `CoworkStepCards` uses the shared `AccordionList` base component.
- Each step can have an optional `command` (displayed as a code block) and `tip` (displayed as an accent callout).
- The comparison table and capabilities use hardcoded data arrays from the data file.
- **Adding steps:** Add step data to the appropriate array in `coworkData.ts` (e.g., `SETUP_STEPS`, `DOCUMENTS_STEPS`). For a new page, also add the page ID to `STEP_MAP`.
