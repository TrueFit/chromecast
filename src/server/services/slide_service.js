var db = require('../services/database.js')
var Slide = db.model('slides', {
	name: String,
	order: Number,
  active: Boolean,
  text: String,
  backgroundColor: String,
  image: String
});

module.exports = {
	findAll: function(callback) {
		Slide.find({}, function(err, slides) {
      if (err) {
        console.log(err);
      }

			callback(err ? [] : slides);
		});
	}
}
