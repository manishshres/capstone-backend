module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  setupFiles: ["dotenv/config"],
  testPathIgnorePatterns: ["/node_modules/", "/frontend/"],
};
