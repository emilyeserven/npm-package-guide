import type { GuideSection, StartPageData } from './guideTypes'

// ── Types ─────────────────────────────────────────────────────────────

export interface K8sAnalogy {
  frontend: string
  infra: string
  explain: string
}

export interface K8sConcept {
  term: string
  def: string
}

export interface K8sCodeExample {
  title: string
  code: string
}

export interface K8sFlowStep {
  step: string
  label: string
  detail: string
  color: string
  darkColor: string
}

export interface K8sSection {
  id: string
  icon: string
  title: string
  subtitle: string
  frontend: string
  infra: string
  analogy?: K8sAnalogy
  concepts?: K8sConcept[]
  codeExample?: K8sCodeExample
  flow?: K8sFlowStep[]
  keyTakeaway: string
}

// ── Section data ──────────────────────────────────────────────────────

export const K8S_SECTIONS: K8sSection[] = [
  {
    id: 'big-picture',
    icon: '\u{1F5FA}\uFE0F', // 🗺️
    title: 'The Big Picture',
    subtitle: 'Why does any of this exist?',
    frontend:
      'You write React code \u2192 npm run build \u2192 static files. Done. But what about the API your app talks to?',
    infra:
      'Backend services need to run somewhere reliable, scale up when traffic spikes, restart when they crash, and update without downtime. That\u2019s what this whole ecosystem solves.',
    analogy: {
      frontend: 'npm / package.json',
      infra: 'Kubernetes / Helm Charts',
      explain:
        'Just like npm manages your JS dependencies and scripts, Kubernetes manages your running services, and Helm packages up the config to deploy them.',
    },
    keyTakeaway:
      'Kubernetes is an orchestrator \u2014 it keeps your apps running, healthy, and scaled. Helm is the package manager that makes deploying to Kubernetes repeatable.',
  },
  {
    id: 'containers',
    icon: '\u{1F4E6}', // 📦
    title: 'Containers & Docker',
    subtitle: 'The foundation everything runs on',
    frontend:
      'You know how node_modules gives you a reproducible dependency tree? Containers do that for an entire application environment.',
    infra:
      'A container packages your app code + its runtime + dependencies + OS libraries into one portable unit. Docker is the tool that builds and runs containers.',
    analogy: {
      frontend: 'node_modules + .nvmrc + package-lock.json',
      infra: 'Docker container image',
      explain:
        'A container is like shipping your entire laptop config \u2014 Node version, OS, everything \u2014 so it runs identically everywhere. No more \u201Cworks on my machine.\u201D',
    },
    keyTakeaway:
      'Containers = portable, reproducible app environments. Docker builds them. They\u2019re the atoms of modern infrastructure.',
  },
  {
    id: 'kubernetes',
    icon: '\u2638\uFE0F', // ☸️
    title: 'Kubernetes (K8s)',
    subtitle: 'The orchestrator',
    frontend:
      'If Docker is like Vite (builds things), Kubernetes is like your hosting platform \u2014 Vercel, Netlify \u2014 but for backend services, and way more powerful.',
    infra:
      'Kubernetes manages WHERE your containers run, HOW MANY copies, WHEN to restart them, and HOW traffic reaches them. It\u2019s a container orchestration platform.',
    analogy: {
      frontend: 'Vercel / Netlify (hosting + scaling + routing)',
      infra: 'Kubernetes cluster',
      explain:
        'Vercel auto-scales your frontend, gives you URLs, handles deploys. K8s does the same for any containerized app \u2014 but you configure everything yourself.',
    },
    keyTakeaway:
      'Kubernetes = \u201CI want 3 copies of my API running, auto-restart if one crashes, and route traffic to all of them.\u201D K8s makes it happen.',
    concepts: [
      {
        term: 'Cluster',
        def: 'A set of machines (nodes) that Kubernetes manages. Like a server farm. You usually don\u2019t touch individual machines.',
      },
      {
        term: 'Node',
        def: 'One machine in the cluster. Can be physical or virtual (like an EC2 instance). Runs your containers.',
      },
      {
        term: 'Pod',
        def: 'The smallest unit in K8s \u2014 a wrapper around one or more containers. Think of it like a single process. Usually 1 pod = 1 container.',
      },
      {
        term: 'Deployment',
        def: 'Tells K8s: \u201CRun 3 pods of my API, and if one dies, replace it.\u201D Manages rollouts and scaling. This is what you\u2019ll interact with most.',
      },
      {
        term: 'Service',
        def: 'A stable network address for a set of pods. Pods come and go (they\u2019re ephemeral), but a Service gives them a consistent URL \u2014 like a load balancer.',
      },
      {
        term: 'Namespace',
        def: 'Like folders for organizing resources. You might have \u201Cdev\u201D, \u201Cstaging\u201D, \u201Cprod\u201D namespaces in one cluster.',
      },
      {
        term: 'Ingress',
        def: 'Routes external HTTP traffic into your cluster \u2014 like configuring routes in your app\u2019s router, but for the whole cluster.',
      },
    ],
  },
  {
    id: 'yaml',
    icon: '\u{1F4DD}', // 📝
    title: 'K8s YAML Configs',
    subtitle: 'Infrastructure as code',
    frontend:
      'You know how package.json declares your project config? K8s uses YAML files to declare what should be running.',
    infra:
      'Everything in Kubernetes is defined declaratively in YAML files. You say \u201CI want this state\u201D and K8s makes it happen.',
    analogy: {
      frontend: 'package.json + vercel.json + .env files',
      infra: 'Kubernetes YAML manifests',
      explain:
        'Instead of clicking buttons in a dashboard, you write YAML files that describe your desired infrastructure state. K8s continuously works to match reality to your declaration.',
    },
    keyTakeaway:
      'K8s is declarative \u2014 you describe the end state, not the steps. YAML files are how you talk to Kubernetes.',
    codeExample: {
      title: 'A simple K8s Deployment (like a vercel.json for backends)',
      code: `apiVersion: apps/v1
kind: Deployment          # What type of resource
metadata:
  name: my-api            # Name it (like "name" in package.json)
spec:
  replicas: 3             # Run 3 copies (auto-scaling!)
  selector:
    matchLabels:
      app: my-api         # How to find the pods
  template:
    spec:
      containers:
      - name: my-api
        image: my-api:1.2  # Which Docker image to run
        ports:
        - containerPort: 8080
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"    # Half a CPU core`,
    },
  },
  {
    id: 'helm',
    icon: '\u2388', // ⎈
    title: 'Helm Charts',
    subtitle: 'The package manager for K8s',
    frontend:
      'Writing raw K8s YAML for every environment is like copy-pasting your Vite config and changing values by hand. Helm is like having a template with variables.',
    infra:
      'Helm is a package manager for Kubernetes. A \u201CHelm Chart\u201D is a bundle of templated YAML files + default values that can deploy a full application stack.',
    analogy: {
      frontend: 'create-react-app / npm package with config',
      infra: 'Helm Chart',
      explain:
        'A Helm Chart is like a CRA template \u2014 it scaffolds a complete, working deployment. You override values.yaml like you\u2019d customize a template\u2019s config.',
    },
    keyTakeaway:
      'Helm = templated, reusable, versionable K8s deployments. Charts bundle everything needed to deploy an app. values.yaml is your control panel.',
    concepts: [
      {
        term: 'Chart',
        def: 'A package of templated K8s YAML files. Like an npm package but for infrastructure. Has a name, version, and dependencies.',
      },
      {
        term: 'values.yaml',
        def: 'The config file you customize \u2014 like .env but for your whole deployment. Sets replicas, image versions, resource limits, feature flags.',
      },
      {
        term: 'Templates',
        def: 'K8s YAML files with {{ .Values.x }} placeholders. Helm fills them in from values.yaml. Like JSX but for infrastructure.',
      },
      {
        term: 'Release',
        def: 'A deployed instance of a chart. You can have multiple releases of the same chart (dev, staging, prod) with different values.',
      },
      {
        term: 'helm install',
        def: 'Deploys a chart to your cluster \u2014 like \u201Cnpm install\u201D + \u201Cnpm start\u201D combined.',
      },
      {
        term: 'helm upgrade',
        def: 'Updates a running release with new values or chart version. Like deploying a new version of your app.',
      },
    ],
    codeExample: {
      title: 'Helm values.yaml (like your .env on steroids)',
      code: `# values.yaml — the knobs you turn
replicaCount: 3
image:
  repository: my-api
  tag: "1.2.0"            # Which version to deploy
service:
  type: ClusterIP
  port: 8080
resources:
  limits:
    cpu: 500m
    memory: 256Mi
# Feature flags for different environments
features:
  enableCache: true
  logLevel: "info"
# Per-environment overrides:
# helm install my-app ./chart -f values-prod.yaml`,
    },
  },
  {
    id: 'ecosystem',
    icon: '\u{1F310}', // 🌐
    title: 'The Wider Ecosystem',
    subtitle: 'Other tools you\u2019ll hear about',
    frontend:
      'Just like the frontend world has Vite, ESLint, Prettier, Storybook... the infra world has its own ecosystem of tools around K8s.',
    infra:
      'Kubernetes is the center of a huge ecosystem. Here are the tools you\u2019re most likely to encounter.',
    keyTakeaway:
      'You don\u2019t need to learn all of these! Just know they exist so you can follow conversations with your infra team.',
    concepts: [
      {
        term: 'kubectl',
        def: 'The CLI for Kubernetes \u2014 like \u201Cnpm\u201D or \u201Cgit\u201D but for your cluster. kubectl get pods, kubectl logs, kubectl apply.',
      },
      {
        term: 'ArgoCD / Flux',
        def: 'GitOps tools \u2014 they watch a Git repo and auto-deploy when you push changes. Like Vercel\u2019s GitHub integration but for K8s.',
      },
      {
        term: 'Terraform',
        def: 'Creates the underlying infrastructure (VMs, networks, databases) that K8s runs ON. If K8s manages apps, Terraform manages the machines.',
      },
      {
        term: 'Prometheus + Grafana',
        def: 'Monitoring stack. Prometheus collects metrics, Grafana visualizes them. Like browser DevTools performance tab for your infra.',
      },
      {
        term: 'Istio / Service Mesh',
        def: 'Manages communication between services \u2014 encryption, retries, traffic splitting. Like a middleware layer for your microservices.',
      },
      {
        term: 'ConfigMaps & Secrets',
        def: 'K8s resources for config and sensitive data. ConfigMap \u2248 .env file, Secret \u2248 .env with encryption for passwords/API keys.',
      },
      {
        term: 'CI/CD Pipeline',
        def: 'GitHub Actions, GitLab CI, etc. Builds your Docker image, pushes it to a registry, then tells Helm/K8s to deploy it.',
      },
    ],
  },
  {
    id: 'flow',
    icon: '\u{1F504}', // 🔄
    title: 'How It All Fits Together',
    subtitle: 'The deployment flow from code to running app',
    frontend:
      'In frontend: write code \u2192 push to GitHub \u2192 CI builds \u2192 Vercel deploys \u2192 users see changes. The backend flow is similar but with more moving parts.',
    infra:
      'The deployment pipeline for a K8s-based app follows a clear path from code change to running containers.',
    keyTakeaway:
      'The flow is: Code \u2192 Docker Image \u2192 Helm Chart \u2192 Kubernetes \u2192 Running Pods. Each layer adds reproducibility and control.',
    flow: [
      {
        step: '1',
        label: 'Write Code',
        detail: 'Developer pushes code to Git (same as frontend)',
        color: '#6366f1',
        darkColor: '#818cf8',
      },
      {
        step: '2',
        label: 'CI Builds Image',
        detail: 'GitHub Actions runs Dockerfile \u2192 creates container image \u2192 pushes to registry',
        color: '#8b5cf6',
        darkColor: '#a78bfa',
      },
      {
        step: '3',
        label: 'Update Chart',
        detail: 'Bump image tag in values.yaml (or CI does it automatically)',
        color: '#a855f7',
        darkColor: '#c084fc',
      },
      {
        step: '4',
        label: 'Helm Deploy',
        detail: 'helm upgrade fills templates with values \u2192 sends YAML to K8s',
        color: '#c084fc',
        darkColor: '#d8b4fe',
      },
      {
        step: '5',
        label: 'K8s Orchestrates',
        detail: 'K8s pulls image, creates pods, routes traffic, monitors health',
        color: '#d8b4fe',
        darkColor: '#e9d5ff',
      },
      {
        step: '6',
        label: 'App Running',
        detail: 'Your API is live, scaled, and self-healing',
        color: '#22c55e',
        darkColor: '#4ade80',
      },
    ],
  },
]

// ── Navigation ────────────────────────────────────────────────────────

export const K8S_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['k8s-start'] },
  {
    label: 'Foundations',
    ids: ['k8s-big-picture', 'k8s-containers', 'k8s-kubernetes'],
  },
  { label: 'Configuration', ids: ['k8s-yaml', 'k8s-helm'] },
  { label: 'The Full Picture', ids: ['k8s-ecosystem', 'k8s-flow'] },
]

// ── Start page ────────────────────────────────────────────────────────

export const K8S_START_PAGE_DATA: StartPageData = {
  subtitle:
    'Containers \u00B7 Kubernetes \u00B7 Helm \u2014 from development to deployment.',
  tip: 'Designed for frontend engineers who deploy apps but want to understand what happens after git push. Each section includes frontend \u2194 infra analogies.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'The Big Picture',
      description:
        'Understand why containers and orchestration exist, and how they map to concepts you already know from the frontend world.',
      jumpTo: 'k8s-big-picture',
    },
    {
      type: 'bonus',
      title: 'Foundations',
      description:
        'Learn containers, Docker, and Kubernetes fundamentals with analogies that connect to frontend concepts.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'k8s-big-picture':
          'Why containers and orchestration matter for your deployed apps.',
        'k8s-containers':
          'Docker, images, and containers \u2014 packaging your app so it runs the same everywhere.',
        'k8s-kubernetes':
          'Pods, Services, Deployments \u2014 the building blocks of container orchestration.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'YAML & Helm',
      description:
        'Read and write the configuration files that define how your app runs in a cluster.',
      jumpTo: 'k8s-yaml',
    },
    {
      type: 'bonus',
      title: 'The Full Picture',
      description:
        'Explore the wider ecosystem and trace a deployment from code push to running container.',
      sectionLabel: 'The Full Picture',
      subItemDescriptions: {
        'k8s-ecosystem':
          'kubectl, ArgoCD, Terraform, monitoring \u2014 the tools that surround Kubernetes.',
        'k8s-flow':
          'Trace the full deployment pipeline from git push to running pod.',
      },
    },
  ],
}
