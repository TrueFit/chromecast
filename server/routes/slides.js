var slideService = require('../services/slide_service.js');
var multer = require('multer');
var upload = multer({dest:'./release/images/'});

module.exports = (router) => {
  router.get('/slides', (req, res) => {
    slideService.findAll().then((slides) => {
      res.json(slides);
    }).catch((err) => {
      next(err);
    });
  });

  router.post('/slides', upload.any(), (req, res) => {
    var s = {
      cast_id: req.body.cast_id,
      name: req.body.name,
      sort: req.body.sort
    };

    // won't be here if new
    if (req.body._id) {
      s._id = req.body._id;
    }

    // won't be here potentially on update
    if (req.files.length > 0) {
      s.file = req.files[0].filename
    }

    slideService.update(s).then((slide) => {
      res.json(slide);
    }).catch((err) => {
      next(err);
    });
  });

  router.delete('/slides/:slide_id', (req, res) => {
    slideService.delete(req.params.slide_id).then(() => {
      res.json({});
    }).catch((err) => {
      next(err);
    });
  });
}
