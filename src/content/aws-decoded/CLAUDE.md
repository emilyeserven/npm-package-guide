# AWS Decoded Guide

## Audience

Frontend engineers who want a jargon-free reference for AWS services. Each service is explained with a frontend-friendly analogy, practical use cases, key terms decoded, and pricing info.

## Interactive Components

`AwsServiceExplorer` (`src/components/mdx/aws-decoded/AwsServiceExplorer.tsx`) — takes a `categoryId` prop and renders all services in that category as expandable cards with detail, analogy, use cases, key terms, code examples, and pricing.

11 categories: `compute`, `storage`, `database`, `networking`, `security`, `serverless`, `containers`, `devtools`, `ai-ml`, `monitoring`, `frontend`. Data split by category in `src/data/awsDecodedData/` (one file per category).

## Guide-Specific Conventions

- Each category page uses `<AwsServiceExplorer categoryId="..." />` — no inline data.
- Service fields: `detail`, `analogy`, `useCases`, `keyTerms`, `codeExamples`, `pricing`.
- **Adding a new service:** Add the `AwsService` object to the appropriate category file in `src/data/awsDecodedData/`, add link registry entries, and optionally add glossary terms.
