import { useState, useMemo, useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { calculateAge } from '../utils/helpers';


export const useUsers = (usersData) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ age: '', gender: '' });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredUsers = useMemo(() => {
    if (!usersData?.users) return [];

    return usersData.users
      .map(user => ({
        ...user,
        age: calculateAge(user.birthDate)
      }))
      .filter(user => {
        const matchesSearch = 
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesAge = !filters.age || user.age === parseInt(filters.age);
        const matchesGender = !filters.gender || user.gender === filters.gender;

        return matchesSearch && matchesAge && matchesGender;
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [usersData?.users, searchTerm, filters, sortConfig]);

  const handleDelete = useCallback((userId) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // In real app, you'd call delete API here
            console.log('User deleted:', userId);
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  return {
    users: filteredUsers,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortConfig,
    handleSort,
    handleDelete,
    totalUsers: filteredUsers.length
  };
};