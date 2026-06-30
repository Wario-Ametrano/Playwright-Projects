import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  //prima di ogni test
  await page.goto("https://practicetestautomation.com/practice/");
  // Ensure the link is visible before clicking
  await page.getByRole('link', { name: 'Test Table' }).scrollIntoViewIfNeeded();
  await page.getByRole('link', { name: 'Test Table' }).click();

  await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-table/');
});


test("Radio Language #1", async ({ page, browserName }) => {
  console.log("Radio Language Check - TF #2 - TC #1");
  await page.getByRole('radio', { name: 'Any' }).click();
  await page.getByRole('radio', { name: 'Java' }).click();
  await page.getByRole('radio', { name: 'Python' }).click();
});

test("Checkbox Level #2", async ({ page, browserName }) => {
  console.log("Checkbox Level Check - TF #2 - TC #2");
  await page.getByRole('checkbox', { name: 'Beginner' }).click();
  await page.getByRole('checkbox', { name: 'Intermediate' }).click();
  await page.getByRole('checkbox', { name: 'Advanced' }).click();
});
test("Dropdown Menu Min enrollments# 3", async ({ page, browserName }) => {
  console.log("Dropdown Menu Min enrollments - TF #2 - TC #3");
  //si alterna tra button e option per selezionare le opzioni del dropdown,
  //  perché dopo aver selezionato la prima opzione, il button cambia il suo testo
  //  e quindi non è più "Any" ma "5,000+" e così via. Quindi bisogna riaprire
  //  il dropdown ogni volta per selezionare l'opzione successiva.
  await page.getByRole('button', { name: 'Any' }).click(); // Open dropdown 
  await page.getByRole('option', { name: '5,000+' }).click();   // Select first option
  await page.getByRole('button', { name: '5,000+' }).click();// Re-open dropdown (required)
  await page.getByRole('option', { name: '10,000+' }).click();  // Now the option exists

  // Re-open again for next option
  await page.getByRole('button', { name: '10,000+' }).click();
  await page.getByRole('option', { name: '50,000+' }).click();

  await page.getByRole('button', { name: 'Reset filters' }).click();
});