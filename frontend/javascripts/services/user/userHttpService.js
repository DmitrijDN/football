var app = require('../../app/app');

(function() {
	'use strict';

	app.factory('UserHttpService', UserHttpService);

	UserHttpService.$inject = [
		'HttpService'
	];

	function UserHttpService(httpService) {
		var service = {
				addItem: addItem,
				changeUsersBalance: changeUsersBalance,
				getAllItems: getAllItems,
				getAllItemsSortedByName: getAllItemsSortedByName,
				removeItem: removeItem,
				updateItem: updateItem
			},
			baseUrl = './api/user/';

		function addItem(item, successCallback) {
			httpService.sendHttpRequest({
				type: 'POST',
				url: baseUrl,
				body: item,
				errorMessageToDev: 'ADD NEW USER ERROR: ',
				errorMessageToUser: 'Failed add new user',
				successCallback: successCallback
			});
		}

		function changeUsersBalance(body, successCallback) {
			httpService.sendHttpRequest({
				type: 'PUT',
				url: baseUrl + 'changeBalance',
				body: body,
				errorMessageToDev: 'CHANGE USERS BALANCE ERROR: ',
				errorMessageToUser: 'Failed change users balance',
				successCallback: successCallback
			});
		}

		function getAllItems(successCallback) {
			httpService.sendHttpRequest({
				type: 'GET',
				url: baseUrl,
				errorMessageToDev: 'GET ALL USERS ERROR: ',
				errorMessageToUser: 'Failed get users',
				notFoundMessage: 'There are no users yet',
				successCallback: successCallback
			});
		}

		function getAllItemsSortedByName(successCallback) {
			httpService.sendHttpRequest({
				type: 'GET',
				url: baseUrl + 'sortedByName',
				errorMessageToDev: 'GET ALL USERS ERROR: ',
				errorMessageToUser: 'Failed get users',
				notFoundMessage: 'There are no users yet',
				successCallback: successCallback
			});
		}

		function removeItem(id, successCallback) {
			httpService.sendHttpRequest({
				type: 'DELETE',
				url: baseUrl + id,
				errorMessageToDev: 'REMOVE USER ERROR: ',
				errorMessageToUser: 'Failed remove user',
				successCallback: successCallback
			});
		}

		function updateItem(body, successCallback, errorCallback) {
			httpService.sendHttpRequest({
				type: 'PUT',
				url: baseUrl,
				body: body,
				errorMessageToDev: 'UPDATE USER PROEPRTY ERROR: ',
				errorMessageToUser: 'Failed update user',
				successCallback: successCallback,
				errorCallback: errorCallback
			});
		}

		return service;
	}
})();