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
router.get("/", getAllItems);
router.post("/:id", getSpecificItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
