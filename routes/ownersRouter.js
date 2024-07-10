/** @format */

const express = require("express");
const router = express.Router();

if (process.env.NODE_ENV === "development") {
	router.get("/", (req, res) => {
		res.send("heyyy");
	});
}

router.get("/admin", (req, res) => {
	let success = req.flash("success");
	res.render("createProduct", { success });
});

module.exports = router;
