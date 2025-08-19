"use client";

import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import UsersTable from "@/components/dashboard/UsersTable";
import { useUser } from "@/hooks/useUser";
import { Spinner } from "@/components/common/Spinner";

const User = () => {
  const { users, loading, error, updateUserStatus } = useUser();

  console.log("User page - users:", users);
  console.log("User page - loading:", loading);
  console.log("User page - error:", error);

  if (error) {
    return (
      <main>
        <h1>Error Loading Users</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Users</h1>
          <StatsCard />
          <UsersTable users={users} updateUserStatus={updateUserStatus} />
        </>
      )}
    </main>
  );
};

export default User;
