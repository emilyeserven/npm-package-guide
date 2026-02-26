import type { GlossaryCategory } from './types'

export const eksGlossary: GlossaryCategory[] = [
  {
    category: 'AWS EKS',
    terms: [
      {
        term: 'Amazon EKS',
        definition:
          'Elastic Kubernetes Service \u2014 AWS\u2019s managed Kubernetes offering. Runs the control plane (API server, etcd, scheduler) across multiple AZs so you don\u2019t have to operate it.',
        linkId: 'eks-docs',
        sectionId: 'eks-overview',
        guides: ['eks'],
      },
      {
        term: 'EKS Control Plane',
        definition:
          'The managed brain of the cluster: API server, etcd database, scheduler, and controller manager. AWS patches, scales, and backs it up. You never SSH into it.',
        linkId: 'eks-architecture-doc',
        sectionId: 'eks-architecture',
        guides: ['eks'],
      },
      {
        term: 'Managed Node Group',
        definition:
          'EC2 instances whose lifecycle is managed by EKS \u2014 provisioning, AMI updates, and graceful draining during upgrades. The recommended default compute option.',
        linkId: 'eks-managed-nodes',
        sectionId: 'eks-architecture',
        guides: ['eks'],
      },
      {
        term: 'Fargate (EKS)',
        definition:
          'Serverless compute for EKS. Each pod runs in its own micro-VM with no EC2 nodes to manage. Best for batch jobs and bursty workloads.',
        linkId: 'eks-fargate',
        sectionId: 'eks-architecture',
        guides: ['eks'],
      },
      {
        term: 'VPC CNI',
        definition:
          'The Amazon VPC Container Network Interface plugin. Assigns every pod a real VPC IP address, making pods first-class VPC citizens with native security group and peering support.',
        linkId: 'eks-vpc-cni',
        sectionId: 'eks-networking',
        guides: ['eks'],
      },
      {
        term: 'AWS Load Balancer Controller',
        definition:
          'A Kubernetes controller that automatically provisions Application Load Balancers (ALB) or Network Load Balancers (NLB) when you create Ingress or Service resources.',
        linkId: 'eks-load-balancer',
        sectionId: 'eks-networking',
        guides: ['eks'],
      },
      {
        term: 'Karpenter',
        definition:
          'AWS\u2019s next-generation Kubernetes node autoscaler. Provisions optimally-sized EC2 instances in seconds based on pending pod requirements. Replaces the older Cluster Autoscaler.',
        linkId: 'eks-karpenter',
        sectionId: 'eks-scaling',
        guides: ['eks'],
      },
      {
        term: 'IRSA',
        definition:
          'IAM Roles for Service Accounts \u2014 maps Kubernetes service accounts to IAM roles via OIDC federation. Gives each pod scoped permissions without sharing the node\u2019s IAM role.',
        linkId: 'eks-irsa',
        sectionId: 'eks-security',
        guides: ['eks'],
      },
      {
        term: 'EKS Pod Identity',
        definition:
          'A simplified alternative to IRSA for granting IAM permissions to pods. No OIDC provider setup required \u2014 configured directly through EKS APIs.',
        linkId: 'eks-pod-identity',
        sectionId: 'eks-security',
        guides: ['eks'],
      },
      {
        term: 'Amazon ECR',
        definition:
          'Elastic Container Registry \u2014 a fully managed Docker image registry integrated with EKS. Store, scan, and deploy container images without managing registry infrastructure.',
        linkId: 'eks-ecr',
        sectionId: 'eks-deployments',
        guides: ['eks'],
      },
    ],
  },
]
