var Promise = require('promise');

module.exports = {
  update(object, type) {
    return new Promise((resolve, reject) => {
      var perform = (obj) => {
        for (var prop in object) {
          obj[prop] = object[prop];
        }

        obj.save((err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(obj);
        });
      };

      if (object._id) {
        type.findOne({_id: object._id}, (err, obj) => {
          if (err) {
            reject(err);
            return;
          }

          perform(obj);
        });
      }
      else {
        perform(new type());
      }
    });
  }
};
