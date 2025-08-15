"use client";
import React from "react";
import Styles from "@/styles/UsersInfo.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { ApiUser } from "@/types/users";

interface UserDetailsProps {
  user: ApiUser;
  onBlacklist?: () => void;
  onActivate?: () => void;
}

const UserInfo: React.FC<UserDetailsProps> = ({
  user,
  onBlacklist,
  onActivate,
}) => {
  const router = useRouter();

  return (
    <div className={Styles.userDetails}>
      {/* back to user */}
      <div className={Styles.backLink}>
        <span onClick={() => router.back()}>← Back to Users</span>
      </div>


      {/* Actions */}
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

      {/* User Header */}
      <div className={Styles.userContainer}>
        <div className={Styles.header}>
          <div className={Styles.profile}>
            <div className={Styles.avatarContainer}>
              <Image
                src={
                   "/images/img_np_user_948637_000000.svg"
                }
                alt={user.userInfo.fullName}
                width={40}
                height={40}
                className={Styles.avatar}
              />
            </div>

            <div>
              <h2>{user.userInfo.fullName}</h2>
              <p>{user.username}</p>
              <p>Status: {user.status}</p> {/* Added status */}
            </div>
          </div>

          {/* line divider */}
          <div className={Styles.line}></div>

          <div className={Styles.tier}>
            <p>User’s Tier</p>
            <div className={Styles.stars}>
              {"★".repeat(user.userTier)}
              {"☆".repeat(3 - user.userTier)}
            </div>
          </div>

          {/* line divider */}
          <div className={Styles.line}></div>

          <div className={Styles.account}>
            <h3>{user.accountBalance}</h3>
            <p>
              {user.accountNumber}/{user.bankName}
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
            {Object.entries(user.userInfo).map(([key, value]) => (
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
            {Object.entries(user.employmentInfo).map(([key, value]) => (
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
            {Object.entries(user.socials).map(([key, value]) => (
              <div key={key}>
                <p className={Styles.label}>{key}</p>
                <p className={Styles.value}>{value}</p>
              </div>
            ))}
          </div>
        </section>
        <div className={Styles.Hline}></div>

        {/* Guarantors */}
        {user.guarantors.map((guarantor, index) => (
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
