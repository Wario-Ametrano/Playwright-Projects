import { test, expect } from '@playwright/test';

test('verifica prodotti visibili', async ({ page }) => {

  // Vai direttamente alla pagina interna
  await page.goto('/inventory.html');

  // Verifica che i prodotti siano visibili
  await expect(page.locator('.inventory_item')).toHaveCount(6);

});