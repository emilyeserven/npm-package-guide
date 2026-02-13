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
        example: 'for (let i = 0; i <= arr.length) \u2014 goes one past the end',
        fix: 'Explicitly state boundary conditions: "Use zero-indexed, exclusive upper bound"',
      },
      {
        id: 'toc-wrong-boolean',
        mistake: 'Wrong boolean logic / inverted conditions',
        example: 'if (!isValid || hasPermission) instead of if (isValid && hasPermission)',
        fix: 'Describe the desired behavior in plain English AND provide a truth table in your prompt',
      },
      {
        id: 'toc-edge-case-blindness',
        mistake: 'Edge case blindness (empty arrays, null, 0, NaN)',
        example: "Doesn't handle empty input \u2192 crashes on .length or .map()",
        fix: 'Prompt: "Handle edge cases including empty input, null, undefined, 0, and NaN"',
      },
      {
        id: 'toc-math-formula',
        mistake: 'Math formula errors',
        example: 'Averages calculated as (a+b+1)//2 instead of (a+b)/2',
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
        example: "Invents a useTheme hook from a package that doesn't exist on npm",
        fix: 'Specify exact libraries: "Use @shadcn/ui v2.x and TanStack Query v5"',
      },
      {
        id: 'toc-deprecated-apis',
        mistake: 'Uses deprecated or renamed APIs',
        example: 'componentWillMount(), findDOMNode(), or old Next.js page router patterns',
        fix: 'Include version constraints: "Use React 19 APIs only, no class components"',
      },
      {
        id: 'toc-cross-language',
        mistake: 'Cross-language API confusion',
        example: "Uses Python's round() behavior when writing JavaScript, or Java's .equals() in TS",
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
        example: 'Uses dangerouslySetInnerHTML without sanitizing, or builds SQL with string concat',
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
        example: 'Mixes camelCase and snake_case in the same file',
        fix: 'Specify: "Use camelCase for JS/TS, kebab-case for CSS, PascalCase for components"',
      },
      {
        id: 'toc-unnecessary-comments',
        mistake: 'Adds unnecessary comments or over-documents',
        example: '// This function adds two numbers\\nfunction add(a, b) { return a + b; }',
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
]

// ── Testing best practices ───────────────────────────────────────────

export const TESTING_MISTAKES: TestingMistake[] = [
  {
    context: 'e2e',
    mistake: 'Hardcoded waits instead of proper assertions',
    example: 'await page.waitForTimeout(3000) instead of await page.waitForSelector("[data-ready]")',
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
    example: 'page.click(".MuiButton-root > span:nth-child(2)") breaks on any UI refactor',
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
    example: 'expect(spy).toHaveBeenCalledWith(x) instead of checking the actual output',
    fix: 'Focus on inputs and outputs: "Test what the function returns or renders, not how it works internally"',
  },
  {
    context: 'unit',
    mistake: 'Snapshot tests for everything',
    example: 'toMatchSnapshot() on a complex component \u2014 any change triggers a meaningless diff',
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
    example: 'Only tests the happy path of a fetch call, never the rejection case',
    fix: 'Always test failure paths: "Include tests for rejected promises, thrown errors, and timeout scenarios"',
  },
  {
    context: 'unit',
    mistake: 'Tests pass with wrong assertions due to .not or negation errors',
    example: 'expect(result).not.toBeNull() passes even when result is undefined',
    fix: 'Use precise matchers: "Prefer toBe, toEqual, or toStrictEqual over negated assertions"',
  },
  {
    context: 'e2e',
    mistake: 'Not cleaning up test artifacts',
    example: 'Test creates database records or files that pollute other test runs',
    fix: 'Use beforeEach/afterEach hooks: "Set up a clean test environment and tear it down after each test"',
  },
]
