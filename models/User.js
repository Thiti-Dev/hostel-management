const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: [ true, 'Please add an email' ],
		unique: true,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ]
	},
	role: {
		// No enum becacuse only 2 role [user,admin] => set admin directly from compass or any dbms
		type: String,
		default: 'user'
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
	photo: {
		type: String,
		default: 'unknown-user.jpg'
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

//
// ─── ENCRYPT REGISTERED PASSWORD Using [bcrypt] ────────────────────────────────────────────────
//
UserSchema.pre('save', async function(next) {
	//If the password isn't being modified => calling the next middleware
	if (!this.isModified('password')) {
		next();
	}

	// Gen salt and applied to the current password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

//
// ─── JWT SIGNING & RETURN ────────────────────────────────────────────────────────────────
//
UserSchema.methods.getSignedJwtToken = function() {
	return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	});
};

//
// ─── MATCH USER ENTERED PASSWORD WITH THE PASSWORD THAT STORED IN DB WITH THE USE OF BCRYPT
//

UserSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
