const router = require("express").Router();
const upload = require("../middlewares/imageUpload");

// Import route logic functions from route controller
const {
  getAllItems,
  getSpecificItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/Item");
const uploadItemImage = require("../controllers/imageUpload");

// Set routes for Items CRUD processes
router.get("/get", getAllItems);
router.get("/get/:id", getSpecificItem);
router.delete("/delete/:id", deleteItem);
router.post("/create", upload.single("image"), createItem);
router.put("/update/:id", updateItem);
router.put("/image/:id", upload.single("image"), uploadItemImage);

module.exports = router;
