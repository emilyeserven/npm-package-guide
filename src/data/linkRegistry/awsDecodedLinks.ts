import type { RegistryLink } from './types'

export const awsDecodedLinks: RegistryLink[] = [
  // Compute
  { id: 'aws-ec2-docs', url: 'https://docs.aws.amazon.com/ec2/', label: 'Amazon EC2 Documentation', source: 'AWS', desc: 'Official documentation for Elastic Compute Cloud \u2014 virtual servers in the cloud.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-lightsail-docs', url: 'https://docs.aws.amazon.com/lightsail/', label: 'Amazon Lightsail Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  { id: 'aws-beanstalk-docs', url: 'https://docs.aws.amazon.com/elasticbeanstalk/', label: 'Elastic Beanstalk Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Storage
  { id: 'aws-s3-docs', url: 'https://docs.aws.amazon.com/s3/', label: 'Amazon S3 Documentation', source: 'AWS', desc: 'Official documentation for Simple Storage Service \u2014 scalable object storage.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-ebs-docs', url: 'https://docs.aws.amazon.com/ebs/', label: 'Amazon EBS Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  { id: 'aws-glacier-docs', url: 'https://docs.aws.amazon.com/amazonglacier/', label: 'S3 Glacier Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Database
  { id: 'aws-rds-docs', url: 'https://docs.aws.amazon.com/rds/', label: 'Amazon RDS Documentation', source: 'AWS', desc: 'Official documentation for Relational Database Service \u2014 managed SQL databases.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-dynamodb-docs', url: 'https://docs.aws.amazon.com/dynamodb/', label: 'Amazon DynamoDB Documentation', source: 'AWS', desc: 'Official documentation for DynamoDB \u2014 a fast, flexible NoSQL database.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-aurora-docs', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/', label: 'Amazon Aurora Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Networking
  { id: 'aws-cloudfront-docs', url: 'https://docs.aws.amazon.com/cloudfront/', label: 'Amazon CloudFront Documentation', source: 'AWS', desc: 'Official documentation for CloudFront CDN \u2014 global content delivery.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-route53-docs', url: 'https://docs.aws.amazon.com/route53/', label: 'Amazon Route 53 Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  { id: 'aws-vpc-docs', url: 'https://docs.aws.amazon.com/vpc/', label: 'Amazon VPC Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Security
  { id: 'aws-iam-docs', url: 'https://docs.aws.amazon.com/iam/', label: 'AWS IAM Documentation', source: 'AWS', desc: 'Official documentation for Identity and Access Management \u2014 permissions and security.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-cognito-docs', url: 'https://docs.aws.amazon.com/cognito/', label: 'Amazon Cognito Documentation', source: 'AWS', desc: 'Official documentation for Cognito \u2014 user authentication for your apps.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-waf-docs', url: 'https://docs.aws.amazon.com/waf/', label: 'AWS WAF Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Serverless
  { id: 'aws-lambda-docs', url: 'https://docs.aws.amazon.com/lambda/', label: 'AWS Lambda Documentation', source: 'AWS', desc: 'Official documentation for Lambda \u2014 serverless compute that runs your code without managing servers.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-sqs-docs', url: 'https://docs.aws.amazon.com/sqs/', label: 'Amazon SQS Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  { id: 'aws-eventbridge-docs', url: 'https://docs.aws.amazon.com/eventbridge/', label: 'Amazon EventBridge Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Containers
  { id: 'aws-ecs-docs', url: 'https://docs.aws.amazon.com/ecs/', label: 'Amazon ECS Documentation', source: 'AWS', desc: 'Official documentation for Elastic Container Service \u2014 run Docker containers at scale.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-fargate-docs', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html', label: 'AWS Fargate Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  { id: 'aws-eks-docs', url: 'https://docs.aws.amazon.com/eks/', label: 'Amazon EKS Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Dev Tools
  { id: 'aws-cloudformation-docs', url: 'https://docs.aws.amazon.com/cloudformation/', label: 'AWS CloudFormation Documentation', source: 'AWS', desc: 'Official documentation for CloudFormation \u2014 infrastructure as code with YAML/JSON templates.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-cdk-docs', url: 'https://docs.aws.amazon.com/cdk/', label: 'AWS CDK Documentation', source: 'AWS', desc: 'Official documentation for the Cloud Development Kit \u2014 define infrastructure in TypeScript, Python, etc.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-codepipeline-docs', url: 'https://docs.aws.amazon.com/codepipeline/', label: 'AWS CodePipeline Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // AI/ML
  { id: 'aws-bedrock-docs', url: 'https://docs.aws.amazon.com/bedrock/', label: 'Amazon Bedrock Documentation', source: 'AWS', desc: 'Official documentation for Bedrock \u2014 access foundation models (Claude, Llama, Titan) via API.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-sagemaker-docs', url: 'https://docs.aws.amazon.com/sagemaker/', label: 'Amazon SageMaker Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  { id: 'aws-rekognition-docs', url: 'https://docs.aws.amazon.com/rekognition/', label: 'Amazon Rekognition Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Monitoring
  { id: 'aws-cloudwatch-docs', url: 'https://docs.aws.amazon.com/cloudwatch/', label: 'Amazon CloudWatch Documentation', source: 'AWS', desc: 'Official documentation for CloudWatch \u2014 monitoring, logging, and alarms for AWS resources.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-cloudtrail-docs', url: 'https://docs.aws.amazon.com/cloudtrail/', label: 'AWS CloudTrail Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  { id: 'aws-xray-docs', url: 'https://docs.aws.amazon.com/xray/', label: 'AWS X-Ray Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // Frontend & Web
  { id: 'aws-amplify-docs', url: 'https://docs.amplify.aws/', label: 'AWS Amplify Documentation', source: 'AWS', desc: 'Official documentation for Amplify \u2014 full-stack framework for frontend and mobile developers.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-appsync-docs', url: 'https://docs.aws.amazon.com/appsync/', label: 'AWS AppSync Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  { id: 'aws-ses-docs', url: 'https://docs.aws.amazon.com/ses/', label: 'Amazon SES Documentation', source: 'AWS', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'] },
  // General
  { id: 'aws-free-tier', url: 'https://aws.amazon.com/free/', label: 'AWS Free Tier', source: 'AWS', desc: 'Overview of all AWS services with free tier offerings \u2014 many services include generous always-free tiers.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
  { id: 'aws-well-architected', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/', label: 'AWS Well-Architected Framework', source: 'AWS', desc: 'Best practices for designing reliable, secure, efficient, and cost-optimized cloud architectures.', tags: ['docs', 'free', 'aws', 'guide:aws-decoded'], resourceCategory: 'AWS Documentation' },
]
