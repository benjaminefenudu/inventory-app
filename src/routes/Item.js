const router = require("express").Router();

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
router.post("/create", createItem);
router.get("/get/:id", getSpecificItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
