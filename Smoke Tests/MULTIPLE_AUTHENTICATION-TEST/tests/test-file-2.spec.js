const {test,expect,devices} = require('@playwright/test');
let timeout = 2000;

test.beforeEach(async({page}) => {
    await page.goto('https://demoqa.com/login');
});

test("auth - TF #2 - TC #1", async({page,browserName}) => {
    console.log("auth - TF #2 - TC #1");
    await expect(page.locator("#submit")).toHaveText("Log out");
    await page.waitForTimeout(timeout);
    await page.screenshot({path:`./ss/TF2-TC1-${browserName}.png`});
});

test("auth - TF #2 - TC #2", async({page,browserName}) => {
    console.log("auth - TF #2 - TC #2");
    await expect(page.locator("#submit")).toHaveText("Log out");
    await page.waitForTimeout(timeout);
    await page.screenshot({path:`./ss/TF2-TC2-${browserName}.png`});
});