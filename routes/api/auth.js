const express = require('express');
const router = express.Router();

const { routeCheck, register, login } = require('../../controller/auth');
router.route('/check').get(routeCheck);
router.route('/register').post(register);
router.route('/login').post(login);
module.exports = router;
