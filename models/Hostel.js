const mongoose = require('mongoose');
const slugify = require('slugify');

const HostelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please add a name' ],
		unique: true,
		trim: true,
		maxlength: [ 50, 'Name can not be more than 50 characters' ]
	},
	slug: String,
	description: {
		type: String,
		required: [ true, 'Please add a description' ],
		maxlength: [ 500, 'Description can not be more than 500 characters' ]
	},
	phone: {
		type: String,
		maxlength: [ 20, 'Phone number can not be longer than 20 characters' ]
	},
	email: {
		type: String,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ]
	},
	address: {
		type: String,
		required: [ true, 'Please add an address' ]
	},
	capacity: {
		type: Number,
		required: [ true, 'Capacity needed for a hostel' ]
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
	validated: {
		type: Boolean,
		default: false
	},
	validatedAt: {
		type: Date
	}
});

// Create hostel slug from the name
HostelSchema.pre('save', function(next) {
	//console.log('Slugify ran', this.name);
	this.slug = slugify(this.name, { lower: true });
	next();
});

// Cascade delete booking and comments when a hostel is deleted
HostelSchema.pre('remove', async function(next) {
	await this.model('Comments').deleteMany({ hostel: this._id });
	await this.model('Booking').deleteMany({ hostel: this._id });
	next();
});

module.exports = mongoose.model('Hostel', HostelSchema);
