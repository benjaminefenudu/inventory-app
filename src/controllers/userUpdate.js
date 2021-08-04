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

// Update Account Information
const updateInfo = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    // Limit user info changes via this route to only the following
    const { firstName, lastName, phoneNo, businessName } = req.body;

    // User can update or leave out any of these fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNo) user.phoneNo = phoneNo;
    if (businessName) user.businessName = businessName;

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
  user.password = password;
  await user.save();

  res.status(200).json({
    status: "success",
    msg: "Your password has been updated!",
    user,
  });
};

module.exports = { currentUserDetails, updateInfo, changePassword };
