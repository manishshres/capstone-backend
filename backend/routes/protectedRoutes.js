const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const protectedController = require("../controllers/protectedController");

// Protected route to get user profile
router.get(
  "/profile",
  authenticateToken,
  protectedController.getProtectedProfile
);

module.exports = router;
