const { addOrganization } = require("../../controllers/organizationController");
const organizationService = require("../../services/organizationService");

// Mock the organizationService
jest.mock("../../services/organizationService");

describe("Organization Controller", () => {
  let req, res;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock request and response objects
    req = {
      body: {},
      user: { userId: "testUserId" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock console.error to prevent logging during tests
    console.error = jest.fn();
  });

  test("should return 400 if name or type is missing", async () => {
    await addOrganization(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Name and type are required",
    });
  });

  test("sdding organization should return 201 on success", async () => {
    const mockResponse = { data: {}, error: null };
    organizationService.addOrganization.mockResolvedValue(mockResponse);

    req.body = { name: "Test Org", type: "Non-Profit" };
    await addOrganization(req, res);

    expect(organizationService.addOrganization).toHaveBeenCalledWith(
      req.body,
      req.user.userId
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Organization added successfully",
    });
  });

  test("should handle service errors", async () => {
    const error = new Error("Service error");
    organizationService.addOrganization.mockResolvedValue({
      data: null,
      error,
    });

    req.body = { name: "Test Org", type: "Non-Profit" };
    await addOrganization(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "An error occurred while adding the organization",
    });
    expect(console.error).toHaveBeenCalledWith(
      "Error adding organization:",
      error
    );
  });
});
