var async = require('async'),
	checkService = require('./checkService'),
	matchRepository = require('../repositories/matchRepository'),
	userRepository = require('../repositories/userRepository');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.changeUsersBalance = changeUsersBalance;
UserService.prototype.updateItem = updateItem;

function addItem(body, callback) {
	if (!body.firstName && !body.lastName) {
		callback({
			message: 'Name isn\'t defined'
		}, null);
		return;
	}
	body.balance = 0;
	userRepository.add(body, callback);
}

function changeUsersBalance(body, callback) {
	if (checkService.checkIfBodyExists(body, callback) && checkService.checkIfVariableExist(body.matchId, 'matchId', callback) &&
		checkService.checkIfVariableExist(body.value, 'value', callback)) {
		if (!body.userIds || !body.userIds.length) {
			callback({
				message: 'users are not defined'
			}, null);
			return;
		}

		async.waterfall([function(callback) {
			userRepository.updateUsersBalance(body.userIds, 0 - body.value, callback);
		}, function(data, callback) {
			matchRepository.setAsCountedMatch(body.matchId, callback);
		}], callback);
	}
}

function updateItem(body, callback) {
	if (checkService.checkIfBodyExists(body, callback) && checkService.checkBodyProperty(body, '_id', callback) &&
		checkService.checkBodyProperty(body, 'dataToUpdate', callback)) {
		userRepository.updatePropertiesByIdAndReturn(body._id, body.dataToUpdate, callback);
	}
}

module.exports = new UserService();