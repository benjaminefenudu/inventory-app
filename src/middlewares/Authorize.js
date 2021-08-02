const jwt = require("jsonwebtoken");
const User = require("../models/User");

authorize = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token)
    return res
      .status(403)
      .json({ success: false, msg: "Access Denied! Sign In!" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(verified.id)
    req.user = verified;
  } catch (err) {
    return res.status(403).send({ sucess: false, msg: "Invalid Token!" });
  }
  next();
};

module.exports = authorize;
