// backend/services/protectedService.js
exports.getUserProfile = async (userId) => {
  try {
    // Simulating a database call to fetch user profile based on userId
    if (userId === "invalid-id") {
      throw new Error("Error fetching user profile");
    }

    const userProfile = {
      id: userId,
      name: "Test User",
      email: "testuser@gmail.com",
      role: "user",
    };

    // In a real-world scenario, this would fetch from the database
    return { userProfile };
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};
