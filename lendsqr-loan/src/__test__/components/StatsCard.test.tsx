import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatsCard from "@/components/dashboard/StatsCard";

describe("StatsCard Component", () => {
  const statTitles = [
    "USERS",
    "ACTIVE USERS",
    "USERS WITH LOANS",
    "USERS WITH SAVINGS",
  ];
  const statValues = ["2,453", "2,453", "12,453", "102,453"]; // assuming first two are the same value

  beforeEach(() => {
    render(<StatsCard />);
  });

  // Positive Tests
  it("renders all stat cards with correct titles", () => {
    statTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("displays all stat values correctly", () => {
    statValues.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it("renders four icons (one per card)", () => {
    const icons = screen.getAllByRole("img");
    expect(icons).toHaveLength(4);
  });

  // Negative / Edge Tests
  it("does not render unexpected empty values", () => {
    expect(screen.queryByText("")).not.toBeInTheDocument();
  });

  it("renders consistent headings for all cards", () => {
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(4);
    headings.forEach((h) => {
      expect(statTitles).toContain(h.textContent);
    });
  });
});
