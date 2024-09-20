const protectedService = require("../services/protectedService");
const { logger } = require("../utils/logger");

exports.getProtectedProfile = async (req, res) => {
  try {
    // Accessing the authenticated user's data from the token
    const userId = req.user.userId;

    // Log the request
    logger.info(`Fetching profile for user ID: ${userId}`);

    // Call the service to get the profile data
    const { userProfile } = await protectedService.getUserProfile(userId);

    // Return the user profile as the response
    res.status(200).json({
      message: "User profile fetched successfully",
      profile: userProfile,
    });
  } catch (error) {
    logger.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
