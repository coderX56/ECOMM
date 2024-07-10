/** @format */

const express = require("express");
const router = express.Router();
const products = require("../models/product-schema");
const upload = require("../config/multer");

router.post("/create", upload.single("image"), async (req, res) => {
	try {
		const { image, name, price, discount, bgcolor, pannelcolor, textcolor } =
			req.body;

		// Check if all required fields are provided

		const product = await products.create({
			image,
			name,
			price,
			discount,
			bgcolor,
			pannelcolor,
			textcolor,
		});

		req.flash("success", "Product created successfully.");
		res.redirect("/owner/admin");
	} catch (err) {
		// Log and handle the error
		console.error(err);
		res.status(500).send("An error occurred while creating the product");
	}
});

module.exports = router;
