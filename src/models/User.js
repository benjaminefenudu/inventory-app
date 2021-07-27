const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = require("./Item")

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
    default: "",
  },
  businessName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  item: [itemSchema],
  // item: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Item",
  // },
});

module.exports = mongoose.model("User", userSchema);
