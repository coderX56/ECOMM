/** @format */

const mongoose = require("mongoose");

const config = require("config");

mongoose
	.connect(`${config.get("MONGODB_URI")}/ECOMM`)
	.then(() => {
		console.log("Connected");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = mongoose.connection;
