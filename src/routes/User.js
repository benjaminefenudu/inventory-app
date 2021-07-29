const router = require("express").Router();

// Import route logic functions from route controller
const { signUp, signIn, logOut } = require("../controllers/User");

// Set routes for User CRUD Operations
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logOut);

module.exports = router;
