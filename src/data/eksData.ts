import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'
import type { QuizQuestion } from '../components/mdx/QuizBase'

// ── Types ─────────────────────────────────────────────────────────────

export interface EksArchNode {
  label: string
  items: string[]
  color: string
  darkColor: string
}

export interface EksPodStage {
  name: string
  color: string
  darkColor: string
  desc: string
}

export interface EksComparisonRow {
  feature: string
  eks: string
  selfHosted: string
}

export interface EksConceptCard {
  term: string
  def: string
  color: string
  darkColor: string
}

export interface EksScalingTool {
  name: string
  desc: string
  color: string
  darkColor: string
}

export interface EksComputeOption {
  name: string
  desc: string
  tag: string
  color: string
  darkColor: string
}

export interface EksSecurityLayer {
  layer: string
  items: string
  color: string
  darkColor: string
}

export interface EksCostRow {
  item: string
  cost: string
  note: string
  color: string
  darkColor: string
}

export interface EksDeployStrategy {
  name: string
  desc: string
  color: string
  darkColor: string
  emoji: string
}

export interface EksTrafficStep {
  label: string
  next: string
  color: string
  darkColor: string
}

// ── Architecture diagram data ────────────────────────────────────────

export const EKS_ARCH_NODES: EksArchNode[] = [
  { label: 'EKS Control Plane', items: ['API Server', 'etcd', 'Scheduler', 'Controller Mgr'], color: '#c2410c', darkColor: '#FF6B35' },
  { label: 'kubectl / CI', items: ['Your commands', 'Helm charts', 'ArgoCD'], color: '#a16207', darkColor: '#FFD166' },
  { label: 'Worker Node A', items: ['Pod: frontend', 'Pod: api-v2', 'kube-proxy'], color: '#047857', darkColor: '#06D6A0' },
  { label: 'Worker Node B', items: ['Pod: api-v1', 'Pod: worker', 'kube-proxy'], color: '#047857', darkColor: '#06D6A0' },
  { label: 'AWS Managed', items: ['Automatic upgrades', 'HA across 3 AZs', 'Managed etcd'], color: '#0369a1', darkColor: '#118AB2' },
  { label: 'VPC / Networking', items: ['ALB Ingress', 'VPC CNI plugin', 'Security Groups'], color: '#6b21a8', darkColor: '#7B2D8E' },
  { label: 'AWS Integrations', items: ['ECR (images)', 'IAM Roles for SA', 'CloudWatch'], color: '#be123c', darkColor: '#EF476F' },
]

// ── Pod lifecycle data ───────────────────────────────────────────────

export const EKS_POD_STAGES: EksPodStage[] = [
  { name: 'Pending', color: '#a16207', darkColor: '#FFD166', desc: 'Pod is accepted but containers haven\u2019t started. Scheduler is finding a node.' },
  { name: 'ContainerCreating', color: '#0369a1', darkColor: '#118AB2', desc: 'Node found! Pulling container images from ECR and starting up.' },
  { name: 'Running', color: '#047857', darkColor: '#06D6A0', desc: 'All containers are running. Readiness & liveness probes are active.' },
  { name: 'Terminating', color: '#be123c', darkColor: '#EF476F', desc: 'Pod received SIGTERM. Graceful shutdown in progress (default 30s).' },
  { name: 'Succeeded', color: '#6b21a8', darkColor: '#7B2D8E', desc: 'All containers exited with code 0. Pod is complete.' },
]

// ── Comparison data ──────────────────────────────────────────────────

export const EKS_COMPARISON_ROWS: EksComparisonRow[] = [
  { feature: 'Control Plane', eks: 'Fully AWS-managed', selfHosted: 'You manage it' },
  { feature: 'Upgrades', eks: 'Automated w/ managed nodes', selfHosted: 'Manual, risky' },
  { feature: 'etcd', eks: 'Managed, backed up', selfHosted: 'You operate it' },
  { feature: 'Scaling', eks: 'Karpenter / Cluster Autoscaler', selfHosted: 'Manual or custom' },
  { feature: 'IAM Integration', eks: 'Native (IRSA / Pod Identity)', selfHosted: 'DIY' },
  { feature: 'Networking', eks: 'VPC CNI (native IPs)', selfHosted: 'Flannel / Calico' },
  { feature: 'Cost', eks: '$0.10/hr + compute', selfHosted: 'Compute only' },
]

// ── Kubernetes concept cards ─────────────────────────────────────────

export const EKS_K8S_CONCEPTS: EksConceptCard[] = [
  { term: 'Pod', def: 'Smallest deployable unit. Usually wraps 1 container. Like a single process.', color: '#047857', darkColor: '#06D6A0' },
  { term: 'Deployment', def: 'Declares desired state: "run 3 replicas of my-app:v2". K8s makes it happen.', color: '#c2410c', darkColor: '#FF6B35' },
  { term: 'Service', def: 'Stable network endpoint for a set of pods. Load-balances between them.', color: '#0369a1', darkColor: '#118AB2' },
  { term: 'Ingress', def: 'Routes external HTTP traffic to services. Like an nginx config, but declarative.', color: '#6b21a8', darkColor: '#7B2D8E' },
  { term: 'Namespace', def: 'Virtual cluster inside a cluster. Isolates teams/environments (dev, staging, prod).', color: '#a16207', darkColor: '#FFD166' },
  { term: 'ConfigMap / Secret', def: 'Inject config and secrets into pods without baking them into images.', color: '#be123c', darkColor: '#EF476F' },
]

// ── Scaling tools ────────────────────────────────────────────────────

export const EKS_SCALING_TOOLS: EksScalingTool[] = [
  { name: 'HPA (Horizontal Pod Autoscaler)', desc: 'Scales pod replicas based on CPU, memory, or custom metrics. Built into Kubernetes.', color: '#047857', darkColor: '#06D6A0' },
  { name: 'VPA (Vertical Pod Autoscaler)', desc: 'Adjusts CPU/memory requests per pod. Good for right-sizing, but restarts pods.', color: '#a16207', darkColor: '#FFD166' },
  { name: 'Karpenter', desc: 'AWS\u2019s next-gen node autoscaler. Provisions the right instance type in seconds. Replaces Cluster Autoscaler.', color: '#c2410c', darkColor: '#FF6B35' },
  { name: 'KEDA', desc: 'Event-driven autoscaling. Scale based on queue depth, HTTP requests, cron schedules, or 50+ event sources.', color: '#6b21a8', darkColor: '#7B2D8E' },
]

// ── Compute options ──────────────────────────────────────────────────

export const EKS_COMPUTE_OPTIONS: EksComputeOption[] = [
  { name: 'Managed Node Groups', desc: 'EC2 instances managed by EKS. AWS handles provisioning, AMI updates, and draining. You pick instance types. Best default choice.', tag: 'RECOMMENDED', color: '#047857', darkColor: '#06D6A0' },
  { name: 'Fargate', desc: 'Serverless pods \u2014 no nodes at all. AWS runs each pod in its own micro-VM. Great for batch jobs and bursty workloads. Higher per-pod cost.', tag: 'SERVERLESS', color: '#0369a1', darkColor: '#118AB2' },
  { name: 'Self-Managed Nodes', desc: 'You launch and manage your own EC2 instances. Maximum control (custom AMIs, GPU, etc). Maximum responsibility.', tag: 'ADVANCED', color: '#a16207', darkColor: '#FFD166' },
]

// ── Deployment strategies ────────────────────────────────────────────

export const EKS_DEPLOY_STRATEGIES: EksDeployStrategy[] = [
  { name: 'Rolling Update', desc: 'Gradually replace old pods with new. Zero downtime. K8s default.', color: '#047857', darkColor: '#06D6A0', emoji: '\u{1F504}' },
  { name: 'Blue/Green', desc: 'Run old and new in parallel. Switch traffic instantly. Use with Argo Rollouts.', color: '#0369a1', darkColor: '#118AB2', emoji: '\u{1F535}' },
  { name: 'Canary', desc: 'Send 5% of traffic to new version. Gradually increase. Catch bugs early.', color: '#a16207', darkColor: '#FFD166', emoji: '\u{1F424}' },
]

// ── Security layers ──────────────────────────────────────────────────

export const EKS_SECURITY_LAYERS: EksSecurityLayer[] = [
  { layer: 'Network', items: 'VPC isolation, Security Groups, Network Policies', color: '#6b21a8', darkColor: '#7B2D8E' },
  { layer: 'Identity', items: 'IRSA / Pod Identity, RBAC, OIDC provider', color: '#047857', darkColor: '#06D6A0' },
  { layer: 'Workload', items: 'Pod Security Standards, seccomp, read-only rootfs', color: '#0369a1', darkColor: '#118AB2' },
  { layer: 'Data', items: 'EBS encryption, Secrets Manager, envelope encryption for etcd', color: '#c2410c', darkColor: '#FF6B35' },
  { layer: 'Audit', items: 'CloudTrail, K8s audit logs \u2192 CloudWatch', color: '#a16207', darkColor: '#FFD166' },
]

// ── Cost data ────────────────────────────────────────────────────────

export const EKS_COST_ROWS: EksCostRow[] = [
  { item: 'EKS Control Plane', cost: '$0.10/hr (~$73/mo)', note: 'Per cluster. Same regardless of size.', color: '#c2410c', darkColor: '#FF6B35' },
  { item: 'EC2 Managed Nodes', cost: 'Standard EC2 pricing', note: 't3.medium \u2248 $30/mo, m5.large \u2248 $70/mo', color: '#047857', darkColor: '#06D6A0' },
  { item: 'Fargate', cost: 'vCPU + memory per second', note: '~20\u201340% more expensive than EC2 for steady workloads', color: '#0369a1', darkColor: '#118AB2' },
  { item: 'Data Transfer', cost: 'Cross-AZ: $0.01/GB', note: 'Adds up fast with chatty microservices!', color: '#be123c', darkColor: '#EF476F' },
  { item: 'Load Balancers', cost: 'ALB \u2248 $16/mo + LCU', note: 'One ALB can serve many Ingress rules', color: '#a16207', darkColor: '#FFD166' },
]

// ── Traffic flow ─────────────────────────────────────────────────────

export const EKS_TRAFFIC_STEPS: EksTrafficStep[] = [
  { label: 'Internet', next: 'ALB / NLB', color: '#c2410c', darkColor: '#FF6B35' },
  { label: 'ALB / NLB', next: 'Ingress Controller', color: '#a16207', darkColor: '#FFD166' },
  { label: 'Ingress Controller', next: 'K8s Service', color: '#0369a1', darkColor: '#118AB2' },
  { label: 'K8s Service', next: 'Pod (your app)', color: '#047857', darkColor: '#06D6A0' },
]

// ── Quiz questions ───────────────────────────────────────────────────

export const EKS_OVERVIEW_QUIZ: QuizQuestion[] = [
  {
    q: 'What does EKS manage for you?',
    options: [
      'Your application containers',
      'The Kubernetes control plane (API server, etcd, scheduler)',
      'Your CI/CD pipeline',
      'Your Docker images',
    ],
    answer: 1,
    explanation: 'EKS manages the control plane \u2014 the brain of Kubernetes. Your apps, CI/CD, and Docker images are still your responsibility.',
  },
]

export const EKS_KUBERNETES_QUIZ: QuizQuestion[] = [
  {
    q: 'What Kubernetes resource provides a stable network endpoint for pods?',
    options: ['Deployment', 'Pod', 'Service', 'Ingress'],
    answer: 2,
    explanation: 'A Service provides a stable IP/DNS name that load-balances across matching pods. Deployments manage pod replicas, and Ingress routes external HTTP traffic.',
  },
]

export const EKS_ARCHITECTURE_QUIZ: QuizQuestion[] = [
  {
    q: 'Which EKS compute option requires zero node management?',
    options: ['Managed Node Groups', 'Self-Managed Nodes', 'Fargate', 'EC2 Auto Scaling Groups'],
    answer: 2,
    explanation: 'Fargate is fully serverless \u2014 no EC2 instances to manage at all. Each pod runs in an isolated micro-VM. Managed Node Groups still use EC2, but AWS handles lifecycle.',
  },
]

export const EKS_NETWORKING_QUIZ: QuizQuestion[] = [
  {
    q: 'What makes EKS networking unique compared to vanilla Kubernetes?',
    options: [
      'Pods share a single cluster IP',
      'The VPC CNI gives every pod a real VPC IP address',
      'EKS doesn\u2019t support load balancers',
      'Pods can\u2019t communicate with AWS services directly',
    ],
    answer: 1,
    explanation: 'The VPC CNI plugin assigns each pod a real ENI/IP from your VPC subnet. This means pods are first-class VPC citizens \u2014 security groups, VPC peering, and direct access to AWS services all work natively.',
  },
]

export const EKS_DEPLOYMENTS_QUIZ: QuizQuestion[] = [
  {
    q: 'What does a readiness probe do?',
    options: [
      'Restarts the container if it\u2019s unhealthy',
      'Prevents traffic from reaching the pod until it\u2019s ready to serve',
      'Scales the deployment up',
      'Checks if the Docker image exists',
    ],
    answer: 1,
    explanation: 'Readiness probes gate traffic \u2014 Kubernetes won\u2019t send requests to a pod until its readiness probe passes. Liveness probes restart unhealthy containers. They serve different purposes!',
  },
]

export const EKS_SECURITY_QUIZ: QuizQuestion[] = [
  {
    q: 'Why is IRSA preferred over attaching IAM roles to EC2 nodes?',
    options: [
      'It\u2019s faster',
      'It gives each pod a scoped role instead of sharing the node\u2019s permissions',
      'It\u2019s required by AWS',
      'It doesn\u2019t use IAM at all',
    ],
    answer: 1,
    explanation: 'IRSA (IAM Roles for Service Accounts) implements least privilege \u2014 each pod gets only the permissions it needs, rather than inheriting the broad permissions of the EC2 node role.',
  },
]

// ── Code examples ────────────────────────────────────────────────────

export const EKS_INGRESS_YAML = `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
spec:
  ingressClassName: alb
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80`

export const EKS_DEPLOYMENT_YAML = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # Add 1 extra pod during rollout
      maxUnavailable: 0    # Never drop below 3 running
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: 123456789.dkr.ecr.us-east-1.amazonaws.com/frontend:v2.1.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: 100m        # 0.1 CPU cores reserved
              memory: 128Mi    # 128 MB memory reserved
            limits:
              cpu: 500m
              memory: 256Mi
          readinessProbe:      # Don't send traffic until ready
            httpGet:
              path: /healthz
              port: 3000
            initialDelaySeconds: 5
          livenessProbe:       # Restart if this fails
            httpGet:
              path: /healthz
              port: 3000
            periodSeconds: 30`

export const EKS_IRSA_YAML = `# 1. Create an IAM role with a trust policy for the K8s service account
# 2. Annotate the service account:
apiVersion: v1
kind: ServiceAccount
metadata:
  name: frontend-sa
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789:role/FrontendS3ReadRole
# 3. Reference it in your deployment:
spec:
  template:
    spec:
      serviceAccountName: frontend-sa
      containers:
        - name: frontend
          # This pod can now call S3 APIs — no keys needed!`

// ── Navigation ────────────────────────────────────────────────────────

export const EKS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['eks-start'] },
  { label: 'Foundations', ids: ['eks-overview', 'eks-kubernetes'] },
  { label: 'Core Architecture', ids: ['eks-architecture', 'eks-networking'] },
  { label: 'Operations', ids: ['eks-scaling', 'eks-deployments'] },
  { label: 'Production', ids: ['eks-security', 'eks-costs'] },
]

// ── Start page ────────────────────────────────────────────────────────

export const EKS_START_PAGE_DATA: StartPageData = {
  subtitle: 'Architecture \u00B7 Networking \u00B7 Scaling \u00B7 Security \u2014 from zero to production on AWS EKS.',
  tip: 'Built for frontend and backend engineers who want to understand Kubernetes on AWS. Each section includes practical examples, interactive demos, and knowledge checks.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'What is EKS?',
      description:
        'Understand what EKS manages for you and how it compares to self-hosted Kubernetes.',
      jumpTo: 'eks-overview',
    },
    {
      type: 'bonus',
      title: 'Foundations',
      description:
        'Learn the core Kubernetes concepts and how EKS builds on top of them.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'eks-overview': 'What EKS is, what it manages, and how it compares to self-hosted K8s.',
        'eks-kubernetes': 'Core Kubernetes concepts: pods, deployments, services, and the pod lifecycle.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Architecture & Networking',
      description:
        'Explore the EKS architecture, compute options, and how networking works with VPC CNI.',
      jumpTo: 'eks-architecture',
    },
    {
      type: 'bonus',
      title: 'Core Architecture',
      description:
        'Deep dive into EKS cluster architecture and AWS-native networking.',
      sectionLabel: 'Core Architecture',
      subItemDescriptions: {
        'eks-architecture': 'Control plane vs data plane, managed node groups, Fargate, and compute choices.',
        'eks-networking': 'VPC CNI, load balancers, ingress routing, and service mesh options.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Scaling & Deployments',
      description:
        'Learn pod and node autoscaling, deployment strategies, and CI/CD patterns for EKS.',
      jumpTo: 'eks-scaling',
    },
    {
      type: 'bonus',
      title: 'Operations',
      description:
        'Master scaling, deployment strategies, and day-to-day EKS operations.',
      sectionLabel: 'Operations',
      subItemDescriptions: {
        'eks-scaling': 'HPA, Karpenter, KEDA \u2014 autoscaling pods and nodes.',
        'eks-deployments': 'Rolling updates, blue/green, canary, and deployment manifests.',
      },
    },
    {
      type: 'bonus',
      title: 'Production',
      description:
        'Security best practices, IAM integration, and cost optimization strategies.',
      sectionLabel: 'Production',
      subItemDescriptions: {
        'eks-security': 'IRSA, RBAC, network policies, and the security layer model.',
        'eks-costs': 'Pricing breakdown, when EKS makes sense, and cost optimization tips.',
      },
    },
  ],
}

export const EKS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'eks',
    icon: '\u2601\uFE0F',
    title: 'AWS EKS',
    startPageId: 'eks-start',
    description: 'Amazon EKS from zero to production \u2014 architecture, networking, scaling, deployments, and security for engineers learning Kubernetes on AWS.',
    category: 'infrastructure',
    sections: EKS_GUIDE_SECTIONS,
  },
  startPageData: EKS_START_PAGE_DATA,
}
