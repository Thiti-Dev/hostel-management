const express = require('express');
const router = express.Router();
const { getUserDetails } = require('../../controller/users');
const { protect } = require('../../middleware/auth');

// Include other resource routers
const bookingRouter = require('./booking');
const hostelRouter = require('./hostel');
// Re-route into other resource routers
router.use('/:username/booking', bookingRouter);
router.use('/:username/hostel', hostelRouter);
router.route('/:username').get(getUserDetails);
module.exports = router;
