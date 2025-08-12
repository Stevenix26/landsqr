'use client'
import React from "react";
import Topbar from "@/components/layout/topbar";
import Sidebar from "@/components/layout/sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header>
        <Topbar />
      </header>
      <div style={{ flex: 1, display: "flex" }}>
        <Sidebar />
        {/* Main content area */}
        <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
