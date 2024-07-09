/** @format */
const jwt = require("jsonwebtoken");
const users = require("../models/user-schema");
async function isLoggedin(req, res, next) {
	if (!req.cookies.token) {
		req.flash(" error", "You need to be logged in first");
		res.redirect("/");
	}
	try {
		let data = await jwt.verify(req.cookies.token, "baggie");
		let user = await users.findOne({ email: data.email });
		req.user = user;
		next();
	} catch {
		(err) => {
			res.flash("err", "Something went wrong ");
			res.redirect("/login");
		};
	}
}
