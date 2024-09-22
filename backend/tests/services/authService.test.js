const authService = require("../../services/authService");
const supabase = require("../../config/supabaseClient");

jest.mock("../../config/supabaseClient");

describe("Auth Service", () => {
  const mockEmail = "test@example.com";
  const mockPassword = "password123";

  describe("register", () => {
    it("should register a user successfully", async () => {
      const mockUser = { id: "123", email: mockEmail };
      supabase.auth.signUp.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const result = await authService.register(mockEmail, mockPassword);

      expect(result).toEqual({ user: mockUser });
    });

    it("should handle registration errors", async () => {
      const mockError = new Error("Registration failed");
      supabase.auth.signUp.mockResolvedValue({ data: null, error: mockError });

      const result = await authService.register(mockEmail, mockPassword);

      expect(result).toEqual({ error: "Registration failed" });
    });
  });

  describe("login", () => {
    it("should log in a user successfully", async () => {
      const mockUser = { id: "123", email: mockEmail };
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const result = await authService.login(mockEmail, mockPassword);

      expect(result).toEqual({ user: mockUser });
    });

    it("should handle login errors", async () => {
      const mockError = new Error("Invalid credentials");
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const result = await authService.login(mockEmail, mockPassword);

      expect(result).toEqual({ error: "Invalid credentials" });
    });
  });
});
