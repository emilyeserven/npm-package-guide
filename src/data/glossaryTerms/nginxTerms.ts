import type { GlossaryCategory } from './types'

export const nginxGlossary: GlossaryCategory[] = [
  {
    category: "Web Servers & Proxying",
    terms: [
      {
        term: "Nginx",
        definition: "An open-source, event-driven web server and reverse proxy. Uses a non-blocking I/O model with master + worker processes to handle thousands of concurrent connections with minimal memory.",
        linkId: "nginx-docs",
        sectionId: "nginx-what-is",
      },
      {
        term: "Reverse Proxy",
        definition: "A server that sits between clients and backend services, forwarding requests on behalf of clients. Handles TLS termination, routing, caching, and load balancing so your app doesn\u2019t have to.",
        linkId: "nginx-proxy-pass",
        sectionId: "nginx-reverse-proxy",
        guides: ['nginx', 'coolify-deploy'],
      },
      {
        term: "Location Block",
        definition: "An Nginx configuration directive that matches incoming request URLs to specific handling rules. Supports exact match (<code>=</code>), preferential prefix (<code>^~</code>), regex (<code>~</code>), and plain prefix matching.",
        linkId: "nginx-directives",
        sectionId: "nginx-core-concepts",
      },
      {
        term: "try_files",
        definition: "An Nginx directive that checks for files in order and serves the first match. Essential for SPAs: <code>try_files $uri $uri/ /index.html</code> falls back to the app shell when no static file exists.",
        linkId: "nginx-try-files-ref",
        sectionId: "nginx-static",
        guides: ['nginx', 'coolify-deploy'],
      },
      {
        term: "upstream",
        definition: "An Nginx block that defines a pool of backend servers for load balancing. Supports round-robin, weighted, least-connections, and IP-hash strategies.",
        linkId: "nginx-upstream",
        sectionId: "nginx-load-balancing",
      },
      {
        term: "proxy_pass",
        definition: "The Nginx directive that forwards a request to a backend server or upstream group. A trailing slash strips the location prefix from the forwarded path.",
        linkId: "nginx-proxy-pass",
        sectionId: "nginx-reverse-proxy",
      },
    ],
  },
  {
    category: "TLS & Security",
    terms: [
      {
        term: "TLS Termination",
        definition: "The process of decrypting HTTPS traffic at the reverse proxy layer, then forwarding plain HTTP to backend services. Offloads encryption overhead from your application servers.",
        linkId: "nginx-docs",
        sectionId: "nginx-ssl-tls",
      },
      {
        term: "Let\u2019s Encrypt",
        definition: "A free, automated Certificate Authority that issues TLS certificates trusted by all major browsers. Certificates last 90 days and auto-renew via Certbot.",
        linkId: "letsencrypt-getting-started",
        sectionId: "nginx-ssl-tls",
        guides: ['nginx', 'coolify-deploy'],
      },
      {
        term: "HSTS",
        definition: "HTTP Strict Transport Security \u2014 a security header that tells browsers to only connect via HTTPS. Once set, browsers refuse plain HTTP connections for the specified duration.",
        linkId: "owasp-secure-headers",
        sectionId: "nginx-ssl-tls",
      },
      {
        term: "Rate Limiting (Nginx)",
        definition: "Nginx\u2019s <code>limit_req</code> directive restricts request frequency per client IP. The <code>burst</code> parameter defines a queue size, and <code>nodelay</code> serves queued requests immediately rather than throttling.",
        linkId: "nginx-docs",
        sectionId: "nginx-security",
      },
    ],
  },
  {
    category: "Load Balancing & Scaling",
    terms: [
      {
        term: "Round Robin",
        definition: "The default Nginx load balancing strategy \u2014 distributes requests to each backend server in sequence. Simple and effective when servers have equal capacity.",
        linkId: "nginx-upstream",
        sectionId: "nginx-load-balancing",
      },
      {
        term: "Canary Deployment",
        definition: "A deployment strategy that routes a small percentage of traffic to a new version while the majority still hits the stable version. Nginx\u2019s <code>split_clients</code> directive enables percentage-based routing.",
        linkId: "nginx-docs",
        sectionId: "nginx-enterprise",
      },
      {
        term: "proxy_cache_use_stale",
        definition: "An Nginx directive that serves cached content when the backend is unavailable. A production resilience pattern \u2014 users see slightly outdated data instead of error pages.",
        linkId: "nginx-caching",
        sectionId: "nginx-enterprise",
      },
    ],
  },
]
