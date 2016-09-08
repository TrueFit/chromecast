export default (timeout) => {
  const casts = [];

  return new Promise((resolve) => {
    // look for the specified timeout
    setTimeout(() => {
      resolve(casts);
    }, timeout);

    // start the process
    var mdns = require('mdns');
    var browser = mdns.createBrowser(mdns.tcp('googlecast'));
    browser.on('serviceUp', (service) => {
      console.log('found device "%s" at %s:%d', service.name, service.addresses[0], service.port);

      casts.push({
        name: service.name,
        address: service.addresses[0],
        port: service.port
      });

      browser.stop();
    });
    browser.start();
  });
};
