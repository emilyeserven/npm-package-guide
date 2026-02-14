import type { ChecklistBaseSection } from '../../components/mdx/ChecklistBase'

export const NJA_CHECKLIST: ChecklistBaseSection[] = [
  {
    id: 'planning',
    name: 'Phase 1: Planning & Architecture',
    icon: '\u{1F4D0}',  // 📐
    items: [
      { label: 'Audit all existing Next.js API routes \u2014 list every endpoint, method, and what it does' },
      { label: 'Map out data flow: which pages fetch what data, and from where' },
      { label: 'Decide on backend framework (Express, Fastify, Hono) and database (Postgres, MongoDB, etc.)' },
      { label: 'Choose a monorepo tool (Turborepo, Nx) or decide on separate repos' },
      { label: 'Define shared TypeScript types/interfaces for API request/response contracts' },
      { label: 'Document your authentication strategy (JWT, sessions, OAuth provider integration)' },
      { label: 'Set up your project structure: <code>/frontend</code>, <code>/backend</code>, <code>/shared</code> (or <code>packages/</code>)' },
    ],
  },
  {
    id: 'backend-setup',
    name: 'Phase 2: Backend Setup',
    icon: '\u{1F3D7}\uFE0F',  // 🏗️
    items: [
      { label: 'Initialize backend project with TypeScript, ESLint, and your chosen framework' },
      { label: 'Set up basic server with health check endpoint (<code>GET /health</code>)' },
      { label: 'Configure CORS to allow requests from your frontend origin' },
      { label: 'Add body parsing middleware (<code>express.json()</code> or Fastify\u2019s built-in parser)' },
      { label: 'Set up environment variable management (dotenv + validation with zod)' },
      { label: 'Implement global error-handling middleware with consistent error format' },
      { label: 'Add request logging middleware (morgan, pino, or similar)' },
      { label: 'Set up database connection and ORM/ODM (Prisma, Drizzle, Mongoose, etc.)' },
      { label: 'Run database migrations or schema setup' },
      { label: 'Add rate limiting middleware for public endpoints' },
    ],
  },
  {
    id: 'migrate-api',
    name: 'Phase 3: Migrate API Routes',
    icon: '\u{1F500}',  // 🔀
    items: [
      { label: 'Convert each Next.js API route to a backend route handler, one at a time' },
      { label: 'Implement authentication middleware (JWT verification or session checking)' },
      { label: 'Apply auth middleware to protected routes' },
      { label: 'Add input validation (zod) to all route handlers' },
      { label: 'Test each endpoint with Postman, Thunder Client, or automated tests' },
      { label: 'Ensure proper HTTP status codes (201 for created, 204 for no content, etc.)' },
      { label: 'Implement pagination for list endpoints' },
    ],
  },
  {
    id: 'frontend-refactor',
    name: 'Phase 4: Frontend Refactor',
    icon: '\u{1F3A8}',  // 🎨
    items: [
      { label: 'Set up Vite + React project (or migrate existing Next.js frontend)' },
      { label: 'Install and configure a client-side router (React Router, TanStack Router, etc.)' },
      { label: 'Install and configure a data-fetching library (TanStack Query, SWR, etc.)' },
      { label: 'Create an API client module (axios instance or fetch wrapper with base URL)' },
      { label: 'Point API client to your backend URL (from env var <code>VITE_API_URL</code>)' },
      { label: 'Replace all Next.js data fetching (<code>getServerSideProps</code>, server components) with client-side data hooks' },
      { label: 'Replace <code>next/link</code> and <code>next/router</code> with your router\u2019s equivalents' },
      { label: 'Replace <code>next/image</code> with standard <code>&lt;img&gt;</code> or an image optimization library' },
      { label: 'Replace <code>next/head</code> with <code>react-helmet</code> or your router\u2019s head management' },
      { label: 'Add loading skeletons/spinners (no more instant SSR content!)' },
      { label: 'Implement React Error Boundaries for graceful error handling' },
    ],
  },
  {
    id: 'devops',
    name: 'Phase 5: DevOps & Deployment',
    icon: '\u{1F433}',  // 🐳
    items: [
      { label: 'Create Dockerfile for backend (Node.js)' },
      { label: 'Create Dockerfile for frontend (Nginx serving static build)' },
      { label: 'Write <code>docker-compose.yml</code> to run both services together' },
      { label: 'Configure Nginx as reverse proxy (<code>/api/*</code> \u2192 backend, <code>/*</code> \u2192 frontend)' },
      { label: 'Set up CI/CD pipeline to build and test both projects' },
      { label: 'Add health check endpoints and monitoring' },
      { label: 'Configure TLS/SSL certificates for production' },
      { label: 'Document the deployment process for your team' },
    ],
  },
  {
    id: 'testing-hardening',
    name: 'Phase 6: Testing & Hardening',
    icon: '\u{1F9EA}',  // 🧪
    items: [
      { label: 'Write integration tests for critical API endpoints' },
      { label: 'Test auth flows end-to-end (login, protected routes, token refresh)' },
      { label: 'Test CORS in a production-like environment (different origins)' },
      { label: 'Load test backend endpoints to check performance' },
      { label: 'Security audit: SQL injection, XSS, CSRF protection, helmet.js headers' },
      { label: 'Verify all env vars are correctly separated (no secrets in frontend bundle!)' },
      { label: 'Test in the target deployment environment' },
      { label: 'Create runbooks for common issues (service won\u2019t start, DB connection fails, etc.)' },
    ],
  },
]
