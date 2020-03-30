const express = require('express');
const router = express.Router({ mergeParams: true }); // be able to be re-routed
const { protect } = require('../../middleware/auth');

const { bookHostel, getMyBooking } = require('../../controller/booking');

router.route('').post(protect, bookHostel);
router.route('/myBooking').get(protect, getMyBooking);
module.exports = router;
