const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const colors = require('colors');

const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './config/config.env' });

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
	// ────────────────────────────────────────────────────────────────────────────────

	const PORT = process.env.SERVER_PORT || 5000;

	const server = app.listen(PORT || 5000, () => {
		console.log(`The server is currently running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
	});
};

mainThread();
