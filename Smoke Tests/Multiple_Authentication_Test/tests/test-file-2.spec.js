const {test,expect,devices} = require('@playwright/test');
let timeout = 2000;

test.beforeEach(async({page}) => {
    await page.goto('https://demoqa.com/login');
});

test("auth - TF #2 - TC #1", async({page,browserName}) => {
    console.log("auth - TF #2 - TC #1");
    await expect(page.locator("#submit")).toHaveText("Log out");
    await page.waitForTimeout(timeout);
    await page.screenshot({path:`screenshots/TF2-TC1-${browserName}.png`});
});

test("auth - TF #2 - TC #2", async({page,browserName}) => {
    console.log("auth - TF #2 - TC #2");
    await expect(page.locator("#submit")).toHaveText("Log out");
    await page.waitForTimeout(timeout);
    await page.screenshot({path:`screenshots/TF2-TC2-${browserName}.png`});
});

// comando per eseguire solo il test di autenticazione in questo file: npx playwright test test-file-1.spec.js --headed --workers 1

/* I worker sono “mini-motori paralleli” che Playwright usa per eseguire i test in parallelo più velocemente e in modo isolato.
più test in parallelo hai più worker devi aggiungere così vengono divisi i processi della CPU per ogni worker 
quindi nel comando devi specificare quanti usarne se hai 1000 test ne puoi usare anche 6 in base alla potenza del pc quanti test in contemporanea sopporta*/
