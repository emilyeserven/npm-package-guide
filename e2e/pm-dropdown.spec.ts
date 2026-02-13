import { test, expect } from '@playwright/test'

test.describe('Package Manager Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Open sidebar and settings panel
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="settings-pane-toggle"]').click()
  })

  test('selects pnpm', async ({ page }) => {
    await page.locator('[data-testid="pm-option-pnpm"]').click()
    await expect(page.locator('[data-testid="pm-option-pnpm"]')).toHaveClass(/font-semibold/)
    await expect(page.locator('[data-testid="pm-option-npm"]')).not.toHaveClass(/font-semibold/)
  })

  test('selects npm after switching to pnpm', async ({ page }) => {
    // Switch to pnpm first
    await page.locator('[data-testid="pm-option-pnpm"]').click()
    await expect(page.locator('[data-testid="pm-option-pnpm"]')).toHaveClass(/font-semibold/)

    // Switch back to npm
    await page.locator('[data-testid="pm-option-npm"]').click()
    await expect(page.locator('[data-testid="pm-option-npm"]')).toHaveClass(/font-semibold/)
    await expect(page.locator('[data-testid="pm-option-pnpm"]')).not.toHaveClass(/font-semibold/)
  })

  test('navigates to npm-vs-pnpm page from help link', async ({ page }) => {
    await page.locator('[data-testid="pm-compare-link"]').click()
    await expect(page).toHaveURL(/#\/npm-vs-pnpm/)
  })
})
