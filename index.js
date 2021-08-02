const express = require("express");
const app = express();
const connectDatabase = require("./config/database");

// Fetch Database and Listen
connectDatabase(app);

// Parse Request Body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Cookie Parser and Token Verification Middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Use cookies to deny unauthorized access
const authorize = require("./src/middlewares/Authorize"); // Import middleware

// Import Routes
const user = require("./src/routes/User");
const item = require("./src/routes/Item");
const userUpdate = require("./src/routes/userUpdate");
const dbManager = require("./src/routes/dbManager");
const imageUpload = require("./src/routes/imageUpload");

// Unprotected route
app.use("/user", user);

// Protected routes
app.use("/item", authorize, item);
app.use("/item/image", authorize, imageUpload);
app.use("/user/profile", authorize, userUpdate);
app.use("/database", authorize, dbManager);

console.log("...waiting for database...");
