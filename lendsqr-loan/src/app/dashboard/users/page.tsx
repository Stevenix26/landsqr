'use client'
import UserInfo from '@/app/dashboard/users/userInfo';

export default function Page() {
  return (
    <UserInfo
      fullName="Grace Effiom"
      username="graceeffiom"
      userTier={1}
      accountBalance="₦200,000.00"
      accountNumber="09348209384"
      bankName="Providus Bank"
      personalInfo={{
        fullName: "Grace Effiom",
        phoneNumber: "07060780922",
        email: "grace@gmail.com",
        bvn: "07060780922",
        gender: "Female",
        maritalStatus: "Single",
        numberOfDependents: "None",
        address: "Parent's Apartment",
      }}
      employmentInfo={{
        education: "B.Sc",
        status: "Employed",
        sector: "FinTech",
        duration: "2 years",
        officeEmail: "grace@lendstar.com",
        monthlyIncome: "₦200,000.00 - ₦400,000.00",
        loanRepayment: "40,000",
      }}
      socials={{
        twitter: "@grace_effiom",
        facebook: "Grace Effiom",
        instagram: "@grace_effiom",
      }}
      guarantors={[
        {
          fullName: "Debby Ogana",
          phoneNumber: "07060780922",
          email: "debby@gmail.com",
          relationship: "Sister",
        },
      ]}
      onBlacklist={() => alert("Blacklisted!")}
      onActivate={() => alert("Activated!")}
    />
  );
}
