var Promise = require('promise');
var util = require('./util.js');

var db = require('../services/database.js')
var Slide = db.model('slides', {
  cast_id: String,
  name: String,
  file: String
});

module.exports = {
  findAll: () => {
    return util.findAll(Slide);
	},

  update: (slide) => {
    console.log(slide);
    return util.update(slide, Slide);
  },

  delete: (slideId) => {
    return util.delete(slide, Slide);
  }
}
