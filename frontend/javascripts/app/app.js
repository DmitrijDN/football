var app = (function() {
	'use strict';

	var app = angular.module('football-app', ['ngRoute', 'ui.bootstrap'])
		.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
			$routeProvider
				.when('/fifa/tournament/', {
					templateUrl: './templates/fifa/tournament/tournamentList.html',
					controller: 'TournamentListController',
					controllerAs: 'tournamentCtrl'
				})
				.when('/fifa/statistic/', {
					templateUrl: './templates/fifa/tournament/tournamentStatistic.html',
					controller: 'TournamentStatisticController',
					controllerAs: 'statCtrl'
				})
				.when('/realfootball/balance/', {
					templateUrl: './templates/realfootball/balance/balance.html',
					controller: 'BalanceController',
					controllerAs: 'balanceCtrl'
				})
				.when('/realfootball/match/', {
					templateUrl: './templates/realfootball/match/matchList.html',
					controller: 'MatchListController',
					controllerAs: 'matchCtrl'
				})
				.when('/user/', {
					templateUrl: './templates/user/userList.html',
					controller: 'UserListController',
					controllerAs: 'userCtrl'
				})
				.otherwise({
					redirectTo: '/user'
				});

			$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';
		}]);

		
	return app;
})();

module.exports = app;