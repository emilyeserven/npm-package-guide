import type { GuideSection, StartPageData } from './guideTypes'

// ── Types ───────────────────────────────────────────────────────────

export interface NginxLocationRule {
  pattern: string
  type: string
  priority: number
}

export interface NginxTestUrl {
  url: string
  matchIndex: number
  reason: string
}

export interface NginxLbStrategy {
  id: string
  label: string
}

export interface NginxConfigBlock {
  title: string
  code: string
}

export interface NginxCommand {
  cmd: string
  desc: string
}

// ── Location Matching Data ──────────────────────────────────────────

export const NGINX_LOCATIONS: NginxLocationRule[] = [
  { pattern: '= /', type: 'exact', priority: 1 },
  { pattern: '^~ /images/', type: 'preferential prefix', priority: 2 },
  { pattern: '~* \\.(gif|jpg|png)$', type: 'regex (case-insensitive)', priority: 3 },
  { pattern: '/api/', type: 'prefix', priority: 4 },
  { pattern: '/', type: 'prefix (catch-all)', priority: 5 },
]

export const NGINX_TEST_URLS: NginxTestUrl[] = [
  { url: '/', matchIndex: 0, reason: 'Exact match "= /" wins with highest priority' },
  { url: '/images/photo.jpg', matchIndex: 1, reason: '"^~ /images/" matches and stops searching (preferential prefix)' },
  { url: '/assets/logo.png', matchIndex: 2, reason: 'No prefix match, but regex "\\.(gif|jpg|png)$" matches the extension' },
  { url: '/api/users', matchIndex: 3, reason: 'Prefix "/api/" is the longest matching prefix' },
  { url: '/about', matchIndex: 4, reason: 'No specific match \u2014 falls through to catch-all "/"' },
]

// ── Load Balancing Data ─────────────────────────────────────────────

export const LB_STRATEGIES: NginxLbStrategy[] = [
  { id: 'round-robin', label: 'Round Robin' },
  { id: 'least-conn', label: 'Least Connections' },
  { id: 'weighted', label: 'Weighted (3:1:1)' },
]

export const LB_SERVERS = ['Server A', 'Server B', 'Server C']

// ── Essential Commands ──────────────────────────────────────────────

export const NGINX_COMMANDS: NginxCommand[] = [
  { cmd: 'sudo apt install nginx', desc: 'Install on Debian/Ubuntu (including Raspberry Pi OS)' },
  { cmd: 'sudo nginx -t', desc: 'Test config for syntax errors \u2014 ALWAYS run before reloading' },
  { cmd: 'sudo nginx -s reload', desc: 'Reload config with zero downtime (graceful)' },
  { cmd: 'sudo systemctl status nginx', desc: 'Check if Nginx is running and view recent logs' },
  { cmd: 'sudo systemctl enable nginx', desc: 'Start Nginx automatically on boot' },
  { cmd: 'tail -f /var/log/nginx/error.log', desc: 'Watch error log in real-time for debugging' },
  { cmd: 'tail -f /var/log/nginx/access.log', desc: 'Watch access log \u2014 see every incoming request' },
  { cmd: 'sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/', desc: 'Enable a site config (Debian/Ubuntu convention)' },
  { cmd: 'curl -I http://localhost', desc: 'Quick test \u2014 view response headers from your server' },
]

// ── Navigation ──────────────────────────────────────────────────────

export const NGINX_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['nginx-start'] },
  { label: 'Fundamentals', ids: ['nginx-what-is', 'nginx-core-concepts'] },
  { label: 'Serving & Proxying', ids: ['nginx-static', 'nginx-reverse-proxy'] },
  { label: 'Security & TLS', ids: ['nginx-ssl-tls', 'nginx-security'] },
  { label: 'Scaling', ids: ['nginx-load-balancing', 'nginx-enterprise'] },
  { label: 'Practical', ids: ['nginx-raspberry-pi', 'nginx-commands'] },
]

export const NGINX_START_PAGE_DATA: StartPageData = {
  subtitle: 'Reverse proxy \u00b7 static files \u00b7 SSL/TLS \u00b7 load balancing \u00b7 security \u00b7 Raspberry Pi.',
  tip: 'For backend engineers who deploy apps but have never configured the web server in front of them.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Understand the Engine',
      description: 'Learn what Nginx is, how its event-driven architecture differs from Apache, and master the configuration hierarchy.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'nginx-what-is': 'Architecture comparison, event loop model, and why Nginx dominates the modern web.',
        'nginx-core-concepts': 'Directives, contexts, and the interactive location-block matching demo.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Serve & Proxy',
      description: 'Deliver static files for SPAs and route traffic to your backend services through a reverse proxy.',
      sectionLabel: 'Serving & Proxying',
      subItemDescriptions: {
        'nginx-static': 'Serve React/Vite SPAs with gzip, caching, and the essential try_files directive.',
        'nginx-reverse-proxy': 'Forward requests to Node.js apps, WebSocket support, and multi-service routing.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Lock It Down',
      description: 'Add HTTPS with Let\u2019s Encrypt and harden your server against common attacks.',
      sectionLabel: 'Security & TLS',
      subItemDescriptions: {
        'nginx-ssl-tls': 'HTTPS setup with Certbot, modern TLS settings, and HTTP-to-HTTPS redirects.',
        'nginx-security': 'Rate limiting, security headers, IP allowlisting, and blocking exploit paths.',
      },
    },
    {
      type: 'bonus',
      title: 'Scale & Deploy',
      description: 'Distribute traffic across servers and build enterprise-grade infrastructure patterns.',
      sectionLabel: 'Scaling',
      subItemDescriptions: {
        'nginx-load-balancing': 'Round robin, weighted, least connections, and the interactive load balancing simulator.',
        'nginx-enterprise': 'API gateways, canary deployments, and high-availability caching layers.',
      },
    },
    {
      type: 'bonus',
      title: 'Practical Reference',
      description: 'Raspberry Pi homelab setups and an essential commands cheat sheet.',
      sectionLabel: 'Practical',
      subItemDescriptions: {
        'nginx-raspberry-pi': 'Pi home dashboard, performance tuning for limited resources, and local HTTPS dev server.',
        'nginx-commands': 'Day-to-day operations cheat sheet \u2014 install, test, reload, debug.',
      },
    },
  ],
  relatedGuides: ['coolify-deploy', 'kubernetes'],
}
