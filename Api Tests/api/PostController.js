export class PostController {
	constructor(request) {
    	this.request = request;
  	}

  	async creaPost(dati) {
    	return await this.request.post('/posts', {
      		data: dati
    	});
  	}

  	async ottieniPost(id) {
    	return await this.request.get(`/posts/${id}`);
  	}

  	async eliminaPost(id) {
    	return await this.request.delete(`/posts/${id}`);
  	}
}