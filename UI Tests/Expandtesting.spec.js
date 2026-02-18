import {test,expect} from '@playwright/test';

test("Input_Text-Test",async({page})=>{
    await page.goto("https://practice.expandtesting.com/?utm_source=chatgpt.com");

    await page.getByRole('link', { name: 'Web inputs' }).click();
    await page.getByRole('spinbutton', { name: 'Input: Number' }).click();// Clicca sull'input di tipo numero
    await page.getByRole('spinbutton', { name: 'Input: Number' }).fill('42');// Inserisce il numero "42" nell'input di tipo numero a volte è meglio usare pressSequentially per simulare la digitazione più umana
    const numberValue = await page.getByRole('spinbutton', { name: 'Input: Number' }).inputValue();// Ottiene il valore dell'input
    expect(numberValue).toBe('42'); // Verifica che il valore dell'input sia corretto

    await page.locator('#input-password').click();// Clicca sull'input di tipo testo
    await page.locator('#input-password').fill('Testing123');// Inserisce il testo "Testing123" nell'input di tipo testo
    const passwordValue = await page.locator('#input-password').inputValue();// Ottiene il valore dell'input
    expect(passwordValue).toBe('Testing123'); // Verifica che il valore dell'input sia corretto

    await page.locator('#input-text').click();// Clicca sull'input di tipo testo
    await page.locator('#input-text').fill('Playwright Testing');// Inserisce il testo "Playwright Testing" nell'input di tipo testo
    const textValue = await page.locator('#input-text').inputValue();// Ottiene il valore dell'input
    expect(textValue).toBe('Playwright Testing'); // Verifica che il valore dell'input sia corretto

    await page.locator('#input-date').click();// Clicca sull'input di tipo data
    await page.locator('#input-date').fill('2024-06-30');// Inserisce la data "2024-06-30" nell'input di tipo data
    const dateValue = await page.locator('#input-date').inputValue();// Ottiene il valore dell'input
    expect(dateValue).toBe('2024-06-30'); // Verifica che il valore dell'input sia corretto

    await page.waitForTimeout(2000); // 2 secondi
});

test("Drag_And_Drop-Test",async({page})=>{
    await page.goto("https://practice.expandtesting.com/?utm_source=chatgpt.com");
    
    await page.getByRole('link', { name: 'Drag and Drop', exact: true }).click();// Clicca sul link "Drag and Drop"
    
    const source = page.locator('#column-a'); // Seleziona l'elemento da trascinare
    const target = page.locator('#column-b'); // Seleziona l'elemento di destinazione
    
    await source.dragTo(target); // Trascina l'elemento source sull'elemento target
    
    // Verifica che il testo degli elementi sia stato scambiato
    await expect(page.locator('#column-a')).toHaveText(/B/);
    await expect(page.locator('#column-b')).toHaveText(/A/);

    await page.goBack();// Torna alla pagina precedente
    await page.waitForLoadState('domcontentloaded');
})

test("Table-Test",async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");

    await page.locator("#example_next").click();// Clicca sul pulsante "Next" per andare alla pagina successiva
    await page.getByRole('columnheader', { name: 'Extracurricular Activity:' }).click();
    await page.getByRole('columnheader', { name: 'Class Level: activate to sort' }).click();

    await page.locator(".form-select.form-select-sm").click();// Clicca sul menu a discesa per mostrare le opzioni di visualizzazione delle righe
    await page.locator(".form-select.form-select-sm").selectOption('5');// Seleziona "5" dal menu a discesa per mostrare 5 righe per pagina

    const searchBox = page.getByRole('searchbox', { name: 'Search:' });// Seleziona la casella di ricerca
    await searchBox.click();// Clicca sulla casella di ricerca
    await searchBox.fill('soccer');// Inserisce "soccer" nella casella di ricerca
    await page.waitForTimeout(2000); // 2 secondi
    await searchBox.press('Escape');// simula la pressione del tasto Esc
})

test("Locators-Test",async({page})=>{
    await page.goto("https://practice.expandtesting.com/locators");

    //Utilizza getByrRole per interagire col form di contatto
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'Contact' }).click();// Clicca sul link "Contact"
    await page.getByRole('textbox').first().fill('John');// Inserisce "John" nella prima casella di testo
    await page.getByRole('textbox').nth(1).fill('Doe');// Inserisce "Doe" nella seconda casella di testo
    await page.locator('textarea[name="address"]').fill('123 Main St, Anytown, USA');// Inserisce l'indirizzo nella casella di testo dell'indirizzo
    await page.getByRole('link', { name: 'Send' }).click();// Clicca sul link "Send"

    await page.waitForTimeout(1000); // 1 secondi
    await page.goto("https://practice.expandtesting.com/locators");

    //Utilizza getByLabel per interagire col form di iscrizione alla newsletter
    await page.getByLabel('Choose a country').click();// Clicca sul menu a discesa per mostrare le opzioni dei paesi
    await page.getByLabel('Choose a country').selectOption('Brazil');// Seleziona "Brazil" dal menu a discesa dei paesi
    await page.getByLabel('Email for newsletter').fill('john.doe@example.com');// Inserisce l'email nella casella di testo per la newsletter
    
    //Utilizza getByPlaceholder per interagire con la barra di ricerca
    await page.getByPlaceholder('Search the site').click();// Clicca sulla casella di ricerca
    await page.getByPlaceholder('Search the site').fill('Playwright Testing');// Inserisce "Playwright Testing" nella casella di ricerca
    await page.getByPlaceholder('Filter by tag').click();// Clicca sulla casella di filtro per mostrare le opzioni dei tag
    await page.getByPlaceholder('Filter by tag').fill('Testing');// Seleziona "Testing" dal menu a discesa dei tag
})

test("Multiple_Windows-Test",async({page})=>{
    await page.goto("https://practice.expandtesting.com/windows");
    await page.waitForLoadState('domcontentloaded');

    await page.waitForTimeout(1000); // 1 secondi

    await page.getByRole('link', { name: 'Click Here' }).click();// Clicca sul link "Click Here" per aprire una nuova finestra
    const [newPage] = await Promise.all([page.waitForEvent('popup')]); // Aspetta l'evento di apertura di una nuova finestra

    await newPage.waitForLoadState(); // Aspetta che la nuova pagina sia completamente caricata
    await expect(newPage.getByText('Example of a new window')).toBeVisible();// Verifica che il testo "Example of a new window" sia visibile nella nuova finestra

    await newPage.waitForTimeout(2000);//fai aspettare 2 secondi per vedere la nuova finestra prima di chiuderla

    await newPage.close();// Chiude la nuova finestra
    await page.bringToFront();// Porta la finestra originale in primo piano
    
    await page.close();// Chiude la finestra originale

})