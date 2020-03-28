const ErrorResponse = require('../utils/errorResponse');

const Hostel = require('../models/Hostel');
// @desc    Get all hostel
// @route   GET /api/hostels/
// @acess   Public
exports.getAllHostel = async (req, res, next) => {
	const hostels = await Hostel.find().populate({
		path: 'owner',
		select: 'username'
	});
	res.status(200).json({
		success: true,
		data: hostels
	});
};

// @desc    Create sigle hostel
// @route   POST /api/hostels/
// @acess   Private
exports.createHostel = async (req, res, next) => {
	// Add user to req.body before crating with the raw body
	req.body.user = req.user.id;

	const created_hostel = await Hostel.create(req.body);

	res.status(201).json({
		success: true,
		data: created_hostel
	});
};
