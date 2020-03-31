const express = require('express');
const router = express.Router();

const { routeCheck, register, login, updatePassword } = require('../../controller/auth');
const { protect } = require('../../middleware/auth');
router.route('/check').get(routeCheck);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updatepassword').put(protect, updatePassword);
module.exports = router;
