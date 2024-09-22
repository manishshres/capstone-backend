const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// POST request for registering a user
router.post("/register", authController.register);

// POST request for logging in a user
router.post("/login", authController.login);

module.exports = router;
