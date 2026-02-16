import type { GlossaryCategory } from './index'

export const authGlossary: GlossaryCategory[] = [
  {
    category: 'Authentication & Security',
    terms: [
      {
        term: 'Authentication (AuthN)',
        definition:
          'The process of verifying WHO a user is. Authentication happens before authorization \u2014 you must know who someone is before deciding what they can do. Common methods include passwords, OAuth, and biometrics.',
        linkId: 'oauth-net-overview',
        sectionId: 'auth-core',
      },
      {
        term: 'Authorization (AuthZ)',
        definition:
          'The process of determining WHAT an authenticated user is allowed to do. Authorization checks permissions, roles, and access levels after identity is established.',
        linkId: 'oauth-net-overview',
        sectionId: 'auth-core',
      },
      {
        term: 'JSON Web Token (JWT)',
        definition:
          'A compact, URL-safe token format with three Base64-encoded parts: header, payload, and signature. JWTs are signed (not encrypted) \u2014 anyone can read the payload, but only the server can issue valid signatures.',
        linkId: 'jwt-io',
        sectionId: 'auth-jwt',
      },
      {
        term: 'OAuth 2.0',
        definition:
          'An authorization framework that lets users grant third-party apps limited access to their resources without sharing passwords. Powers "Sign in with Google/GitHub" flows via the Authorization Code grant.',
        linkId: 'oauth-net-overview',
        sectionId: 'auth-oauth',
      },
      {
        term: 'OpenID Connect (OIDC)',
        definition:
          'An identity layer built on OAuth 2.0 that adds authentication. While OAuth 2.0 only handles authorization, OIDC adds an ID token (a JWT) that tells your app who the user is.',
        linkId: 'openid-connect-spec',
        sectionId: 'auth-oauth',
      },
      {
        term: 'PKCE',
        definition:
          'Proof Key for Code Exchange \u2014 a security extension for the OAuth Authorization Code flow designed for public clients like SPAs. Prevents authorization code interception attacks without requiring a client secret.',
        linkId: 'auth0-pkce',
        sectionId: 'auth-oauth',
      },
      {
        term: 'Access Token',
        definition:
          'A short-lived credential (typically a JWT) sent with API requests to prove the user is authenticated. Should expire quickly (5\u201315 minutes) to limit damage if stolen.',
        linkId: 'jwt-io',
        sectionId: 'auth-tokens',
      },
      {
        term: 'Refresh Token',
        definition:
          'A long-lived token used to obtain new access tokens without requiring the user to log in again. Should be stored securely and rotated on each use to detect theft.',
        linkId: 'oauth-net-overview',
        sectionId: 'auth-tokens',
      },
      {
        term: 'XSS (Cross-Site Scripting)',
        definition:
          'An attack where malicious JavaScript is injected into a web page, potentially stealing tokens from <code>localStorage</code> or executing actions as the user. Defended with HttpOnly cookies, input sanitization, and CSP headers.',
        linkId: 'owasp-xss',
        sectionId: 'auth-security',
      },
      {
        term: 'CSRF (Cross-Site Request Forgery)',
        definition:
          'An attack where a malicious site tricks the user\'s browser into making authenticated requests to your API using existing cookies. Defended with SameSite cookies, CSRF tokens, and Origin header checks.',
        linkId: 'owasp-csrf',
        sectionId: 'auth-security',
      },
      {
        term: 'Content Security Policy (CSP)',
        definition:
          'An HTTP header that restricts which scripts, styles, and other resources a page can load. A key defense against XSS \u2014 blocks inline scripts and limits allowed source origins.',
        linkId: 'mdn-csp',
        sectionId: 'auth-security',
      },
      {
        term: 'HttpOnly Cookie',
        definition:
          'A cookie flag that prevents JavaScript from accessing the cookie via <code>document.cookie</code>. The recommended storage mechanism for auth tokens because it eliminates the XSS token-theft vector.',
        linkId: 'mdn-set-cookie',
        sectionId: 'auth-frontend',
      },
      {
        term: 'RBAC (Role-Based Access Control)',
        definition:
          'A permission model where access is granted based on user roles (e.g., "admin", "editor", "viewer"). In frontend apps, RBAC controls what UI elements are shown, but the backend must enforce the actual permissions.',
        linkId: 'oauth-net-overview',
        sectionId: 'auth-rbac',
      },
      {
        term: 'BFF (Backend-for-Frontend)',
        definition:
          'A thin server that sits between the SPA and the auth provider. It holds the client_secret, manages HttpOnly cookies, and keeps tokens off the browser entirely \u2014 the most secure pattern for SPAs.',
        linkId: 'oauth-bff-pattern',
        sectionId: 'auth-integration',
      },
      {
        term: 'Refresh Token Rotation',
        definition:
          'A security practice where each use of a refresh token issues a new one and invalidates the old. If a stolen refresh token is reused, the server detects the duplicate and revokes the entire token family.',
        linkId: 'oauth-net-overview',
        sectionId: 'auth-refresh',
      },
      {
        term: 'CORS (Cross-Origin Resource Sharing)',
        definition:
          'A browser security mechanism that restricts which origins can make requests to your API. Especially important for cookie-based auth: <code>credentials: "include"</code> requires an explicit origin (no wildcard) and <code>Access-Control-Allow-Credentials: true</code>.',
        linkId: 'mdn-cors',
        sectionId: 'auth-integration',
      },
    ],
  },
]
