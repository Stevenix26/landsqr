"use client";

import UserInfo from "@/components/dashboard/user/UserInfo";
import type { ApiUser } from "@/types/users";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import {Spinner} from "@/components/common/Spinner";

export default function Page() {
  const params = useParams();
  const { id } = params;
  const { users, loading, updateUserStatus } = useUser();

  const userData: ApiUser | undefined = users.find((user) => user.id === id);

  const handleBlacklist = (userId: string) => {
    updateUserStatus(userId, "Blacklisted");
    console.log("Blacklisted user:", userId);
  };

  const handleActivate = (userId: string) => {
    updateUserStatus(userId, "Active");
    console.log("Activated user:", userId);
  };

  if (loading)
    return (
      <Spinner/>
    );
  if (!userData) return <p>No user found</p>;

  return (
    <UserInfo
      user={userData}
      onBlacklist={() => handleBlacklist(userData.id)}
      onActivate={() => handleActivate(userData.id)}
    />
  );
}
