import { test, expect } from '@playwright/test'

test.describe('External Resources Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/external-resources')
  })

  test('renders the resources table and search', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table"]')).toBeVisible()
    await expect(page.locator('[data-testid="resources-search"]')).toBeVisible()
    await expect(page.locator('[data-testid="resources-count"]')).toBeVisible()
  })

  test('filters resources by search input', async ({ page }) => {
    const countText = await page.locator('[data-testid="resources-count"]').textContent()
    const totalCount = parseInt(countText!.split('of')[1])

    await page.locator('[data-testid="resources-search"]').fill('TypeScript')

    const filteredText = await page.locator('[data-testid="resources-count"]').textContent()
    const filteredCount = parseInt(filteredText!.split('of')[0])
    expect(filteredCount).toBeLessThan(totalCount)
  })

  test('clears search input with clear button', async ({ page }) => {
    await page.locator('[data-testid="resources-search"]').fill('TypeScript')
    await expect(page.locator('[data-testid="resources-search-clear"]')).toBeVisible()

    await page.locator('[data-testid="resources-search-clear"]').click()
    await expect(page.locator('[data-testid="resources-search"]')).toHaveValue('')
  })

  test('filters by tag buttons', async ({ page }) => {
    const countBefore = await page.locator('[data-testid="resources-count"]').textContent()
    const totalBefore = parseInt(countBefore!.split('of')[1])

    // Click a tag filter
    const tagButtons = page.locator('[data-testid^="resources-tag-"]')
    const tagCount = await tagButtons.count()
    expect(tagCount).toBeGreaterThan(0)

    await tagButtons.first().click()

    const countAfter = await page.locator('[data-testid="resources-count"]').textContent()
    const filteredAfter = parseInt(countAfter!.split('of')[0])
    expect(filteredAfter).toBeLessThanOrEqual(totalBefore)
  })

  test('clear filters button resets all filters', async ({ page }) => {
    // Apply a tag filter
    const tagButtons = page.locator('[data-testid^="resources-tag-"]')
    await tagButtons.first().click()

    await expect(page.locator('[data-testid="resources-clear-filters"]')).toBeVisible()
    await page.locator('[data-testid="resources-clear-filters"]').click()

    // Clear filters button should disappear
    await expect(page.locator('[data-testid="resources-clear-filters"]')).not.toBeVisible()
  })

  test('shows empty message when no resources match', async ({ page }) => {
    await page.locator('[data-testid="resources-search"]').fill('xyznonexistentresource123')

    const table = page.locator('[data-testid="data-table"]')
    await expect(table).toContainText('No references match your filters')
  })
})
