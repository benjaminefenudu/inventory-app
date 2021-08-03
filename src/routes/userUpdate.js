const router = require("express").Router();

// Import route logic functions from route controller
const { currentUserDetails, updateInfo, changePassword } = require("../controllers/userUpdate");

// Set routes for Account Administration Operations
router.get("/", currentUserDetails)
router.patch("/update", updateInfo);
router.patch("/change-password", changePassword);

module.exports = router;
