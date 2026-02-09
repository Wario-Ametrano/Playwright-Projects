// @ts-check
import { test, expect } from '@playwright/test';

test.use({viewport: { width: 1805, height: 874 } });// imposta la dimensione della finestra del browser a 1805x874 pixel

test('Gibson SG Standard Test.', async ({ page }) => {
  test.setTimeout(60000); // impostare la durate del test a 60 secondi
  await page.goto('https://www.thomann.it/');
  
  const cookieButton = page.locator('.fx-space-left--xs');
  if (await cookieButton.isVisible()) {// controlla se il bottone dei cookie è visibile
    await cookieButton.click();// clicca sul bottone per accettare i cookie
    await expect(cookieButton).toBeHidden();// verifica che il bottone non sia più visibile
  }

  const searchBox = page.getByRole('search', { name: 'Ricerca' });// seleziona la barra di ricerca
  await searchBox.pressSequentially('Gibson SG Standard Green', {delay: 100, });// digita il nome del prodotto con un ritardo di 100ms tra ogni tasto
  await searchBox.press('Enter');// simula la pressione del tasto invio

  await page.waitForLoadState('networkidle'); // aspetta che la pagina sia completamente caricata
  
  //SCROLL VERTICALE
  const element = page.getByText('Gibson SG Standard Trans. Teal')
  await element.scrollIntoViewIfNeeded();// scrolla la pagina fino a rendere visibile l'elemento
  await page.waitForTimeout(1000); // 1 secondo

  //Seleziona il prodotto
  await page.getByText('Gibson SG Standard Trans. Teal').click();// seleziona il prodotto dai risultati della ricerca
  await page.waitForTimeout(2000); // 2 secondi
  await page.getByRole('img', { name: 'Gibson SG Standard Trans. Teal' }).nth(2).click();// seleziona la 2 immagine del prodotto per aprire la lightbox
  await page.getByRole('img', { name: 'Gibson SG Standard Trans. Teal' }).first().click();// seleziona l'immagine principale per ingrandire la visualizzazione
  await page.waitForTimeout(3000); // 3 secondi
  
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000); // 1 secondo

  const acceptCookies = page.getByRole('button', { name: /Accept|Akzeptieren/i });
    if (await acceptCookies.isVisible()) {
      await acceptCookies.click();
    };
    
  const cartButton = page.locator('.call-to-action__button.fx-button.fx-button--cta');// seleziona il bottone "Aggiungi al carrello" tra le classi
    await expect(cartButton).toBeVisible({ timeout: 10000 });
    await cartButton.click();

  await page.waitForTimeout(2000); // 2 secondi

  await page.locator('.fx-icon.fx-icon--remove.fx-infobox__close-icon > use').click();// chiude la finestra di conferma aggiunta al carrello
  await page.locator('.action.delete-action').click();// rimuove il prodotto dal carrello
  await page.waitForTimeout(2000); // 2 second1
  
  await expect(page.getByRole('button', { name: 'OK', exact: true })).toBeVisible();// verifica che il bottone "OK" sia visibile
  await page.getByRole('button', { name: 'OK', exact: true }).click();// conferma la rimozione del prodotto dal carrello

  await page.waitForTimeout(1000); // 1 secondo
  await page.goBack({ waitUntil: 'networkidle' });// torna alla pagina dei risultati di ricerca

  const productLink = page.getByRole('link', { name: 'Gibson SG Standard HC',exact: true,});// seleziona il link del prodotto "Gibson SG Standard HC"
    await productLink.waitFor({ state: 'visible' });// aspetta che il link del prodotto sia visibile
    await productLink.hover();// passa il mouse sopra il link del prodotto
    await page.waitForTimeout(2000); // 2 secondi
    
  await productLink.click(); 
  // aspetta che la pagina del prodotto sia caricata 
  await page.waitForLoadState('domcontentloaded'); // ora puoi interagire con il bottone del carrello 

  await page.waitForTimeout(3000); // 3 secondi

  await expect(cartButton).toBeVisible({ timeout: 10000 });
  await cartButton.click();
  
  if (await acceptCookies.isVisible()) {
    await acceptCookies.click();
  };

  await page.waitForLoadState('networkidle'); // aspetta che la pagina sia completamente caricata

  await expect(page.getByRole('button', { name: 'Alla cassa' })).toBeVisible();// verifica che il bottone "Alla cassa" sia visibile
  await page.getByRole('button', { name: 'Alla cassa' }).click({ force: true });// clicca sul bottone "Alla cassa" forzatamente
  await expect(page.getByTestId('login-submit')).toBeVisible();
  await page.waitForTimeout(2000); // 2 secondi

  await page.close();
});
