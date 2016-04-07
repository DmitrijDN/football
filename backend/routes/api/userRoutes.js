var apiResponse = require('express-api-response'),
	baseUrl = '/api/user/',
	userRepository = require('../../repositories/userRepository'),
	userService = require('../../services/userService');

module.exports = function(app) {

	app.get(baseUrl, function(req, res, next) {
		userRepository.getAll(function(err, data) {
			for (var i = 0; i < data.length; i++) {
				data[i] = data[i].toObject();
			}
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get(baseUrl + 'sortedByName', function(req, res, next) {
		userRepository.getAllSortedByFirstName(function(err, data) {
			for (var i = 0; i < data.length; i++) {
				data[i] = data[i].toObject();
			}
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post(baseUrl, function(req, res, next) {
		userService.addItem(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put(baseUrl, function(req, res, next) {
		userService.updateItem(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete(baseUrl + ':id', function(req, res, next) {
		userRepository.removeById(req.params.id, function(err, data) {
			console.log('DATA', data);
			console.log('err', err);
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};