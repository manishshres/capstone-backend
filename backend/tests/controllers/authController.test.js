const authController = require("../../controllers/authController");
const authService = require("../../services/authService");
const jwt = require("jsonwebtoken");

jest.mock("../../services/authService");
jest.mock("jsonwebtoken");
jest.mock("../../utils/logger");

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { email: "test@example.com", password: "password123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("register", () => {
    it("should register a user successfully", async () => {
      authService.register.mockResolvedValue({
        user: { id: "123", email: "test@example.com" },
      });
      jwt.sign.mockReturnValue("fake-token");

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User registered successfully",
        token: "fake-token",
      });
    });

    it("should handle registration errors", async () => {
      authService.register.mockResolvedValue({ error: "Registration failed" });

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Registration failed" });
    });
  });

  describe("login", () => {
    it("should log in a user successfully", async () => {
      authService.login.mockResolvedValue({
        user: { id: "123", email: "test@example.com" },
      });
      jwt.sign.mockReturnValue("fake-token");

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "fake-token" });
    });

    it("should handle login errors", async () => {
      authService.login.mockResolvedValue({ error: "Invalid credentials" });

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
    });
  });
});
