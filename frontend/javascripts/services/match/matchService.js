var app = require('../../app/app');

(function() {
	'use strict';

	app.factory('MatchService', MatchService);

	MatchService.$inject = [

	];

	function MatchService() {
		var service = {
				generateEqualTeams: generateEqualTeams,
				randomTeamsDraw: randomTeamsDraw,
			},
			_ = require('underscore');

		function generateEqualTeams(players, teamsCount) {
			var sortedByTotal = _.sortBy(players, 'totalCharacteristic'),
				teams = [],
				i = 0,
				j = 0,
				guysToRandom = [];

			sortedByTotal = sortedByTotal.reverse();

			for (i = 0; i < teamsCount; i++) {
				teams.push({
					players: [],
					totalStrength: 0,
					physic: 0,
					pass: 0,
					attack: 0,
					defend: 0,
				});
			}

			while (sortedByTotal.length) {
				guysToRandom = [];
				for (i = 0; i < teamsCount; i++) {
					if (sortedByTotal[i]) {
						guysToRandom.push(sortedByTotal[i]);
					} else break;
				}
				for (j = 0; j < teamsCount; j++) {
					if (!guysToRandom.length) break;
					var index = 0;
					if (guysToRandom.length > 1) index = Math.floor(Math.random() * teamsCount);
					teams[j].players.push(guysToRandom[index]);
					var strength = guysToRandom[index].totalCharacteristic;
					var physic = guysToRandom[index].physic;
					var pass = guysToRandom[index].pass;
					var attack = guysToRandom[index].attack;
					var defend = guysToRandom[index].defend;
					teams[j].totalStrength += !isNaN(strength) ? strength : 0;
					teams[j].physic += !isNaN(physic) ? physic : 0;
					teams[j].pass += !isNaN(pass) ? pass : 0;
					teams[j].attack += !isNaN(attack) ? attack : 0;
					teams[j].defend += !isNaN(defend) ? defend : 0;
					guysToRandom.splice(index, 1);
				}
				for (i = 0; i < teamsCount; i++) sortedByTotal.splice(0, 1);
			}

			var result = [];
			for (i = 0; i < teams.length; i++) {
				result.push({
					name: 'Team ' + String.fromCharCode(65 + i),
					players: teams[i].players,
					strength: (teams[i].totalStrength / teams[i].players.length).toFixed(2),
					physic: (teams[i].physic / teams[i].players.length).toFixed(2),
					pass: (teams[i].pass / teams[i].players.length).toFixed(2),
					attack: (teams[i].attack / teams[i].players.length).toFixed(2),
					defend: (teams[i].defend / teams[i].players.length).toFixed(2),
				});
			}
			return result;

		}

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