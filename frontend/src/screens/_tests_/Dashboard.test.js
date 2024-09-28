import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Dashboard from "../Dashboard";

jest.mock("axios");
jest.mock("components/ShelterList", () => {
  return function MockShelterList({ shelters }) {
    return (
      <div data-testid="shelter-list">
        {shelters.map((shelter) => (
          <div key={shelter.id || shelter.name}>{shelter.name}</div>
        ))}
      </div>
    );
  };
});

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: Router });
};

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue("mock-token");
  });

  test("renders Dashboard component and tests basic functionality", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Test Shelter",
          address: "123 Test St",
          city: "Test City",
          state: "TS",
          zip_code: "12345",
          phone_number: "123-456-7890",
          official_website: "http://testshelter.com",
          photo_urls: ["test.jpg"],
        },
      ],
    });

    renderWithRouter(<Dashboard />);

    const searchInput = screen.getByPlaceholderText(
      "Enter City, State or Zipcode"
    );
    expect(searchInput).toBeInTheDocument();

    const serviceTypeDropdown = screen.getByRole("combobox");
    expect(serviceTypeDropdown).toBeInTheDocument();

    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "Test City" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("Test Shelter")).toBeInTheDocument();
    });
  });

  test("handles empty search results", async () => {
    axios.get.mockResolvedValue({ data: [] });

    renderWithRouter(<Dashboard />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter City, State or Zipcode"),
      { target: { value: "Empty City" } }
    );
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      const shelterList = screen.getByTestId("shelter-list");
      expect(shelterList).toBeInTheDocument();
      expect(shelterList.children).toHaveLength(0);
    });
  });

  test("uses correct authorization header", async () => {
    axios.get.mockResolvedValue({ data: [] });

    renderWithRouter(<Dashboard />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter City, State or Zipcode"),
      { target: { value: "Test City" } }
    );
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/api/shelters?search=Test City",
        expect.objectContaining({
          headers: {
            Authorization: "Bearer mock-token",
          },
        })
      );
    });
  });

  test("displays loading state while fetching data", async () => {
    axios.get.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 100))
    );

    renderWithRouter(<Dashboard />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter City, State or Zipcode"),
      { target: { value: "Test City" } }
    );
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText("Searching...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Searching...")).not.toBeInTheDocument();
    });
  });

  test("displays error message when API call fails", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    renderWithRouter(<Dashboard />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter City, State or Zipcode"),
      { target: { value: "Test City" } }
    );
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "An error occurred while fetching shelters. Please try again."
        )
      ).toBeInTheDocument();
    });
  });
});
