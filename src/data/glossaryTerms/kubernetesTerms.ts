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
      },
      {
        term: 'Docker',
        definition:
          'The most popular tool for building and running containers. A <code>Dockerfile</code> defines the build steps; <code>docker build</code> creates an image; <code>docker run</code> starts a container from that image.',
        linkId: 'docker-overview',
        sectionId: 'k8s-containers',
      },
      {
        term: 'Dockerfile',
        definition:
          'A text file with instructions for building a Docker image \u2014 like a build script that specifies the base OS, dependencies, app code, and startup command.',
        linkId: 'docker-dockerfile',
        sectionId: 'k8s-containers',
      },
      {
        term: 'Container Image',
        definition:
          'An immutable, versioned snapshot of a container\u2019s filesystem. Like a <code>dist/</code> folder for an entire application environment. Stored in registries like Docker Hub or AWS ECR.',
        linkId: 'docker-overview',
        sectionId: 'k8s-containers',
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
        sectionId: 'k8s-ecosystem',
      },
      {
        term: 'ConfigMap',
        definition:
          'A Kubernetes resource for storing non-confidential configuration data as key-value pairs. Like a <code>.env</code> file that pods can mount as files or environment variables.',
        linkId: 'k8s-configmaps',
        sectionId: 'k8s-ecosystem',
      },
    ],
  },
]
