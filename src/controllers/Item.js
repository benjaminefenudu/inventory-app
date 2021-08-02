// ITEM CRUD OPERATIONS
const User = require("../models/User");
const Item = require("../models/Item");
const itemValidation = require("../validations/Item");

// Get All Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    if (!items) return res.json({ msg: "No item found!" });
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Get Specific Item
const getSpecificItem = async (req, res) => {
  try {
    const item = await Item.findOne({ user: req.user.id, name: req.params.id });
    if (!item) return res.json(`${req.params.id} does not exist!`);
    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create Item
const createItem = async (req, res) => {
  try {
    // validate before creating new item
    const { error } = itemValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create item, append user ID and store in database.
    const item = new Item({ ...req.body, user: req.user.id });
    await item.save();
    res.json({ msg: "New item created.", item });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Item // NOT YET COMPLETED
const updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { user: req.user.id, _id: req.params.id },
      { ...req.body }
    );

    if (!item)
      return res.status(404).json({ status: "fail", msg: "Item not found!" });

    await item.save();
    res.status(200).json({
      status: "success",
      msg: "Item has been updated",
      item,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Upload Image // WORK IN PROGRESS
// image: req.file.filename

// Delete Item by ID // NOT YET COMPLETED
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete({
      user: user.id,
      _id: req.params.id,
    });

    if (!item)
      return res.status(404).json({ status: "fail", msg: "Item not found" });
    res
      .status(200)
      .json({
        status: "success",
        msg: `Item with ID ${_id} succesfully deleted.`,
      });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = {
  getAllItems,
  getSpecificItem,
  createItem,
  updateItem,
  deleteItem,
};
