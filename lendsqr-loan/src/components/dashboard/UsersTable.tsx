"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ApiUser } from "@/types/users";
import Styles from "@/styles/components/userTable.module.scss";
import FilterPanel from "../common/FilterPanel";
import UserActionsMenu from "../common/UserActionMenu";

interface UsersTableProps {
  users: ApiUser[];
  updateUserStatus: (userId: string, newStatus: ApiUser["status"]) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, updateUserStatus }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilter, setShowFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  React.useEffect(() => {
    if (showFilter === "mobile") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showFilter]);

  const handleBlacklist = (id: string) => {
    updateUserStatus(id, "Blacklisted");
  };

  const handleActivate = (id: string) => {
    updateUserStatus(id, "Active");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleApply = () => {
    setCurrentPage(1);
    setShowFilter(null);
  };

  const handleReset = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    setCurrentPage(1);
    setShowFilter(null);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        (!filters.organization ||
          user.organization
            .toLowerCase()
            .includes(filters.organization.toLowerCase())) &&
        (!filters.username ||
          user.username
            .toLowerCase()
            .includes(filters.username.toLowerCase())) &&
        (!filters.email ||
          user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.date || user.dateJoined.startsWith(filters.date)) &&
        (!filters.phoneNumber ||
          user.phoneNumber.includes(filters.phoneNumber)) &&
        (!filters.status ||
          user.status.toLowerCase() === filters.status.toLowerCase())
      );
    });
  }, [users, filters]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusVariant = (status: ApiUser["status"]) => {
    switch (status) {
      case "Active":
        return Styles.status_active;
      case "Inactive":
        return Styles.status_inactive;
      case "Pending":
        return Styles.status_pending;
      case "Blacklisted":
        return Styles.status_blacklisted;
      default:
        return Styles.status_inactive;
    }
  };

  return (
    <>
    <div className={Styles.container}>
      <div className={Styles.mobileFilterTrigger}>
        <button
          className={Styles.mobileFilterBtn}
          onClick={() =>
            setShowFilter(showFilter === "mobile" ? null : "mobile")
          }
        >
          <Image
            src="/images/img_filter_results_button.svg"
            alt="Filter"
            width={18}
            height={18}
          />
          Filter
        </button>
      </div>

      <table className={Styles.tableContainer}>
        <thead>
          <tr>
            {[
              "Organization",
              "Username",
              "Email",
              "Phone Number",
              "Date Joined",
              "Status",
              
            ].map((header) => (
              <th key={header}>
                <div className={Styles.th_content}>
                  {header}
                  {header !== "Actions" && (
                    <div className={Styles.filterWrapper}>
                      <Image
                        src="/images/img_filter_results_button.svg"
                        alt="Filter"
                        width={16}
                        height={16}
                        className={Styles.filter_icon}
                        onClick={() =>
                          setShowFilter(showFilter === header ? null : header)
                        }
                      />
                      {showFilter === header && (
                        <div className={Styles.filterDropdown}>
                          <FilterPanel
                            filters={filters}
                            onChange={handleChange}
                            onApply={handleApply}
                            onReset={handleReset}
                            onClose={() => setShowFilter(null)}
                            users={users}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td data-label="Organization">{user.organization}</td>
              <td data-label="Username">
                <Link
                  href={`/dashboard/usersDetails/${user.id}`}
                  className={Styles.username_link}
                >
                  {user.username}
                </Link>
              </td>
              <td className={Styles.break_all} data-label="Email">
                {user.email}
              </td>
              <td data-label="Phone number">
                {user.phoneNumber.replace("+234", "0")}
              </td>
              <td data-label="Date joined">
                {`${new Date(user.dateJoined).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })} ${new Date(user.dateJoined).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}`}
              </td>
              <td data-label="Status">
                <button
                  className={`${Styles.status_btn} ${getStatusVariant(
                    user.status
                  )}`}
                >
                  {user.status}
                </button>
              </td>
              <td className={Styles.actions} data-label="Actions">
                <UserActionsMenu
                  userId={user.id}
                  onBlacklist={handleBlacklist}
                  onActivate={handleActivate}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === Mobile full-screen overlay for filter === */}
      {showFilter === "mobile" && (
        <div
          className={Styles.mobileFilterOverlay}
          role="dialog"
          aria-modal="true"
        >
          <div className={Styles.mobileFilterSheet}>
            <FilterPanel
              filters={filters}
              onChange={handleChange}
              onApply={handleApply}
              onReset={handleReset}
              onClose={() => setShowFilter(null)}
              users={users}
            />
          </div>
        </div>
      )}
    
    </div>
   {/* Pagination */}
          
      <div className={Styles.pagination}>
        <div className={Styles.items_info}>
          Showing
          <select
            className={Styles.items_btn}
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          out of {filteredUsers.length}
        </div>

        <div className={Styles.page_nav}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {"<"}
          </button>
          {[1, 2, 3].map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? Styles.active : ""}
            >
              {page}
            </span>
          ))}
          <span>...</span>
          {[totalPages - 1, totalPages].map((page) => (
            <span key={page} onClick={() => setCurrentPage(page)}>
              {page}
            </span>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </>

  );
};

export default UsersTable;
