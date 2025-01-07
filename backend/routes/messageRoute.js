const express = require("express");
const {
  sendMessage,
  getMessage,
} = require("../controllers/message.controller");
const isAuth = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/send/:id", isAuth, sendMessage);
router.get("/get/:id", isAuth, getMessage);

module.exports = router;
