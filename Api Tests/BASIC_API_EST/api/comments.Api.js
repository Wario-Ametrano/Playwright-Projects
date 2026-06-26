import { expect } from '@playwright/test';

export async function createComment(apiClient, commentObject) { //facciamo un'API che ci permette di creare un commento, così da poterlo poi recuperare con il GET

  const response = await apiClient.post( //request è un oggetto che ci viene passato da Playwright, e ci permette di fare richieste HTTP
    'https://dummyjson.com/posts/add',
    {
      headers: { 'Content-Type': 'application/json' }, //diciamo che il corpo della richiesta è in formato JSON
      data: commentObject,
    }
  );

  expect(response.status()).toBe(201); //ci aspettiamo che lo status code della risposta sia 201, che significa "Created", ovvero che il commento è stato creato con successo
  const body = await response.json();

  expect(body.id).toBeDefined();//ci aspettiamo che la risposta contenga un campo "id", che è l'identificativo del commento appena creato

  return body;
}