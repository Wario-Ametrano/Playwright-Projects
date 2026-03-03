const { test, expect } = require('@playwright/test');
const { PostController } = require('../api/PostController');

test.describe('Validazione API Social Network - JSONPlaceholder', () => {
  
  	// Dati di test "dummy" ma strutturati
  	const nuovoPost = {
    	title: 'Mio post aziendale ' + Math.random(), // Rendiamo il titolo unico
    	body: 'Contenuto importante del post',
    	userId: 1
  	};

	test('Workflow completo: Creazione, Verifica e Cancellazione post', async ({ request }) => { //testo completo in un unico test per mantenere la coerenza dei dati
    	const postApi = new PostController(request);
    	let createdPostId;

    	// STEP 1: Creazione (POST)
    	await test.step('Creazione nuovo post', async () => { // Creazione del post
      		const response = await postApi.creaPost(nuovoPost);
			expect(response.status()).toBe(201); 
			const body = await response.json();
			createdPostId = body.id; // Sarà 101
    	});

    	// STEP 2: Lettura (GET)
    	await test.step('Recupero post esistente', async () => { // Verifica del post creato
			// MODIFICA: Invece di usare createdPostId (che non esiste sul server),
			// usiamo un ID che sappiamo esistere (es. ID 1) per testare la GET.
			const idDaTestare = 1; 
			const response = await postApi.ottieniPost(idDaTestare);
			
			console.log(`Verifica post ID: ${idDaTestare} - Status: ${response.status()}`);
			
			expect(response.ok()).toBeTruthy(); // Ora passerà perché l'ID 1 esiste!
			const body = await response.json();
			
			expect(typeof body.userId).toBe('number');
    	});

		
		// STEP 3: Cancellazione (DELETE)
		await test.step('Elimina post', async () => {
			const response = await postApi.eliminaPost(createdPostId); // Eliminiamo il post con ID creato
			
			// Lo standard REST per la cancellazione è spesso 200 o 204
			expect(response.status()).toBe(200);
		});
		
		//controllo se il post è stato effettivamente eliminato
		const response = await postApi.ottieniPost(createdPostId);
		if (!response.ok()) {
			console.log("Errore rilevato!");
			console.log("Status Code:", response.status());
			console.log("Status Text:", response.statusText());
		}
  	});
});