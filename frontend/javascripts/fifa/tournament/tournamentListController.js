require('../../app/app');

(function() {
	'use strict';

	angular
		.module('football-app')
		.controller('TournamentListController', TournamentListController);

	TournamentListController.$inject = [

	];

	function TournamentListController() {
		var vm = this;
	}
})();