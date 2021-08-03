// ITEM CRUD OPERATIONS
const Item = require("../models/Item");
const itemValidation = require("../validations/Item");

// Get All Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    if (items.length === 0)
      return res
        .status(200)
        .json({ status: "success", msg: "There are no items!" });
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Get Specific Item
const getSpecificItem = async (req, res) => {
  try {
    const item = await Item.findOne({ user: req.user.id, _id: req.params.id });
    if (!item)
      return res.status(404).json({
        status: "failed",
        msg: `ID ${req.params.id} does not exist!`,
      });
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Create Item
const createItem = async (req, res) => {
  try {
    // validate before creating new item
    const { error } = itemValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if item already exists for user
    req.body.name.trim(); // Trim spaces
    const itemExists = await Item.findOne({
      user: req.user.id,
      name: `${req.body.name}`,
    });
    // If item exists, add the new value to noInStock
    if (itemExists) {
      itemExists.noInStock =
        Number(itemExists.noInStock) + Number(req.body.noInStock);
      await itemExists.save();
      return res.status(200).json({
        success: true,
        msg: "Item exists; noInStock updated",
        item: itemExists,
      });
    } else {
      // Create item, append user ID and store in database

      // If no image uploaded, set as "no image" otherwise return image link
      const imageURL =
        req.file == undefined
          ? "No image"
          : `http://localhost:4000/item/image/${req.file.filename}`;

      const item = new Item({
        ...req.body,
        user: req.user.id,
        image: imageURL,
      });
      await item.save();

      res
        .status(201)
        .json({ status: "success", msg: "New item created.", item });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    let item = await Item.find({ _id: req.params.id, user: req.user.id });

    if (!item)
      return res
        .status(404)
        .json({ status: "failed", msg: `Item with ID ${_id} not found!` });

    item = {
      ...req.body,
    };
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

// Delete Item by ID
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete({
      user: req.user.id,
      _id: req.params.id,
    });

    if (!item)
      return res
        .status(404)
        .json({ status: "failed", msg: `Item with ID ${item._id} not found!` });
    res.status(200).json({
      status: "success",
      msg: `Item with ID ${item._id} succesfully deleted.`,
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
