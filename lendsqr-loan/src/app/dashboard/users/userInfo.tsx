"use client";
import React from "react";
import Styles from "@/styles/UsersInfo.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
    <div className={Styles.userDetails}>
      {/* back to user */}
      <div className={Styles.backLink}>
        <span onClick={() => router.back()}>
          ← Back to Users
        </span>
      </div>
      <div className={Styles.actions}>
        <span>User Details</span>
        <div className={Styles.buttonSpace}>
          <button className={Styles.blacklist} onClick={onBlacklist}>
            BLACKLIST USER
          </button>
          <button className={Styles.activate} onClick={onActivate}>
            ACTIVATE USER
          </button>
        </div>
      </div>

      {/* Header */}
      <div className={Styles.userContainer}>
        <div className={Styles.header}>
          <div className={Styles.profile}>
            <div className={Styles.avatarContainer}>
              <Image
                src={profileImage || "/images/img_np_user_948637_000000.svg"}
                alt={fullName}
                width={40}
                height={40}
                className={Styles.avatar}
              />
            </div>

            <div>
              <h2>{fullName}</h2>
              <p>{username}</p>
            </div>
          </div>

          {/* line divider */}
          <div className={Styles.line}></div>

          <div className={Styles.tier}>
            <p>User’s Tier</p>
            <div className={Styles.stars}>
              {"★".repeat(userTier)}
              {"☆".repeat(3 - userTier)}
            </div>
          </div>

          {/* line divider */}
          <div className={Styles.line}></div>

          <div className={Styles.account}>
            <h3>{accountBalance}</h3>
            <p>
              {accountNumber}/{bankName}
            </p>
          </div>
        </div>

        <div className={Styles.tabs}>
          {[
            "General Details",
            "Documents",
            "Bank Details",
            "Loans",
            "Savings",
            "App and System",
          ].map((tab, idx) => (
            <span key={idx} className={idx === 0 ? Styles.active : ""}>
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className={Styles.userContainer}>
        {/* Personal Info */}
        <section className={Styles.section}>
          <h4>Personal Information</h4>
          <div className={Styles.infoGrid}>
            {Object.entries(personalInfo).map(([key, value]) => (
              <div key={key}>
                <p className={Styles.label}>{key.replace(/([A-Z])/g, " $1")}</p>
                <p className={Styles.value}>{value}</p>
              </div>
            ))}
          </div>
        </section>
        <div className={Styles.Hline}></div>

        {/* Employment Info */}
        <section className={Styles.section}>
          <h4>Education and Employment</h4>
          <div className={Styles.infoGrid}>
            {Object.entries(employmentInfo).map(([key, value]) => (
              <div key={key}>
                <p className={Styles.label}>{key.replace(/([A-Z])/g, " $1")}</p>
                <p className={Styles.value}>{value}</p>
              </div>
            ))}
          </div>
        </section>
        <div className={Styles.Hline}></div>

        {/* Socials */}
        <section className={Styles.section}>
          <h4>Socials</h4>
          <div className={Styles.infoGrid}>
            {Object.entries(socials).map(([key, value]) => (
              <div key={key}>
                <p className={Styles.label}>{key}</p>
                <p className={Styles.value}>{value}</p>
              </div>
            ))}
          </div>
        </section>
        <div className={Styles.Hline}></div>

        {/* Guarantors */}
        {guarantors.map((guarantor, index) => (
          <section key={index} className={Styles.section}>
            <h4>Guarantor</h4>
            <div className={Styles.infoGrid}>
              {Object.entries(guarantor).map(([key, value]) => (
                <div key={key}>
                  <p className={Styles.label}>
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className={Styles.value}>{value}</p>
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
