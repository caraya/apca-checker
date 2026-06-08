import { expect, test } from '@playwright/test';

test.describe('APCA checker app', () => {
  test('renders core controls and compliance results', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: 'APCA Contrast Checker' })).toBeVisible();
    await expect(page.locator('#textColorHex')).toBeVisible();
    await expect(page.locator('#bgColorHex')).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Compliance Levels' })).toBeVisible();
    await expect(page.getByText('Bronze Level')).toBeVisible();
    await expect(page.getByText('Silver Level')).toBeVisible();
    await expect(page.getByText('Gold Level')).toBeVisible();
  });

  test('swaps text and background values', async ({ page }) => {
    await page.goto('/');

    const textInput = page.locator('#textColorHex');
    const bgInput = page.locator('#bgColorHex');

    await textInput.fill('#112233');
    await bgInput.fill('#ddeeff');

    await page.getByRole('button', { name: 'Swap text and background colors' }).click();

    await expect(textInput).toHaveValue('#ddeeff');
    await expect(bgInput).toHaveValue('#112233');
  });

  test('shows validation message for invalid color token', async ({ page }) => {
    await page.goto('/');

    await page.locator('#textColorHex').fill('not-a-color');

    await expect(page.getByText('Enter a valid text color value.')).toBeVisible();
  });
});
