const express = require('express');
const router = express.Router();
const {} = require('../../controller/users');
const { protect } = require('../../middleware/auth');

// Include other resource routers
const bookingRouter = require('./booking');

// Re-route into other resource routers
router.use('/:username/booking', bookingRouter);

module.exports = router;
