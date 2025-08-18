"use client";

import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import UsersTable from "@/components/dashboard/UsersTable";
import { useUser } from "@/hooks/useUser";
import {Spinner} from "@/components/common/Spinner";

const User = () => {
  const { users, loading } = useUser();

  return (
    <main>
      {loading ? (
        <Spinner/>
      ) : (
        <>
          <h1>Users</h1>
          <StatsCard />
          <UsersTable users={users} />
        </>
      )}
    </main>
  );
};

export default User;
