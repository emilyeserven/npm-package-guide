/* ───────────────────────── TYPES ───────────────────────── */

export type TestType = 'unit' | 'component' | 'e2e'

export interface PyramidLevel {
  id: TestType
  label: string
  subtitle: string
  pageId: string
  color: string
  accent: string
  darkAccent: string
  widthPct: string
  description: string
  whatToTest: string[]
  whatNotToTest: string[]
  codeExample: string
  codeComment: string
}

export interface ComparisonRow {
  attribute: string
  unit: { text: string; badge?: 'fast' | 'med' | 'slow' }
  component: { text: string; badge?: 'fast' | 'med' | 'slow' }
  e2e: { text: string; badge?: 'fast' | 'med' | 'slow' }
}

export interface PracticeCard {
  title: string
  description: string
  type: 'do' | 'dont'
}

export interface ChecklistItem {
  id: number
  label: string
  detail: string
}

export interface TestTool {
  id: string
  name: string
  description: string
  tags: TestType[]
}

/* ───────────────────────── PYRAMID LEVELS ───────────────────────── */

export const PYRAMID_LEVELS: PyramidLevel[] = [
  {
    id: 'e2e',
    label: 'E2E Tests',
    subtitle: 'Few, slow, high confidence',
    pageId: 'test-e2e',
    color: '#8b5cf6',
    accent: '#c4b5fd22',
    darkAccent: '#c4b5fd18',
    widthPct: '40%',
    description: 'Drives a **real browser** through complete user workflows — login, navigate, fill forms, assert outcomes. Tests the full stack: frontend \u2194 API \u2194 database.',
    whatToTest: [
      'Critical user paths (signup, checkout, CRUD flows)',
      'Cross-page navigation',
      'Auth flows and permissions',
      'Key happy paths',
    ],
    whatNotToTest: [
      'Every edge case (use unit tests)',
      'Visual styling',
      'Error states better covered at lower levels',
      "Third-party widgets you don't own",
    ],
    codeExample: `import { test, expect } from '@playwright/test';

test('user can create a new project', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'New Project' }).click();
  await page.getByLabel('Project name').fill('My Test Project');
  await page.getByRole('button', { name: 'Create' }).click();

  // Assert redirect and project appears in list
  await expect(page).toHaveURL(/\\/projects\\/[\\w-]+/);
  await expect(page.getByText('My Test Project')).toBeVisible();
});`,
    codeComment: 'dashboard.spec.ts',
  },
  {
    id: 'component',
    label: 'Component Tests',
    subtitle: 'Medium count & speed',
    pageId: 'test-component',
    color: '#38bdf8',
    accent: '#7dd3fc22',
    darkAccent: '#7dd3fc18',
    widthPct: '62%',
    description: 'Renders a single component (or small tree) and asserts on its **rendered output and behavior** — what the user sees and can interact with, not internal state.',
    whatToTest: [
      'Rendered text and elements',
      'User interactions (click, type)',
      'Conditional rendering',
      'Callback invocations',
      'Accessible roles & labels',
    ],
    whatNotToTest: [
      'Snapshot tests of large trees',
      'Internal state variables directly',
      'CSS class names',
      'Component method calls',
    ],
    codeExample: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

it('calls onSearch when user types and presses Enter', async () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);

  const input = screen.getByRole('searchbox');
  await userEvent.type(input, 'testing{Enter}');
  expect(onSearch).toHaveBeenCalledWith('testing');
});

it('shows clear button only when input has value', async () => {
  render(<SearchBar onSearch={jest.fn()} />);
  expect(screen.queryByRole('button', { name: /clear/i }))
    .not.toBeInTheDocument();

  await userEvent.type(screen.getByRole('searchbox'), 'hi');
  expect(screen.getByRole('button', { name: /clear/i }))
    .toBeInTheDocument();
});`,
    codeComment: 'SearchBar.test.tsx',
  },
  {
    id: 'unit',
    label: 'Unit Tests',
    subtitle: 'Many, fast, focused',
    pageId: 'test-unit',
    color: '#6ee7b7',
    accent: '#6ee7b722',
    darkAccent: '#6ee7b718',
    widthPct: '85%',
    description: 'Tests a single function, method, or module **in isolation**. Dependencies are mocked or stubbed so you\'re only verifying one thing at a time.',
    whatToTest: [
      'Pure functions and utility helpers',
      'Data transformers',
      'Validation logic',
      'Custom hooks and reducers',
      'State machines',
    ],
    whatNotToTest: [
      'Implementation details',
      'Private methods',
      'Third-party library internals',
      'Simple getters/setters with no logic',
    ],
    codeExample: `import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats USD with two decimals', () => {
    expect(formatCurrency(1234.5, 'USD')).toBe('$1,234.50');
  });

  it('returns $0.00 for zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });

  it('handles negative values', () => {
    expect(formatCurrency(-50, 'USD')).toBe('-$50.00');
  });
});`,
    codeComment: 'formatCurrency.test.ts',
  },
]

/* ───────────────────────── COMPARISON TABLE ───────────────────────── */

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    attribute: 'Speed',
    unit: { text: '~1\u20135 ms', badge: 'fast' },
    component: { text: '~50\u2013200 ms', badge: 'med' },
    e2e: { text: '~2\u201330 s', badge: 'slow' },
  },
  {
    attribute: 'Scope',
    unit: { text: 'Single function' },
    component: { text: '1 component tree' },
    e2e: { text: 'Full application' },
  },
  {
    attribute: 'Dependencies',
    unit: { text: 'All mocked' },
    component: { text: 'Mostly mocked' },
    e2e: { text: 'Real (or staged)' },
  },
  {
    attribute: 'Flakiness',
    unit: { text: 'Very low', badge: 'fast' },
    component: { text: 'Low', badge: 'med' },
    e2e: { text: 'Higher', badge: 'slow' },
  },
  {
    attribute: 'Best ratio',
    unit: { text: '~70% of tests' },
    component: { text: '~20% of tests' },
    e2e: { text: '~10% of tests' },
  },
  {
    attribute: 'Tools',
    unit: { text: 'Jest, Vitest' },
    component: { text: 'RTL, Storybook' },
    e2e: { text: 'Playwright, Cypress' },
  },
]

/* ───────────────────────── BEST PRACTICES & ANTIPATTERNS ───────────────────────── */

export const PRACTICE_CARDS: PracticeCard[] = [
  {
    title: 'Test behavior, not implementation',
    description: 'Assert on what the user sees or what the function returns \u2014 not internal state variables, private methods, or how many times a function was called internally.',
    type: 'do',
  },
  {
    title: 'Follow Arrange \u2192 Act \u2192 Assert',
    description: 'Every test has three clear phases: set up data, perform the action, check the outcome. This makes tests scannable and predictable during review.',
    type: 'do',
  },
  {
    title: 'Use descriptive test names',
    description: "Names should read like specs: it('disables submit when email is invalid') tells you exactly what broke without reading the test body.",
    type: 'do',
  },
  {
    title: 'Keep tests independent',
    description: 'Each test should set up its own state and tear it down. Never rely on test execution order. Use beforeEach for shared setup, not shared mutable state.',
    type: 'do',
  },
  {
    title: 'Use accessible queries in component tests',
    description: 'Prefer getByRole, getByLabelText over getByTestId. This tests accessibility for free and mirrors how real users find elements.',
    type: 'do',
  },
  {
    title: 'E2E: test critical paths only',
    description: 'Cover signup, login, core CRUD, and checkout. Push edge cases down to unit/component level where they run faster and break less.',
    type: 'do',
  },
  {
    title: 'Testing implementation details',
    description: "If you refactor code and tests break even though behavior didn't change, your tests are too tightly coupled. Test the \u201Cwhat\u201D, not the \u201Chow\u201D.",
    type: 'dont',
  },
  {
    title: 'Large snapshot tests',
    description: 'Massive snapshots are rubber-stamped during review and catch nothing meaningful. Use small, targeted inline snapshots if you must snapshot at all.',
    type: 'dont',
  },
  {
    title: 'Mocking everything',
    description: "Over-mocking means you're testing your mocks, not your code. Mock at boundaries (network, DB) but let real logic run.",
    type: 'dont',
  },
  {
    title: 'Flaky E2E selectors',
    description: 'Avoid brittle selectors like .btn-primary:nth-child(3). Use stable role-based or data-testid selectors that survive UI refactors.',
    type: 'dont',
  },
  {
    title: 'Using sleep() / fixed waits',
    description: 'Hard-coded waits make tests slow and flaky. Use built-in waiters like waitFor, findBy*, or Playwright\'s auto-waiting instead.',
    type: 'dont',
  },
  {
    title: 'One giant test that does everything',
    description: "Long tests are hard to debug when they fail. Split into focused tests \u2014 each asserting one behavior. You'll thank yourself at 2 AM.",
    type: 'dont',
  },
]

/* ───────────────────────── REVIEW CHECKLIST ───────────────────────── */

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 0, label: 'Test name is a readable spec', detail: 'Can you understand what\'s being tested without reading the body?' },
  { id: 1, label: 'AAA structure is clear', detail: 'Arrange, Act, Assert are visually distinct (blank lines help).' },
  { id: 2, label: 'Tests behavior, not implementation', detail: 'Would a refactor break this test even if behavior is unchanged?' },
  { id: 3, label: 'No unnecessary mocks', detail: 'Is the mock essential, or is it mocking code that should actually run?' },
  { id: 4, label: 'Assertions are specific', detail: 'Uses toEqual/toHaveTextContent over toBeTruthy.' },
  { id: 5, label: 'Edge cases covered', detail: 'Empty inputs, null/undefined, error states, boundary values.' },
  { id: 6, label: 'No sleep() or fixed waits', detail: 'Uses proper async waiters instead.' },
  { id: 7, label: 'Test is self-contained', detail: "Doesn't depend on other tests running first." },
  { id: 8, label: 'Right level of the pyramid', detail: 'Is this logic tested at the cheapest level that still gives confidence?' },
  { id: 9, label: 'Snapshot (if any) is small and intentional', detail: 'No 500-line snapshot blobs.' },
]

/* ───────────────────────── TEST TOOLS ───────────────────────── */

export const TEST_TOOLS: TestTool[] = [
  {
    id: 'vitest',
    name: 'Vitest',
    description: 'Fast, Vite-native test runner',
    tags: ['unit', 'component'],
  },
  {
    id: 'jest',
    name: 'Jest',
    description: 'Battle-tested, huge ecosystem',
    tags: ['unit', 'component'],
  },
  {
    id: 'rtl',
    name: 'React Testing Library',
    description: 'User-centric component tests',
    tags: ['component'],
  },
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'Cross-browser E2E + component',
    tags: ['component', 'e2e'],
  },
  {
    id: 'cypress',
    name: 'Cypress',
    description: 'Developer-friendly E2E runner',
    tags: ['component', 'e2e'],
  },
  {
    id: 'storybook',
    name: 'Storybook',
    description: 'Visual + interaction testing',
    tags: ['component'],
  },
]

/* ───────────────────────── TAG COLORS ───────────────────────── */

export const TAG_COLORS: Record<TestType, { color: string; bg: string; darkBg: string }> = {
  unit: { color: '#6ee7b7', bg: '#6ee7b722', darkBg: '#6ee7b718' },
  component: { color: '#7dd3fc', bg: '#7dd3fc22', darkBg: '#7dd3fc18' },
  e2e: { color: '#c4b5fd', bg: '#c4b5fd22', darkBg: '#c4b5fd18' },
}

/* ───────────────────────── NAVIGATION ───────────────────────── */

import type { GuideSection } from './guideTypes'

export const TESTING_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['test-start'] },
  { label: 'Testing Fundamentals', ids: ['test-overview', 'test-unit', 'test-component', 'test-e2e'] },
  { label: 'Comparing Tests', ids: ['test-comparison', 'test-best-practices'] },
  { label: 'Checklists & Tools', ids: ['test-review-checklist', 'test-tools'] },
]

export const TESTING_NAV_ORDER = TESTING_GUIDE_SECTIONS.flatMap(s => s.ids)
export const TESTING_PAGE_IDS = new Set(TESTING_NAV_ORDER)
