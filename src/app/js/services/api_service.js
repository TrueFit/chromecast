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

  multipart(url, data) {
    return this.$q((resolve, reject) => {
      var fd = new FormData();
      for (var prop in data) {
        fd.append(prop, data[prop]);
      }

      var config = {
        headers: {
          'Content-Type': undefined
        }
      };

      this.$http.post(url, fd, config).then((response) => {
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
