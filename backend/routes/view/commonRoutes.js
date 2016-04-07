var apiResponse = require('express-api-response'),
	injectedData = require('../../middleware/injectedDataMiddleware');

module.exports = function(app) {
	app.get('/', function(req, res, next) {
		console.log('Default Route');
		injectedData(req, res, {}, false);
	}, apiResponse);
};