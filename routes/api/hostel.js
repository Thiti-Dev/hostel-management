const express = require('express');
const router = express.Router({ mergeParams: true }); // be able to be re-routed
const { getAllHostel, createHostel, uploadHostelPhoto, getCapacityBetweenDate } = require('../../controller/hostel');
const { protect } = require('../../middleware/auth');

// Include other resource routers
const bookingRouter = require('./booking');

// Re-route into other resource routers
router.use('/:hostelId/booking', bookingRouter);

router.route('/').get(getAllHostel).post(protect, createHostel);
router.route('/:hostelId/getCapacity').get(protect, getCapacityBetweenDate);
router.route('/:id/photo').put(protect, uploadHostelPhoto);

module.exports = router;
