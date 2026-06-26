import {test,expect} from '@playwright/test';

test("Test Post API",async function({request}){ //invia richiesta post per autenticazione

    const authdata = { //dati di autenticazione
        username:"admin",
        password:"password123"
    };
    const response = await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":"application/json"},data:authdata}) //invio richiesta post con header e dati
    console.log(response.status());

    const responseData = await response.body(); //ottenere il corpo della risposta
    expect(responseData.token).not.toBeNull(); //verificare che il token non sia nullo

})
test("Post Call Example with BookingID",async function({request}){ //invia richiesta post per creare una prenotazione

    const bookingData = {
        firstname:"Jim",
        lastname:"Brown",
        totalprice:111,
        depositpaid:true,
        bookingdates:{
            checkin:"2018-01-01",
            checkout:"2019-01-01"
        },
        additionalneeds:"Breakfast"
    };
    const response = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":"application/json"},data:bookingData}) //invio richiesta post con header e dati
    console.log(response.status()); //stampa lo stato della risposta

    const responseData = await response.json(); //ottenere il corpo della risposta in formato json

    console.log(responseData); //stampa i dati della risposta

    expect(responseData.bookingid).not.toBeNull(); //verificare che l'ID della prenotazione non sia nullo
    expect(responseData.booking.firstname).toBe(bookingData.firstname); //verificare che il nome corrisponda

})


//comando per effettuare test sul singolo file:     npx playwright test postcall.spec.js