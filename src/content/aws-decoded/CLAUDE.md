# AWS Decoded Guide

## Audience
Frontend engineers who want a jargon-free reference for AWS services. Each service is explained with a frontend-friendly analogy, practical use cases, key terms decoded, and pricing info.

## Structure
- **Start page** (`aws-start`): Overview with 4 numbered sections
- **11 category pages**: One per AWS category, each rendering services as expandable cards via `<AwsServiceExplorer categoryId="..." />`

## Categories (11)
| Page ID | Category | Services |
|---------|----------|----------|
| `aws-compute` | Compute | EC2, Lightsail, Elastic Beanstalk |
| `aws-storage` | Storage | S3, EBS, EFS, Glacier, Transfer Family |
| `aws-database` | Database | RDS, DynamoDB, Aurora, ElastiCache, DocumentDB, Redshift, Athena, OpenSearch |
| `aws-networking` | Networking | CloudFront, Route 53, VPC, ELB, API Gateway, Global Accelerator, Direct Connect |
| `aws-security` | Security | IAM, Cognito, Secrets Manager, KMS, WAF, ACM, Organizations |
| `aws-serverless` | Serverless | Lambda, Step Functions, EventBridge, SQS, SNS, Kinesis |
| `aws-containers` | Containers | ECS, Fargate, ECR, EKS |
| `aws-devtools` | Developer Tools | CodePipeline, CodeBuild, CloudFormation, CDK, SAM, CloudShell |
| `aws-ai-ml` | AI & ML | Bedrock, SageMaker, Rekognition, Polly, Transcribe, Textract |
| `aws-monitoring` | Monitoring | CloudWatch, CloudTrail, Systems Manager, X-Ray, Config, Backup |
| `aws-frontend` | Frontend & Web | Amplify, AppSync, SES, Pinpoint |

## Data files
Split by category in `src/data/awsDecodedData/`:
- `types.ts` — shared TypeScript interfaces
- `categories.ts` — category definitions with colors
- One file per category (`compute.ts`, `storage.ts`, etc.)
- `navigation.ts` — guide sections and start page data
- `index.ts` — barrel exports and combined lookups

## Component
`AwsServiceExplorer` (`src/components/mdx/aws-decoded/AwsServiceExplorer.tsx`) — takes a `categoryId` prop and renders all services in that category as expandable cards with detail, analogy, use cases, key terms, code examples, and pricing.

## Adding a new service
1. Add the `AwsService` object to the appropriate category file in `src/data/awsDecodedData/`
2. Add any new link registry entries to `src/data/linkRegistry/awsDecodedLinks.ts`
3. Optionally add glossary terms to `src/data/glossaryTerms/awsDecodedTerms.ts`
