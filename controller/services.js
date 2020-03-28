const User = require('../models/User');

exports.getStatisticData = async (req, res, next) => {
	const userCount = await User.count();
	res.status(200).json({
		success: true,
		data: {
			total_user: userCount
		}
	});
};
