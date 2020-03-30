const express = require('express');
const router = express.Router({ mergeParams: true }); // be able to be re-routed
const { protect } = require('../../middleware/auth');

const { bookHostel } = require('../../controller/booking');

router.route('').post(protect, bookHostel);

module.exports = router;
