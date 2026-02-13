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
} from './types'

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
  { text: 'CSRF protection in place for cookie-based auth', category: 'Security' },
  { text: 'CSP headers configured to mitigate XSS', category: 'Security' },
  { text: 'All auth decisions are enforced server-side', category: 'Security' },
  { text: 'Role/permission checks are UX only \u2014 backend is source of truth', category: 'Security' },
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
]
