var Promise = require('promise');
var util = require('./util.js');

var db = require('../services/database.js');
var Message = db.model('messages', {
	cast_id: String,
  message: String
});

module.exports = {
  findEmpty: () => {
    return new Promise((resolve, reject) => {
      Message.find({cast_id: null}, (err, objs) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(objs);
  		});
    });
  },

  update: (message) => {
    return util.update(message, Message);
  },

  delete: (message_id) => {
    return util.delete(message_id, Message);
  }
};
