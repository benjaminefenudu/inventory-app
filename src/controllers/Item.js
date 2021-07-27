// ITEM CRUD OPERATIONS
const Item = require("../models/Item");
const User = require("../models/User");
const itemValidation = require("../validations/Item");

// Get All Items
const getAllItems = async (req, res) => {
  try {
    const allItems = await Item.find({});
    res.json(allItems);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Get Specific Item
const getSpecificItem = async (req, res) => {
  try {
    const specificItems = await Item.findOne({});
    res.json(specificItems);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Create Item
const createItem = async (req, res) => {
  try {
    // validate before creating new item
    const { error } = itemValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const createItem = { item: req.body, user: req.user.id };

    await Item.create(createItem);

    res.status(200).json(createItem);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
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

// Delete Item by ID
const deleteItemById = async (req, res) => {
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
  deleteItemById,
};
