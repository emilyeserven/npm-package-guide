import { test, expect } from '@playwright/test'

test.describe('Checklist Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/checklist')
  })

  test('displays checklist items with checkboxes', async ({ page }) => {
    await expect(page.locator('[data-testid="checklist-item-0"]')).toBeVisible()
    await expect(page.locator('[data-testid="checklist-progress"]')).toContainText('0 of')
  })

  test('checks and unchecks a checklist item', async ({ page }) => {
    const checkbox = page.locator('[data-testid="checklist-item-0"]')
    await expect(checkbox).not.toBeChecked()

    await checkbox.check()
    await expect(checkbox).toBeChecked()
    await expect(page.locator('[data-testid="checklist-progress"]')).toContainText('1 of')

    await checkbox.uncheck()
    await expect(checkbox).not.toBeChecked()
    await expect(page.locator('[data-testid="checklist-progress"]')).toContainText('0 of')
  })

  test('deselect all button clears all checked items', async ({ page }) => {
    // Check a couple items
    await page.locator('[data-testid="checklist-item-0"]').check()
    await page.locator('[data-testid="checklist-item-1"]').check()
    await expect(page.locator('[data-testid="checklist-progress"]')).toContainText('2 of')

    // Deselect all should appear and work
    await page.locator('[data-testid="deselect-all"]').click()
    await expect(page.locator('[data-testid="checklist-progress"]')).toContainText('0 of')
    await expect(page.locator('[data-testid="checklist-item-0"]')).not.toBeChecked()
    await expect(page.locator('[data-testid="checklist-item-1"]')).not.toBeChecked()
  })

  test('deselect all button is hidden when nothing is checked', async ({ page }) => {
    await expect(page.locator('[data-testid="deselect-all"]')).not.toBeVisible()
  })

  test('copy as markdown button exists', async ({ page }) => {
    await expect(page.locator('[data-testid="copy-checklist"]')).toBeVisible()
  })
})
