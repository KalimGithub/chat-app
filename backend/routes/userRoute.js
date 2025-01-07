const express = require("express");
const router = express.Router();
const {
  register,
  login,
  home,
  logout,
  getAllUsers,
} = require("../controllers/user-controller.js");
const isAuth = require("../middlewares/auth-middleware.js");

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getallusers", isAuth, getAllUsers);

module.exports = router;
