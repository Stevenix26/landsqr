// hooks/useSidebar.ts
"use client";

import { useState, useEffect } from "react";

export function useSidebar(
  initialCollapsedDesktop = false,
  initialCollapsedMobile = true
) {
  const [collapsed, setCollapsed] = useState(initialCollapsedDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(initialCollapsedMobile);
      } else {
        setCollapsed(initialCollapsedDesktop);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [initialCollapsedDesktop, initialCollapsedMobile]);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return { collapsed, toggleSidebar, setCollapsed };
}
