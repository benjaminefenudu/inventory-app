const express = require("express");
const app = express();
const path = require("path");
const connectDatabase = require("./config/database");

// Fetch Database and Listen
connectDatabase(app);

// Parse Request Body as JSON and render static image files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/item/image", express.static("public/uploads/images"));

// Import Cookie Parser and Token Verification Middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Use cookies to set access token
const authorize = require("./src/middlewares/Authorize"); // Import middleware

// Import Routes
const user = require("./src/routes/User");
const item = require("./src/routes/Item");
const userUpdate = require("./src/routes/userUpdate");
const dbManager = require("./src/routes/dbManager");

// Unprotected route
app.use("/user", user);

// Protected routes
app.use("/item", authorize, item);
app.use("/user/profile", authorize, userUpdate);
app.use("/database", authorize, dbManager);

console.log("...waiting for database...");
