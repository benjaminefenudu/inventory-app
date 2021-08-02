const router = require("express").Router();
const upload = require("../controllers/imageUpload");

// Import route logic functions from route controller
const {
  createItem,
  updateItem,
  deleteItem,
  getAllItems,
  getSpecificItem,
} = require("../controllers/ItemBackup");

// Set routes for Items CRUD processes
router.get("/get", getAllItems);
router.post("/create", upload.single("image"), createItem);
router.get("/get/:id", getSpecificItem);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
