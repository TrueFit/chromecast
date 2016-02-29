var Promise = require('promise');
var util = require('./util.js');

var db = require('../services/database.js');
var Cast = db.model('casts', {
	name: String
});

module.exports = {
	findAll: function() {
    return new Promise((resolve, reject) => {
      Cast.find({}, function(err, casts) {
        if (err) {
          reject(err);
          return;
        }

        resolve(casts);
  		});
    });
	},

  update: function(cast) {
    return util.update(cast, Cast);
  }
}
