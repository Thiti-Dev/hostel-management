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

	//
	// ─── CREATE THEN POPULATE ( for shifting element into the existing array [frontend-sided] with the exact current username & photo) ────────────────────────────────────────────────────────
	// @ TODO => better way is to sign the username and photo in to the JWT token and the decode it somewhere to use > later than populating every single time that comment is created
	// @ DONE TODO
	let comment = await Comment.create(fieldToCreate);
	comment = await comment.populate('user', 'photo username').execPopulate();
	// ────────────────────────────────────────────────────────────────────────────────

	//const comment = await Comment.create(fieldToCreate); // no need to populate anymore => frontend-sided can load the photo_username by decoing the jwt token

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

	const comment = await Comment.find({ hostel: hostelId })
		.populate({
			path: 'user',
			select: 'username firstName lastName photo'
		})
		.sort('-createdAt');

	res.status(200).json({
		sucess: true,
		data: comment
	});
});
