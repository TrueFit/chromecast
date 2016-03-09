var Promise = require('promise');

module.exports = {
  findOne: (_id, type) => {
    return new Promise((resolve, reject) => {
      type.findOne({_id: _id}, (err, obj) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(obj);
      });
    });
  },

  findAll: (type) => {
    return new Promise((resolve, reject) => {
      type.find({}, (err, objs) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(objs);
  		});
    });
  },

  update: (object, type) => {
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
  },

  delete: (id, type) => {
    return new Promise((resolve, reject) => {
      type.remove({_id:id}, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
};
