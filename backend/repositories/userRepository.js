var Repository = require('./generalRepository'),
	User = require('../schemas/user');

function UserRepository() {
	Repository.prototype.constructor.call(this);
	this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.getAllSortedByFirstName = getAllSortedByFirstName;
UserRepository.prototype.updateUsersBalance = updateUsersBalance;

function getAllSortedByFirstName(callback) {
	var query = this.model.find({}).sort({
		firstName: 1
	});
	query.exec(callback);
}

function updateUsersBalance(userIds, value, callback) {
	var query = this.model.update({
		_id: {
			$in: userIds
		}
	}, {
		$inc: {
			balance: value
		}
	}, {
		multi: true
	});
	query.exec(callback);
}

module.exports = new UserRepository();