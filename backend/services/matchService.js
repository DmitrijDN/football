var checkService = require('./checkService'),
	matchRepository = require('../repositories/matchRepository');

function MatchService() {

}

MatchService.prototype.addItem = addItem;
MatchService.prototype.updateItem = updateItem;

function addItem(body, callback) {
	if (checkService.checkIfBodyExists(body, callback)) {
		if (!body.length) {
			callback({
				message: 'Teams are empty'
			});
			return null;
		}
		var dataToSave = {
			teams: body,
			date: Date.now()
		};
		matchRepository.add(dataToSave, callback);
	}
}

function updateItem(body, callback) {
	if (checkService.checkIfBodyExists(body, callback) && checkService.checkBodyProperty(body, '_id', callback) &&
		checkService.checkBodyProperty(body, 'dataToUpdate', callback)) {
		matchRepository.updatePropertiesById(body._id, body.dataToUpdate, callback);
	}
}

module.exports = new MatchService();