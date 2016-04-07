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
			countTotalBalance: countTotalBalance
		};

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