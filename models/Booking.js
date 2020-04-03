const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	user: {
		//mongoose.Schema.ObjectId
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	hostel: {
		//mongoose.Schema.ObjectId
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hostel',
		required: true
	},
	checkIn: {
		type: Date,
		required: [ true, 'Check-in date has to be specified' ]
	},
	checkOut: {
		type: Date,
		required: [ true, 'Check-out date has to be specified' ]
	},
	totalPrice: {
		// by system
		type: Number,
		required: [ true, 'totalPrice has to be specified' ]
	},
	totalGuest: {
		// by system
		// will calculate later for any free capacity , may be using aggregate or self calculation with js array es6+
		type: Number,
		required: [ true, 'totalGuest has to be specified' ]
	},
	paymentStatus: {
		// If the user not doing any payment in x day , the booking will gets automatically cancelled ( date comparison )
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Booking', BookingSchema);
