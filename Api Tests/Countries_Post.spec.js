import {test,expect} from '@playwright/test';

test.only('Countries API test', async ({request}) => {
    const allCountriesResponse = await request.post('https://countries.trevorblades.com/', { //faccio una POST perchè è un'API GraphQL, e passo la query come data
        data:{
            query:`{             
                countries{
                    code
                    emoji
                    languages{
                        name
                        code
                    }    
                }                 
            }
            `,
        }
    })
    const allCountries = await allCountriesResponse.json(); //trasformo la risposta in json
    expect(allCountries.data.countries).toHaveLength(250); //verifico che la lunghezza dell'array di paesi sia 250, che è il numero totale di paesi nel mondo (secondo questa API)


    const germanyResponse = await request.post('https://countries.trevorblades.com/', { //faccio una POST perchè è un'API GraphQL, e passo la query come data
        data:{
            query:`{             
                countries(filter: { code: { eq: "DE" } }){
                    code
                    emoji
                    languages{
                        name
                        code
                    }    
                }                 
            }
            `,
        }
    })
    const germany = await germanyResponse.json(); 
    expect(germany.data.countries).toHaveLength(1);//verifico che la lunghezza dell'array di paesi sia 1, perchè sto filtrando per codice "DE", che corrisponde alla Germania
    expect(germany.data.countries[0].code).toBe('DE'); //verifico che il codice del paese restituito sia "DE", che corrisponde alla Germania
    console.log(germany);
});



/* QUESTA è LA QUERY CHE HO USATO PER TESTARE L'API CON POSTMAN SENZA USARE PLAYWRIGHT, PER POI TRADURLA IN CODICE NEL TEST 

https://countries.trevorblades.com/

query {
  countries(filter: { code: { eq: "DE" } }) {
    code
    emoji
    languages {
      name
      code
    }
  }
}*/ 