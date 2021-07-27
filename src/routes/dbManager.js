const router = require("express").Router();

// Import route logic functions from route controller
const { getAllUsers, getSingleUser } = require("../controllers/dbManager");

// Set routes for Account Administration Operations
router.get("/getallusers", getAllUsers);
router.get("/getsingleuser/:id", getSingleUser);

module.exports = router;
