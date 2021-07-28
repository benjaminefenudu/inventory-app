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
  user: { type: Schema.ObjectId },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);
