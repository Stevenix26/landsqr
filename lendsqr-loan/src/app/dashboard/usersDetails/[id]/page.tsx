"use client";

import UserInfo from "@/app/dashboard/usersDetails/[id]/userInfo";
import type { ApiUser } from "@/types/users";
import {useParams} from "next/navigation";
import { useUsers } from "@/hooks/useUser";
export default function Page() {
  const params = useParams();
  const { id } = params;
  const { users, loading } = useUsers();

  const userData : ApiUser | undefined = users.find((user) => user.id === id);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user found</p>;

  return (
    <UserInfo
      user={userData}
      onBlacklist={() => alert("Blacklisted!")}
      onActivate={() => alert("Activated!")}
    />
  );
}
