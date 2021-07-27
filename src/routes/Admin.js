const router = require("express").Router();

// Import route logic functions from route controller
const {
  updateInfo,
  changePassword,
  getAllUsers,
  getSingleUser,
} = require("../controllers/Admin");

// Set routes for Account Administration Operations
router.get("/getallusers", getAllUsers);
router.get("/getsingleuser/:id", getSingleUser);
router.patch("/update/:id", updateInfo);
router.patch("/change-password", changePassword);

module.exports = router;
