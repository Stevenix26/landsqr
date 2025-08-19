import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import UserActionMenu from "@/components/common/UserActionMenu";

describe("UserActionMenu Component", () => {
  const mockUserId = "user123";
  const mockOnBlacklist = jest.fn();
  const mockOnActivate = jest.fn();

  const renderMenu = (userId = mockUserId) =>
    render(
      <UserActionMenu
        userId={userId}
        onBlacklist={mockOnBlacklist}
        onActivate={mockOnActivate}
      />
    );

  const openMenu = async () => {
    fireEvent.click(screen.getByLabelText("Open user actions menu"));
    await waitFor(() => {
      expect(screen.getByText("View Details")).toBeInTheDocument();
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Positive Tests", () => {
    it("renders menu button", () => {
      renderMenu();
      expect(
        screen.getByLabelText("Open user actions menu")
      ).toBeInTheDocument();
    });

    it("opens dropdown menu on button click", async () => {
      renderMenu();
      await openMenu();

      ["View Details", "Blacklist User", "Activate User"].forEach((text) => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    it("calls callbacks on action buttons", async () => {
      renderMenu();
      await openMenu();

      fireEvent.click(screen.getByText("Blacklist User"));
      expect(mockOnBlacklist).toHaveBeenCalledWith(mockUserId);

      fireEvent.click(screen.getByText("Activate User"));
      expect(mockOnActivate).toHaveBeenCalledWith(mockUserId);
    });
  });

  describe("Negative & Edge Tests", () => {
    it("closes menu when clicking outside", async () => {
      renderMenu();
      await openMenu();

      fireEvent.click(document.body);
      await waitFor(() =>
        expect(screen.queryByText("View Details")).not.toBeInTheDocument()
      );
    });

    it("handles empty userId gracefully", async () => {
      renderMenu("");
      await openMenu();
      expect(screen.getByText("View Details")).toBeInTheDocument();
    });

    it("handles rapid open/close interactions", async () => {
      renderMenu();
      const button = screen.getByLabelText("Open user actions menu");

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.queryByText("View Details")).not.toBeInTheDocument();
      });
    });

    it("does not crash if callbacks are missing", async () => {
      render(<UserActionMenu userId={mockUserId} />);
      await openMenu();

      fireEvent.click(screen.getByText("Blacklist User"));
      fireEvent.click(screen.getByText("Activate User"));

      // No errors expected
    });
  });
});
