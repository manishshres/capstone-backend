const express = require("express");
const router = express.Router();
const shelterController = require("../controllers/shelterController");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/shelters", authenticateToken, shelterController.getShelters);

module.exports = router;
