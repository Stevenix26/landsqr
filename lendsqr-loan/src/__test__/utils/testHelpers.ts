import { ApiUser } from '../../types/users';

export const createMockUser = (overrides?: Partial<ApiUser>): ApiUser => ({
  id: 'test-user-id',
  organization: 'Test Organization',
  username: 'testuser',
  email: 'test@example.com',
  phoneNumber: '+1234567890',
  dateJoined: '2024-01-01',
  status: 'Active',
  profileImage: 'https://example.com/avatar.jpg',
  userInfo: {
    fullName: 'Test User',
    bvn: '12345678901',
    gender: 'Male',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: 'Rented',
    levelOfEducation: 'BSc',
  },
  employmentInfo: {
    levelOfEducation: {
      fullName: 'Test User',
      bvn: '12345678901',
      gender: 'Male',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: 'Rented',
      levelOfEducation: 'BSc',
    },
    employmentStatus: 'Employed',
    sectorOfEmployment: 'Tech',
    durationOfEmployment: '2 years',
    officeEmail: 'test@company.com',
    monthlyIncome: '₦500,000',
    loanRepayment: '₦50,000',
  },
  socials: {
    twitter: '@testuser',
    facebook: 'testuser',
    instagram: '@testuser',
  },
  guarantors: [
    {
      name: 'Test Guarantor',
      phoneNumber: '+0987654321',
      email: 'guarantor@example.com',
      relationship: 'Friend',
    },
  ],
  userTier: 1,
  accountBalance: '5000',
  bankName: 'Test Bank',
  accountNumber: 1234567890,
  ...overrides,
});

export const createMockUsers = (count: number): ApiUser[] => {
  return Array.from({ length: count }, (_, i) => 
    createMockUser({
      id: `user-${i}`,
      username: `user${i}`,
      email: `user${i}@example.com`,
    })
  );
};

export const createUsersWithAllStatuses = (): ApiUser[] => {
  const statuses: ApiUser['status'][] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
  return statuses.map((status, index) => 
    createMockUser({
      id: `status-${index}`,
      username: `user-${status.toLowerCase()}`,
      status,
    })
  );
};

export const createInvalidUsers = (): any[] => [
  {
    id: 'invalid-1',
    username: null,
    email: undefined,
    organization: '',
    phoneNumber: null,
    dateJoined: 'invalid-date',
    status: 'InvalidStatus',
  },
  {
    id: 'invalid-2',
    // Missing required fields
  },
];

export const createEdgeCaseUsers = (): ApiUser[] => [
  createMockUser({
    id: 'long-username',
    username: 'verylongusernamethatexceedsnormaldisplaylimitsandshouldbetested',
  }),
  createMockUser({
    id: 'special-chars',
    username: 'user@name#test$%^&*()',
    email: 'test+special@sub.example.com',
    organization: 'Test & Co. Ltd.',
  }),
  createMockUser({
    id: 'empty-fields',
    username: '',
    email: '',
    organization: '',
    phoneNumber: '',
  }),
  createMockUser({
    id: 'unicode',
    username: '用户测试',
    email: '测试@例子.公司',
    organization: '测试公司',
  }),
];

export const createPerformanceTestUsers = (count: number): ApiUser[] => {
  return Array.from({ length: count }, (_, i) => 
    createMockUser({
      id: `perf-user-${i}`,
      username: `perfuser${i}`,
      email: `perf${i}@example.com`,
      organization: `Perf Org ${i % 10}`,
      status: ['Active', 'Inactive', 'Pending', 'Blacklisted'][i % 4] as ApiUser['status'],
    })
  );
};

export const createUsersForPagination = (count: number): ApiUser[] => {
  return Array.from({ length: count }, (_, i) => 
    createMockUser({
      id: `page-user-${i}`,
      username: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    })
  );
};

export const createUsersForFiltering = (): ApiUser[] => [
  createMockUser({ organization: 'Lendsqr', status: 'Active' }),
  createMockUser({ organization: 'TechCorp', status: 'Inactive' }),
  createMockUser({ organization: 'Lendsqr', status: 'Pending' }),
  createMockUser({ organization: 'FinanceInc', status: 'Blacklisted' }),
  createMockUser({ organization: 'Lendsqr', status: 'Active' }),
];
