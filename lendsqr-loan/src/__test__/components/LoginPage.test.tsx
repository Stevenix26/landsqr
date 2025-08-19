import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "@/app/(auth)/login/page";
import { useRouter } from "next/navigation";

// Mock next/navigation
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// No external auth module is used in the page, so we do not need to mock '@/lib/auth'

describe("LoginPage Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("Positive Tests", () => {
    it("renders login page correctly", () => {
      render(<LoginPage />);
      expect(screen.getByText("Welcome!")).toBeInTheDocument();
      expect(screen.getByText("Enter details to login.")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(screen.getByText("LOG IN")).toBeInTheDocument();
    });

    it("renders logo and illustration", () => {
      render(<LoginPage />);
      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(2);
      expect(images[0]).toHaveAttribute("alt", "Logo");
      expect(images[1]).toHaveAttribute("alt", "Illustration");
    });

    it("allows typing in email and password fields", () => {
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText(
        "Email"
      ) as HTMLInputElement;
      const passwordInput = screen.getByPlaceholderText(
        "Password"
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "test@lendsqr.com" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });

      expect(emailInput.value).toBe("test@lendsqr.com");
      expect(passwordInput.value).toBe("password");
    });

    it("toggles password visibility", () => {
      render(<LoginPage />);
      const passwordInput = screen.getByPlaceholderText("Password");
      const toggleButton = screen.getByText("SHOW");

      expect(passwordInput).toHaveAttribute("type", "password");

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "text");
      expect(screen.getByText("HIDE")).toBeInTheDocument();

      fireEvent.click(screen.getByText("HIDE"));
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("successfully logs in with correct credentials", async () => {
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByText("LOG IN");

      fireEvent.change(emailInput, { target: { value: "test@lendsqr.com" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(localStorage.getItem("lendsqr_token")).toBe("fake-jwt-token");
        expect(pushMock).toHaveBeenCalledWith("/dashboard");
      });
    });

    it("displays forgot password link", () => {
      render(<LoginPage />);
      expect(screen.getByText("FORGOT PASSWORD?")).toBeInTheDocument();
    });
  });

  describe("Negative Tests", () => {
    it("shows error message with invalid credentials", async () => {
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByText("LOG IN");

      fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(
          screen.getByText("Invalid email or password")
        ).toBeInTheDocument();
      });
    });

    it("prevents form submission with empty email", () => {
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");

      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });

      expect(emailInput).toHaveAttribute("required");
    });

    it("prevents form submission with empty password", () => {
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");

      fireEvent.change(emailInput, { target: { value: "test@lendsqr.com" } });
      fireEvent.change(passwordInput, { target: { value: "" } });

      expect(passwordInput).toHaveAttribute("required");
    });

    it("does not set token in localStorage with invalid credentials", async () => {
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByText("LOG IN");

      fireEvent.change(emailInput, { target: { value: "invalid@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "invalidpass" } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(localStorage.getItem("lendsqr_token")).toBeNull();
        expect(pushMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("Form Validation", () => {
    it("email input has correct type attribute", () => {
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("password input has correct type attribute by default", () => {
      render(<LoginPage />);
      const passwordInput = screen.getByPlaceholderText("Password");
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });
});
