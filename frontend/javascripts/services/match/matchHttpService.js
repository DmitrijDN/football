require('../../app/app');

(function() {
	'use strict';

	angular
		.module('football-app')
		.factory('MatchHttpService', MatchHttpService);

	MatchHttpService.$inject = [
		'HttpService'
	];

	function MatchHttpService(httpService) {
		var service = {
				addItem: addItem,
				getAllItemsSortedByDate: getAllItemsSortedByDate,
				getUncountedMatches: getUncountedMatches,
				removeItem: removeItem,
				updateItem: updateItem
			},
			baseUrl = './api/realfootball/match/';

		function addItem(body, successCallback) {
			httpService.sendHttpRequest({
				type: 'POST',
				url: baseUrl,
				body: body,
				errorMessageToDev: 'SAVE MATCH ERROR: ',
				errorMessageToUser: 'Failed save match',
				successCallback: successCallback
			});
		}

		function getAllItemsSortedByDate(successCallback) {
			httpService.sendHttpRequest({
				type: 'GET',
				url: baseUrl,
				errorMessageToDev: 'GET ALL MATCHES ERROR: ',
				errorMessageToUser: 'Failed get matches',
				successCallback: successCallback,
				notFoundMessage: 'There are no matches yet'
			});
		}

		function getUncountedMatches(successCallback) {
			httpService.sendHttpRequest({
				type: 'GET',
				url: baseUrl + 'uncounted',
				errorMessageToDev: 'GET UNCOUNTED MATCHES ERROR: ',
				errorMessageToUser: 'Failed get uncounted matches',
				notFoundMessage: 'All matches are counted',
				successCallback: successCallback
			});
		}

		function removeItem(id, successCallback) {
			httpService.sendHttpRequest({
				type: 'DELETE',
				url: baseUrl + id,
				errorMessageToDev: 'REMOVE MATCH ERROR: ',
				errorMessageToUser: 'Failed remove match',
				successCallback: successCallback,
			});
		}

		function updateItem(body, successCallback) {
			httpService.sendHttpRequest({
				type: 'PUT',
				url: baseUrl,
				body: body,
				errorMessageToDev: 'UPDATE MATCH PROPERTY ERROR: ',
				errorMessageToUser: 'Failed update match property',
				successCallback: successCallback
			});
		}

		return service;
	}
})();