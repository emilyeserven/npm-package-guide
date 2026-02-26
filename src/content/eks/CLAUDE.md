# AWS EKS — Guide CLAUDE.md

## Audience & Purpose

Engineers (frontend or backend) who want to understand Amazon EKS and Kubernetes on AWS. Each section includes interactive demos, practical YAML examples, and knowledge checks. No prior Kubernetes experience is assumed.

## Sections

| Page ID | Title | Key Topics |
|---------|-------|------------|
| `eks-overview` | What is EKS? | EKS vs self-hosted K8s, managed control plane |
| `eks-kubernetes` | Kubernetes Primer | Pods, Deployments, Services, pod lifecycle |
| `eks-architecture` | EKS Architecture | Control/data plane split, compute options |
| `eks-networking` | Networking | VPC CNI, ALB/NLB, ingress routing |
| `eks-scaling` | Scaling | HPA, Karpenter, KEDA, interactive scaling demo |
| `eks-deployments` | Deploying Apps | Deployment manifests, rolling/blue-green/canary |
| `eks-security` | Security & IAM | IRSA, Pod Identity, security layers |
| `eks-costs` | Cost & Tips | Pricing breakdown, when to use EKS |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `EksQuiz` | `quizId: string` | Thin wrapper around QuizBase; looks up questions from eksData by quiz ID |
| `EksComparisonTable` | *(none)* | EKS vs self-hosted feature comparison table |
| `EksConceptCards` | *(none)* | Grid of core K8s concept cards with accent colors |
| `EksPodLifecycle` | *(none)* | Auto-advancing stepper showing pod states |
| `EksArchitectureDiagram` | *(none)* | Hoverable grid of EKS architecture nodes |
| `EksScalingDemo` | *(none)* | Interactive +/- buttons for pods and nodes with capacity warning |
| `EksComputeOptions` | *(none)* | Tagged list of compute options (managed, Fargate, self-managed) |
| `EksDeployStrategies` | *(none)* | Grid of deployment strategies with emoji badges |
| `EksTrafficFlow` | *(none)* | Arrow-connected traffic flow from Internet to Pod |
| `EksSecurityLayers` | *(none)* | Color-coded security layer breakdown |
| `EksCostBreakdown` | *(none)* | Itemized cost rows with accent bars |
| `EksWhenToUse` | *(none)* | Two-column good-fit vs alternatives comparison |
| `EksScalingTools` | *(none)* | Vertical list of scaling tools with accent bars |

## Data Sources

All component data lives in `src/data/eksData.ts`. Components import data directly — no props needed for data lookup (except `EksQuiz` which takes a `quizId`).

## Guide-Specific Conventions

- **Quiz per section:** Most content pages end with `<EksQuiz quizId="..." />`. Quiz questions are defined in eksData as separate arrays per section.
- **Light/dark color pairs:** Every data item has both `color` (light mode) and `darkColor` (dark mode) fields. Components use `ds(item.color, item.darkColor, isDark)`.
- **Code examples:** Use shared `<CodeAccordion>` directly in MDX for YAML snippets. The raw YAML strings are also exported from eksData for reference.
