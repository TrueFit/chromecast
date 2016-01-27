class ApiService extends Service {
  defineInjections() {
    super.defineInjections();

    this.addInjections(['$http']);
  }

  get(url) {
    return this.$q((resolve, reject) => {
      this.$http.get(url).then((response) => {
        if (response.status / 100 == 2) {
          resolve(response.data);
        }
        else {
          reject(response);
        }
      }, (response) => { reject(response); });
    });
  }
}
