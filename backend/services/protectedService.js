// Example of a protected service that retrieves user profile data
exports.getUserProfile = async (userId) => {
  try {
    // Simulating a database call to fetch user profile based on userId
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
