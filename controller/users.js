const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get specific user information
// @route   GET /api/users/:username
// @acess   Public
exports.getUserDetails = asyncHandler(async (req, res, next) => {
	const { username } = req.params;
	const user = await User.findOne({ username });

	if (!user) {
		return next(new ErrorResponse(`Username ${username} is not exist in the database`, 404));
	}

	res.status(200).json({
		success: true,
		data: user
	});
});
