const { test, expect } = require('@playwright/test');
const { ProductController } = require('../api/ProductController');

test.describe('Modulo Gestione Prodotti - API', () => {
  
  // Prepariamo i dati del test
  const testData = {
    name: 'Smartphone NextGen 2026',
    price: 999,
    category: 'Mobile'
  };

  test('Dovrebbe completare il workflow CRUD correttamente', async ({ request }) => {
    const productApi = new ProductController(request);
    let productId;

    // --- CREATE ---
    await test.step('Creazione prodotto', async () => {
      const response = await productApi.createProduct(testData);
      
      expect(response.status()).toBe(201);
      const body = await response.json();
      
      expect(body.name).toBe(testData.name);
      productId = body.id; // Salviamo l'ID per dopo
    });

    // --- READ & VALIDATE ---
    await test.step('Verifica esistenza e dati', async () => {
      const response = await productApi.getProduct(productId);
      const body = await response.json();

      expect(response.ok()).toBeTruthy();
      // Validazione "Senior": controlliamo i tipi anche senza TypeScript
      expect(body).toMatchObject({
        id: productId,
        name: testData.name,
        price: testData.price
      });
    });

    // --- DELETE ---
    await test.step('Pulizia ambiente (Delete)', async () => {
      const response = await productApi.deleteProduct(productId);
      expect(response.status()).toBe(204);
    });
  });
});