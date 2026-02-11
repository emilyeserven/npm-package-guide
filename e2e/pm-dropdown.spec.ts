import { test, expect } from '@playwright/test'

test.describe('Package Manager Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens dropdown and selects pnpm', async ({ page }) => {
    await page.locator('[data-testid="pm-dropdown-toggle"]').click()
    await expect(page.locator('[data-testid="pm-option-pnpm"]')).toBeVisible()

    await page.locator('[data-testid="pm-option-pnpm"]').click()
    await expect(page.locator('[data-testid="pm-dropdown-toggle"]')).toContainText('pnpm')
  })

  test('opens dropdown and selects npm', async ({ page }) => {
    // First switch to pnpm
    await page.locator('[data-testid="pm-dropdown-toggle"]').click()
    await page.locator('[data-testid="pm-option-pnpm"]').click()
    await expect(page.locator('[data-testid="pm-dropdown-toggle"]')).toContainText('pnpm')

    // Then switch back to npm
    await page.locator('[data-testid="pm-dropdown-toggle"]').click()
    await page.locator('[data-testid="pm-option-npm"]').click()
    await expect(page.locator('[data-testid="pm-dropdown-toggle"]')).toContainText('npm')
  })

  test('navigates to npm-vs-pnpm page from dropdown', async ({ page }) => {
    await page.locator('[data-testid="pm-dropdown-toggle"]').click()
    await page.locator('[data-testid="pm-compare-link"]').click()
    await expect(page).toHaveURL(/#\/npm-vs-pnpm/)
  })

  test('closes dropdown when clicking outside', async ({ page }) => {
    await page.locator('[data-testid="pm-dropdown-toggle"]').click()
    await expect(page.locator('[data-testid="pm-option-npm"]')).toBeVisible()

    // Click somewhere outside
    await page.locator('body').click()
    await expect(page.locator('[data-testid="pm-option-npm"]')).not.toBeVisible()
  })
})
