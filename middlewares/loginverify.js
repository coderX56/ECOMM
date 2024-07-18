/** @format */
const jwt = require("jsonwebtoken");
const users = require("../models/user-schema");
module.exports = async function isLoggedin(req, res, next) {
	if (!req.cookies.token) {
		req.flash("error", "Need to be logged in");
		return res.redirect("/");
	}
	try {
		let data = await jwt.verify(req.cookies.token, "baggie");
		let user = await users.findOne({ email: data.email });
		req.user = user;
		next();
	} catch {
		(err) => {
			req.flash("error", "Something went wrong ");
			res.redirect("/login");
		};
	}
};
