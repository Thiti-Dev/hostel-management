const mongoose = require('mongoose');

module.exports = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
	console.log(
		`MongoDB Connected: ${conn.connection.host} , Database_Name: ${conn.connection.name}`.cyan.underline.bold
	);
};
