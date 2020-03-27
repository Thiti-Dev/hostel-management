const express = require('express');
const router = express.Router();

const { routeCheck } = require('../../controller/auth');
router.route('/check').get(routeCheck);

module.exports = router;
