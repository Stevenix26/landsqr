import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Spinner } from "@/components/common/Spinner";

describe("Spinner Component", () => {
  describe("Positive Tests", () => {
    it("renders spinner correctly", () => {
      render(<Spinner />);

      const image = screen.getByAltText("Loading..");
      expect(image).toBeInTheDocument();
    });

    it("has correct image attributes", () => {
      render(<Spinner />);

      const image = screen.getByAltText("Loading..");
      expect(image).toHaveAttribute("src", "./images/loader.svg");
      expect(image).toHaveAttribute("width", "100");
      expect(image).toHaveAttribute("height", "100");
    });
  });

  describe("Negative Tests", () => {
    it("renders without props gracefully", () => {
      render(<Spinner />);

      const image = screen.getByAltText("Loading..");
      expect(image).toBeInTheDocument();
    });
  });
});
