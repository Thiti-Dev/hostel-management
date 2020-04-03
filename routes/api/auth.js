const express = require('express');
const router = express.Router();

const {
	routeCheck,
	register,
	login,
	updatePassword,
	updateDetails,
	getMyCredential,
	uploadUserPhoto,
	uploadUserPhotoV2
} = require('../../controller/auth');
const { protect } = require('../../middleware/auth');
router.route('/check').get(routeCheck);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updatepassword').put(protect, updatePassword);
router.route('/updatedetails').put(protect, updateDetails);
router.route('/mycredentials').get(protect, getMyCredential);
router.route('/uploadphoto').put(protect, uploadUserPhoto);
router.route('/uploadphotov2').put(protect, uploadUserPhotoV2);

module.exports = router;
