var Promise = require('promise');
var util = require('./util.js');

var db = require('../services/database.js');
var Cast = db.model('casts', {
	name: String,
  delay: Number,
  update: Date
});

var castService = {
  findOne: (cast_id) => {
    return util.findOne(cast_id, Cast);    
  },

	findAll: () => {
    return util.findAll(Cast);
	},

  update: (cast) => {
    cast.update = new Date();
    return util.update(cast, Cast);
  },

  tickCastUpdate: (cast_id) => {
    // whole point is to just update the update field
    return new Promise((resolve, reject) => {
      util.findOne(cast_id, Cast).then((cast) => {
        castService.update(cast).then((cast) => {
          resolve(cast);
        }).catch(err => resolve(err));
      }).catch(err => resolve(err));
    });
    return
  },

  delete: (castId) => {
    return util.delete(castId, Cast);
  }
};

module.exports = castService;
