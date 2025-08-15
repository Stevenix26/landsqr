"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/styles/UserActionMenu.module.scss";

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
    <div className={styles.menuWrapper} ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={styles.menuButton}
        aria-label="Open user actions menu"
      >
        <Image
          src="/images/img_ic_more_vert_18px.svg"
          alt="More"
          width={20}
          height={20}
        />
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          <button
            onClick={() => {
              router.push(`/dashboard/usersDetails/${userId}`);
              setOpen(false);
            }}
            className={styles.dropdownItem}
          >
            <Image
              src="/images/np_view_1214519_000000 1.svg"
              alt="Person"
              width={14}
              height={14}
            />
            View Details
          </button>

          <button
            onClick={() => {
              onBlacklist(userId);
              setOpen(false);
            }}
            className={`${styles.dropdownItem} ${styles.blacklist}`}
          >
            <Image
              src="/images/np_delete-friend_3248001_000000 1.svg"
              alt="Blacklist"
              width={14}
              height={14}
            />
            Blacklist User
          </button>

          <button
            onClick={() => {
              onActivate(userId);
              setOpen(false);
            }}
            className={`${styles.dropdownItem} ${styles.activate}`}
          >
            <Image
              src="/images/np_user_2995993_000000 1.svg"
              alt="Activate"
              width={14}
              height={14}
            />
            Activate User
          </button>
        </div>
      )}
    </div>
  );
};

export default UserActionsMenu;
