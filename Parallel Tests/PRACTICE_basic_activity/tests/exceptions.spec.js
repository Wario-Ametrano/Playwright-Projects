import { test, expect } from '@playwright/test';

let timeout = 2000;

test.beforeEach(async ({ page }) => {
  //prima di ogni test
  await page.goto("https://practicetestautomation.com/practice/"); //vado alla pagina di appointment
  await page.getByRole('link', { name: 'Test Exceptions' }).click();
  await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-exceptions/');
});

test("Edit #1", async ({ page, browserName }) => {
  console.log("Exceptions editFile - TF #1 - TC #1");
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('button', { name: 'Add' }).click();
});

test("Add #2", async ({ page, browserName }) => {
  console.log("Exceptions addFile - TF #1 - TC #2");
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('textbox').dblclick();
  await page.getByRole('textbox').fill('Pizza%%$$**');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
});