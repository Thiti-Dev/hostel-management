const sendTokenResponse = require('../utils/tokenResponse');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
// Model importing
const User = require('../models/User');

// @desc    Check if the route properly returns the normal response ( JSON )
// @route   GET /api/auth/check
// @acess   Public
exports.routeCheck = (req, res, next) => {
	res.status(200).json({ success: true });
};

// @desc    Register user
// @route   POST /api/auth/register
// @acess   Public
exports.register = asyncHandler(async (req, res, next) => {
	const { email, firstName, lastName, username, gender, dateOfBirth, password } = req.body;
	const errors = {}; // empty object at first
	// Duplication check => avoid MongoError: E11000 custom validation from the duplicate value entered => but it doesn't give the key soooooo it's useless
	const _exist_username = await User.findOne({ username }); // check if the entered username exist
	const _exist_email = await User.findOne({ email }); // check if the entered email exist
	if (_exist_username) {
		errors.username = 'This username is already exist';
	}
	if (_exist_email) {
		errors.email = 'This email is already exist';
	}

	if (Object.keys(errors).length > 0) {
		// If the errors above is not empty
		return res.status(400).json({ success: false, errors });
	}

	// Create user
	const user = await User.create({
		email,
		firstName,
		lastName,
		username,
		gender,
		dateOfBirth,
		password
	});

	// Send the response with the token attached
	sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @acess   Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email & password
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// Check if the user exist
	let user; // later will be using if not found by email ( Assuming that user entered the username)
	user = await User.findOne({ email }).select('+password');
	if (!user) {
		// If not found any credential by email
		// @fetching for user by a username
		user = await User.findOne({ username: email }).select('+password');
	}
	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Create token
	/*const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });*/

	sendTokenResponse(user, 200, res);
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @acess   Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	// Check current password
	if (!await user.matchPassword(req.body.currentPassword)) {
		return next(new ErrorResponse(`Password is incorrect`, 401));
	}

	user.password = req.body.newPassword;
	await user.save(); // mongoose middleware should be calling to bcrypt the password
	sendTokenResponse(user, 200, res);
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @acess   Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
	// specific the field => protected from eding password & username
	// If more field to prevent => later will be store the blacklist in the array and then map
	if (req.body.password) delete req.body['password'];
	if (req.body.username) delete req.body['username'];
	// ────────────────────────────────────────────────────────────────────────────────

	console.log(req.body);

	const user = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true, // returning the document after update applied
		runValidators: true // run validator
	});

	res.status(200).json({
		success: true,
		data: user
	});
});
