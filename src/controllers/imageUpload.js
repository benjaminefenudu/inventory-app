const Item = require("../models/Item");

// Upload Item Image
const uploadItemImage = async (req, res) => {
  try {
    const item = await Item.findOne({ user: req.user.id, _id: req.params.id });

    // Check if item exists in DB
    if (!item)
      return res
        .status(404)
        .json({ status: "failed", msg: `Item with ID ${req.params.id} not found!` });

    // Check if image file was selected
    if (req.file == undefined)
      return res
        .status(404)
        .json({ status: "failed", msg: "No image file selected!" });

    // Update the item with image URL link
    item.image = `http://localhost:4000/item/image/${req.file.filename}`;
    await item.save();

    res.status(200).json({ status: "success", msg: "Image uploaded", item });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = uploadItemImage;
