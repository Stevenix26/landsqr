
"use client";
import React from "react";
import Styles from "@/styles/components/sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu } from "@/config/sidebarMenu";

type SidebarProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleSidebar }) => {
  const pathname = usePathname();

  return (
    <aside className={`${Styles.sidebar} ${collapsed ? Styles.collapsed : Styles.expanded}`}>
      {/* Mobile toggle (optional duplicate for inside drawer) */}
      <div className={Styles.toggleButton}>
        <button aria-label="Toggle Sidebar" onClick={onToggleSidebar}>☰</button>
      </div>

      <div className={Styles.inner}>
        {sidebarMenu.map((section, sectionIndex) => (
          <div key={sectionIndex} className={Styles.section}>
            {section.category && (
              <div className={Styles.sectionTitle}><span>{section.category}</span></div>
            )}

            <ul className={Styles.menuList}>
              {section.items.map((item) => {
                const isActive = item.href && pathname === item.href;
                return (
                  <li key={item.id}>
                    {item.href ? (
                      <Link href={item.href} className={`${Styles.menuLink} ${isActive ? Styles.active : ""}`}>
                        <Image src={item.icon} alt={item.label} width={16} height={16} className={Styles.icon} />
                        {!collapsed && <span className={Styles.label}>{item.label}</span>}
                      </Link>
                    ) : (
                      <div className={Styles.menuClickable}>
                        <Image src={item.icon} alt={item.label} width={16} height={16} className={Styles.icon} />
                        {!collapsed && <span className={Styles.label}>{item.label}</span>}
                        {/* dropdown chevron only when expanded */}
                        {/* ... */}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
