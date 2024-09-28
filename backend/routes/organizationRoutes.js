const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");
const authenticateToken = require("../middlewares/authenticateToken");

// Route to add a new organization
router.post(
  "/organizations",
  authenticateToken,
  organizationController.addOrganization
);

module.exports = router;
