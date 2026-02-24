import type { GlossaryCategory } from './index'

export const coolifyGlossary: GlossaryCategory[] = [
  {
    category: "Self-Hosting & Deployment",
    terms: [
      {
        term: "Coolify",
        definition: "An open-source, self-hostable alternative to Netlify/Vercel. Deploys apps as Docker containers on your own VPS with automatic SSL, Git integration, and a web dashboard.",
        linkId: "coolify-docs",
        sectionId: "cd-coolify-setup",
      },
      {
        term: "Reverse Proxy",
        definition: "A server that sits between the internet and your application containers. It routes incoming requests to the correct container based on the domain name. Coolify uses Traefik by default.",
        linkId: "traefik-docs",
        sectionId: "cd-foundations",
      },
      {
        term: "Traefik",
        definition: "A modern reverse proxy and load balancer that auto-discovers Docker containers via labels. Handles domain routing, TLS termination, and HTTP\u2192HTTPS redirection. The default proxy in Coolify.",
        linkId: "traefik-docs",
        sectionId: "cd-foundations",
      },
      {
        term: "Nixpacks",
        definition: "A build system used by Coolify (and Railway) that auto-detects your project type and generates a Docker image without requiring a Dockerfile. Supports Node.js, Python, Go, and many other languages.",
        linkId: "nixpacks-docs",
        sectionId: "cd-coolify-setup",
      },
      {
        term: "Let\u2019s Encrypt",
        definition: "A free, automated Certificate Authority that issues TLS certificates trusted by all major browsers. Certificates last 90 days and auto-renew. Coolify and Traefik handle this automatically.",
        linkId: "letsencrypt-about",
        sectionId: "cd-foundations",
      },
      {
        term: "try_files",
        definition: "An Nginx directive that tries to serve the requested file and falls back to a specified file (usually <code>/index.html</code>) if not found. Essential for SPA client-side routing to work on page refresh.",
        linkId: "nginx-try-files",
        sectionId: "cd-spa-routing",
      },
      {
        term: "Build Variable (Coolify)",
        definition: "A Coolify setting that makes an environment variable available during the Docker build step. Required for <code>VITE_</code> prefixed variables since Vite statically replaces them at build time.",
        linkId: "vite-env-coolify",
        sectionId: "cd-env-vars",
      },
      {
        term: "Multi-Stage Build",
        definition: "A Docker technique using multiple <code>FROM</code> statements to separate the build environment (Node.js) from the production image (Nginx). Results in much smaller final images since build tools aren\u2019t included.",
        linkId: "docker-multi-stage",
        sectionId: "cd-deploy",
        guides: ['coolify-deploy', 'kubernetes'],
      },
      {
        term: "Cloudflare Tunnel",
        definition: "An encrypted outbound connection from your server to Cloudflare\u2019s edge network. Allows exposing local services (like a Raspberry Pi homelab) to the internet without opening firewall ports or needing a public IP.",
        linkId: "cloudflare-tunnel-docs",
        sectionId: "cd-raspberry-pi",
      },
    ],
  },
]
