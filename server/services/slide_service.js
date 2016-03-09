var Promise = require('promise');
var util = require('./util.js');

var db = require('../services/database.js')
var Slide = db.model('slides', {
  cast_id: String,
  name: String,
  file: String,
  public_id: String,
  sort: Number
});

module.exports = {
  findAll: () => {
    return util.findAll(Slide);
	},

  update: (slide) => {
    return util.update(slide, Slide);
  },

  delete: (slideId) => {
    return util.delete(slideId, Slide);
  }
}
