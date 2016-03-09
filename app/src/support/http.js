// import
import axios from 'axios';
import { ROOT_URL } from '../support';

// export
export default class Http {
  constructor() {
    this.ROOT_URL = `${ROOT_URL}/api`;
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

  postFile(relativeUrl, data) {
    return axios.post(`${this.ROOT_URL}/${relativeUrl}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  delete(relativeUrl) {
    return axios.delete(`${this.ROOT_URL}/${relativeUrl}`);
  }
}
