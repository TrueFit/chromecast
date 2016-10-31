export default (timeout) => {
  const casts = [];

  return new Promise((resolve, reject) => {
    // look for the specified timeout
    setTimeout(() => {
      resolve(casts);
    }, timeout);

    try {
      // start the process
      var mdns = require('mdns');
      var browser = mdns.createBrowser(mdns.tcp('googlecast'));
      browser.on('serviceUp', (service) => {
        console.log(service);
        casts.push({
          name: service.txtRecord.fn,
          address: service.addresses[0],
          port: service.port
        });

        browser.stop();
      });
      browser.start();
    } catch (e) {
      reject(e);
    }
  });
};
