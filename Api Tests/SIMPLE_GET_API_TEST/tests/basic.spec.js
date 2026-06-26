// @ts-check
import { test, expect } from '@playwright/test';

test('Simple Get Request', async ({ request }) => { // Esegui una richiesta GET semplice
  const response = await request.get('https://conduit-api.bondaracademy.com/api/tags', {
    ignoreHTTPSErrors: true // per ignorare gli errori SSL certificati non validi
  });
  const responseObject = await response.json(); // Converti la risposta in un oggetto JSON
  console.log(responseObject); // Stampa l'oggetto di risposta per il debug
  expect(responseObject.tags[0]).toEqual('Test') // Verifica che il primo tag sia 'Test'
  expect(responseObject.tags).toHaveLength(10) // Verifica che ci siano esattamente 10 tag
});

