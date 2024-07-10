/** @format */

const express = require("express");
const router = express.Router();
const users = require("../models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isLoggedin = require("../middlewares/loginverify");

router.get("/", (req, res) => {
	let error = req.flash("error");
	let success = req.flash("success");
	res.render("login", { error, success });
});
router.get("/signup", (req, res) => {
	let error = req.flash("error");
	let success = req.flash("success");
	res.render("signup", { error, success });
});
router.get("/shop", isLoggedin, (req, res) => {
	let success = req.flash("success");
	res.render("shop", { success });
});
router.post("/login", async (req, res) => {
	try {
		let exists = await users.findOne({ email: req.body.email });
		if (!exists) {
			res.flash("error", "User do not exists");
			res.redirect("/users/signup");
		} else {
			bcrypt.compare(req.body.password, exists.password, (err, result) => {
				if (err) return res.flash(err.message);
				if (result) {
					let token = jwt.sign(
						{ email: req.body.email, userId: exists._id },
						"baggie"
					);
					res.cookie("token", token);
					req.flash("success", "Logged in successfully");
					return res.redirect("/users/shop");
				} else {
					req.flash("error", "incorrect password");
					res.redirect("/");
				}
			});
		}
	} catch {
		(err) => {
			console.log(err.message);
		};
	}
});
router.post("/signup", async (req, res) => {
	try {
		const { username, email, password } = req.body;
		let exists = await users.findOne({ email: email });
		if (exists) {
			req.flash("error", "User exists");
			res.redirect("/");
		} else {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			await users.create({
				username,
				email,
				password: hash,
			});
			req.flash("success", "User created successfully");
			res.redirect("/login");
		}
	} catch {
		(err) => {
			res.send(err.message);
		};
	}
});

module.exports = router;
