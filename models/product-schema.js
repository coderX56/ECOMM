/** @format */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({});

const products = new mongoose.model("", productSchema);
module.exports = products;
