import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterPanel from '@/components/common/FilterPanel';
import { ApiUser } from '@/types/users';

const mockUsers: ApiUser[] = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'johndoe',
    email: 'john@example.com',
    phoneNumber: '+1234567890',
    dateJoined: '2023-01-15',
    status: 'Active',
    profileImage: 'https://example.com/avatar1.jpg',
    userInfo: {
      fullName: 'John Doe',
      bvn: '12345678901',
      gender: 'Male',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: 'Rented',
      levelOfEducation: 'BSc'
    },
    employmentInfo: {
      levelOfEducation: {
        fullName: 'John Doe',
        bvn: '12345678901',
        gender: 'Male',
        maritalStatus: 'Single',
        children: 'None',
        typeOfResidence: 'Rented',
        levelOfEducation: 'BSc'
      },
      employmentStatus: 'Employed',
      sectorOfEmployment: 'Tech',
      durationOfEmployment: '2 years',
      officeEmail: 'john@company.com',
      monthlyIncome: '₦500,000',
      loanRepayment: '₦50,000'
    },
    socials: {
      twitter: '@johndoe',
      facebook: 'johndoe',
      instagram: '@johndoe'
    },
    guarantors: [{
      name: 'Jane Doe',
      phoneNumber: '+0987654321',
      email: 'jane@example.com',
      relationship: 'Sibling'
    }],
    userTier: 1,
    accountBalance: '5000',
    bankName: 'Test Bank',
    accountNumber: 1234567890
  }
];

describe('FilterPanel Component', () => {
  const mockFilters = {
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  };

  const mockOnChange = jest.fn();
  const mockOnApply = jest.fn();
  const mockOnReset = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Positive Tests', () => {
    it('renders all filter fields correctly', () => {
      render(
        <FilterPanel
          filters={mockFilters}
          onChange={mockOnChange}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onClose={mockOnClose}
          users={mockUsers}
        />
      );
      
      expect(screen.getByPlaceholderText('Organization')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Date')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('calls onChange when input values change', () => {
      render(
        <FilterPanel
          filters={mockFilters}
          onChange={mockOnChange}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onClose={mockOnClose}
          users={mockUsers}
        />
      );
      
      const organizationInput = screen.getByPlaceholderText('Organization');
      fireEvent.change(organizationInput, { target: { value: 'Lendsqr' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: { value: 'Lendsqr', name: 'organization' }
        })
      );
    });

    it('calls onApply when apply button is clicked', () => {
      render(
        <FilterPanel
          filters={mockFilters}
          onChange={mockOnChange}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onClose={mockOnClose}
          users={mockUsers}
        />
      );
      
      const applyButton = screen.getByText('Apply');
      fireEvent.click(applyButton);
      
      expect(mockOnApply).toHaveBeenCalled();
    });

    it('calls onReset when reset button is clicked', () => {
      render(
        <FilterPanel
          filters={mockFilters}
          onChange={mockOnChange}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onClose={mockOnClose}
          users={mockUsers}
        />
      );
      
      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);
      
      expect(mockOnReset).toHaveBeenCalled();
    });
  });

  describe('Negative Tests', () => {
    it('handles empty users array gracefully', () => {
      render(
        <FilterPanel
          filters={mockFilters}
          onChange={mockOnChange}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onClose={mockOnClose}
          users={[]}
        />
      );
      
      expect(screen.getByPlaceholderText('Organization')).toBeInTheDocument();
    });

    it('handles undefined users prop', () => {
      render(
        <FilterPanel
          filters={mockFilters}
          onChange={mockOnChange}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onClose={mockOnClose}
          users={undefined as any}
        />
      );
      
      expect(screen.getByPlaceholderText('Organization')).toBeInTheDocument();
    });

    it('handles special characters in filter values', () => {
      const specialFilters = {
        organization: 'Test@#$%',
        username: 'user.name+tag@domain.com',
        email: 'test@example.com',
        date: '2023-12-31',
        phoneNumber: '+123-456-7890',
        status: 'Active',
      };

      render(
        <FilterPanel
          filters={specialFilters}
          onChange={mockOnChange}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onClose={mockOnClose}
          users={mockUsers}
        />
      );
      
      expect(screen.getByDisplayValue('Test@#$%')).toBeInTheDocument();
      expect(screen.getByDisplayValue('user.name+tag@domain.com')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long filter values', () => {
      const longFilters = {
        organization: 'A'.repeat(100),
        username: 'B'.repeat(100),
        email: 'C'.repeat(100),
        date: '2023-12-31',
        phoneNumber: 'D'.repeat(100),
        status: 'Active',
      };

      render(
        <FilterPanel
          filters={longFilters}
          onChange={mockOnChange}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onClose={mockOnClose}
          users={mockUsers}
        />
      );
      
      expect(screen.getByDisplayValue('A'.repeat(100))).toBeInTheDocument();
    });
  });
});
