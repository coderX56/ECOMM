/** @format */

const express = require("express");
const router = express.Router();
if (process.env.NODE_ENV === "development") {
	router.get("/", (req, res) => {
		res.send("heyyy");
	});
}
module.exports = router;
