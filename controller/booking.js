const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Hostel = require('../models/Hostel');
const Booking = require('../models/Booking');
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

	const booked_hostel = await Booking.create(req.body);

	res.status(201).json({
		success: true,
		data: booked_hostel
	});
});

// @desc    Get booking history
// @route   POST /api/booking/mybooking
// @acess   Private
exports.getMyBooking = asyncHandler(async (req, res, next) => {
	const fetched_booking = await Booking.find({ user: req.user.id }).sort('-createdAt'); // sort => showing the lastest first
	res.status(200).json({
		sucess: true,
		data: fetched_booking
	});
});
