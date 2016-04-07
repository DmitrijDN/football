var apiResponse = require('express-api-response'),
	baseUrl = '/api/realfootball/match/',
	matchRepository = require('../../repositories/matchRepository'),
	matchService = require('../../services/matchService');

module.exports = function(app) {
	app.get(baseUrl + 'uncounted', function(req, res, next) {
		matchRepository.getAllUncountedMatches(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get(baseUrl, function(req, res, next) {
		matchRepository.getAllItemsSortedByDate(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.post(baseUrl, function(req, res, next) {
		matchService.addItem(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put(baseUrl, function(req, res, next) {
		matchService.updateItem(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete(baseUrl + ':id', function(req, res, next) {
		matchRepository.removeById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};