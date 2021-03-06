var  app = require('../../app/app');
// var async = require('async');

(function() {
	'use strict';

	app.controller('BalanceController', BalanceController);

	BalanceController.$inject = [
		'$uibModal',
		'BalanceService',
		'Helper',
		'MatchHttpService',
		'UserHttpService'
	];

	function BalanceController($uibModal, balanceService, helper, matchHttpSerivce, userHttpService) {
		var vm = this;

		vm.userList = [];
		vm.totalBalance = 0;

		vm.countMatch = countMatch;
		vm.expandCollapseDetails = expandCollapseDetails;
		vm.updateProperty = updateProperty;

		function countMatch(match, event) {
			event.stopImmediatePropagation();
			var modalInstance = $uibModal.open({
				templateUrl: './templates/realfootball/balance/countMatch.html',
				controller: 'CountMatchController',
				controllerAs: 'countCtrl',
				size: 'lg',
				resolve: {
					matchData: function() {
						return match;
					}
				}
			});

			modalInstance.result.then(function(result) {
				helper.removeItemFromArrayById(vm.uncountedMatches, result.matchId);
				balanceService.changeUsersBalance(vm.userList, result.userIds, result.value);
				vm.totalBalance = balanceService.countTotalBalance(vm.userList);
			});
		}

		function expandCollapseDetails(item) {
			helper.expandCollapseDetails(item);
		}

		function updateProperty(propName, user) {
			if (!propName || !user || !user._id) {
				alertify.error('Updating parametres are incorrect');
				return null;
			}
			var dataToUpdate = {};
			dataToUpdate[propName] = user[propName];
			if (propName === 'balance') vm.totalBalance = balanceService.countTotalBalance(vm.userList);
			userHttpService.updateItem({
				_id: user._id,
				dataToUpdate: dataToUpdate
			});
		}

		(function() {
			// async.parallel({
			// 	getUsers: function(callback) {
			// 		userHttpService.getAllItemsSortedByName(function(data) {
			// 			vm.userList = data;
			// 			vm.totalBalance = balanceService.countTotalBalance(vm.userList);
			// 			callback(null, null);
			// 		});
			// 	},
			// 	getUncountedMatches: function(callback) {
			// 		matchHttpSerivce.getUncountedMatches(function(data) {
			// 			vm.uncountedMatches = data;
			// 		});
			// 	}
			// });
		})();
	}
})();