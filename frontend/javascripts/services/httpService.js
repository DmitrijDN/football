var app = require('../app/app');

(function() {
	'use strict';

	app.factory('HttpService', HttpService);

	HttpService.$inject = [
		'$http'
	];

	function HttpService($http) {
		var service = {
			sendHttpRequest: sendHttpRequest
		};

		/* 
			object: {
				type: request type (get, post, put, delete),
		 		url: request url
		 		body: data which will send in request body
		 		successMessageToUser: message which will shown to user in case, when request was successful
		 		errorMessageToDev: message which will mark error in console
		 		errorMessageToUser: message which will be shown to user when error occured
		 		successCallback: callback if query returned data
		 		errorCallback: callback if error occured,
		 		notFoundMessage: mesasge if no entities were found
		 */
		function sendHttpRequest(object) {
			alertify.logPosition('bottom right');
			if (typeof object.url !== 'string' || object.url === undefined || object.url.length === 0) {
				alertify.error('HTTP REQUEST ERROR: REQUEST URL IS ABSENT');
				return;
			}

			if (typeof object.type !== 'string' || object.type === undefined || object.type.length === 0) {
				alertify.error('HTTP REQUEST ERROR: REQUEST TYPE IS ABSENT');
				return;
			}
			switch (object.type.toLowerCase()) {
				case 'get':
					$http.get(object.url).then(successfullRequest).catch(failedRequest);
					break;
				case 'post':
					$http.post(object.url, object.body).then(successfullRequest).catch(failedRequest);
					break;
				case 'put':
					$http.put(object.url, object.body).then(successfullRequest).catch(failedRequest);
					break;
				case 'delete':
					$http.delete(object.url).then(successfullRequest).catch(failedRequest);
					break;
				default:
					alertify.error('Неверные параметры для запроса');
			}

			function successfullRequest(response) {
				if (object.type.toLowerCase() === 'put' || object.type.toLowerCase() === 'delete') {

				}
				if (object.successMessageToUser !== undefined && object.successMessageToUser.length > 0) {
					alertify.success(object.successMessageToUser);
				}
				if (object.successCallback !== null && object.successCallback !== undefined) {
					object.successCallback(response.data);
				}
			}

			function failedRequest(error) {
				if (error.status === 403) {
					handleForbidden(error.data);
					return null;
				}
				if (object.errorMessageToDev !== undefined && object.errorMessageToDev.length > 0) {
					if (error.data && typeof error.data === 'object' && error.data.message) console.log(object.errorMessageToDev + ' ' + error.data.message);
					else if (typeof error.data === 'string') console.log(object.errorMessageToDev + ' ' + error.data);
				}
				if (object.errorMessageToUser) {
					if (error.status === 404 && (typeof error.data === 'string' && error.data.indexOf('Cannot GET /api/') === -1)) {
						if (object.notFoundMessage) {
							alertify.log(object.notFoundMessage);
						} else {
							alertify.error(object.errorMessageToUser);
						}
					} else {
						alertify.error(object.errorMessageToUser);
					}
				}
				if (object.errorCallback !== null && object.errorCallback !== undefined) {
					object.errorCallback(error);
				}
			}

			function handleForbidden(data) {
				if (data.message) {
					switch (data.message.toLowerCase()) {
						case 'license expired':
							licenseService.expiredOn = data.expired;
							$location.url('/license');
							break;
						case 'not authorized':
							$location.url('/login');
							break;
						case 'lack of rights to update data':
							alertify.error('You haven\'t got enough rights to update data');
							break;
					}
				}
				console.log(data);
			}
		}

		return service;
	}
})();