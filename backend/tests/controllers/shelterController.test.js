const { getShelters } = require("../../controllers/shelterController");
const shelterService = require("../../services/shelterService");

// Mock the shelterService
jest.mock("../../services/shelterService");

describe("Shelter Controller", () => {
  let req, res, next;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock request and response objects
    req = {
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    // Mock console.error to prevent logging during tests
    console.error = jest.fn();
  });

  test("should return 400 if zipcode is missing", async () => {
    await getShelters(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Zipcode is required" });
    expect(shelterService.getSheltersByZipcode).not.toHaveBeenCalled();
  });

  test("should return shelters for valid zipcode", async () => {
    const mockShelters = [{ name: "Shelter 1" }, { name: "Shelter 2" }];
    shelterService.getSheltersByZipcode.mockResolvedValue(mockShelters);

    req.query.zipcode = "12345";
    await getShelters(req, res);

    expect(shelterService.getSheltersByZipcode).toHaveBeenCalledWith("12345");
    expect(res.json).toHaveBeenCalledWith(mockShelters);
    expect(res.status).not.toHaveBeenCalled();
  });

  test("should handle empty shelter list", async () => {
    shelterService.getSheltersByZipcode.mockResolvedValue([]);

    req.query.zipcode = "12345";
    await getShelters(req, res);

    expect(shelterService.getSheltersByZipcode).toHaveBeenCalledWith("12345");
    expect(res.json).toHaveBeenCalledWith([]);
    expect(res.status).not.toHaveBeenCalled();
  });

  test("should handle service errors", async () => {
    const error = new Error("Service error");
    shelterService.getSheltersByZipcode.mockRejectedValue(error);

    req.query.zipcode = "12345";
    await getShelters(req, res);

    expect(shelterService.getSheltersByZipcode).toHaveBeenCalledWith("12345");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "An error occurred while fetching shelters",
    });
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching shelters:",
      error
    );
  });

  test("should handle non-string zipcode input", async () => {
    req.query.zipcode = 12345; // number instead of string
    await getShelters(req, res);

    expect(shelterService.getSheltersByZipcode).toHaveBeenCalledWith("12345");
  });

  test("should trim whitespace from zipcode", async () => {
    req.query.zipcode = " 12345 ";
    await getShelters(req, res);

    expect(shelterService.getSheltersByZipcode).toHaveBeenCalledWith("12345");
  });
});
