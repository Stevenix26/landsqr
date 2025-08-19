"use client";

import { useEffect, useState, useCallback } from "react";
import type { ApiUser } from "@/types/users";

const LOCAL_STORAGE_KEY = "users_data";
const API_URL="https://api.json-generator.com/templates/rSJrCF7PA-8B/data"
const API_TOKEN= "ci6y14wdnw7vgpo2htjbycyydxqibybdzoy0ttf4"


export function useUser() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Use cached data if available
      if (!forceRefresh && typeof window !== "undefined") {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          setUsers(JSON.parse(stored));
          setLoading(false);
          return;
        }
      }

      // Fetch directly from API
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
      }

      const data: ApiUser[] = await res.json();

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      }

      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError((err as Error).message || "Unknown error fetching users");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserStatus = useCallback(
    (userId: string, newStatus: ApiUser["status"]) => {
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

      // Optional: persist status change to API here
      // fetch(`${API_URL}/${userId}`, {
      //   method: "PATCH",
      //   headers: {
      //     Authorization: `Bearer ${API_TOKEN}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ status: newStatus }),
      // }).catch(console.error);
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refresh = () => fetchUsers(true);

  return { users, loading, error, refresh, updateUserStatus };
}
