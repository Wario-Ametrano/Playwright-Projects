import {test as setup,expect} from '@playwright/test';

const authFile = 'auth/user.json'; //percorso dove salvo lo stato di autenticazione

setup('autanticate by UI', async ({page},testInfo) => { //nome del test

    const user = testInfo.project.use.user; //prendo le info dal file playwright.config.js
    const password = testInfo.project.use.password;  //prendo le info dal file playwright.config.js

    await page.goto('https://demoqa.com/login'); //pagina di login
    await page.getByPlaceholder('UserName').fill(user); //inserisco username
    await page.getByPlaceholder('Password').fill(password); //inserisco password
    await page.getByRole('button', {name: 'Login'}).click(); //clicco su login

    await page.waitForURL('https://demoqa.com/profile'); //aspetto che la pagina cambi
    
    await expect(page.locator('#userName-value')).toHaveText('Mariottide'); //controllo che l'username sia corretto

    await page.context().storageState({path: authFile}); //salvo lo stato di autenticazione in un file dichiarto all'inizio
})