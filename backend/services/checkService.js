var helper = require('./helper');

function CheckService() {

}

CheckService.prototype.checkIfBodyExists = checkIfBodyExists;
CheckService.prototype.checkBodyProperty = checkBodyProperty;
CheckService.prototype.checkIfVariableExist = checkIfVariableExist;

function checkIfBodyExists(body, callback) {
	if (helper.isEmpty(body)) {
		if (callback) {
			callback({
				message: 'body is empty'
			}, null);
		}
		return false;
	}
	return true;
}

function checkBodyProperty(body, propName, callback) {
	if (!body || !body[propName]) {
		if (callback) {
			callback({
				message: propName + ' is undefined'
			});
		}
		return true;
	}
	return true;
}

function checkIfVariableExist(value, name, callback) {
	if (!value) {
		if (callback) {
			callback({
				message: name + ' isn\'t defined'
			});
		}
		return false;
	}
	return true;
}

module.exports = new CheckService();