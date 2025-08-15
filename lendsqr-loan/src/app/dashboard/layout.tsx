// app/(dashboard)/layout.tsx or wherever your layout lives
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/layout/topbar";
import Sidebar from "@/components/layout/sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import styles from "@/styles/dashboard.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleSearch = (query: string) => {
    // Simple working behavior: navigate to a search page with the query
    if (!query) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.dashboardLayout}>
      <header className={styles.topbar} role="banner">
        <Topbar
          onToggleSidebar={toggleSidebar}
          onSearch={handleSearch}
          sidebarCollapsed={collapsed}
        />
      </header>

      <div className={styles.bodyWrapper}>
        <nav aria-label="Sidebar Navigation">
          <Sidebar collapsed={collapsed} onToggleSidebar={toggleSidebar} />
        </nav>
        <main className={styles.mainContent} role="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
