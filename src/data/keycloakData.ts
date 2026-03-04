import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'
import type { QuizQuestion } from '../components/mdx/QuizBase'

// ── Guide sections ──────────────────────────────────────────────────

export const KC_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['kc-start'] },
  { label: 'Foundations', ids: ['kc-overview', 'kc-concepts', 'kc-flows'] },
  { label: 'Integration', ids: ['kc-setup', 'kc-react', 'kc-tokens'] },
  { label: 'Production & Review', ids: ['kc-production', 'kc-quiz'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const KC_START_PAGE_DATA: StartPageData = {
  subtitle:
    'Open-source IAM demystified \u2014 from core concepts to React integration, token flows, and production patterns.',
  tip: 'Designed for frontend engineers who need to integrate Keycloak into React SPAs. Assumes basic understanding of authentication concepts.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'What is Keycloak',
      description:
        'Understand what Keycloak gives you out of the box, its strengths, tradeoffs, and the current version landscape.',
      jumpTo: 'kc-overview',
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Core Concepts',
      description:
        'Learn the Keycloak domain model \u2014 Realms, Clients, Users, Roles, Groups, and identity protocols (OIDC vs SAML).',
      jumpTo: 'kc-concepts',
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Authentication Flows',
      description:
        'Walk through Authorization Code + PKCE step by step \u2014 the only flow your SPA should use.',
      jumpTo: 'kc-flows',
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Setup & Config',
      description:
        'Get Keycloak running locally with Docker, create a realm, and register your React SPA as a public client.',
      jumpTo: 'kc-setup',
    },
    {
      type: 'numbered',
      num: 5,
      title: 'React Integration',
      description:
        'Integrate with react-oidc-context or keycloak-js, protect routes, and make authenticated API calls.',
      jumpTo: 'kc-react',
    },
    {
      type: 'numbered',
      num: 6,
      title: 'Tokens Deep Dive',
      description:
        'Understand the three tokens Keycloak issues, JWT anatomy, storage best practices, and role extraction.',
      jumpTo: 'kc-tokens',
    },
    {
      type: 'bonus',
      title: 'Production & Review',
      description:
        'Production readiness checklist, deployment topology, and a knowledge check to test your understanding.',
      sectionLabel: 'Production & Review',
      subItemDescriptions: {
        'kc-production':
          'HTTPS, production mode, database choices, redirect URI restrictions, clustering, and theme customization.',
        'kc-quiz':
          'Five questions to test your understanding of Keycloak concepts and best practices.',
      },
    },
  ],
}

// ── Manifest ──────────────────────────────────────────────────────────

export const KC_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'keycloak',
    icon: '🔑',
    title: 'Keycloak for Frontend Engineers',
    startPageId: 'kc-start',
    description:
      'Open-source IAM demystified \u2014 from core concepts to React integration, token flows, and production patterns.',
    category: 'security',
    dateCreated: '2026-03-04',
    dateModified: '2026-03-04',
    sections: KC_GUIDE_SECTIONS,
  },
  startPageData: KC_START_PAGE_DATA,
}

// ── Types ──────────────────────────────────────────────────────────────

export interface KcConceptItem {
  id: string
  title: string
  content: string
  bullets?: string[]
  note?: string
}

export interface KcVersionRow {
  version: string
  highlights: string
  status: string
}

export interface KcFlowStep {
  step: number
  label: string
  detail: string
}

export interface KcDeprecatedFlow {
  flow: string
  reason: string
}

export interface KcTokenInfo {
  token: string
  purpose: string
  lifetime: string
  storage: string
}

export interface KcProductionStep {
  step: number
  title: string
  detail: string
}

// ── Overview data ──────────────────────────────────────────────────────

export const KC_STRENGTHS: string[] = [
  '<strong>Single Sign-On (SSO)</strong> \u2014 users log in once and access multiple apps via OIDC or SAML',
  '<strong>Social Login</strong> \u2014 built-in Google, GitHub, Facebook, and custom identity provider integration',
  '<strong>User Federation</strong> \u2014 connect to existing LDAP or Active Directory user stores',
  '<strong>Fine-Grained Authorization</strong> \u2014 RBAC (role-based), groups, and policy-based access control',
  '<strong>Customizable Auth Flows</strong> \u2014 visual editor for login steps, MFA, conditional step-up auth',
  '<strong>Passkeys &amp; WebAuthn</strong> \u2014 passwordless authentication (fully supported since v26.4)',
  '<strong>Admin Console &amp; REST API</strong> \u2014 manage everything via UI or programmatically',
  '<strong>MCP Integration</strong> \u2014 can serve as an OAuth2 authorization server for MCP servers (v26.5+)',
]

export const KC_VERSION_TABLE: KcVersionRow[] = [
  {
    version: '26.5.x',
    highlights:
      'JWT Authorization Grants, Workflows (IGA), MCP server guide, OpenTelemetry',
    status: 'Latest',
  },
  {
    version: '26.4.x',
    highlights:
      'Passkeys, FAPI 2.0, DPoP, Federated Client Auth (SPIFFE/K8s)',
    status: 'Stable',
  },
  {
    version: '26.3.x',
    highlights: 'OIDC improvements, security patches',
    status: 'Maintenance',
  },
  {
    version: '25.x and below',
    highlights: 'Legacy \u2014 upgrade recommended',
    status: 'EOL',
  },
]

// ── Concepts data ──────────────────────────────────────────────────────

export const KC_CONCEPTS: KcConceptItem[] = [
  {
    id: 'realms',
    title: 'Realms',
    content:
      'A <strong>Realm</strong> is a tenant \u2014 an isolated namespace that manages a set of users, credentials, roles, and clients. Think of it like a separate universe of auth.',
    bullets: [
      'The <strong>master</strong> realm is the root admin realm \u2014 don\u2019t put your app users here',
      'Create a dedicated realm per application or environment (e.g., <code>my-app-dev</code>, <code>my-app-prod</code>)',
      'Each realm has its own login page, token settings, and identity providers',
    ],
    note: 'A realm is like a separate route namespace. Just as <code>/admin/*</code> and <code>/app/*</code> might have different layouts and guards, different realms have completely separate auth configs.',
  },
  {
    id: 'clients',
    title: 'Clients',
    content:
      'A <strong>Client</strong> is any application that requests authentication from Keycloak. Your React SPA is a client. Your backend API can also be a client (or a "resource server").',
    bullets: [
      '<strong>Public Client (your SPA)</strong> \u2014 No client secret. Uses Authorization Code + PKCE. Runs entirely in the browser.',
      '<strong>Confidential Client (your API)</strong> \u2014 Has a client secret stored server-side. Used for backend services. Never use this type for browser apps.',
    ],
    note: 'Key settings for a public SPA client: set Access Type to <code>public</code>, set Valid Redirect URIs to your app\u2019s URL, and enable Standard Flow (Authorization Code).',
  },
  {
    id: 'users-roles',
    title: 'Users, Groups, & Roles',
    content:
      '<strong>Users</strong> are the people who authenticate. <strong>Roles</strong> define what they\u2019re allowed to do. <strong>Groups</strong> are organizational buckets for assigning roles in bulk.',
    bullets: [
      '<strong>Realm Role</strong> \u2014 Global across all clients (e.g., <code>admin</code>, <code>user</code>)',
      '<strong>Client Role</strong> \u2014 Scoped to a specific client (e.g., <code>react-app:editor</code>)',
      '<strong>Composite Role</strong> \u2014 A role that contains other roles (e.g., <code>manager</code> = <code>editor</code> + <code>viewer</code>)',
      '<strong>Group</strong> \u2014 Organizational container (e.g., <code>/engineering/frontend</code>)',
    ],
  },
  {
    id: 'identity-providers',
    title: 'Identity Providers & Federation',
    content:
      '<strong>Identity Providers (IdPs)</strong> let users log in via external systems \u2014 Google, GitHub, SAML providers, or another Keycloak instance. <strong>User Federation</strong> syncs users from LDAP/AD into Keycloak.',
    note: 'From the frontend perspective, this is transparent. You redirect to Keycloak, and Keycloak handles showing the "Sign in with Google" button and the OIDC dance with the external provider. You just get tokens back.',
  },
  {
    id: 'protocols',
    title: 'Protocols: OIDC vs SAML',
    content:
      'Keycloak supports two major authentication protocols. For modern SPAs and APIs, always use OIDC.',
    bullets: [
      '<strong>OpenID Connect (OIDC)</strong> \u2014 Built on OAuth 2.0, uses JSON/JWT tokens. The recommended protocol for React apps.',
      '<strong>SAML 2.0</strong> \u2014 XML-based, older standard. Primarily used in enterprise SSO with legacy corporate IdPs.',
    ],
    note: 'If you\u2019re building a modern SPA or API, use OIDC. If you\u2019re integrating with enterprise systems that only speak SAML, Keycloak can bridge between the two.',
  },
]

// ── Auth flows data ──────────────────────────────────────────────────

export const KC_PKCE_FLOW_STEPS: KcFlowStep[] = [
  {
    step: 1,
    label: 'User clicks "Login"',
    detail:
      'Your React app generates a random code_verifier and its SHA-256 hash (code_challenge). It redirects the browser to Keycloak\u2019s authorization endpoint with the challenge, client ID, redirect URI, and requested scopes.',
  },
  {
    step: 2,
    label: 'User authenticates at Keycloak',
    detail:
      'Keycloak shows its login page (which you can theme). The user enters credentials, completes MFA, or uses a social provider. This all happens on Keycloak\u2019s domain \u2014 your app never sees the password.',
  },
  {
    step: 3,
    label: 'Keycloak redirects back with an auth code',
    detail:
      'After successful login, Keycloak redirects back to your redirect_uri with a short-lived authorization code in the URL query params.',
  },
  {
    step: 4,
    label: 'Your app exchanges the code for tokens',
    detail:
      'The OIDC client library sends the auth code plus the original code_verifier to Keycloak\u2019s token endpoint. Keycloak verifies the verifier matches the challenge, then issues an access token, refresh token, and ID token.',
  },
  {
    step: 5,
    label: 'Tokens are used for API calls',
    detail:
      'Your app attaches the access token as a Bearer token in API requests. The backend validates the JWT signature against Keycloak\u2019s public keys (JWKS endpoint).',
  },
]

export const KC_DEPRECATED_FLOWS: KcDeprecatedFlow[] = [
  {
    flow: 'Implicit Flow',
    reason:
      'Tokens exposed in URL fragments. No refresh tokens. Deprecated by OAuth 2.1.',
  },
  {
    flow: 'Resource Owner Password (ROPC)',
    reason:
      'Your app handles the password directly \u2014 defeats the purpose of delegated auth.',
  },
  {
    flow: 'Client Credentials',
    reason: 'Machine-to-machine only. No user context. Not for SPAs.',
  },
]

// ── Tokens data ──────────────────────────────────────────────────────

export const KC_TOKEN_TABLE: KcTokenInfo[] = [
  {
    token: 'Access Token',
    purpose:
      'Authorize API requests. Send as Bearer header. Contains roles & claims.',
    lifetime: '5 minutes',
    storage: 'Memory (JS variable)',
  },
  {
    token: 'ID Token',
    purpose:
      'Identity proof for the frontend. Contains user profile info (name, email, etc.).',
    lifetime: '5 minutes',
    storage: 'Memory (JS variable)',
  },
  {
    token: 'Refresh Token',
    purpose:
      'Get new access/ID tokens without re-authenticating. Sent to token endpoint only.',
    lifetime: '30 minutes',
    storage: 'Memory (or secure storage)',
  },
]

export const KC_TOKEN_DO: string[] = [
  'Store tokens in memory (JS variables)',
  'Let the OIDC library manage refresh',
  'Validate tokens server-side on every API request',
  'Keep access token lifetimes short (5 min)',
  'Use PKCE for all browser flows',
]

export const KC_TOKEN_DONT: string[] = [
  'Store tokens in localStorage (XSS-vulnerable)',
  'Parse/trust tokens on the frontend for authorization decisions',
  'Use long-lived access tokens',
  'Send tokens to third-party APIs',
  'Log tokens in production',
]

export const KC_JWT_EXAMPLE = `{
  "exp":        1709500800,       // expiration timestamp
  "iss":        "http://localhost:8080/realms/my-app",
  "aud":        "account",
  "sub":        "a1b2c3d4-...",   // unique user ID
  "azp":        "react-app",      // authorized party (client)
  "scope":      "openid profile email",
  "realm_access": {
    "roles": ["admin", "user"]
  },
  "resource_access": {
    "react-app": {
      "roles": ["editor"]
    }
  },
  "preferred_username": "emily",
  "email":      "emily@example.com",
  "name":       "Emily Serven"
}`

// ── Production data ──────────────────────────────────────────────────

export const KC_PRODUCTION_STEPS: KcProductionStep[] = [
  {
    step: 1,
    title: 'Enable HTTPS everywhere',
    detail:
      'Keycloak must run behind TLS in production. Set KC_HOSTNAME and configure your reverse proxy (nginx, Traefik, etc.) to terminate SSL. Tokens sent over HTTP are trivially interceptable.',
  },
  {
    step: 2,
    title: 'Use production mode',
    detail:
      'Run with start instead of start-dev. Build an optimized image: kc.sh build then kc.sh start --optimized. This enables caching and disables dev features.',
  },
  {
    step: 3,
    title: 'Use a real database',
    detail:
      'PostgreSQL is the most common choice. Use managed database services for reliability. Configure connection pooling. Back up regularly.',
  },
  {
    step: 4,
    title: 'Restrict redirect URIs',
    detail:
      'Never use wildcards like * in production redirect URIs. Specify exact URIs: https://app.example.com/callback.',
  },
  {
    step: 5,
    title: 'Configure token lifetimes',
    detail:
      'Shorter is better: 5-minute access tokens, 30-minute refresh tokens, and 10-hour SSO sessions are reasonable defaults. Tune based on your security requirements.',
  },
]

// ── Quiz data ──────────────────────────────────────────────────────────

export const KC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'What type of OAuth 2.0 client should a React SPA be configured as?',
    options: [
      'Confidential client with a client secret',
      'Public client with PKCE',
      'Service account client',
      'Bearer-only client',
    ],
    answer: 1,
    explanation:
      'SPAs can\u2019t securely store secrets, so they must use public clients with PKCE to protect the authorization code exchange.',
  },
  {
    q: 'Where should access tokens be stored in a React application?',
    options: [
      'localStorage',
      'A cookie without HttpOnly flag',
      'In-memory (JavaScript variable)',
      'sessionStorage',
    ],
    answer: 2,
    explanation:
      'In-memory storage is the most secure option for SPAs. It\u2019s not accessible to XSS attacks that target Web Storage APIs, and the OIDC library handles refresh via the refresh token.',
  },
  {
    q: 'What does PKCE protect against?',
    options: [
      'Cross-site request forgery (CSRF)',
      'Authorization code interception attacks',
      'Token expiration',
      'Brute-force password attacks',
    ],
    answer: 1,
    explanation:
      'PKCE ensures that even if an attacker intercepts the authorization code, they can\u2019t exchange it for tokens without the original code verifier.',
  },
  {
    q: 'In Keycloak, what is a "Realm"?',
    options: [
      'A type of authentication flow',
      'A permission scope for API access',
      'An isolated tenant managing its own users, clients, and roles',
      'A JSON Web Token claim',
    ],
    answer: 2,
    explanation:
      'A realm is Keycloak\u2019s top-level organizational unit \u2014 a completely isolated space with its own users, clients, roles, and settings.',
  },
  {
    q: 'Which library is recommended for new React projects integrating with Keycloak?',
    options: [
      '@react-keycloak/web (deprecated)',
      'react-oidc-context + oidc-client-ts',
      'passport-keycloak',
      'next-auth',
    ],
    answer: 1,
    explanation:
      'react-oidc-context (built on oidc-client-ts) is the vendor-agnostic, actively maintained choice. @react-keycloak/web is deprecated, and keycloak-js can be used directly as an alternative.',
  },
]

// ── Code samples ──────────────────────────────────────────────────────

export const KC_DOCKER_COMPOSE = `# docker-compose.yml
services:
  keycloak:
    image: quay.io/keycloak/keycloak:26.4
    command: start-dev
    environment:
      KC_BOOTSTRAP_ADMIN_USERNAME: admin
      KC_BOOTSTRAP_ADMIN_PASSWORD: admin
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://db:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: keycloak
    ports:
      - "8080:8080"
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: keycloak
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`

export const KC_OIDC_CONFIG = `// src/auth.ts
import type { AuthProviderProps } from "react-oidc-context";

export const oidcConfig: AuthProviderProps = {
  authority: "http://localhost:8080/realms/my-app",
  client_id: "react-app",
  redirect_uri: "http://localhost:5173/",
  post_logout_redirect_uri: "http://localhost:5173/",
  scope: "openid profile email",
  onSigninCallback: () => {
    // Remove OIDC query params from URL after login
    window.history.replaceState({}, "", window.location.pathname);
  },
};`

export const KC_OIDC_PROVIDER = `// src/main.tsx
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./auth";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
);`

export const KC_OIDC_APP = `// src/App.tsx
import { useAuth } from "react-oidc-context";

export function App() {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  if (!auth.isAuthenticated) {
    return (
      <button onClick={() => auth.signinRedirect()}>
        Log in
      </button>
    );
  }

  return (
    <div>
      <p>Hello, {auth.user?.profile.preferred_username}</p>
      <button onClick={() => auth.signoutRedirect()}>
        Log out
      </button>
    </div>
  );
}`

export const KC_KEYCLOAK_JS = `// src/keycloak.ts
import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "my-app",
  clientId: "react-app",
});

// Initialize with PKCE
export async function initKeycloak() {
  const authenticated = await keycloak.init({
    onLoad: "check-sso",
    pkceMethod: "S256",
    checkLoginIframe: false,
    silentCheckSsoRedirectUri:
      \`\${window.location.origin}/silent-check-sso.html\`,
  });

  // Auto-refresh tokens before expiry
  setInterval(async () => {
    if (keycloak.authenticated) {
      await keycloak.updateToken(30);
    }
  }, 10000);

  return authenticated;
}`

export const KC_PROTECTED_ROUTE = `// src/routes/_authenticated.tsx
// Layout route that protects all child routes
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuth } from "../auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const auth = getAuth(); // your auth singleton
    if (!auth.isAuthenticated) {
      // Redirect to Keycloak login
      auth.signinRedirect();
      // Throw redirect to prevent rendering
      throw redirect({ to: "/" });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}`

export const KC_ROLE_GUARD = `// Role-based route guard
export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    const auth = getAuth();
    const roles = auth.user?.profile?.realm_access?.roles ?? [];
    if (!roles.includes("admin")) {
      throw redirect({ to: "/unauthorized" });
    }
  },
});`

export const KC_AUTH_FETCH = `// src/api/client.ts
import { getAuth } from "../auth";

export async function authFetch(
  url: string,
  options: RequestInit = {}
) {
  const auth = getAuth();

  // Ensure token is fresh
  if (auth.user?.expired) {
    await auth.signinSilent();
  }

  const token = auth.user?.access_token;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: \`Bearer \${token}\`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    // Token was rejected — force re-auth
    auth.signinRedirect();
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(\`API Error: \${response.status}\`);
  }

  return response.json();
}`

export const KC_USE_QUERY = `// src/hooks/useProjects.ts
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../api/client";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => authFetch("/api/projects"),
    staleTime: 5 * 60 * 1000,
    retry: (count, error) => {
      // Don't retry auth errors
      if (error.message === "Unauthorized") return false;
      return count < 3;
    },
  });
}`

export const KC_USE_ROLES = `// src/hooks/useRoles.ts
import { useAuth } from "react-oidc-context";

export function useRoles() {
  const auth = useAuth();
  const token = auth.user?.profile as Record<string, any>;

  const realmRoles: string[] =
    token?.realm_access?.roles ?? [];

  const hasRole = (role: string) =>
    realmRoles.includes(role);

  const hasAnyRole = (...roles: string[]) =>
    roles.some((r) => realmRoles.includes(r));

  return { realmRoles, hasRole, hasAnyRole };
}

// Usage in a component:
// const { hasRole } = useRoles();
// {hasRole("admin") && <AdminPanel />}`
