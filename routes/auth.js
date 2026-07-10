const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  getMe,
} = require("../controller/authController");

const protect = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;