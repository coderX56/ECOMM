/** @format */

const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images/products/");
	},
	filename: (req, file, cb) => {
		crypto.randomBytes(12, (err, bytes) => {
			const fn = bytes.toString("hex") + path.extname(file.originalname);
			cb(null, fn);
		});
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif/;
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = filetypes.test(file.mimetype);

		if (extname && mimetype) {
			return cb(null, true);
		}
		cb("Error: File type not supported.");
	},
});

module.exports = upload;
