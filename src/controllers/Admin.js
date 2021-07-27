const User = require("../models/User");
const mongoose = require("mongoose");

// Update Account Information
const updateInfo = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Change Account Password
const changePassword = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body.password);
    await User.save();
    res.send(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { updateInfo, changePassword };
