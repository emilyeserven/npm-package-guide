import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('toggles between light and dark mode', async ({ page }) => {
    const html = page.locator('html')

    // Default should be light (no dark class)
    await expect(html).not.toHaveClass(/dark/)

    // Open sidebar, then open options dropdown
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="options-dropdown-toggle"]').click()

    // Click Dark to switch to dark mode
    await page.locator('[data-testid="theme-option-dark"]').click()
    await expect(html).toHaveClass(/dark/)

    // Re-open dropdown and click Light to switch back
    await page.locator('[data-testid="options-dropdown-toggle"]').click()
    await page.locator('[data-testid="theme-option-light"]').click()
    await expect(html).not.toHaveClass(/dark/)
  })
})
