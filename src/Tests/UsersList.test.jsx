import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersList from '../Pages/UsersList';
import * as UserContext from '../Context/UserContext';
import { confirmAlert } from 'react-confirm-alert';


jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn()
}));


const mockDeleteUser = jest.fn();
const mockUpdateUser = jest.fn();

const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    username: 'johndoe',
    gender: 'male',
    age: 34,
    image: null
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    gender: 'female',
    age: 55,
    image: null
  }
];

const renderWithContext = (contextOverrides = {}) => {
  jest.spyOn(UserContext, 'useUsersContext').mockReturnValue({
    users: mockUsers,
    loading: false,
    error: null,
    deleteUser: mockDeleteUser,
    updateUser: mockUpdateUser,
    addUser: jest.fn(),
    ...contextOverrides
  });

  return render(
    <BrowserRouter>
      <UsersList />
    </BrowserRouter>
  );
};

describe('UsersList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  

  test('renders page title and user count', () => {
    renderWithContext();
    expect(screen.getByText('Users Management')).toBeInTheDocument();
    expect(screen.getByText('Users (2)')).toBeInTheDocument();
  });

  test('renders user rows correctly', () => {
    renderWithContext();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  

  test('shows age in red when age < 50', () => {
    renderWithContext();
    // John is 34 — should be red
    const ageBadge = screen.getByText('34 yrs');
    expect(ageBadge).toHaveClass('text-red-700');
  });

  test('shows age in green when age >= 50', () => {
    renderWithContext();
    // Jane is 55 — should be green
    const ageBadge = screen.getByText('55 yrs');
    expect(ageBadge).toHaveClass('text-green-700');
  });

  

  test('shows loading spinner when loading is true', () => {
    renderWithContext({ loading: true, users: [] });
    // LoadingSpinner renders — just verify table is NOT present
    expect(screen.queryByText('Users Management')).not.toBeInTheDocument();
  });

  test('shows error message when error is present', () => {
    renderWithContext({ error: 'Network error', users: [] });
    expect(screen.queryByText('Users Management')).not.toBeInTheDocument();
  });

 

  test('filters users by search term', async () => {
    renderWithContext();
    const input = screen.getByPlaceholderText(/search by name or email/i);
    fireEvent.change(input, { target: { value: 'John' } });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  test('shows empty state when search has no matches', async () => {
    renderWithContext();
    const input = screen.getByPlaceholderText(/search by name or email/i);
    fireEvent.change(input, { target: { value: 'nonexistent_xyz' } });

    await waitFor(() => {
      expect(screen.getByText('No users found matching your criteria')).toBeInTheDocument();
    });
  });

 

  test('calls confirmAlert when Delete button is clicked', () => {
    renderWithContext();
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(confirmAlert).toHaveBeenCalledWith({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this user?',
      buttons: expect.any(Array)
    });
  });

  test('calls deleteUser from context when confirm Yes is clicked', () => {
    confirmAlert.mockImplementation(({ buttons }) => {
      // Simulate clicking "Yes"
      buttons[0].onClick();
    });

    renderWithContext();
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(mockDeleteUser).toHaveBeenCalledWith(mockUsers[0].id);
  });

  

  test('opens edit modal when Edit button is clicked', async () => {
    renderWithContext();
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Edit User')).toBeInTheDocument();
    });
  });



  test('filters users by gender', async () => {
    renderWithContext();
    const genderSelect = screen.getByDisplayValue('All Genders');
    fireEvent.change(genderSelect, { target: { value: 'female' } });

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
