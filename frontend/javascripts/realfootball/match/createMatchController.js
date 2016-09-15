var app = require('../../app/app');

(function() {
	'use strict';

	app.controller('CreateMatchController', CreateMatchController);

	CreateMatchController.$inject = [
		'$uibModalInstance',
		'MatchHttpService',
		'MatchService',
		'UserHttpService'
	];

	function CreateMatchController($uibModalInstance, matchHttpService, matchService, userHttpService) {
		var vm = this;

		vm.userList = [];
		vm.selectOption = {
			text: 'Select All',
			value: true
		};
		vm.teamsCount = 2;
		vm.teams = [];

		vm.generateTeams = generateTeams;
		vm.saveTeams = saveTeams;
		vm.selectUnselectAll = selectUnselectAll;
		vm.teamsCountChanged = teamsCountChanged;

		(function() {
			userHttpService.getAllItemsSortedByName(function(data) {
				vm.userList = data;
			});
		})();

		function generateTeams() {
			var iterationsCount = vm.userList.length,
				selectedUsers = [];
			for (var i = 0; i < iterationsCount; i++) {
				if (vm.userList[i].isSelected) {
					selectedUsers.push(vm.userList[i]);
				}
			}
			if (selectedUsers.length < 6 || selectedUsers.length / vm.teamsCount < 3) {
				alertify.error('Minimum players for each team should be 3+');
				return null;
			}
			// vm.teams = matchService.randomTeamsDraw(selectedUsers, vm.teamsCount);
			vm.teams = matchService.generateEqualTeams(selectedUsers, vm.teamsCount);

		}

		function saveTeams(teams) {
			if (!teams || !teams.length || teams.length < 2) return null;
			matchHttpService.addItem(teams, function(data) {
				for (var i = 0; i < data.teams.length; i++) {
					for (var j = 0; j < teams.length; j++) {
						if (data.teams[i].name === teams[j].name) {
							data.teams[i].players = teams[j].players;
							break;
						}
					}
				}
				console.log(data);
				$uibModalInstance.close(data);
			});
		}

		function selectUnselectAll(value) {
			var iterationsCount = vm.userList.length;
			for (var i = 0; i < iterationsCount; i++) {
				vm.userList[i].isSelected = value;
			}
			if (value) {
				vm.selectOption = {
					text: 'Unselect All',
					value: false
				};
			} else {
				vm.selectOption = {
					text: 'SelectAll',
					value: true
				};
			}
		}

		function teamsCountChanged(teamsCount) {
			var number = parseInt(teamsCount);
			if (isNaN(number) || number < 2) {
				number = 2;
			}
			vm.teamsCount = number;
		}
	}
})();