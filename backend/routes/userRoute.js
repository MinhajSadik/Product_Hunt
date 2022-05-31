const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/reset").post(forgotPassword);
router.route("/logout").get(logout);

module.exports = router;
