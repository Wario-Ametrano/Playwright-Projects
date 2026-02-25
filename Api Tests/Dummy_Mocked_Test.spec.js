import { test, expect } from '@playwright/test';
import path from 'path';

test('Mock API and show data in browser', async ({ page }) => {

  // 1️⃣ MOCK API
  await page.route('https://dummyjson.com/users', async route => { // Intercetto la chiamata API
    await route.fulfill({ // Rispondo con dati mockati
      status: 200, // Stato di successo
      contentType: 'application/json',
      body: JSON.stringify({
        users: [
          { id: 1, firstName: 'Mario', lastName: 'Rossi', age: 30 },
          { id: 2, firstName: 'Luca', lastName: 'Bianchi', age: 25 }
        ]
      })
    });
  });

    // 2️⃣ CARICO LA PAGINA HTML LOCALE
    const filePath = path.join(__dirname, '../mocks/mock-page.html');
    await page.goto('file://' + filePath);

    // 3️⃣ VERIFICO CHE I DATI MOCKATI SONO VISIBILI NEL BROWSER
    const firstUser = await page.locator('#user-list li').first().textContent();
    const secondUser = await page.locator('#user-list li').nth(1).textContent();

    expect(firstUser).toContain('Mario');   
    expect(firstUser).toContain('Rossi');
    expect(firstUser).toContain('30');

    expect(secondUser).toContain('Luca');
    expect(secondUser).toContain('Bianchi');
    expect(secondUser).toContain('25');


    // 4️⃣ STAMPO NELLA CONSOLE DEL TEST
    console.log('Utenti mockati nel browser:');
    console.log(firstUser);
    console.log(secondUser);
});
