require("use-strict");

var express = require('express');
var app = express();
var router = express.Router();
var busboy = require('connect-busboy');
var path = require('path');

// allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// configure to use busboy
app.use(busboy({ immediate: true }));

// load routes
var glob = require('glob');
glob('./server/routes/*.js', function(er, files) {
  if (er) {
    console.log(er);
    return;
  }

  for (var i = 0; i < files.length; i++) {
    require(files[i])(router);
  }
});
app.use('/api', router);

// map to the angular app
app.use(express.static(__dirname + '/release'));
app.get('*', function(req, res) {
	res.status(200).sendFile(path.join(__dirname + '/release/index.html'));
});

// launch server
app.listen(process.env.PORT || 3005);
