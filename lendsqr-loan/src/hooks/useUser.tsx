"use client";

import { useEffect, useState, useCallback } from "react";
import type { ApiUser } from "@/types/users";

const LOCAL_STORAGE_KEY = "users_data";
const INTERNAL_API = "/api/users/:route"; // Call our server-side API route

export function useUser() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Use cache unless forced refresh
      if (!forceRefresh && typeof window !== "undefined") {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          setUsers(JSON.parse(stored));
          setLoading(false);
          return;
        }
      }

      // 2️⃣ Fetch from internal API
      try {
        const res = await fetch(INTERNAL_API);
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);

        const data: ApiUser[] = await res.json();

        // 3️⃣ Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        }

        setUsers(data);
      } catch (apiError) {
        console.warn("Internal API unavailable, using cached data or empty array:", apiError);
        // Use cached data if available or empty array
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
          setUsers(stored ? JSON.parse(stored) : []);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user status in localStorage
  const updateUserStatus = useCallback((userId: string, newStatus: ApiUser["status"]) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      );

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
      }

      return updatedUsers;
    });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refresh = () => fetchUsers(true);

  return { users, loading, error, refresh, updateUserStatus };
}
