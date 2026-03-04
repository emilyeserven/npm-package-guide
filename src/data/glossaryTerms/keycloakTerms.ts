import type { GlossaryCategory } from './index'

export const keycloakGlossary: GlossaryCategory[] = [
  {
    category: 'Identity & Access Management',
    terms: [
      {
        term: 'Keycloak',
        definition:
          'Open-source identity and access management (IAM) solution maintained under the CNCF. Handles authentication, authorization, SSO, and user management.',
        linkId: 'kc-docs',
        sectionId: 'kc-overview',
      },
      {
        term: 'Realm',
        definition:
          'An isolated tenant in Keycloak that manages its own users, credentials, roles, and clients. Analogous to a separate namespace for auth configuration.',
        linkId: 'kc-admin-guide',
        sectionId: 'kc-concepts',
      },
      {
        term: 'PKCE',
        definition:
          'Proof Key for Code Exchange — an extension to the Authorization Code flow that prevents code interception attacks. Required for public clients (SPAs).',
        linkId: 'kc-oidc-spec',
        sectionId: 'kc-flows',
        guides: ['keycloak', 'auth'],
      },
      {
        term: 'Public Client',
        definition:
          'An OAuth 2.0 client that cannot securely store a secret (e.g., a browser SPA). Uses Authorization Code + PKCE instead of a client secret.',
        linkId: 'kc-admin-guide',
        sectionId: 'kc-concepts',
      },
      {
        term: 'Confidential Client',
        definition:
          'An OAuth 2.0 client that can securely store a secret server-side (e.g., a backend API). Not appropriate for browser-based applications.',
        linkId: 'kc-admin-guide',
        sectionId: 'kc-concepts',
      },
      {
        term: 'User Federation',
        definition:
          'Keycloak feature that syncs users from external directories (LDAP, Active Directory) into a realm without requiring data migration.',
        linkId: 'kc-admin-guide',
        sectionId: 'kc-concepts',
      },
    ],
  },
  {
    category: 'Tokens & Sessions',
    terms: [
      {
        term: 'Access Token',
        definition:
          'A short-lived JWT (typically 5 minutes) sent as a Bearer header to authorize API requests. Contains roles, scopes, and user claims.',
        linkId: 'kc-jwt-io',
        sectionId: 'kc-tokens',
        guides: ['keycloak', 'auth'],
      },
      {
        term: 'ID Token',
        definition:
          'A JWT containing user identity information (name, email, etc.) intended for the frontend. Not sent to APIs — used only to display profile data.',
        linkId: 'kc-jwt-io',
        sectionId: 'kc-tokens',
        guides: ['keycloak', 'auth'],
      },
      {
        term: 'Refresh Token',
        definition:
          'A longer-lived token (typically 30 minutes) used to obtain new access and ID tokens without requiring the user to re-authenticate.',
        linkId: 'kc-jwt-io',
        sectionId: 'kc-tokens',
        guides: ['keycloak', 'auth'],
      },
      {
        term: 'Silent SSO',
        definition:
          'Technique where an OIDC client uses a hidden iframe to check if the user has an active Keycloak session, enabling seamless single sign-on across apps.',
        linkId: 'kc-keycloak-js',
        sectionId: 'kc-flows',
      },
    ],
  },
  {
    category: 'React Integration',
    terms: [
      {
        term: 'react-oidc-context',
        definition:
          'Vendor-agnostic React library built on oidc-client-ts for OIDC authentication. Recommended over the deprecated @react-keycloak/web.',
        linkId: 'kc-react-oidc-context',
        sectionId: 'kc-react',
      },
      {
        term: 'keycloak-js',
        definition:
          'Official Keycloak JavaScript adapter providing OIDC integration with built-in token refresh, SSO, and account management. More tightly coupled than react-oidc-context.',
        linkId: 'kc-keycloak-js',
        sectionId: 'kc-react',
      },
      {
        term: 'Keycloakify',
        definition:
          'Community library for building Keycloak login and account page themes using React and modern frontend tooling.',
        linkId: 'kc-keycloakify',
        sectionId: 'kc-production',
      },
    ],
  },
]
