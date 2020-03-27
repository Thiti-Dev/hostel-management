const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	//Log to console for dev
	console.log(err);

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		// Long ass string => old ways
		//const message = Object.values(err.errors).map((val) => val.message);
		//error = new ErrorResponse(errors, 400);
		const errors = {};
		Object.values(err.errors).forEach((val) => (errors[val.path] = val.message));
		error.message = errors; // new assigned way
		error.statusCode = 400;
	}

	res.status(error.statusCode || 500).json({
		success: false,
		errors: error.message || 'Server Error'
	});
};

module.exports = errorHandler;
