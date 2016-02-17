module.exports = function(router) {
	router.get('/test', function(req, res) {
		res.json({msg: "I'm alive"});
	});
}
