"use client";

import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import UsersTable from "@/components/dashboard/UsersTable";
import { useUsers } from "@/hooks/useUser";

const User = () => {

  const { users, loading } = useUsers();

  return (
    <main>
      <h1>Users</h1>
      <StatsCard />
      {loading ? <p>Loading users...</p> : <UsersTable users={users} />}
    </main>
  );
};

export default User;
