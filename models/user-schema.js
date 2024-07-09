/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { typoe: String, minLength: 3, trim: true },
	email: String,
	password: String,
	cart: { type: Array, default: [] },
	contact: Number,
	profile: String,
});
const users = new mongoose.model("Users", userSchema);

module.exports = users;
