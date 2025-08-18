import "@testing-library/jest-dom";
import React from "react";

// ✅ Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/dashboard",
}));

// ✅ Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", {
      ...props,
      alt: props.alt || "mocked-image",
    }),
}));

// ✅ Mock Next.js Link
jest.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return React.createElement("a", {
      ...props,
      href: props.href || "#",
    });
  },
}));

// ✅ Mock localStorage (matching Storage interface)
Object.defineProperty(global, "localStorage", {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// ✅ Mock fetch (typed correctly)
global.fetch = jest.fn() as jest.Mock;

// ✅ Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});