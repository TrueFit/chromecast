import urljoin from 'url-join';

const Client = require('castv2-client').Client;
const Web = require('castv2-web').Web;

export default (url, cast) => {
  return new Promise((resolve, reject) => {
    const client = new Client();
    client.connect(cast.address, () => {
      client.launch(Web, (err, manager) => {
        if (err) {
          reject(err);
          return;
        }

        const target = urljoin(url, '/play/', cast.name);
        manager.load(target);

        resolve();
      });
    });
  });
};
