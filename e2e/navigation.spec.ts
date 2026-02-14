import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads the home page by default', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Dev Guides')
  })

  test('opens and closes sidebar via menu toggle', async ({ page }) => {
    const sidebar = page.locator('[data-testid="sidebar"]')
    await expect(sidebar).toHaveClass(/-translate-x-full/)

    // Open sidebar
    await page.locator('[data-testid="menu-toggle"]').click()
    await expect(sidebar).toHaveClass(/translate-x-0/)

    // Select a guide to expand content panel (which has the close button)
    await page.locator('[data-testid="sidebar-guide-icon-npm-package"]').click()
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
    await page.locator('[data-testid="sidebar-guide-icon-npm-package"]').click()
    await page.locator('[data-testid="sidebar-item-bigpicture"]').click()
    await expect(page).toHaveURL(/#\/bigpicture/)
  })

  test('navigates to checklist via sidebar', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-icon-checklists"]').click()
    await page.locator('[data-testid="sidebar-item-checklist"]').click()
    await expect(page).toHaveURL(/#\/checklist/)
  })

  test('navigates to glossary via sidebar icon', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-icon-glossary"]').click()
    await expect(page).toHaveURL(/#\/glossary/)
  })

  test('navigates to external resources via sidebar icon', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-icon-external-resources"]').click()
    await expect(page).toHaveURL(/#\/external-resources/)
  })

  test('home button navigates back to roadmap', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-guide-icon-npm-package"]').click()
    await page.locator('[data-testid="sidebar-item-bigpicture"]').click()
    await expect(page).toHaveURL(/#\/bigpicture/)

    await page.locator('[data-testid="home-button"]').click()
    await expect(page).toHaveURL(/#\/roadmap/)
  })

  test('previous and next navigation works', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    await page.locator('[data-testid="sidebar-guide-icon-npm-package"]').click()
    await page.locator('[data-testid="sidebar-item-bigpicture"]').click()
    await expect(page).toHaveURL(/#\/bigpicture/)

    await page.locator('[data-testid="nav-next"]').click()
    await expect(page).not.toHaveURL(/#\/bigpicture/)

    await page.locator('[data-testid="nav-previous"]').click()
    await expect(page).toHaveURL(/#\/bigpicture/)
  })

  test('roadmap page only shows next button, not previous', async ({ page }) => {
    await page.goto('/#/roadmap')
    await expect(page.locator('[data-testid="nav-previous"]')).not.toBeVisible()
    await expect(page.locator('[data-testid="nav-next"]')).toBeVisible()
  })

  test('settings panel opens and closes in sidebar', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()
    const sidebar = page.locator('[data-testid="sidebar"]')

    // Open settings panel
    await page.locator('[data-testid="settings-pane-toggle"]').click()
    await expect(sidebar).toHaveClass(/w-\[360px\]/)

    // Close settings panel via close button
    await page.locator('[data-testid="sidebar-close"]').click()
    await expect(sidebar).not.toHaveClass(/translate-x-0/)
  })

  test('switching between guide and settings panels', async ({ page }) => {
    await page.locator('[data-testid="menu-toggle"]').click()

    // Open a guide panel
    await page.locator('[data-testid="sidebar-guide-icon-npm-package"]').click()
    await expect(page.locator('[data-testid="sidebar-item-roadmap"]')).toBeVisible()

    // Switch to settings
    await page.locator('[data-testid="settings-pane-toggle"]').click()
    await expect(page.locator('[data-testid="theme-option-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="sidebar-item-roadmap"]')).not.toBeVisible()

    // Switch back to guide
    await page.locator('[data-testid="sidebar-guide-icon-npm-package"]').click()
    await expect(page.locator('[data-testid="sidebar-item-roadmap"]')).toBeVisible()
    await expect(page.locator('[data-testid="theme-option-light"]')).not.toBeVisible()
  })
})
