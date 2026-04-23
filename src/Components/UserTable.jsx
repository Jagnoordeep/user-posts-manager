import React from 'react';
import { Eye, Edit3, Trash2, ChevronRight } from 'lucide-react';

const UserTable = ({ users, sortConfig, handleSort, handleDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-linear-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors p-2 rounded-lg"
                onClick={() => handleSort('age')}>
              Age 
              <span className="ml-1 inline-block w-4 h-4 text-xs rounded-full bg-gray-200">
                {sortConfig.key === 'age' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors p-2 rounded-lg"
                onClick={() => handleSort('phone')}>
              Contact 
              <span className="ml-1 inline-block w-4 h-4 text-xs rounded-full bg-gray-200">
                {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-50 last:border-b-0">
              {/* Avatar & Name */}
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <img
                    src={user.image || `https://i.pravatar.cc/40?u=${user.id}`}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 rounded-2xl ring-2 ring-gray-200 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg leading-tight">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                  </div>
                </div>
              </td>
              
              {/* Email */}
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-medium truncate max-w-200px hover:underline hover:text-blue-600 transition">
                  {user.email}
                </div>
              </td>
              
              {/* Age */}
              <td className="px-6 py-5 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-2 rounded-2xl text-sm font-bold shadow-sm ${
                  user.age < 50 
                    ? 'bg-linear-to-r from-red-100 to-red-200 text-red-800 shadow-red-200/50' 
                    : 'bg-linear-to-r from-green-100 to-green-200 text-green-800 shadow-green-200/50'
                }`}>
                  {user.age} <span className="ml-1 text-xs opacity-75">yrs</span>
                </span>
              </td>
              
              {/* Gender */}
              <td className="px-6 py-5 whitespace-nowrap">
                <span className="inline-flex items-center px-3 py-2 bg-linear-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-semibold rounded-2xl shadow-sm">
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </span>
              </td>
              
              {/* Phone */}
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.phone}
                </div>
              </td>
              
              {/* Actions */}
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  {/* View Button */}
                  <a
                    href={`/user/${user.id}`}
                    className="group relative p-2.5 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-1.5 text-sm font-semibold"
                  >
                    <Eye size={16} />
                    <span className="hidden sm:inline">View</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform opacity-0 group-hover:opacity-100" />
                  </a>
                  
                  {/* Edit Button */}
                  <button className="p-2.5 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-1.5 text-sm font-semibold">
                    <Edit3 size={16} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="p-2.5 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-1.5 text-sm font-semibold"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Empty State */}
      {(!users || users.length === 0) && (
        <div className="text-center py-16 px-6">
          <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;