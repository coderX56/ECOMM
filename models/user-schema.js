/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String },
	email: String,
	password: String,
	cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
	contact: Number,
	profile: String,
});
const users = new mongoose.model("users", userSchema);

module.exports = users;
