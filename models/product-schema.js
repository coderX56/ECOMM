/** @format */

const { mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
	image: String,
	name: String,
	price: Number,
	discount: { type: Number, default: 0 },
	bgcolor: String,
	pannelcolor: String,
	textcolor: String,
});
const productModel = new mongoose.model("products", productSchema);
module.exports = productModel;
