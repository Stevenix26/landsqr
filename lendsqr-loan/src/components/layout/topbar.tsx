
"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/topbar.module.scss";

type TopbarProps = {
  onToggleSidebar: () => void;
  onSearch?: (query: string) => void;
  sidebarCollapsed?: boolean; // for aria state
};

export default function Topbar({ onToggleSidebar, onSearch, sidebarCollapsed }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value); // live search (optional)
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery.trim());
  };

  return (
    <header className={styles.topbar}>
      {/* Mobile hamburger to toggle sidebar */}

      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/images/lendsqr.svg"
          alt="Lendsqr Logo"
          width={173.76}
          height={36}
          priority
        />
      </div>

      {/* Search */}
      <form className={styles.searchBox} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for anything"
          aria-label="Search for anything"
        />
        <button type="submit" aria-label="Search">
          <Image
            src="/images/search.svg"
            alt="Search Icon"
            width={12}
            height={14}
            priority
          />
        </button>
      </form>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <a href="#" className={styles.docsLink}>
          Docs
        </a>
        <div className={styles.icon}>
          <Image
            src="/images/img_np_notification.svg"
            alt="Notifications"
            width={39}
            height={24}
            priority
          />
        </div>
        <div className={styles.profile}>
          <Image
            className={styles.avatar}
            src="/images/ladies.png"
            alt="User Avatar"
            width={40}
            height={40}
          />
          <span className={styles.username}>Adedeji</span>
          <span className={styles.dropdownArrow}>▼</span>
        </div>
      </div>
      <button
        className={styles.menuButton}
        aria-label={sidebarCollapsed ? "Open sidebar" : "Close sidebar"}
        aria-expanded={!sidebarCollapsed}
        onClick={onToggleSidebar}
      >
        ☰
      </button>
    </header>
  );
}

