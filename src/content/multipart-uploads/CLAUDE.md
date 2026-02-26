# Multipart Uploads Guide

## Audience & Purpose

For backend engineers learning frontend development who need to understand how file uploads work in the browser. Covers the multipart/form-data encoding, the full upload pipeline (file selection through storage), common pitfalls, and how to evaluate third-party upload libraries.

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `PipelineVisualization` | *(none)* | `PIPELINE_STEPS` from `multipartData.ts` | Clickable step-by-step pipeline showing what happens at each stage of a file upload |
| `MultipartDemo` | *(none)* | *(self-contained state)* | Live form builder that shows the raw HTTP multipart request as fields and files are added |
| `PackageScorecard` | *(none)* | `SCORECARD_CRITERIA` from `multipartData.ts` | Expandable checklist for evaluating upload packages (good vs bad per criterion) |
| `WhenMultipart` | *(none)* | `DECISION_QUESTIONS` from `multipartData.ts` | Interactive decision tree that helps determine whether multipart or JSON is appropriate |

## Guide-Specific Conventions

- **Single-page flat structure:** All content in one scrollable MDX page with `SectionSubheading` headers (no tabs)
- **Data in data file:** Pipeline steps, scorecard criteria, and decision questions live in `src/data/multipartData.ts`
- **Code blocks:** Standard markdown fenced code blocks with `typescript` and `http` language tags
- **Emoji in subheadings:** Use Unicode escapes: `{'\u{emoji}'}`
