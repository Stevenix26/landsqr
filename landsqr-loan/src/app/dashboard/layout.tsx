'use client'
import React, {useState} from "react";
import Topbar from "@/components/layout/topbar";
import Sidebar from "@/components/layout/sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {

  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header>
        <Topbar />
      </header>
      <div className="flex"
    //   style={{ flex: 1, display: "flex" }}
      >
        <Sidebar isCollapsed = {isCollapsed} setIsCollapsed = {setIsCollapsed} />
        {/* Main content area */}
        <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
