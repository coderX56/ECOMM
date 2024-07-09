/** @format */

const express = require("express");
const router = express.Router();
const users = require("./models/user-schema.js");

router.get("/", (req, res) => {
	res.send("signup");
});
router.post("/login", async (req, res) => {
	try {
		let exists = await users.findOne({ email: req.body.email });
		if (!exists) res.send("User do not exists");
		else {
			bcrypt.compare(req.body.password, exists.password, (err, result) => {
				if (err) return res.send(err.message);
				if (result) {
					let token = jwt.sign({ email, usewrId: exists._id }, "baggie");
					res.cookie("token", token);
					res.send("Logged in successfully");
				} else {
					res.send("incorrect password");
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
		if (exists) res.send("User exists");
		else {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			await users.create({
				username,
				email,
				password: hash,
			});
			res.redirect("/login");
		}
	} catch {
		(err) => {
			res.send(err.message);
		};
	}
});

module.exports = router;
