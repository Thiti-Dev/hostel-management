const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');
const Hostel = require('../models/Hostel');

// @desc    Post a comment on the hostel
// @route   POST /api/hostels/:hostelId/comments
// @acess   Private
exports.commentHostel = asyncHandler(async (req, res, next) => {
	const { id } = req.user; // the id of the user
	const { hostelId } = req.params;

	const hostel = await Hostel.findById(hostelId);

	if (!hostel) {
		return next(new ErrorResponse(`The hostel with id ${hostelId} is not exist`, 404));
	}

	// Filter out => custom id N Date Updating
	// Only message is allowed N hostel N user is allowed
	const fieldToCreate = {
		hostel: hostelId,
		user: id,
		message: req.body.message
	};

	const comment = await Comment.create(fieldToCreate);

	res.status(200).json({
		sucess: true,
		data: comment
	});
});

// @desc    Get a comment of the given hostel
// @route   GET /api/hostels/:hostelId/comments
// @acess   Public
exports.getHostelComments = asyncHandler(async (req, res, next) => {
	const { hostelId } = req.params;

	const hostel = await Hostel.findById(hostelId);

	if (!hostel) {
		return next(new ErrorResponse(`The hostel with id ${hostelId} is not exist`, 404));
	}

	const comment = await Comment.find({ hostel: hostelId });

	res.status(200).json({
		sucess: true,
		data: comment
	});
});
