import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('toggles between light and dark mode', async ({ page }) => {
    const html = page.locator('html')

    // Default should be light (no dark class)
    await expect(html).not.toHaveClass(/dark/)

    // Click theme toggle to switch to dark
    await page.locator('[data-testid="theme-toggle"]').click()
    await expect(html).toHaveClass(/dark/)

    // Click again to switch back to light
    await page.locator('[data-testid="theme-toggle"]').click()
    await expect(html).not.toHaveClass(/dark/)
  })
})
