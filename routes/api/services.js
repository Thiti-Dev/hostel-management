const express = require('express');
const router = express.Router();
const { getStatisticData } = require('../../controller/services');

router.route('/getStatistic').get(getStatisticData);

module.exports = router;
