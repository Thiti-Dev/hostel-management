const path = require('path');
// Storage
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');

//
// ─── CLOUD ──────────────────────────────────────────────────────────────────────
const gc = new Storage({
	keyFilename: path.join(__dirname, '../config/key.json'),
	projectId: 'hosteloga-z-273110'
});

//gc.getBuckets().then((x) => console.log(x));
const bucket = gc.bucket('hosteloga-uploads');
const uploadImage = (_file) =>
	new Promise((resolve, reject) => {
		/*console.log(req);
	if (!req.files) {
		res.status(400).send('No file uploaded.');
		return;
    }*/

		const file = _file;

		// Create a new blob in the bucket and upload the file data.
		const blob = bucket.file(file.name);
		const blobStream = blob.createWriteStream();

		blobStream.on('error', (err) => {
			//next(err);
			console.log('here');
			reject(`Unable to upload image, something went wrong`);
		});

		blobStream.on('finish', () => {
			// The public URL can be used to directly access the file via HTTP.
			const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
			resolve(publicUrl);
			//res.status(200).send(publicUrl);
		});
		//console.log(file.data);
		blobStream.end(file.data);
	});

module.exports = uploadImage;
