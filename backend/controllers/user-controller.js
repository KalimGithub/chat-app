const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createTokenAndSaveCookies } = require("../jwt/generateToken.js");

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      createTokenAndSaveCookies(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    // checking email
    if (!email) return res.status(400).json("invalid Email");
    const user = await User.findOne({ email });
    // user validation
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found plz register first!!" });
    }
    // compare password
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    createTokenAndSaveCookies(user._id, res);

    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    // delete cookie
    // clearCookie;
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    // console.log(loggedInUser);
    // const filteredUser=
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login, logout, getAllUsers };
