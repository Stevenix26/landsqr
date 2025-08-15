// config/sidebarMenu.ts
export type MenuItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  hasDropdown?: boolean;
};

export type MenuSection = {
  category: string;
  items: MenuItem[];
};

export const sidebarMenu: MenuSection[] = [
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
        href: "/dashboard/user",
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
