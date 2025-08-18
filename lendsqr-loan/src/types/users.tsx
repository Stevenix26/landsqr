

export interface ApiUser {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  profileImage: string;
  userInfo: ApiUserInfo;
  employmentInfo: EmploymentInfo;
  socials: Socials;
  guarantors: Guarantor[];
  userTier: number;
  accountBalance: string;
  bankName: string;
  accountNumber: number;
}

export interface ApiUserInfo {
  fullName: string;
  bvn: string;
  gender: "Male" | "Female";
  maritalStatus: "Single" | "Married" | "Divorced";
  children: string;
  typeOfResidence: "Rented" | "Owned" | "Family House";
  levelOfEducation: "High School" | "BSc" | "MSc" | "PhD";
}

export interface EmploymentInfo {
  levelOfEducation: ApiUserInfo
  employmentStatus: "Employed" | "Self-employed" | "Unemployed";
  sectorOfEmployment:
    | "Tech"
    | "Finance"
    | "Education"
    | "Healthcare"
    | "Manufacturing";
  durationOfEmployment: "1 year" | "2 years" | "5 years" | "10 years";
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  name: string;
  phoneNumber: string;
  email: string;
  relationship: "Friend" | "Colleague" | "Sibling" | "Parent";
}

export interface UserDetailsTabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export interface UserDetailsProps {
  user: ApiUser;
  onEdit: () => void;
  onDelete: () => void;
}
