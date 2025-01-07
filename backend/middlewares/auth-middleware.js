const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuth = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "No token, Authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    // console.log(decoded);
    const user = await User.findById(decoded.userId).select("-password");
    // console.log(user);
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in isAuth", error);
    return res.status(501).json({ error: "Internal server error" });
  }
};

module.exports = isAuth;
