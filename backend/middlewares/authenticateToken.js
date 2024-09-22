const jwt = require("jsonwebtoken");
const { logger } = require("../utils/logger"); // Assuming you have a logger utility

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if the Authorization header is missing
    if (!authHeader) {
      logger.warn("Authorization header is missing"); // Optional logging
      return res
        .status(401)
        .json({ error: "Authorization header is required" });
    }

    // Split and extract the token from the Bearer token format
    const token = authHeader.split(" ")[1];

    // Check if token is present
    if (!token) {
      logger.warn("Token is missing in Authorization header"); // Optional logging
      return res
        .status(401)
        .json({ error: "Token is missing in the Authorization header" });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.SUPABASE_JWT_SECRET, (err, user) => {
      if (err) {
        // Differentiate between token expiration and other errors
        if (err.name === "TokenExpiredError") {
          logger.warn("Token has expired"); // Optional logging
          return res.status(401).json({ error: "Token has expired" });
        } else {
          logger.error("Invalid token", err); // Optional logging
          return res.status(403).json({ error: "Invalid token" });
        }
      }

      // Attach the user data from the token to the request object
      req.user = user;

      // Proceed to the next middleware or route
      next();
    });
  } catch (error) {
    // Catch any unexpected errors and send a 500 response
    logger.error("Error in authenticateToken middleware:", error); // Optional logging
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authenticateToken;
