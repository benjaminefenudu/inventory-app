const router = require("express").Router();

// Import route logic functions from route controller
const { updateInfo, changePassword } = require("../controllers/userUpdate");

// Set routes for Account Administration Operations
router.patch("/update/:id", updateInfo);
router.patch("/change-password", changePassword);

module.exports = router;
