const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Hostel = require('../models/Hostel');
const Booking = require('../models/Booking');
const User = require('../models/User');

var ObjectId = require('mongodb').ObjectID;
// @desc    Get all hostel
// @route   GET /api/hostels/
// @acess   Public
exports.getAllHostel = asyncHandler(async (req, res, next) => {
	const { username } = req.params;

	// If just fetching in the home-page => which means no username params given from the url
	if (!username) {
		if (req.query.search) {
			const { search } = req.query;
			console.log(search);
			const searched_hostel = await Hostel.find({
				$or: [
					{
						name: { $regex: '.*' + search + '.*', $options: 'i' }
					},
					{
						description: { $regex: '.*' + search + '.*', $options: 'i' }
					},
					{
						address: { $regex: '.*' + search + '.*', $options: 'i' }
					}
				]
			}).populate({
				path: 'owner',
				select: 'username'
			});
			res.status(200).json({
				success: true,
				data: searched_hostel
			});
		} else {
			// If user dont provide any search
			const hostels = await Hostel.find().populate({
				path: 'owner',
				select: 'username'
			});
			res.status(200).json({
				success: true,
				data: hostels
			});
		}
	} else {
		//Else if trying to view others people published hostel

		const user = await User.findOne({ username });
		if (!user) {
			return next(new ErrorResponse(`Username ${username} is not exist in the database`, 404));
		}
		const user_id = user._id;

		const published_hostel = await Hostel.find({ owner: user_id }).sort('-createdAt'); // sort by the lastest one that had been created

		res.status(200).json({
			success: true,
			data: published_hostel
		});
	}
});

// @desc    Get a hostel details/information
// @route   GET /api/hostels/:slug
// @acess   Public
exports.getHostelDetailFromSlug = asyncHandler(async (req, res, next) => {
	const { slug } = req.params;
	const hostel = await Hostel.findOne({ slug }).populate({
		path: 'owner',
		select: 'username'
	}); // sort by the lastest one that had been created

	if (!hostel) {
		return next(new ErrorResponse(`Hostel with slug > ${slug} < is not exist in the database`, 404));
	}

	const total_booked = await Booking.find({ hostel: hostel._id });
	res.status(200).json({
		success: true,
		data: hostel,
		total_booked: total_booked ? total_booked.length : null
	});
});

// @desc    Create sigle hostel
// @route   POST /api/hostels/
// @acess   Private
exports.createHostel = asyncHandler(async (req, res, next) => {
	//
	// ─── CODE BELOW WILL USING UUID AND GENERATE V4 BY SHORTEN THEM BEFORE THE USE (LATER)──
	//

	// Add user to req.body before crating with the raw body
	req.body.owner = req.user.id;
	req.body.price = parseInt(req.body.price);
	req.body.capacity = parseInt(req.body.capacity);
	//
	// ─── CHECK FOR FILE UPLOAD FIRST ─────────────────────────────────────────────────────────
	//

	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = req.files.file;

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}

	// Check filesize
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(new ErrorResponse(`Image size should less than ${process.env.MAX_FILE_UPLOAD / 1000000} mb`, 400));
	}

	// ────────────────────────────────────────────────────────────────────────────────

	// Create here because => the _id is needed for creating a unique file name
	const created_hostel = await Hostel.create(req.body);

	// Create custom filename
	file.name = `photo_${created_hostel._id}${path.parse(file.name).ext}`;
	req.body.photo = file.name;
	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			//
			// ─── IF THERE IS A PROBLEM ───────────────────────────────────────
			//
			// THERE WILL BE BIG TROUBLE BECAUSE THE HOSTEL IS CREATED
			// FIX
			// 1.RETURN SUCCESS STATUS BUT NO IMAGE FOR THAT HOSTEL => WHICH MEANS USER MAY ALLOW TO CHANGE IT LATER
			// 2. REMOVE THE CREATED HOSTEL ONE THAT JUST HAS PUBLISHED AND RETURN ERROR CODE WHICH IS A BAD IDEA (CURRENTLY USING THIS )
			// 3. USE UUID TO GENERATE THE FILE NAME INSTEAD ( Later will be using this )
			await created_hostel.remove(); // not a good practice ( but I've got time limitation )
			console.log(err);
			return next(new ErrorResponse(`Problem with file upload`, 500));
		}

		// Re-assgin the name to photo
		created_hostel.photo = file.name;
		await created_hostel.save();

		res.status(201).json({
			success: true,
			data: created_hostel
		});
	});
});

// @desc    Update hostel details / picture if included
// @route   PUT /api/hostels/:hostelId/updatedetails
// @acess   Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
	const { hostelId } = req.params;
	// specific the field => protected from eding
	// If more field to prevent => later will be store the blacklist in the array and then map
	if (req.body._id) delete req.body['_id'];
	if (req.body.createdAt) delete req.body['createdAt'];
	if (req.body.validated) delete req.body['validated'];
	if (req.body.validatedAt) delete req.body['validatedAt'];
	if (req.body.owner) delete req.body['owner'];
	if (req.body.photo) delete req.body['photo'];
	// ────────────────────────────────────────────────────────────────────────────────

	const hostel_exist_data = await Hostel.findById(hostelId);

	if (!hostel_exist_data) {
		return next(new ErrorResponse(`Hostel with id ${hostelId} is not exist`, 404));
	}

	//@TODO check if user is the owner [EASY , later]
	//DONE [ CODE BELOW ]

	if (hostel_exist_data.owner.toString() !== req.user.id) {
		return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this hostel`, 401));
	}

	// ────────────────────────────────────────────────────────────────────────────────

	if (req.files) {
		const file = req.files.file;
		//if photo is attached
		// Make sure the image is a photo
		if (!file.mimetype.startsWith('image')) {
			return next(new ErrorResponse(`Please upload an image file`, 400));
		}

		// Check filesize
		if (file.size > process.env.MAX_FILE_UPLOAD) {
			return next(
				new ErrorResponse(`Image size should less than ${process.env.MAX_FILE_UPLOAD / 1000000} mb`, 400)
			);
		}

		// Create custom filename
		file.name = `photo_${hostel_exist_data._id}${path.parse(file.name).ext}`;
		req.body.photo = file.name;
		file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
			if (err) {
				// This shouldn't happen
				return next(new ErrorResponse(`Problem with file upload`, 500));
			}
		});
	}

	console.log(req.body);

	const hostel = await Hostel.findByIdAndUpdate(hostelId, req.body, {
		new: true, // returning the document after update applied
		runValidators: true // run validator
	});

	res.status(200).json({
		success: true,
		data: hostel
	});
});

// @desc    Get the capacity free between date / also give a total booking atm
// @route   GET /api/hostels/:hostelId/getCapacity
// @acess   Private
exports.getCapacityBetweenDate = asyncHandler(async (req, res, next) => {
	//console.log(req.query);
	const { start_date, end_date, total_guest } = req.query;
	const { hostelId } = req.params;
	//console.log(hostelId);

	const fetched_hostel = await Hostel.findById(hostelId);

	if (!fetched_hostel) {
		return next(new ErrorResponse(`Hostel with id: ${hostelId} is not exist`, 404));
	}

	// @comment because => User allows to book the same hostel more than 1 time but in the different period of time
	//let isAlreadyBook = await Booking.findOne({ hostel: hostelId, user: req.user.id });
	let isAlreadyBook = await Booking.findOne({
		hostel: hostelId,
		user: req.user.id,
		$or: [
			{ checkOut: { $gte: end_date }, checkIn: { $lt: end_date } },
			{ checkIn: { $lte: start_date }, checkOut: { $gt: start_date } }
		]
	});

	// let fetched_book = await Booking.find({
	// 	hostel: hostelId,
	// 	$or: [
	// 		{ checkOut: { $gte: end_date }, checkIn: { $lt: end_date } },
	// 		{ checkIn: { $lte: start_date }, checkOut: { $gt: start_date } }
	// 	]
	// });

	const totalPeople = await Booking.aggregate([
		// Limit to relevant documents and potentially take advantage of an index
		{
			$match: {
				hostel: ObjectId(hostelId),
				$or: [
					{ checkOut: { $gte: new Date(end_date) }, checkIn: { $lt: new Date(end_date) } },
					{ checkIn: { $lte: new Date(start_date) }, checkOut: { $gt: new Date(start_date) } }
				]
			}
		},
		{
			$group: {
				_id: null,
				total: { $sum: '$totalGuest' }
			}
		}
	]);

	let totalPeopleBooked = 0; // default
	if (totalPeople.length > 0) {
		totalPeopleBooked = totalPeople[0].total;
	}

	//console.log(totalPeople);
	const remain_capacity = fetched_hostel.capacity - totalPeopleBooked;
	const remain_capacity_include_current = remain_capacity - total_guest;
	res.status(200).json({
		success: true,
		data: {
			totalBooked: totalPeopleBooked,
			canProceed: remain_capacity_include_current >= 0 ? true : false,
			isOverload: remain_capacity > 0 && remain_capacity_include_current < 0 ? true : false,
			isAlreadyBook: isAlreadyBook ? true : false
		}
	});
});

// @desc    Update hostel photo
// @route   PUT /api/hostels/:id/photo
// @acess   Private
exports.uploadHostelPhoto = asyncHandler(async (req, res, next) => {
	const hostel = await Hostel.findById(req.params.id); // findByIdAndDelete not gonna triggered the middle ware

	if (!hostel) {
		//return res.status(400).json({ success: false });
		return next(new ErrorResponse(`Hostel not found with id of ${req.params.id}`, 404));
	}

	// Make sure user is the hostel's owner
	if (hostel.owner.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this hostel`, 401));
	}

	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = req.files.file;

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}

	// Check filesize
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(new ErrorResponse(`Image size should less than ${process.env.MAX_FILE_UPLOAD / 1000000} mb`, 400));
	}

	// Create custom filename
	file.name = `photo_${hostel._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.log(err);
			return next(new ErrorResponse(`Problem with file upload`, 500));
		}

		await Hostel.findByIdAndUpdate(req.params.id, {
			photo: file.name
		});

		res.status(200).json({ success: true, data: file.name });
	});
});
