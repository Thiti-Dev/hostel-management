const express = require('express');
const router = express.Router();
const { getAllHostel, createHostel, uploadHostelPhoto } = require('../../controller/hostel');
const { protect } = require('../../middleware/auth');

// Include other resource routers
const bookingRouter = require('./booking');

// Re-route into other resource routers
router.use('/:hostelId/booking', bookingRouter);

router.route('/').get(getAllHostel).post(protect, createHostel);
router.route('/:id/photo').put(protect, uploadHostelPhoto);

module.exports = router;
