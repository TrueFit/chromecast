// This file configures a web server for testing the production build
// on your local machine.

var browserSync = require('browser-sync');

// Run Browsersync
browserSync({
  port: 8080,
  ui: {
    port: 8081
  },
  server: {
    baseDir: '../release'
  },

  files: [
    'src/*.html'
  ]
});
