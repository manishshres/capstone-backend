const winston = require("winston");
const { logger } = require("../../utils/logger");

jest.mock("winston", () => ({
  createLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
    error: jest.fn(),
  }),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    json: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
}));
describe("Logger Utility", () => {
  it("should create a logger instance", () => {
    expect(winston.createLogger).toHaveBeenCalled();
  });

  it("should log info messages", () => {
    logger.info("Test info message");
    expect(logger.info).toHaveBeenCalledWith("Test info message");
  });

  it("should log error messages", () => {
    logger.error("Test error message");
    expect(logger.error).toHaveBeenCalledWith("Test error message");
  });
});
