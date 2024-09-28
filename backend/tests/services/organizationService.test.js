const supabase = require("../../config/supabaseClient");
const { addOrganization } = require("../../services/organizationService");

// Mock the supabase client
jest.mock("../../config/supabaseClient");

describe("Organization Service", () => {
  const userId = "testUserId";

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test("should insert organization data into the database", async () => {
    const organizationData = {
      name: "Test Org",
      type: "Non-Profit",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip_code: "12345",
      latitude: 40.7128,
      longitude: -74.006,
      phone_number: "123-456-7890",
      email: "test@org.com",
      website: "http://test.org",
      description: "A test organization",
      services: ["service1", "service2"],
      hours_of_operation: "9 AM - 5 PM",
      capacity: 100,
      restrictions: "None",
      requirements: "None",
      external_id: "externalId123",
      status: "active",
    };

    supabase.from.mockReturnValue({
      insert: jest
        .fn()
        .mockResolvedValue({ data: [organizationData], error: null }),
    });

    const result = await addOrganization(organizationData, userId);

    expect(supabase.from).toHaveBeenCalledWith("organizations");
    expect(supabase.from("organizations").insert).toHaveBeenCalledWith([
      { ...organizationData, user_id: userId },
    ]);
    expect(result).toEqual([organizationData]);
  });

  test("should return an error if insertion fails", async () => {
    const organizationData = {
      name: "Test Org",
      type: "Non-Profit",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip_code: "12345",
      latitude: 40.7128,
      longitude: -74.006,
      phone_number: "123-456-7890",
      email: "test@org.com",
      website: "http://test.org",
      description: "A test organization",
      services: ["service1", "service2"],
      hours_of_operation: "9 AM - 5 PM",
      capacity: 100,
      restrictions: "None",
      requirements: "None",
      external_id: "externalId123",
      status: "active",
    };

    const mockError = new Error("Insert error");
    supabase.from.mockReturnValue({
      insert: jest.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    const result = await addOrganization(organizationData, userId);

    expect(result).toEqual(mockError);
  });
});
