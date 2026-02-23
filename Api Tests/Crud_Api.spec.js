import {test,expect} from '@playwright/test';

test('API_POST_Request', async ({request})=>{
    const response = await request.post('https://reqres.in/api/users', {
        ignoreHTTPSErrors: true ,// per ignorare gli errori SSL certificati non validi
        data:{
            name:"morpheus",
            job:"leader"
        }
    });
    
    expect(response.status()).toBe(201); // Verifica che lo status code sia 201
    const text = await response.text(); 
    expect(text).toContain('morpheus'); // Verifica che il corpo contenga il nome "morpheus"
    console.log(await response.json()); 
    
});


test('API_PUT_Request', async ({request})=>{
    const response = await request.put('https://reqres.in/api/users/2', {
    ignoreHTTPSErrors: true ,// per ignorare gli errori SSL certificati non validi
    data:{
            name:"morpheus",
            job:"zion resident"
        }
    });
    
    expect(response.status()).toBe(200); // Verifica che lo status code sia 200
    const text = await response.text(); 
    expect(text).toContain('morpheus'); 
    console.log(await response.json()); 
});


test('API_GET_Request', async ({request})=>{
    const response = await request.get('https://reqres.in/api/users/2', {
        ignoreHTTPSErrors: true // per ignorare gli errori SSL certificati non validi
    });
    
    expect(response.status()).toBe(200); // Verifica che lo status code sia 200
    const text = await response.text(); // Ottieni il corpo della risposta come testo
    expect(text).toContain('Janet'); // Verifica che il corpo contenga il nome "Janet"
    console.log(await response.json()); // Stampa il corpo della risposta in formato JSON
});

test('API_DELETE_Request', async ({request})=>{
    const response = await request.delete('https://reqres.in/api/users/2', {
    ignoreHTTPSErrors: true // per ignorare gli errori SSL certificati non validi
  });

    expect(response.status()).toBe(204); // Verifica che lo status code sia 204
    console.log(await response.json()); // Stampa il corpo della risposta in formato JSON
});


//comando per eseguire il test:  npx playwright test crud_api.spec.js/API_POST_Request 
//comando per eseguire il test:  npx playwright test crud_api.spec.js/API_PUT_Request
//comando per eseguire il test:  npx playwright test crud_api.spec.js/API_GET_Request
//comando per eseguire il test:  npx playwright test crud_api.spec.js/API_DELETE_Request