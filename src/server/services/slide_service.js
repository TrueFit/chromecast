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
	},

  update: function(slide, callback) {
    var updateSlide = (obj) => {
      for (var prop in slide) {
        obj[prop] = slide[prop];
      }

      obj.save((err) => {
        if (err) {
          console.log(err);
          throw err;
        }

        callback(obj);
      });
    };

    if (slide._id) {
      Slide.findOne({_id: slide._id}, (err, obj) => {
        if (err) {
          console.log(err);
          throw err;
        }

        updateSlide(obj);
      });
    }
    else {
      var obj = new Slide();
      updateSlide(obj);
    }
  }
}
