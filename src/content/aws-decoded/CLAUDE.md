# AWS Decoded Guide

## Audience

Frontend engineers who want a jargon-free reference for AWS services. Each service is explained with a frontend-friendly analogy, practical use cases, key terms decoded, and pricing info.

## Interactive Components

### `AwsServiceExplorer`
`src/components/mdx/aws-decoded/AwsServiceExplorer.tsx` — takes a `categoryId` prop and renders all services in that category as expandable accordion cards. Used on category overview/intro pages. Each card includes a "View full details" link to the service's dedicated page.

### `AwsServicePage`
`src/components/mdx/aws-decoded/AwsServicePage.tsx` — takes a `serviceId` prop and renders a full detail page for a single AWS service. Sections: header/badges, one-liner, analogy, detail, how it works, use cases, key terms, code examples (SDK + CLI + CDK), gotchas, when-not-to-use, related services, related guides (cross-linking), and pricing. Data source: `ALL_AWS_SERVICES` from `src/data/awsDecodedData/`.

11 categories: `compute`, `storage`, `database`, `networking`, `security`, `serverless`, `containers`, `devtools`, `ai_ml`, `monitoring`, `frontend_web`. Data split by category in `src/data/awsDecodedData/` (one file per category).

## Guide-Specific Conventions

- Category overview pages use `<AwsServiceExplorer categoryId="..." />` for accordion summaries.
- Service detail pages use `<AwsServicePage serviceId="..." />` — all content is data-driven, no inline MDX content.
- Service page IDs follow `aws-{service.id}` naming (e.g., `aws-ec2`, `aws-s3`, `aws-lambda`).
- MDX pages are minimal: `<SectionTitle>` + `<AwsServicePage serviceId="..." />`.
- New `AwsService` fields are optional — populate incrementally (`howItWorks`, `gotchas`, `whenNotToUse`, `relatedServices`, `relatedGuides`, `cliExample`, `cdkExample`).
- Cross-linking to dedicated guides uses `relatedGuides` field on `AwsService`.
- **Adding a new service:** Add the `AwsService` object to the appropriate category file in `src/data/awsDecodedData/`, create an MDX page in `src/content/aws-decoded/`, add the page ID to `AWS_GUIDE_SECTIONS` in navigation.ts, add link registry entries, and optionally add glossary terms.
