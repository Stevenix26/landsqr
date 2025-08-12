"use client";
import React from "react";
import styles from "@/styles/UsersInfo.module.scss";
import { useRouter} from 'next/navigation'
interface UserInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  numberOfDependents: string;
  address: string;
}

interface EmploymentInfo {
  education: string;
  status: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

interface UserDetailsProps {
  profileImage?: string;
  fullName: string;
  username: string;
  userTier: number;
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  personalInfo: UserInfo;
  employmentInfo: EmploymentInfo;
  socials: SocialLinks;
  guarantors: Guarantor[];
  onBlacklist?: () => void;
  onActivate?: () => void;
}

const UserInfo: React.FC<UserDetailsProps> = ({
  profileImage,
  fullName,
  username,
  userTier,
  accountBalance,
  accountNumber,
  bankName,
  personalInfo,
  employmentInfo,
  socials,
  guarantors,
  onBlacklist,
  onActivate,
}) => {

    const router = useRouter();

  return (
    <div className={styles.userDetails}>
      {/* back to user */}
      <div className={styles.backLink}>
        <button onClick={() => router.back()}>← Back to Users</button>
      </div>

      {/* Header */}
      <div className={` users-table-container  ${styles.header}`}>
        <div className={styles.profile}>
          <img
            src={profileImage || "/default-avatar.png"}
            alt={fullName}
            className={styles.avatar}
          />
          <div>
            <h2>{fullName}</h2>
            <p>{username}</p>
          </div>
        </div>

        <div className={styles.tier}>
          <p>User’s Tier</p>
          <div>
            {"★".repeat(userTier)}
            {"☆".repeat(3 - userTier)}
          </div>
        </div>

        <div className={styles.account}>
          <h3>{accountBalance}</h3>
          <p>
            {accountNumber}/{bankName}
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.blacklist} onClick={onBlacklist}>
            BLACKLIST USER
          </button>
          <button className={styles.activate} onClick={onActivate}>
            ACTIVATE USER
          </button>
        </div>
      </div>

      <div className= "users-table-container">
      

      {/* Tabs */}
      <div className={styles.tabs}>
        {[
          "General Details",
          "Documents",
          "Bank Details",
          "Loans",
          "Savings",
          "App and System",
        ].map((tab, idx) => (
          <button key={idx} className={idx === 0 ? styles.active : ""}>
            {tab}
          </button>
        ))}
      </div>

      {/* Personal Info */}
      <section className={styles.section}>
        <h4>Personal Information</h4>
        <div className={styles.infoGrid}>
          {Object.entries(personalInfo).map(([key, value]) => (
            <div key={key}>
              <p className={styles.label}>{key.replace(/([A-Z])/g, " $1")}</p>
              <p className={styles.value}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Employment Info */}
      <section className={styles.section}>
        <h4>Education and Employment</h4>
        <div className={styles.infoGrid}>
          {Object.entries(employmentInfo).map(([key, value]) => (
            <div key={key}>
              <p className={styles.label}>{key.replace(/([A-Z])/g, " $1")}</p>
              <p className={styles.value}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Socials */}
      <section className={styles.section}>
        <h4>Socials</h4>
        <div className={styles.infoGrid}>
          {Object.entries(socials).map(([key, value]) => (
            <div key={key}>
              <p className={styles.label}>{key}</p>
              <p className={styles.value}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantors */}
      {guarantors.map((guarantor, index) => (
        <section key={index} className={styles.section}>
          <h4>Guarantor</h4>
          <div className={styles.infoGrid}>
            {Object.entries(guarantor).map(([key, value]) => (
              <div key={key}>
                <p className={styles.label}>{key.replace(/([A-Z])/g, " $1")}</p>
                <p className={styles.value}>{value}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
      </div>
    </div>
  );
};

export default UserInfo;
