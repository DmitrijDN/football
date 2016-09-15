var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	balance: Number,
	firstName: String,
	lastName: String,
	password: String,
	role: String,
	physic: Number,
	pass: Number,
	attack: Number,
	defend: Number,
	totalCharacteristic: Number,
}, {
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	});

userSchema
	.virtual('fullName')
	.get(function () {
		return this.firstName + ' ' + this.lastName;
	});

userSchema.pre('update', function (next) {
	if (this._update.$set && this._update.$set.physic || this._update.$set.pass || this._update.$set.attack || this._update.$set.defend) {
		var total = 0;
		var physic = parseInt(this._update.$set.physic);
		var pass = parseInt(this._update.$set.pass);
		var attack = parseInt(this._update.$set.attack);
		var defend = parseInt(this._update.$set.defend);

		total += !isNaN(physic) ? physic : 0;
		total += !isNaN(pass) ? pass : 0;
		total += !isNaN(attack) ? attack : 0;
		total += !isNaN(defend) ? defend : 0;

		total = parseFloat((total / 4).toFixed(2));

		this._update.$set.totalCharacteristic = total;
	}
	next();
});

userSchema.pre('findOneAndUpdate', function (next) {
	if (this._update.$set && this._update.$set.physic || this._update.$set.pass || this._update.$set.attack || this._update.$set.defend) {
		var total = 0;
		var physic = parseInt(this._update.$set.physic);
		var pass = parseInt(this._update.$set.pass);
		var attack = parseInt(this._update.$set.attack);
		var defend = parseInt(this._update.$set.defend);

		total += !isNaN(physic) ? physic : 0;
		total += !isNaN(pass) ? pass : 0;
		total += !isNaN(attack) ? attack : 0;
		total += !isNaN(defend) ? defend : 0;

		total = parseFloat((total / 4).toFixed(2));

		this._update.$set.totalCharacteristic = total;
	}
	next();
});

module.exports = mongoose.model('User', userSchema);