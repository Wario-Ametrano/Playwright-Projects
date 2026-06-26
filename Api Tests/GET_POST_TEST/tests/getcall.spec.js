import {test,expect} from '@playwright/test';

test("Test Get API",async function({request}){
    const resp =  await request.get("https://jsonplaceholder.typicode.com/posts/1") //invio richiesta get

    const respbody = await resp.body(); //ottenere il corpo della risposta
    const respheaders = resp.headers(); //ottenere le intestazioni della risposta
    const respjson = await resp.json(); //ottenere il corpo della risposta in formato json
    const respstatus = resp.status(); //ottenere lo stato della risposta
    const respstatustext = resp.statusText(); //ottenere il testo dello stato della risposta
    const respheadersarray = resp.headersArray(); //ottenere le intestazioni della risposta come array
    console.log(respstatustext); //stampa il testo dello stato della risposta
    //console.log(respbody);
    //console.log(respstatus);
    // console.log(respjson);
    //console.log(respheaders);
    //console.log(respheadersarray);
    expect(respstatus).toBe(200); //verificare che lo stato della risposta sia 200
    expect(respstatustext).toBe("OK"); //verificare che il testo dello stato della risposta sia OK
    expect(resp.ok()).toBeTruthy(); //verificare che la risposta sia ok
    expect(respjson).toHaveProperty("userId",1); //verificare che la proprietà userId sia 1
    expect(respjson).toHaveProperty("id",1); //verificare che la proprietà id sia 1
    expect(respjson).toHaveProperty("title","sunt aut facere repellat provident occaecati excepturi optio reprehenderit"); //verificare che la proprietà title sia corretta e che corrisponda
    expect(respjson.body).toContain("quia et suscipit"); //verificare che il corpo della risposta contenga la stringa specificata
});


//comando per effettuare test sul singolo file:     npx playwright test getcall.spec.js 