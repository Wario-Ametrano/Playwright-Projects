import { test,expect } from '@playwright/test';
import path from 'path';


//AVVIARE PRIMA QUESTO TEST PER CREARE IL FILE auth/user.json CON LO STATO DI AUTENTICAZIONE, POI NEI TEST SUCCESSIVI USARE QUELLO STATO PER NON DOVER FARE LOGIN OGNI VOLTA

const authFile = path.join(__dirname, '../auth/user.json'); // Percorso del file per salvare lo stato di autenticazione

test('login e salva sessione', async ({ page }) => {

  // Vai sul sito
  await page.goto('https://www.saucedemo.com/');

  // Compila login
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  // Click login
  await page.locator('#login-button').click();

  // Verifica che siamo dentro
  await page.waitForURL('**/inventory.html');

  // Salva stato (cookie + localStorage)
  await page.context().storageState({ path: authFile });

});