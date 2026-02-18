import type { GlossaryCategory } from './index'

export const awsDecodedGlossary: GlossaryCategory[] = [
  {
    category: 'AWS \u2014 Core Infrastructure',
    terms: [
      {
        term: 'EC2 Instance',
        definition: 'A virtual machine (server) running in AWS. You choose the OS, CPU, RAM, and pay by the hour or second. The most fundamental AWS compute service.',
        linkId: 'aws-ec2-docs',
        sectionId: 'aws-compute',
        guides: ['aws-decoded'],
      },
      {
        term: 'S3 Bucket',
        definition: 'A container in Amazon S3 that holds objects (files). Each bucket has a globally unique name and can store unlimited data. Used for static hosting, backups, and user uploads.',
        linkId: 'aws-s3-docs',
        sectionId: 'aws-storage',
        guides: ['aws-decoded'],
      },
      {
        term: 'IAM Role',
        definition: 'A set of permissions that can be assumed by AWS services, users, or applications. Roles follow the principle of least privilege \u2014 granting only the minimum permissions needed.',
        linkId: 'aws-iam-docs',
        sectionId: 'aws-security',
        guides: ['aws-decoded'],
      },
      {
        term: 'VPC (Virtual Private Cloud)',
        definition: 'A logically isolated network within AWS where you launch resources. You define subnets (public and private), route tables, and security groups to control traffic.',
        linkId: 'aws-vpc-docs',
        sectionId: 'aws-networking',
        guides: ['aws-decoded'],
      },
      {
        term: 'CloudFront Distribution',
        definition: 'A CDN deployment that caches your content at 400+ edge locations worldwide. Sits between users and your origin (S3, EC2) to reduce latency and offload traffic.',
        linkId: 'aws-cloudfront-docs',
        sectionId: 'aws-networking',
        guides: ['aws-decoded'],
      },
    ],
  },
  {
    category: 'AWS \u2014 Serverless & Containers',
    terms: [
      {
        term: 'Lambda Function',
        definition: 'A serverless compute unit that runs your code in response to events (API calls, file uploads, timers). You pay only for the milliseconds of execution \u2014 no idle server costs.',
        linkId: 'aws-lambda-docs',
        sectionId: 'aws-serverless',
        guides: ['aws-decoded'],
      },
      {
        term: 'Cold Start',
        definition: 'The delay that occurs when AWS Lambda creates a new execution environment for your function. Typically 100\u2013500ms for Node.js. Subsequent invocations reuse the "warm" container.',
        linkId: 'aws-lambda-docs',
        sectionId: 'aws-serverless',
        guides: ['aws-decoded'],
      },
      {
        term: 'Fargate',
        definition: 'A serverless compute engine for Docker containers. You specify CPU and memory, and AWS provisions the infrastructure \u2014 no EC2 instances to manage.',
        linkId: 'aws-fargate-docs',
        sectionId: 'aws-containers',
        guides: ['aws-decoded'],
      },
      {
        term: 'Task Definition (ECS)',
        definition: 'A JSON blueprint for running containers on ECS. Specifies the Docker image, CPU/memory, ports, environment variables, and logging configuration.',
        linkId: 'aws-ecs-docs',
        sectionId: 'aws-containers',
        guides: ['aws-decoded'],
      },
    ],
  },
  {
    category: 'AWS \u2014 Developer Tools & AI',
    terms: [
      {
        term: 'CloudFormation Stack',
        definition: 'A deployed collection of AWS resources defined in a YAML/JSON template. CloudFormation creates resources in dependency order and can roll back on failure.',
        linkId: 'aws-cloudformation-docs',
        sectionId: 'aws-devtools',
        guides: ['aws-decoded'],
      },
      {
        term: 'CDK Construct',
        definition: 'A reusable building block in the AWS Cloud Development Kit. Constructs represent one or more AWS resources and can be composed together using TypeScript, Python, or Java.',
        linkId: 'aws-cdk-docs',
        sectionId: 'aws-devtools',
        guides: ['aws-decoded'],
      },
      {
        term: 'Amazon Bedrock',
        definition: 'A managed service for accessing foundation models (Claude, Llama, Titan) via API. No GPU management required \u2014 just call the API with a prompt and get a response.',
        linkId: 'aws-bedrock-docs',
        sectionId: 'aws-ai-ml',
        guides: ['aws-decoded'],
      },
      {
        term: 'RAG (Retrieval Augmented Generation)',
        definition: 'A pattern where relevant documents are retrieved from a knowledge base and included in the AI model\u2019s prompt. Improves accuracy by grounding responses in specific data.',
        linkId: 'aws-bedrock-docs',
        sectionId: 'aws-ai-ml',
        guides: ['aws-decoded'],
      },
    ],
  },
]
