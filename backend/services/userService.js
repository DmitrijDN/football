var checkService = require('./checkService'),
	userRepository = require('../repositories/userRepository');

function UserService() {

}

UserService.prototype.addItem = addItem;
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

function updateItem(body, callback) {
	if (checkService.checkIfBodyExists(body, callback) && checkService.checkBodyProperty(body, '_id', callback) &&
		checkService.checkBodyProperty(body, 'dataToUpdate', callback)) {
		userRepository.updatePropertiesById(body._id, body.dataToUpdate, callback);
	}
}

module.exports = new UserService();