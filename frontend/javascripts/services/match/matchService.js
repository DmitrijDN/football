require('../../app/app');

(function() {
	'use strict';

	angular
		.module('football-app')
		.factory('MatchService', MatchService);

	MatchService.$inject = [

	];

	function MatchService() {
		var service = {
			randomTeamsDraw: randomTeamsDraw
		};

		function randomTeamsDraw(players, teamsCount) {
			if (!players || !players.length || teamsCount < 2) return null;
			var teams = [];
			while (players.length) {
				var j = 0;
				while (j < teamsCount && players.length) {
					var index = Math.floor(Math.random() * players.length);
					if (!teams[j]) teams[j] = [];
					if (players[0]) {
						teams[j++].push(players[index]);
						players.splice(index, 1);
					}
				}
			}
			if (!teams.length) return null;
			var result = [];
			for (var i = 0; i < teams.length; i++) {
				result.push({
					name: 'Team ' + String.fromCharCode(65 + i),
					players: teams[i]
				});
			}
			return result;
		}

		return service;
	}
})();