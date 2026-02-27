import type {
  AuthConceptSection,
  JwtPart,
  JwtSectionMeta,
  OAuthFlowStep,
  OAuthSectionMeta,
  AuthPattern,
  AuthPatternSectionMeta,
  SecurityThreat,
  SecuritySectionMeta,
  AuthChecklistItem,
  ChecklistSectionMeta,
  QuizQuestion,
  PkceFlowStep,
  PkceSectionMeta,
  TokenLifecyclePattern,
  TokenLifecycleSectionMeta,
  RbacPattern,
  RbacSectionMeta,
  IntegrationScenario,
  IntegrationSectionMeta,
} from './types'
import type { ChecklistBaseSection, ChecklistManifest } from '../guideTypes'

/* ───────────────────────── CONCEPT SECTIONS (core + tokens) ───────────────────────── */

export const AUTH_CONCEPT_SECTIONS: AuthConceptSection[] = [
  {
    id: 'core',
    heading: 'Authentication vs Authorization',
    intro: 'These two words sound alike but solve very different problems.',
    keyTakeaway:
      "Authentication always happens first. You can't decide what someone is allowed to do until you know who they are.",
    concepts: [
      {
        term: 'Authentication (AuthN)',
        definition: 'WHO are you?',
        analogy: 'Showing your ID at the door of a building.',
        color: '#3b82f6',
        darkColor: '#60a5fa',
        examples: [
          'Logging in with email + password',
          'Signing in with Google / GitHub (OAuth)',
          'Scanning your fingerprint',
        ],
      },
      {
        term: 'Authorization (AuthZ)',
        definition: 'WHAT are you allowed to do?',
        analogy: 'Your keycard only opens certain floors.',
        color: '#8b5cf6',
        darkColor: '#a78bfa',
        examples: [
          'Admin can delete users, viewer cannot',
          'Free tier sees 10 results, paid sees 100',
          'Only the author can edit their own post',
        ],
      },
    ],
  },
  {
    id: 'tokens',
    heading: 'How the Browser Remembers You',
    intro:
      'HTTP is stateless — every request starts fresh. Tokens and sessions solve this by proving you already logged in.',
    keyTakeaway:
      'Most modern SPAs use token-based auth (JWTs). Sessions are still common in server-rendered apps. Both are valid — pick based on your architecture.',
    concepts: [
      {
        term: 'Session-Based Auth',
        definition: 'Server stores your login state',
        analogy: 'A coat check — you get a ticket, they hold your coat.',
        color: '#059669',
        darkColor: '#34d399',
        examples: [
          'Server creates a session object on login',
          'Session ID sent as an HttpOnly cookie',
          'Server looks up your session on every request',
        ],
      },
      {
        term: 'Token-Based Auth (JWT)',
        definition: 'Client holds a self-contained proof of identity',
        analogy: 'A boarding pass — all the info is printed right on it.',
        color: '#d97706',
        darkColor: '#fbbf24',
        examples: [
          'Server signs a JWT on login, sends it back',
          'Client stores it and sends it in the Authorization header',
          'Server verifies the signature — no database lookup needed',
        ],
      },
    ],
  },
]

/* ───────────────────────── JWT ───────────────────────── */

export const JWT_SECTION_META: JwtSectionMeta = {
  heading: 'Inside a JSON Web Token',
  intro:
    "A JWT is three Base64-encoded parts separated by dots. It's signed, not encrypted — anyone can read it, but no one can tamper with it.",
  keyTakeaway:
    "Never store sensitive data in a JWT payload — it's only encoded, not encrypted. Always check the exp claim to handle token expiry gracefully.",
}

export const JWT_PARTS: JwtPart[] = [
  {
    name: 'Header',
    color: '#ef4444',
    json: '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
    desc: 'Tells the server which algorithm was used to sign the token.',
  },
  {
    name: 'Payload',
    color: '#8b5cf6',
    json: '{\n  "sub": "user_123",\n  "name": "Emily",\n  "role": "admin",\n  "exp": 1717200000\n}',
    desc: 'Your claims — user info, roles, expiry. Never put secrets here!',
  },
  {
    name: 'Signature',
    color: '#3b82f6',
    json: 'HMACSHA256(\n  base64(header) + "." +\n  base64(payload),\n  secret\n)',
    desc: "The server's proof that it issued this token and it hasn't been altered.",
  },
]

/* ───────────────────────── OAUTH ───────────────────────── */

export const OAUTH_SECTION_META: OAuthSectionMeta = {
  heading: 'Letting Someone Else Handle Login',
  intro:
    'OAuth 2.0 is an authorization framework. OpenID Connect (OIDC) adds an identity layer on top. Together, they power every "Sign in with Google" button you\'ve ever clicked.',
  keyTakeaway:
    "The Authorization Code flow (with PKCE for SPAs) is the gold standard for frontend apps. Never use the Implicit flow — it's deprecated for good reason.",
}

export const OAUTH_FLOW_STEPS: OAuthFlowStep[] = [
  {
    step: 1,
    label: "User clicks 'Sign in with Google'",
    detail: "Your app redirects to Google's authorization server.",
    actor: 'Your App \u2192 Google',
  },
  {
    step: 2,
    label: 'User logs in & consents',
    detail: 'Google authenticates the user and asks permission to share info.',
    actor: 'User \u2194 Google',
  },
  {
    step: 3,
    label: 'Google redirects back with a code',
    detail:
      'An authorization code is sent to your redirect URI. This is NOT a token yet.',
    actor: 'Google \u2192 Your App',
  },
  {
    step: 4,
    label: 'Your backend exchanges code for tokens',
    detail:
      'Your server sends the code + client secret to Google and gets back an access token (and optionally an ID token).',
    actor: 'Your Server \u2192 Google',
  },
  {
    step: 5,
    label: 'Use the tokens',
    detail:
      'Access token calls Google APIs. ID token (JWT) tells you who the user is.',
    actor: 'Your App \u2192 APIs',
  },
]

/* ───────────────────────── FRONTEND PATTERNS ───────────────────────── */

export const AUTH_PATTERN_SECTION_META: AuthPatternSectionMeta = {
  heading: 'Implementing Auth in Your React App',
  intro:
    "Here's what auth actually looks like in frontend code — the patterns you'll use daily.",
  keyTakeaway:
    "The frontend never truly 'enforces' auth — it only provides UX. The backend must always verify tokens and permissions on every request.",
}

export const AUTH_PATTERNS: AuthPattern[] = [
  {
    name: 'Token Storage',
    recommendation: 'HttpOnly cookies (best) or in-memory (good)',
    avoid: 'localStorage / sessionStorage (XSS-vulnerable)',
    code: `// \u2705 In-memory storage (clears on refresh)
let accessToken = null;

export const setToken = (token) => {
  accessToken = token;
};
export const getToken = () => accessToken;

// \u2705 Attach to requests
fetch('/api/data', {
  headers: {
    Authorization: \`Bearer \${getToken()}\`
  }
});`,
  },
  {
    name: 'Auth Context Provider',
    recommendation: 'Wrap your app in an AuthProvider',
    avoid: 'Prop-drilling auth state through every component',
    code: `const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    checkAuth().then(setUser).finally(
      () => setLoading(false)
    );
  }, []);

  const login = async (credentials) => {
    const user = await authService.login(credentials);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout, loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}`,
  },
  {
    name: 'Protected Routes',
    recommendation: 'Guard routes with an auth check component',
    avoid: 'Checking auth inside every individual page',
    code: `// With TanStack Router
const protectedRoute = createRoute({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' });
    }
  },
});

// With React Router
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  return children;
}`,
  },
  {
    name: 'Token Refresh',
    recommendation: 'Use interceptors to silently refresh expired tokens',
    avoid: 'Forcing users to re-login when tokens expire',
    code: `// Axios interceptor example
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshToken();
        setToken(newToken);
        // Retry the original request
        error.config.headers.Authorization =
          \`Bearer \${newToken}\`;
        return api(error.config);
      } catch {
        logout(); // Refresh failed, force re-login
      }
    }
    return Promise.reject(error);
  }
);`,
  },
]

/* ───────────────────────── SECURITY THREATS ───────────────────────── */

export const SECURITY_SECTION_META: SecuritySectionMeta = {
  heading: 'Threats You Must Know About',
  intro:
    'Auth is a security boundary. Here are the attacks that target it and how to defend against them.',
  keyTakeaway:
    "Security is never 'just a backend thing.' Your frontend choices (where you store tokens, how you handle redirects) directly impact your app's security posture.",
}

export const SECURITY_THREATS: SecurityThreat[] = [
  {
    name: 'XSS (Cross-Site Scripting)',
    risk: 'Attacker injects script that steals tokens from localStorage',
    defense: 'Use HttpOnly cookies, sanitize inputs, use CSP headers',
    severity: 'critical',
  },
  {
    name: 'CSRF (Cross-Site Request Forgery)',
    risk: 'Malicious site triggers authenticated requests using your cookies',
    defense:
      'Use SameSite cookies, CSRF tokens, check Origin/Referer headers',
    severity: 'high',
  },
  {
    name: 'Token Theft',
    risk: 'Stolen JWT gives full access until it expires',
    defense:
      'Short-lived access tokens (5\u201315 min) + refresh token rotation',
    severity: 'high',
  },
  {
    name: 'Open Redirects',
    risk: 'Attacker manipulates redirect_uri to steal auth codes',
    defense: 'Whitelist exact redirect URIs, validate all redirects server-side',
    severity: 'medium',
  },
]

/* ───────────────────────── CHECKLIST ───────────────────────── */

export const CHECKLIST_SECTION_META: ChecklistSectionMeta = {
  heading: 'Your Auth Implementation Checklist',
  intro: 'Use this when building or reviewing auth in a frontend app.',
}

export const AUTH_CHECKLIST_ITEMS: AuthChecklistItem[] = [
  { text: 'Tokens stored in HttpOnly cookies or in-memory (never localStorage)', category: 'Storage' },
  { text: 'Access tokens are short-lived (5\u201315 minutes)', category: 'Tokens' },
  { text: 'Refresh token rotation is implemented', category: 'Tokens' },
  { text: 'Auth state managed via Context/Provider pattern', category: 'Architecture' },
  { text: 'Protected routes redirect unauthenticated users', category: 'Architecture' },
  { text: '401 responses trigger silent token refresh', category: 'Architecture' },
  { text: 'PKCE used for OAuth in SPAs (no client secret in frontend)', category: 'OAuth' },
  { text: 'Redirect URIs are exact-match whitelisted', category: 'OAuth' },
  { text: 'OAuth state parameter validated on callback to prevent CSRF', category: 'OAuth' },
  { text: 'CSRF protection in place for cookie-based auth', category: 'Security' },
  { text: 'CSP headers configured to mitigate XSS', category: 'Security' },
  { text: 'All auth decisions are enforced server-side', category: 'Security' },
  { text: 'Role/permission checks are UX only \u2014 backend is source of truth', category: 'Security' },
  { text: 'Concurrent 401 requests queue behind a single refresh', category: 'Architecture' },
  { text: 'CORS configured with explicit origin (no wildcard) when using credentials', category: 'Security' },
  { text: 'Frontend permission checks mirror backend middleware', category: 'Architecture' },
  { text: 'BFF pattern evaluated for apps requiring maximum token security', category: 'Architecture' },
]

/* ───────────────────────── QUIZ ───────────────────────── */

export const AUTH_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'Where should you store JWTs in a frontend app?',
    options: [
      'localStorage',
      'HttpOnly cookies or in-memory',
      'sessionStorage',
      'A global JS variable on window',
    ],
    answer: 1,
    explanation:
      "HttpOnly cookies can't be accessed by JavaScript (XSS-safe). In-memory storage clears on refresh but is also safe from XSS.",
  },
  {
    q: 'What does a JWT signature prove?',
    options: [
      'The payload is encrypted',
      "The token hasn't been tampered with",
      'The user has admin access',
      'The token will never expire',
    ],
    answer: 1,
    explanation:
      "The signature verifies integrity — that the header and payload haven't been modified since the server signed them.",
  },
  {
    q: 'In the OAuth Authorization Code flow, what gets sent to your redirect URI?',
    options: [
      'An access token',
      "The user's password",
      'An authorization code',
      'A session cookie',
    ],
    answer: 2,
    explanation:
      'The auth code is a short-lived, one-time-use code that your backend exchanges for actual tokens. This keeps tokens off the browser URL.',
  },
  {
    q: 'Why should access tokens be short-lived?',
    options: [
      'To save server memory',
      'To limit damage if a token is stolen',
      'Because JWTs can only hold small payloads',
      'To reduce network traffic',
    ],
    answer: 1,
    explanation:
      'A stolen token works until it expires. Short lifetimes (5\u201315 min) minimize the window of vulnerability. Pair with refresh token rotation.',
  },
  {
    q: 'Should the frontend enforce authorization rules?',
    options: [
      "Yes, it's the primary enforcement point",
      'No, frontend checks are UX \u2014 the backend is the source of truth',
      'Only for admin roles',
      'Only in airgapped environments',
    ],
    answer: 1,
    explanation:
      'Frontend auth checks improve UX (hiding buttons, redirecting) but can always be bypassed. The server must verify permissions on every request.',
  },
  {
    q: 'What does PKCE protect against in an SPA OAuth flow?',
    options: [
      'XSS attacks that steal cookies',
      'Authorization code interception by a malicious app',
      'CSRF attacks on the token endpoint',
      'Brute-force password attacks',
    ],
    answer: 1,
    explanation:
      'PKCE prevents a malicious app from intercepting the authorization code and exchanging it for tokens. The code_verifier proves the app that started the flow is the same one finishing it.',
  },
  {
    q: 'When multiple API calls hit a 401 simultaneously, what should your frontend do?',
    options: [
      'Refresh the token for each request independently',
      'Queue all requests behind a single refresh promise',
      'Immediately redirect to the login page',
      'Retry each request with exponential backoff',
    ],
    answer: 1,
    explanation:
      'Queuing behind a single refresh promise avoids race conditions and duplicate refresh calls. All waiting requests resolve once the new token arrives.',
  },
  {
    q: "A user's role check passes in the frontend but the API returns 403. What happened?",
    options: [
      'The frontend role check has a bug',
      'The JWT has expired',
      'The backend enforces stricter permissions than the frontend shows',
      'CORS is misconfigured',
    ],
    answer: 2,
    explanation:
      'Frontend role checks are UX hints \u2014 the backend is the source of truth. The backend may have updated permissions, or the frontend may be using stale JWT claims. Always trust the 403.',
  },
]

/* ───────────────────────── PKCE ───────────────────────── */

export const PKCE_SECTION_META: PkceSectionMeta = {
  heading: 'PKCE: Securing OAuth for SPAs',
  intro:
    'SPAs can\'t keep secrets \u2014 anyone can View Source. PKCE (Proof Key for Code Exchange, pronounced "pixy") solves this by proving the app that started the flow is the same app finishing it.',
  keyTakeaway:
    'PKCE replaces the client_secret with a dynamic proof. The SPA generates a random verifier, hashes it into a challenge, and the auth server confirms the match during token exchange.',
}

export const PKCE_FLOW_STEPS: PkceFlowStep[] = [
  {
    step: 1,
    label: 'Generate code_verifier',
    detail: 'Your SPA creates a random, high-entropy string (43\u2013128 characters). This stays in memory \u2014 never sent in the URL.',
    actor: 'SPA',
    code: `// Generate a cryptographically random verifier
const array = new Uint8Array(32);
crypto.getRandomValues(array);
const codeVerifier = btoa(String.fromCharCode(...array))
  .replace(/\\+/g, '-')
  .replace(/\\//g, '_')
  .replace(/=+$/, '');
// Store in sessionStorage for the callback
sessionStorage.setItem('pkce_verifier', codeVerifier);`,
  },
  {
    step: 2,
    label: 'Hash into code_challenge',
    detail: 'SHA-256 hash the verifier and Base64url-encode it. This is safe to send publicly.',
    actor: 'SPA',
    code: `async function generateChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, '');
}`,
  },
  {
    step: 3,
    label: 'Redirect with code_challenge',
    detail: 'Send the user to the auth server with the challenge (not the verifier) and a random state parameter.',
    actor: 'SPA \u2192 Auth Server',
    code: `const state = crypto.randomUUID();
sessionStorage.setItem('oauth_state', state);

const params = new URLSearchParams({
  response_type: 'code',
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'openid profile email',
  state,
  code_challenge: challenge,
  code_challenge_method: 'S256',
});

window.location.href =
  \`\${AUTH_SERVER}/authorize?\${params}\`;`,
  },
  {
    step: 4,
    label: 'User authenticates',
    detail: 'The auth server handles login and consent. Your SPA is not involved in this step.',
    actor: 'Auth Server',
    code: `// Nothing happens in your code here.
// The auth server shows its login page,
// the user enters credentials or uses SSO,
// and the server redirects back to your app.`,
  },
  {
    step: 5,
    label: 'Handle the callback',
    detail: 'Your callback route extracts the code, validates the state, and prepares to exchange tokens.',
    actor: 'Auth Server \u2192 SPA',
    code: `// /callback route handler
const params = new URLSearchParams(window.location.search);
const code = params.get('code');
const returnedState = params.get('state');

// Validate state to prevent CSRF
const savedState = sessionStorage.getItem('oauth_state');
if (returnedState !== savedState) {
  throw new Error('State mismatch \u2014 possible CSRF attack');
}`,
  },
  {
    step: 6,
    label: 'Exchange code + verifier for tokens',
    detail: 'Send the authorization code AND the original verifier to the token endpoint. The server hashes the verifier and confirms it matches the challenge from step 3.',
    actor: 'SPA \u2192 Auth Server',
    code: `const verifier = sessionStorage.getItem('pkce_verifier');

const response = await fetch(\`\${AUTH_SERVER}/token\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    code_verifier: verifier, // The proof!
  }),
});

const { access_token, id_token, refresh_token }
  = await response.json();
// Clean up
sessionStorage.removeItem('pkce_verifier');
sessionStorage.removeItem('oauth_state');`,
  },
]

/* ───────────────────────── TOKEN LIFECYCLE ───────────────────────── */

export const TOKEN_LIFECYCLE_SECTION_META: TokenLifecycleSectionMeta = {
  heading: 'Managing the Token Lifecycle',
  intro:
    'Access tokens expire. Refresh tokens can be stolen. Your frontend needs to handle every edge case gracefully \u2014 without forcing users to re-login.',
  keyTakeaway:
    'Queue requests during refresh, rotate refresh tokens on every use, and have a clear error recovery strategy for every failure mode.',
}

export const TOKEN_LIFECYCLE_PATTERNS: TokenLifecyclePattern[] = [
  {
    name: 'Request Queuing',
    scenario: 'Multiple API calls fire while the token is expired',
    problem: 'Each call independently tries to refresh, causing race conditions and duplicate refresh requests.',
    solution: 'Queue requests behind a single refresh promise. All waiting requests resolve when the new token arrives.',
    code: `let refreshPromise: Promise<string> | null = null;

async function getValidToken(): Promise<string> {
  const token = getToken();
  if (token && !isExpired(token)) return token;

  // If a refresh is already in progress, wait for it
  if (refreshPromise) return refreshPromise;

  // Start a new refresh \u2014 all callers share this promise
  refreshPromise = refreshToken()
    .then((newToken) => {
      setToken(newToken);
      return newToken;
    })
    .finally(() => {
      refreshPromise = null; // Reset for next cycle
    });

  return refreshPromise;
}

// Axios interceptor using the queue
api.interceptors.request.use(async (config) => {
  const token = await getValidToken();
  config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});`,
  },
  {
    name: 'Refresh Token Rotation',
    scenario: 'A refresh token is stolen by an attacker',
    problem: 'Without rotation, the stolen token works until it expires (could be weeks).',
    solution: 'Each refresh returns a new refresh token. If the old one is reused, the server invalidates the entire family.',
    code: `// Server-side (what your backend does):
// 1. Receive refresh request with token_A
// 2. Verify token_A is valid and not reused
// 3. Issue new access_token + new refresh_token_B
// 4. Mark token_A as "used"
// 5. If token_A is reused later \u2192 revoke ALL tokens
//    for this user (theft detected!)

// Client-side (your SPA):
async function refreshToken(): Promise<TokenPair> {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include', // send HttpOnly cookie
  });

  if (!response.ok) {
    // Refresh failed \u2014 must re-authenticate
    logout();
    throw new Error('Session expired');
  }

  const { access_token } = await response.json();
  // New refresh token is set as HttpOnly cookie
  // by the server \u2014 SPA never sees it
  return { accessToken: access_token };
}`,
  },
  {
    name: 'Error Recovery',
    scenario: 'Various failure modes during API calls',
    problem: 'Different HTTP status codes require different recovery strategies.',
    solution: 'A structured error handler that maps status codes to actions.',
    code: `api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    // Already retried \u2014 don't loop
    if (config._retried) {
      return Promise.reject(error);
    }

    switch (status) {
      case 401: // Unauthorized \u2014 token expired
        config._retried = true;
        try {
          const token = await getValidToken();
          config.headers.Authorization =
            \`Bearer \${token}\`;
          return api(config); // Retry with new token
        } catch {
          logout(); // Refresh failed
          return Promise.reject(error);
        }

      case 403: // Forbidden \u2014 valid token, no permission
        // Don't refresh! The token works, the user
        // just doesn't have access.
        notifyUser('You lack permission for this action');
        return Promise.reject(error);

      case 503: // Service unavailable
        // Retry with exponential backoff
        await delay(1000 * (config._retryCount ?? 1));
        config._retryCount = (config._retryCount ?? 1) + 1;
        if (config._retryCount <= 3) return api(config);
        return Promise.reject(error);

      default:
        return Promise.reject(error);
    }
  }
);`,
  },
]

/* ───────────────────────── RBAC ───────────────────────── */

export const RBAC_SECTION_META: RbacSectionMeta = {
  heading: 'Role-Based Access Control in the Frontend',
  intro:
    'Backend engineers know RBAC deeply \u2014 middleware that checks roles before processing a request. In the frontend, the pattern is the same, but the enforcement is different: frontend checks improve UX, backend checks enforce security.',
  keyTakeaway:
    'Every frontend permission check should mirror a backend check. Think of the frontend as a preview of what the backend will allow.',
}

export const RBAC_PATTERNS: RbacPattern[] = [
  {
    name: 'Permission Hook',
    description: 'A reusable hook that reads roles from the JWT or user context and exposes simple boolean checks.',
    frontendLabel: 'React Hook',
    frontendCode: `function usePermissions() {
  const { user } = useAuth();

  return {
    hasRole: (role: string) =>
      user?.roles?.includes(role) ?? false,

    hasPermission: (perm: string) =>
      user?.permissions?.includes(perm) ?? false,

    canAccess: (resource: string, action: string) => {
      const key = \`\${resource}:\${action}\`;
      return user?.permissions?.includes(key) ?? false;
    },
  };
}

// Usage
function AdminPanel() {
  const { hasRole } = usePermissions();
  if (!hasRole('admin')) return <NoAccess />;
  return <AdminDashboard />;
}`,
    backendLabel: 'Express Middleware',
    backendCode: `// The backend equivalent you already know
function requireRole(...roles: string[]) {
  return (req, res, next) => {
    const userRoles = req.user?.roles ?? [];
    const hasRole = roles.some(r =>
      userRoles.includes(r)
    );
    if (!hasRole) {
      return res.status(403).json({
        error: 'Insufficient permissions'
      });
    }
    next();
  };
}

// Usage
app.get('/admin/users',
  requireAuth,
  requireRole('admin'),
  adminController.listUsers
);`,
  },
  {
    name: 'Gate Component',
    description: 'A wrapper component that conditionally renders children based on permissions. Clean declarative API for templates.',
    frontendLabel: 'React Component',
    frontendCode: `function Can({
  role,
  permission,
  fallback = null,
  children,
}: {
  role?: string;
  permission?: string;
  fallback?: ReactNode;
  children: ReactNode;
}) {
  const { hasRole, hasPermission } = usePermissions();

  const allowed = role
    ? hasRole(role)
    : permission
      ? hasPermission(permission)
      : false;

  return allowed ? <>{children}</> : <>{fallback}</>;
}

// Usage \u2014 declarative and readable
<Can role="editor">
  <button onClick={handleEdit}>Edit Post</button>
</Can>

<Can permission="users:delete" fallback={
  <span className="text-gray-400">
    Contact admin to delete users
  </span>
}>
  <button onClick={handleDelete}>Delete User</button>
</Can>`,
    backendLabel: 'Express Middleware',
    backendCode: `// Same pattern, different layer
function requirePermission(perm: string) {
  return (req, res, next) => {
    if (!req.user?.permissions?.includes(perm)) {
      return res.status(403).json({
        error: \`Missing permission: \${perm}\`
      });
    }
    next();
  };
}

app.delete('/api/users/:id',
  requireAuth,
  requirePermission('users:delete'),
  userController.deleteUser
);`,
  },
  {
    name: 'Route-Level Guards',
    description: 'Check permissions before route rendering. Redirects unauthorized users instead of showing a flash of forbidden content.',
    frontendLabel: 'React Router',
    frontendCode: `// TanStack Router \u2014 beforeLoad check
const adminRoute = createRoute({
  path: '/admin',
  beforeLoad: ({ context }) => {
    const { user } = context.auth;
    if (!user) {
      throw redirect({ to: '/login' });
    }
    if (!user.roles.includes('admin')) {
      throw redirect({ to: '/unauthorized' });
    }
  },
  component: AdminLayout,
});

// React Router equivalent
<Route
  path="/admin"
  element={
    <RequireRole role="admin">
      <AdminLayout />
    </RequireRole>
  }
/>`,
    backendLabel: 'Express Router',
    backendCode: `// Backend: route-level middleware stacking
const adminRouter = express.Router();

// All routes in this router require admin
adminRouter.use(requireAuth);
adminRouter.use(requireRole('admin'));

adminRouter.get('/users', listUsers);
adminRouter.delete('/users/:id', deleteUser);

app.use('/admin', adminRouter);`,
  },
  {
    name: 'Permission-Aware API Responses',
    description: 'The backend tells the frontend what the user can do, so the frontend doesn\'t have to duplicate authorization logic.',
    frontendLabel: 'Frontend Consumer',
    frontendCode: `// The API response includes allowed actions
interface PostResponse {
  id: string;
  title: string;
  content: string;
  // Server tells us what this user can do
  _permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canPublish: boolean;
  };
}

function PostActions({ post }: { post: PostResponse }) {
  const { canEdit, canDelete, canPublish }
    = post._permissions;

  return (
    <div className="flex gap-2">
      {canEdit && <EditButton postId={post.id} />}
      {canPublish && <PublishButton postId={post.id} />}
      {canDelete && <DeleteButton postId={post.id} />}
    </div>
  );
}`,
    backendLabel: 'Express Handler',
    backendCode: `// Backend: compute permissions per-resource
app.get('/api/posts/:id', requireAuth, (req, res) => {
  const post = db.getPost(req.params.id);
  const user = req.user;

  res.json({
    ...post,
    _permissions: {
      canEdit:
        user.id === post.authorId
        || user.roles.includes('editor'),
      canDelete:
        user.roles.includes('admin'),
      canPublish:
        user.roles.includes('editor')
        || user.roles.includes('admin'),
    },
  });
});`,
  },
]

/* ───────────────────────── INTEGRATION ───────────────────────── */

export const INTEGRATION_SECTION_META: IntegrationSectionMeta = {
  heading: 'Connecting Frontend Auth to Your Backend',
  intro:
    'Auth doesn\'t exist in a vacuum. The frontend and backend must agree on how tokens are stored, how cookies are configured, and how CORS is set up. Here are the integration points where things go wrong.',
  keyTakeaway:
    'Auth integration is a contract between frontend and backend. The frontend says "I\'ll send credentials: include." The backend says "I\'ll set HttpOnly cookies with SameSite=Lax and CORS with credentials allowed." If either side breaks the contract, auth fails silently.',
}

export const INTEGRATION_SCENARIOS: IntegrationScenario[] = [
  {
    name: 'HttpOnly Cookie Login',
    description: 'The server sets auth tokens as HttpOnly cookies. The browser manages them automatically \u2014 your JavaScript never touches the token.',
    frontendCode: `// Login \u2014 the browser stores the cookie automatically
const response = await fetch('/api/auth/login', {
  method: 'POST',
  credentials: 'include', // Required for cookies!
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

// Authenticated request \u2014 cookie sent automatically
const data = await fetch('/api/protected/data', {
  credentials: 'include', // Must include on EVERY request
});

// Logout \u2014 server clears the cookie
await fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include',
});`,
    backendCode: `// Express login handler
app.post('/api/auth/login', async (req, res) => {
  const user = await authenticate(req.body);
  const accessToken = signJwt(user, '15m');
  const refreshToken = signRefreshToken(user);

  // Set tokens as HttpOnly cookies
  res.cookie('access_token', accessToken, {
    httpOnly: true,   // JS can't read this
    secure: true,     // HTTPS only
    sameSite: 'lax',  // CSRF protection
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: '/',
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth/refresh', // Scoped path
  });

  res.json({ user: { id: user.id, name: user.name } });
});`,
    httpHeaders: `// Request (browser sends automatically)
Cookie: access_token=eyJhbG...; refresh_token=eyJhbG...

// Response (server sets)
Set-Cookie: access_token=eyJhbG...;
  HttpOnly; Secure; SameSite=Lax; Max-Age=900; Path=/
Set-Cookie: refresh_token=eyJhbG...;
  HttpOnly; Secure; SameSite=Lax; Max-Age=604800;
  Path=/api/auth/refresh`,
    gotcha: 'Forgetting credentials: "include" is the #1 cause of "my cookies aren\'t being sent." Without it, fetch() ignores cookies entirely.',
  },
  {
    name: 'CORS for Cookie-Based Auth',
    description: 'When your SPA and API are on different origins, CORS must be configured explicitly. Wildcard (*) does NOT work with credentials.',
    frontendCode: `// Vite dev server proxy (avoids CORS in development)
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});

// In production, use a real reverse proxy (nginx)
// or deploy frontend and API on the same origin.`,
    backendCode: `// Express CORS for cookie-based auth
import cors from 'cors';

app.use(cors({
  origin: 'https://your-spa.example.com', // Exact!
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Common mistake: this WILL NOT WORK with credentials
// app.use(cors({ origin: '*', credentials: true }));
// Error: "Cannot use wildcard in
// Access-Control-Allow-Origin when credentials
// flag is true"`,
    httpHeaders: `// Preflight request (browser sends automatically)
OPTIONS /api/data HTTP/1.1
Origin: https://your-spa.example.com
Access-Control-Request-Method: POST

// Preflight response (your server must return)
Access-Control-Allow-Origin: https://your-spa.example.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: POST, GET, PUT, DELETE
Access-Control-Allow-Headers: Content-Type`,
    gotcha: 'Using origin: "*" with credentials: true is the most common CORS + auth mistake. The browser will reject the response with a cryptic error.',
  },
  {
    name: 'BFF (Backend-for-Frontend) Pattern',
    description: 'A thin server between your SPA and the auth provider. It holds the client_secret, manages cookies, and keeps tokens off the browser entirely.',
    frontendCode: `// Your SPA talks to YOUR server, not the auth provider
// Login: redirect to your BFF
window.location.href = '/auth/login';
// Your BFF redirects to Google/Auth0, handles callback,
// and sets session cookies

// API calls go through the BFF
const data = await fetch('/api/users', {
  credentials: 'include',
});
// BFF attaches the access token to the upstream request
// Your SPA never sees any tokens!`,
    backendCode: `// BFF server (Node.js/Express)
// Handles OAuth callback
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  // Exchange code for tokens (server-side \u2014 safe!)
  const tokens = await authProvider.exchangeCode({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET, // Safe on server!
    redirect_uri: CALLBACK_URL,
  });

  // Store tokens server-side (session or encrypted cookie)
  req.session.accessToken = tokens.access_token;
  req.session.refreshToken = tokens.refresh_token;

  res.redirect('/');
});

// Proxy API calls with token injection
app.use('/api', async (req, res) => {
  const response = await fetch(UPSTREAM_API + req.path, {
    headers: {
      Authorization:
        \`Bearer \${req.session.accessToken}\`,
    },
  });
  res.json(await response.json());
});`,
    httpHeaders: `// SPA \u2192 BFF (cookies only, no tokens exposed)
GET /api/users HTTP/1.1
Cookie: session=abc123...

// BFF \u2192 Upstream API (token injected by server)
GET /users HTTP/1.1
Authorization: Bearer eyJhbG...`,
    gotcha: 'A BFF adds operational complexity (another server to deploy and monitor), but it\'s the most secure pattern for SPAs because tokens never touch the browser.',
  },
  {
    name: 'Debugging Auth Issues',
    description: 'A checklist for the three most common "auth works in Postman but not the browser" issues.',
    frontendCode: `// 1. "Cookie not being sent"
// Check: credentials: 'include' on every fetch()
// Check: SameSite cookie attribute
// Check: Secure flag (requires HTTPS, even localhost
//   may need special config)

// 2. "CORS preflight failing"
// Check: exact origin (not wildcard) in server CORS
// Check: OPTIONS method handling on server
// Check browser DevTools \u2192 Network \u2192 filter by
//   the failing request \u2192 check the preflight

// 3. "Token works in Postman but not browser"
// Postman doesn't enforce CORS or SameSite rules.
// The browser DOES. Check headers in DevTools.`,
    backendCode: `// Quick Express debugging setup
app.use((req, res, next) => {
  console.log({
    method: req.method,
    path: req.path,
    origin: req.headers.origin,
    cookies: Object.keys(req.cookies || {}),
    authorization: req.headers.authorization
      ? 'present' : 'missing',
  });
  next();
});

// Verify cookie is being set correctly
app.post('/api/auth/login', (req, res) => {
  // ... auth logic ...
  console.log(
    'Set-Cookie headers:',
    res.getHeaders()['set-cookie']
  );
  res.json({ success: true });
});`,
    httpHeaders: `// DevTools debugging checklist:
// 1. Network tab \u2192 select request \u2192 Headers tab
//    - Does "Cookie" header appear in Request Headers?
//    - Does "Set-Cookie" appear in Response Headers?
//
// 2. Application tab \u2192 Cookies
//    - Is the cookie listed? What domain/path?
//    - Is "HttpOnly" checked? (If so, JS can't read it
//      \u2014 that's correct!)
//
// 3. Console tab \u2192 look for CORS errors
//    - "has been blocked by CORS policy" = server issue
//    - "Cannot use wildcard" = credentials + * conflict`,
    gotcha: 'The browser DevTools Network and Application tabs are your primary debugging tools for auth issues. Postman bypasses browser security rules entirely, so it\'s not a reliable test.',
  },
]

/* ───────────────────────── CHECKLIST MANIFEST ───────────────────────── */

const AUTH_ICONS: Record<string, string> = {
  Storage: '\uD83D\uDCBE',
  Tokens: '\uD83C\uDFAB',
  Architecture: '\uD83C\uDFD7\uFE0F',
  OAuth: '\uD83D\uDD11',
  Security: '\uD83D\uDEE1\uFE0F',
}

function groupByCategory(items: AuthChecklistItem[]): ChecklistBaseSection[] {
  const categories = [...new Set(items.map(it => it.category))]
  return categories.map(cat => ({
    id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: cat,
    icon: AUTH_ICONS[cat] ?? '\u2705',
    items: items.filter(it => it.category === cat).map(it => ({ label: it.text })),
  }))
}

export const AUTH_CHECKLIST: ChecklistBaseSection[] = groupByCategory(AUTH_CHECKLIST_ITEMS)

export const AUTH_CHECKLIST_MANIFEST: ChecklistManifest = {
  id: 'auth',
  pageId: 'auth-checklist',
  sourceGuideId: 'auth',
  title: 'Auth Implementation Checklist',
  sections: AUTH_CHECKLIST,
}
