import type { RegistryLink } from './index'

export const testingLinks: RegistryLink[] = [
  // ─── Testing Guide ─────────────────────────────────────────────────
  {
    id: "jsdom-home",
    url: "https://github.com/jsdom/jsdom",
    label: "jsdom — JavaScript DOM implementation",
    source: "GitHub",
    desc: "Pure-JavaScript DOM implementation used by Vitest and Jest to simulate a browser environment in Node.js",
    tags: ["repo", "free", "testing", "guide:testing"],
  },
  {
    id: "vitest-expect",
    url: "https://vitest.dev/api/expect.html",
    label: "Vitest — Expect API",
    source: "Vitest",
    desc: "Assertion methods for writing test expectations in Vitest (toBe, toEqual, toThrow, etc.)",
    tags: ["docs", "free", "testing", "guide:testing"],
  },
  {
    id: "playwright-best-practices",
    url: "https://playwright.dev/docs/best-practices",
    label: "Playwright — Best Practices",
    source: "Playwright",
    desc: "Recommended patterns for writing reliable E2E tests with Playwright",
    tags: ["docs", "free", "testing", "guide:testing"],
  },
  {
    id: "testing-library-queries",
    url: "https://testing-library.com/docs/queries/about/",
    label: "Testing Library — Queries",
    source: "Testing Library",
    desc: "Reference for Testing Library query methods (getBy, findBy, queryBy) used to select DOM elements in component tests",
    tags: ["docs", "free", "testing", "guide:testing"],
  },
  {
    id: "vitest-mocking",
    url: "https://vitest.dev/guide/mocking",
    label: "Vitest — Mocking",
    source: "Vitest",
    desc: "How to mock modules, functions, and timers in Vitest for isolated unit tests",
    tags: ["docs", "free", "testing", "guide:testing", "guide:wp-agents"],
  },
]
