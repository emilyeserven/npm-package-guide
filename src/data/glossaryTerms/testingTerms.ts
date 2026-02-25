import type { GlossaryCategory } from './types'

export const testingGlossary: GlossaryCategory[] = [
  {
    category: "Testing Fundamentals",
    terms: [
      {
        term: "Unit Test",
        definition: "A test that verifies a single function, hook, or module in complete isolation. All external dependencies are mocked or stubbed. Unit tests are the fastest and cheapest tests, forming the wide base of the testing pyramid.",
        linkId: "vitest-getting-started",
        linkIds: ['jest-getting-started'],
        sectionId: "test-unit",
        guides: ['testing', 'npm-package'],
      },
      {
        term: "Component Test",
        definition: "A test that renders a React component in a simulated DOM and asserts on what the user sees and can interact with. Uses libraries like React Testing Library to query elements by role, label, or text content.",
        linkId: "testing-library-react-intro",
        linkIds: ['testing-library-queries'],
        sectionId: "test-component"
      },
      {
        term: "End-to-End (E2E) Test",
        definition: "A test that drives a real browser through complete user workflows, testing the full stack (frontend, API, database). E2E tests are the slowest but most realistic tests.",
        linkId: "playwright-home",
        linkIds: ['cypress-home', 'playwright-best-practices'],
        sectionId: "test-e2e"
      },
      {
        term: "Testing Pyramid",
        definition: "A model for structuring test suites: many fast unit tests at the base, fewer component tests in the middle, and a small number of slow E2E tests at the top. The goal is maximum confidence with minimum execution time.",
        linkId: "martinfowler-test-pyramid",
        sectionId: "test-overview"
      },
      {
        term: "Test Runner",
        definition: "A tool that discovers, executes, and reports on your test files. Vitest and Jest are the most popular JavaScript test runners. They handle file watching, parallel execution, and assertion reporting.",
        linkId: "vitest-home",
        sectionId: "test-tools"
      },
      {
        term: "Mocking",
        definition: "Replacing real dependencies with controlled substitutes during testing. Mocks let you isolate the code under test, control return values, and verify that functions were called with expected arguments.",
        linkId: "vitest-mocking",
        sectionId: "test-unit",
        guides: ['testing', 'wp-agents'],
      },
      {
        term: "Code Coverage",
        definition: "A metric showing what percentage of your code is executed during tests. Measured by lines, branches, functions, or statements. High coverage does not guarantee good tests, but low coverage reveals gaps.",
        linkId: "vitest-coverage",
        sectionId: "test-best-practices"
      },
      {
        term: "Test Flakiness",
        definition: "When a test sometimes passes and sometimes fails without any code change. Common causes include race conditions, time-dependent logic, shared state between tests, and brittle DOM selectors.",
        linkId: "playwright-getting-started",
        sectionId: "test-e2e"
      },
      {
        term: "Assertion",
        definition: "A statement in a test that verifies an expected condition — e.g., <code>expect(result).toBe(42)</code>. If the assertion fails, the test fails. Good tests use assertions that describe the expected behavior, not implementation details.",
        linkId: "vitest-expect",
        sectionId: "test-unit"
      },
      {
        term: "Test Double",
        definition: "An umbrella term for any substitute used in place of a real dependency during testing. Includes mocks (verify calls), stubs (return fixed data), spies (record calls without replacing behavior), and fakes (simplified implementations).",
        linkId: "vitest-mocking",
        sectionId: "test-unit"
      },
      {
        term: "jsdom",
        definition: "A pure-JavaScript implementation of the browser DOM that runs in Node.js. Test runners like Vitest and Jest use jsdom to simulate a browser environment so component tests can render and query elements without launching a real browser.",
        linkId: "jsdom-home",
        sectionId: "test-component"
      },
      {
        term: "Snapshot Testing",
        definition: "A testing technique where the test runner saves a component's rendered output to a file, then compares future renders against that saved snapshot. Catches unexpected changes but can produce brittle tests if overused.",
        linkId: "vitest-getting-started",
        sectionId: "test-component"
      },
    ]
  },
]
