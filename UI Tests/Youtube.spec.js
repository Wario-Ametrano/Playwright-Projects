import {test, expect} from '@playwright/test';

test.use({viewport: { width: 1805, height: 874 } });// imposta la dimensione della finestra del browser a 1805x874 pixel

test('Youtube Test', async ({page}) => {
    test.setTimeout(60000); // impostare la durate del test a 60 secondi
    await page.goto('https://www.youtube.com/');

    const cookieButton = page.getByRole('button', { name: 'Reject the use of cookies and' }); // seleziona il bottone dei cookie
    if (await cookieButton.count() > 0) { // controlla se il bottone dei cookie è presente
        await cookieButton.click();
        await expect(cookieButton).toBeHidden();// verifica che il bottone non sia più visibile
    }

    const searchbox = await page.locator('.ytSearchboxComponentInput.yt-searchbox-input.title')
    await searchbox.pressSequentially('Playwright', {delay: 100, });// digita "Playwright" con un ritardo di 100ms tra ogni tasto
    await searchbox.press('Enter');// simula la pressione del tasto invio

    await page.waitForLoadState('networkidle'); // aspetta che la pagina sia completamente caricata

    //SCROLL VERTICALE
    const element = page.getByText('React Testing with Playwright (Complete Tutorial)')
    await element.scrollIntoViewIfNeeded();// scrolla la pagina fino a rendere visibile l'elemento
    await page.waitForTimeout(2000); // 2 secondi
    //Seleziona il video
    await page.getByText('React Testing with Playwright').click();// seleziona il prodotto dai risultati della ricerca
    await page.waitForTimeout(1000); // 1 secondi
    await page.keyboard.press('m');

    await page.waitForTimeout(2000); // 2 secondi

    await page.getByRole('link', { name: 'Cosden Solutions' }).click();// clicca sul link "Cosden Solutions" per accedere al canale YouTube
    await page.waitForLoadState('networkidle');

    await page.getByRole('tab', { name: 'Videos' }).click();// clicca sulla scheda "Video" per visualizzare i video del canale
    await page.waitForLoadState('networkidle');
});