var castService = require('../services/cast_service.js');

module.exports = (router) => {
	router.get('/casts', (req, res) => {
    castService.findAll().then((casts) => {
  		res.json(casts);
    }).catch((err) => {
      next(err);
    });
	});

  router.post('/casts', (req, res) => {
    castService.update(req.body).then((cast) => {
      res.json(cast);
    }).catch((err) => {
      next(err);
    });
  });

  router.delete('/casts/:cast_id', (req, res) => {
    castService.delete(req.params.cast_id).then(() => {
      res.json({});
    }).catch((err) => {
      next(err);
    });
  });

}
