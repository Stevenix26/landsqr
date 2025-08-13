"use client";
import React from "react";
import Styles from "@/styles/sidebar.module.scss"; // Adjust the path as necessary
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  hasDropdown?: boolean;
  isActive?: boolean;
};

type MenuSection = {
  category: string;
  items: MenuItem[];
};

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems: MenuSection[] = [
    {
      category: "",
      items: [
        {
          id: "switch-org",
          label: "Switch Organization",
          icon: "/images/img_briefcase_1.svg",
          hasDropdown: true,
        },
        {
          id: "dashboard",
          label: "Dashboard",
          icon: "/images/img_home_1.svg",
          href: "/dashboard",
        },
      ],
    },
    {
      category: "CUSTOMERS",
      items: [
        {
          id: "users",
          label: "Users",
          icon: "/images/img_user_friends_1.svg",
          href: "/users-management",
          isActive: true,
        },
        {
          id: "guarantors",
          label: "Guarantors",
          icon: "/images/img_users_1.svg",
          href: "/guarantors",
        },
        {
          id: "loans",
          label: "Loans",
          icon: "/images/img_sack_1.svg",
          href: "/loans",
        },
        {
          id: "decision-models",
          label: "Decision Models",
          icon: "/images/img_handshake_regular.svg",
          href: "/decision-models",
        },
        {
          id: "savings",
          label: "Savings",
          icon: "/images/img_piggy_bank_1.svg",
          href: "/savings",
        },
        {
          id: "loan-requests",
          label: "Loan Requests",
          icon: "/images/img_group_104.svg",
          href: "/loan-requests",
        },
        {
          id: "whitelist",
          label: "Whitelist",
          icon: "/images/img_user_check_1.svg",
          href: "/whitelist",
        },
        {
          id: "karma",
          label: "Karma",
          icon: "/images/img_user_times_1.svg",
          href: "/karma",
        },
      ],
    },
    {
      category: "BUSINESSES",
      items: [
        {
          id: "organization",
          label: "Organization",
          icon: "/images/img_briefcase_1.svg",
          href: "/organization",
        },
        {
          id: "loan-products",
          label: "Loan Products",
          icon: "/images/img_group_104.svg",
          href: "/loan-products",
        },
        {
          id: "savings-products",
          label: "Savings Products",
          icon: "/images/img_np_bank_148501_000000.svg",
          href: "/savings-products",
        },
        {
          id: "fees-charges",
          label: "Fees and Charges",
          icon: "/images/img_vector.svg",
          href: "/fees-charges",
        },
        {
          id: "transactions",
          label: "Transactions",
          icon: "/images/img_icon.svg",
          href: "/transactions",
        },
        {
          id: "services",
          label: "Services",
          icon: "/images/img_galaxy_1.svg",
          href: "/services",
        },
        {
          id: "service-account",
          label: "Service Account",
          icon: "/images/img_user_cog_1.svg",
          href: "/service-account",
        },
        {
          id: "settlements",
          label: "Settlements",
          icon: "/images/img_scroll_1.svg",
          href: "/settlements",
        },
        {
          id: "reports",
          label: "Reports",
          icon: "/images/img_chart_bar_2.svg",
          href: "/reports",
        },
      ],
    },
    {
      category: "SETTINGS",
      items: [
        {
          id: "preferences",
          label: "Preferences",
          icon: "/images/img_sliders_h_1.svg",
          href: "/preferences",
        },
        {
          id: "fees-pricing",
          label: "Fees and Pricing",
          icon: "/images/img_badge_percent_1.svg",
          href: "/fees-pricing",
        },
        {
          id: "audit-logs",
          label: "Audit Logs",
          icon: "/images/img_clipboard_list_1.svg",
          href: "/audit-logs",
        },
        {
          id: "systems-messages",
          label: "Systems Messages",
          icon: "/images/img_tire_1.svg",
          href: "/systems-messages",
        },
      ],
    },
  ];

  return (
    <aside className={`${Styles.sidebar}`}>
      <div className={Styles.toggleButton}>
        <button
          aria-label="Toggle Sidebar"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* <div className={Styles.Inner}>
        <div className={Styles.section}></div>
        <div className={Styles.nav}></div>
      </div> */}

      <div
        className={`${Styles.Inner} ${
          isCollapsed ? `${Styles.collapsed}` : ""
        }`}
      >
        <div className={`Styles.section `}>
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className={Styles.section}>
              {/* Category */}
              {section.category && (
                <div className={Styles.sectionTitle}>
                  <span>{section.category}</span>
                </div>
              )}

              {/**Menue LISt */}

              <ul className={Styles.menuList}>
                {section.items.map((item) => (
                  <li key={item.id}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`${Styles.menuLink} ${
                          item.isActive
                            ? `${Styles.active}`
                            : `${Styles.inactive}`
                        }`}
                      >
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={16}
                          height={16}
                          className="icon"
                          style={{ marginRight: "8px" }}
                        />
                        <span className={Styles.label}>{item.label}</span>
                      </Link>
                    ) : (
                      <div className={Styles.menuClickable}>
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={16}
                          height={16}
                          className={Styles.icon}
                        />
                        <span className={Styles.label}>{item.label}</span>
                        {item.hasDropdown && (
                          <Image
                            src="/images/img_np_next_2236826_000000.svg"
                            alt="Dropdown"
                            width={14}
                            height={14}
                            className={Styles.dropdownIcon}
                          />
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile toggle */}
    </aside>
  );
};

export default Sidebar;
