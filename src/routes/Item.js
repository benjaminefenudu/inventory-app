const router = require("express").Router();
const upload = require("../controllers/imageUpload");

// Import route logic functions from route controller
const {
  createItem,
  updateItem,
  deleteItem,
  getAllItems,
  getSpecificItem,
} = require("../controllers/Item");

// Set routes for Items CRUD processes
router.get("/get", getAllItems);
router.get("/get/:id", getSpecificItem);
router.post("/create", upload.single("image"), createItem);
router.put("/update/:id", upload.single("image"), updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;
