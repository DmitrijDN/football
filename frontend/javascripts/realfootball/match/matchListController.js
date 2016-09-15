var app = require('../../app/app');

(function() {
	'use strict';

	app.controller('MatchListController', MatchListController);

	MatchListController.$inject = [
		'$uibModal',
		'Helper',
		'MatchHttpService'
	];

	function MatchListController($uibModal, helper, matchHttpService) {
		var vm = this;

		vm.addItem = addItem;
		vm.expandCollapseDetails = expandCollapseDetails;
		vm.preventShowDetails = preventShowDetails;
		vm.removeItem = removeItem;
		vm.updateProperty = updateProperty;

		vm.matchList = [];
		vm.showDetails = false;

		function addItem() {
			var modalInstance = $uibModal.open({
				templateUrl: './templates/realfootball/match/createMatch.html',
				controller: 'CreateMatchController',
				controllerAs: 'newMacthCtrl',
				size: 'lg',
				resolve: {

				}
			});

			modalInstance.result.then(function(result) {
				vm.matchList.push(result);
			});
		}

		function expandCollapseDetails(match) {
			helper.expandCollapseDetails(match);
		}

		function preventShowDetails(event) {
			event.stopImmediatePropagation();
		}

		function removeItem(id, event) {
			event.stopImmediatePropagation();
			alertify.confirm('Do you really want to remove current match?', function(doConfirm) {
				if (doConfirm) {
					matchHttpService.removeItem(id, function(data) {
						helper.removeItemFromArrayById(vm.matchList, id);
					});
				}
			});
		}

		function updateProperty(propName, match) {
			if (!propName || !match) {
				alertify.error('Updating parametres are incorrect');
				return null;
			}
			var dataToUpdate = {};
			dataToUpdate[propName] = match[propName];
			matchHttpService.updateItem({
				_id: match._id,
				dataToUpdate: dataToUpdate
			});
		}

		(function() {
			matchHttpService.getAllItemsSortedByDate(function(data) {
				vm.matchList = data;
			});
		})();
	}
})();