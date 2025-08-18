import React from "react";
import styles from "@/styles/components/filterPanel.module.scss";
import type { ApiUser } from "@/types/users";
import Image from "next/image";
interface FilterPanelProps {
  filters: {
    organization: string;
    username: string;
    email: string;
    date: string;
    phoneNumber: string;
    status: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
  users: ApiUser[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onApply,
  onReset,
  onClose,
  users,
}) => {
  const organizations = Array.from(
    new Set(users.map((user) => user.organization))
  );

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <button onClick={onClose} className={styles.closeBtn}>
          ×
        </button>
      </div>

      <div className={styles.panelBody}>
        <label>
          Organization:
          <select
            name="organization"
            value={filters.organization}
            onChange={onChange}
          >
            <option value="">Select </option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </label>

        <label>
          Username:
          <input
            name="username"
            value={filters.username}
            onChange={onChange}
            placeholder="User"
            aria-label="Username"
          />
        </label>

        <label>
          Email:
          <input
            name="email"
            value={filters.email}
            onChange={onChange}
            placeholder="Email"
            aria-label="Email"
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={onChange}
            aria-label="Date"
            placeholder="Date"
          />
         
        </label>

        <label>
          Phone Number:
          <input
            name="phoneNumber"
            value={filters.phoneNumber}
            onChange={onChange}
            aria-label="Phone Number"
            placeholder="Phone Number"
          />
        </label>

        <label>
          Status:
          <select name="status" value={filters.status} onChange={onChange}>
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blacklisted">Blacklisted</option>
            <option value="Pending">Pending</option>
          </select>
        </label>
      </div>

      <div className={styles.panelFooter}>
        <button onClick={onReset} className={styles.resetBtn}>
          Reset
        </button>
        <button onClick={onApply} className={styles.filterBtn}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
