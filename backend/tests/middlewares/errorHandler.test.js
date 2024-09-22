const errorHandler = require("../../middlewares/errorHandler");

describe("Error Handler Middleware", () => {
  it("should handle errors and return 500 status", () => {
    const err = new Error("Test error");
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      message: "Test error",
    });
  });
});
