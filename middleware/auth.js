const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	/*if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}*/
	// Using cookie instead
	if (req.cookies.token) {
		token = req.cookies.token;
	}

	// Make sure token exist
	if (!token) {
		return next(new ErrorResponse('Not authorize to access this route', 401));
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded.id);
		next();
	} catch (err) {
		return next(new ErrorResponse('Not authorize to access this route', 401));
	}
});
