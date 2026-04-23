import React from 'react';
import { Plus } from 'lucide-react';

const AddUserButton = ({ onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 focus:ring-4 focus:ring-emerald-200 shadow-lg hover:shadow-xl transition-all ${className}`}
  >
    <Plus size={20} />
    <span>Add New User</span>
  </button>
);

export default AddUserButton;