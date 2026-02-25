import { test, expect } from '@playwright/test';
import { createUser } from '../api/users.api';

test('User lifecycle API test', async ({ request }) => {

    const newUser = await createUser(request, { //uso createUser con request
        firstName: 'Marco', //✅ specifico i dati dell'utente da creare
        lastName: 'Rossi',
        age: 30
    });

    expect(newUser.firstName).toBe('Marco'); // ✅ verifico che il nome sia corretto
    expect(newUser.lastName).toBe('Rossi'); // ✅ verifico che il cognome sia corretto
    expect(newUser.age).toBe(30); // ✅ verifico che l'età sia corretta

    const listResponse = await request.get('https://dummyjson.com/users'); // ✅ uso request.get per ottenere la lista degli utenti

    expect(listResponse.status()).toBe(200); // ✅ asserisce che lo status code sia 200 (OK)

    const listBody = await listResponse.json(); // ✅ converte la risposta in JSON

    expect(Array.isArray(listBody.users)).toBeTruthy(); // ✅ verifica che listBody.users sia un array
    expect(listBody.users.length).toBeGreaterThan(0); // ✅ verifica che ci sia almeno un utente nella lista

    console.log(listBody.users); // ✅ stampa la lista degli utenti

    /* SE VOGLIO FILTRARE LA LISTA PER TROVARE L'UTENTE CREATO, POSSO USARE QUESTO CODICE:
    const foundUser = listBody.users.find(u =>
        u.firstName === newUser.firstName &&
        u.lastName === newUser.lastName && 
        u.age === newUser.age 
    );

    console.log("Utente trovato nella lista:", foundUser);
    */
});