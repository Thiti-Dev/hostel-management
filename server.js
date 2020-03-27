const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const colors = require('colors');

const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './config/config.env' });

// routes importing
const auth = require('./routes/api/auth');

const mainThread = () => {
	//
	// ─── PARSER ─────────────────────────────────────────────────────────────────────
	//
	// body
	app.use(express.json());
	// coolkie
	app.use(cookieParser());
	// ────────────────────────────────────────────────────────────────────────────────

	//
	// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
	//
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}
	// routing
	app.use('/api/auth', auth);
	// ────────────────────────────────────────────────────────────────────────────────

	const PORT = process.env.SERVER_PORT || 5000;

	const server = app.listen(PORT || 5000, () => {
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
