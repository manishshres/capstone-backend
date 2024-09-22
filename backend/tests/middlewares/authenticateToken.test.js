const authenticateToken = require("../../middlewares/authenticateToken");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");
jest.mock("../../utils/logger");

describe("Authenticate Token Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should pass authentication with valid token", () => {
    req.headers["authorization"] = "Bearer valid-token";
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { userId: "123" });
    });

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ userId: "123" });
  });

  it("should return 401 if Authorization header is missing", () => {
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Authorization header is required",
    });
  });

  it("should return 401 if token is missing", () => {
    req.headers["authorization"] = "Bearer ";

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Token is missing in the Authorization header",
    });
  });

  it("should return 401 if token has expired", () => {
    req.headers["authorization"] = "Bearer expired-token";
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback({ name: "TokenExpiredError" });
    });

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token has expired" });
  });

  it("should return 403 if token is invalid", () => {
    req.headers["authorization"] = "Bearer invalid-token";
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid token" });
  });
});
