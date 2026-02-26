import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface PwaTopicContent {
  title: string
  body: string
  keyPoints: string[]
  diagram?: 'lifecycle' | 'caching'
  code?: string
}

export interface LifecyclePhase {
  id: string
  label: string
  color: string
  darkColor: string
  desc: string
}

export interface CachingStrategy {
  id: string
  label: string
  color: string
  darkColor: string
  flow: string[]
  best: string
}

// ── Lifecycle diagram data ──────────────────────────────────────────

export const LIFECYCLE_PHASES: LifecyclePhase[] = [
  { id: 'register', label: 'Register', color: '#6c63ff', darkColor: '#8b83ff', desc: 'Browser downloads and parses the SW file' },
  { id: 'install', label: 'Installing', color: '#059669', darkColor: '#34d399', desc: 'install event fires — precache assets here' },
  { id: 'waiting', label: 'Waiting', color: '#d97706', darkColor: '#fbbf24', desc: 'New SW waits for old SW\u2019s pages to close' },
  { id: 'activate', label: 'Active', color: '#dc2626', darkColor: '#f87171', desc: 'activate event fires — clean old caches, SW controls pages' },
]

// ── Caching strategy diagram data ───────────────────────────────────

export const CACHING_STRATEGIES: Record<string, CachingStrategy> = {
  'cache-first': {
    id: 'cache-first',
    label: 'Cache First',
    color: '#6c63ff',
    darkColor: '#8b83ff',
    flow: ['Request', '\u2192 Cache?', '\u2192 \u2713 Return cached', '\u2192 \u2717 Fetch network', '\u2192 Cache + Return'],
    best: 'Static assets, fonts, images',
  },
  'network-first': {
    id: 'network-first',
    label: 'Network First',
    color: '#059669',
    darkColor: '#34d399',
    flow: ['Request', '\u2192 Network?', '\u2192 \u2713 Cache + Return', '\u2192 \u2717 Return cached'],
    best: 'API calls, dynamic HTML',
  },
  swr: {
    id: 'swr',
    label: 'Stale While Revalidate',
    color: '#d97706',
    darkColor: '#fbbf24',
    flow: ['Request', '\u2192 Return cached', '\u2192 Fetch network', '\u2192 Update cache'],
    best: 'Semi-dynamic content, avatars',
  },
}

// ── Topic content ───────────────────────────────────────────────────

export const PWA_TOPICS: Record<string, PwaTopicContent> = {
  'what-is-pwa': {
    title: 'What Is a Progressive Web App?',
    body: 'A Progressive Web App (PWA) is a web application that uses modern web capabilities to deliver an app-like experience. PWAs are not a single technology \u2014 they\u2019re a <strong>pattern</strong> built on three pillars: reliability, speed, and engagement.\n\nUnlike native apps, PWAs are discoverable via search engines, linkable via URLs, and always up-to-date. Unlike traditional websites, they work offline, can be installed to the home screen, and can send push notifications.',
    keyPoints: [
      'Progressive \u2014 works for every user regardless of browser',
      'Responsive \u2014 fits any form factor: desktop, mobile, tablet',
      'Connectivity-independent \u2014 works offline or on flaky networks',
      'App-like \u2014 feels like a native app with shell-style navigation',
      'Installable \u2014 users can \u201Cinstall\u201D without an app store',
      'Linkable \u2014 zero-friction sharing via URL',
    ],
  },
  'core-pillars': {
    title: 'The Three Core Pillars',
    body: 'Every PWA rests on three technical pillars that work together:',
    keyPoints: [
      '\uD83D\uDD12 HTTPS \u2014 Secure context required for Service Workers and other PWA APIs',
      '\u2699\uFE0F Service Worker \u2014 A JavaScript file that acts as a programmable network proxy between your app and the network',
      '\uD83D\uDCC4 Web App Manifest \u2014 A JSON file that tells the browser about your app and how it should behave when installed',
    ],
    code: '// Checking if all PWA pillars are available\nconst isPWAReady = () => {\n  const isHTTPS = location.protocol === \'https:\'\n    || location.hostname === \'localhost\';\n  const hasSW = \'serviceWorker\' in navigator;\n  const hasManifest = !!document.querySelector(\n    \'link[rel="manifest"]\'\n  );\n\n  return { isHTTPS, hasSW, hasManifest,\n    ready: isHTTPS && hasSW && hasManifest\n  };\n};',
  },
  'app-shell': {
    title: 'The App Shell Concept',
    body: 'The App Shell is the minimal HTML, CSS, and JavaScript needed to power your UI. Think of it as the native app\u2019s "chrome" \u2014 the navigation bar, sidebar, and layout skeleton that\u2019s always there, while content loads dynamically.\n\nIn a React + Vite app, your App Shell is essentially your root component tree minus the data. The shell gets cached by the Service Worker on first visit, so subsequent loads are <strong>instant</strong> \u2014 even offline.',
    keyPoints: [
      'Cache the shell separately from dynamic content',
      'Shell loads from cache \u2192 content loads from network',
      'Results in near-instant repeat visits',
      'React\u2019s component model naturally fits the shell pattern',
    ],
    code: '// Conceptual App Shell in React\nfunction AppShell({ children }) {\n  return (\n    <div className="app-shell">\n      <Header />       {/* \u2190 cached */}\n      <Navigation />   {/* \u2190 cached */}\n      <main>\n        {children}     {/* \u2190 dynamic content */}\n      </main>\n      <BottomNav />    {/* \u2190 cached */}\n    </div>\n  );\n}',
  },
  https: {
    title: 'HTTPS Requirement',
    body: 'Service Workers can intercept network requests and fabricate responses \u2014 powerful but dangerous. That\u2019s why browsers <strong>require HTTPS</strong> for Service Workers (with a localhost exception for development).\n\nFor Vite development, <code>localhost</code> is automatically treated as a secure context. For production, you\u2019ll need a valid SSL certificate. Services like Let\u2019s Encrypt, Cloudflare, or Netlify/Vercel provide these for free.',
    keyPoints: [
      'localhost is exempt during development',
      'Required for Service Workers, Push API, and Background Sync',
      'Free certificates via Let\u2019s Encrypt or Cloudflare',
      'Most hosting platforms (Netlify, Vercel, Cloudflare Pages) handle this automatically',
    ],
  },
  lifecycle: {
    title: 'Service Worker Lifecycle',
    body: 'Service Workers have a distinct lifecycle that\u2019s separate from your web page. Understanding it is crucial for debugging and building reliable update flows.\n\nThe lifecycle has three main phases: <strong>Registration</strong> \u2192 <strong>Installation</strong> \u2192 <strong>Activation</strong>. A new Service Worker won\u2019t take control of existing pages until all tabs using the old version are closed (unless you call <code>skipWaiting()</code>).',
    keyPoints: [
      'Installing \u2014 SW is downloading and caching assets',
      'Waiting \u2014 new SW is ready but old one still controls pages',
      'Active \u2014 SW controls all pages in its scope',
      'Redundant \u2014 SW has been replaced or installation failed',
    ],
    diagram: 'lifecycle',
    code: '// sw.js \u2014 Basic lifecycle events\nself.addEventListener(\'install\', (event) => {\n  console.log(\'SW installing...\');\n  // Optionally skip waiting to activate immediately\n  // self.skipWaiting();\n\n  event.waitUntil(\n    caches.open(\'v1\').then(cache =>\n      cache.addAll([\'/index.html\', \'/app.js\', \'/style.css\'])\n    )\n  );\n});\n\nself.addEventListener(\'activate\', (event) => {\n  console.log(\'SW activating...\');\n  // Clean up old caches\n  event.waitUntil(\n    caches.keys().then(keys => Promise.all(\n      keys.filter(k => k !== \'v1\')\n          .map(k => caches.delete(k))\n    ))\n  );\n});\n\nself.addEventListener(\'fetch\', (event) => {\n  // Intercept network requests\n  event.respondWith(\n    caches.match(event.request)\n      .then(cached => cached || fetch(event.request))\n  );\n});',
  },
  registration: {
    title: 'Registering a Service Worker',
    body: 'Registration tells the browser where your Service Worker file lives and what scope it controls. In a Vite + React app, you\u2019ll typically register it in your entry point or use a plugin that handles it automatically.\n\nThe <code>scope</code> determines which pages the SW controls. By default, it\u2019s the directory containing the SW file. A SW at <code>/sw.js</code> controls everything under <code>/</code>.',
    keyPoints: [
      'Register early in your app\u2019s lifecycle for maximum coverage',
      'The scope defaults to the SW file\u2019s directory',
      'Registration is idempotent \u2014 safe to call on every page load',
      'Use the PWA Vite plugin for automatic registration',
    ],
    code: '// Manual registration (entry point, e.g., main.tsx)\nif (\'serviceWorker\' in navigator) {\n  window.addEventListener(\'load\', async () => {\n    try {\n      const reg = await navigator.serviceWorker.register(\n        \'/sw.js\',\n        { scope: \'/\' }\n      );\n      console.log(\'SW registered, scope:\', reg.scope);\n\n      // Listen for updates\n      reg.addEventListener(\'updatefound\', () => {\n        const newSW = reg.installing;\n        newSW?.addEventListener(\'statechange\', () => {\n          if (newSW.state === \'activated\') {\n            console.log(\'New SW activated!\');\n          }\n        });\n      });\n    } catch (err) {\n      console.error(\'SW registration failed:\', err);\n    }\n  });\n}',
  },
  'caching-strategies': {
    title: 'Caching Strategies',
    body: 'Choosing the right caching strategy per resource type is what separates a good PWA from a broken one. There\u2019s no single "correct" strategy \u2014 it depends on how fresh the data needs to be.',
    keyPoints: [
      'Cache First \u2014 best for static assets (JS, CSS, images, fonts)',
      'Network First \u2014 best for API calls and dynamic HTML',
      'Stale While Revalidate \u2014 best for semi-dynamic assets that can tolerate brief staleness',
      'Network Only \u2014 best for non-GET requests, analytics',
      'Cache Only \u2014 best for precached assets you fully control',
    ],
    diagram: 'caching',
    code: '// sw.js \u2014 Implementing strategies manually\n\n// Cache First (with network fallback)\nasync function cacheFirst(request) {\n  const cached = await caches.match(request);\n  if (cached) return cached;\n  const response = await fetch(request);\n  const cache = await caches.open(\'static-v1\');\n  cache.put(request, response.clone());\n  return response;\n}\n\n// Network First (with cache fallback)\nasync function networkFirst(request) {\n  try {\n    const response = await fetch(request);\n    const cache = await caches.open(\'dynamic-v1\');\n    cache.put(request, response.clone());\n    return response;\n  } catch {\n    return caches.match(request);\n  }\n}\n\n// Stale While Revalidate\nasync function staleWhileRevalidate(request) {\n  const cache = await caches.open(\'swr-v1\');\n  const cached = await cache.match(request);\n\n  const fetchPromise = fetch(request).then(response => {\n    cache.put(request, response.clone());\n    return response;\n  });\n\n  return cached || fetchPromise;\n}\n\n// Route requests to strategies\nself.addEventListener(\'fetch\', (event) => {\n  const { request } = event;\n  const url = new URL(request.url);\n\n  if (request.destination === \'image\'\n      || url.pathname.match(/\\.(js|css|woff2?)$/)) {\n    event.respondWith(cacheFirst(request));\n  } else if (url.pathname.startsWith(\'/api/\')) {\n    event.respondWith(networkFirst(request));\n  } else {\n    event.respondWith(staleWhileRevalidate(request));\n  }\n});',
  },
  offline: {
    title: 'Offline Support',
    body: 'True offline support means your app is usable \u2014 not just a blank screen with a "you\u2019re offline" message. This requires caching your app shell, handling failed API requests gracefully, and providing meaningful fallback content.\n\nIn React apps, you can combine Service Worker caching with client-side state management (like TanStack Query\u2019s built-in cache persistence) for a robust offline experience.',
    keyPoints: [
      'Precache your app shell and critical assets during SW install',
      'Provide an offline fallback page for uncached navigation requests',
      'Use IndexedDB or localStorage for offline data persistence',
      'Show meaningful UI states for offline scenarios',
    ],
    code: '// sw.js \u2014 Offline fallback for navigation requests\nconst OFFLINE_PAGE = \'/offline.html\';\n\nself.addEventListener(\'install\', (event) => {\n  event.waitUntil(\n    caches.open(\'shell-v1\').then(cache =>\n      cache.addAll([\'/\', \'/offline.html\', \'/app.js\'])\n    )\n  );\n});\n\nself.addEventListener(\'fetch\', (event) => {\n  if (event.request.mode === \'navigate\') {\n    event.respondWith(\n      fetch(event.request).catch(() =>\n        caches.match(OFFLINE_PAGE)\n      )\n    );\n  }\n});\n\n// React component \u2014 Detecting online/offline\nfunction useOnlineStatus() {\n  const [isOnline, setIsOnline] = useState(navigator.onLine);\n\n  useEffect(() => {\n    const goOnline = () => setIsOnline(true);\n    const goOffline = () => setIsOnline(false);\n    window.addEventListener(\'online\', goOnline);\n    window.addEventListener(\'offline\', goOffline);\n    return () => {\n      window.removeEventListener(\'online\', goOnline);\n      window.removeEventListener(\'offline\', goOffline);\n    };\n  }, []);\n\n  return isOnline;\n}',
  },
  'manifest-fields': {
    title: 'Essential Manifest Fields',
    body: 'The Web App Manifest (<code>manifest.json</code> or <code>manifest.webmanifest</code>) is a JSON file that provides metadata about your PWA. Browsers use this to determine how your app appears when installed, what icon to show, and how to launch it.',
    keyPoints: [
      'name / short_name \u2014 full name and abbreviated version',
      'start_url \u2014 the URL that loads when the app launches',
      'display \u2014 how the app looks (standalone, fullscreen, etc.)',
      'theme_color \u2014 the color of the browser UI / title bar',
      'background_color \u2014 splash screen background color',
      'icons \u2014 array of icon objects at various sizes',
    ],
    code: '// manifest.json \u2014 Complete example\n{\n  "name": "My Awesome PWA",\n  "short_name": "MyPWA",\n  "description": "A production-ready progressive web app",\n  "start_url": "/",\n  "scope": "/",\n  "display": "standalone",\n  "orientation": "portrait-primary",\n  "theme_color": "#1a1a2e",\n  "background_color": "#1a1a2e",\n  "categories": ["productivity", "utilities"],\n  "icons": [\n    {\n      "src": "/icons/icon-192.png",\n      "sizes": "192x192",\n      "type": "image/png"\n    },\n    {\n      "src": "/icons/icon-512.png",\n      "sizes": "512x512",\n      "type": "image/png"\n    },\n    {\n      "src": "/icons/icon-maskable-512.png",\n      "sizes": "512x512",\n      "type": "image/png",\n      "purpose": "maskable"\n    }\n  ],\n  "screenshots": [\n    {\n      "src": "/screenshots/home.png",\n      "sizes": "1280x720",\n      "type": "image/png",\n      "form_factor": "wide"\n    }\n  ]\n}',
  },
  icons: {
    title: 'Icons & Maskable Icons',
    body: 'PWAs need icons at multiple sizes for different contexts: home screen, app switcher, splash screen, and OS-specific surfaces. At minimum, provide <strong>192x192</strong> and <strong>512x512</strong> PNG icons.\n\n<strong>Maskable icons</strong> are a special format that allows the OS to apply its own shape mask (circle, squircle, rounded square). Without a maskable icon, Android will add ugly white padding around your icon.',
    keyPoints: [
      'Minimum: 192x192 and 512x512 PNG icons',
      'Add a maskable icon for Android adaptive icons',
      'Maskable safe zone: keep content within the inner 80%',
      'Use maskable.app to preview how your icon will be cropped',
      'Consider adding an SVG icon for perfect scaling',
    ],
    code: '// Icon entries in manifest.json\n"icons": [\n  { "src": "/icons/icon-72.png",\n    "sizes": "72x72", "type": "image/png" },\n  { "src": "/icons/icon-96.png",\n    "sizes": "96x96", "type": "image/png" },\n  { "src": "/icons/icon-128.png",\n    "sizes": "128x128", "type": "image/png" },\n  { "src": "/icons/icon-192.png",\n    "sizes": "192x192", "type": "image/png" },\n  { "src": "/icons/icon-512.png",\n    "sizes": "512x512", "type": "image/png" },\n  { "src": "/icons/icon-maskable-192.png",\n    "sizes": "192x192", "type": "image/png",\n    "purpose": "maskable" },\n  { "src": "/icons/icon-maskable-512.png",\n    "sizes": "512x512", "type": "image/png",\n    "purpose": "maskable" }\n]',
  },
  'display-modes': {
    title: 'Display Modes',
    body: 'The <code>display</code> field in your manifest controls how much browser UI is shown when your app is launched. This is what makes a PWA feel "app-like" versus "website-in-a-browser."',
    keyPoints: [
      'fullscreen \u2014 no browser UI at all (great for games)',
      'standalone \u2014 looks like a native app, no URL bar',
      'minimal-ui \u2014 similar to standalone but keeps minimal controls',
      'browser \u2014 opens in a normal tab (defeats the purpose)',
    ],
    code: '// Most PWAs use "standalone"\n{ "display": "standalone" }\n\n// CSS media query to detect display mode:\n@media (display-mode: standalone) {\n  .back-button { display: block; }\n  .install-banner { display: none; }\n}\n\n// In JavaScript\nconst isStandalone = window.matchMedia(\n  \'(display-mode: standalone)\'\n).matches || window.navigator.standalone; // Safari\n\n// React hook\nfunction useIsInstalled() {\n  const [installed, setInstalled] = useState(false);\n  useEffect(() => {\n    const mq = window.matchMedia(\'(display-mode: standalone)\');\n    setInstalled(mq.matches || !!navigator.standalone);\n    const handler = (e) => setInstalled(e.matches);\n    mq.addEventListener(\'change\', handler);\n    return () => mq.removeEventListener(\'change\', handler);\n  }, []);\n  return installed;\n}',
  },
  'install-prompt': {
    title: 'Custom Install Prompt',
    body: 'Browsers may show a native install banner, but the timing is often bad. You can intercept the <code>beforeinstallprompt</code> event to show your <strong>own</strong> install UI at the right moment.\n\nNote: This API is supported in Chromium-based browsers. Safari on iOS uses "Add to Home Screen" from the share menu, which you can\u2019t programmatically trigger \u2014 but you can detect iOS and show instructions.',
    keyPoints: [
      'Intercept beforeinstallprompt to control install timing',
      'Don\u2019t show the prompt immediately \u2014 wait for engagement',
      'Handle iOS separately with manual instructions',
      'Track install events with the appinstalled event',
    ],
    code: '// useInstallPrompt.ts\nfunction useInstallPrompt() {\n  const [deferredPrompt, setDeferredPrompt] = useState(null);\n  const [isInstallable, setIsInstallable] = useState(false);\n  const [isInstalled, setIsInstalled] = useState(false);\n  const [isIOS, setIsIOS] = useState(false);\n\n  useEffect(() => {\n    const mq = window.matchMedia(\'(display-mode: standalone)\');\n    if (mq.matches) { setIsInstalled(true); return; }\n\n    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);\n    setIsIOS(ios);\n\n    const handlePrompt = (e) => {\n      e.preventDefault();\n      setDeferredPrompt(e);\n      setIsInstallable(true);\n    };\n    const handleInstalled = () => {\n      setIsInstalled(true);\n      setIsInstallable(false);\n    };\n\n    window.addEventListener(\'beforeinstallprompt\', handlePrompt);\n    window.addEventListener(\'appinstalled\', handleInstalled);\n    return () => {\n      window.removeEventListener(\'beforeinstallprompt\', handlePrompt);\n      window.removeEventListener(\'appinstalled\', handleInstalled);\n    };\n  }, []);\n\n  const promptInstall = useCallback(async () => {\n    if (!deferredPrompt) return false;\n    deferredPrompt.prompt();\n    const { outcome } = await deferredPrompt.userChoice;\n    setDeferredPrompt(null);\n    return outcome === \'accepted\';\n  }, [deferredPrompt]);\n\n  return { isInstallable, isInstalled, isIOS, promptInstall };\n}',
  },
  'app-shell-model': {
    title: 'App Shell Architecture',
    body: 'The App Shell Architecture separates your <strong>static shell</strong> (layout, navigation, styles) from <strong>dynamic content</strong> (API data). The shell is cached aggressively and served instantly, while content is fetched from the network.\n\nIn a React SPA with TanStack Router, this works naturally: your route tree and layout components form the shell, while data loaded via TanStack Query\u2019s <code>loader</code> functions represents the dynamic content layer.',
    keyPoints: [
      'Shell = React component tree (layout, routes, navigation)',
      'Content = data from API calls (loaded via TanStack Query)',
      'Shell is precached during SW installation',
      'Content uses network-first or stale-while-revalidate strategies',
      'Result: instant shell paint + progressive content hydration',
    ],
    code: '// Architecture with TanStack Router + Query\n\n// 1. Root layout (shell \u2014 cached)\nfunction RootLayout() {\n  return (\n    <div className="app">\n      <Sidebar />\n      <main>\n        <Outlet /> {/* Route content loads here */}\n      </main>\n    </div>\n  );\n}\n\n// 2. Route with data loading (content \u2014 network)\nconst postsRoute = createRoute({\n  getParentRoute: () => rootRoute,\n  path: \'/posts\',\n  loader: ({ context: { queryClient } }) =>\n    queryClient.ensureQueryData(postsQueryOptions()),\n  component: PostsPage,\n});\n\n// 3. Component uses cached query data\nfunction PostsPage() {\n  const { data: posts } = useSuspense(postsQueryOptions());\n  return posts.map(post => <PostCard key={post.id} {...post} />);\n}',
  },
  streams: {
    title: 'Streaming & Navigation Preload',
    body: 'Navigation Preload solves a key performance problem: when a Service Worker boots up to handle a navigation request, there\u2019s a startup delay. Navigation Preload lets the browser start the network request <strong>in parallel</strong> with SW startup.\n\nThe Streams API lets Service Workers construct responses on-the-fly. This is more relevant for server-rendered apps, but understanding it helps appreciate the full architecture.',
    keyPoints: [
      'Navigation Preload eliminates the SW startup delay',
      'Streams API allows assembling responses from multiple sources',
      'Most useful for MPA/SSR architectures, less critical for SPAs',
      'Vite\u2019s SPA approach benefits more from App Shell + client routing',
    ],
    code: '// sw.js \u2014 Enabling Navigation Preload\nself.addEventListener(\'activate\', (event) => {\n  event.waitUntil(async function() {\n    if (self.registration.navigationPreload) {\n      await self.registration.navigationPreload.enable();\n    }\n  }());\n});\n\nself.addEventListener(\'fetch\', (event) => {\n  if (event.request.mode === \'navigate\') {\n    event.respondWith(async function() {\n      try {\n        const preloadResponse = await event.preloadResponse;\n        if (preloadResponse) return preloadResponse;\n        return fetch(event.request);\n      } catch {\n        return caches.match(\'/index.html\');\n      }\n    }());\n  }\n});',
  },
  workbox: {
    title: 'Workbox: The Standard Library',
    body: 'Writing Service Worker code from scratch is educational but error-prone. <strong>Workbox</strong> (by Google) is the de-facto standard library for production PWAs. It provides battle-tested implementations of caching strategies, precaching, routing, and background sync.\n\nThe Vite PWA plugin uses Workbox under the hood, so you get all of this for free. But understanding Workbox directly helps you customize behavior beyond what the plugin exposes.',
    keyPoints: [
      'workbox\u2011routing \u2014 URL pattern matching for requests',
      'workbox\u2011strategies \u2014 CacheFirst, NetworkFirst, StaleWhileRevalidate, etc.',
      'workbox\u2011precaching \u2014 efficient precaching with revisioned URLs',
      'workbox\u2011expiration \u2014 automatic cache cleanup based on age/count',
      'workbox\u2011background\u2011sync \u2014 queue failed requests for retry',
      'workbox\u2011window \u2014 helper for SW registration in your app code',
    ],
    code: '// sw.js \u2014 Using Workbox directly\n// (these are Workbox library imports for SW files)\n//   precacheAndRoute, registerRoute,\n//   CacheFirst, NetworkFirst, StaleWhileRevalidate,\n//   ExpirationPlugin, CacheableResponsePlugin\n\n// Precache build assets (injected by build tool)\nprecacheAndRoute(self.__WB_MANIFEST);\n\n// Cache images with Cache First\nregisterRoute(\n  ({ request }) => request.destination === \'image\',\n  new CacheFirst({\n    cacheName: \'images\',\n    plugins: [\n      new ExpirationPlugin({\n        maxEntries: 60,\n        maxAgeSeconds: 30 * 24 * 60 * 60\n      }),\n      new CacheableResponsePlugin({ statuses: [0, 200] }),\n    ],\n  })\n);\n\n// API calls with Network First\nregisterRoute(\n  ({ url }) => url.pathname.startsWith(\'/api/\'),\n  new NetworkFirst({\n    cacheName: \'api-cache\',\n    plugins: [\n      new ExpirationPlugin({\n        maxEntries: 50,\n        maxAgeSeconds: 5 * 60\n      }),\n    ],\n  })\n);\n\n// Google Fonts with Stale While Revalidate\nregisterRoute(\n  ({ url }) => url.origin === \'https://fonts.googleapis.com\',\n  new StaleWhileRevalidate({\n    cacheName: \'google-fonts-stylesheets\'\n  })\n);',
  },
  'sw-precache-vs-runtime': {
    title: 'Precaching vs. Runtime Caching',
    body: 'There are two fundamentally different approaches to caching in a PWA, and you\u2019ll almost always use both:\n\n<strong>Precaching</strong> happens during the Service Worker\u2019s <code>install</code> event. You define a list of URLs upfront, and the SW downloads and caches all of them immediately. Ideal for your app shell.\n\n<strong>Runtime caching</strong> happens on-the-fly as the user navigates. When a request matches a route pattern, the SW applies a caching strategy. Ideal for API responses and user-uploaded content.',
    keyPoints: [
      'Precache: known at build time, cached during install, versioned with hashes',
      'Runtime: unknown at build time, cached on first request, matched by patterns',
      'Precache your app shell (HTML, CSS, JS bundles, critical fonts/images)',
      'Runtime cache API data, user content, and third-party resources',
      'Workbox handles both seamlessly',
    ],
  },
  'vite-pwa-plugin': {
    title: 'The Vite PWA Plugin',
    body: 'The Vite PWA plugin is the easiest way to add PWA support to a Vite + React app. It generates your Service Worker, handles precaching of build assets, generates the Web App Manifest, and provides utilities for custom update prompts.\n\nIt supports two modes: <strong>generateSW</strong> (auto-generates a full SW using Workbox \u2014 recommended for most apps) and <strong>injectManifest</strong> (you write a custom SW and the plugin injects the precache manifest into it \u2014 for advanced use cases).',
    keyPoints: [
      'Install: npm i -D vite\u2011plugin\u2011pwa',
      'generateSW mode \u2014 zero-config, plugin writes the entire SW',
      'injectManifest mode \u2014 you write custom SW logic, plugin injects precache list',
      'Auto-generates manifest.webmanifest from your config',
      'Provides useRegisterSW hook for React',
      'Supports automatic and prompt-based update strategies',
    ],
  },
  'vite-config': {
    title: 'Vite PWA Configuration',
    body: 'Here\u2019s a production-ready Vite config with the PWA plugin. This config generates a Service Worker that precaches all your build assets and applies runtime caching strategies for API calls and images.',
    keyPoints: [],
    code: '// vite.config.ts\n// Uses: defineConfig, react plugin, VitePWA plugin\n\nexport default defineConfig({\n  plugins: [\n    react(),\n    VitePWA({\n      registerType: \'prompt\', // or \'autoUpdate\'\n      includeAssets: [\n        \'favicon.ico\', \'robots.txt\', \'apple-touch-icon.png\'\n      ],\n\n      manifest: {\n        name: \'My React PWA\',\n        short_name: \'MyPWA\',\n        description: \'A Vite + React Progressive Web App\',\n        theme_color: \'#1a1a2e\',\n        background_color: \'#1a1a2e\',\n        display: \'standalone\',\n        scope: \'/\',\n        start_url: \'/\',\n        icons: [\n          {\n            src: \'pwa-192x192.png\',\n            sizes: \'192x192\',\n            type: \'image/png\',\n          },\n          {\n            src: \'pwa-512x512.png\',\n            sizes: \'512x512\',\n            type: \'image/png\',\n          },\n          {\n            src: \'pwa-512x512.png\',\n            sizes: \'512x512\',\n            type: \'image/png\',\n            purpose: \'maskable\',\n          },\n        ],\n      },\n\n      workbox: {\n        globPatterns: [\'**/*.{js,css,html,ico,png,svg,woff2}\'],\n\n        runtimeCaching: [\n          {\n            urlPattern: /^https:\\/\\/api\\.example\\.com\\/.*/i,\n            handler: \'NetworkFirst\',\n            options: {\n              cacheName: \'api-cache\',\n              expiration: {\n                maxEntries: 50,\n                maxAgeSeconds: 60 * 5,\n              },\n              cacheableResponse: { statuses: [0, 200] },\n            },\n          },\n          {\n            urlPattern: /\\.(?:png|jpg|jpeg|svg|gif|webp)$/,\n            handler: \'CacheFirst\',\n            options: {\n              cacheName: \'image-cache\',\n              expiration: {\n                maxEntries: 100,\n                maxAgeSeconds: 60 * 60 * 24 * 30,\n              },\n            },\n          },\n        ],\n      },\n    }),\n  ],\n});',
  },
  'react-hooks': {
    title: 'React Integration Hooks',
    body: 'The Vite PWA plugin provides a <code>useRegisterSW</code> hook through a virtual module. This hook handles SW registration and provides reactive state for update prompts.\n\nYou can build a polished update UI that notifies users when a new version is available and lets them reload to get it.',
    keyPoints: [
      'useRegisterSW handles registration + update detection',
      'needRefresh state tells you when an update is available',
      'updateServiceWorker() activates the waiting SW and reloads',
      'offlineReady state confirms the app is cached for offline',
    ],
    code: '// PWAUpdatePrompt.tsx\n// Uses useRegisterSW hook from the PWA register module\n\nfunction PWAUpdatePrompt() {\n  const {\n    needRefresh: [needRefresh, setNeedRefresh],\n    offlineReady: [offlineReady, setOfflineReady],\n    updateServiceWorker,\n  } = useRegisterSW({\n    onRegisteredSW(swUrl, registration) {\n      if (registration) {\n        setInterval(() => registration.update(), 60 * 60 * 1000);\n      }\n    },\n    onRegisterError(error) {\n      console.error(\'SW registration error:\', error);\n    },\n  });\n\n  const close = () => {\n    setOfflineReady(false);\n    setNeedRefresh(false);\n  };\n\n  if (!offlineReady && !needRefresh) return null;\n\n  return (\n    <div className="pwa-toast" role="alert">\n      {offlineReady ? (\n        <p>App ready to work offline</p>\n      ) : (\n        <p>New version available!</p>\n      )}\n      <div className="pwa-toast-actions">\n        {needRefresh && (\n          <button onClick={() => updateServiceWorker(true)}>\n            Update\n          </button>\n        )}\n        <button onClick={close}>Dismiss</button>\n      </div>\n    </div>\n  );\n}',
  },
  'tanstack-offline': {
    title: 'TanStack Query Offline Support',
    body: 'TanStack Query has built-in support for offline scenarios that pairs beautifully with PWA caching. By persisting the query cache to IndexedDB or localStorage, your app can show previously fetched data instantly \u2014 even when offline.\n\nCombined with Service Worker runtime caching, this gives you two layers of offline resilience: the SW caches raw HTTP responses, while TanStack Query caches parsed, structured data in-memory and persisted storage.',
    keyPoints: [
      'persistQueryClient saves/restores the entire query cache',
      'Sync storage persister for localStorage (simple)',
      'Async storage persister for IndexedDB (better for large data)',
      'networkMode: \'offlineFirst\' \u2014 use cache, try network in background',
      'Mutations can be paused and retried when back online',
    ],
    code: '// main.tsx \u2014 Setting up persisted queries\n// Uses: QueryClient, PersistQueryClientProvider,\n//   createSyncStoragePersister (from TanStack packages)\n\nconst queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 1000 * 60 * 5,\n      gcTime: 1000 * 60 * 60 * 24,\n      networkMode: \'offlineFirst\',\n      retry: 2,\n    },\n    mutations: {\n      networkMode: \'offlineFirst\',\n    },\n  },\n});\n\nconst persister = createSyncStoragePersister({\n  storage: window.localStorage,\n});\n\nfunction App() {\n  return (\n    <PersistQueryClientProvider\n      client={queryClient}\n      persistOptions={{\n        persister,\n        maxAge: 1000 * 60 * 60 * 24,\n        buster: \'v1\',\n      }}\n    >\n      <RouterProvider router={router} />\n    </PersistQueryClientProvider>\n  );\n}\n\n// Offline-aware mutation with retry\nfunction useCreatePost() {\n  const queryClient = useQueryClient();\n\n  return useMutation({\n    mutationFn: (newPost) => api.createPost(newPost),\n    onMutate: async (newPost) => {\n      await queryClient.cancelQueries({ queryKey: [\'posts\'] });\n      const previous = queryClient.getQueryData([\'posts\']);\n      queryClient.setQueryData([\'posts\'], (old) =>\n        [...(old ?? []), { ...newPost, id: \'temp-\' + Date.now() }]\n      );\n      return { previous };\n    },\n    onError: (err, vars, context) => {\n      queryClient.setQueryData([\'posts\'], context.previous);\n    },\n    onSettled: () => {\n      queryClient.invalidateQueries({ queryKey: [\'posts\'] });\n    },\n  });\n}',
  },
  'bg-sync': {
    title: 'Background Sync',
    body: 'Background Sync lets you defer actions until the user has a stable connection. If a user submits a form while offline, the request is queued and automatically replayed when connectivity returns \u2014 even if the user has closed the tab.',
    keyPoints: [
      'Requires Service Worker + SyncManager API',
      'Queue failed requests in IndexedDB',
      'The sync event fires when connectivity is restored',
      'Workbox\u2019s BackgroundSyncPlugin makes this easy',
      'Browser support: Chromium-based (not Safari/Firefox yet)',
    ],
    code: '// sw.js \u2014 Background Sync with Workbox\n// Uses: BackgroundSyncPlugin, registerRoute, NetworkOnly\n\nconst bgSyncPlugin = new BackgroundSyncPlugin(\'apiQueue\', {\n  maxRetentionTime: 24 * 60,\n  onSync: async ({ queue }) => {\n    let entry;\n    while ((entry = await queue.shiftRequest())) {\n      try {\n        await fetch(entry.request);\n        console.log(\'Replayed:\', entry.request.url);\n      } catch (err) {\n        await queue.unshiftRequest(entry);\n        throw err;\n      }\n    }\n  },\n});\n\n// Apply to mutation endpoints\nregisterRoute(\n  ({ url }) => url.pathname.startsWith(\'/api/\'),\n  new NetworkOnly({ plugins: [bgSyncPlugin] }),\n  \'POST\'\n);\nregisterRoute(\n  ({ url }) => url.pathname.startsWith(\'/api/\'),\n  new NetworkOnly({ plugins: [bgSyncPlugin] }),\n  \'PUT\'\n);',
  },
  'push-notifications': {
    title: 'Push Notifications',
    body: 'Push Notifications let your PWA re-engage users even when they\u2019re not using the app. The flow involves three parties: your <strong>app</strong> (requests permission + subscribes), a <strong>push service</strong> (browser vendor\u2019s server), and your <strong>backend</strong> (sends messages).\n\nThe user must explicitly grant permission, and you should only ask when there\u2019s clear value \u2014 never on first visit.',
    keyPoints: [
      'Requires HTTPS + Service Worker + Notification permission',
      'Use the Push API to subscribe, web-push library on server to send',
      'VAPID keys authenticate your server with the push service',
      'Always ask for permission in context, never on page load',
      'Handle the push event in the SW to show a notification',
    ],
    code: '// 1. Subscribe in your React app\nasync function subscribeToPush() {\n  const permission = await Notification.requestPermission();\n  if (permission !== \'granted\') return null;\n\n  const reg = await navigator.serviceWorker.ready;\n  const subscription = await reg.pushManager.subscribe({\n    userVisibleOnly: true,\n    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),\n  });\n\n  await fetch(\'/api/push/subscribe\', {\n    method: \'POST\',\n    headers: { \'Content-Type\': \'application/json\' },\n    body: JSON.stringify(subscription),\n  });\n  return subscription;\n}\n\n// 2. Handle push in Service Worker\nself.addEventListener(\'push\', (event) => {\n  const data = event.data?.json() ?? {};\n  event.waitUntil(\n    self.registration.showNotification(data.title ?? \'Update\', {\n      body: data.body,\n      icon: \'/icons/icon-192.png\',\n      badge: \'/icons/badge-72.png\',\n      data: { url: data.url ?? \'/\' },\n      actions: [\n        { action: \'open\', title: \'Open\' },\n        { action: \'dismiss\', title: \'Dismiss\' },\n      ],\n    })\n  );\n});\n\n// 3. Handle notification click\nself.addEventListener(\'notificationclick\', (event) => {\n  event.notification.close();\n  if (event.action === \'dismiss\') return;\n  event.waitUntil(\n    clients.matchAll({ type: \'window\' }).then(windows => {\n      const existing = windows.find(w =>\n        w.url === event.notification.data.url\n      );\n      if (existing) return existing.focus();\n      return clients.openWindow(event.notification.data.url);\n    })\n  );\n});',
  },
  'periodic-sync': {
    title: 'Periodic Background Sync',
    body: 'Periodic Background Sync allows your PWA to periodically update its content in the background, so data is fresh when the user opens the app.\n\nThis is a <strong>very restricted</strong> API \u2014 the browser decides when to fire periodic sync events based on user engagement. A frequently-visited site might get syncs every few hours; a rarely-visited one might never get them.',
    keyPoints: [
      'Must request periodicSync permission',
      'Browser controls actual frequency based on site engagement',
      'Minimum interval is browser-defined (typically ~12 hours)',
      'Currently Chromium-only',
      'Great for pre-caching content feeds and updating offline data',
    ],
    code: '// Register periodic sync in your app\nasync function registerPeriodicSync() {\n  const reg = await navigator.serviceWorker.ready;\n\n  if (!(\'periodicSync\' in reg)) {\n    console.log(\'Periodic Sync not supported\');\n    return;\n  }\n\n  const status = await navigator.permissions.query({\n    name: \'periodic-background-sync\',\n  });\n\n  if (status.state === \'granted\') {\n    await reg.periodicSync.register(\'content-sync\', {\n      minInterval: 24 * 60 * 60 * 1000,\n    });\n  }\n}\n\n// Handle in Service Worker\nself.addEventListener(\'periodicsync\', (event) => {\n  if (event.tag === \'content-sync\') {\n    event.waitUntil(refreshContent());\n  }\n});\n\nasync function refreshContent() {\n  const cache = await caches.open(\'content-v1\');\n  const urls = [\'/api/feed\', \'/api/notifications\'];\n  await Promise.all(\n    urls.map(async (url) => {\n      try {\n        const response = await fetch(url);\n        if (response.ok) await cache.put(url, response);\n      } catch { /* offline, skip */ }\n    })\n  );\n}',
  },
  'update-flow': {
    title: 'Production Update Flow',
    body: 'Getting updates right is crucial for PWA reliability. A broken update flow can leave users stuck on stale versions.\n\nThe strategy: <strong>Prompt the user</strong> when a new version is available, then reload the page to activate the new Service Worker. Never auto-reload \u2014 that\u2019s jarring and can cause data loss.',
    keyPoints: [
      'Use registerType: \'prompt\' in the Vite PWA plugin config',
      'Check for updates periodically (every 1\u20132 hours)',
      'Show a non-intrusive UI when an update is ready',
      'Let the user choose when to update',
      'The update activates the new SW and reloads the page',
      'Version your caches so old ones get cleaned up',
    ],
    code: '// ReloadPrompt.tsx \u2014 Complete update flow\n// Uses useRegisterSW from the PWA register module\n\nconst CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour\n\nexport function ReloadPrompt() {\n  const {\n    needRefresh: [needRefresh],\n    offlineReady: [offlineReady, setOfflineReady],\n    updateServiceWorker,\n  } = useRegisterSW({\n    onRegisteredSW(swUrl, reg) {\n      if (reg) {\n        setInterval(() => {\n          console.log(\'Checking for SW updates...\');\n          reg.update();\n        }, CHECK_INTERVAL);\n      }\n    },\n  });\n\n  if (offlineReady) {\n    return (\n      <Toast\n        message="App cached \u2014 works offline!"\n        onClose={() => setOfflineReady(false)}\n        duration={5000}\n      />\n    );\n  }\n\n  if (!needRefresh) return null;\n\n  return (\n    <div role="alert" className="fixed bottom-4 right-4 z-50\n      flex items-center gap-4 rounded-xl border px-6 py-4\n      bg-slate-900 text-slate-200 shadow-xl">\n      <span>A new version is available</span>\n      <button\n        onClick={() => updateServiceWorker(true)}\n        className="rounded-lg bg-indigo-500 px-4 py-2\n          text-white hover:bg-indigo-400">\n        Update Now\n      </button>\n    </div>\n  );\n}',
  },
}

// ── Lookup helper ───────────────────────────────────────────────────

export function getPwaTopic(topicId: string): PwaTopicContent | undefined {
  return PWA_TOPICS[topicId]
}

// ── Navigation ──────────────────────────────────────────────────────

export const PWA_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['pwa-start'] },
  { label: 'Foundations', ids: ['pwa-what-is-pwa', 'pwa-core-pillars', 'pwa-app-shell', 'pwa-https'] },
  { label: 'Service Workers', ids: ['pwa-lifecycle', 'pwa-registration', 'pwa-caching-strategies', 'pwa-offline'] },
  { label: 'Web App Manifest', ids: ['pwa-manifest-fields', 'pwa-icons', 'pwa-display-modes', 'pwa-install-prompt'] },
  { label: 'Architecture', ids: ['pwa-app-shell-model', 'pwa-streams', 'pwa-workbox', 'pwa-sw-precache-vs-runtime'] },
  { label: 'Vite + React', ids: ['pwa-vite-pwa-plugin', 'pwa-vite-config', 'pwa-react-hooks', 'pwa-tanstack-offline'] },
  { label: 'Advanced Patterns', ids: ['pwa-bg-sync', 'pwa-push-notifications', 'pwa-periodic-sync', 'pwa-update-flow'] },
]

// ── Start page data ─────────────────────────────────────────────────

export const PWA_START_PAGE_DATA: StartPageData = {
  subtitle: 'Build installable, offline-capable web apps with Service Workers, Web App Manifest, and modern caching strategies \u2014 all inside your Vite + React project.',
  tip: 'Start with Foundations to understand the core concepts, then follow the sections in order. Each builds on the previous one.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Foundations',
      description: 'What makes a PWA, the three pillars, app shell concept, and HTTPS requirements.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'pwa-what-is-pwa': 'What a PWA is and how it differs from native and traditional web apps.',
        'pwa-core-pillars': 'HTTPS, Service Workers, and Web App Manifest \u2014 the three required technologies.',
        'pwa-app-shell': 'The minimal cached UI shell that enables instant repeat visits.',
        'pwa-https': 'Why HTTPS is required and how to set it up for dev and production.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Service Workers',
      description: 'The programmable network proxy that powers offline support, caching, and background features.',
      sectionLabel: 'Service Workers',
      subItemDescriptions: {
        'pwa-lifecycle': 'Install, wait, activate \u2014 the lifecycle every SW goes through.',
        'pwa-registration': 'How to register a SW and control its scope.',
        'pwa-caching-strategies': 'Cache First, Network First, Stale While Revalidate, and when to use each.',
        'pwa-offline': 'Building a truly usable offline experience with fallback pages and React hooks.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Web App Manifest',
      description: 'The JSON file that makes your PWA installable and controls how it appears on the home screen.',
      sectionLabel: 'Web App Manifest',
      subItemDescriptions: {
        'pwa-manifest-fields': 'Essential fields: name, start_url, display, theme_color, icons, and more.',
        'pwa-icons': 'Required icon sizes, maskable icons, and safe zones.',
        'pwa-display-modes': 'Standalone, fullscreen, minimal-ui \u2014 controlling the browser chrome.',
        'pwa-install-prompt': 'Intercepting the install prompt and building custom install UI.',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Architecture',
      description: 'How to structure your PWA for performance \u2014 app shell model, Workbox, and caching tiers.',
      sectionLabel: 'Architecture',
      subItemDescriptions: {
        'pwa-app-shell-model': 'Separating cached shell from network-loaded content in a React SPA.',
        'pwa-streams': 'Navigation Preload and streaming responses for faster loads.',
        'pwa-workbox': 'Google\u2019s production-ready Service Worker toolkit.',
        'pwa-sw-precache-vs-runtime': 'When to precache at install vs. cache at runtime.',
      },
    },
    {
      type: 'numbered',
      num: 5,
      title: 'Vite + React',
      description: 'Practical integration with the Vite PWA plugin, React hooks, and TanStack Query offline support.',
      sectionLabel: 'Vite + React',
      subItemDescriptions: {
        'pwa-vite-pwa-plugin': 'The plugin that generates your SW and manifest automatically.',
        'pwa-vite-config': 'Production-ready Vite config with runtime caching strategies.',
        'pwa-react-hooks': 'useRegisterSW hook for update prompts and offline-ready state.',
        'pwa-tanstack-offline': 'Persisted query cache + offline mutations with TanStack Query.',
      },
    },
    {
      type: 'numbered',
      num: 6,
      title: 'Advanced Patterns',
      description: 'Background sync, push notifications, periodic sync, and production update flows.',
      sectionLabel: 'Advanced Patterns',
      subItemDescriptions: {
        'pwa-bg-sync': 'Queue and replay failed requests when connectivity returns.',
        'pwa-push-notifications': 'Re-engage users with push notifications via the Push API.',
        'pwa-periodic-sync': 'Periodically refresh cached content in the background.',
        'pwa-update-flow': 'Prompt-based SW updates that don\u2019t break the user\u2019s session.',
      },
    },
  ],
}

export const PWA_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'pwa',
    icon: '📱',
    title: 'Progressive Web Apps',
    startPageId: 'pwa-start',
    description: 'Build installable, offline-capable web apps with Service Workers, Web App Manifest, and modern caching strategies \u2014 from fundamentals to Vite + React integration.',
    category: 'frontend',
    sections: PWA_GUIDE_SECTIONS,
  },
  startPageData: PWA_START_PAGE_DATA,
}
