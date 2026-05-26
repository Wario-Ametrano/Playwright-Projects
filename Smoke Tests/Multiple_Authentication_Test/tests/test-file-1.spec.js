const {test,expect,devices} = require('@playwright/test');
let timeout = 2000;

test.beforeEach(async({page}) => { //prima di ogni test
    await page.goto('https://demoqa.com/login');
});

test("auth #1", async({page,browserName}) => { //nome del test e browser in uso
    console.log("auth - TF #1 - TC #1"); //log per identificare il test in esecuzione
    await expect(page.locator("#submit")).toHaveText("Log out"); //controllo che il bottone di logout sia presente
    await page.waitForTimeout(timeout); //attendo un timeout definito all'inizio
    await page.screenshot({path:`screenshots/TF1-TC1-${browserName}.png`}); //faccio uno screenshot e lo salvo in una cartella ss con nome che identifica test e browser
});

test("auth #2", async({page,browserName}) => {
    console.log("auth - TF #1 - TC #2");
    await expect(page.locator("#submit")).toHaveText("Log out");
    await page.waitForTimeout(timeout);
    await page.screenshot({path:`screenshots/TF1-TC2-${browserName}.png`});
});

// comando per eseguire solo il test di autenticazione in questo file: npx playwright test test-file-1.spec.js --headed --workers 1
// --headed esegue i test con l'interfaccia grafica (non in modalità headless)
// --workers 1 esegue i test in un solo processo (utile per debug o quando si vogliono evitare problemi di concorrenza)

//comando per eseguire i test di autenticazione dei due file che iniziano con auth: npx playwright test --grep "auth" --headed --workers 1
// --grep "auth" esegue solo i test che contengono "auth" nel nome



//comando per eseguire tutti i test in parallelo hedless: npx playwright test 
//comando per eseguire tutti i test in parallelo headed: npx playwright test --headed

//esegui solo i test del progetto Chromium dichiarati nel file config.js: npx playwright test --project=chromium --headed 