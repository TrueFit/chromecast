var mongoose = require('mongoose');
var url = 'mongodb://jgretz:rfvTGB123@ds055535.mongolab.com:55535/chromecast';
mongoose.connect(url);

module.exports = mongoose
