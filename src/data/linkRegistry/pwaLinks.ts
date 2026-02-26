import type { RegistryLink } from './types'

export const pwaLinks: RegistryLink[] = [
  // ─── Documentation ─────────────────────────────────────────────────
  {
    id: 'pwa-mdn-pwa',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps',
    label: 'Progressive Web Apps — MDN',
    source: 'MDN',
    desc: 'Comprehensive MDN guide to PWA fundamentals, Service Workers, and Web App Manifest',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Documentation',
  },
  {
    id: 'pwa-web-dev-pwa',
    url: 'https://web.dev/explore/progressive-web-apps',
    label: 'Learn PWA — web.dev',
    source: 'web.dev',
    desc: 'Google\u2019s comprehensive PWA learning path with tutorials, best practices, and case studies',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Documentation',
  },
  {
    id: 'pwa-mdn-service-worker',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API',
    label: 'Service Worker API — MDN',
    source: 'MDN',
    desc: 'Complete reference for the Service Worker API — lifecycle, events, caching, and fetch interception',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Documentation',
  },
  {
    id: 'pwa-mdn-manifest',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Manifest',
    label: 'Web App Manifest — MDN',
    source: 'MDN',
    desc: 'MDN reference for the Web App Manifest JSON file — fields, icons, display modes, and installability',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Documentation',
  },

  // ─── Libraries & Tools ─────────────────────────────────────────────
  {
    id: 'pwa-workbox',
    url: 'https://developer.chrome.com/docs/workbox',
    label: 'Workbox — Chrome Developers',
    source: 'Chrome',
    desc: 'Google\u2019s production-ready Service Worker library — caching strategies, precaching, background sync, and more',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'pwa-vite-plugin-pwa',
    url: 'https://vite-pwa-org.netlify.app/',
    label: 'Vite Plugin PWA',
    source: 'vite-pwa-org',
    desc: 'Zero-config PWA plugin for Vite — generates Service Workers, manifests, and provides React hooks',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'pwa-maskable-app',
    url: 'https://maskable.app/',
    label: 'Maskable.app',
    source: 'maskable.app',
    desc: 'Preview and test maskable icons for your PWA — see how they\u2019ll look on different platforms',
    tags: ['tool', 'free', 'guide:pwa'],
    resourceCategory: 'Libraries & Tools',
  },

  // ─── Standards & APIs ──────────────────────────────────────────────
  {
    id: 'pwa-mdn-push-api',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Push_API',
    label: 'Push API — MDN',
    source: 'MDN',
    desc: 'MDN reference for the Push API — subscribe to push services and handle push events in Service Workers',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Standards & APIs',
  },
  {
    id: 'pwa-mdn-bg-sync',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API',
    label: 'Background Sync API — MDN',
    source: 'MDN',
    desc: 'Defer actions until connectivity is restored — queue and replay failed requests automatically',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Standards & APIs',
  },
  {
    id: 'pwa-mdn-cache-api',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Cache',
    label: 'Cache API — MDN',
    source: 'MDN',
    desc: 'The Cache interface for storing and retrieving HTTP request/response pairs in Service Workers',
    tags: ['docs', 'free', 'guide:pwa'],
    resourceCategory: 'Standards & APIs',
  },
]
