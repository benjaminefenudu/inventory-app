const User = require("../models/User");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.id });

    res.json(singleUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = { getAllUsers, getSingleUser };
