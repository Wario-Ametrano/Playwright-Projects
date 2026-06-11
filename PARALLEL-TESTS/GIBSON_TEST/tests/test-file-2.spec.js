const { test, expect, devices } = require("@playwright/test");
let timeout = 4000;
let guitar;  //dichiarare la variabile al livello di modulo

//creare una funzione a parte per eseguire il login, in modo da poterla riutilizzare in più test
test.beforeEach(async ({ page }, testInfo) => {
  //prima di ogni test
  guitar = testInfo.project.use.guitar;  //prendo le info dal file playwright.config.js
  await page.goto("https://www.gibson.com/it-eu/"), { waitUntil: 'load' }; //navigo alla home page di Gibson
});


test("search TF#2 - #1", async ({ page, browserName }) => {
  //nome del test e browser in uso
  console.log("search - TF #1 - TC #1"); //log per identificare il test in esecuzione
  await page.getByRole('button', { name: 'Cerca' }).click();
  await page.getByRole('searchbox', { name: 'Submit' }).fill(guitar);
  await page.getByRole('searchbox', { name: 'Submit' }).press('Enter');
  await page.waitForTimeout(timeout); //attendo un timeout definito all'inizio
});

test("search TF#2 - #2", async ({ page, browserName }) => {
  //nome del test e browser in uso
  console.log("search - TF #2 - TC #2"); //log per identificare il test in esecuzione
  await page.getByRole('button', { name: 'Cerca' }).click();
  await page.getByRole('searchbox', { name: 'Submit' }).fill(guitar);
  await page.getByRole('searchbox', { name: 'Submit' }).press('Enter');
  await page.waitForTimeout(timeout); //attendo un timeout definito all'inizio
});


/*-------------------------------------------------------------------------------------------------------- */
//Comando per eseguire tutti i test in parallelo hedless: npx playwright test
//Comando per eseguire tutti i test in parallelo headed: npx playwright test --headed

//Esegui solo i test del progetto Chromium dichiarati nel file config.js: npx playwright test --project=chromium --headed