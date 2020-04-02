const express = require('express');
const router = express.Router({ mergeParams: true }); // be able to be re-routed

const { commentHostel } = require('../../controller/comments');

const { protect } = require('../../middleware/auth');

router.route('/').post(protect, commentHostel);

module.exports = router;
