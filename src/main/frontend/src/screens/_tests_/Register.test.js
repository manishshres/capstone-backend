import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Register from "../Register";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mockAlert = jest.fn();
global.alert = mockAlert;

const renderRegister = () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders register form", () => {
    renderRegister();
    expect(
      screen.getByRole("heading", { name: "Register" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    axios.post.mockResolvedValue({
      data: { message: "User registered successfully" },
    });
    renderRegister();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/register",
        {
          name: "Test User",
          email: "test@gmail.com",
          password: "password123",
        }
      );
    });
  });

  test("displays general error message", async () => {
    axios.post.mockRejectedValue({
      response: { data: { error: "Registration failed" } },
    });
    renderRegister();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Registration failed")).toBeInTheDocument();
    });
  });

  test("displays field-specific error messages", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          name: "Name is required",
          email: "Invalid email format",
          password: "Password must be at least 8 characters",
        },
      },
    });
    renderRegister();

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 8 characters")
      ).toBeInTheDocument();
    });
  });

  test("disables submit button while loading", async () => {
    axios.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { message: "Success" } }), 1000)
        )
    );
    renderRegister();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(
      screen.getByRole("button", { name: "Registering..." })
    ).toBeDisabled();

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Register" })
        ).not.toBeDisabled();
      },
      { timeout: 2000 }
    );
  });
});
