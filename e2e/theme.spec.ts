import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('toggles between light and dark mode', async ({ page }) => {
    const body = page.locator('body')

    // Default should be light (no dark class)
    await expect(body).not.toHaveClass(/dark/)

    // Open sidebar, then open settings panel
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="settings-pane-toggle"]').click()

    // Click Dark to switch to dark mode
    await page.locator('[data-testid="theme-option-dark"]').click()
    await expect(body).toHaveClass(/dark/)

    // Click Light to switch back
    await page.locator('[data-testid="theme-option-light"]').click()
    await expect(body).not.toHaveClass(/dark/)
  })
})
