var slideService = require('../services/slide_service.js');
var fs = require('fs');

// TODO:
var formidable = require('formidable');

module.exports = (router) => {
	router.get('/slides', (req, res) => {
    slideService.findAll((slides) => {
  		res.json(slides);
    });
	});

  router.post('/slides', (req, res) => {
    var slide = {};

    req.busboy.on('file', function (fieldname, file, filename) {
        var fstream = fs.createWriteStream('./release/images/' + filename);
        file.pipe(fstream);

        slide.image = filename;
    });

    req.busboy.on('field', (fieldname, value) => {
      slide[fieldname] = value;
    });

    req.busboy.on('finish', () => {
      slideService.update(slide, (obj) => {
        res.json(obj);
      });
    })

    req.pipe(req.busboy);
  })
}
