import { renderHook, act } from "@testing-library/react";
import { useUser } from "@/hooks/useUser";

// Mock global fetch and localStorage
global.fetch = jest.fn();
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

describe("useUser Hook - Comprehensive Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockReset();
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    localStorageMock.removeItem.mockReset();
    localStorageMock.clear.mockReset();
  });

  describe("Positive Scenarios", () => {
    it("should fetch users successfully from API", async () => {
      const mockUsers = [
        {
          id: "1",
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
          username: "johndoe",
          status: "Active",
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      const { result } = renderHook(() => useUser());

      expect(result.current.loading).toBe(true);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "users_data",
        JSON.stringify(mockUsers)
      );
    });

    it("should use cached data when available", async () => {
      const cachedUsers = [
        {
          id: "1",
          email: "cached@example.com",
          firstName: "Cached",
          lastName: "User",
          username: "cacheduser",
          status: "Active",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(cachedUsers));

      const { result } = renderHook(() => useUser());

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.users).toEqual(cachedUsers);
      expect(result.current.loading).toBe(false);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("should update user status successfully", async () => {
      const initialUsers = [
        {
          id: "1",
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
          username: "johndoe",
          status: "Active",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(initialUsers));

      const { result } = renderHook(() => useUser());

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.updateUserStatus("1", "Inactive");
      });

      expect(result.current.users[0].status).toBe("Inactive");
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "users_data",
        JSON.stringify([{ ...initialUsers[0], status: "Inactive" }])
      );
    });
  });

  describe("Negative Scenarios", () => {
    it("should handle API fetch error gracefully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      // No cached data present
      localStorageMock.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useUser());

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.users).toEqual([]);
      expect(result.current.loading).toBe(false);
      // Hook swallows API error and uses cache/empty without setting error
      expect(result.current.error).toBeNull();
    });

    it("should handle network error gracefully", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      // No cached data present
      localStorageMock.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useUser());

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.users).toEqual([]);
      expect(result.current.loading).toBe(false);
      // Hook logs but does not set error when API path fails; it falls back to cache
      expect(result.current.error).toBeNull();
    });

    it("should handle empty localStorage gracefully", async () => {
      localStorageMock.getItem.mockReturnValue(null);
      (global.fetch as jest.Mock).mockRejectedValue(
        new Error("API unavailable")
      );

      const { result } = renderHook(() => useUser());

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.users).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    it("should handle invalid JSON in localStorage", async () => {
      localStorageMock.getItem.mockReturnValue("invalid json");

      const { result } = renderHook(() => useUser());

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // JSON.parse will throw within useUser. The catch will set error and loading false.
      // However, since error handling is general, we just ensure it does not crash and users is []
      expect(result.current.users).toEqual([]);
    });

    it("should handle refresh functionality", async () => {
      const mockUsers = [
        {
          id: "1",
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
          username: "johndoe",
          status: "Active",
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockUsers,
      });

      const { result } = renderHook(() => useUser());

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.refresh();
      });

      expect(result.current.loading).toBe(true);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
    });
  });
});
