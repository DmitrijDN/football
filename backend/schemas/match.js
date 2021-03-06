var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var matchSchema = new Schema({
	date: Date,
	teamAScore: Number,
	teamBScore: Number,
	balanceCounted: {
		type: Boolean,
		default: false
	},
	teams: [{
		name: String,
		players: [{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}],
		strength: Number,
		physic: Number,
		pass: Number,
		attack: Number,
		defend: Number,
		wins: Number,
		loses: Number,
		draws: Number
	}],
});

module.exports = mongoose.model('Match', matchSchema);