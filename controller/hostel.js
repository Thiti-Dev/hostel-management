const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Hostel = require('../models/Hostel');
const Booking = require('../models/Booking');
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

// @desc    Get the capacity free between date / also give a total booking atm
// @route   GET /api/hostels/:hostelId/getCapacity
// @acess   Public
exports.getCapacityBetweenDate = asyncHandler(async (req, res, next) => {
	console.log(req.query);
	const { start_date, end_date, total_guest } = req.query;
	const { hostelId } = req.params;
	console.log(hostelId);

	const fetched_hostel = await Hostel.findById(hostelId);

	if (!fetched_hostel) {
		return next(new ErrorResponse(`Hostel with id: ${hostelId} is not exist`, 404));
	}

	let fetched_book = await Booking.find({
		hostel: hostelId,
		$or: [
			{ checkOut: { $gte: end_date }, checkIn: { $lt: end_date } },
			{ checkIn: { $lte: start_date }, checkOut: { $gt: start_date } }
		]
	});
	console.log(fetched_hostel.capacity);
	const remain_capacity = fetched_hostel.capacity - total_guest;
	res.status(200).json({
		success: true,
		data: {
			totalBooked: fetched_book.length,
			canProceed: fetched_hostel.capacity - total_guest >= 0 ? true : false,
			isOverload: fetched_hostel.capacity - fetched_book.length > 0 && remain_capacity < 0 ? true : false
		}
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
