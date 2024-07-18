/** @format */

const express = require("express");
const router = express.Router();
const users = require("../models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("../models/product-schema");
const isLoggedin = require("../middlewares/loginverify");
router.get("/", async (req, res) => {
	try {
		let products = await productModel.find();
		let user = null;
		if (req.cookies.token) {
			try {
				const data = jwt.verify(req.cookies.token, "baggie");
				user = await users.findOne({ email: data.email });
			} catch (err) {
				console.log(err.message);
			}
		}
		let error = req.flash("error");
		let success = req.flash("success");
		res.render("shop", { products, user, success, error, req });
	} catch (err) {
		console.log(err.message);
		res.redirect("/users/login");
	}
});

router.get("/signup", (req, res) => {
	let error = req.flash("error");
	let success = req.flash("success");
	res.render("signup", { error, success });
});
router.get("/login", async (req, res) => {
	let error = req.flash("error");
	let success = req.flash("success");
	res.render("login", { error, success });
});
router.get("/cart/:id", isLoggedin, async (req, res) => {
	let user = await users.findOne({ email: req.user.email });
	user.cart.push(req.params.id);
	user.save();
	let products = await productModel.find({ _id: { $in: user.cart } });
	//let product = await productModel.findOne({ _id: req.params.id });

	res.send("cart", { user, products });
});
router.post("/login", async (req, res) => {
	try {
		let exists = await users.findOne({ email: req.body.email });
		if (!exists) {
			req.flash("error", "User do not exists");
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
					return res.redirect("/");
				} else {
					req.flash("error", "incorrect password");
					res.redirect("/login");
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
