import type { RegistryLink } from './types'

export const securityLinks: RegistryLink[] = [
  // ─── Security tools & libraries ───────────────────────────────────
  {
    id: 'sec-dompurify',
    url: 'https://github.com/cure53/DOMPurify',
    label: 'DOMPurify',
    source: 'GitHub',
    desc: 'DOM-only XSS sanitizer for HTML, MathML, and SVG \u2014 the go-to library for safe HTML rendering',
    tags: ['tool', 'free', 'open-source', 'guide:security'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'sec-bcrypt',
    url: 'https://www.npmjs.com/package/bcrypt',
    label: 'bcrypt (npm)',
    source: 'npm',
    desc: 'Password hashing library using the bcrypt algorithm \u2014 intentionally slow to resist brute force',
    tags: ['tool', 'free', 'open-source', 'guide:security'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'sec-prisma',
    url: 'https://www.prisma.io/',
    label: 'Prisma ORM',
    source: 'Prisma',
    desc: 'Type-safe database access for TypeScript \u2014 parameterized queries prevent SQL injection by design',
    tags: ['tool', 'free', 'open-source', 'guide:security'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'sec-socket-dev',
    url: 'https://socket.dev/',
    label: 'Socket.dev',
    source: 'Socket',
    desc: 'Supply chain security platform \u2014 detects typosquatting, install scripts, and maintainer account changes',
    tags: ['tool', 'free', 'guide:security'],
    resourceCategory: 'Libraries & Tools',
  },

  // ─── OWASP references (new, not duplicating existing IDs) ─────────
  {
    id: 'owasp-csrf-prevention',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html',
    label: 'CSRF Prevention Cheat Sheet',
    source: 'OWASP',
    desc: 'Comprehensive CSRF prevention techniques including tokens, SameSite cookies, and double-submit patterns',
    tags: ['docs', 'free', 'guide:security'],
    resourceCategory: 'OWASP Cheat Sheets',
  },
  {
    id: 'sec-owasp-llm-top-10',
    url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
    label: 'OWASP Top 10 for LLM Applications',
    source: 'OWASP',
    desc: 'Security risks specific to LLM-powered applications \u2014 prompt injection is the #1 threat',
    tags: ['docs', 'free', 'guide:security'],
    resourceCategory: 'OWASP Cheat Sheets',
  },

  // ─── Standards & references ───────────────────────────────────────
  {
    id: 'sec-hsts-mdn',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
    label: 'Strict-Transport-Security (HSTS) \u2014 MDN',
    source: 'MDN',
    desc: 'HTTP header that tells browsers to only connect via HTTPS \u2014 prevents SSL stripping attacks',
    tags: ['docs', 'free', 'guide:security'],
    resourceCategory: 'Standards & References',
  },
  {
    id: 'sec-csp-mdn',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP',
    label: 'Content Security Policy (CSP) \u2014 MDN',
    source: 'MDN',
    desc: 'Browser security mechanism that restricts resource loading \u2014 second layer of defense against XSS',
    tags: ['docs', 'free', 'guide:security'],
    resourceCategory: 'Standards & References',
  },
  {
    id: 'sec-dnssec-overview',
    url: 'https://www.icann.org/resources/pages/dnssec-what-is-it-why-important-2019-03-05-en',
    label: 'DNSSEC: What Is It and Why Is It Important?',
    source: 'ICANN',
    desc: 'Overview of DNSSEC \u2014 cryptographic signatures that verify DNS record authenticity',
    tags: ['docs', 'free', 'guide:security'],
    resourceCategory: 'Standards & References',
  },
  {
    id: 'sec-phishing-awareness',
    url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing',
    label: 'Recognize and Report Phishing',
    source: 'CISA',
    desc: 'U.S. Cybersecurity & Infrastructure Security Agency guide on identifying and reporting phishing attempts',
    tags: ['docs', 'free', 'guide:security'],
    resourceCategory: 'Standards & References',
  },
]
