import type { GlossaryCategory } from './index'

export const njaGlossary: GlossaryCategory[] = [
  {
    category: 'Routing & Server-Side Rendering',
    terms: [
      {
        term: 'Route Parameters',
        definition: 'Dynamic segments in a URL path (e.g., <code>/users/:id</code>) that capture values from the URL. In Express, accessed via <code>req.params</code>.',
        linkId: 'mdn-url-api',
        sectionId: 'nja-routing',
      },
      {
        term: 'Query Strings',
        definition: 'Key-value pairs appended to a URL after <code>?</code> (e.g., <code>?page=2&sort=name</code>). Used for filtering, pagination, and search parameters.',
        linkId: 'mdn-url-api',
        sectionId: 'nja-routing',
      },
      {
        term: 'Path Matching',
        definition: 'The process of comparing an incoming URL against defined route patterns to determine which handler should respond. Supports exact matches, parameters, wildcards, and regex.',
        linkId: 'express-routing',
        sectionId: 'nja-routing',
      },
      {
        term: 'Route Guards',
        definition: 'Middleware or logic that checks conditions (e.g., authentication status) before allowing access to a route. Redirects or returns an error if the condition fails.',
        linkId: 'express-routing',
        sectionId: 'nja-routing',
      },
      {
        term: 'Nested Routes',
        definition: 'Routes defined within other routes, creating a parent-child hierarchy. Child routes render inside the parent\u2019s layout, enabling shared UI structure.',
        linkId: 'mdn-history-api',
        sectionId: 'nja-routing',
      },
      {
        term: 'History API',
        definition: 'A browser API (<code>pushState</code>, <code>replaceState</code>, <code>popstate</code>) that enables client-side routing by changing the URL without triggering a full page reload.',
        linkId: 'mdn-history-api',
        sectionId: 'nja-routing',
      },
      {
        term: 'Hydration',
        definition: 'The process where client-side JavaScript attaches event listeners and interactivity to server-rendered HTML, making it fully interactive without re-rendering.',
        linkId: 'react-rendertostring',
        sectionId: 'nja-ssr',
      },
      {
        term: 'Time to First Byte',
        definition: 'The time between the browser sending a request and receiving the first byte of the response. SSR typically has a higher TTFB than static serving but faster meaningful content.',
        linkId: 'mdn-core-web-vitals',
        sectionId: 'nja-ssr',
      },
      {
        term: 'Core Web Vitals',
        definition: 'Google\u2019s set of metrics (LCP, FID/INP, CLS) measuring real-world user experience. SSR vs. CSR directly impacts Largest Contentful Paint (LCP).',
        linkId: 'mdn-core-web-vitals',
        sectionId: 'nja-ssr',
      },
      {
        term: 'SEO',
        definition: 'Search Engine Optimization. SSR-rendered pages are immediately crawlable by search engines, while SPA content requires JavaScript execution to be indexed.',
        linkId: 'webdev-rendering-on-the-web',
        sectionId: 'nja-ssr',
      },
    ],
  },
  {
    category: 'API & Middleware',
    terms: [
      {
        term: 'HTTP Methods',
        definition: 'Verbs that indicate the action to perform on a resource: <code>GET</code> (read), <code>POST</code> (create), <code>PUT</code> (replace), <code>PATCH</code> (update), <code>DELETE</code> (remove).',
        linkId: 'mdn-http-methods',
        sectionId: 'nja-api-routes',
      },
      {
        term: 'Request/Response Cycle',
        definition: 'The full flow of an HTTP interaction: client sends a request with method, headers, and body; server processes it through middleware and handlers; server sends a response with status code, headers, and body.',
        linkId: 'mdn-http-methods',
        sectionId: 'nja-api-routes',
      },
      {
        term: 'Status Codes',
        definition: 'Three-digit numbers in HTTP responses indicating the result: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error). E.g., 200 OK, 404 Not Found, 500 Internal Server Error.',
        linkId: 'mdn-http-status',
        sectionId: 'nja-api-routes',
      },
      {
        term: 'JSON Parsing',
        definition: 'The process of converting a JSON string from a request body into a JavaScript object. In Express, handled by <code>express.json()</code> middleware; Fastify parses JSON by default.',
        linkId: 'mdn-http-methods',
        sectionId: 'nja-api-routes',
      },
      {
        term: 'API Versioning',
        definition: 'A strategy for maintaining backward compatibility when changing an API. Common approaches include URL prefixes (<code>/api/v1/</code>), custom headers, or content negotiation.',
        linkId: 'mdn-http-methods',
        sectionId: 'nja-api-routes',
      },
      {
        term: 'Request Pipeline',
        definition: 'The ordered sequence of middleware functions that process an HTTP request from arrival to response. Each function can modify the request, respond, or pass control to the next function.',
        linkId: 'express-using-middleware',
        sectionId: 'nja-middleware',
      },
      {
        term: 'next() Function',
        definition: 'In Express middleware, calling <code>next()</code> passes control to the next middleware in the chain. Calling <code>next(err)</code> skips to the error-handling middleware.',
        linkId: 'express-using-middleware',
        sectionId: 'nja-middleware',
      },
      {
        term: 'Middleware Chain',
        definition: 'The ordered list of middleware functions that process each request. Order matters \u2014 middleware registered first runs first. Common order: logging, CORS, body parsing, auth, then route handlers.',
        linkId: 'express-using-middleware',
        sectionId: 'nja-middleware',
      },
      {
        term: 'Error-Handling Middleware',
        definition: 'In Express, a middleware with four parameters <code>(err, req, res, next)</code> that catches errors thrown or passed via <code>next(err)</code>. Registered last in the chain.',
        linkId: 'express-error-handling',
        sectionId: 'nja-middleware',
      },
    ],
  },
  {
    category: 'Security & CORS',
    terms: [
      {
        term: 'Session vs Token Auth',
        definition: 'Two approaches to maintaining login state. Session-based stores state server-side (in Redis, DB) with a cookie ID. Token-based (JWT) stores state in a signed token the client sends with each request.',
        linkId: 'passportjs-docs',
        sectionId: 'nja-auth',
      },
      {
        term: 'Password Hashing',
        definition: 'A one-way cryptographic transformation of passwords for safe storage. Libraries like <code>bcrypt</code> add a salt and use a slow algorithm to resist brute-force attacks.',
        linkId: 'npm-bcrypt',
        sectionId: 'nja-auth',
      },
      {
        term: 'CORS Credentials',
        definition: 'When <code>credentials: true</code> is set, cross-origin requests include cookies, authorization headers, and TLS client certificates. Requires explicit <code>Access-Control-Allow-Credentials</code> from the server.',
        linkId: 'mdn-cors',
        sectionId: 'nja-auth',
        guides: ['nextjs-abstractions', 'auth'],
      },
      {
        term: 'Origin',
        definition: 'The combination of protocol, hostname, and port (e.g., <code>https://example.com:443</code>). Browsers use the origin to enforce the same-origin policy and CORS restrictions.',
        linkId: 'mdn-cors',
        sectionId: 'nja-cors',
      },
      {
        term: 'Preflight Requests',
        definition: 'An automatic <code>OPTIONS</code> request the browser sends before certain cross-origin requests to check if the server allows the actual request\u2019s method and headers.',
        linkId: 'mdn-cors',
        sectionId: 'nja-cors',
      },
      {
        term: 'Access-Control-Allow-Origin',
        definition: 'An HTTP response header that specifies which origins are allowed to access the resource. Set to a specific origin or <code>*</code> (but not with credentials).',
        linkId: 'mdn-cors',
        sectionId: 'nja-cors',
      },
      {
        term: 'CSP Directives',
        definition: 'Instructions in a Content Security Policy header that control which sources can load scripts, styles, images, and other resources. E.g., <code>script-src \'self\' \'nonce-abc123\'</code>.',
        linkId: 'mdn-csp-header',
        sectionId: 'nja-csp',
      },
      {
        term: 'Nonce (CSP)',
        definition: 'A unique, random token generated per request and included in both the CSP header and the <code>&lt;script nonce="..."&gt;</code> tag. Only scripts with a matching nonce execute.',
        linkId: 'mdn-csp-header',
        sectionId: 'nja-csp',
      },
      {
        term: 'report-uri',
        definition: 'A deprecated CSP directive (replaced by <code>report-to</code>) that specifies a URL where the browser sends JSON reports when a CSP violation occurs.',
        linkId: 'mdn-csp-header',
        sectionId: 'nja-csp',
      },
    ],
  },
  {
    category: 'Data Fetching & Configuration',
    terms: [
      {
        term: 'Cache Invalidation',
        definition: 'The process of removing or updating stale cached data when the underlying data changes. Often cited as one of the two hard problems in computer science.',
        linkId: 'mdn-http-caching',
        sectionId: 'nja-data-fetching',
      },
      {
        term: 'Stale-While-Revalidate',
        definition: 'A caching strategy that serves stale data immediately while fetching fresh data in the background. Used in HTTP <code>Cache-Control</code> headers and client-side libraries.',
        linkId: 'mdn-http-caching',
        sectionId: 'nja-data-fetching',
      },
      {
        term: 'ETags',
        definition: 'An HTTP header containing a hash or version identifier for a resource. The browser sends it back via <code>If-None-Match</code> \u2014 if the resource hasn\u2019t changed, the server responds with 304 Not Modified.',
        linkId: 'mdn-http-caching',
        sectionId: 'nja-data-fetching',
      },
      {
        term: 'Cache-Control Headers',
        definition: 'HTTP headers (<code>max-age</code>, <code>no-cache</code>, <code>no-store</code>, <code>public</code>, <code>private</code>) that control how and for how long browsers and proxies cache responses.',
        linkId: 'mdn-http-caching',
        sectionId: 'nja-data-fetching',
      },
      {
        term: 'Optimistic Updates',
        definition: 'A UI pattern that immediately reflects a mutation in the interface before the server confirms it, then rolls back if the request fails. Improves perceived responsiveness.',
        linkId: 'mdn-http-caching',
        sectionId: 'nja-data-fetching',
      },
      {
        term: 'Secret Management',
        definition: 'The practice of securely storing, accessing, and rotating sensitive values like API keys, database passwords, and encryption keys. Never commit secrets to version control.',
        linkId: 'npm-dotenv',
        sectionId: 'nja-env-config',
        guides: ['nextjs-abstractions', 'kubernetes'],
      },
      {
        term: 'Config Validation',
        definition: 'Checking environment variables against a schema at startup to catch missing or malformed values before the application serves traffic. Libraries like Zod or Joi work well for this.',
        linkId: 'npm-dotenv',
        sectionId: 'nja-env-config',
      },
    ],
  },
  {
    category: 'Database & ORMs',
    terms: [
      {
        term: 'Connection Pooling',
        definition: 'Maintaining a pool of reusable database connections instead of opening a new one per request. Reduces latency and prevents exhausting database connection limits.',
        linkId: 'npm-pg',
        sectionId: 'nja-database',
      },
      {
        term: 'Migrations',
        definition: 'Version-controlled scripts that incrementally modify a database schema (create tables, add columns, etc.). Run in order during deployment to keep the schema in sync with the application.',
        linkId: 'drizzle-docs',
        sectionId: 'nja-database',
      },
      {
        term: 'Seeds',
        definition: 'Scripts that populate a database with initial or test data. Run after migrations to set up a development or staging environment with predictable data.',
        linkId: 'drizzle-docs',
        sectionId: 'nja-database',
      },
      {
        term: 'N+1 Query Problem',
        definition: 'A performance issue where fetching a list of N items triggers N additional queries (one per item) for related data. Solved with eager loading (<code>JOIN</code>) or batching (DataLoader).',
        linkId: 'drizzle-docs',
        sectionId: 'nja-database',
      },
      {
        term: 'Transactions',
        definition: 'A database operation that groups multiple queries into a single atomic unit \u2014 either all succeed or all roll back. Essential for maintaining data consistency.',
        linkId: 'npm-pg',
        sectionId: 'nja-database',
      },
      {
        term: 'Prepared Statements',
        definition: 'Pre-compiled SQL queries with parameter placeholders (<code>$1</code>, <code>?</code>) that separate query logic from data. Prevents SQL injection by design.',
        linkId: 'npm-pg',
        sectionId: 'nja-database',
      },
      {
        term: 'SQL Injection Prevention',
        definition: 'Techniques to prevent attackers from inserting malicious SQL into queries. Always use parameterized queries or an ORM \u2014 never concatenate user input into SQL strings.',
        linkId: 'npm-pg',
        sectionId: 'nja-database',
      },
    ],
  },
  {
    category: 'Error Handling & Build',
    terms: [
      {
        term: 'Error Boundary',
        definition: 'A React component that catches JavaScript errors in its child component tree, logs them, and renders a fallback UI instead of crashing the entire application.',
        linkId: 'react-error-boundaries',
        sectionId: 'nja-error-handling',
      },
      {
        term: 'Global Error Handler',
        definition: 'A catch-all handler for unhandled errors. In Express, a 4-argument middleware; in Node.js, <code>process.on(\'unhandledRejection\')</code> and <code>process.on(\'uncaughtException\')</code>.',
        linkId: 'express-error-handling',
        sectionId: 'nja-error-handling',
      },
      {
        term: 'Error Response Format',
        definition: 'A consistent JSON shape for API error responses (e.g., <code>{ error: { code, message, status } }</code>). Agreed upon between frontend and backend for predictable error handling.',
        linkId: 'express-error-handling',
        sectionId: 'nja-error-handling',
      },
      {
        term: 'Bundle Analysis',
        definition: 'Inspecting the contents and sizes of your JavaScript bundles to identify bloat, duplicate dependencies, and opportunities for code splitting.',
        linkId: 'npm-tsx',
        sectionId: 'nja-build-bundling',
      },
    ],
  },
  {
    category: 'Deployment & Infrastructure',
    terms: [
      {
        term: 'Reverse Proxy',
        definition: 'A server (typically Nginx) that sits in front of your application, forwarding requests to the appropriate backend service. Handles TLS termination, load balancing, and static file serving.',
        linkId: 'nginx-beginners-guide',
        sectionId: 'nja-deployment',
      },
      {
        term: 'Process Manager',
        definition: 'A tool (PM2, systemd) that keeps your Node.js server running, restarts it on crashes, and manages log rotation. Essential for production deployments outside of containers.',
        linkId: 'npm-pm2',
        sectionId: 'nja-deployment',
      },
      {
        term: 'Health Checks',
        definition: 'Endpoints (typically <code>GET /health</code>) that return the server\u2019s status. Used by load balancers, container orchestrators, and monitoring tools to detect unhealthy instances.',
        linkId: 'docker-getting-started',
        sectionId: 'nja-deployment',
        guides: ['nextjs-abstractions', 'kubernetes'],
      },
      {
        term: 'Load Balancing',
        definition: 'Distributing incoming requests across multiple server instances to improve availability and throughput. Common tools include Nginx, HAProxy, and cloud provider load balancers.',
        linkId: 'nginx-beginners-guide',
        sectionId: 'nja-deployment',
      },
      {
        term: 'Static Hosting vs Server Hosting',
        definition: 'Static hosting (CDN, S3, GitHub Pages) serves pre-built files without a server process. Server hosting runs a live Node.js process that can handle dynamic requests and database queries.',
        linkId: 'docker-getting-started',
        sectionId: 'nja-deployment',
      },
    ],
  },
]
