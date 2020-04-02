const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const colors = require('colors');
const fileupload = require('express-fileupload');

const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './config/config.env' });

// routes importing
const auth = require('./routes/api/auth');
const services = require('./routes/api/services');
const hostel = require('./routes/api/hostel');
const booking = require('./routes/api/booking');
const users = require('./routes/api/users');

// db
const connectDB = require('./config/db');

const errorHandler = require('./middleware/error');

const mainThread = async () => {
	// Set static folder
	app.use(express.static(path.join(__dirname, 'public')));
	// ────────────────────────────────────────────────────────────────────────────────

	await connectDB(); // wait for the database to beconnected
	//
	// ─── PARSER ─────────────────────────────────────────────────────────────────────
	//
	// body
	app.use(express.json());
	// coolkie
	app.use(cookieParser());
	// File uploading
	app.use(fileupload());
	// ────────────────────────────────────────────────────────────────────────────────

	//
	// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
	//
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}
	// routing
	app.use('/api/auth', auth);
	app.use('/api/services', services);
	app.use('/api/hostels', hostel);
	app.use('/api/booking', booking);
	app.use('/api/users', users);

	// Custom Error Handler
	app.use(errorHandler);
	// ────────────────────────────────────────────────────────────────────────────────

	const PORT = process.env.PORT || 5000;

	const server = app.listen(PORT, () => {
		console.log(`The server is currently running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
	});

	// Handle unhandled promise rejections
	process.on('unhandledRejection', (err, promise) => {
		console.log(`Error: ${err.message}`.red);
		// Close server & exit process
		server.close(() => process.exit(1));
	});
};

mainThread();
