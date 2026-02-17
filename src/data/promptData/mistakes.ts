import type { MistakeCategory, SeverityTheme, TestingMistake } from './types'

// ── Severity colors ──────────────────────────────────────────────────

export const SEVERITY_COLORS: Record<string, { light: SeverityTheme; dark: SeverityTheme }> = {
  high: {
    light: { bg: 'rgba(239, 68, 68, 0.08)', border: '#ef4444', badge: '#dc2626', text: '#dc2626' },
    dark: { bg: 'rgba(239, 68, 68, 0.08)', border: '#ef4444', badge: '#dc2626', text: '#fca5a5' },
  },
  medium: {
    light: { bg: 'rgba(245, 158, 11, 0.08)', border: '#f59e0b', badge: '#d97706', text: '#d97706' },
    dark: { bg: 'rgba(245, 158, 11, 0.08)', border: '#f59e0b', badge: '#d97706', text: '#fcd34d' },
  },
  low: {
    light: { bg: 'rgba(59, 130, 246, 0.08)', border: '#3b82f6', badge: '#2563eb', text: '#2563eb' },
    dark: { bg: 'rgba(59, 130, 246, 0.08)', border: '#3b82f6', badge: '#2563eb', text: '#93c5fd' },
  },
}

// ── Mistake categories ───────────────────────────────────────────────

export const MISTAKE_CATEGORIES: MistakeCategory[] = [
  {
    id: 'logic',
    name: 'Logic & Condition Errors',
    icon: '\u26A1',
    severity: 'high',
    items: [
      {
        id: 'toc-off-by-one',
        mistake: 'Off-by-one errors in loops & boundaries',
        example: '`for (let i = 0; i <= arr.length)` \u2014 goes one past the end',
        fix: 'Explicitly state boundary conditions: "Use zero-indexed, exclusive upper bound"',
      },
      {
        id: 'toc-wrong-boolean',
        mistake: 'Wrong boolean logic / inverted conditions',
        example: '`if (!isValid || hasPermission)` instead of `if (isValid && hasPermission)`',
        fix: 'Describe the desired behavior in plain English AND provide a truth table in your prompt',
      },
      {
        id: 'toc-edge-case-blindness',
        mistake: 'Edge case blindness (empty arrays, null, 0, NaN)',
        example: "Doesn't handle empty input \u2192 crashes on `.length` or `.map()`",
        fix: 'Prompt: "Handle edge cases including empty input, null, undefined, 0, and NaN"',
      },
      {
        id: 'toc-math-formula',
        mistake: 'Math formula errors',
        example: 'Averages calculated as `(a+b+1)//2` instead of `(a+b)/2`',
        fix: 'For any math logic, include the exact formula or reference a known algorithm',
      },
    ],
  },
  {
    id: 'apis',
    name: 'Hallucinated APIs & Packages',
    icon: '\u{1F47B}',
    severity: 'high',
    items: [
      {
        id: 'toc-invents-packages',
        mistake: 'Invents non-existent npm packages or methods',
        example: "Invents a `useTheme` hook from a package that doesn't exist on npm",
        fix: 'Specify exact libraries: "Use @shadcn/ui v2.x and TanStack Query v5"',
      },
      {
        id: 'toc-deprecated-apis',
        mistake: 'Uses deprecated or renamed APIs',
        example: '`componentWillMount()`, `findDOMNode()`, or old Next.js page router patterns',
        fix: 'Include version constraints: "Use React 19 APIs only, no class components"',
      },
      {
        id: 'toc-cross-language',
        mistake: 'Cross-language API confusion',
        example: "Uses Python's `round()` behavior when writing JavaScript, or Java's `.equals()` in TS",
        fix: 'Specify the language AND runtime: "Node.js 22, TypeScript 5.x strict mode"',
      },
    ],
  },
  {
    id: 'structural',
    name: 'Structural & Architectural Issues',
    icon: '\u{1F3D7}\uFE0F',
    severity: 'medium',
    items: [
      {
        id: 'toc-over-engineering',
        mistake: 'Over-engineering simple tasks',
        example: 'Creates a full state machine with 5 abstractions for a toggle button',
        fix: 'State complexity upfront: "Keep this simple \u2014 no unnecessary abstractions"',
      },
      {
        id: 'toc-incomplete-code',
        mistake: 'Incomplete code \u2014 missing imports, exports, error handling',
        example: 'Generates a component but forgets to export it or import dependencies',
        fix: 'Prompt: "Provide complete, runnable code with all imports and exports"',
      },
      {
        id: 'toc-ignores-patterns',
        mistake: 'Ignores existing project patterns',
        example: 'Uses Redux when your project uses Zustand, or REST when you use GraphQL',
        fix: 'In CLAUDE.md or prompt: specify your stack, patterns, and conventions explicitly',
      },
      {
        id: 'toc-security-gaps',
        mistake: 'Security gaps \u2014 no input sanitization, XSS vectors',
        example: 'Uses `dangerouslySetInnerHTML` without sanitizing, or builds SQL with string concat',
        fix: 'Always prompt: "Follow OWASP security best practices. Sanitize all user input."',
      },
    ],
  },
  {
    id: 'style',
    name: 'Style & Formatting Drift',
    icon: '\u{1F3A8}',
    severity: 'low',
    items: [
      {
        id: 'toc-inconsistent-naming',
        mistake: 'Inconsistent naming conventions',
        example: 'Mixes `camelCase` and `snake_case` in the same file',
        fix: 'Specify: "Use camelCase for JS/TS, kebab-case for CSS, PascalCase for components"',
      },
      {
        id: 'toc-unnecessary-comments',
        mistake: 'Adds unnecessary comments or over-documents',
        example: '`// This function adds two numbers\\nfunction add(a, b) { return a + b; }`',
        fix: '"Only add comments for complex logic. No obvious comments."',
      },
      {
        id: 'toc-formatting-rules',
        mistake: 'Forgets semicolons, trailing commas, or formatting rules',
        example: "Generates code that doesn't match your Prettier/ESLint config",
        fix: 'Include your .prettierrc or ESLint rules summary in CLAUDE.md',
      },
    ],
  },
  {
    id: 'react',
    name: 'React Component Errors',
    icon: '\u269B\uFE0F',
    severity: 'high',
    items: [
      {
        id: 'toc-stale-closures',
        mistake: 'Stale closures in useEffect and event handlers',
        example: '`useEffect(() => { setInterval(() => console.log(count), 1000) }, [])` \u2014 count is always 0',
        fix: 'Prompt: "Include all referenced variables in the dependency array. Use refs for values that should not trigger re-renders."',
      },
      {
        id: 'toc-hooks-rules',
        mistake: 'Breaking the Rules of Hooks',
        example: '`if (condition) { useState(...) }` \u2014 hooks called conditionally or inside loops',
        fix: 'Specify: "All hooks must be called unconditionally at the top level of the component. No hooks inside conditions or loops."',
      },
      {
        id: 'toc-key-prop',
        mistake: 'Missing or incorrect key props in lists',
        example: '`items.map((item, i) => <Card key={i} />)` \u2014 index keys cause bugs on reorder or delete',
        fix: 'Prompt: "Use stable, unique IDs as keys. Never use array index as key when the list can be reordered, filtered, or modified."',
      },
      {
        id: 'toc-prop-drilling',
        mistake: 'Excessive prop drilling instead of composition or context',
        example: 'Passes theme, user, locale, and permissions through 6 levels of intermediate components',
        fix: 'In CLAUDE.md: "Use React Context for cross-cutting concerns. Prefer component composition (children) over deep prop chains."',
      },
    ],
  },
  {
    id: 'security',
    name: 'App Security Mistakes',
    icon: '\u{1F512}',
    severity: 'high',
    items: [
      {
        id: 'toc-xss-raw-html',
        mistake: 'XSS via unsanitized user content in dangerouslySetInnerHTML',
        example: '`<div dangerouslySetInnerHTML={{ __html: userComment }} />` \u2014 script injection',
        fix: 'Prompt: "Never render user-supplied HTML without sanitization. Use DOMPurify or a Markdown renderer with XSS protection."',
        deepDivePageId: 'sec-xss',
      },
      {
        id: 'toc-secrets-client',
        mistake: 'Exposing secrets in client-side code',
        example: '`const API_KEY = "sk-abc123"` hardcoded in a React component or `.env` without `VITE_` prefix check',
        fix: 'Specify: "All secrets must be server-side only. Client env vars must use the VITE_/NEXT_PUBLIC_ prefix convention. Never commit .env files."',
      },
      {
        id: 'toc-insecure-auth',
        mistake: 'Insecure authentication patterns',
        example: 'Stores JWT in `localStorage` (XSS-accessible), or checks auth only on the client without server validation',
        fix: 'Prompt: "Use httpOnly cookies for tokens. Validate auth server-side on every request. Never trust client-only auth checks."',
        deepDivePageId: 'sec-auth',
      },
      {
        id: 'toc-sql-nosql-injection',
        mistake: 'SQL/NoSQL injection via string concatenation',
        example: '`db.query(\\`SELECT * FROM users WHERE id = \\${req.params.id}\\`)` \u2014 no parameterization',
        fix: 'Specify: "Always use parameterized queries or an ORM. Never build queries with string concatenation or template literals."',
        deepDivePageId: 'sec-injection',
      },
    ],
  },
  {
    id: 'design',
    name: 'Design & UI Implementation',
    icon: '\u{1F4D0}',
    severity: 'medium',
    items: [
      {
        id: 'toc-responsive-breakpoints',
        mistake: 'Ignores responsive design \u2014 hardcoded widths and pixel values',
        example: '`style={{ width: 1200 }}` or fixed px layouts that break on mobile',
        fix: 'Prompt: "Use responsive units (rem, %, vw). Design mobile-first. Test at 320px, 768px, and 1280px breakpoints."',
      },
      {
        id: 'toc-accessibility-missing',
        mistake: 'Missing accessibility \u2014 no alt text, labels, or keyboard navigation',
        example: '`<img src={url} />`, `<button><Icon /></button>` with no `aria-label`, clickable divs instead of buttons',
        fix: 'Specify: "Follow WCAG 2.1 AA. All images need alt text. All interactive elements must be keyboard-accessible with visible focus styles."',
      },
      {
        id: 'toc-design-spec-drift',
        mistake: 'Drift from design specs \u2014 wrong spacing, colors, and typography',
        example: "Uses arbitrary `margin-top: 17px` instead of the design system's `16px` (`1rem`) spacing scale",
        fix: 'In CLAUDE.md: "Use the design system tokens. Spacing: multiples of 4px. Colors: only from the palette. Typography: only defined text styles."',
      },
      {
        id: 'toc-layout-z-index',
        mistake: 'Z-index wars and stacking context confusion',
        example: '`z-index: 99999` on a modal because a tooltip already has `z-index: 9999`',
        fix: 'Prompt: "Use a z-index scale defined in CLAUDE.md (e.g., dropdown: 10, modal: 20, tooltip: 30). Never use arbitrary large values."',
      },
    ],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS Mistakes',
    icon: '\u{1F4A8}',
    severity: 'medium',
    items: [
      {
        id: 'toc-tw-arbitrary-values',
        mistake: 'Overuse of arbitrary values instead of Tailwind scale',
        example: '`text-[13px] p-[7px] bg-[#1a1a2e]` \u2014 bypasses the design system entirely',
        fix: 'Prompt: "Use Tailwind\'s built-in scale values. Arbitrary values only when no built-in equivalent exists."',
      },
      {
        id: 'toc-tw-v3-v4-confusion',
        mistake: 'Mixing Tailwind v3 and v4 syntax',
        example: 'Uses `tailwind.config.js` (v3) in a v4 project, or `@apply` with v4 `@theme` syntax',
        fix: 'Specify the exact version in CLAUDE.md: "Tailwind CSS v4 \u2014 use CSS-first configuration with @theme, not tailwind.config.js."',
      },
      {
        id: 'toc-tw-dynamic-classes',
        mistake: "Dynamic class names that break Tailwind's static analysis",
        example: "`bg-${color}-500` \u2014 Tailwind can't detect this at build time, so the class is purged",
        fix: 'Prompt: "Never construct Tailwind class names dynamically. Use a mapping object: const colorMap = { red: \'bg-red-500\', blue: \'bg-blue-500\' }."',
      },
      {
        id: 'toc-tw-dark-mode',
        mistake: 'Forgetting dark mode variants for new components',
        example: 'Adds `bg-white text-gray-900` but no `dark:bg-slate-800 dark:text-slate-100` \u2014 invisible in dark mode',
        fix: 'In CLAUDE.md: "Every background, text, and border color class must have a corresponding dark: variant. Standard dark palette: bg-slate-800, text-slate-200, border-slate-700."',
      },
    ],
  },
  {
    id: 'csrf',
    name: 'CSRF Vulnerabilities',
    icon: '\u{1F3AD}',
    severity: 'high',
    items: [
      {
        id: 'toc-csrf-no-token',
        mistake: 'Form handlers and API routes without CSRF protection',
        example: 'POST `/api/transfer` relies solely on session cookies for auth \u2014 attackers can forge the request from any origin',
        fix: 'Prompt: "Add CSRF tokens to all state-changing forms and API routes. Use crypto.randomUUID() per session and validate on every POST/PUT/DELETE."',
        deepDivePageId: 'sec-csrf',
      },
      {
        id: 'toc-csrf-samesite',
        mistake: 'Missing SameSite attribute on session cookies',
        example: '`res.cookie("session", token)` without `sameSite` \u2014 browser sends cookie on cross-origin requests',
        fix: 'Specify: "All session cookies must set sameSite: \'Strict\' or \'Lax\', httpOnly: true, secure: true."',
        deepDivePageId: 'sec-csrf',
      },
      {
        id: 'toc-csrf-get-mutations',
        mistake: 'GET routes that modify data',
        example: '`app.get("/delete-user/:id", deleteUser)` \u2014 trivially exploitable via an `<img>` tag',
        fix: 'Prompt: "Never use GET for state changes. All mutations must use POST, PUT, or DELETE."',
        deepDivePageId: 'sec-csrf',
      },
    ],
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Risks',
    icon: '\u{1F4E6}',
    severity: 'high',
    items: [
      {
        id: 'toc-supply-unvetted-packages',
        mistake: 'Suggesting unvetted or typosquatted packages',
        example: 'AI recommends `loadash` (typo) or a package with 12 weekly downloads for a critical function',
        fix: 'Prompt: "Only suggest well-known packages with >1k weekly downloads. Always verify the exact package name on npmjs.com."',
        deepDivePageId: 'sec-supply',
      },
      {
        id: 'toc-supply-version-ranges',
        mistake: 'Using permissive version ranges in production dependencies',
        example: '`"some-lib": "^2.1.0"` allows auto-updates to a potentially compromised minor/patch version',
        fix: 'Specify: "Pin production dependencies to exact versions. Use a lockfile and commit it."',
        deepDivePageId: 'sec-supply',
      },
      {
        id: 'toc-supply-no-audit',
        mistake: 'No dependency auditing in CI pipeline',
        example: 'Known vulnerabilities in transitive deps go undetected because no audit step runs on PRs',
        fix: 'Prompt: "Add pnpm audit --audit-level=high to CI. Use Socket.dev or Snyk for supply chain risk detection."',
        deepDivePageId: 'sec-supply',
      },
    ],
  },
  {
    id: 'prompt-injection',
    name: 'Prompt Injection',
    icon: '\u{1F9E0}',
    severity: 'high',
    items: [
      {
        id: 'toc-prompt-injection-direct-exec',
        mistake: 'Executing LLM output without validation',
        example: '`await executeAction(model.generate(userInput))` \u2014 model output directly triggers database or API operations',
        fix: 'Prompt: "Treat LLM output as untrusted. Validate against an allowlist and require confirmation for sensitive actions."',
        deepDivePageId: 'sec-prompt-injection',
      },
      {
        id: 'toc-prompt-injection-flat-prompt',
        mistake: 'Mixing user input and system instructions without delimiters',
        example: '`"Summarize: " + userText` \u2014 user can inject "ignore previous instructions" to override system prompt',
        fix: 'Specify: "Wrap user content in clear delimiters (<user_document>). Instruct the model to treat delimited content as data, not instructions."',
        deepDivePageId: 'sec-prompt-injection',
      },
      {
        id: 'toc-prompt-injection-overprivileged',
        mistake: 'Giving LLM agents excessive tool permissions',
        example: 'A summarization assistant has access to email-sending and database-write tools',
        fix: 'Prompt: "Apply least-privilege to model tool access. A summarizer needs read-only doc access, not email or database write."',
        deepDivePageId: 'sec-prompt-injection',
      },
    ],
  },
]

// ── Testing best practices ───────────────────────────────────────────

export const TESTING_MISTAKES: TestingMistake[] = [
  {
    context: 'e2e',
    mistake: 'Hardcoded waits instead of proper assertions',
    example: '`await page.waitForTimeout(3000)` instead of `await page.waitForSelector("[data-ready]")`',
    fix: 'Always wait for a specific DOM state: "Use waitForSelector or expect(locator).toBeVisible(), never arbitrary timeouts"',
  },
  {
    context: 'e2e',
    mistake: 'Tests depend on execution order or shared state',
    example: 'Test B assumes Test A already created a user account \u2014 fails when run in isolation',
    fix: 'Prompt: "Each test must set up its own data and tear it down. No test should depend on another."',
  },
  {
    context: 'e2e',
    mistake: 'Selectors coupled to implementation details',
    example: '`page.click(".MuiButton-root > span:nth-child(2)")` breaks on any UI refactor',
    fix: 'Require data-testid attributes: "Use data-testid selectors for all interactive elements"',
  },
  {
    context: 'e2e',
    mistake: 'Missing network request handling',
    example: 'Test flakes because it clicks submit before the API call completes',
    fix: 'Intercept network calls: "Use page.waitForResponse() or route.fulfill() to control API timing"',
  },
  {
    context: 'unit',
    mistake: 'Testing implementation instead of behavior',
    example: '`expect(spy).toHaveBeenCalledWith(x)` instead of checking the actual output',
    fix: 'Focus on inputs and outputs: "Test what the function returns or renders, not how it works internally"',
  },
  {
    context: 'unit',
    mistake: 'Snapshot tests for everything',
    example: '`toMatchSnapshot()` on a complex component \u2014 any change triggers a meaningless diff',
    fix: 'Use snapshots sparingly: "Only snapshot stable, small structures. Prefer explicit assertions."',
  },
  {
    context: 'unit',
    mistake: 'Mocking too much or too little',
    example: 'Mocks every dependency so the test passes even if the real integration is broken',
    fix: 'Mock at boundaries: "Mock external services and APIs. Don\'t mock the module under test."',
  },
  {
    context: 'unit',
    mistake: 'Missing async error handling tests',
    example: 'Only tests the happy path of a `fetch` call, never the rejection case',
    fix: 'Always test failure paths: "Include tests for rejected promises, thrown errors, and timeout scenarios"',
  },
  {
    context: 'unit',
    mistake: 'Tests pass with wrong assertions due to .not or negation errors',
    example: '`expect(result).not.toBeNull()` passes even when result is `undefined`',
    fix: 'Use precise matchers: "Prefer toBe, toEqual, or toStrictEqual over negated assertions"',
  },
  {
    context: 'e2e',
    mistake: 'Not cleaning up test artifacts',
    example: 'Test creates database records or files that pollute other test runs',
    fix: 'Use beforeEach/afterEach hooks: "Set up a clean test environment and tear it down after each test"',
  },
]
