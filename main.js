/** @format */

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const ownersRouter = require("./routes/ownersRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productRouter = require("./routes/productRouter.js");
const flash = require("connect-flash");

const db = require("./config/mongoose-connection.js");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
	exresssSession({
		resave: false,
		saveUninitialized: false,
		secret: process.env.EXPRESS_SESSION_SECRET,
	})
);
app.use(flash());

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);

app.listen(3000, (req, res) => {
	console.log("Listening on port 3000");
});
