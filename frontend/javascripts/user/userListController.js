var  app = require('../app/app');

(function() {
	'use strict';

	app.controller('UserListController', UserListController);

	UserListController.$inject = [
		'Helper',
		'UserHttpService'
	];

	function UserListController(helper, userHttpService) {
		var vm = this,
			lastAdded = {};

		vm.addItem = addItem;
		vm.removeItem = removeItem;
		vm.updateProperty = updateProperty;

		vm.userList = [];

		(function() {
			userHttpService.getAllItemsSortedByName(function(data) {
				vm.userList = data;
			});
		})();

		function addItem() {
			vm.userList.unshift({});
			lastAdded = vm.userList[0];
		}

		function removeItem(id) {
			alertify.confirm('Do you really wnat remove current user?', function(doConfirm) {
				if (doConfirm) {
					userHttpService.removeItem(id, function() {
						helper.removeItemFromArrayById(vm.userList, id);
					});
				}
			});
		}

		function updateProperty(propName, item) {
			if (!item) return null;
			var dataToUpdate = {};
			if (propName === 'fullName') {
				var splitted = item[propName].split(' ');
				dataToUpdate.firstName = splitted[0] ? splitted[0] : '';
				dataToUpdate.lastName = splitted[1] ? splitted[1] : '';
			} else {
				dataToUpdate[propName] = item[propName];
			}
			if (item._id) {
				userHttpService.updateItem({
					_id: item._id,
					dataToUpdate: dataToUpdate
				});
			} else userHttpService.addItem(dataToUpdate, function(data) {
				for (var prop in data) {
					lastAdded[prop] = data[prop];
				}
			});
		}
	}
})();