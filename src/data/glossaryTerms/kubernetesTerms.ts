import type { GlossaryCategory } from './index'

export const kubernetesGlossary: GlossaryCategory[] = [
  {
    category: 'Containers & Kubernetes',
    terms: [
      {
        term: 'Container',
        definition:
          'A lightweight, isolated package containing an application and all its dependencies (runtime, libraries, OS config). Shares the host OS kernel, making containers faster and more efficient than virtual machines.',
        linkId: 'docker-overview',
        sectionId: 'k8s-containers',
        guides: ['kubernetes', 'ci-cd', 'ai-infra'],
      },
      {
        term: 'Docker',
        definition:
          'The most popular tool for building and running containers. A <code>Dockerfile</code> defines the build steps; <code>docker build</code> creates an image; <code>docker run</code> starts a container from that image.',
        linkId: 'docker-overview',
        sectionId: 'k8s-containers',
        guides: ['kubernetes', 'ci-cd', 'ai-infra'],
      },
      {
        term: 'Dockerfile',
        definition:
          'A text file with instructions for building a Docker image \u2014 like a build script that specifies the base OS, dependencies, app code, and startup command.',
        linkId: 'docker-dockerfile',
        sectionId: 'k8s-containers',
        guides: ['kubernetes', 'ci-cd'],
      },
      {
        term: 'Container Image',
        definition:
          'An immutable, versioned snapshot of a container\u2019s filesystem. Like a <code>dist/</code> folder for an entire application environment. Stored in registries like Docker Hub or AWS ECR.',
        linkId: 'docker-overview',
        sectionId: 'k8s-containers',
      },
      {
        term: 'Container Registry',
        definition:
          'A storage and distribution service for container images \u2014 like npm registry but for Docker images. Examples: Docker Hub, AWS ECR, GitHub Container Registry.',
        linkId: 'docker-hub',
        sectionId: 'k8s-containers',
      },
      {
        term: 'Cluster (K8s)',
        definition:
          'A set of machines (nodes) that Kubernetes manages as a single unit. Consists of a control plane that makes scheduling decisions and worker nodes that run your containerized applications.',
        linkId: 'k8s-clusters',
        sectionId: 'k8s-kubernetes',
      },
      {
        term: 'Node (K8s)',
        definition:
          'A single machine in a Kubernetes cluster \u2014 physical or virtual (like an EC2 instance). Each node runs a container runtime and the <code>kubelet</code> agent that communicates with the control plane.',
        linkId: 'k8s-nodes',
        sectionId: 'k8s-kubernetes',
      },
      {
        term: 'Pod',
        definition:
          'The smallest deployable unit in Kubernetes \u2014 a wrapper around one or more containers that share networking and storage. Most pods contain a single container.',
        linkId: 'k8s-pods',
        sectionId: 'k8s-kubernetes',
      },
      {
        term: 'Deployment (K8s)',
        definition:
          'A Kubernetes resource that manages a set of identical pods. Handles scaling (replica count), rolling updates, and automatic rollbacks when things go wrong.',
        linkId: 'k8s-deployments',
        sectionId: 'k8s-kubernetes',
      },
      {
        term: 'Service (K8s)',
        definition:
          'A stable network endpoint that routes traffic to a set of pods. Pods are ephemeral (they come and go), but Services provide a fixed address \u2014 like a load balancer for your containers.',
        linkId: 'k8s-services',
        sectionId: 'k8s-kubernetes',
      },
      {
        term: 'Namespace (K8s)',
        definition:
          'A virtual partition within a Kubernetes cluster that isolates resources. Teams typically use separate namespaces for <code>dev</code>, <code>staging</code>, and <code>prod</code> environments.',
        linkId: 'k8s-namespaces',
        sectionId: 'k8s-kubernetes',
      },
      {
        term: 'Ingress',
        definition:
          'A Kubernetes resource that manages external HTTP/HTTPS access to services \u2014 acts as a reverse proxy and load balancer, routing requests by hostname or URL path.',
        linkId: 'k8s-ingress',
        sectionId: 'k8s-kubernetes',
      },
      {
        term: 'Helm Chart',
        definition:
          'A package of templated Kubernetes YAML files with a <code>values.yaml</code> config. Helm is the package manager for Kubernetes \u2014 charts let you deploy complex apps with a single <code>helm install</code> command.',
        linkId: 'helm-docs',
        sectionId: 'k8s-helm',
      },
      {
        term: 'kubectl',
        definition:
          'The command-line tool for interacting with Kubernetes clusters. Used for inspecting resources (<code>kubectl get pods</code>), viewing logs (<code>kubectl logs</code>), and applying configuration (<code>kubectl apply</code>).',
        linkId: 'k8s-kubectl',
        sectionId: 'k8s-debugging',
      },
      {
        term: 'ConfigMap',
        definition:
          'A Kubernetes resource for storing non-confidential configuration data as key-value pairs. Like a <code>.env</code> file that pods can mount as files or environment variables.',
        linkId: 'k8s-configmaps',
        sectionId: 'k8s-config-secrets',
      },
      {
        term: 'Secret (K8s)',
        definition:
          'A Kubernetes resource for storing sensitive data (passwords, API keys, TLS certificates) as base64-encoded key-value pairs. Structurally similar to ConfigMap but handled more carefully by the cluster.',
        linkId: 'k8s-secrets',
        sectionId: 'k8s-config-secrets',
      },
      {
        term: 'ClusterIP',
        definition:
          'The default Kubernetes Service type. Creates an internal-only virtual IP reachable within the cluster. Other pods connect by Service name (e.g., <code>http://my-api:8080</code>), but external traffic cannot reach it directly.',
        linkId: 'k8s-services',
        sectionId: 'k8s-networking',
      },
      {
        term: 'LoadBalancer (K8s)',
        definition:
          'A Service type that provisions a cloud load balancer (AWS ALB, GCP LB) to route external traffic to your pods. The most common way to expose services to the internet in production.',
        linkId: 'k8s-services',
        sectionId: 'k8s-networking',
      },
      {
        term: 'Liveness Probe',
        definition:
          'A periodic health check that determines if a container is still running correctly. If it fails, Kubernetes kills and restarts the container. Typically an HTTP GET to a <code>/healthz</code> endpoint.',
        linkId: 'k8s-probes',
        sectionId: 'k8s-scaling',
      },
      {
        term: 'Readiness Probe',
        definition:
          'A periodic check that determines if a pod is ready to receive traffic. If it fails, the pod is removed from Service endpoints (no traffic routed) but not restarted.',
        linkId: 'k8s-probes',
        sectionId: 'k8s-scaling',
      },
      {
        term: 'Horizontal Pod Autoscaler',
        definition:
          'A Kubernetes resource (HPA) that automatically adjusts the number of pod replicas based on observed CPU utilization, memory usage, or custom metrics. Like CDN auto-scaling for your backend services.',
        linkId: 'k8s-hpa',
        sectionId: 'k8s-scaling',
      },
      {
        term: 'CrashLoopBackOff',
        definition:
          'A pod status indicating the container keeps crashing and restarting. Kubernetes applies exponential backoff between restart attempts. Check <code>kubectl logs --previous</code> to see the error from the last crash.',
        linkId: 'k8s-troubleshoot-apps',
        sectionId: 'k8s-debugging',
      },
    ],
  },
]
