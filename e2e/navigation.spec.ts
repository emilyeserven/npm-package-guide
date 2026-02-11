import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads the roadmap page by default', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Web App vs. NPM Package Guide')
  })

  test('opens and closes sidebar via menu toggle', async ({ page }) => {
    const sidebar = page.locator('[data-testid="sidebar"]')
    await expect(sidebar).toHaveCSS('transform', /translateX/)

    await page.locator('[data-testid="menu-toggle"]').click()
    await expect(sidebar).toHaveClass(/translate-x-0/)

    await page.locator('[data-testid="sidebar-close"]').click()
    await expect(sidebar).not.toHaveClass(/translate-x-0/)
  })

  test('closes sidebar by clicking overlay', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    const sidebar = page.locator('[data-testid="sidebar"]')
    await expect(sidebar).toHaveClass(/translate-x-0/)

    await page.locator('[data-testid="sidebar-overlay"]').click({ force: true })
    await expect(sidebar).not.toHaveClass(/translate-x-0/)
  })

  test('navigates to a section via sidebar', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-item-bigpicture"]').click()
    await expect(page).toHaveURL(/#\/bigpicture/)
  })

  test('navigates to checklist via sidebar', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-item-checklist"]').click()
    await expect(page).toHaveURL(/#\/checklist/)
  })

  test('navigates to glossary via sidebar', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-item-glossary"]').click()
    await expect(page).toHaveURL(/#\/glossary/)
  })

  test('navigates to external resources via sidebar', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-item-external-resources"]').click()
    await expect(page).toHaveURL(/#\/external-resources/)
  })

  test('home button navigates back to roadmap', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-item-bigpicture"]').click()
    await expect(page).toHaveURL(/#\/bigpicture/)

    await page.locator('[data-testid="home-button"]').click()
    await expect(page).toHaveURL(/#\/roadmap/)
  })

  test('previous and next navigation works', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-item-bigpicture"]').click()
    await expect(page).toHaveURL(/#\/bigpicture/)

    await page.locator('[data-testid="nav-next"]').click()
    await expect(page).not.toHaveURL(/#\/bigpicture/)

    await page.locator('[data-testid="nav-previous"]').click()
    await expect(page).toHaveURL(/#\/bigpicture/)
  })

  test('roadmap page only shows next button, not previous', async ({ page }) => {
    await expect(page.locator('[data-testid="nav-previous"]')).not.toBeVisible()
    await expect(page.locator('[data-testid="nav-next"]')).toBeVisible()
  })
})
