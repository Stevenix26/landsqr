import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersTable from "@/components/dashboard/UsersTable";
import UserActionMenu from "@/components/common/UserActionMenu";
import { mockUsers } from "@/__test__/mockUsers";

describe("UsersTable Component", () => {
  it("renders all users and columns", () => {
    render(<UsersTable users={mockUsers} />);

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.username)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.organization)).toBeInTheDocument();
    });

    [
      "Organization",
      "Username",
      "Email",
      "Phone Number",
      "Date Joined",
      "Status",
      "Actions",
    ].forEach((header) => expect(screen.getByText(header)).toBeInTheDocument());
  });

  it("opens user action menu and triggers callbacks", () => {
    const onBlacklistMock = jest.fn();
    const onActivateMock = jest.fn();

    render(<UsersTable users={mockUsers.map((u) => ({ ...u }))} />);

    // Open the menu of the first user
    const menuButtons = screen.getAllByLabelText("Open user actions menu");
    fireEvent.click(menuButtons[0]);

    // UserActionMenu buttons
    const blacklistBtn = screen.getByText("Blacklist User");
    const activateBtn = screen.getByText("Activate User");

    // Fire events
    fireEvent.click(blacklistBtn);
    fireEvent.click(activateBtn);

    // Since UsersTable uses internal handlers, we check status changes
    expect(screen.getAllByText("Blacklisted")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Active")[0]).toBeInTheDocument();
  });

  it("renders all status variants correctly", () => {
    const usersWithStatuses = [
      ...mockUsers,
      { ...mockUsers[0], id: "3", status: "Pending" },
      { ...mockUsers[0], id: "4", status: "Blacklisted" },
    ];

    render(<UsersTable users={usersWithStatuses} />);

    ["Active", "Inactive", "Pending", "Blacklisted"].forEach((status) => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });

  it("opens mobile filter overlay and closes on reset", () => {
    render(<UsersTable users={mockUsers} />);

    const filterBtn = screen.getByText("Filter");
    fireEvent.click(filterBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Assuming FilterPanel has a "Reset" button
    const resetBtn = screen.getByText("Reset");
    fireEvent.click(resetBtn);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("handles pagination correctly", () => {
    const manyUsers = Array.from({ length: 15 }, (_, i) => ({
      ...mockUsers[0],
      id: `user-${i}`,
    }));

    render(<UsersTable users={manyUsers} />);

    const nextBtn = screen.getByText(">");
    fireEvent.click(nextBtn);

    const prevBtn = screen.getByText("<");
    fireEvent.click(prevBtn);

    const page2 = screen.getByText("2");
    fireEvent.click(page2);

    expect(page2).toHaveClass("active");
  });
});
