"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserActionsMenuProps {
  userId: string;
  onBlacklist: (userId: string) => void;
  onActivate: (userId: string) => void;
}

const UserActionsMenu: React.FC<UserActionsMenuProps> = ({
  userId,
  onBlacklist,
  onActivate,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Image
          src="/images/img_ic_more_vert_18px.svg"
          alt="More"
          width={20}
          height={20}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 z-50">
          <button
            onClick={() => {
              router.push(`/dashboard/usersDetails/${userId}`);
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left"
          >
            View Details
          </button>

          <button
            onClick={() => {
              onBlacklist(userId);
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-red-500"
          >
            Blacklist User
          </button>

          <button
            onClick={() => {
              onActivate(userId);
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-green-500"
          >
            Activate User
          </button>
        </div>
      )}
    </div>
  );
};

export default UserActionsMenu;
