class SlideService extends ApiService {
  getAll() {
    return super.get('/api/slides');
  }

  post(data) {
    return super.multipart('api/slides', data);
  }
}

SlideService.register();
