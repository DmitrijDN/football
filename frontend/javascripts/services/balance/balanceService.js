require('../../app/app');

(function() {
	'use strict';

	angular
		.module('football-app')
		.factory('BalanceService', BalanceService);

	BalanceService.$inject = [

	];

	function BalanceService() {
		var service = {
			changeUsersBalance: changeUsersBalance,
			countTotalBalance: countTotalBalance
		};

		function changeUsersBalance(users, userIdsToChange, value) {
			if (!users || !users.length || !userIdsToChange || !userIdsToChange.length || !value) return;

			var iterationsCount = users.length;
			for (var i = 0; i < iterationsCount; i++) {
				if (userIdsToChange.indexOf(users[i]._id) !== -1) users[i].balance -= value;
			}
		}


		function countTotalBalance(users) {
			if (!users || !users.length) return 0;
			var iterationsCount = users.length,
				result = 0;
			for (var i = 0; i < iterationsCount; i++) {
				var userBalance = parseInt(users[i].balance);
				result += isNaN(userBalance) ? 0 : userBalance;
			}
			return result;
		}
		return service;
	}
})();