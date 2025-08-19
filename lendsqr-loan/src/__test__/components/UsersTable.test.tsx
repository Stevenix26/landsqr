import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersTable from "../../components/dashboard/UsersTable";
import { mockUsers } from "../../mocks/mockUsers";
import { ApiUser } from "../../types/users";

// Mock the UserActionsMenu component
jest.mock("../../components/common/UserActionMenu", () => {
  return function MockUserActionsMenu({
    userId,
    onBlacklist,
    onActivate,
  }: {
    userId: string;
    onBlacklist: (id: string) => void;
    onActivate: (id: string) => void;
  }) {
    return (
      <div data-testid={`user-actions-${userId}`}>
        <button
          onClick={() => onBlacklist(userId)}
          data-testid={`blacklist-${userId}`}
        >
          Blacklist
        </button>
        <button
          onClick={() => onActivate(userId)}
          data-testid={`activate-${userId}`}
        >
          Activate
        </button>
      </div>
    );
  };
});

// Mock the FilterPanel component
jest.mock("../../components/common/FilterPanel", () => {
  return function MockFilterPanel({
    onApply,
    onReset,
    onClose,
  }: {
    onApply: () => void;
    onReset: () => void;
    onClose: () => void;
  }) {
    return (
      <div data-testid="filter-panel">
        <button onClick={onApply}>Apply</button>
        <button onClick={onReset}>Reset</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

describe("UsersTable Component - Fixed Tests", () => {
  const mockUpdateUserStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering Tests", () => {
    test("renders table headers correctly", () => {
      render(
        <UsersTable users={mockUsers} updateUserStatus={mockUpdateUserStatus} />
      );

      const headers = [
        "Organization",
        "Username",
        "Email",
        "Phone Number",
        "Date Joined",
        "Status",
      ];

      headers.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
    });

    test("renders all users with correct data", () => {
      render(
        <UsersTable users={mockUsers} updateUserStatus={mockUpdateUserStatus} />
      );

      mockUsers.forEach((user) => {
        expect(screen.getByText(user.organization)).toBeInTheDocument();
        expect(screen.getByText(user.username)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
      });
    });

    test("displays correct status badges", () => {
      render(
        <UsersTable users={mockUsers} updateUserStatus={mockUpdateUserStatus} />
      );

      mockUsers.forEach((user) => {
        expect(screen.getByText(user.status)).toBeInTheDocument();
      });
    });
  });

  describe("Filtering and Pagination Tests", () => {
    test("handles pagination with many users", () => {
      const manyUsers = Array.from({ length: 15 }, (_, i) => ({
        ...mockUsers[0],
        id: `user-${i}`,
        username: `user${i}`,
        email: `user${i}@example.com`,
      }));

      render(
        <UsersTable users={manyUsers} updateUserStatus={mockUpdateUserStatus} />
      );

      expect(screen.getByText("out of 15")).toBeInTheDocument();
    });

    test("handles empty users array", () => {
      render(<UsersTable users={[]} updateUserStatus={mockUpdateUserStatus} />);

      expect(screen.getByText("Organization")).toBeInTheDocument();
    });
  });

  describe("Status Update Tests", () => {
    test("calls updateUserStatus with correct parameters", () => {
      render(
        <UsersTable users={mockUsers} updateUserStatus={mockUpdateUserStatus} />
      );

      const blacklistButton = screen.getByTestId(
        `blacklist-${mockUsers[0].id}`
      );
      fireEvent.click(blacklistButton);

      expect(mockUpdateUserStatus).toHaveBeenCalledWith(
        mockUsers[0].id,
        "Blacklisted"
      );

      const activateButton = screen.getByTestId(`activate-${mockUsers[0].id}`);
      fireEvent.click(activateButton);

      expect(mockUpdateUserStatus).toHaveBeenCalledWith(
        mockUsers[0].id,
        "Active"
      );
    });
  });

  describe("Edge Cases", () => {
    test("handles single user", () => {
      render(
        <UsersTable
          users={[mockUsers[0]]}
          updateUserStatus={mockUpdateUserStatus}
        />
      );

      expect(screen.getByText(mockUsers[0].username)).toBeInTheDocument();
    });

    test("handles special characters in data", () => {
      const specialUsers = [
        {
          ...mockUsers[0],
          username: "test@user#name",
          email: "test+special@example.com",
          organization: "Test & Co.",
        },
      ];

      render(
        <UsersTable
          users={specialUsers}
          updateUserStatus={mockUpdateUserStatus}
        />
      );

      expect(screen.getByText("test@user#name")).toBeInTheDocument();
      expect(screen.getByText("test+special@example.com")).toBeInTheDocument();
    });
  });
});
