const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { passwordChangeValidation } = require("../validations/User");

// Show Current User Details
const currentUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

// Update Account Information // NOT COMPLETED
const updateInfo = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({
      _id: req.user.id,
      updateUser: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        businessName: req.body.businessName,
      },
    });
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Change Account Password
const changePassword = async (req, res) => {
  // validate request body
  const { error } = passwordChangeValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user old password is correct
  let user = await User.findById(req.user.id);
  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validPassword)
    return res.status(400).json({
      success: false,
      msg: "Invalid Old Password.",
    });

  // Hash new password and replace
  const password = await bcrypt.hash(req.body.newPassword, 12);

  user = await User.findById(req.user.id);
  user.password = password;
  await user.save();

  res.status(200).json({
    status: "success",
    msg: "Your password has been updated!",
    result,
  });
};

module.exports = { currentUserDetails, updateInfo, changePassword };
