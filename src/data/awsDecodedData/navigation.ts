import type { GuideSection, StartPageData, GuideManifest } from '../guideTypes'

export const AWS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['aws-start'] },
  {
    label: 'Core Infrastructure',
    ids: ['aws-compute', 'aws-storage', 'aws-database', 'aws-networking'],
  },
  {
    label: 'Security & Identity',
    ids: ['aws-security'],
  },
  {
    label: 'Modern Architectures',
    ids: ['aws-serverless', 'aws-containers'],
  },
  {
    label: 'Developer Experience',
    ids: ['aws-devtools', 'aws-ai-ml', 'aws-monitoring', 'aws-frontend'],
  },
]

export const AWS_START_PAGE_DATA: StartPageData = {
  subtitle: 'Every AWS service explained like you\'re a frontend engineer who just learned what a server is.',
  tip: 'Each category page lets you expand any service to see its full explanation, frontend analogy, use cases, key terms, and pricing.',
  headingText: '\u2601\uFE0F 62 Services. 11 Categories. 0 Buzzwords Required.',
  headingDescription: 'No jargon walls. No gatekeeping. Just clear, practical explanations with analogies you\'ll actually remember.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Core Infrastructure',
      description: 'The foundational services that run your apps \u2014 virtual machines, file storage, databases, and networking.',
      sectionLabel: 'Core Infrastructure',
      subItemDescriptions: {
        'aws-compute': 'EC2, Lightsail, Elastic Beanstalk \u2014 where your code actually runs',
        'aws-storage': 'S3, EBS, EFS, Glacier \u2014 where your files live',
        'aws-database': 'RDS, DynamoDB, Aurora, ElastiCache \u2014 where your data is structured',
        'aws-networking': 'CloudFront, Route 53, VPC, load balancers \u2014 how traffic flows',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Security & Identity',
      description: 'Who can do what in your AWS account \u2014 IAM, user auth, secrets, encryption, and firewalls.',
      sectionLabel: 'Security & Identity',
      subItemDescriptions: {
        'aws-security': 'IAM, Cognito, Secrets Manager, KMS, WAF, ACM, Organizations',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Modern Architectures',
      description: 'Serverless functions, event-driven patterns, and container orchestration.',
      sectionLabel: 'Modern Architectures',
      subItemDescriptions: {
        'aws-serverless': 'Lambda, Step Functions, EventBridge, SQS, SNS, Kinesis',
        'aws-containers': 'ECS, Fargate, ECR, EKS \u2014 Docker on AWS',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Developer Experience',
      description: 'CI/CD pipelines, infrastructure-as-code, AI/ML APIs, monitoring, and frontend-friendly tools.',
      sectionLabel: 'Developer Experience',
      subItemDescriptions: {
        'aws-devtools': 'CodePipeline, CloudFormation, CDK, SAM \u2014 deploy and manage infrastructure',
        'aws-ai-ml': 'Bedrock, SageMaker, Rekognition, Polly, Transcribe \u2014 AI APIs you can call today',
        'aws-monitoring': 'CloudWatch, CloudTrail, X-Ray, Systems Manager \u2014 see what\'s happening',
        'aws-frontend': 'Amplify, AppSync, SES, Pinpoint \u2014 built for frontend developers',
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
    description: 'Every AWS service explained like you\u2019re a frontend engineer who just learned what a server is \u2014 62 services, 11 categories, zero buzzwords.',
    category: 'infrastructure',
    dateCreated: '2026-02-18',
    dateModified: '2026-02-26',
    sections: AWS_GUIDE_SECTIONS,
  },
  startPageData: AWS_START_PAGE_DATA,
}
