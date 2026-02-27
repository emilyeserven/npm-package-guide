import type { AwsService } from './types'

export const DEVTOOLS_SERVICES: AwsService[] = [
  {
    id: 'codepipeline',
    name: 'CodePipeline',
    fullName: 'AWS CodePipeline',
    cat: 'devtools',
    level: 'intermediate',
    icon: '\u{1F504}',
    short: 'Automated CI/CD pipelines. Automatically build, test, and deploy your code when you push changes.',
    analogy: 'A factory assembly line \u2014 raw materials (code) go in one end, finished products (deployed apps) come out the other, automatically.',
    detail: 'CodePipeline orchestrates your release process. You define stages: Source (pull from GitHub/CodeCommit), Build (run tests, compile), and Deploy (push to ECS, S3, Lambda, etc.). Each stage can use AWS tools (CodeBuild, CodeDeploy) or third-party tools (Jenkins, GitHub Actions).',
    useCases: [
      'Automating deployments on git push',
      'Multi-stage release pipelines',
      'Approval gates before production deploys',
    ],
    keyTerms: {
      Stage: 'A step in the pipeline (Source \u2192 Build \u2192 Deploy)',
      Action: 'A specific task within a stage',
      Artifact: 'Output from one stage that feeds into the next (e.g., a build zip)',
    },
    pricing: 'Free tier: 1 active pipeline/month. After: $1/active pipeline/month.',
    howItWorks: `CodePipeline operates as a state machine that moves your code through a series of stages. When a source event triggers the pipeline (a git push, an S3 upload, or a manual click), the pipeline creates an "execution" that progresses through each stage sequentially. Each stage contains one or more actions that run either in sequence or in parallel within that stage. If any action fails, the entire execution halts at that stage and you get notified.

Under the hood, artifacts are stored in an S3 bucket that CodePipeline manages. When a Source action pulls your code, it zips it into an artifact and stores it in S3. The next stage (Build) downloads that artifact, processes it, and can produce its own output artifact. This artifact-passing mechanism is how data flows between stages — if you're used to GitHub Actions where everything happens in the same runner, think of artifacts as the explicit handoff between different runners.

CodePipeline V2 (the current default) supports triggers with filtering — you can configure it to only run when specific branches are pushed, or when specific file paths change. This is a big deal for monorepos where you don't want every push to trigger every pipeline. V2 also supports pipeline-level variables that you can pass between stages, making dynamic workflows much easier.`,
    gotchas: [
      'Artifacts are stored in S3 and encrypted with KMS by default — if you use a custom KMS key, every service in the pipeline needs kms:Decrypt permission or builds will fail with cryptic access denied errors.',
      'CodePipeline V1 and V2 have different pricing models and feature sets. V2 is $1/month per pipeline but adds filtering and variables. V1 is being phased out but existing pipelines won\'t auto-migrate — check which version you\'re on.',
      'Pipeline executions are superseded by default — if a new commit triggers a pipeline while a previous execution is still running, the old one gets replaced. This can be surprising if you expected both to complete. Use execution mode "QUEUED" in V2 to process them in order.',
      'Cross-region actions (e.g., deploying to us-west-2 from a pipeline in us-east-1) require an artifact bucket in each region. CloudFormation handles this for you, but manual setups often miss it and get confusing errors.',
    ],
    whenNotToUse: [
      'Simple projects where GitHub Actions or GitLab CI is already working fine — CodePipeline adds AWS-specific complexity without significant benefit if your builds don\'t interact heavily with AWS services.',
      'Highly dynamic workflows that need conditional branching logic within a single run — CodePipeline stages are linear. Use Step Functions for complex orchestration or GitHub Actions with matrix strategies.',
      'Teams that need fast iteration on pipeline config — CodePipeline changes take 30-60 seconds to propagate, whereas a GitHub Actions YAML change takes effect on the next push. The feedback loop is slower.',
    ],
    relatedServices: ['codebuild', 'cloudformation', 'cdk', 's3', 'iam', 'lambda', 'ecs', 'sns'],
    relatedGuides: ['ci-cd'],
    cliExample: `# Create a simple pipeline from a JSON definition
aws codepipeline create-pipeline \\
  --cli-input-json file://pipeline.json

# List all pipelines in the account
aws codepipeline list-pipelines

# Manually trigger a pipeline execution
aws codepipeline start-pipeline-execution \\
  --name my-frontend-pipeline

# Get the current state of a pipeline (which stage is running)
aws codepipeline get-pipeline-state \\
  --name my-frontend-pipeline`,
    cdkExample: `import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

// Create a pipeline that builds and deploys a React app
const pipeline = new codepipeline.Pipeline(this, 'FrontendPipeline', {
  pipelineName: 'react-app-deploy',
  pipelineType: codepipeline.PipelineType.V2,
});

const sourceOutput = new codepipeline.Artifact();
const buildOutput = new codepipeline.Artifact();

// Source: pull from GitHub on push to main
pipeline.addStage({
  stageName: 'Source',
  actions: [
    new codepipeline_actions.GitHubSourceAction({
      actionName: 'GitHub',
      owner: 'my-org',
      repo: 'react-app',
      branch: 'main',
      oauthToken: cdk.SecretValue.secretsManager('github-token'),
      output: sourceOutput,
    }),
  ],
});

// Build: run npm install + npm run build
pipeline.addStage({
  stageName: 'Build',
  actions: [
    new codepipeline_actions.CodeBuildAction({
      actionName: 'Build',
      project: new codebuild.PipelineProject(this, 'BuildProject'),
      input: sourceOutput,
      outputs: [buildOutput],
    }),
  ],
});`,
    code: `# Example pipeline.json for a frontend app
{
  "pipeline": {
    "name": "react-app-pipeline",
    "roleArn": "arn:aws:iam::role/codepipeline-role",
    "stages": [
      {
        "name": "Source",
        "actions": [{
          "name": "GitHub",
          "actionTypeId": {
            "category": "Source",
            "owner": "ThirdParty",
            "provider": "GitHub",
            "version": "1"
          }
        }]
      },
      {
        "name": "Build",
        "actions": [{
          "name": "CodeBuild",
          "actionTypeId": {
            "category": "Build",
            "owner": "AWS",
            "provider": "CodeBuild",
            "version": "1"
          }
        }]
      }
    ]
  }
}`,
  },
  {
    id: 'codebuild',
    name: 'CodeBuild',
    fullName: 'AWS CodeBuild',
    cat: 'devtools',
    level: 'intermediate',
    icon: '\u{1F3D7}\uFE0F',
    short: 'A managed build service. Compiles code, runs tests, and produces deployment packages. Like GitHub Actions runners, but on AWS.',
    analogy: 'A construction crew you hire per job \u2014 they show up, build what you need, clean up, and leave.',
    detail: 'CodeBuild spins up a build environment (a container), runs your build commands (npm install, npm test, npm run build), and produces artifacts. You don\'t manage servers. It reads a buildspec.yml file in your repo that defines what to do.',
    useCases: [
      'Running tests on every commit',
      'Building Docker images',
      'Compiling and packaging applications',
    ],
    keyTerms: {
      'buildspec.yml': 'A YAML file that defines build commands',
      'Build Environment': 'The Docker image used for building (Ubuntu, Amazon Linux, etc.)',
    },
    pricing: 'Free tier: 100 build minutes/month. After: ~$0.005/build minute for small instances.',
    code: '# buildspec.yml example\nversion: 0.2\nphases:\n  install:\n    commands:\n      - npm ci\n  build:\n    commands:\n      - npm test\n      - npm run build\nartifacts:\n  files:\n    - \'build/**/*\'',
    howItWorks: `CodeBuild works by launching a fresh Docker container for each build. When triggered (by CodePipeline, a webhook, or manually), it pulls your source code, downloads the specified build image (AWS provides managed images for most languages, or you can use your own Docker image), and runs the phases defined in your buildspec.yml. The phases run in order: install, pre_build, build, post_build. If any phase fails, subsequent phases are skipped (except post_build's "finally" block, which always runs — great for cleanup or notifications).

Environment variables are a core part of CodeBuild. You can set them in the project configuration, in the buildspec, or pull them from SSM Parameter Store and Secrets Manager at build time. This is how you inject API keys, database URLs, and other secrets into your build without hardcoding them. For frontend builds, you'll typically map these to your app's env vars (e.g., REACT_APP_API_URL or VITE_API_URL) in the build phase.

Caching is CodeBuild's secret weapon for faster builds. You can cache the node_modules directory (or pip packages, Maven dependencies, etc.) in S3, so subsequent builds skip the slow dependency installation step. For a typical React app, this can cut build time from 3 minutes to under 1 minute. You configure this in the buildspec's "cache" section with a "paths" list pointing to your dependency directories.`,
    gotchas: [
      'The default compute type (BUILD_GENERAL1_SMALL) has only 3 GB of memory — large frontend builds with many dependencies can run out of memory and fail with cryptic "killed" messages. Bump to MEDIUM (7 GB) for anything non-trivial.',
      'Build logs go to CloudWatch Logs by default, but the log group isn\'t auto-created — your CodeBuild service role needs logs:CreateLogGroup, logs:CreateLogStream, and logs:PutLogEvents permissions. Missing these causes silent log failures, not build failures.',
      'Docker-in-Docker (building Docker images inside CodeBuild) requires "privileged" mode to be enabled on the project. This is a checkbox in the console or "privilegedMode: true" in CloudFormation. Without it, docker build commands fail with permission errors.',
      'The buildspec.yml version must be "0.2" (a string, not a number). Writing "version: 0.2" in YAML produces a float, which works. But "version: 2" is wrong and causes a confusing "invalid buildspec" error. Always quote it as version: "0.2" to be safe.',
    ],
    whenNotToUse: [
      'Quick CI checks on pull requests where GitHub Actions already integrates seamlessly — CodeBuild requires extra webhook configuration and doesn\'t natively post status checks to PRs without additional setup.',
      'Builds that need persistent state between runs (like incremental compilation) — CodeBuild containers are ephemeral. Each build starts fresh. Use EC2 or a self-hosted runner if incremental builds are critical.',
      'Simple static site builds that services like Amplify or Vercel handle out of the box — CodeBuild requires you to configure the entire build environment, caching, and deployment yourself.',
    ],
    relatedServices: ['codepipeline', 's3', 'ecr', 'iam', 'cloudwatch', 'secrets-manager'],
    relatedGuides: ['ci-cd'],
    cliExample: `# Create a build project
aws codebuild create-project \\
  --name my-frontend-build \\
  --source type=GITHUB,location=https://github.com/org/repo \\
  --artifacts type=S3,location=my-build-bucket \\
  --environment type=LINUX_CONTAINER,computeType=BUILD_GENERAL1_SMALL,image=aws/codebuild/amazonlinux2-x86_64-standard:5.0

# Start a build manually
aws codebuild start-build --project-name my-frontend-build

# Watch build logs in real time
aws codebuild batch-get-builds \\
  --ids my-frontend-build:build-id

# List recent builds for a project
aws codebuild list-builds-for-project \\
  --project-name my-frontend-build --sort-order DESCENDING`,
    cdkExample: `import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3 from 'aws-cdk-lib/aws-s3';

const artifactBucket = new s3.Bucket(this, 'ArtifactBucket');

// Create a build project for a React/Vite frontend
const project = new codebuild.Project(this, 'FrontendBuild', {
  projectName: 'react-app-build',
  source: codebuild.Source.gitHub({
    owner: 'my-org',
    repo: 'react-app',
    webhookFilters: [
      codebuild.FilterGroup.inEventOf(
        codebuild.EventAction.PUSH
      ).andBranchIs('main'),
    ],
  }),
  environment: {
    buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
    computeType: codebuild.ComputeType.MEDIUM,
  },
  cache: codebuild.Cache.local(
    codebuild.LocalCacheMode.CUSTOM
  ),
  buildSpec: codebuild.BuildSpec.fromObject({
    version: '0.2',
    phases: {
      install: { commands: ['npm ci'] },
      build: { commands: ['npm test', 'npm run build'] },
    },
    artifacts: { files: ['dist/**/*'] },
    cache: { paths: ['node_modules/**/*'] },
  }),
  artifacts: codebuild.Artifacts.s3({
    bucket: artifactBucket,
    includeBuildId: false,
    packageZip: true,
  }),
});`,
  },
  {
    id: 'cloudformation',
    name: 'CloudFormation',
    fullName: 'AWS CloudFormation',
    cat: 'devtools',
    level: 'intermediate',
    icon: '\u{1F4D0}',
    short: 'Infrastructure as Code (IaC). Define your entire AWS infrastructure in JSON/YAML templates, and deploy it all at once.',
    analogy: 'Blueprints for a building \u2014 hand the architect (CloudFormation) a blueprint, and they construct everything to spec. Tear it down and rebuild identically anytime.',
    detail: 'CloudFormation lets you define AWS resources (EC2 instances, S3 buckets, Lambda functions, databases) in a template file. When you deploy the template, CloudFormation creates all resources in the right order, handles dependencies, and can roll back if something fails. This is "Infrastructure as Code" \u2014 your infrastructure is version-controlled and reproducible.',
    useCases: [
      'Reproducible environments (dev/staging/prod from same template)',
      'Automated infrastructure deployment',
      'Disaster recovery (rebuild everything from a template)',
    ],
    keyTerms: {
      Stack: 'A deployed instance of a template',
      Template: 'The JSON/YAML file defining resources',
      'Drift Detection': 'Checking if actual resources differ from the template',
    },
    pricing: 'Free for AWS resources. Charges only for the resources you create.',
    howItWorks: `CloudFormation works by parsing your template (YAML or JSON), building a dependency graph of all resources, and then creating or updating them in the correct order. When you create a stack, CloudFormation determines that an S3 bucket must exist before the Lambda function that references it, that an IAM role must be ready before the ECS task definition that uses it, and so on. This dependency resolution is automatic when you use Ref and GetAtt intrinsic functions to link resources together.

Updates are where CloudFormation really shines — and where it can bite you. When you modify a template and update a stack, CloudFormation computes a "changeset" that shows exactly what will be created, modified, or deleted. Some property changes trigger an in-place update (like changing an S3 bucket policy), others trigger a replacement (like changing a DynamoDB table's partition key, which destroys and recreates the table). Always review changesets before executing them. The update types are documented per-resource in the AWS docs, and the consequences range from "seamless" to "data loss."

Rollback behavior is automatic by default. If any resource fails to create during a stack operation, CloudFormation rolls back all changes to the previous known-good state. While this is generally great, it can be painful for debugging because the failed resources get deleted before you can inspect them. You can disable rollback (--disable-rollback) during development to keep the failed resources around for investigation, but never do this in production.`,
    gotchas: [
      'CloudFormation templates have a 1 MB size limit (51,200 bytes for direct upload, 1 MB from S3). Large templates with many resources hit this fast. Use nested stacks or CDK to break things up.',
      'Changing a resource\'s logical ID (the key name in the template) causes CloudFormation to delete the old resource and create a new one — even if the physical resource is identical. This can cause data loss for stateful resources like databases or S3 buckets. Use DeletionPolicy: Retain as a safety net.',
      'Stack updates that fail leave the stack in UPDATE_ROLLBACK_FAILED state, which is one of the most painful states in all of AWS. You can\'t update, delete, or do much of anything. The fix usually involves skipping the problematic resources with --continue-update-rollback and --resources-to-skip.',
      'The !Ref and !GetAtt intrinsic functions behave differently for every resource type. For example, !Ref on an S3 bucket returns the bucket name, but !Ref on an EC2 instance returns the instance ID. Always check the docs for the specific resource type.',
    ],
    whenNotToUse: [
      'Rapid prototyping where you need to iterate quickly — CloudFormation deployments take minutes (sometimes 15-30 min for complex stacks), making the feedback loop painful. Use the console or CLI for exploration, then codify in CloudFormation once you\'re confident.',
      'Managing resources that already exist and were created outside CloudFormation — while "import" exists, it\'s clunky and limited. Terraform\'s import workflow is more mature for brownfield adoption.',
      'Cross-cloud or hybrid deployments — CloudFormation is AWS-only. If you need to manage infrastructure across AWS, GCP, and Azure, use Terraform or Pulumi instead.',
    ],
    relatedServices: ['cdk', 'sam', 's3', 'iam', 'cloudtrail', 'sns'],
    relatedGuides: [],
    cliExample: `# Deploy a stack from a template file
aws cloudformation create-stack \\
  --stack-name frontend-infra \\
  --template-body file://template.yaml \\
  --capabilities CAPABILITY_IAM

# Preview what changes an update will make (create a changeset)
aws cloudformation create-change-set \\
  --stack-name frontend-infra \\
  --change-set-name my-changes \\
  --template-body file://template.yaml

# Check stack status and events
aws cloudformation describe-stack-events \\
  --stack-name frontend-infra

# Delete a stack (tears down all resources)
aws cloudformation delete-stack --stack-name frontend-infra`,
    cdkExample: `// You typically don't use CDK to create CloudFormation resources,
// because CDK IS the layer on top of CloudFormation.
// But here's how to include a raw CloudFormation template (escape hatch):
import * as cdk from 'aws-cdk-lib';

// Include an existing CloudFormation template as a nested stack
const nested = new cdk.CfnInclude(this, 'LegacyTemplate', {
  templateFile: 'legacy-template.yaml',
});

// Access resources from the included template
const bucket = nested.getResource('MyBucket') as cdk.aws_s3.CfnBucket;

// You can also use CfnResource for raw CloudFormation in CDK
new cdk.CfnResource(this, 'CustomResource', {
  type: 'AWS::S3::Bucket',
  properties: {
    BucketName: 'my-raw-cfn-bucket',
    VersioningConfiguration: { Status: 'Enabled' },
  },
});`,
    code: `# CloudFormation template: S3 bucket + CloudFront for a React SPA
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  SiteBucket:
    Type: AWS::S3::Bucket
    Properties:
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: index.html  # SPA fallback

  CDN:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt SiteBucket.DomainName
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: ''
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
        DefaultRootObject: index.html
        Enabled: true

Outputs:
  BucketName:
    Value: !Ref SiteBucket
  CDNUrl:
    Value: !GetAtt CDN.DomainName`,
  },
  {
    id: 'cdk',
    name: 'CDK',
    fullName: 'Cloud Development Kit',
    cat: 'devtools',
    level: 'intermediate',
    icon: '\u{1F9F1}',
    short: 'Define cloud infrastructure using real programming languages (TypeScript, Python, Java) instead of YAML. Compiles down to CloudFormation.',
    analogy: 'If CloudFormation is writing blueprints by hand, CDK is using a 3D modeling program that generates blueprints for you.',
    detail: 'CDK lets you define infrastructure using familiar languages. Instead of writing 200 lines of YAML, you write 20 lines of TypeScript. CDK "synthesizes" your code into CloudFormation templates. It includes high-level "constructs" that bundle best practices \u2014 e.g., a single line can create a Lambda + API Gateway + IAM role with correct permissions.',
    useCases: [
      'Teams that prefer TypeScript/Python over YAML',
      'Complex infrastructure with loops, conditions, and abstractions',
      'Sharing reusable infrastructure patterns',
    ],
    keyTerms: {
      Construct: 'A building block representing one or more AWS resources',
      Stack: 'A deployable unit of infrastructure',
      Synthesize: 'Converting CDK code to a CloudFormation template',
    },
    pricing: 'Free. You pay for the resources deployed.',
    code: '// CDK: Create an S3 bucket + CloudFront in TypeScript\nimport * as cdk from \'aws-cdk-lib\';\nimport * as s3 from \'aws-cdk-lib/aws-s3\';\nimport * as cf from \'aws-cdk-lib/aws-cloudfront\';\n\nconst bucket = new s3.Bucket(this, \'Site\');\nnew cf.Distribution(this, \'CDN\', {\n  defaultBehavior: { origin: new origins.S3Origin(bucket) },\n});',
    howItWorks: `CDK operates in three layers: constructs, stacks, and apps. An app contains one or more stacks, each stack maps to a CloudFormation stack, and each stack contains constructs. Constructs come in three levels: L1 (raw CloudFormation resources prefixed with "Cfn", like CfnBucket), L2 (opinionated wrappers with sensible defaults, like Bucket), and L3 (patterns that combine multiple resources, like LambdaRestApi which creates a Lambda + API Gateway + IAM role in one line). As a frontend engineer, you'll mostly use L2 and L3 constructs.

When you run "cdk synth," CDK executes your TypeScript (or Python, etc.) code and produces a CloudFormation template in the cdk.out directory. This is the "synthesis" step. Then "cdk deploy" takes that template and deploys it via CloudFormation. The key insight: your CDK code runs at synthesis time, not deploy time. This means you can use loops, conditionals, and string interpolation — but you can't read runtime values (like a database connection string that doesn't exist yet). For runtime values, you use CloudFormation tokens (Lazy values) that resolve during deployment.

CDK's most powerful feature for teams is the construct library pattern. You can create a custom L3 construct — say, "FrontendHosting" — that bundles an S3 bucket, CloudFront distribution, Route 53 record, ACM certificate, and CI/CD pipeline. Publish it to npm or your private registry, and every team in your org gets production-grade frontend hosting with a single import. This is how platform teams scale infrastructure standards across dozens of microservices.`,
    gotchas: [
      'CDK bootstrapping is required once per account/region before your first deploy. Run "cdk bootstrap" — it creates an S3 bucket and IAM roles that CDK needs. Forgetting this gives a confusing "CDKToolkit stack not found" error.',
      'Changing a construct\'s ID (the first string argument, like "Site" in new Bucket(this, "Site")) triggers resource replacement, just like changing a logical ID in CloudFormation. This can delete your S3 bucket or database. Treat construct IDs as immutable.',
      'CDK version mismatches between aws-cdk-lib and the CLI cause subtle bugs. Pin both to the same version in package.json and install the CLI locally (npx cdk deploy) rather than relying on a global install.',
      'The "cdk diff" command only compares synthesized templates — it doesn\'t detect drift from manual console changes. Always run "cdk diff" before "cdk deploy" to preview changes, but also check for drift if your team ever touches the console.',
    ],
    whenNotToUse: [
      'Small, one-off infrastructure (a single S3 bucket, a single Lambda) where a 10-line CloudFormation template or a console click is faster than setting up a CDK project with TypeScript tooling, compilation, and bootstrapping.',
      'Teams without TypeScript/Python experience — CDK adds a programming language layer on top of AWS complexity. If your team struggles with async/await, adding CDK constructs and tokens on top will compound confusion.',
      'Environments where CloudFormation is explicitly banned or where Terraform is the organizational standard — CDK generates CloudFormation, so it inherits all of CloudFormation\'s limitations (deployment speed, state management, resource support lag).',
    ],
    relatedServices: ['cloudformation', 'sam', 's3', 'lambda', 'iam', 'codepipeline'],
    relatedGuides: [],
    cliExample: `# Initialize a new CDK project with TypeScript
cdk init app --language typescript

# Synthesize (generate CloudFormation template without deploying)
cdk synth

# Preview what changes will be deployed
cdk diff

# Deploy the stack to your AWS account
cdk deploy --require-approval broadening

# Destroy all resources created by the stack
cdk destroy`,
    cdkExample: `import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

// Full-featured static site hosting stack
const siteBucket = new s3.Bucket(this, 'SiteBucket', {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});

const distribution = new cloudfront.Distribution(this, 'CDN', {
  defaultBehavior: {
    origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
  },
  defaultRootObject: 'index.html',
  // SPA: return index.html for all 404s (client-side routing)
  errorResponses: [{
    httpStatus: 404,
    responseHttpStatus: 200,
    responsePagePath: '/index.html',
  }],
});

// Auto-deploy built assets to S3 and invalidate CloudFront
new s3deploy.BucketDeployment(this, 'Deploy', {
  sources: [s3deploy.Source.asset('./dist')],
  destinationBucket: siteBucket,
  distribution,
  distributionPaths: ['/*'],
});`,
  },
  {
    id: 'sam',
    name: 'SAM',
    fullName: 'Serverless Application Model',
    cat: 'devtools',
    level: 'intermediate',
    icon: '\u{1F43F}\uFE0F',
    short: 'A framework for building serverless apps. Simplifies defining Lambda functions, APIs, and databases in a template.',
    analogy: 'A recipe card specifically for serverless dishes \u2014 fewer ingredients (config) needed than the full cookbook (CloudFormation).',
    detail: 'SAM is a CloudFormation extension that adds shorthand syntax for serverless resources. Instead of 50+ lines of CloudFormation to define a Lambda + API Gateway, SAM does it in ~10 lines. It includes a local development tool (sam local) that simulates Lambda on your machine for testing.',
    useCases: [
      'Building serverless APIs',
      'Local testing of Lambda functions',
      'Deploying serverless applications',
    ],
    keyTerms: {
      'SAM Template': 'A simplified CloudFormation template with serverless shortcuts',
      'sam local': 'CLI tool to run Lambda locally',
      'AWS::Serverless::Function': 'SAM resource type for Lambda',
    },
    pricing: 'Free. You pay for the resources deployed.',
    howItWorks: `SAM is built on top of CloudFormation — it's literally a "transform" macro. When you deploy a SAM template, AWS CloudFormation sees the "Transform: AWS::Serverless-2016-10-31" header and expands your shorthand SAM resources into full CloudFormation resources before processing. A single AWS::Serverless::Function with an Api event source expands into a Lambda function, an API Gateway REST API, a stage, a deployment, a method, an IAM role, and a permission — easily 100+ lines of CloudFormation generated from 10 lines of SAM. This means everything you know about CloudFormation (stacks, changesets, rollbacks) applies to SAM too.

The "sam local" tools are where SAM really differentiates itself for frontend developers building fullstack serverless apps. "sam local start-api" launches a local HTTP server that mimics API Gateway, routing requests to your Lambda functions running in Docker containers. "sam local invoke" runs a single function with a test event. This means you can develop your API locally, hit it from your React dev server with fetch(), and iterate without deploying to AWS. The local environment reads your template to understand routes, environment variables, and function configurations.

SAM Accelerate ("sam sync") is the newer, faster deployment mode that bypasses CloudFormation for code-only changes. Instead of creating a CloudFormation changeset (which takes minutes), it directly updates Lambda function code and API Gateway routes in seconds. Use "sam sync --watch" during development for a hot-reload-like experience where saving a file triggers an immediate deployment. Use regular "sam deploy" for infrastructure changes and production deployments.`,
    gotchas: [
      'SAM local requires Docker running on your machine. If Docker isn\'t installed or the daemon isn\'t running, "sam local" commands fail immediately. On macOS with Docker Desktop, make sure the whale icon is active in your menu bar.',
      'SAM templates must include "Transform: AWS::Serverless-2016-10-31" at the top level, or your serverless resource types (AWS::Serverless::Function) will be treated as unknown and rejected by CloudFormation. This is the most common "my template won\'t deploy" issue.',
      'sam local doesn\'t perfectly replicate AWS — IAM permissions aren\'t enforced, VPC networking doesn\'t apply, and some services (SQS, EventBridge) can\'t be locally simulated. Your function may work locally but fail in AWS due to missing permissions. Always test in a dev AWS environment too.',
      'The SAM CLI and the AWS CLI are separate tools. Installing one doesn\'t install the other. "sam deploy" uses its own packaged CloudFormation client, but "sam local generate-event" requires the AWS CLI for some event templates. Install both.',
    ],
    whenNotToUse: [
      'Complex infrastructure that goes beyond serverless resources — SAM\'s shorthand only covers Lambda, API Gateway, DynamoDB, SQS, SNS, Step Functions, and a few others. For EC2, ECS, RDS, or VPC resources, you\'ll need raw CloudFormation or CDK mixed in, which defeats the simplicity.',
      'Teams already invested in CDK — CDK can do everything SAM does (including local testing with SAM CLI) while offering the full power of a programming language. Running both CDK and SAM side-by-side creates confusion about which tool manages what.',
      'Frontend-only static sites with no API — SAM is designed for serverless backends. If you just need to deploy a React app to S3 + CloudFront with no Lambda functions, use CDK, Amplify, or plain CloudFormation instead.',
    ],
    relatedServices: ['lambda', 'api-gateway', 'cloudformation', 'dynamodb', 'step-functions', 's3'],
    relatedGuides: [],
    cliExample: `# Initialize a new SAM project from a template
sam init --runtime nodejs20.x --app-template hello-world

# Start a local API Gateway for development
sam local start-api --port 3001

# Invoke a single function locally with a test event
sam local invoke MyFunction --event events/test.json

# Deploy to AWS (guided mode prompts for config)
sam deploy --guided

# Sync code changes to AWS in real-time (dev only)
sam sync --watch --stack-name my-api-dev`,
    cdkExample: `// You can use SAM CLI for local testing of CDK-defined Lambdas!
// First, define infrastructure in CDK:
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

const table = new dynamodb.Table(this, 'Items', {
  partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});

const handler = new lambda.Function(this, 'ApiHandler', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('lambda'),
  environment: {
    TABLE_NAME: table.tableName,
  },
});

table.grantReadWriteData(handler);

new apigateway.LambdaRestApi(this, 'Api', {
  handler,
  proxy: true,
});

// Then test locally: cdk synth && sam local start-api -t cdk.out/Stack.template.json`,
    code: `# SAM template.yaml: API with Lambda + DynamoDB
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    Runtime: nodejs20.x
    Timeout: 10

Resources:
  ApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/index.handler
      Events:
        GetItems:
          Type: Api
          Properties:
            Path: /items
            Method: get
        CreateItem:
          Type: Api
          Properties:
            Path: /items
            Method: post
      Environment:
        Variables:
          TABLE_NAME: !Ref ItemsTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref ItemsTable

  ItemsTable:
    Type: AWS::Serverless::SimpleTable
    Properties:
      PrimaryKey:
        Name: id
        Type: String`,
  },
  {
    id: 'cloudshell',
    name: 'CloudShell',
    fullName: 'AWS CloudShell',
    cat: 'devtools',
    level: 'beginner',
    icon: '\u{1F4BB}',
    short: 'A browser-based shell pre-configured with AWS CLI and common tools. Run AWS commands without installing anything.',
    analogy: 'A fully equipped workshop that appears in your browser \u2014 all the tools are already on the workbench.',
    detail: 'CloudShell gives you a Linux terminal directly in the AWS console. It comes pre-installed with AWS CLI, Python, Node.js, and other common tools. Your home directory persists (1 GB) between sessions. It\'s free and great for quick tasks, exploration, and learning.',
    useCases: [
      'Running quick AWS CLI commands',
      'Learning and experimenting with AWS',
      'Scripts that don\'t need a full development environment',
    ],
    keyTerms: {
      'Persistent Storage': '1 GB of storage that survives between sessions',
    },
    pricing: 'Free.',
    howItWorks: `CloudShell launches an Amazon Linux 2023 environment in a managed container that runs in the same region you've selected in the AWS console. The critical convenience: it automatically authenticates you with the IAM credentials of whatever user or role you're currently logged in as. There's no "aws configure" step, no access keys to manage, and no credential files to create. If you can see the CloudShell icon in the console, you can immediately run "aws s3 ls" and it just works. This makes it far simpler than setting up the AWS CLI on your local machine.

The environment comes pre-loaded with a surprising amount of tooling: AWS CLI v2, Python 3, Node.js (LTS), npm, pip, git, jq, vim, and even Docker (in some regions). You can install additional tools with pip, npm, or by downloading binaries to your home directory. The home directory (/home/cloudshell-user) provides 1 GB of persistent storage that survives across sessions — but the rest of the filesystem is ephemeral. Anything you install outside of $HOME (like system packages via yum) disappears when the session ends (after ~20 minutes of inactivity).

CloudShell supports file upload and download directly through the browser — no SCP or S3 needed. You can upload a script from your laptop, run it, and download the output. It also supports multiple tabs (up to 10 concurrent sessions), split panes, and safe paste (it warns you before pasting multi-line commands that could be dangerous). For teams, this means anyone with console access can immediately run operational scripts without any local setup — great for incident response when your laptop isn't configured.`,
    gotchas: [
      'CloudShell sessions time out after ~20 minutes of inactivity. Any running processes (like a long AWS CLI operation or a script) will be terminated. For long-running tasks, use EC2, Lambda, or Step Functions instead.',
      'CloudShell inherits your console IAM permissions exactly — it cannot escalate privileges. If your IAM user can\'t create EC2 instances, CloudShell can\'t either. This also means CloudShell won\'t work at all if your IAM policy explicitly denies cloudshell:CreateEnvironment.',
      'The 1 GB persistent storage limit is per-region. If you switch regions, you get a fresh home directory. Files you created in us-east-1 aren\'t available in eu-west-1. This catches people who store scripts in one region and then wonder where they went.',
      'Some organizations disable CloudShell via Service Control Policies (SCPs) for security reasons. If the CloudShell icon is grayed out or you get an access denied error, check with your AWS admin — it\'s likely an org-level policy, not a permission you can fix yourself.',
    ],
    whenNotToUse: [
      'Any development workflow that requires more than quick scripting — CloudShell has no IDE, limited storage, and sessions timeout. Use a real development environment (local machine, Cloud9, or VS Code Remote) for actual coding work.',
      'Running processes that take more than 20 minutes — CloudShell will kill them on timeout. Use EC2 with a tmux/screen session, or better yet, design long-running work as Lambda functions or Step Functions workflows.',
      'Storing sensitive data or credentials — while the home directory persists, CloudShell environments are shared infrastructure. Don\'t store SSH private keys, API tokens, or other secrets there. Use Secrets Manager or SSM Parameter Store.',
    ],
    relatedServices: ['iam', 'systems-manager', 'cloudtrail'],
    relatedGuides: ['shell-scripting'],
    cliExample: `# CloudShell is pre-authenticated — just start running commands:

# List your S3 buckets
aws s3 ls

# Check which identity you're using
aws sts get-caller-identity

# Quickly explore a service (e.g., list all Lambda functions)
aws lambda list-functions --query 'Functions[].FunctionName' --output table

# Install a tool for your session (persists in $HOME)
npm install -g aws-cdk
pip install boto3

# Upload/download files via the Actions menu in the CloudShell toolbar`,
    cdkExample: `// CloudShell itself isn't a resource you deploy with CDK.
// But you can control who can use it via IAM:
import * as iam from 'aws-cdk-lib/aws-iam';

// Grant a role access to use CloudShell
const devRole = new iam.Role(this, 'DevRole', {
  assumedBy: new iam.AccountPrincipal(this.account),
});

devRole.addToPolicy(new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: [
    'cloudshell:CreateEnvironment',
    'cloudshell:GetEnvironmentStatus',
    'cloudshell:StartEnvironment',
    'cloudshell:PutCredentials',
  ],
  resources: ['*'],
}));

// Or deny CloudShell access for a restricted role
const restrictedRole = new iam.Role(this, 'RestrictedRole', {
  assumedBy: new iam.AccountPrincipal(this.account),
});

restrictedRole.addToPolicy(new iam.PolicyStatement({
  effect: iam.Effect.DENY,
  actions: ['cloudshell:*'],
  resources: ['*'],
}));`,
    code: `# Useful CloudShell scripts for frontend engineers

# Quick check: what's in my S3 website bucket?
aws s3 ls s3://my-react-app-bucket --recursive --human-readable

# Invalidate CloudFront cache after a manual deploy
aws cloudfront create-invalidation \\
  --distribution-id E1234567890 \\
  --paths "/*"

# Check if your Lambda@Edge function has errors
aws logs tail /aws/lambda/us-east-1.my-edge-fn --since 1h

# Download your app's environment config from Parameter Store
aws ssm get-parameters-by-path \\
  --path "/myapp/prod/" \\
  --with-decryption \\
  --query "Parameters[].{Name:Name,Value:Value}" \\
  --output table`,
  },
]
