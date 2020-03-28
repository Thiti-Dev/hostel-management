const express = require('express');
const router = express.Router();
const { getAllHostel, createHostel, uploadHostelPhoto } = require('../../controller/hostel');
const { protect } = require('../../middleware/auth');
router.route('/').get(getAllHostel).post(protect, createHostel);
router.route('/:id/photo').put(protect, uploadHostelPhoto);

module.exports = router;
