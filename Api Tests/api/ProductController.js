export class ProductController {
  constructor(request) {
    this.request = request;
  }

  async createProduct(payload) { // payload è un oggetto con i dati del prodotto da creare
    return await this.request.post('/products', { // Endpoint per creare un prodotto
      data: payload // Invia i dati del prodotto come corpo della richiesta
    });
  }

  async getProduct(id) {
    return await this.request.get(`/products/${id}`); // Endpoint per ottenere i dettagli di un prodotto specifico
  }

  async deleteProduct(id) {
    return await this.request.delete(`/products/${id}`); // Endpoint per eliminare un prodotto specifico
  }
}