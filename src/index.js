import zenExpress from 'zen-express';

zenExpress({
  src: __dirname,
  port: process.env.PORT || 4200,

  spa: {
    path: `${__dirname}/client`,
    index: 'index.html'
  },

  db: {
    type: 'mongo',
    connection: 'mongodb://truefit:rWQx8ND0CA1tZ0C2Nl0Zt@ds019956.mlab.com:19956/chromecast-v2'
  },

  uploads: {
    type: 'file',
    route: '/files',
    path: `${__dirname}/../lib/files`
  },
});
