"use client";
import React from "react";;
import { useRouter } from "next/navigation";
import Styles from "@/styles/components/userInfo.module.scss";
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
                src={"/images/img_np_user_948637_000000.svg"}
                alt={user.userInfo.fullName}
                width={40}
                height={40}
                className={Styles.avatar}
              />
            </div>

            <div className={Styles.info}>
              <h2>{user.userInfo.fullName}</h2>
              <p>{user.username}</p>
              {/* <p>Status: {user.status}</p> */}
              {/* Added status */}
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

      {/* Personal Info */}
      <section className={Styles.section}>
        <h4>Personal Information</h4>
        <div className={Styles.infoGrid}>
          <div>
            <p className={Styles.label}>Full Name</p>
            <p className={Styles.value}>{user.userInfo.fullName}</p>
          </div>
          <div>
            <p className={Styles.label}>Phone Number</p>
            <p className={Styles.value}>{user.phoneNumber}</p>
          </div>
          <div>
            <p className={Styles.label}>Email Address</p>
            <p className={Styles.value}>{user.email}</p>
          </div>
          <div>
            <p className={Styles.label}>BVN</p>
            <p className={Styles.value}>{user.userInfo.bvn}</p>
          </div>
          <div>
            <p className={Styles.label}>Gender</p>
            <p className={Styles.value}>{user.userInfo.gender}</p>
          </div>
          <div>
            <p className={Styles.label}>Marital Status</p>
            <p className={Styles.value}>{user.userInfo.maritalStatus}</p>
          </div>
          <div>
            <p className={Styles.label}>Children</p>
            <p className={Styles.value}>{user.userInfo.children}</p>
          </div>
          <div>
            <p className={Styles.label}>Type of Residence</p>
            <p className={Styles.value}>{user.userInfo.typeOfResidence}</p>
          </div>
        </div>
      </section>

      <div className={Styles.Hline}></div>

      {/* Employment Info */}
      <section className={Styles.section}>
        <h4>Education and Employment</h4>
        <div className={Styles.infoGrid}>
          <div>
            <p className={Styles.label}>Level of Education</p>
            <p className={Styles.value}>
              {user.employmentInfo.levelOfEducation?.toString() || ''}
            </p>
          </div>
          <div>
            <p className={Styles.label}>Employment Status</p>
            <p className={Styles.value}>
              {user.employmentInfo.employmentStatus}
            </p>
          </div>
          <div>
            <p className={Styles.label}>Sector of Employment</p>
            <p className={Styles.value}>
              {user.employmentInfo.sectorOfEmployment}
            </p>
          </div>
          <div>
            <p className={Styles.label}>Duration of Employment</p>
            <p className={Styles.value}>
              {user.employmentInfo.durationOfEmployment}
            </p>
          </div>
          <div>
            <p className={Styles.label}>Office Email</p>
            <p className={Styles.value}>{user.employmentInfo.officeEmail}</p>
          </div>
          <div>
            <p className={Styles.label}>Monthly Income</p>
            <p className={Styles.value}>{user.employmentInfo.monthlyIncome}</p>
          </div>
          <div>
            <p className={Styles.label}>Loan Repayment</p>
            <p className={Styles.value}>{user.employmentInfo.loanRepayment}</p>
          </div>
        </div>
      </section>

      <div className={Styles.Hline}></div>

      {/* Socials */}
      <section className={Styles.section}>
        <h4>Socials</h4>
        <div className={Styles.infoGrid}>
          <div>
            <p className={Styles.label}>Twitter</p>
            <p className={Styles.value}>{user.socials.twitter}</p>
          </div>
          <div>
            <p className={Styles.label}>Facebook</p>
            <p className={Styles.value}>{user.socials.facebook}</p>
          </div>
          <div>
            <p className={Styles.label}>Instagram</p>
            <p className={Styles.value}>{user.socials.instagram}</p>
          </div>
        </div>
      </section>

      <div className={Styles.Hline}></div>

      {/* Guarantors */}
      <section className={Styles.section}>
        <h4>Guarantor</h4>
        {user.guarantors.map((guarantor, index) => (
          <div key={index} className={Styles.infoGrid}>
            <div>
              <p className={Styles.label}>Full Name</p>
              <p className={Styles.value}>{guarantor.name}</p>
            </div>
            <div>
              <p className={Styles.label}>Phone Number</p>
              <p className={Styles.value}>{guarantor.phoneNumber}</p>
            </div>
            <div>
              <p className={Styles.label}>Email Address</p>
              <p className={Styles.value}>{guarantor.email}</p>
            </div>
            <div>
              <p className={Styles.label}>Relationship</p>
              <p className={Styles.value}>{guarantor.relationship}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserInfo;
