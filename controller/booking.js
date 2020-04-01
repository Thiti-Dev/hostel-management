const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Hostel = require('../models/Hostel');
const Booking = require('../models/Booking');
const User = require('../models/User');

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

function getTotalDayBetweenDate(firstDate, secondDate) {
	return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// @desc    Book a hostel
// @route   POST /api/hostels/:hostelId/booking
// @acess   Private
exports.bookHostel = asyncHandler(async (req, res, next) => {
	const { hostelId } = req.params;
	//
	// ─── DEV ────────────────────────────────────────────────────────────────────────
	//
	req.body.user = req.body.user || req.user.id;
	req.body.hostel = req.body.hostel || hostelId; // append to body
	// ────────────────────────────────────────────────────────────────────────────────

	const hostel = await Hostel.findById(hostelId);
	if (!hostel) {
		return next(new ErrorResponse(`Hostel with id ${hostelId} is not exist`, 404));
	}

	// @TODO => Check again here if can proceed => ( prevent use from using any api requester to directly book the hostel) [ DONE ] [ CODE BELOW ]
	// @DONE PREVENTION
	let isAlreadyBook = await Booking.findOne({
		hostel: hostelId,
		user: req.user.id,
		$or: [
			{ checkOut: { $gte: req.body.checkOut }, checkIn: { $lt: req.body.checkOut } },
			{ checkIn: { $lte: req.body.checkIn }, checkOut: { $gt: req.body.checkIn } }
		]
	});
	if (isAlreadyBook) {
		return next(new ErrorResponse(`Cannot book more than once in the same period of time of the same hostel`, 400));
	}
	// ────────────────────────────────────────────────────────────────────────────────

	//
	// ─── CALC PRICE ─────────────────────────────────────────────────────────────────
	//
	req.body.totalPrice =
		getTotalDayBetweenDate(new Date(req.body.checkIn), new Date(req.body.checkOut)) *
		hostel.price *
		req.body.totalGuest;
	// ────────────────────────────────────────────────────────────────────────────────

	const booked_hostel = await Booking.create(req.body);

	res.status(201).json({
		success: true,
		data: booked_hostel
	});
});

// @desc    Get booking history of the given username
// @route   POST /api/users/:username/booking
// @acess   Public
exports.getUserBooking = asyncHandler(async (req, res, next) => {
	const { username } = req.params;
	console.log(username);
	const user = await User.findOne({ username });
	if (!user) {
		return next(new ErrorResponse(`Username ${username} is not exist in the database`, 404));
	}
	const user_id = user._id;

	const booking_history = await Booking.find({ user: user_id }).sort('-createdAt').populate({
		path: 'hostel',
		select: 'photo name'
	}); // sort => showing the lastest first;

	res.status(200).json({
		sucess: true,
		data: booking_history
	});
});

// @desc    Get booking history
// @route   POST /api/booking/mybooking
// @acess   Private
exports.getMyBooking = asyncHandler(async (req, res, next) => {
	const fetched_booking = await Booking.find({ user: req.user.id }).sort('-createdAt').populate({
		path: 'hostel',
		select: 'photo name'
	}); // sort => showing the lastest first
	res.status(200).json({
		sucess: true,
		data: fetched_booking
	});
});
