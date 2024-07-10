/** @format */
const jwt = require("jsonwebtoken");
const users = require("../models/user-schema");
module.exports = async function isLoggedin(req, res, next) {
	if (!req.cookies.token) {
		req.send(" error", "You need to be logged in first");
		return res.redirect("/login");
	}
	try {
		let data = await jwt.verify(req.cookies.token, "baggie");
		let user = await users.findOne({ email: data.email });
		req.user = user;
		next();
	} catch {
		(err) => {
			res.flash("error", "Something went wrong ");
			res.redirect("/login");
		};
	}
};
