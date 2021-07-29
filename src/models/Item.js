const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    max: 1000,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    max: 255,
    trim: true,
    default: "",
  },
  price: {
    type: Number,
    trim: true,
    default: 0,
  },
  noInStock: {
    type: Number,
    trim: true,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Item", itemSchema);
