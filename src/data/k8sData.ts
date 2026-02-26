import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'
import type { YamlLine, ConceptItem } from './sharedDataTypes'

// ── Types ─────────────────────────────────────────────────────────────

export interface K8sAnalogy {
  frontend: string
  infra: string
  explain: string
}

/** @deprecated Use ConceptItem from sharedDataTypes instead */
export type K8sConcept = ConceptItem

export interface K8sCodeExample {
  title: string
  code: string
}

/** @deprecated Use YamlLine from sharedDataTypes instead */
export type K8sYamlLine = YamlLine

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
  yamlLines?: K8sYamlLine[]
  yamlFileName?: string
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
    yamlFileName: 'deployment.yaml',
    yamlLines: [
      { line: 'apiVersion: apps/v1', note: 'Which version of the K8s API to use. "apps/v1" is the stable API group for Deployments \u2014 like specifying which version of a library to import.' },
      { line: 'kind: Deployment', note: 'The type of K8s resource. A Deployment manages a set of identical pods and handles rolling updates. Other kinds include Service, ConfigMap, Ingress.' },
      { line: 'metadata:', note: 'Metadata about this resource \u2014 its name, labels, namespace. Like the top-level fields in package.json.' },
      { line: '  name: my-api', note: 'The unique name for this Deployment within its namespace. You\u2019ll use this name with kubectl commands, like "kubectl get deployment my-api".' },
      { line: '', note: null },
      { line: 'spec:', note: 'The desired state specification. This is where you tell K8s what you actually want running.' },
      { line: '  replicas: 3', note: 'Run 3 identical copies (pods) of your app. If one crashes, K8s automatically spins up a replacement. Like having 3 serverless instances.' },
      { line: '  selector:', note: 'How the Deployment finds which pods it owns. Must match the labels in the pod template below.' },
      { line: '    matchLabels:', note: 'Match pods that have these exact key-value labels. This is how K8s resources find each other.' },
      { line: '      app: my-api', note: 'This label connects the Deployment to its pods. The selector and template labels must match \u2014 K8s uses this to know which pods belong to this Deployment.' },
      { line: '', note: null },
      { line: '  template:', note: 'The pod template \u2014 a blueprint for every pod this Deployment creates. Like a component that gets rendered 3 times (once per replica).' },
      { line: '    spec:', note: 'The pod\u2019s own spec \u2014 what containers to run inside it.' },
      { line: '      containers:', note: 'List of containers in each pod. Usually just one, but you can run sidecars (logging, proxies) alongside your app.' },
      { line: '      - name: my-api', note: 'A human-readable name for this container within the pod. Useful for kubectl logs and debugging.' },
      { line: '        image: my-api:1.2', note: 'The Docker image to run \u2014 "my-api" at tag "1.2". This is what your CI/CD pipeline builds and pushes to a container registry.' },
      { line: '        ports:', note: 'Ports the container listens on. Declaring them here is informational \u2014 you still need a Service resource to expose them to the network.' },
      { line: '        - containerPort: 8080', note: 'The port your app listens on inside the container. Must match what your server code actually binds to (like process.env.PORT).' },
      { line: '        resources:', note: 'Resource requests and limits. Tells K8s how much CPU and memory this container needs. Without these, one container could starve others.' },
      { line: '          limits:', note: 'The maximum resources this container can use. If it exceeds memory limits, K8s kills and restarts it (OOMKilled).' },
      { line: '            memory: "256Mi"', note: '256 mebibytes of RAM maximum. Mi = mebibytes (binary). Start conservative and adjust based on monitoring.' },
      { line: '            cpu: "500m"', note: 'Half a CPU core (500 millicores). "1000m" = 1 full core. Prevents one service from hogging all the CPU on a node.' },
    ],
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
    yamlFileName: 'values.yaml',
    yamlLines: [
      { line: '# values.yaml \u2014 the knobs you turn', note: 'This file contains default configuration for a Helm chart. Teams override these per environment (dev, staging, prod) without touching the templates.' },
      { line: 'replicaCount: 3', note: 'How many pod replicas to run. In the template, this becomes {{ .Values.replicaCount }}. Override per environment: maybe 1 for dev, 3 for prod.' },
      { line: '', note: null },
      { line: 'image:', note: 'Container image configuration block. Groups the repository and tag together so they\u2019re easy to find and override.' },
      { line: '  repository: my-api', note: 'The Docker image name. In a real chart, this might be "ghcr.io/my-org/my-api" \u2014 a full registry path.' },
      { line: '  tag: "1.2.0"', note: 'The image version to deploy. CI/CD pipelines typically update just this value: helm upgrade --set image.tag=1.3.0.' },
      { line: '', note: null },
      { line: 'service:', note: 'Kubernetes Service configuration. Controls how your app is exposed to network traffic within (or outside) the cluster.' },
      { line: '  type: ClusterIP', note: 'ClusterIP = internal only (default). Other options: NodePort (exposes on each node\u2019s IP), LoadBalancer (creates a cloud load balancer).' },
      { line: '  port: 8080', note: 'The port the Service listens on. Traffic to this port gets routed to your pods\u2019 containerPort.' },
      { line: '', note: null },
      { line: 'resources:', note: 'CPU and memory limits for each pod. Critical for production \u2014 prevents one service from consuming all cluster resources.' },
      { line: '  limits:', note: 'Maximum resources a pod can use. K8s enforces these hard limits.' },
      { line: '    cpu: 500m', note: 'Half a CPU core maximum. Same as the raw YAML, but now it\u2019s a variable you can override per environment.' },
      { line: '    memory: 256Mi', note: '256 mebibytes RAM maximum. Staging might use 128Mi, production might use 512Mi \u2014 all controlled from values files.' },
      { line: '', note: null },
      { line: '# Feature flags for different environments', note: 'Comments in values.yaml serve as documentation. Teams scanning this file can quickly understand what each section controls.' },
      { line: 'features:', note: 'Application-level feature flags. These get injected as environment variables or config files into your containers via templates.' },
      { line: '  enableCache: true', note: 'A custom feature flag. The Helm template might render this as an environment variable: ENABLE_CACHE=true. Toggle per environment.' },
      { line: '  logLevel: "info"', note: 'Another configurable value. Dev might use "debug", production uses "info" or "warn". Changed without rebuilding the image.' },
      { line: '', note: null },
      { line: '# Per-environment overrides:', note: 'Helm supports layered values files. The base values.yaml provides defaults; environment-specific files override only what differs.' },
      { line: '# helm install my-app ./chart -f values-prod.yaml', note: 'This command installs the chart and overlays values-prod.yaml on top of the defaults. That file might only contain replicaCount: 5 and logLevel: "warn".' },
    ],
  },
  {
    id: 'networking',
    icon: '\u{1F6F0}\uFE0F', // 🛰️
    title: 'Networking & Services',
    subtitle: 'How traffic reaches your containers',
    frontend:
      'You know how React Router maps URL paths to components, and your dev server proxies API calls to a backend? In K8s, Services and Ingress handle routing traffic to the right containers.',
    infra:
      'Services provide stable network endpoints for ephemeral pods. Ingress manages external HTTP/HTTPS access. Together they control how traffic flows from the outside world to your containers.',
    analogy: {
      frontend: 'React Router + dev server proxy + DNS',
      infra: 'K8s Services + Ingress + CoreDNS',
      explain:
        'React Router maps URLs to components inside your app. K8s Services map network addresses to pods, and Ingress maps external hostnames/paths to Services \u2014 same idea, different layer.',
    },
    concepts: [
      {
        term: 'ClusterIP (default)',
        def: 'Internal-only Service. Other pods in the cluster can reach it by name (like \u201Chttp://my-api:8080\u201D), but nothing outside the cluster can. This is the default Service type.',
      },
      {
        term: 'NodePort',
        def: 'Exposes the Service on a static port (30000\u201332767) on every node\u2019s IP. Useful for development but rarely used in production \u2014 like running your app on localhost:3000.',
      },
      {
        term: 'LoadBalancer',
        def: 'Creates a cloud load balancer (AWS ALB, GCP LB) that routes external traffic to your pods. The most common way to expose services in production cloud environments.',
      },
      {
        term: 'Ingress Controller',
        def: 'A reverse proxy (like Nginx) that reads Ingress rules and routes HTTP traffic. One Ingress controller can route traffic for many services based on hostname or URL path.',
      },
      {
        term: 'DNS Resolution in K8s',
        def: 'Every Service gets a DNS name: \u201Cmy-service.my-namespace.svc.cluster.local\u201D. Pods can reach each other by Service name \u2014 like how \u201Clocalhost\u201D resolves in development.',
      },
    ],
    yamlFileName: 'service.yaml',
    yamlLines: [
      { line: 'apiVersion: v1', note: 'Services use the core API (v1), not apps/v1 like Deployments. They\u2019re one of the most fundamental K8s resources.' },
      { line: 'kind: Service', note: 'A Service gives your pods a stable network identity. Pods are ephemeral (they come and go), but the Service address stays constant.' },
      { line: 'metadata:', note: null },
      { line: '  name: my-api', note: 'This name becomes the DNS hostname. Other pods can reach this Service at "http://my-api:8080" within the same namespace.' },
      { line: '', note: null },
      { line: 'spec:', note: null },
      { line: '  type: ClusterIP', note: 'Internal-only (default). Use LoadBalancer for external access, or rely on an Ingress controller to route traffic to ClusterIP services.' },
      { line: '  selector:', note: 'How the Service finds pods to send traffic to. Must match the labels on your pods \u2014 same concept as the Deployment selector.' },
      { line: '    app: my-api', note: 'Route traffic to any pod with the label "app: my-api". The Service continuously watches for matching pods and updates its endpoint list.' },
      { line: '  ports:', note: null },
      { line: '  - port: 8080', note: 'The port the Service listens on. Other pods connect to this port.' },
      { line: '    targetPort: 8080', note: 'The port on the pod/container to forward to. Often the same as port, but can differ \u2014 like a reverse proxy mapping 80 \u2192 3000.' },
      { line: '', note: null },
      { line: '---', note: 'YAML document separator. Lets you define multiple resources in one file \u2014 like exporting multiple components from one module.' },
      { line: '', note: null },
      { line: 'apiVersion: networking.k8s.io/v1', note: 'Ingress lives in the networking API group. Requires an Ingress controller (like nginx-ingress) to be installed in the cluster.' },
      { line: 'kind: Ingress', note: 'Routes external HTTP/HTTPS traffic to internal Services based on hostname and URL path. Like a reverse proxy config.' },
      { line: 'metadata:', note: null },
      { line: '  name: my-api-ingress', note: null },
      { line: 'spec:', note: null },
      { line: '  rules:', note: 'A list of routing rules. Each rule maps a hostname and/or path to a backend Service.' },
      { line: '  - host: api.example.com', note: 'Match requests for this hostname. Like configuring a custom domain in Vercel \u2014 DNS must point to your cluster\u2019s load balancer.' },
      { line: '    http:', note: null },
      { line: '      paths:', note: null },
      { line: '      - path: /', note: 'Match all paths under this host. You can use "/api" or "/v2" to route different paths to different services.' },
      { line: '        pathType: Prefix', note: '"Prefix" matches the path and all sub-paths. "Exact" matches only the exact path. Like exact vs. fuzzy route matching.' },
      { line: '        backend:', note: null },
      { line: '          service:', note: null },
      { line: '            name: my-api', note: 'Send matching traffic to the "my-api" Service defined above. The Ingress controller resolves this name to pod IPs.' },
      { line: '            port:', note: null },
      { line: '              number: 8080', note: 'The port on the Service to forward to. Must match the Service\u2019s port field.' },
    ],
    keyTakeaway:
      'Services give pods stable network identities. Ingress routes external traffic by hostname and path. Together they\u2019re the networking layer connecting users to your apps.',
  },
  {
    id: 'config-secrets',
    icon: '\u{1F512}', // 🔒
    title: 'ConfigMaps & Secrets',
    subtitle: 'Separating config from code',
    frontend:
      'You use .env files for API URLs, feature flags, and API keys. K8s has ConfigMaps for non-sensitive config and Secrets for sensitive data \u2014 both injectable into your pods.',
    infra:
      'ConfigMaps store configuration as key-value pairs. Secrets store sensitive data (passwords, tokens, certificates) with base64 encoding. Both can be mounted as environment variables or files inside containers.',
    analogy: {
      frontend: '.env + .env.local + process.env',
      infra: 'ConfigMaps + Secrets + volume mounts',
      explain:
        'Just like you split .env (committed, non-sensitive) from .env.local (gitignored, sensitive), K8s splits ConfigMaps (config) from Secrets (sensitive). Both get injected into your app\u2019s environment.',
    },
    concepts: [
      {
        term: 'ConfigMap',
        def: 'Stores non-confidential key-value data. Inject as environment variables or mount as files. Change config without rebuilding images \u2014 like updating .env without redeploying.',
      },
      {
        term: 'Secret',
        def: 'Like ConfigMap but for sensitive data (passwords, API keys, TLS certs). Values are base64-encoded (not encrypted by default). Use external secret managers for true encryption.',
      },
      {
        term: 'Environment Variables',
        def: 'The simplest injection method. Add envFrom or env to your pod spec to make ConfigMap/Secret values available as process.env.MY_VAR inside your container.',
      },
      {
        term: 'Volume Mounts',
        def: 'Mount a ConfigMap or Secret as files in the container filesystem. Useful for config files (nginx.conf, settings.json) that apps read from disk.',
      },
      {
        term: 'External Secrets Operator',
        def: 'Syncs secrets from external providers (AWS Secrets Manager, HashiCorp Vault) into K8s Secrets. Keeps real credentials out of YAML files and Git repos.',
      },
    ],
    yamlFileName: 'config.yaml',
    yamlLines: [
      { line: 'apiVersion: v1', note: 'ConfigMaps and Secrets use the core API (v1). They\u2019re simple key-value stores that K8s knows how to inject into pods.' },
      { line: 'kind: ConfigMap', note: 'A ConfigMap holds non-sensitive configuration data. Think of it as a .env file that lives in the cluster.' },
      { line: 'metadata:', note: null },
      { line: '  name: my-api-config', note: 'Name used to reference this ConfigMap from pod specs. Keep it descriptive \u2014 like naming your .env files.' },
      { line: 'data:', note: 'Key-value pairs. Keys become environment variable names or filenames (when volume-mounted). Values are plain strings.' },
      { line: '  DATABASE_HOST: "postgres.db.svc"', note: 'A K8s DNS name pointing to a database Service. Using ConfigMaps means you can change this per environment without rebuilding.' },
      { line: '  LOG_LEVEL: "info"', note: 'Application config that varies by environment. Dev might use "debug", production uses "info" \u2014 no code changes needed.' },
      { line: '  FEATURE_ENABLE_CACHE: "true"', note: 'Feature flags as config. Toggle features by updating the ConfigMap and restarting pods \u2014 like changing .env values.' },
      { line: '', note: null },
      { line: '---', note: null },
      { line: '', note: null },
      { line: 'apiVersion: v1', note: null },
      { line: 'kind: Secret', note: 'A Secret holds sensitive data. Structurally similar to ConfigMap but values are base64-encoded and K8s treats them more carefully.' },
      { line: 'metadata:', note: null },
      { line: '  name: my-api-secrets', note: null },
      { line: 'type: Opaque', note: '"Opaque" is the default Secret type for arbitrary key-value data. Other types include "kubernetes.io/tls" for TLS certificates.' },
      { line: 'stringData:', note: 'Convenience field \u2014 values here are plain text (K8s auto-encodes to base64). The alternative "data" field requires you to pre-encode values.' },
      { line: '  DB_PASSWORD: "s3cur3-p@ssw0rd"', note: 'Sensitive credentials. In production, use External Secrets Operator to sync from Vault/AWS SM instead of storing in YAML.' },
      { line: '  API_KEY: "sk-abc123..."', note: 'API tokens, encryption keys, etc. Never commit Secret YAML with real values to Git \u2014 use sealed-secrets or external providers.' },
    ],
    keyTakeaway:
      'ConfigMaps and Secrets separate configuration from code. Change settings per environment without rebuilding images. Use external secret managers for real credentials.',
  },
  {
    id: 'debugging',
    icon: '\u{1F50D}', // 🔍
    title: 'Debugging & kubectl',
    subtitle: 'Your DevTools for Kubernetes',
    frontend:
      'You use browser DevTools, console.log, and React DevTools to debug frontend apps. In K8s, kubectl is your primary debugging tool \u2014 it lets you inspect, log, and exec into containers.',
    infra:
      'kubectl is the CLI for everything Kubernetes. Inspect resource status with get/describe, read logs, exec into running containers, and check events to understand what\u2019s happening in your cluster.',
    analogy: {
      frontend: 'DevTools Console + Network tab + React DevTools',
      infra: 'kubectl logs + describe + exec',
      explain:
        'DevTools lets you inspect elements, watch network calls, and debug state. kubectl does the same for K8s \u2014 inspect pods, watch logs, and debug containers in real time.',
    },
    concepts: [
      {
        term: 'kubectl get',
        def: 'List resources. "kubectl get pods" shows all pods (like ls for your cluster). Add "-o wide" for more detail or "-w" to watch changes in real time.',
      },
      {
        term: 'kubectl describe',
        def: 'Show detailed info about a resource, including events and conditions. The first command to run when something isn\u2019t working \u2014 like checking the browser console for errors.',
      },
      {
        term: 'kubectl logs',
        def: 'View container stdout/stderr output. Add "-f" to stream in real time (like tail -f). Add "--previous" to see logs from the last crashed container.',
      },
      {
        term: 'kubectl exec',
        def: 'Run a command inside a running container. "kubectl exec -it my-pod -- /bin/sh" gives you a shell \u2014 like SSH but for containers. Great for checking files, env vars, or network.',
      },
      {
        term: 'Pod Lifecycle',
        def: 'Pods go through phases: Pending (scheduling), Running, Succeeded/Failed. Common issues: ImagePullBackOff (wrong image), CrashLoopBackOff (app keeps crashing), OOMKilled (out of memory).',
      },
      {
        term: 'Events',
        def: 'K8s records events for every significant action (scheduling, pulling images, health check failures). "kubectl get events --sort-by=.lastTimestamp" shows the timeline of what happened.',
      },
    ],
    keyTakeaway:
      'kubectl is your DevTools for K8s. Master get, describe, logs, and exec \u2014 they\u2019ll help you diagnose most issues. Check events when pods won\u2019t start.',
  },
  {
    id: 'scaling',
    icon: '\u2696\uFE0F', // ⚖️
    title: 'Scaling & Reliability',
    subtitle: 'Keeping your app healthy under load',
    frontend:
      'You know how CDNs auto-scale to handle traffic spikes and health checks keep origins responsive? K8s can auto-scale your backend pods and use probes to route traffic only to healthy instances.',
    infra:
      'Horizontal Pod Autoscaler (HPA) adds or removes pods based on CPU, memory, or custom metrics. Liveness probes restart unhealthy containers. Readiness probes prevent traffic to pods that aren\u2019t ready yet.',
    analogy: {
      frontend: 'CDN auto-scaling + health checks + error boundaries',
      infra: 'HPA + Liveness probes + Readiness probes',
      explain:
        'React error boundaries catch crashes and show fallback UI. K8s probes do the same for backend services \u2014 detect failures and either restart containers or stop routing traffic to them.',
    },
    concepts: [
      {
        term: 'Liveness Probe',
        def: 'Checks if your app is still alive. If it fails, K8s kills and restarts the container. Use for detecting deadlocks or unrecoverable states. Like a watchdog timer.',
      },
      {
        term: 'Readiness Probe',
        def: 'Checks if your app is ready to receive traffic. If it fails, K8s removes the pod from the Service\u2019s endpoint list (no traffic routed). Use during startup or when temporarily overloaded.',
      },
      {
        term: 'Startup Probe',
        def: 'Gives slow-starting containers time to initialize. Until it succeeds, liveness and readiness probes are disabled. Prevents K8s from killing an app that\u2019s just taking a while to boot.',
      },
      {
        term: 'Horizontal Pod Autoscaler (HPA)',
        def: 'Automatically adjusts replica count based on observed CPU/memory utilization. Set target utilization (e.g., 70% CPU) and min/max replicas \u2014 K8s handles the rest.',
      },
      {
        term: 'Rolling Update',
        def: 'The default deployment strategy. K8s gradually replaces old pods with new ones, ensuring some are always available. Configurable via maxSurge and maxUnavailable.',
      },
      {
        term: 'Resource Requests vs. Limits',
        def: 'Requests = guaranteed minimum (K8s uses this for scheduling). Limits = hard maximum (container gets killed if exceeded). Set requests to typical usage, limits to peak.',
      },
    ],
    yamlFileName: 'probes-and-hpa.yaml',
    yamlLines: [
      { line: '# Add to your Deployment pod spec:', note: 'Probes are defined per container in your Deployment. They tell K8s how to check if your app is healthy and ready.' },
      { line: 'containers:', note: null },
      { line: '- name: my-api', note: null },
      { line: '  image: my-api:1.2', note: null },
      { line: '  livenessProbe:', note: 'If this probe fails consecutively, K8s kills and restarts the container. Use a lightweight endpoint that confirms the process is responsive.' },
      { line: '    httpGet:', note: 'HTTP probes hit an endpoint and check for a 2xx/3xx status code. Alternatives: tcpSocket (port check) or exec (run a command).' },
      { line: '      path: /healthz', note: 'Common convention: /healthz for liveness, /readyz for readiness. This endpoint should be fast and check core functionality only.' },
      { line: '      port: 8080', note: null },
      { line: '    initialDelaySeconds: 15', note: 'Wait 15 seconds after container start before first probe. Gives your app time to initialize without being killed prematurely.' },
      { line: '    periodSeconds: 10', note: 'Check every 10 seconds. Balance between quick failure detection and not overloading your app with health check requests.' },
      { line: '', note: null },
      { line: '  readinessProbe:', note: 'If this fails, the pod is removed from Service endpoints (no traffic). Unlike liveness, failing readiness does NOT restart the pod.' },
      { line: '    httpGet:', note: null },
      { line: '      path: /readyz', note: 'This endpoint should verify the app can handle requests \u2014 database connected, caches warm, etc.' },
      { line: '      port: 8080', note: null },
      { line: '    initialDelaySeconds: 5', note: 'Start readiness checks sooner than liveness. You want to route traffic as soon as the app is ready, but wait longer before deciding it\u2019s dead.' },
      { line: '    periodSeconds: 5', note: 'Check frequently so recovered pods start receiving traffic again quickly.' },
      { line: '', note: null },
      { line: '---', note: null },
      { line: '', note: null },
      { line: 'apiVersion: autoscaling/v2', note: 'HPA v2 supports multiple metrics and custom metrics. v1 only supports CPU.' },
      { line: 'kind: HorizontalPodAutoscaler', note: 'HPA automatically adjusts the replica count of a Deployment, ReplicaSet, or StatefulSet based on observed metrics.' },
      { line: 'metadata:', note: null },
      { line: '  name: my-api-hpa', note: null },
      { line: 'spec:', note: null },
      { line: '  scaleTargetRef:', note: 'Which workload to scale. Must match the Deployment name and API version.' },
      { line: '    apiVersion: apps/v1', note: null },
      { line: '    kind: Deployment', note: null },
      { line: '    name: my-api', note: 'The Deployment whose replicas will be adjusted. HPA overwrites the replicas field in your Deployment spec.' },
      { line: '  minReplicas: 2', note: 'Never go below 2 replicas in production. Ensures availability during deployments, node failures, or low-traffic periods.' },
      { line: '  maxReplicas: 10', note: 'Upper bound prevents runaway scaling (and runaway costs). Set based on your cluster capacity and budget.' },
      { line: '  metrics:', note: null },
      { line: '  - type: Resource', note: null },
      { line: '    resource:', note: null },
      { line: '      name: cpu', note: 'Scale based on CPU utilization. When average CPU across all pods exceeds the target, HPA adds more replicas.' },
      { line: '      target:', note: null },
      { line: '        type: Utilization', note: null },
      { line: '        averageUtilization: 70', note: 'Target 70% average CPU. HPA tries to keep utilization near this value by adjusting replicas. Too low = wasteful, too high = slow response.' },
    ],
    keyTakeaway:
      'Probes keep your app healthy \u2014 liveness restarts broken containers, readiness controls traffic flow. HPA scales pods automatically based on load. Together they make your app self-healing and elastic.',
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
  {
    label: 'Production Operations',
    ids: ['k8s-networking', 'k8s-config-secrets', 'k8s-debugging', 'k8s-scaling'],
  },
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
      type: 'numbered',
      num: 3,
      title: 'Production Operations',
      description:
        'Networking, configuration management, debugging, and scaling \u2014 the day-to-day of running apps in K8s.',
      jumpTo: 'k8s-networking',
    },
    {
      type: 'bonus',
      title: 'Production Operations',
      description:
        'Learn how to route traffic, manage config, debug issues, and scale your apps in a Kubernetes cluster.',
      sectionLabel: 'Production Operations',
      subItemDescriptions: {
        'k8s-networking':
          'Services, Ingress, and DNS \u2014 how traffic reaches your containers.',
        'k8s-config-secrets':
          'ConfigMaps and Secrets \u2014 separating configuration from code.',
        'k8s-debugging':
          'kubectl commands for inspecting, logging, and troubleshooting pods.',
        'k8s-scaling':
          'Auto-scaling, health probes, and deployment strategies for reliability.',
      },
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

export const K8S_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'kubernetes',
    icon: '☸️',
    title: 'Kubernetes & Helm',
    startPageId: 'k8s-start',
    description: 'Understand containers, Kubernetes, and Helm \u2014 from Docker basics to deployment pipelines, with analogies for frontend engineers.',
    category: 'infrastructure',
    dateCreated: '2026-02-16',
    dateModified: '2026-02-26',
    sections: K8S_GUIDE_SECTIONS,
  },
  startPageData: K8S_START_PAGE_DATA,
}
