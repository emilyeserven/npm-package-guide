import type { RegistryLink } from './types'

export const eksLinks: RegistryLink[] = [
  // ── EKS Core ──────────────────────────────────────────────────────────
  {
    id: 'eks-docs',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/',
    label: 'EKS User Guide',
    source: 'AWS',
    desc: 'Official Amazon EKS documentation and user guide',
    tags: ['docs', 'free', 'guide:eks'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'eks-getting-started',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html',
    label: 'Getting Started with EKS',
    source: 'AWS',
    desc: 'Step-by-step guide to create your first EKS cluster',
    tags: ['docs', 'free', 'guide:eks'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'eks-architecture-doc',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/eks-architecture.html',
    label: 'EKS Architecture',
    source: 'AWS',
    desc: 'Overview of EKS cluster architecture \u2014 control plane and data plane',
    tags: ['docs', 'free', 'guide:eks'],
  },
  // ── Compute ───────────────────────────────────────────────────────────
  {
    id: 'eks-managed-nodes',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html',
    label: 'Managed Node Groups',
    source: 'AWS',
    desc: 'Create and manage EC2 node groups for EKS with automated lifecycle',
    tags: ['docs', 'free', 'guide:eks'],
  },
  {
    id: 'eks-fargate',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/fargate.html',
    label: 'AWS Fargate on EKS',
    source: 'AWS',
    desc: 'Run Kubernetes pods on serverless Fargate \u2014 no node management',
    tags: ['docs', 'free', 'guide:eks'],
  },
  // ── Networking ────────────────────────────────────────────────────────
  {
    id: 'eks-vpc-cni',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/pod-networking.html',
    label: 'VPC CNI Plugin',
    source: 'AWS',
    desc: 'Amazon VPC CNI plugin that assigns real VPC IPs to pods',
    tags: ['docs', 'free', 'guide:eks'],
  },
  {
    id: 'eks-load-balancer',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html',
    label: 'AWS Load Balancer Controller',
    source: 'AWS',
    desc: 'Automatically provision ALBs and NLBs for Kubernetes Ingress and Service resources',
    tags: ['docs', 'free', 'guide:eks'],
  },
  // ── Scaling ───────────────────────────────────────────────────────────
  {
    id: 'eks-karpenter',
    url: 'https://karpenter.sh/docs/',
    label: 'Karpenter Documentation',
    source: 'Karpenter',
    desc: 'Fast, flexible Kubernetes node autoscaler for AWS',
    tags: ['docs', 'free', 'guide:eks'],
    resourceCategory: 'Official Documentation',
  },
  // ── Deployments ───────────────────────────────────────────────────────
  {
    id: 'eks-ecr',
    url: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html',
    label: 'Amazon ECR',
    source: 'AWS',
    desc: 'Fully managed container registry for storing and deploying Docker images',
    tags: ['docs', 'free', 'guide:eks'],
  },
  // ── Security ──────────────────────────────────────────────────────────
  {
    id: 'eks-irsa',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html',
    label: 'IAM Roles for Service Accounts',
    source: 'AWS',
    desc: 'Assign scoped IAM roles to Kubernetes pods via IRSA',
    tags: ['docs', 'free', 'guide:eks'],
  },
  {
    id: 'eks-pod-identity',
    url: 'https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html',
    label: 'EKS Pod Identity',
    source: 'AWS',
    desc: 'Simplified alternative to IRSA for assigning IAM roles to pods',
    tags: ['docs', 'free', 'guide:eks'],
  },
  {
    id: 'eks-security-practices',
    url: 'https://docs.aws.amazon.com/eks/latest/best-practices/security.html',
    label: 'EKS Security Best Practices',
    source: 'AWS',
    desc: 'Comprehensive security guidance for EKS clusters',
    tags: ['docs', 'free', 'guide:eks'],
    resourceCategory: 'Official Documentation',
  },
  // ── Cost ──────────────────────────────────────────────────────────────
  {
    id: 'eks-pricing',
    url: 'https://aws.amazon.com/eks/pricing/',
    label: 'EKS Pricing',
    source: 'AWS',
    desc: 'EKS control plane and compute pricing details',
    tags: ['docs', 'free', 'guide:eks'],
  },
]
