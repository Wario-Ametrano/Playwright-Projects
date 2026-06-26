import {test as setup,expect} from '@playwright/test';

const authFile = 'auth/user.json'; //percorso dove salvo lo stato di autenticazione

setup('autanticate by UI', async ({page},testInfo) => { //nome del test

    const user = testInfo.project.use.user; //prendo le info dal file playwright.config.js
    const password = testInfo.project.use.password;  //prendo le info dal file playwright.config.js

    await page.goto('https://katalon-demo-cura.herokuapp.com/'); //pagina di login
    await page.getByRole('link', {name: 'Make Appointment'}).click(); //clicco su make appointment
    await page.locator('#txt-username').fill(user); //inserisco username
    await page.locator('#txt-password').fill(password); //inserisco password
    await page.getByRole('button', {name: 'Login'}).click(); //clicco su login

    await page.waitForURL('https://katalon-demo-cura.herokuapp.com/#appointment'); //aspetto che la pagina cambi
    await page.context().storageState({path: authFile}); //salvo lo stato di autenticazione in un file dichiarto all'inizio
})
 // AVVIARE PRIMA QUESTO TEST DA TERMINALE E POI GLI ALTRI TEST FILE

//comando per eseguire il test di setup: npx playwright test setup --headed --workers 1
// --headed esegue il test con l'interfaccia grafica (non in modalità headless)
// --workers 1 esegue il test in un solo processo (utile per debug o quando si vogliono evitare problemi di concorrenza)