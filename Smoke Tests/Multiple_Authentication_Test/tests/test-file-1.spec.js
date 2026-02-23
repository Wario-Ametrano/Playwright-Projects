const {test,expect,devices} = require('@playwright/test');
let timeout = 2000;

test.beforeEach(async({page}) => { //prima di ogni test
    await page.goto('https://demoqa.com/login');
});

test("auth #1", async({page,browserName}) => { //nome del test e browser in uso
    console.log("auth - TF #1 - TC #1"); //log per identificare il test in esecuzione
    await expect(page.locator("#submit")).toHaveText("Log out"); //controllo che il bottone di logout sia presente
    await page.waitForTimeout(timeout); //attendo un timeout definito all'inizio
    await page.screenshot({path:`./ss/TF1-TC1-${browserName}.png`}); //faccio uno screenshot e lo salvo in una cartella ss con nome che identifica test e browser
});

test("auth #2", async({page,browserName}) => {
    console.log("auth - TF #1 - TC #2");
    await expect(page.locator("#submit")).toHaveText("Log out");
    await page.waitForTimeout(timeout);
    await page.screenshot({path:`./ss/TF1-TC2-${browserName}.png`});
});

// comando per eseguire il test: npx playwright test -g "auth" --headed --workers 1