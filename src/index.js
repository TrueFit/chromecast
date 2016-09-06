import zenExpress from 'zen-express';

zenExpress({
  port: process.env.PORT || 4200,

  spa: {
    path: `${__dirname}/client`,
    index: 'index.html'
  },

  db: {
    type: 'mongo',
    connection: 'mongodb://truefit:rWQx8ND0CA1tZ0C2Nl0Zt@ds019956.mlab.com:19956/chromecast-v2'
  },
});
