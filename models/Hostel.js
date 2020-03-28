const mongoose = require('mongoose');

const HostelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please add a name' ],
		unique: true,
		trim: true,
		maxlength: [ 50, 'Name can not be more than 50 characters' ]
	},
	description: {
		type: String,
		required: [ true, 'Please add a description' ],
		maxlength: [ 500, 'Description can not be more than 500 characters' ]
	},
	phone: {
		type: String,
		maxlength: [ 20, 'Phone number can not be longer than 20 characters' ]
	},
	address: {
		type: String,
		required: [ true, 'Please add an address' ]
	},
	photo: {
		type: String,
		default: 'no-photo.jpg'
	},
	price: {
		type: Number,
		required: [ true, 'You need to specify the price per night' ]
	},
	averageRating: {
		type: Number,
		min: [ 1, 'Rating must be at least 1' ],
		max: [ 5, 'Rating must can not be more than 10' ]
	},
	owner: {
		//mongoose.Schema.ObjectId
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	validate: {
		type: Boolean,
		default: false
	},
	validatedAt: {
		type: Date
	}
});

module.exports = mongoose.model('Hostel', HostelSchema);