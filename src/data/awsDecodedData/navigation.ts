import type { GuideSection, StartPageData, GuideManifest } from '../guideTypes'

export const AWS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['aws-start'] },
  {
    label: 'Compute',
    ids: ['aws-compute', 'aws-ec2', 'aws-lightsail', 'aws-elastic-beanstalk'],
  },
  {
    label: 'Storage',
    ids: ['aws-storage', 'aws-s3', 'aws-ebs', 'aws-efs', 'aws-s3-glacier', 'aws-transfer-family'],
  },
  {
    label: 'Database',
    ids: ['aws-database', 'aws-rds', 'aws-dynamodb', 'aws-aurora', 'aws-elasticache', 'aws-documentdb', 'aws-redshift', 'aws-athena', 'aws-opensearch'],
  },
  {
    label: 'Networking',
    ids: ['aws-networking', 'aws-cloudfront', 'aws-route53', 'aws-vpc', 'aws-elb', 'aws-api-gateway', 'aws-global-accelerator', 'aws-direct-connect'],
  },
  {
    label: 'Security & Identity',
    ids: ['aws-security', 'aws-iam', 'aws-cognito', 'aws-secrets-manager', 'aws-kms', 'aws-waf', 'aws-certificate-manager', 'aws-organizations'],
  },
  {
    label: 'Serverless',
    ids: ['aws-serverless', 'aws-lambda', 'aws-step-functions', 'aws-eventbridge', 'aws-sqs', 'aws-sns', 'aws-kinesis'],
  },
  {
    label: 'Containers',
    ids: ['aws-containers', 'aws-ecs', 'aws-fargate', 'aws-ecr', 'aws-eks'],
  },
  {
    label: 'Developer Tools',
    ids: ['aws-devtools', 'aws-codepipeline', 'aws-codebuild', 'aws-cloudformation', 'aws-cdk', 'aws-sam', 'aws-cloudshell'],
  },
  {
    label: 'AI & Machine Learning',
    ids: ['aws-ai-ml', 'aws-bedrock', 'aws-sagemaker', 'aws-rekognition', 'aws-polly', 'aws-transcribe', 'aws-textract'],
  },
  {
    label: 'Monitoring & Management',
    ids: ['aws-monitoring', 'aws-cloudwatch', 'aws-cloudtrail', 'aws-systems-manager', 'aws-x-ray', 'aws-config', 'aws-backup'],
  },
  {
    label: 'Frontend & Web',
    ids: ['aws-frontend', 'aws-amplify', 'aws-appsync', 'aws-ses', 'aws-pinpoint'],
  },
]

export const AWS_START_PAGE_DATA: StartPageData = {
  subtitle: 'Every AWS service explained like you\'re a frontend engineer who just learned what a server is.',
  tip: 'Each service has its own dedicated page with deep explanations, code examples, CLI commands, gotchas, and links to related guides.',
  headingText: '\u2601\uFE0F 62 Services. 11 Categories. Deep Dives on Every One.',
  headingDescription: 'No jargon walls. No gatekeeping. Just clear, practical explanations with analogies you\'ll actually remember.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Core Infrastructure',
      description: 'The foundational services that run your apps \u2014 virtual machines, file storage, databases, and networking.',
      sectionLabel: 'Compute',
      subItemDescriptions: {
        'aws-compute': '3 services \u2014 EC2, Lightsail, Elastic Beanstalk',
        'aws-storage': '5 services \u2014 S3, EBS, EFS, Glacier, Transfer Family',
        'aws-database': '8 services \u2014 RDS, DynamoDB, Aurora, ElastiCache, and more',
        'aws-networking': '7 services \u2014 CloudFront, Route 53, VPC, load balancers, and more',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Security & Identity',
      description: 'Who can do what in your AWS account \u2014 IAM, user auth, secrets, encryption, and firewalls.',
      sectionLabel: 'Security & Identity',
      subItemDescriptions: {
        'aws-security': '7 services \u2014 IAM, Cognito, Secrets Manager, KMS, WAF, ACM, Organizations',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Modern Architectures',
      description: 'Serverless functions, event-driven patterns, and container orchestration.',
      sectionLabel: 'Serverless',
      subItemDescriptions: {
        'aws-serverless': '6 services \u2014 Lambda, Step Functions, EventBridge, SQS, SNS, Kinesis',
        'aws-containers': '4 services \u2014 ECS, Fargate, ECR, EKS',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Developer Experience',
      description: 'CI/CD pipelines, infrastructure-as-code, AI/ML APIs, monitoring, and frontend-friendly tools.',
      sectionLabel: 'Developer Tools',
      subItemDescriptions: {
        'aws-devtools': '6 services \u2014 CodePipeline, CloudFormation, CDK, SAM, and more',
        'aws-ai-ml': '6 services \u2014 Bedrock, SageMaker, Rekognition, Polly, Transcribe, Textract',
        'aws-monitoring': '6 services \u2014 CloudWatch, CloudTrail, X-Ray, Systems Manager, and more',
        'aws-frontend': '4 services \u2014 Amplify, AppSync, SES, Pinpoint',
      },
    },
  ],
  relatedGuides: ['s3-storage', 'kubernetes', 'ci-cd', 'ai-infra'],
}

export const AWS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'aws-decoded',
    icon: '☁️',
    title: 'AWS Decoded',
    startPageId: 'aws-start',
    description: 'Every AWS service explained like you\u2019re a frontend engineer who just learned what a server is \u2014 62 services with dedicated deep-dive pages, code examples, and cross-links to related guides.',
    category: 'infrastructure',
    dateCreated: '2026-02-18',
    dateModified: '2026-02-27',
    sections: AWS_GUIDE_SECTIONS,
  },
  startPageData: AWS_START_PAGE_DATA,
}
