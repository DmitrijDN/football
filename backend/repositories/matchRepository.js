var Match = require('../schemas/match'),
	Repository = require('./generalRepository'),
	User = require('../schemas/user');

function MatchRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Match;
}

MatchRepository.prototype = new Repository();

MatchRepository.prototype.getAllItemsSortedByDate = getAllItemsSortedByDate;
MatchRepository.prototype.getAllUncountedMatches = getAllUncountedMatches;

function getAllItemsSortedByDate(callback) {
	var query = this.model.find({}).sort({
		date: 1
	}).lean().populate({
		path: 'teams'
	});
	query.exec(function(err, docs) {
		populatePlayers(err, docs, callback);
	});
}

function getAllUncountedMatches(callback) {
	var query = this.model.find({
		balanceCounted: false
	}).sort({
		date: 1
	}).lean().populate({
		path: 'teams'
	});
	query.exec(function(err, docs) {
		populatePlayers(err, docs, callback);
	});
}

function populatePlayers(err, docs, callback) {
	var options = {
		path: 'teams.players',
		model: 'User'
	};
	if (err) {
		callback(err, null);
		return;
	}

	User.populate(docs, options, function(err, projects) {
		callback(err, projects);
	});
}

module.exports = new MatchRepository();