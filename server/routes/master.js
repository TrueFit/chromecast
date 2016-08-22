// import
var _ = require('lodash');
var Client = require('castv2-client').Client;
var Web = require('castv2-web').Web;

var casts = [];

// listen to endpoint to connect and launch
module.exports = (router) => {
  router.get('/master-load', (req, res) => {
    // use a headless browser to find the casts
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

    res.json({ result: 'Casts Loaded' });
  });

	router.get('/master', (req, res) => {
    var castName = req.query.c;
    if (!castName) {
      res.json({
        result: 'You need to specify a cast'
      });
      return;
    }

    var cast = _.find(casts, c => c.name === castName);
    if (!cast) {
      res.json({
        result: 'I cant find a cast named ' + castName
      });
      return;
    }

    var client = new Client();
    client.connect(cast.address, () => {
      console.log('Connected to ' + castName);

      client.launch(Web, (err, manager) => {
        if (err) {
          res.json({
            result: 'Error launching site on ' + castName + ': ' + err
          });
          return;
        }

        console.log(castName + ' should be ready');

        manager.load('https://www.npmjs.com/package/castv2-web');

        res.json({
          result: 'Ready'
        });
      });
    });
  });
}
