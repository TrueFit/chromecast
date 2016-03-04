// import
import axios from 'axios';

// export
export default class Http {
  constructor() {
    this.ROOT_URL = "http://localhost:3005/api";
  }

  get(relativeUrl) {
    return axios.get(`${this.ROOT_URL}/${relativeUrl}`);
  }

  put(relativeUrl, body) {
    return axios.put(`${this.ROOT_URL}/${relativeUrl}`, body);
  }

  post(relativeUrl, body) {
    return axios.post(`${this.ROOT_URL}/${relativeUrl}`, body);
  }

  delete(relativeUrl) {
    return axios.delete(`${this.ROOT_URL}/${relativeUrl}`);
  }
}
