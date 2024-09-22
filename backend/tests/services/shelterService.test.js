const { getSheltersByZipcode } = require("../../services/shelterService");
const https = require("https");

jest.mock("https");

describe("Shelter Service", () => {
  const mockShelterData = [
    {
      name: "Men's Eastside Winter Shelter",
      address: "515B 116th Ave NE",
      city: "Bellevue",
      state: "WA",
      zip_code: "98004",
      location: "47.61487737486411,-122.1857149741896",
      phone_number: "(425) 296-3797",
      email_address: "volunteer@cfhomeless.org",
      official_website: "http://www.cfhomeless.org/winter-shelter/",
      description: "Winter Shelter...",
      photo_urls: [
        "https://www.homelessshelterdirectory.org/gallery/15928__pqc.jpg",
      ],
      update_datetime: "2023-06-21T17:26:38Z",
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch shelters by zipcode", async () => {
    const mockResponse = {
      on: jest.fn((event, callback) => {
        if (event === "data") {
          // Return mock data as Buffer
          callback(Buffer.from(JSON.stringify(mockShelterData)));
        }
        if (event === "end") {
          callback();
        }
      }),
    };

    const mockRequest = {
      on: jest.fn(),
      end: jest.fn(),
    };

    https.request.mockImplementation((options, callback) => {
      callback(mockResponse);
      return mockRequest;
    });

    const result = await getSheltersByZipcode("98004");

    expect(result).toEqual(mockShelterData);
    expect(https.request).toHaveBeenCalled();
    expect(mockRequest.end).toHaveBeenCalled();
  });

  test("should handle empty response", async () => {
    const mockResponse = {
      on: jest.fn((event, callback) => {
        if (event === "data") {
          // Return empty array as Buffer
          callback(Buffer.from(JSON.stringify([])));
        }
        if (event === "end") {
          callback();
        }
      }),
    };

    const mockRequest = {
      on: jest.fn(),
      end: jest.fn(),
    };

    https.request.mockImplementation((options, callback) => {
      callback(mockResponse);
      return mockRequest;
    });

    const result = await getSheltersByZipcode("00000");

    expect(result).toEqual([]);
  });
});
