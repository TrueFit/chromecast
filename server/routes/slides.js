var slideService = require('../services/slide_service.js');
var castService = require('../services/cast_service.js');
var multer = require('multer');
var upload = multer({dest:'./release/images/'});
var fs = require('fs');
var cloudinary = require('cloudinary');

cloudinary.config({
 cloud_name: 'hfzhbyr9l',
 api_key: '162493363329393',
 api_secret: 'uRhsAPnUQxNrEby9J-eRQLyeALs'
});

module.exports = (router) => {
  router.get('/slides', (req, res) => {
    slideService.findAll().then((slides) => {
      res.json(slides);
    }).catch((err) => {
      next(err);
    });
  });

  router.post('/slides', upload.any(), (req, res, next) => {
    // update logic
    var updateSlide = (slide) => {
      Promise.all([
        slideService.update(slide),
        castService.tickCastUpdate(slide.cast_id)
      ]).then((data) => {
        res.json(data[0]);
      }).catch((err) => {
        next(err);
      });
    };

    // capture object
    var s = {
      type: 'Image',
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
      var opts = null;
      if (req.body.public_id) {
        opts = {
          public_id: req.body.public_id
        };
      }

      var file = req.files[0];
      cloudinary.uploader.upload(file.path, (result) => {
        if (fs.exists(file.path)) {
          fs.unlink(file.path);
        }

        s.file = result.secure_url;
        s.public_id = result.public_id;
        updateSlide(s);
      }, opts);
    }
    else {
      updateSlide(s);
    }
  });

  router.delete('/slides/:slide_id', (req, res) => {
    slideService.delete(req.params.slide_id).then(() => {
      res.json({});
    }).catch((err) => {
      next(err);
    });
  });
}
