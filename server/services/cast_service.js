var Promise = require('promise');
var util = require('./util.js');

var db = require('../services/database.js');
var Cast = db.model('casts', {
	name: String,
  delay: Number
});

module.exports = {
	findAll: () => {
    return util.findAll(Cast);
	},

  update: (cast) => {
    return util.update(cast, Cast);
  },

  delete: (castId) => {
    return util.delete(castId, Cast);
  }
}
