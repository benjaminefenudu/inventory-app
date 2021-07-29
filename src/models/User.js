const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  },
  businessName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
    default: "",
  },
  phoneNo: {
    type: String,
    required: true,
    min: 8,
    max: 11,
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
});

module.exports = mongoose.model("User", userSchema);
