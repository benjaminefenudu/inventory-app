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
  URL: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = itemSchema
