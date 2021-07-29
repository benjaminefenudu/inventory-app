// ITEM CRUD OPERATIONS
const User = require("../models/User");
const Item = require("../models/Item");
const itemValidation = require("../validations/Item");

// Get All Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    if (!items) return res.json(`No item found!`)
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
    if (!item) return res.json(`${req.params.id} does not exist!`)
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
    const newItem = new Item({ ...req.body, user: req.user.id });
    await newItem.save();
    res.json({ msg: "New item created.", newItem });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    const userItem = await User.findOneAndUpdate({ _id: req.params.id });
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Upload Image
// image: req.file.filename

// Delete Item by ID
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) return res.status(404).send("No item found");
    res.status(200).send("Item was deleted.");
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
