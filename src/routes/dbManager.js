const router = require("express").Router();

// Import route logic functions from route controller
const { getAllUsers, getSingleUser } = require("../controllers/dbManager");

// Set routes for Account Administration Operations
router.get("/getusers", getAllUsers);
router.get("/getusers/:id", getSingleUser);

module.exports = router;
