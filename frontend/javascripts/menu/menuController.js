var app = require('../app/app');

(function() {
	'use strict';

	app.controller('MenuController', MenuController);

	MenuController.$inject = [
		'$location'
	];

	function MenuController($location) {
		var vm = this;

		vm.changeLocation = changeLocation;
		vm.setSelectedMenuItem = setSelectedMenuItem;

		vm.links = [{
			text: 'Real Football',
			subitems: [{
				text: 'Matches',
				link: '/realfootball/match'
			}, {
				text: 'Balance',
				link: '/realfootball/balance'
			}],
			isActive: false,
			alias: 'real football'
		}, {
			text: 'FIFA',
			subitems: [{
				text: 'Tournaments',
				link: '/fifa/tournament'
			}, {
				text: 'Statistic',
				link: '/fifa/statistic'
			}],
			isActive: false,
			alias: 'fifa'
		}];

		function changeLocation(link, locactionObj) {
			if (link) {
				if (link.indexOf('logout') !== -1) {
					MenuHttpService.logoutRequest();
				} else {
					if ($location.$$url.indexOf(link) !== -1) {
						link = $location.$$url;
					}
					if (link.indexOf('bid') !== -1 || link.indexOf('opportunity') !== -1 || link.indexOf('client') !== -1 || link.indexOf('property') !== -1 || link.indexOf('manager') !== -1) {
						var entity = link.replace(/\//g, '');
						if (entity.indexOf('?') !== -1) {
							entity = entity.substr(0, entity.indexOf('?'));
						}
						var id = navigationService.navObject[entity] ? navigationService.navObject[entity].currentId : null;
						if (id && $routeParams.id !== id) {
							link += '?id=' + id;
						}
					}
					$location.url(link);
				}
			}
		}

		function setSelectedMenuItem() {
			var path = $location.$$path.substr(1);
			for (var i = 0; i < vm.links.length; i++) {
				if (path.indexOf(vm.links[i].alias) !== -1) {
					tempActive.isActive = false;
					tempActive = vm.links[i];
					tempActive.isActive = true;
				}
			}
		}
	}
})();