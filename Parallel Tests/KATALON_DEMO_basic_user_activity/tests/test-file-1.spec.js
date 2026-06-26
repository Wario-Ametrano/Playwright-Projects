// @ts-check
import { test, expect } from '@playwright/test';

let timeout = 2000;

test.beforeEach(async ({ page }) => {
  //prima di ogni test
  await page.goto("https://katalon-demo-cura.herokuapp.com/#appointment"); //vado alla pagina di appointment
  await expect(page).toHaveTitle("CURA Healthcare Service"); //controllo che il titolo della pagina sia corretto
});

test("auth #1", async ({ page, browserName }) => {
  console.log("auth - TF #1 - TC #1");
  await page.getByRole('textbox', { name: 'Comment' }).fill('This is a simple test comment');
  // Open calendar
  await page.locator('.glyphicon.glyphicon-calendar').click(); //clicclo sul calendario per aprirlo attraverso la classe css del calendario
  // Select a valid day (current month only)
  await page.locator('td.day', { hasText: '8' }).first().click(); //seleziono il giorno 8 del calendario
  // Close the datepicker (ensures no overlay remains)
  await page.getByRole('textbox', { name: 'Comment' }).click(); //chiudo il calendario cliccando sul commento per assicurarmi che non ci siano overlay
  // Now the radio is clickable
  await page.getByLabel('Medicaid').check(); //seleziono il radio button medicaid 
  // Submit
  await page.getByRole('button', { name: 'Book Appointment' }).click(); 
  // Navigate home
  await page.getByRole('link', { name: 'Go to Homepage' }).click();
  await page.screenshot({
    path: `screenshot/TF1-TC1-${browserName}.png`
  });
});

test("auth #2", async ({ page, browserName }) => {
  //nome del test e browser in uso
  console.log("auth - TF #1 - TC #2"); //log per identificare il test in esecuzione
  await page.getByRole('textbox', { name: 'Comment' }).fill('This is a simple test comment');
  // Open calendar
  await page.locator('.glyphicon.glyphicon-calendar').click();
  // Select a valid day (current month only)
  await page.locator('td.day', { hasText: '8' }).first().click();
  // Close the datepicker (ensures no overlay remains)
  await page.getByRole('textbox', { name: 'Comment' }).click();
  // Now the radio is clickable
  await page.getByLabel('Medicaid').check();
  // Submit
  await page.getByRole('button', { name: 'Book Appointment' }).click();
  // Navigate home
  await page.getByRole('link', { name: 'Go to Homepage' }).click();
  await page.screenshot({ path: `screenshot/TF1-TC2-${browserName}.png` }); //faccio uno screenshot e lo salvo in una cartella ss con nome che identifica test e browser
});

// AVVIARE TUTTI I TEST IN PARALLELO: npx playwright test --workers 4