import type { ChecklistBaseSection } from '../components/mdx/ChecklistBase'

export const K8S_CHECKLIST: ChecklistBaseSection[] = [
  {
    id: 'containers',
    name: 'Containers & Docker',
    icon: '\u{1F4E6}',  // 📦
    items: [
      { label: 'Write a <code>Dockerfile</code> for your application with a minimal base image (e.g., <code>node:20-slim</code>)' },
      { label: 'Use multi-stage builds to keep production images small \u2014 build stage + runtime stage' },
      { label: 'Add a <code>.dockerignore</code> file to exclude <code>node_modules</code>, <code>.git</code>, and other unnecessary files' },
      { label: 'Verify your container runs correctly with <code>docker build</code> and <code>docker run</code> locally' },
      { label: 'Tag images with meaningful versions (git SHA or semver), not just <code>latest</code>' },
      { label: 'Push images to a container registry (Docker Hub, GitHub Container Registry, or your org\u2019s private registry)' },
    ],
  },
  {
    id: 'kubernetes-basics',
    name: 'Kubernetes Configuration',
    icon: '\u2638\uFE0F',  // ☸️
    items: [
      { label: 'Create a <code>Deployment</code> manifest specifying your container image, replica count, and resource limits' },
      { label: 'Define resource requests and limits (<code>cpu</code>, <code>memory</code>) to prevent resource starvation' },
      { label: 'Add liveness and readiness probes to your Deployment so Kubernetes knows when your app is healthy' },
      { label: 'Create a <code>Service</code> manifest to expose your Deployment within the cluster (ClusterIP) or externally (LoadBalancer)' },
      { label: 'Set up a <code>ConfigMap</code> for non-sensitive configuration and a <code>Secret</code> for sensitive values' },
      { label: 'Configure environment variables in your pod spec using <code>envFrom</code> or individual <code>env</code> entries' },
    ],
  },
  {
    id: 'helm',
    name: 'Helm Charts',
    icon: '\u{1F4DC}',  // 📜
    items: [
      { label: 'Initialize a Helm chart with <code>helm create</code> and understand the generated directory structure' },
      { label: 'Customize <code>values.yaml</code> with your application\u2019s default configuration' },
      { label: 'Template your Deployment, Service, and other manifests using Helm\u2019s Go template syntax' },
      { label: 'Create environment-specific value overrides (e.g., <code>values-staging.yaml</code>, <code>values-prod.yaml</code>)' },
      { label: 'Test your chart locally with <code>helm template</code> to verify rendered manifests' },
      { label: 'Install or upgrade your release with <code>helm install</code> / <code>helm upgrade --install</code>' },
    ],
  },
  {
    id: 'networking',
    name: 'Networking & Ingress',
    icon: '\u{1F310}',  // 🌐
    items: [
      { label: 'Understand the difference between ClusterIP (internal), NodePort, and LoadBalancer service types' },
      { label: 'Set up an Ingress controller (Nginx, Traefik) if you need path-based or host-based routing' },
      { label: 'Configure TLS/SSL termination at the Ingress level with cert-manager or pre-provisioned certificates' },
      { label: 'Define NetworkPolicies if your cluster requires pod-to-pod traffic restrictions' },
      { label: 'Verify DNS resolution between services using Kubernetes\u2019 internal DNS (<code>service-name.namespace.svc.cluster.local</code>)' },
    ],
  },
  {
    id: 'operations',
    name: 'Operations & Monitoring',
    icon: '\u{1F4CA}',  // 📊
    items: [
      { label: 'Learn essential <code>kubectl</code> commands: <code>get pods</code>, <code>describe</code>, <code>logs</code>, <code>exec</code>, <code>port-forward</code>' },
      { label: 'Set up a deployment pipeline that builds, pushes, and deploys via Helm or <code>kubectl apply</code>' },
      { label: 'Configure rolling update strategy with <code>maxSurge</code> and <code>maxUnavailable</code> for zero-downtime deploys' },
      { label: 'Set up log aggregation (Grafana Loki, ELK stack, or cloud provider\u2019s logging) for debugging' },
      { label: 'Add metrics collection (Prometheus + Grafana, or Datadog) for CPU, memory, and request latency' },
      { label: 'Consider GitOps with ArgoCD or Flux for declarative, auditable deployments' },
    ],
  },
]
