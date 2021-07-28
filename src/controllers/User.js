const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signUpValidation, signInValidation } = require("../validations/User");

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= SIGN-UP =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const signUp = async (req, res) => {
  try {
    // validate before creating new user
    const { error } = signUpValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists in dummy database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(400)
        .json({ success: false, msg: "Email already exists." });

    if (req.body.password !== req.body.confirmPassword) {
      return res.json({ success: false, msg: "Password does not match." });
    }

    // Hash passwords
    password = await bcrypt.hash(req.body.password, 12);

    // Create user and store in database
    const user = new User({ ...req.body, password });
    await user.save();

    // Return new user details
    res.status(201).json({
      success: true,
      msg: `User ${user._id} has been created.`,
      data: user,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= SIGN-IN =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const signIn = async (req, res) => {
  // validate the entered user data
  const { error } = signInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists in dummy database
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ success: false, msg: "Invalid Email." });

  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ success: false, msg: "Invalid Password." });

  // Create a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // Assign token and send user details
  res.cookie("auth_token", token).status(200).json({
    success: true,
    msg: "Logged in successfully!",
    userDetails: user,
  });
  console.log(token)
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= LOG OUT =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const logOut = (req, res) => {
  return res
    .clearCookie("auth_token")
    .status(200)
    .json({ success: true, msg: "Successfully logged out!" });
};

module.exports = { signUp, signIn, logOut };
