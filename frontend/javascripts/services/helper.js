var app = require('../app/app');

(function() {
	'use strict';

	app.factory('Helper', Helper);

	Helper.$inject = [

	];

	function Helper() {
		var service = {
			expandCollapseDetails: expandCollapseDetails,
			removeItemFromArrayById: removeItemFromArrayById
		};

		function expandCollapseDetails(item) {
			item.showDetails = !item.showDetails;
		}

		function removeItemFromArrayById(array, id) {
			if (!id || !array || !array.length) return null;
			var iterationsCount = array.length;

			for (var i = 0; i < iterationsCount; i++) {
				if (array[i]._id === id) {
					array.splice(i, 1);
					break;
				}
			}
		}

		return service;
	}
})();