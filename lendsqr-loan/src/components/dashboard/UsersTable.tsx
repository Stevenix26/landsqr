"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ApiUser } from "@/types/users";
import Styles from "@/styles/UserTable.module.scss";
import FilterPanel from "../common/FilterPanel";
import UserActionsMenu from "../common/UserActionMenu";

interface UsersTableProps {
  users: ApiUser[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
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

  const handleBlacklist = (id: string) => {
    console.log("Blacklist user:", id);
    // Add your API call here
  };

  const handleActivate = (id: string) => {
    console.log("Activate user:", id);
    // Add your API call here
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
    <div>
      <table className={Styles.container}>
        <thead>
          <tr>
            {[
              "Organization",
              "Username",
              "Email",
              "Phone Number",
              "Date Joined",
              "Status",
              "Actions",
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
                            users={users} // pass full objects here
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
              <td>{user.organization}</td>
              <td>
                <Link
                  href={`/dashboard/usersDetails/${user.id}`}
                  className={Styles.username_link}
                >
                  {user.username}
                </Link>
              </td>
              <td className={Styles.break_all}>{user.email}</td>
              <td>{user.phoneNumber.replace("+234", "0")}</td>
              <td>
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
              <td>
                <button
                  className={`${Styles.status_btn} ${getStatusVariant(
                    user.status
                  )}`}
                >
                  {user.status}
                </button>
              </td>
              <td className={Styles.actions}>
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
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? Styles.active : ""}
            >
              {page}
            </button>
          ))}
          <span>...</span>
          {[totalPages - 1, totalPages].map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
