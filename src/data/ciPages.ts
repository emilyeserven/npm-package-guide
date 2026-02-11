import { cmd } from '../helpers/cmd'
import { fnRef } from '../helpers/fnRef'
import type { SectionLink } from '../helpers/renderFootnotes'

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

interface CiTestSection {
  heading: string
  text: string
  yaml: string
  tip: string
}

interface CiAiPrompt {
  label: string
  prompt: string
}

interface CiMaintenanceTool {
  name: string
  emoji: string
  desc: string
  why: string
  yaml: string
}

export interface CiPage {
  id: string
  title: string
  intro: string
  links?: SectionLink[]
  isOverview?: boolean
  explainerTitle?: string
  explainerBody?: string
  exampleWorkflow?: string
  isTestingPage?: boolean
  unitSection?: CiTestSection
  e2eSection?: CiTestSection
  storybookNote?: string
  coverageText?: string
  goodTests?: string[]
  aiPrompts?: CiAiPrompt[]
  isMaintenancePage?: boolean
  tools?: CiMaintenanceTool[]
  yaml?: string
  tip?: string
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ciOverviewIntro = "A CI (Continuous Integration)" + fnRef(2) + " pipeline runs automated checks every time you push code or open a pull request. In the JavaScript ecosystem, GitHub Actions" + fnRef(1) + " is the most common CI tool — it runs your checks in the cloud so bugs, broken builds, and style issues are caught before code is merged. Think of it like a gatekeeper that runs your test suite, linting, and build process automatically, just like you might have Jenkins or GitLab CI running tests for a backend project.<br><br>For <strong>web apps</strong>, you test user-facing behavior: does the button work? Does the page load correctly? For <strong>npm packages</strong>, you test your public API: do exported functions return correct values? Do edge cases work? Package tests should import from your built output (or at least your public exports), not internal files — this catches issues consumers would actually hit."

export const ciPages: CiPage[] = [
  {
    id: "ci-overview",
    title: "🔄 CI Overview",
    intro: ciOverviewIntro,
    isOverview: true,
    explainerTitle: "CI pipelines — a backend analogy",
    explainerBody: "If you've used Jenkins, GitLab CI, or CircleCI for backend projects, GitHub Actions works the same way — YAML config, runs on push/PR, runs in containers. The main difference in JS land is that 'build' is a required step (TypeScript needs compilation), and linting is more critical because JavaScript is dynamically typed — the linter catches what a compiler would catch in Go or Java. The pipeline order (lint → build → unit tests → E2E) mirrors what you'd do in a backend CI: static analysis first, then compilation, then fast tests, then slow integration tests.",
    exampleWorkflow: `<span class="comment"># .github/workflows/ci.yml</span>
<span class="key">name</span>: CI
<span class="key">on</span>: [push, pull_request]

<span class="key">jobs</span>:
  <span class="key">check</span>:
    <span class="key">runs-on</span>: ubuntu-latest
    <span class="key">steps</span>:
      - <span class="key">uses</span>: actions/checkout@v4
      - <span class="key">uses</span>: actions/setup-node@v4
        <span class="key">with</span>:
          <span class="key">node-version</span>: <span class="string">20</span>

      - <span class="key">name</span>: Install
        <span class="key">run</span>: <span class="string">${cmd("npm ci", "pnpm install --frozen-lockfile")}</span>

      - <span class="key">name</span>: Lint
        <span class="key">run</span>: <span class="string">${cmd("npx eslint . --max-warnings 0", "pnpm eslint . --max-warnings 0")}</span>

      - <span class="key">name</span>: Build
        <span class="key">run</span>: <span class="string">${cmd("npm run build", "pnpm build")}</span>

      - <span class="key">name</span>: Unit Tests
        <span class="key">run</span>: <span class="string">${cmd("npm test", "pnpm test")}</span>

      - <span class="key">name</span>: E2E Tests
        <span class="key">run</span>: <span class="string">${cmd("npx playwright test", "pnpm playwright test")}</span>`,
    links: [
      { label: "GitHub Actions — Quickstart", url: "https://docs.github.com/en/actions/quickstart", source: "GitHub" },
      { label: "Continuous integration", url: "https://en.wikipedia.org/wiki/Continuous_integration", source: "Wikipedia", note: "The practice of automatically building and testing code every time changes are pushed" }
    ]
  },
  {
    id: "ci-linting",
    title: "🧹 Linting & Formatting",
    intro: "A <strong>linter</strong> (ESLint" + fnRef(1) + ") and a <strong>formatter</strong> (Prettier" + fnRef(2) + ") serve different purposes, and understanding the difference matters." +
      "<h2 class='section-subheading' id='toc-linting'>Linting (ESLint)</h4>" +
      "ESLint statically analyzes" + fnRef(5) + " your code for bugs, bad patterns, and code quality issues like unused variables, missing return types, or potential runtime errors. It doesn't run your code — it reads it and flags problems." +
      "<h2 class='section-subheading' id='toc-formatting'>Formatting (Prettier)</h4>" +
      "Prettier is a formatter — it only cares about how code <em>looks</em>: indentation, line length, quote style, trailing commas. It doesn't catch bugs." +
      "<h2 class='section-subheading' id='toc-eslint-stylistic'>eslint-stylistic — an alternative</h4>" +
      "Historically, most projects used both tools together (ESLint for logic, Prettier for style). But there's a newer alternative: <strong>eslint-stylistic</strong>" + fnRef(3) + " — an ESLint plugin that handles formatting rules directly inside ESLint, so you can drop Prettier entirely and run a single tool for both code quality and style. This simplifies your toolchain and avoids the occasional ESLint-vs-Prettier config conflicts." + fnRef(4) +
      "<h2 class='section-subheading' id='toc-ide'>IDE Integration</h4>" +
      "Most editors (VS Code, WebStorm, Cursor) can hook into your linter and formatter to show errors inline and auto-fix on save. This means formatting and many lint fixes happen automatically as you type — you almost never need to think about style manually. Set up \"format on save\" and ESLint auto-fix in your editor and your code stays clean without any effort.",
    yaml: "- name: Lint\n  run: " + cmd("npx eslint . --max-warnings 0", "pnpm eslint . --max-warnings 0"),
    tip: "Use --max-warnings 0 to fail the build on any warning. This keeps your codebase clean over time instead of slowly accumulating 'harmless' warnings that hide real issues. Your CI should always run the same lint check that your IDE runs locally — no surprises.",
    links: [
      { label: "ESLint — Getting Started", url: "https://eslint.org/docs/latest/use/getting-started", source: "ESLint", note: "Official setup guide for ESLint" },
      { label: "Prettier — Install", url: "https://prettier.io/docs/en/install", source: "Prettier", note: "The traditional code formatter for JS/TS projects" },
      { label: "eslint-stylistic — Formatting with ESLint", url: "https://eslint.style/", source: "eslint-stylistic", note: "Drop-in replacement for Prettier using ESLint rules" },
      { label: "Why I don't use Prettier (Anthony Fu)", url: "https://antfu.me/posts/why-not-prettier", source: "Blog", note: "Case for eslint-stylistic over Prettier from a core Vite maintainer" },
      { label: "Static program analysis", url: "https://en.wikipedia.org/wiki/Static_program_analysis", source: "Wikipedia", note: "Analyzing source code without running it — catching bugs at 'compile time' rather than at runtime" }
    ]
  },
  {
    id: "ci-build",
    title: "🔨 Build Verification",
    intro: "This step compiles your TypeScript and bundles your package to verify the build succeeds. A passing build means your code is syntactically valid, all imports resolve, and the output files (JS + .d.ts types) are generated correctly. For packages, this is critical — if the build breaks, you'd publish a broken package to npm.<br><br><button class='inline-nav-pill' data-nav='build'>📎 See also: ⚙️ Build & Output — bundlers, ESM vs CJS, and build tools</button>",
    yaml: "- name: Build\n  run: " + cmd("npm run build", "pnpm build"),
    tip: "Run the build AFTER linting — there's no point compiling code that has lint errors. This ordering catches issues faster and saves CI minutes.",
    links: []
  },
  {
    id: "ci-testing",
    title: "🧪 Testing",
    intro: "Testing in the JS ecosystem falls into several categories, and understanding when to use each is key to a good test suite.",
    isTestingPage: true,
    unitSection: {
      heading: "🧪 Unit Tests",
      text: "Unit tests verify that individual functions, components, or modules work correctly <strong>in isolation</strong>. They're fast (milliseconds each), don't need a browser or server, and give you confidence that refactoring hasn't broken existing behavior. Common tools: <strong>Vitest</strong>" + fnRef(1) + " (fast, modern, recommended) and <strong>Jest</strong> (older but widespread). Think of them like pytest or JUnit tests — testing small units of logic.",
      yaml: "- name: Unit Tests\n  run: " + cmd("npm test", "pnpm test"),
      tip: "For packages, test your PUBLIC API — the functions consumers actually import. Internal implementation details can change freely as long as the public interface works correctly."
    },
    e2eSection: {
      heading: "🌐 End-to-End (E2E) Tests",
      text: "E2E tests verify that your code works <strong>in a real environment</strong> — an actual browser for web apps, or a real Node.js project for packages. They're slower but catch integration issues that unit tests miss: CSS rendering bugs, browser compatibility, import resolution in consumer projects. Common tools: <strong>Playwright</strong>" + fnRef(2) + " (recommended) and <strong>Cypress</strong>. For packages, E2E often means installing your built package in a test project and verifying imports, types, and functionality work end-to-end.",
      yaml: "- name: E2E Tests\n  run: " + cmd("npx playwright test", "pnpm playwright test"),
      tip: "Run E2E tests last in your CI pipeline — they're the slowest. If linting, build, or unit tests fail, there's no point running expensive browser tests."
    },
    storybookNote: "📖 <strong>Storybook component tests</strong> are a third option worth considering. Storybook can run your stories as tests — each story becomes a test case that verifies a component renders correctly with specific props. This sits between unit tests and E2E tests: it renders real components (like E2E) but runs fast and in isolation (like unit tests). You might choose <strong>unit tests</strong> when testing pure logic, utility functions, hooks, or non-visual behavior. Choose <strong>component tests</strong> (via Storybook) when testing visual rendering, prop variations, interaction flows, and accessibility — especially if you're already writing stories for documentation. The two approaches complement each other: unit tests for logic, component tests for UI. See the <button class='inline-nav-link' data-nav='storybook'>📖 Storybook</button> section for more.",
    coverageText: "<strong>Test coverage</strong>" + fnRef(5) + " measures what percentage of your code is executed by your tests. A coverage report shows which lines, branches, and functions have been tested. High coverage (80%+) gives confidence that most code paths are exercised. But don't blindly chase 100% — some code (error handlers, edge cases in generated code, simple pass-through functions) isn't worth testing. Focus coverage on your public API, complex business logic, and code paths where bugs would be most damaging. Vitest and Jest both have built-in coverage reporting via <code>--coverage</code>.",
    goodTests: [
      "<strong>Independent</strong> — no shared state between tests. Each test should set up its own data and clean up after itself.",
      "<strong>Deterministic</strong> — same result every time. Avoid dependencies on dates, random values, or network calls without mocking.",
      "<strong>Fast</strong> — especially unit tests. If your test suite takes minutes, developers stop running it.",
      "<strong>Readable</strong>" + fnRef(3) + " — someone new should understand what's being tested. Name tests clearly: <code>it('returns empty array when no items match filter')</code> is better than <code>it('test filter')</code>.",
      "<strong>Behavior-focused</strong>" + fnRef(4) + " — test what the code does, not how it does it. If you refactor internals, your tests should still pass."
    ],
    aiPrompts: [
      { label: "Unit test prompt for a utility function", prompt: "Write unit tests for this function using Vitest. Cover: normal inputs, edge cases (empty arrays, null values, boundary numbers), and error cases. Each test should have a descriptive name explaining the expected behavior. Use describe/it blocks for organization." },
      { label: "Unit test prompt for a React component", prompt: "Write unit tests for this React component using Vitest and React Testing Library. Test: rendering with default props, rendering with each prop variation, user interactions (clicks, input changes), conditional rendering, and accessibility (correct ARIA roles). Mock any API calls or context providers." },
      { label: "E2E test prompt for a web page", prompt: "Write Playwright E2E tests for this page. Test: page loads without errors, key elements are visible, user can complete the main workflow (fill form → submit → see success), error states are handled gracefully, and the page works at mobile viewport widths." },
      { label: "E2E test prompt for an npm package", prompt: "Write an E2E test that installs this package in a fresh project and verifies: the package installs without errors, named exports can be imported, TypeScript types resolve correctly (tsc --noEmit passes), the main function returns expected output, and tree-shaking works (unused exports aren't in the bundle)." }
    ],
    links: [
      { label: "Vitest — Getting Started", url: "https://vitest.dev/guide/", source: "Vitest", note: "The recommended modern test runner for TypeScript projects" },
      { label: "Playwright — Getting Started", url: "https://playwright.dev/docs/intro", source: "Playwright", note: "Cross-browser E2E testing framework from Microsoft" },
      { label: "Testing Library — Guiding Principles", url: "https://testing-library.com/docs/guiding-principles", source: "Testing Library", note: "Philosophy behind testing user-facing behavior, not implementation" },
      { label: "Kent C. Dodds — Write tests. Not too many.", url: "https://kentcdodds.com/blog/write-tests", source: "Blog", note: "Influential essay on testing strategy and the testing trophy" },
      { label: "Vitest — Coverage", url: "https://vitest.dev/guide/coverage", source: "Vitest", note: "Built-in coverage reporting with v8 or Istanbul providers" }
    ]
  },
  {
    id: "ci-repo-maintenance",
    title: "🧹 Repo Maintenance",
    intro: "As projects grow, dependencies drift, unused code accumulates, and package.json files get out of sync — especially in monorepos. These repo maintenance tools catch problems that linting and testing miss. They're not required for small projects, but become essential as codebases scale.",
    isMaintenancePage: true,
    tools: [
      {
        name: "knip",
        emoji: "✂️",
        desc: "Knip" + fnRef(1) + " finds <strong>unused files, dependencies, and exports</strong> in your project. It scans your codebase and tells you which packages in your package.json aren't actually imported anywhere, which exported functions are never used, and which entire files are dead code" + fnRef(3) + ". Think of it like a tree-shaker for your repo — it identifies what can be safely removed.",
        why: "Unused dependencies slow down installs, bloat your bundle, and create security surface area. Unused exports in packages confuse consumers and increase maintenance burden. Knip catches all of this automatically.",
        yaml: "- name: Check unused code\n  run: " + cmd("npx knip", "pnpm knip"),
      },
      {
        name: "syncpack",
        emoji: "🔗",
        desc: "Syncpack" + fnRef(2) + " ensures <strong>consistent dependency versions</strong> across all packages in a monorepo. If one package uses React 18.2.0 and another uses React 18.3.0, syncpack flags the mismatch. It can also enforce version ranges, banned dependencies, and consistent formatting of package.json files.",
        why: "Version mismatches in monorepos cause subtle bugs: one package tests against a different version than another, leading to 'works on my machine' problems. Syncpack catches these before they hit production.",
        yaml: "- name: Check dependency versions\n  run: " + cmd("npx syncpack lint", "pnpm syncpack lint"),
      }
    ],
    tip: "Add both tools to your CI pipeline as a separate step. They're fast (seconds, not minutes) and catch issues that are tedious to find manually. For monorepos, these tools are practically essential.",
    links: [
      { label: "knip — Find unused files, dependencies and exports", url: "https://knip.dev/", source: "knip" },
      { label: "syncpack — Consistent dependency versions", url: "https://jamiemason.github.io/syncpack/", source: "syncpack" },
      { label: "Dead code", url: "https://en.wikipedia.org/wiki/Dead_code", source: "Wikipedia", note: "Code that is never executed or whose results are never used — removing it reduces maintenance burden and bundle size" }
    ]
  }
]

export const ciPageIds = ciPages.map(p => p.id)
