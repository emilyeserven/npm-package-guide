import type { GlossaryCategory } from './types'

export const securityGlossary: GlossaryCategory[] = [
  {
    category: 'Web Security',
    terms: [
      {
        term: 'XSS (Cross-Site Scripting)',
        definition: 'An attack where malicious JavaScript is injected into a web page, running in other users\u2019 browsers with access to cookies, sessions, and the DOM. Variants include stored, reflected, and DOM-based XSS.',
        linkId: 'owasp-xss-prevention',
        sectionId: 'sec-xss',
        guides: ['security'],
      },
      {
        term: 'CSRF (Cross-Site Request Forgery)',
        definition: 'An attack that tricks a user\u2019s browser into making unintended requests to a site where they\u2019re authenticated, exploiting automatic cookie attachment. Prevented with CSRF tokens and <code>SameSite</code> cookies.',
        linkId: 'owasp-csrf-prevention',
        sectionId: 'sec-csrf',
        guides: ['security'],
      },
      {
        term: 'SQL Injection',
        definition: 'An attack where user input is concatenated into a database query, allowing the attacker to read, modify, or delete data. Prevented with parameterized queries and ORMs.',
        linkId: 'owasp-top-ten',
        sectionId: 'sec-injection',
        guides: ['security'],
      },
      {
        term: 'MITM (Man-in-the-Middle)',
        definition: 'An attack where someone intercepts communication between a client and server \u2014 reading, modifying, or injecting content. Prevented with HTTPS, HSTS, and VPNs.',
        linkId: 'sec-hsts-mdn',
        sectionId: 'sec-mitm',
        guides: ['security'],
      },
      {
        term: 'Supply Chain Attack',
        definition: 'Compromising an application through its dependencies \u2014 hijacking npm packages, typosquatting, or dependency confusion. Prevented by pinning versions, auditing deps, and using scoped registries.',
        linkId: 'sec-socket-dev',
        sectionId: 'sec-supply',
        guides: ['security'],
      },
      {
        term: 'Prompt Injection',
        definition: 'The XSS of AI-powered apps \u2014 crafted input that overrides or manipulates an LLM\u2019s system prompt, potentially causing it to leak data, execute unauthorized actions, or bypass safety guardrails.',
        linkId: 'sec-owasp-llm-top-10',
        sectionId: 'sec-prompt-injection',
        guides: ['security'],
      },
      {
        term: 'CSP (Content Security Policy)',
        definition: 'A browser security mechanism that restricts which resources (scripts, styles, images) a page can load. Acts as a second layer of defense against XSS even if sanitization fails.',
        linkId: 'sec-csp-mdn',
        sectionId: 'sec-xss',
        guides: ['security'],
      },
      {
        term: 'HSTS (HTTP Strict Transport Security)',
        definition: 'An HTTP header that tells browsers to only connect to a domain via HTTPS, preventing SSL stripping attacks. Can be preloaded into browser lists for first-visit protection.',
        linkId: 'sec-hsts-mdn',
        sectionId: 'sec-mitm',
        guides: ['security'],
      },
      {
        term: 'DNSSEC',
        definition: 'DNS Security Extensions \u2014 adds cryptographic signatures to DNS records so resolvers can verify responses haven\u2019t been tampered with. Prevents DNS cache poisoning.',
        linkId: 'sec-dnssec-overview',
        sectionId: 'sec-dns',
        guides: ['security'],
      },
      {
        term: 'DOMPurify',
        definition: 'A DOM-only XSS sanitizer library that strips dangerous elements (<code>&lt;script&gt;</code>, event handlers, <code>javascript:</code> URIs) while preserving safe markup. The standard tool for sanitizing user-supplied HTML.',
        linkId: 'sec-dompurify',
        sectionId: 'sec-xss',
        guides: ['security'],
      },
    ],
  },
]
