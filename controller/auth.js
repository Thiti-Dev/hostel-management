// @desc    Check if the route properly returns the normal response ( JSON )
// @route   GET /api/auth/check
// @acess   Public
exports.routeCheck = (req, res, next) => {
	res.status(200).json({ success: true });
};
