import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Dashboard from "../Dashboard";

// Mock axios
jest.mock("axios");

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

test("Dashboard component and tests functionality", async () => {
  // Mock the axios get request
  axios.get.mockResolvedValue({
    data: [
      {
        name: "Test Shelter",
        address: "123 Test St",
        city: "Test City",
        state: "TS",
        zip_code: "12345",
        phone_number: "123-456-7890",
        official_website: "http://testshelter.com",
      },
    ],
  });

  render(<Dashboard />);

  // Check if the search input is rendered
  const searchInput = screen.getByPlaceholderText("Enter City Name or zipcode");
  expect(searchInput).toBeInTheDocument();

  // Check if the service type dropdown is rendered
  const serviceTypeDropdown = screen.getByRole("combobox");
  expect(serviceTypeDropdown).toBeInTheDocument();

  // Check if the search button is rendered
  const searchButton = screen.getByRole("button", { name: /search/i });
  expect(searchButton).toBeInTheDocument();

  // Simulate a search
  fireEvent.change(searchInput, { target: { value: "Test City" } });
  fireEvent.click(searchButton);

  // Wait for the async operation to complete
  await screen.findByText("Test Shelter");

  // Check if the shelter information is rendered
  expect(screen.getByText("Test Shelter")).toBeInTheDocument();
  expect(screen.getByText("123 Test St")).toBeInTheDocument();
  expect(screen.getByText("Test City, TS 12345")).toBeInTheDocument();
  expect(screen.getByText("123-456-7890")).toBeInTheDocument();

  // Check if the official website link is rendered
  const websiteLink = screen.getByText("Official Website");
  expect(websiteLink).toBeInTheDocument();
  expect(websiteLink).toHaveAttribute("href", "http://testshelter.com");

  // Check if pagination controls are rendered
  expect(screen.getByText("Previous")).toBeInTheDocument();
  expect(screen.getByText("Next")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
});
