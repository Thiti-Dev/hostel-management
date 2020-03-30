const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Hostel = require('../models/Hostel');
const Booking = require('../models/Booking');
// @desc    Book a hostel
// @route   POST /api/hostels/:hostelId/booking
// @acess   Public
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
