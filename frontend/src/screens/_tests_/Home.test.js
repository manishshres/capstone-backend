import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../Home";

test("renders Home component", () => {
  render(
    <Router>
      <Home />
    </Router>
  );

  expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  expect(screen.getByText(/Home Shelter Finder/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Discover amazing features and services/i)
  ).toBeInTheDocument();

  const loginButton = screen.getByRole("link", { name: /login/i });
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toHaveAttribute("href", "/login");

  const registerButton = screen.getByRole("link", { name: /register/i });
  expect(registerButton).toBeInTheDocument();
  expect(registerButton).toHaveAttribute("href", "/register");
});
