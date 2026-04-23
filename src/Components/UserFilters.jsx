import { useState } from 'react';

const UserFilters = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
  };

  const clearFilters = () => {
    setTempFilters({ age: '', gender: '' });
    setFilters({ age: '', gender: '' });
    setSearchTerm('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <select
          value={tempFilters.age}
          onChange={(e) => handleFilterChange('age', e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Ages</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="40">40+</option>
        </select>

        <select
          value={tempFilters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="flex-1 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Apply
          </button>
          <button
            onClick={clearFilters}
            className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;