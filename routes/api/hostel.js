const express = require('express');
const router = express.Router({ mergeParams: true }); // be able to be re-routed
const {
	getAllHostel,
	createHostel,
	uploadHostelPhoto,
	getCapacityBetweenDate,
	getHostelDetailFromSlug,
	updateDetails,
	verifyHostel,
	unVerifyHostel,
	deleteHostel,
	createHostelV2,
	updateDetailsV2
} = require('../../controller/hostel');
const { protect } = require('../../middleware/auth');

// Include other resource routers
const bookingRouter = require('./booking');
const commentsRouter = require('./comments');
// Re-route into other resource routers
router.use('/:hostelId/booking', bookingRouter);
router.use('/:hostelId/comments', commentsRouter);

router.route('/').get(getAllHostel).post(protect, createHostel);
router.route('/v2').get(getAllHostel).post(protect, createHostelV2);
router.route('/:slug').get(getHostelDetailFromSlug);
router.route('/:hostelId/getCapacity').get(protect, getCapacityBetweenDate);
router.route('/:hostelId/updatedetails').put(protect, updateDetails);
router.route('/:hostelId/updatedetailsv2').put(protect, updateDetailsV2);
router.route('/:hostelId/verify').get(protect, verifyHostel);
router.route('/:hostelId/unverify').get(protect, unVerifyHostel);
router.route('/:hostelId').delete(protect, deleteHostel);
router.route('/:id/photo').put(protect, uploadHostelPhoto);

module.exports = router;
