const express = require('express');
const router = express.Router();
const { getAllHostel, createHostel } = require('../../controller/hostel');
const { protect } = require('../../middleware/auth');
router.route('/').get(getAllHostel).post(protect, createHostel);

module.exports = router;
