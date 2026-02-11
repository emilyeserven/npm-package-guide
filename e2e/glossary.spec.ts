import { test, expect } from '@playwright/test'

test.describe('Glossary Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/glossary')
  })

  test('renders the glossary table', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table"]')).toBeVisible()
    await expect(page.locator('[data-testid="glossary-search"]')).toBeVisible()
  })

  test('filters terms by search input', async ({ page }) => {
    const table = page.locator('[data-testid="data-table"]')
    const rowsBefore = await table.locator('tbody tr').count()

    await page.locator('[data-testid="glossary-search"]').fill('TypeScript')

    const rowsAfter = await table.locator('tbody tr').count()
    expect(rowsAfter).toBeLessThan(rowsBefore)
  })

  test('filters by category using filter buttons', async ({ page }) => {
    const table = page.locator('[data-testid="data-table"]')
    const allRows = await table.locator('tbody tr').count()

    // Click the "All" filter (should be active by default)
    await expect(page.locator('[data-testid="glossary-filter-all"]')).toBeVisible()

    // Find and click a category filter (they are dynamically generated)
    const filterButtons = page.locator('[data-testid^="glossary-filter-"]:not([data-testid="glossary-filter-all"])')
    const filterCount = await filterButtons.count()
    expect(filterCount).toBeGreaterThan(0)

    await filterButtons.first().click()

    const filteredRows = await table.locator('tbody tr').count()
    expect(filteredRows).toBeLessThanOrEqual(allRows)
  })

  test('resets category filter when clicking All', async ({ page }) => {
    const table = page.locator('[data-testid="data-table"]')
    const allRows = await table.locator('tbody tr').count()

    // Apply a filter
    const filterButtons = page.locator('[data-testid^="glossary-filter-"]:not([data-testid="glossary-filter-all"])')
    await filterButtons.first().click()

    // Reset
    await page.locator('[data-testid="glossary-filter-all"]').click()
    const resetRows = await table.locator('tbody tr').count()
    expect(resetRows).toBe(allRows)
  })

  test('shows empty message when no terms match search', async ({ page }) => {
    await page.locator('[data-testid="glossary-search"]').fill('xyznonexistentterm123')

    const table = page.locator('[data-testid="data-table"]')
    await expect(table).toContainText('No terms match your search')
  })
})
