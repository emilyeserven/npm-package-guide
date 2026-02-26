import type { GlossaryCategory } from './types'

export const pwaGlossary: GlossaryCategory[] = [
  {
    category: 'Progressive Web Apps',
    terms: [
      {
        term: 'PWA (Progressive Web App)',
        definition: 'A web application that uses Service Workers, a Web App Manifest, and HTTPS to deliver an installable, offline-capable, app-like experience — without an app store.',
        linkId: 'pwa-mdn-pwa',
        sectionId: 'pwa-what-is-pwa',
        guides: ['pwa'],
      },
      {
        term: 'Service Worker',
        definition: 'A JavaScript file that runs in a separate thread, acting as a programmable network proxy between your app and the network. Powers offline caching, push notifications, and background sync.',
        linkId: 'pwa-mdn-service-worker',
        sectionId: 'pwa-lifecycle',
        guides: ['pwa'],
      },
      {
        term: 'Web App Manifest',
        definition: 'A JSON file (<code>manifest.json</code>) that provides metadata about a PWA — name, icons, display mode, theme color, and start URL. Required for installability.',
        linkId: 'pwa-mdn-manifest',
        sectionId: 'pwa-manifest-fields',
        guides: ['pwa'],
      },
      {
        term: 'App Shell',
        definition: 'The minimal HTML, CSS, and JS needed to render a UI skeleton. Cached by the Service Worker and served instantly on repeat visits while dynamic content loads from the network.',
        linkId: 'pwa-web-dev-pwa',
        sectionId: 'pwa-app-shell',
        guides: ['pwa'],
      },
      {
        term: 'Workbox',
        definition: 'Google\u2019s production-ready library for Service Workers — provides battle-tested caching strategies, precaching, routing, background sync, and cache expiration plugins.',
        linkId: 'pwa-workbox',
        sectionId: 'pwa-workbox',
        guides: ['pwa'],
      },
      {
        term: 'Cache First',
        definition: 'A caching strategy that checks the cache before the network. Best for static assets (JS, CSS, fonts, images) that rarely change.',
        linkId: 'pwa-workbox',
        sectionId: 'pwa-caching-strategies',
        guides: ['pwa'],
      },
      {
        term: 'Network First',
        definition: 'A caching strategy that tries the network first and falls back to cache on failure. Best for API calls and frequently changing content.',
        linkId: 'pwa-workbox',
        sectionId: 'pwa-caching-strategies',
        guides: ['pwa'],
      },
      {
        term: 'Stale While Revalidate',
        definition: 'A caching strategy that returns the cached version immediately while fetching an update in the background. Balances speed with freshness for semi-dynamic content.',
        linkId: 'pwa-workbox',
        sectionId: 'pwa-caching-strategies',
        guides: ['pwa'],
      },
      {
        term: 'Precaching',
        definition: 'Downloading and caching a predefined list of URLs during the Service Worker\u2019s install event. Used for app shell assets that are known at build time.',
        linkId: 'pwa-workbox',
        sectionId: 'pwa-sw-precache-vs-runtime',
        guides: ['pwa'],
      },
      {
        term: 'Maskable Icon',
        definition: 'A PWA icon format that allows the OS to apply its own shape mask (circle, squircle, rounded square). The safe zone is the inner 80% of the image.',
        linkId: 'pwa-maskable-app',
        sectionId: 'pwa-icons',
        guides: ['pwa'],
      },
      {
        term: 'beforeinstallprompt',
        definition: 'A browser event fired when a PWA meets installability criteria. Can be intercepted to show a custom install UI instead of the default browser banner.',
        linkId: 'pwa-mdn-pwa',
        sectionId: 'pwa-install-prompt',
        guides: ['pwa'],
      },
      {
        term: 'Background Sync',
        definition: 'A Service Worker API that defers actions (like form submissions) until the user has a stable connection — replaying queued requests automatically when connectivity returns.',
        linkId: 'pwa-mdn-bg-sync',
        sectionId: 'pwa-bg-sync',
        guides: ['pwa'],
      },
    ],
  },
]
