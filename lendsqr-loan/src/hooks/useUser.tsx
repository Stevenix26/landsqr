"use client";

import { useEffect, useState, useCallback } from "react";
import type { ApiUser } from "@/types/users";

const LOCAL_STORAGE_KEY = "users_data";
const API_URL = "https://api.json-generator.com/templates/rSJrCF7PA-8B/data";
const API_TOKEN = "yxtg3vw7nqxn20tgukznct396b57dwa93hfqscs8";

export function useUsers() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Use cache unless forced refresh
      if (!forceRefresh) {
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      setUsers(data);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Expose a way to refresh
  const refresh = () => fetchUsers(true);

  return { users, loading, error, refresh };
}
