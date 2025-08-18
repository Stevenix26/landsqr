// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import styles from "@/styles/topbar.module.scss";
// import Link from "next/link";

// const Topbar: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <header className={styles.topbar}>
//       <div className={styles.container}>
//         <div className={styles.row}>
//           <div className={styles.logo}>
//             <Image
//               src="/images/Group.svg"
//               alt="Lendsqr Logo"
//               width={173.76}
//               height={36}
//               priority
//             />
//           </div>

//           <form
//             className={styles.searchBar}
//             role="search"
//             onSubmit={(e) => e.preventDefault()}
//           >
//             <input
//               type="search"
//               name="search"
//               value={searchQuery}
//               placeholder="Search for anything"
//               onChange={handleSearchChange}
//               className={styles.searchInput}
//               aria-label="Search for anything"
//             />
//             <button
//               type="submit"
//               className={styles.searchButton}
//               aria-label="Search"
//             >
//               <Image
//                 src="/images/search.svg"
//                 alt="Search Icon"
//                 width={12}
//                 height={14}
//                 priority
//               />
//             </button>
//           </form>

//           <div className={styles.documentation}>
//             <Link href="/">Docs</Link>
//           </div>

//           <div className={styles.notification}>
//             <Image
//               src="/images/img_np_notification.svg"
//               alt="Notifications"
//               width={39}
//               height={24}
//               priority
//             />
//           </div>

//           <div className={styles.userProfile}>
//             <Image
//               src="/images/ladies.png"
//               alt="User Avatar"
//               width={40}
//               height={40}
//             />
//             <span className={styles.username}>Adedeji</span>
//             <button
//               className={styles.dropdownButton}
//               aria-label="Open user menu"
//               type="button"
//               tabIndex={0}
//             >
//               <Image
//                 src="/images/img_np_dropdown_615120_000000.svg"
//                 alt="Dropdown Icon"
//                 width={24}
//                 height={24}
//                 className={styles.dropdownIcon}
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;

// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import styles from "@/styles/topbar.module.scss";

// export default function Topbar() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <header className={styles.topbar}>
//       <div className={styles.logo}>
//         <Image
//           src="/images/Group.svg"
//           alt="Lendsqr Logo"
//           width={173.76}
//           height={36}
//           priority
//         />
//       </div>
//       {/* Search */}
//       <div className={styles.searchBox}>
//         <input
//           onChange={(e) => handleSearchChange(e)}
//           type="text"
//           value={searchQuery}
//           placeholder="Search for anything"
//           aria-label="Search for anything"
//         />
//         <button>
//           <Image
//             src="/images/search.svg"
//             alt="Search Icon"
//             width={12}
//             height={14}
//             priority
//           />
//         </button>
//       </div>

//       <div className={styles.rightSection}>
//         <a href="#" className={styles.docsLink}>
//           Docs
//         </a>
//         <div className={styles.icon}>
//           <Image
//             src="/images/img_np_notification.svg"
//             alt="Notifications"
//             width={39}
//             height={24}
//             priority
//           />
//         </div>
//         <div className={styles.profile}>
//           <Image
//             className={styles.avatar}
//             src="/images/ladies.png"
//             alt="User Avatar"
//             width={40}
//             height={40}
//           />
//           <span className={styles.username}>Adedeji</span>
//           <span className={styles.dropdownArrow}>▼</span>
//         </div>
//       </div>
//     </header>
//   );
// }

// components/layout/topbar.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/topbar.module.scss";

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

