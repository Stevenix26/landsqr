export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
}

export interface UsersNow {
  id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  userTier: number;
  accountBalance: string;
  bankDetails: string;
  guarantors: Guarantor[];
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

export interface UserDetailsTabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export interface UserDetailsProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}
