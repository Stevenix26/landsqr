"use client";
import React, { useState } from "react";
import Image from "next/image";
import type { User } from "@/types/users";
import Link from "next/link";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return {
          variant: "primary" as const,
          className: "bg-button-1 text-button-1",
        };
      case "Inactive":
        return {
          variant: "inactive" as const,
          className: "bg-button-2 text-global-4",
        };
      case "Pending":
        return {
          variant: "secondary" as const,
          className: "bg-button-4 text-button-3",
        };
      case "Blacklisted":
        return {
          variant: "danger" as const,
          className: "bg-button-3 text-button-2",
        };
      default:
        return {
          variant: "inactive" as const,
          className: "bg-button-2 text-global-4",
        };
    }
  };

  return (
    <div>
      <table className="container">
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
                <div className="th-content">
                  {header}
                  <Image
                    src="/images/img_filter_results_button.svg"
                    alt="Filter"
                    width={16}
                    height={16}
                    className="filter-icon"
                  />
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
                  href={`/user-details?id=${user.id}`}
                  className="username-link"
                >
                  {user.username}
                </Link>
              </td>
              <td className="break-all">{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateJoined}</td>
              <td>
                <button className={`status-btn`}>{user.status}</button>
              </td>
              <td className="actions">
                <button>
                  <Image
                    src="/images/img_ic_more_vert_18px.svg"
                    alt="More"
                    width={20}
                    height={20}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <div className="items-info">
          Showing
          <button className="items-btn">
            {itemsPerPage}
            <Image
              src="/images/img_np_next_2236826_000000.svg"
              alt="Dropdown"
              width={14}
              height={14}
            />
          </button>
          out of {users.length}
        </div>
        <div className="page-nav">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00609 10.0573C7.84719 10.8984 6.54344 12.1595 5.745 11.3184L0.994244 6.56759C0.61581 6.23127 0.61581 5.64282 0.994244 5.3065L5.61858 0.640017C6.45967 -0.158963 7.72082 1.10267 6.87967 1.94322L2.8859 5.937L7.00609 10.0573Z"
                fill="#213F7D"
              />
            </svg>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
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
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.993905 1.94274C0.152813 1.10165 1.45656 -0.159498 2.255 0.68165L7.00576 5.43241C7.38419 5.76873 7.38419 6.35718 7.00576 6.6935L2.38142 11.36C1.54033 12.159 0.279177 10.8973 1.12033 10.0568L5.1141 6.063L0.993905 1.94274Z"
                fill="#213F7D"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
