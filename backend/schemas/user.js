var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	balance: Number,
	firstName: String,
	lastName: String,
	password: String,
	role: String,
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
	.get(function() {
		return this.firstName + ' ' + this.lastName;
	});


module.exports = mongoose.model('User', userSchema);