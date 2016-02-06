var slideService = require('../services/slide_service.js');
var fs = require('fs');

module.exports = (router) => {
	router.get('/slides', (req, res) => {
    slideService.findAll((slides) => {
  		res.json(slides);
    });
	});

  router.post('/slides', (req, res) => {
    var slide = {};

    // TODO: need to name the file after the id of the object

    req.busboy.on('file', function (fieldname, file, filename) {
        var fstream = fs.createWriteStream('./release/images/' + filename);
        file.pipe(fstream);

        slide.image = filename;
    });

    req.busboy.on('field', (fieldname, value) => {
      slide[fieldname] = value;
    });

    req.busboy.on('finish', () => {
      console.log(slide);

      res.json({});
    })

    req.pipe(req.busboy);
  })
}
