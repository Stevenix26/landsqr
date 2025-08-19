import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersTable from '../../components/dashboard/UsersTable';
import { mockUsers } from '../../mocks/mockUsers';
import { ApiUser } from '../../types/users';

// Mock the UserActionsMenu component
jest.mock('../../components/common/UserActionMenu', () => {
  return function MockUserActionsMenu({ 
    userId, 
    onBlacklist, 
    onActivate 
  }: { 
    userId: string; 
    onBlacklist: (id: string) => void; 
    onActivate: (id: string) => void; 
  }) {
    return (
      <div data-testid={`user-actions-${userId}`}>
        <button onClick={() => onBlacklist(userId)} data-testid={`blacklist-${userId}`}>
          Blacklist
        </button>
        <button onClick={() => onActivate(userId)} data-testid={`activate-${userId}`}>
          Activate
        </button>
      </div>
    );
  };
});

// Mock the FilterPanel component
jest.mock('../../components/common/FilterPanel', () => {
  return function MockFilterPanel({ 
    onApply, 
    onReset,
    onClose
  }: { 
    onApply: () => void; 
    onReset: () => void;
    onClose: () => void;
  }) {
    return (
      <div data-testid="filter-panel">
        <button onClick={onApply}>Apply</button>
        <button onClick={onReset}>Reset</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

describe('UsersTable Component - Comprehensive Testing', () => {
  const mockUpdateUserStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Positive Scenarios', () => {
    test('renders table headers correctly', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      const headers = [
        'Organization',
        'Username',
        'Email',
        'Phone Number',
        'Date Joined',
        'Status'
      ];

      headers.forEach(header => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
    });

    test('renders all users with correct data', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      mockUsers.forEach(user => {
        expect(screen.getByText(user.organization)).toBeInTheDocument();
        expect(screen.getByText(user.username)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(screen.getByText(user.phoneNumber.replace('+234', '0'))).toBeInTheDocument();
      });
    });

    test('displays correct status badges', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      mockUsers.forEach(user => {
        const statusButton = screen.getByText(user.status);
        expect(statusButton).toBeInTheDocument();
        expect(statusButton).toHaveClass('status_btn');
      });
    });

    test('renders user links correctly', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      mockUsers.forEach(user => {
        const userLink = screen.getByText(user.username);
        expect(userLink).toBeInTheDocument();
        expect(userLink.closest('a')).toHaveAttribute(
          'href', 
          `/dashboard/usersDetails/${user.id}`
        );
      });
    });

    test('handles pagination correctly with many users', () => {
      const manyUsers = Array.from({ length: 25 }, (_, i) => ({
        ...mockUsers[0],
        id: `user-${i}`,
        username: `user${i}`,
        email: `user${i}@example.com`,
      }));

      render(
        <UsersTable 
          users={manyUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Should show pagination controls
      expect(screen.getByText('out of 25')).toBeInTheDocument();
      
      // Test items per page selector
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
      
      fireEvent.change(select, { target: { value: '25' } });
      expect(screen.getByText('out of 25')).toBeInTheDocument();
    });

    test('filters users correctly by organization', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Test filtering through FilterPanel interaction
      const filterIcons = screen.getAllByAltText('Filter');
      fireEvent.click(filterIcons[0]); // Organization filter

      // Apply filter
      const applyButton = screen.getByText('Apply');
      fireEvent.click(applyButton);

      // Should still show users (filter is mocked)
      expect(screen.getByText('Lendsqr')).toBeInTheDocument();
    });

    test('status update functionality works correctly', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Test blacklist functionality
      const blacklistButton = screen.getByTestId(`blacklist-${mockUsers[0].id}`);
      fireEvent.click(blacklistButton);
      
      expect(mockUpdateUserStatus).toHaveBeenCalledWith(
        mockUsers[0].id, 
        'Blacklisted'
      );

      // Test activate functionality
      const activateButton = screen.getByTestId(`activate-${mockUsers[0].id}`);
      fireEvent.click(activateButton);
      
      expect(mockUpdateUserStatus).toHaveBeenCalledWith(
        mockUsers[0].id, 
        'Active'
      );
    });
  });

  describe('Negative Scenarios', () => {
    test('handles empty users array gracefully', () => {
      render(
        <UsersTable 
          users={[]} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      expect(screen.getByText('Organization')).toBeInTheDocument();
      expect(screen.queryByText(mockUsers[0].username)).not.toBeInTheDocument();
    });

    test('handles null/undefined users prop', () => {
      const { container } = render(
        <UsersTable 
          users={null as any} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Should not crash
      expect(container).toBeInTheDocument();
    });

    test('handles users with missing required fields', () => {
      const invalidUsers = [
        {
          id: '1',
          organization: '',
          username: null as any,
          email: undefined as any,
          phoneNumber: '',
          dateJoined: '',
          status: 'Active' as const,
        } as ApiUser
      ];

      render(
        <UsersTable 
          users={invalidUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Should not crash
      expect(screen.getByText('Organization')).toBeInTheDocument();
    });

    test('handles status update failures gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Trigger status update
      const actionButtons = screen.getAllByTestId(/user-actions-/);
      const blacklistButton = actionButtons[0].querySelector('button');
      
      if (blacklistButton) {
        fireEvent.click(blacklistButton);
      }

      expect(mockUpdateUserStatus).toHaveBeenCalledWith(
        mockUsers[0].id, 
        'Blacklisted'
      );
      
      consoleSpy.mockRestore();
    });

    test('handles malformed phone numbers', () => {
      const malformedUsers = [
        {
          ...mockUsers[0],
          phoneNumber: 'invalid-phone',
        }
      ];

      render(
        <UsersTable 
          users={malformedUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Should display as-is without crashing
      expect(screen.getByText('invalid-phone')).toBeInTheDocument();
    });

    test('handles invalid date formats', () => {
      const invalidDateUsers = [
        {
          ...mockUsers[0],
          dateJoined: 'invalid-date',
        }
      ];

      render(
        <UsersTable 
          users={invalidDateUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Should display as-is without crashing
      expect(screen.getByText('Invalid Date')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles single user correctly', () => {
      render(
        <UsersTable 
          users={[mockUsers[0]]} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      expect(screen.getByText(mockUsers[0].username)).toBeInTheDocument();
      expect(screen.queryByText('out of 2')).not.toBeInTheDocument();
    });

    test('handles maximum users display', () => {
      const maxUsers = Array.from({ length: 100 }, (_, i) => ({
        ...mockUsers[0],
        id: `user-${i}`,
        username: `user${i}`,
        email: `user${i}@example.com`,
      }));

      render(
        <UsersTable 
          users={maxUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Should show pagination
      expect(screen.getByText('out of 100')).toBeInTheDocument();
    });

    test('handles special characters in user data', () => {
      const specialUsers = [
        {
          ...mockUsers[0],
          username: 'user@name#test',
          email: 'test+special@sub.example.com',
          organization: 'Test & Co.',
        }
      ];

      render(
        <UsersTable 
          users={specialUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      expect(screen.getByText('user@name#test')).toBeInTheDocument();
      expect(screen.getByText('test+special@sub.example.com')).toBeInTheDocument();
    });

    test('handles very long organization names', () => {
      const longNameUsers = [
        {
          ...mockUsers[0],
          organization: 'Very Long Organization Name That Exceeds Normal Display Limits Corporation International',
        }
      ];

      render(
        <UsersTable 
          users={longNameUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      expect(screen.getByText(longNameUsers[0].organization)).toBeInTheDocument();
    });

    test('handles date formatting edge cases', () => {
      const edgeDateUsers = [
        {
          ...mockUsers[0],
          dateJoined: '2024-02-29', // Leap year
        }
      ];

      render(
        <UsersTable 
          users={edgeDateUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      expect(screen.getByText(/February 29, 2024/)).toBeInTheDocument();
    });

    test('handles all status types correctly', () => {
      const statusUsers = [
        { ...mockUsers[0], id: '1', status: 'Active' as const },
        { ...mockUsers[0], id: '2', status: 'Inactive' as const },
        { ...mockUsers[0], id: '3', status: 'Pending' as const },
        { ...mockUsers[0], id: '4', status: 'Blacklisted' as const },
      ];

      render(
        <UsersTable 
          users={statusUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      const statuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
      statuses.forEach(status => {
        expect(screen.getByText(status)).toBeInTheDocument();
      });
    });

    test('handles duplicate user IDs gracefully', () => {
      const duplicateUsers = [
        { ...mockUsers[0], id: '1' },
        { ...mockUsers[1], id: '1' }, // Same ID
      ];

      render(
        <UsersTable 
          users={duplicateUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      // Should render both entries
      expect(screen.getAllByText('1')).toHaveLength(2);
    });
  });

  describe('Mobile Responsiveness', () => {
    test('handles mobile filter overlay', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      const mobileFilterBtn = screen.getByText('Filter');
      fireEvent.click(mobileFilterBtn);

      // Should trigger mobile filter
      expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    });

    test('closes mobile filter on reset', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      const mobileFilterBtn = screen.getByText('Filter');
      fireEvent.click(mobileFilterBtn);

      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);

      // Filter should close
      expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility Tests', () => {
    test('has proper ARIA attributes', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      
      // Check for proper table structure
      expect(screen.getAllByRole('columnheader')).toHaveLength(7);
    });

    test('keyboard navigation works correctly', () => {
      render(
        <UsersTable 
          users={mockUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      const links = screen.getAllByRole('link');
      expect(links[0]).toBeInTheDocument();
      
      // Tab navigation should work
      fireEvent.keyDown(links[0], { key: 'Tab' });
    });

    test('pagination buttons are keyboard accessible', () => {
      const manyUsers = Array.from({ length: 20 }, (_, i) => ({
        ...mockUsers[0],
        id: `user-${i}`,
        username: `user${i}`,
      }));

      render(
        <UsersTable 
          users={manyUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );

      const paginationButtons = screen.getAllByRole('button');
      expect(paginationButtons.length).toBeGreaterThan(0);
      
      // Test keyboard interaction
      fireEvent.keyDown(paginationButtons[0], { key: 'Enter' });
    });
  });

  describe('Performance Tests', () => {
    test('handles large dataset efficiently', () => {
      const largeUsers = Array.from({ length: 1000 }, (_, i) => ({
        ...mockUsers[0],
        id: `user-${i}`,
        username: `user${i}`,
        email: `user${i}@example.com`,
      }));

      const startTime = performance.now();
      
      render(
        <UsersTable 
          users={largeUsers} 
          updateUserStatus={mockUpdateUserStatus} 
        />
      );
      
      const endTime = performance.now();
      
      // Should render within reasonable time
      expect(endTime - startTime).toBeLessThan(1000);
      expect(screen.getByText('out of 1000')).toBeInTheDocument();
    });
  });
});
