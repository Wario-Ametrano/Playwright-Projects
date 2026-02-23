import { test, expect } from '@playwright/test';
import { createComment } from '../api/comments.Api'; //importiamo la funzione createComment che abbiamo definito nell'API, così da poterla usare nel nostro test

test('POST + GET comment API', async ({ request }) => { //request è un oggetto che ci viene passato da Playwright, e ci permette di fare richieste HTTP

  const comment = { //creiamo un oggetto che rappresenta il commento che vogliamo creare
    body: 'I am in love with someone.',
    postId: 1,
    userId: 5,
  };

  // 1️⃣ Creo commento
  const newComment = await createComment(request, comment); //creiamo un commento usando la funzione che abbiamo definito nell'API, e gli passiamo l'oggetto comment che abbiamo appena creato

  expect(newComment.body).toBe(comment.body); //ci aspettiamo che il campo "body" del commento appena creato sia uguale al campo "body" dell'oggetto comment che abbiamo passato alla funzione createComment

  // 2️⃣ Recupero commento
  const getComment = await request.get( //facciamo una richiesta GET per recuperare il commento appena creato, usando l'id che ci è stato restituito dalla funzione createComment
    'https://dummyjson.com/comments/' + newComment.id //la URL per recuperare un commento specifico è "https://dummyjson.com/comments/{id}", dove {id} è l'identificativo del commento che vogliamo recuperare
  );

  const body = await getComment.json();

  expect(body.id).toBe(newComment.id); //ci aspettiamo che il campo "id" del commento recuperato sia uguale al campo "id" del commento appena creato, in questo modo siamo sicuri di aver recuperato il commento giusto

});