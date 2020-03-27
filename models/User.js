const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: [ true, 'Please add an email' ],
		unique: true,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ]
	},
	username: {
		type: String,
		required: [ true, 'Please add a username' ]
	},
	password: {
		type: String,
		required: [ true, 'Please add a password' ],
		minlength: 6,
		select: false // not returning the password [HIDING]
	},
	dateOfBirth: {
		type: Date,
		required: [ true, 'Please add a the date of birth' ]
	},
	firstName: {
		type: String,
		required: [ true, 'Please add a firstName' ]
	},
	lastName: {
		type: String,
		required: [ true, 'Please add a lastName' ]
	},
	gender: {
		type: String,
		enum: [ 'male', 'female' ],
		required: [ true, 'Please select a gender' ]
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now
	}
});
module.exports = mongoose.model('User', UserSchema);
