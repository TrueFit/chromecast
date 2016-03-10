var messageService = require('../services/message_service.js');

module.exports = (router) => {
	router.get('/messages/empty', (req, res) => {
    messageService.findEmpty().then((messages) => {
      res.json(messages);
    }).catch((err) => {
      next(err);
    });
  });

  router.post('/messages', (req, res) => {
    messageService.update(req.body).then((message) => {
      res.json(message);
    }).catch((err) => {
      next(err);
    });
  });

  router.delete('/messages/:messages_id', (req, res) => {
    messageService.delete(req.params.messages_id).then(() => {
      res.json({});
    }).catch((err) => {
      next(err);
    });
  });

}
