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
const User = require("./src/routes/User");
const Item = require("./src/routes/Item");
const Admin = require("./src/routes/Admin");
const dbManager = require("./src/routes/dbManager");

app.use("/inventory/api");

// Route Middlewares
app.use("/user", User);
app.use("/item", authorize, Item); // Deny access to route
app.use("/admin", authorize, Admin); // Deny access to route
app.use("/database", authorize, dbManager); // Deny access to route

console.log("...waiting for database...");
