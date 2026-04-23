import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useUsersContext } from '../Context/UserContext';
import { useTranslation } from 'react-i18next';
import UserModal from '../Components/Modals/UserModal';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import ErrorMessage from '../Components/Common/ErrorMessage';

const SortIcon = ({ columnKey, sortConfig }) => {
  if (sortConfig.key !== columnKey) return <span className="text-gray-300 ml-1">↕</span>;
  return <span className="text-indigo-600 ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
};

const UsersList = () => {
  const { users, loading, error, deleteUser, updateUser } = useUsersContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ gender: '', age: '' });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const usersPerPage = 10;

  const processedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = !filters.gender || user.gender === filters.gender;
      const matchesAge = !filters.age || String(user.age) === String(filters.age);
      return matchesSearch && matchesGender && matchesAge;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === 'age') { aVal = parseInt(aVal); bVal = parseInt(bVal); }
        if (sortConfig.key === 'phone') {
          aVal = aVal?.replace(/\D/g, '') ?? '';
          bVal = bVal?.replace(/\D/g, '') ?? '';
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [users, searchTerm, filters, sortConfig]);

  const totalPages = Math.ceil(processedUsers.length / usersPerPage);
  const paginatedUsers = processedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleDelete = useCallback((id) => {
    confirmAlert({
      title: t('usersList.confirmDelete'),
      message: t('usersList.confirmDeleteMsg'),
      buttons: [
        { label: t('usersList.yes'), onClick: () => deleteUser(id) },
        { label: t('usersList.no'), onClick: () => {} }
      ]
    });
  }, [deleteUser, t]);

  const handleEdit = useCallback((user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  }, []);

  const handleEditSubmit = useCallback((data) => {
    updateUser({ ...selectedUser, ...data, age: parseInt(data.age) });
    setEditModalOpen(false);
    setSelectedUser(null);
  }, [selectedUser, updateUser]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="container mx-auto px-4 py-8">

      <UserModal
        isOpen={editModalOpen}
        onClose={() => { setEditModalOpen(false); setSelectedUser(null); }}
        onSubmit={handleEditSubmit}
        defaultValues={selectedUser || {}}
        isEditMode={true}
      />

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('usersList.title')}</h1>
            <p className="text-gray-600">{t('usersList.subtitle')}</p>
          </div>
          <button
            onClick={() => navigate('/add-user')}
            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            + {t('usersList.addUser')}
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder={t('usersList.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
          />
          <select
            value={filters.gender}
            onChange={(e) => { setFilters({ ...filters, gender: e.target.value }); setCurrentPage(1); }}
            className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
          >
            <option value="">{t('usersList.allGenders')}</option>
            <option value="male">{t('usersList.male')}</option>
            <option value="female">{t('usersList.female')}</option>
          </select>
          <input
            type="number"
            placeholder={t('usersList.filterByAge')}
            value={filters.age}
            onChange={(e) => { setFilters({ ...filters, age: e.target.value }); setCurrentPage(1); }}
            className="w-36 px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-gray-50 to-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">{t('usersList.usersCount', { count: processedUsers.length })}</h2>
            <span className="text-sm text-gray-500">{t('usersList.pageOf', { current: currentPage, total: totalPages })}</span>
          </div>
        </div>

        {paginatedUsers.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('usersList.noUsersFound')}</h3>
            <p className="text-gray-500">{t('usersList.tryAdjusting')}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{t('usersList.name')}</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{t('usersList.email')}</th>
                    <th
                      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-all select-none"
                      onClick={() => handleSort('age')}
                    >
                      {t('usersList.age')} <SortIcon columnKey="age" sortConfig={sortConfig} />
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-all select-none"
                      onClick={() => handleSort('phone')}
                    >
                      {t('usersList.phone')} <SortIcon columnKey="phone" sortConfig={sortConfig} />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{t('usersList.gender')}</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{t('usersList.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={user.image || `https://i.pravatar.cc/40?u=${user.id}`}
                            alt={user.firstName}
                            className="w-12 h-12 rounded-2xl ring-2 ring-gray-200 object-cover"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-xl ${
                          user.age < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {user.age} {t('usersList.yrs')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-700">{user.phone ?? '—'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 bg-linear-to-r from-emerald-100 to-emerald-200 text-emerald-800 text-sm font-semibold rounded-xl">
                          {user.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <a
                            href={`/user/${user.id}`}
                            className="px-3 py-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:shadow-lg transition-all"
                          >
                            {t('usersList.view')}
                          </a>
                          <button
                            onClick={() => handleEdit(user)}
                            className="px-3 py-2 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-white text-sm font-medium hover:shadow-lg transition-all"
                          >
                            {t('usersList.edit')}
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-3 py-2 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 text-white text-sm font-medium hover:shadow-lg transition-all"
                          >
                            {t('usersList.delete')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    {t('usersList.showing', {
                      from: ((currentPage - 1) * usersPerPage) + 1,
                      to: Math.min(currentPage * usersPerPage, processedUsers.length),
                      total: processedUsers.length
                    })}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('usersList.previous')}
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('usersList.next')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersList;