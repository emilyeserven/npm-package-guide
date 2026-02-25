# Nginx Essentials — Guide CLAUDE.md

## Audience & Purpose

Backend engineers who deploy apps but have never configured the web server in front of them. Covers Nginx from architecture fundamentals through production patterns — reverse proxy, static files, SSL/TLS, load balancing, security hardening, and Raspberry Pi homelab setups.

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `NginxComparison` | *(none)* | Apache vs Nginx architecture comparison |
| `NginxEventLoopDiagram` | *(none)* | SVG diagram of master/worker event loop architecture |
| `NginxLocationDemo` | *(none)* | Interactive URL-to-location-block matching demo |
| `NginxLoadBalancingDemo` | *(none)* | Interactive load balancing strategy simulator |
| `NginxReverseProxyDiagram` | *(none)* | SVG diagram of reverse proxy traffic flow |
| `NginxEnterpriseDiagram` | *(none)* | SVG diagram of enterprise architecture with sidecars |
| `NginxCommandList` | *(none)* | Styled command cheat sheet from data |

## Guide-Specific Conventions

### Content style

- Nginx config blocks use fenced code with `nginx` language tag
- Shell commands in config comments are prefixed with `#`
- Callout types: `Explainer` for tips/analogies, `Gotcha` for warnings and "watch out" items
- Data for interactive components lives in `src/data/nginxData.ts`
- SVG diagrams use emerald accent colors via `ds()` helper for dark mode support
