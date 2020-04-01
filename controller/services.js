const User = require('../models/User');
const Booking = require('../models/Booking');
const Hostel = require('../models/Hostel');
exports.getStatisticData = async (req, res, next) => {
	const userCount = await User.count();
	const bookCount = await Booking.count();
	const hostelCount = await Hostel.count();
	res.status(200).json({
		success: true,
		data: {
			total_user: userCount,
			total_booking: bookCount,
			total_hostel: hostelCount
		}
	});
};
