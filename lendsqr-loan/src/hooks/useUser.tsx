"use client";

import { useEffect, useState, useCallback } from "react";
import type { ApiUser } from "@/types/users";

const LOCAL_STORAGE_KEY = "users_data";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

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

      // 2️⃣ Fetch from API
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);

      const data: ApiUser[] = await res.json();

      // 3️⃣ Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      }

      setUsers(data);
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

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refresh = () => fetchUsers(true);

  return { users, loading, error, refresh };
}
