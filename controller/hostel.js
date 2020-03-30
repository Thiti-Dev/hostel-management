const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Hostel = require('../models/Hostel');
// @desc    Get all hostel
// @route   GET /api/hostels/
// @acess   Public
exports.getAllHostel = asyncHandler(async (req, res, next) => {
	const hostels = await Hostel.find().populate({
		path: 'owner',
		select: 'username'
	});
	res.status(200).json({
		success: true,
		data: hostels
	});
});

// @desc    Create sigle hostel
// @route   POST /api/hostels/
// @acess   Private
exports.createHostel = asyncHandler(async (req, res, next) => {
	// Add user to req.body before crating with the raw body
	req.body.user = req.user.id;

	const created_hostel = await Hostel.create(req.body);

	res.status(201).json({
		success: true,
		data: created_hostel
	});
});

// @desc    Update hostel photo
// @route   PUT /api/hostels/:id/photo
// @acess   Private
exports.uploadHostelPhoto = asyncHandler(async (req, res, next) => {
	const hostel = await Hostel.findById(req.params.id); // findByIdAndDelete not gonna triggered the middle ware

	if (!hostel) {
		//return res.status(400).json({ success: false });
		return next(new ErrorResponse(`Hostel not found with id of ${req.params.id}`, 404));
	}

	// Make sure user is the hostel's owner
	if (hostel.owner.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this hostel`, 401));
	}

	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = req.files.file;

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}

	// Check filesize
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
	}

	// Create custom filename
	file.name = `photo_${hostel._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.log(err);
			return next(new ErrorResponse(`Problem with file upload`, 500));
		}

		await Hostel.findByIdAndUpdate(req.params.id, {
			photo: file.name
		});

		res.status(200).json({ success: true, data: file.name });
	});
});
