const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
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
	message: {
		type: String,
		required: [ true, 'Message field is required' ],
		maxlength: [ 300, 'Message can not be more than 300 characters' ]
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comments', CommentSchema);
