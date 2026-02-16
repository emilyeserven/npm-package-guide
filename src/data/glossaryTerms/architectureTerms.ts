import type { GlossaryCategory } from './index'

export const architectureGlossary: GlossaryCategory[] = [
  {
    category: "Web Architecture",
    terms: [
      {
        term: "Tech Stack",
        definition: "A combination of technologies (frontend, server framework, runtime, database) used together to build a web application. Common examples include MERN, LAMP, and Django stacks.",
        linkId: "mdn-how-web-works",
        sectionId: "arch-what-is-a-stack"
      },
      {
        term: "Server Framework",
        definition: "A library that handles HTTP requests, routing, and business logic on the server. Examples include Express, Fastify, Django, and Rails.",
        linkId: "mdn-web-frameworks",
        sectionId: "arch-what-is-a-stack"
      },
      {
        term: "ORM",
        definition: "Object-Relational Mapping — a technique that lets you query and manipulate a database using objects in your programming language instead of raw SQL. Examples include Django's ORM, Rails' ActiveRecord, and Prisma.",
        linkId: "django-models",
        linkIds: ['prisma-docs', 'drizzle-docs'],
        sectionId: "arch-stack-django",
        sectionIds: ['nja-database'],
        guides: ['architecture', 'nextjs-abstractions'],
      },
      {
        term: "Server-Side Rendering",
        definition: "Generating HTML on the server for each request, then sending the complete page to the browser. Improves initial load time and SEO compared to client-side rendering.",
        linkId: "nextjs-server-components",
        linkIds: ['webdev-rendering'],
        sectionId: "arch-fw-nextjs",
        sectionIds: ['nja-ssr'],
        guides: ['architecture', 'nextjs-abstractions'],
      },
      {
        term: "Static Site Generation",
        definition: "Pre-building HTML pages at build time rather than on each request. The fastest delivery method since pages are served as static files from a CDN.",
        linkId: "nextjs-ssg",
        sectionId: "arch-fw-nextjs",
        guides: ['architecture', 'nextjs-abstractions'],
      },
      {
        term: "Progressive Enhancement",
        definition: "A design approach where the core functionality works without JavaScript, then JavaScript adds richer interactivity. Forms submit normally, then JS enhances them with instant feedback.",
        linkId: "mdn-progressive-enhancement",
        sectionId: "arch-fw-react-router",
        guides: ['architecture', 'nextjs-abstractions'],
      },
      {
        term: "REST API",
        definition: "An API design style using standard HTTP methods (GET, POST, PUT, DELETE) on resource URLs. The dominant pattern for web APIs — e.g., <code>GET /api/users/123</code> returns user data, <code>DELETE /api/users/123</code> removes it.",
        linkId: "mdn-rest",
        linkIds: ['microsoft-api-design'],
        sectionId: "arch-what-is-a-stack",
        sectionIds: ['nja-api-routes'],
        guides: ['architecture', 'nextjs-abstractions', 'wp-agents'],
      },
      {
        term: "Middleware",
        definition: "A function that intercepts HTTP requests and responses in a pipeline. Used for logging, authentication, CORS, error handling, and request parsing. Express and most server frameworks rely heavily on middleware.",
        linkId: "express-middleware",
        linkIds: ['fastify-hooks'],
        sectionId: "arch-stack-mern",
        sectionIds: ['nja-middleware'],
        guides: ['architecture', 'nextjs-abstractions', 'auth'],
      },
      {
        term: "CDN",
        definition: "Content Delivery Network — a global network of servers that caches and serves static assets (JS, CSS, images) from locations close to the user. Dramatically reduces latency compared to serving everything from a single origin server.",
        linkId: "cloudflare-cdn",
        sectionId: "arch-fw-nextjs",
        guides: ['architecture', 'nextjs-abstractions', 'kubernetes'],
      },
    ]
  },
  {
    category: "Databases",
    terms: [
      {
        term: "SQL",
        definition: "Structured Query Language — the standard language for querying and managing relational databases like PostgreSQL, MySQL, and SQLite.",
        linkId: "postgresql-sql",
        sectionId: "arch-stack-pfrn"
      },
      {
        term: "NoSQL",
        definition: "A category of databases that don't use traditional SQL tables. Document stores (MongoDB), key-value stores (Redis), and graph databases (Neo4j) are all NoSQL.",
        linkId: "mongodb-nosql-explained",
        sectionId: "arch-stack-mern"
      },
      {
        term: "Schema",
        definition: "The structure definition of a database — what tables exist, what columns they have, and what data types are allowed. Relational databases enforce schemas; NoSQL databases often don't.",
        linkId: "postgresql-ddl",
        sectionId: "arch-stack-pfrn"
      },
      {
        term: "ACID",
        definition: "Atomicity, Consistency, Isolation, Durability — properties that guarantee database transactions are processed reliably. Relational databases like PostgreSQL are fully ACID-compliant.",
        linkId: "postgresql-transactions",
        sectionId: "arch-stack-lamp"
      },
    ]
  },
  {
    category: "Full-Stack Frameworks",
    terms: [
      {
        term: "React Server Components",
        definition: "A React feature that renders components entirely on the server, sending only the HTML result to the browser. Reduces client-side JavaScript and enables direct database access from components.",
        linkId: "react-server-components",
        linkIds: ['nextjs-server-components'],
        sectionId: "arch-fw-nextjs",
        sectionIds: ['nja-ssr'],
        guides: ['architecture', 'nextjs-abstractions'],
      },
      {
        term: "File-System Routing",
        definition: "A convention where a framework maps your project's file and folder structure directly to URL routes, eliminating the need for manual route configuration.",
        linkId: "nextjs-routing",
        sectionId: "arch-fw-nextjs",
        sectionIds: ['nja-routing'],
        guides: ['architecture', 'nextjs-abstractions'],
      },
      {
        term: "Loader/Action Pattern",
        definition: "A data fetching pattern where loaders provide data for GET requests and actions handle mutations (POST/PUT/DELETE). After a mutation, affected loaders automatically re-run.",
        linkId: "react-router-data-loading",
        sectionId: "arch-fw-react-router"
      },
      {
        term: "Hotwire",
        definition: "A Rails frontend approach combining Turbo (fast page navigation via HTML-over-the-wire) and Stimulus (lightweight JavaScript behaviors), minimizing the need for heavy JS frameworks.",
        linkId: "hotwired",
        sectionId: "arch-stack-rails"
      },
    ]
  },
]
