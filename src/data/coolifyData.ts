/* ───────────────────────── TYPES ───────────────────────── */

export interface TrafficStep {
  label: string
  sublabel?: string
  color: 'purple' | 'teal' | 'yellow' | 'blue' | 'green'
}

export interface FoundationTopic {
  id: string
  icon: string
  title: string
  paragraphs: string[]
  tip?: { type: 'tip' | 'info' | 'warn'; title: string; body: string }
  bullets?: string[]
}

export interface BuildPackRow {
  approach: string
  when: string
  complexity: string
  complexityColor: string
}

export interface DeployStep {
  num: number
  title: string
  body: string
  code?: string
}

export interface CoolifyGotcha {
  severity: 'red' | 'yellow'
  title: string
  cause: string
  fix: string
}

export interface ChecklistGroup {
  heading: string
  items: string[]
}

export interface PiModel {
  model: string
  ram: string
  verdict: string
  verdictColor: string
}

export interface PiPerformanceTip {
  id: string
  icon: string
  title: string
  paragraphs: string[]
  code?: string
  tip?: { type: 'tip' | 'info' | 'warn'; title: string; body: string }
}

export interface PiGotcha {
  severity: 'red' | 'yellow'
  title: string
  body: string
  bullets?: string[]
}

/* ───────────────────────── TRAFFIC FLOW DIAGRAM ───────────────────────── */

export const TRAFFIC_STEPS: TrafficStep[] = [
  { label: 'Browser', color: 'purple' },
  { label: 'DNS Resolver', color: 'teal' },
  { label: 'TLS / SSL', color: 'yellow' },
  { label: 'Traefik Proxy', color: 'blue' },
  { label: 'Docker Container', sublabel: 'Nginx + dist/', color: 'green' },
]

/* ───────────────────────── FOUNDATIONS TOPICS ───────────────────────── */

export const FOUNDATION_TOPICS: FoundationTopic[] = [
  {
    id: 'dns',
    icon: '\u{1F517}',
    title: 'DNS \u2014 Translating domain names to IP addresses',
    paragraphs: [
      'DNS (Domain Name System) converts human-readable names like <code>app.yourdomain.com</code> into the IP address of your server. You configure this at your domain registrar (Namecheap, Cloudflare, etc.) by creating <strong>A records</strong> or <strong>CNAME records</strong>.',
      '<strong>A Record</strong> \u2014 Maps a domain directly to an IPv4 address. Example: <code>app.yourdomain.com \u2192 203.0.113.42</code>',
      '<strong>CNAME Record</strong> \u2014 Maps a domain to another domain name (alias). Useful for subdomains that should follow another record.',
      'DNS changes propagate across the internet. This can take minutes to 48 hours, though most updates via Cloudflare are near-instant.',
    ],
    tip: {
      type: 'tip',
      title: 'Key point',
      body: "Each application\u2019s domain must point to the IP of the specific server where that app is deployed \u2014 not the Coolify dashboard server (if they\u2019re different). Coolify\u2019s proxy is per-server.",
    },
  },
  {
    id: 'tls',
    icon: '\u{1F512}',
    title: 'TLS/SSL \u2014 How HTTPS works',
    paragraphs: [
      'TLS (Transport Layer Security, the successor to SSL) encrypts traffic between the browser and your server. Without it, data travels in plain text \u2014 anyone on the network can read it.',
      'Certificates are issued by a <strong>Certificate Authority</strong> (CA). In the self-hosting world, <strong>Let\u2019s Encrypt</strong> is the standard \u2014 free, automated, and widely trusted. Certificates last 90 days and are auto-renewed.',
      "Coolify handles all of this automatically. When you set a domain with <code>https://</code> in Coolify, it tells Traefik to request a certificate from Let\u2019s Encrypt. No manual steps needed.",
    ],
    tip: {
      type: 'info',
      title: 'Cloudflare note',
      body: 'If using Cloudflare\u2019s proxy (orange cloud), set SSL mode to <strong>\u201CFull (strict)\u201D</strong> so Cloudflare trusts the Let\u2019s Encrypt cert on your origin. If you use \u201CFlexible\u201D, you\u2019ll get redirect loops. If you want Traefik to handle SSL directly, use <strong>\u201CDNS only\u201D</strong> (gray cloud) mode.',
    },
  },
  {
    id: 'reverse-proxy',
    icon: '\u{1F500}',
    title: 'Reverse Proxy \u2014 Traefik\u2019s role',
    paragraphs: [
      'A <strong>reverse proxy</strong> sits between the internet and your application containers. It receives all incoming HTTP/HTTPS requests on ports 80/443, then routes them to the correct container based on the domain name (the <code>Host</code> header).',
      'Coolify uses <strong>Traefik</strong> by default (with experimental Caddy support). Traefik auto-discovers containers via Docker labels, so when Coolify deploys your app, Traefik immediately knows how to route to it.',
      'This is why you can run dozens of apps on a single server with a single IP \u2014 Traefik multiplexes them by domain name.',
    ],
    bullets: [
      'Routes <code>app.yourdomain.com</code> \u2192 your React container',
      'Terminates TLS (handles the encrypted connection)',
      'Redirects HTTP \u2192 HTTPS automatically',
      'Load balances if you scale to multiple container instances',
    ],
  },
  {
    id: 'docker',
    icon: '\u{1F433}',
    title: 'Docker \u2014 Why containers matter',
    paragraphs: [
      'Coolify deploys <strong>everything</strong> as Docker containers. Even when you push a plain React project, Coolify (via Nixpacks) builds a Docker image, then runs a container from it.',
      'For a static React+Vite app, the resulting container typically runs <strong>Nginx</strong> serving your <code>dist/</code> folder. The container listens on an internal port (usually 80), and Traefik routes external traffic to it.',
      "You don\u2019t need to install Node.js, Nginx, or anything else on the host server \u2014 it\u2019s all inside the container. This is the magic of self-hosting with Coolify: your server only needs Docker and Coolify.",
    ],
  },
  {
    id: 'ports',
    icon: '\u{1F50C}',
    title: 'Ports \u2014 The concept frontend devs often miss',
    paragraphs: [
      'Ports are like apartment numbers on a building (IP address). Port <strong>80</strong> is HTTP, port <strong>443</strong> is HTTPS, and port <strong>8000</strong> is where Coolify\u2019s dashboard lives.',
      'When Coolify says <strong>\u201CPorts Exposes\u201D</strong>, it means the port your app listens on <em>inside</em> its container. For a static Vite build served by Nginx, this is <code>80</code>. Traefik handles the external 80/443 routing \u2014 you generally don\u2019t expose app ports directly to the internet.',
      'Your VPS firewall should only expose ports <strong>22</strong> (SSH), <strong>80</strong> (HTTP), <strong>443</strong> (HTTPS), and <strong>8000</strong> (Coolify dashboard). Everything else should be closed.',
    ],
  },
]

/* ───────────────────────── BUILD PACKS ───────────────────────── */

export const BUILD_PACKS: BuildPackRow[] = [
  {
    approach: 'Nixpacks (default)',
    when: 'Simple static sites. Coolify auto-detects your project, builds it, and serves dist/ via Nginx.',
    complexity: 'Low',
    complexityColor: '#4ade80',
  },
  {
    approach: 'Dockerfile',
    when: 'When you need custom Nginx config (SPA routing, custom headers, caching). You write the Dockerfile yourself.',
    complexity: 'Medium',
    complexityColor: '#fbbf24',
  },
]

/* ───────────────────────── DEPLOY STEPS ───────────────────────── */

export const NIXPACKS_STEPS: DeployStep[] = [
  {
    num: 1,
    title: 'Create a New Resource',
    body: 'Open your Project in Coolify \u2192 Create New Resource \u2192 select your Git source \u2192 pick your repository and branch.',
  },
  {
    num: 2,
    title: 'Configure Build Settings',
    body: 'Set the following in the Configuration screen:',
    code: 'Build Pack:      Nixpacks\nIs Static Site:  Enabled\nBuild Command:   npm run build  (or pnpm build)\nPublish Dir:     dist',
  },
  {
    num: 3,
    title: 'Set Your Domain',
    body: 'Enter your domain with https:// protocol (e.g., https://app.yourdomain.com). Make sure you have the DNS A record pointing to this server\u2019s IP. Click Save.',
  },
  {
    num: 4,
    title: 'Deploy',
    body: 'Click Deploy and watch the build log. First builds take 2\u20135 minutes. Subsequent builds are faster thanks to caching.',
  },
]

export const DOCKERFILE_STEPS: DeployStep[] = [
  {
    num: 1,
    title: 'Add Nginx config to your repo',
    body: 'Create an nginx.conf in your repo root:',
    code: `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json
               application/javascript text/xml image/svg+xml;

    # Cache static assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback \u2014 the critical line
    location / {
        try_files $uri $uri/ /index.html;
    }
}`,
  },
  {
    num: 2,
    title: 'Add a Dockerfile to your repo root',
    body: 'Multi-stage build: Node for building, Nginx for serving:',
    code: `# --- Build stage ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Production stage ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80`,
  },
  {
    num: 3,
    title: 'Configure in Coolify',
    body: 'Create a new resource \u2192 select your repo. Then set:',
    code: 'Build Pack:          Dockerfile\nDockerfile Location: /Dockerfile\nPorts Exposes:        80',
  },
]

/* ───────────────────────── NGINX SPA FIX ───────────────────────── */

export const SPA_FIX_CODE = `location / {
    try_files $uri $uri/ /index.html;
}`

export const DOCKERFILE_ENV_EXAMPLE = `FROM node:22-alpine AS build
WORKDIR /app

# Declare build args that Coolify will inject
ARG VITE_API_URL
ARG VITE_APP_TITLE

# Make them available as env vars during build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_TITLE=$VITE_APP_TITLE

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80`

/* ───────────────────────── GOTCHAS ───────────────────────── */

export const COOLIFY_GOTCHAS: CoolifyGotcha[] = [
  {
    severity: 'red',
    title: 'MIME type error: "Expected JavaScript module but got text/plain"',
    cause: 'You unchecked "Is Static Site" but didn\u2019t provide a proper Dockerfile. Nixpacks tries to run Vite\u2019s dev server (or preview server) in production, and it doesn\u2019t serve files with correct MIME types.',
    fix: 'Either enable "Is Static Site" (for Nixpacks) or use a custom Dockerfile with Nginx. Don\u2019t try to run vite preview in production via Nixpacks \u2014 it\u2019s unreliable.',
  },
  {
    severity: 'red',
    title: '404 on all routes except /',
    cause: 'Nginx doesn\u2019t have the try_files fallback for SPAs.',
    fix: 'See the SPA Routing page for the full explanation and fix.',
  },
  {
    severity: 'yellow',
    title: 'Build takes forever (10+ minutes)',
    cause: 'The first Nixpacks build downloads and compiles the entire Node.js environment. Also, small VPS instances (1GB RAM) may struggle and swap heavily during builds.',
    fix: 'Use at least 2GB RAM on your VPS (4GB is ideal). Add a swap file if on a tight budget. Subsequent builds use caching and are much faster. Coolify supports dedicated build servers to offload from production.',
  },
  {
    severity: 'yellow',
    title: 'SSL certificate not issuing',
    cause: 'DNS isn\u2019t propagated yet, or Cloudflare proxy (orange cloud) is interfering with HTTP-01 challenge.',
    fix: 'Verify DNS with dig app.yourdomain.com \u2014 it should return your server\u2019s IP. If using Cloudflare, temporarily set the record to "DNS Only" (gray cloud) while the cert issues. Check Traefik logs in Coolify: Servers \u2192 your server \u2192 Proxy \u2192 Logs.',
  },
  {
    severity: 'yellow',
    title: 'Environment variables are undefined in production',
    cause: '"Build Variable" wasn\u2019t checked, or (with Dockerfile) the ARG/ENV declarations are missing.',
    fix: 'Add a temporary console.log(import.meta.env) to your app and check the browser console. Every VITE_ variable needs "Build Variable" enabled. Dockerfiles need explicit ARG + ENV lines.',
  },
  {
    severity: 'yellow',
    title: 'Deployment succeeds but site shows old version',
    cause: 'Browser is serving cached assets, or Cloudflare\u2019s edge cache hasn\u2019t purged.',
    fix: 'Vite uses content-hashed filenames by default. Hard refresh with Ctrl+Shift+R (or Cmd+Shift+R). If using Cloudflare, purge cache. Ensure your Nginx config has proper cache headers \u2014 immutable caching for /assets/ and no-cache for index.html.',
  },
  {
    severity: 'yellow',
    title: 'Coolify auto-generated Traefik labels look wrong',
    cause: 'After changing domains or settings, the Traefik labels get stale.',
    fix: 'In your resource\u2019s settings, click "Reset to Coolify Default Labels" and save. Then redeploy. This regenerates the labels based on your current domain config.',
  },
  {
    severity: 'yellow',
    title: 'Health check fails and Traefik won\u2019t route traffic',
    cause: 'Coolify\u2019s default health check may not match your container\u2019s behavior. Traefik refuses to route traffic to unhealthy containers.',
    fix: 'If you don\u2019t need custom health checks, disable them in the resource\u2019s Health Checks settings. For static sites served by Nginx, the default container health is fine.',
  },
]

/* ───────────────────────── DEPLOYMENT CHECKLIST ───────────────────────── */

export const DEPLOY_CHECKLIST: ChecklistGroup[] = [
  {
    heading: 'Pre-Deploy',
    items: [
      'VPS has at least 2GB RAM and Docker installed',
      'Coolify is installed and accessible at :8000',
      'DNS A record points your domain to the server\u2019s IP',
      'Firewall allows ports 22, 80, 443, 8000',
      'Git repository is connected (GitHub App or deploy key)',
    ],
  },
  {
    heading: 'Configuration',
    items: [
      'Build pack is set (Nixpacks or Dockerfile)',
      'If Nixpacks: "Is Static Site" is enabled with Publish Dir = dist',
      'If Dockerfile: Ports Exposes is set to 80',
      'Domain is entered with https:// protocol',
      'All VITE_ env vars have "Build Variable" checked',
      'If Dockerfile: ARG + ENV lines exist for each VITE_ var',
    ],
  },
  {
    heading: 'SPA Routing',
    items: [
      'Nginx try_files $uri $uri/ /index.html is configured',
      'A catch-all / 404 route exists in TanStack Router',
      'Tested: direct navigation to a sub-route works after refresh',
    ],
  },
  {
    heading: 'Post-Deploy',
    items: [
      'Site loads on the custom domain with HTTPS',
      'Client-side routing works (navigate, then refresh)',
      'import.meta.env values are present (check browser console)',
      'Assets are cache-busted (check Network tab for hashed filenames)',
      'Auto-deploy on push is working (if using GitHub App)',
    ],
  },
  {
    heading: 'Raspberry Pi\u2013Specific (if applicable)',
    items: [
      'Running 64-bit OS (uname -m shows aarch64)',
      'Swap is configured (4GB+ on SSD, not SD card)',
      'Cloudflare Tunnel is running and healthy',
      'App domains use http:// (not https://) in Coolify when using CF Tunnel',
      'Wildcard CNAME record exists in Cloudflare DNS',
      'Pi has active cooling (fan or heatsinks)',
    ],
  },
]

/* ───────────────────────── RASPBERRY PI ───────────────────────── */

export const PI_MODELS: PiModel[] = [
  { model: 'Pi 5 (8GB)', ram: '8GB', verdict: 'Best choice \u2014 fast builds, runs multiple apps comfortably', verdictColor: '#4ade80' },
  { model: 'Pi 5 (4GB)', ram: '4GB', verdict: 'Great for a few lightweight apps', verdictColor: '#4ade80' },
  { model: 'Pi 4 (8GB)', ram: '8GB', verdict: 'Works well \u2014 widely tested', verdictColor: '#4ade80' },
  { model: 'Pi 4 (4GB)', ram: '4GB', verdict: 'Workable with swap, builds are slow', verdictColor: '#fbbf24' },
  { model: 'Pi 4 (2GB)', ram: '2GB', verdict: 'Bare minimum \u2014 crashes likely without tuning', verdictColor: '#fb923c' },
  { model: 'Pi 3 / Zero 2 W', ram: '1GB', verdict: 'Not recommended \u2014 OOM during builds', verdictColor: '#f87171' },
]

export const PI_PERFORMANCE_TIPS: PiPerformanceTip[] = [
  {
    id: 'swap',
    icon: '\u{1F4BE}',
    title: 'Add swap space (mandatory for 2\u20134GB models)',
    paragraphs: [
      'Docker builds, especially the <code>npm ci</code> step, are memory-hungry. Without swap, builds will get OOM-killed.',
    ],
    code: `# Create a 4GB swap file
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make it permanent across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Reduce swappiness \u2014 prefer RAM, swap only when needed
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p`,
    tip: {
      type: 'info',
      title: 'SD card warning',
      body: 'Swap on an SD card wears it out quickly. If you\u2019re relying on heavy swap, strongly consider booting from a <strong>USB SSD</strong> instead. A cheap 120GB SATA SSD via a USB 3.0 adapter transforms Pi performance.',
    },
  },
  {
    id: 'docker-memory',
    icon: '\u{1F9CA}',
    title: 'Limit Docker memory to prevent crashes',
    paragraphs: [
      'On 2GB Pis, Coolify + Docker + builds can exhaust memory and lock up the system. The official Coolify docs recommend limiting Docker\u2019s memory:',
    ],
    code: `# /etc/docker/daemon.json
{
  "memory": "1.5g",
  "memory-swap": "3g"
}

# Then restart Docker:
sudo systemctl restart docker`,
  },
  {
    id: 'usb-ssd',
    icon: '\u{1F4BF}',
    title: 'Use USB SSD instead of SD card',
    paragraphs: [
      'The single biggest performance upgrade you can make. SD cards have abysmal random I/O, which Docker depends on heavily. A USB SSD gives you 5\u201310x faster builds and far more reliable storage.',
      '<strong>For Pi 4 and 5:</strong> Plug a SATA SSD via a USB 3.0 enclosure (or NVMe via a USB 3.0 adapter for Pi 5). Use <code>raspi-config</code> \u2192 Advanced \u2192 Boot Order \u2192 set USB boot as primary.',
      'A 120GB SATA SSD costs around $15\u201320 and completely changes the experience.',
    ],
  },
  {
    id: 'thermal',
    icon: '\u{1F321}\uFE0F',
    title: 'Thermal management',
    paragraphs: [
      'Docker builds push the CPU hard. Without cooling, the Pi will thermal-throttle and builds take 2\u20133x longer.',
    ],
  },
]

export const PI_GOTCHAS: PiGotcha[] = [
  {
    severity: 'red',
    title: 'ARM image compatibility',
    body: 'Not every Docker image on Docker Hub supports ARM64. The <code>nginx:alpine</code> and <code>node:22-alpine</code> images used in this guide\u2019s Dockerfile <strong>do</strong> support ARM64 via multi-arch manifests, so the recommended Dockerfile approach works out of the box on a Pi.',
  },
  {
    severity: 'yellow',
    title: 'Builds are significantly slower',
    body: 'Expect first-time builds to take <strong>5\u201315 minutes</strong> on a Pi 4, compared to 2\u20135 minutes on a VPS. Subsequent builds with cached layers are much faster (1\u20133 minutes).',
    bullets: [
      'Use a USB SSD (the biggest single improvement)',
      'Keep <code>package-lock.json</code> stable so the <code>npm ci</code> layer gets cached',
      'Use the Dockerfile approach \u2014 multi-stage build avoids shipping Node.js in the final image',
      'Coolify supports <strong>dedicated build servers</strong> \u2014 build on a powerful remote machine, deploy the image to your Pi',
    ],
  },
  {
    severity: 'yellow',
    title: 'Coolify dashboard at public IP won\u2019t work',
    body: 'After installation, Coolify shows a URL with your public IP. This won\u2019t work because your Pi is behind NAT. Use your Pi\u2019s <strong>local IP</strong> instead (run <code>hostname -I</code>).',
  },
  {
    severity: 'yellow',
    title: 'Pi crashes during builds (2GB models)',
    body: 'The Coolify docs acknowledge this: 2GB Pis crash even with swap, especially on slow SD cards.',
    bullets: [
      'Upgrade to 4GB+ RAM',
      'Add swap on a fast storage device (USB SSD)',
      'Limit Docker memory via <code>/etc/docker/daemon.json</code>',
      'Use Pi OS <strong>Lite</strong> \u2014 the desktop environment eats 200\u2013400MB of RAM you can\u2019t afford',
    ],
  },
]

/* ───────────────────────── NAVIGATION ───────────────────────── */

import type { GuideSection, StartPageData, GuideManifest, ChecklistManifest, ChecklistBaseSection } from './guideTypes'

export const COOLIFY_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['cd-start'] },
  { label: 'Foundations', ids: ['cd-foundations'] },
  { label: 'Setup & Deploy', ids: ['cd-coolify-setup', 'cd-raspberry-pi', 'cd-deploy'] },
  { label: 'Configuration', ids: ['cd-spa-routing', 'cd-env-vars'] },
  { label: 'Reference', ids: ['cd-gotchas', 'cd-checklist'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const COOLIFY_START_PAGE_DATA: StartPageData = {
  subtitle: 'DNS \u00b7 Docker \u00b7 Traefik \u00b7 Deployment \u2014 self-host with confidence.',
  tip: 'Designed for frontend engineers deploying a React + Vite app to their own server for the first time.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Networking Foundations',
      description: 'Build a mental model of how traffic flows from a browser to your app running in a Docker container \u2014 DNS, TLS, reverse proxies, and ports.',
      jumpTo: 'cd-foundations',
    },
    {
      type: 'bonus',
      title: 'Setup & Deploy',
      description: 'Install Coolify, connect your Git provider, and deploy your first React + Vite app step by step.',
      sectionLabel: 'Setup & Deploy',
      subItemDescriptions: {
        'cd-coolify-setup': 'Install Coolify on your VPS, connect Git, and choose your build pack.',
        'cd-raspberry-pi': 'Run Coolify on a Raspberry Pi \u2014 hardware, OS setup, performance tuning, and Cloudflare Tunnel.',
        'cd-deploy': 'Create a resource and deploy with Nixpacks or a custom Dockerfile.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Fix SPA Routing',
      description: 'Understand why client-side routes 404 on refresh and how to fix it with Nginx\u2019s try_files directive.',
      jumpTo: 'cd-spa-routing',
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Environment Variables',
      description: 'Learn how Vite\u2019s build-time replacement works and why "Build Variable" must be checked in Coolify.',
      jumpTo: 'cd-env-vars',
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Gotchas & Checklist',
      description: 'Common issues with fixes, plus a comprehensive deployment checklist to use every time you ship.',
      jumpTo: 'cd-gotchas',
    },
  ],
}

export const COOLIFY_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'coolify-deploy',
    icon: '🚀',
    title: 'Deploy on Coolify',
    startPageId: 'cd-start',
    description: 'Deploy React + Vite on Coolify \u2014 from DNS fundamentals to production gotchas, including Raspberry Pi self-hosting with Cloudflare Tunnel.',
    category: 'infrastructure',
    dateCreated: '2026-02-24',
    dateModified: '2026-02-26',
    sections: COOLIFY_GUIDE_SECTIONS,
  },
  startPageData: COOLIFY_START_PAGE_DATA,
}

// ── Checklist manifest ──────────────────────────────────────────────

const COOLIFY_ICONS: Record<string, string> = {
  'Pre-Deploy': '\u{1F680}',
  Configuration: '\u2699\uFE0F',
  'SPA Routing': '\u{1F517}',
  'Post-Deploy': '\u2705',
  'Raspberry Pi\u2013Specific (if applicable)': '\u{1F353}',
}

export const COOLIFY_CHECKLIST: ChecklistBaseSection[] = DEPLOY_CHECKLIST.map(g => ({
  id: g.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name: g.heading,
  icon: COOLIFY_ICONS[g.heading] ?? '\u2705',
  items: g.items.map(label => ({ label })),
}))

export const COOLIFY_CHECKLIST_MANIFEST: ChecklistManifest = {
  id: 'coolify',
  sourceGuideId: 'coolify-deploy',
  title: 'Coolify Deploy Checklist',
  sections: COOLIFY_CHECKLIST,
}
