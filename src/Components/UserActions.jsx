import React from 'react';
import { Eye, Edit3, Trash2, ChevronRight } from 'lucide-react';

const UserActions = ({ userId, onDelete, onEdit }) => {
  return (
    <div className="flex items-center gap-2">
      {/* View Button */}
      <a
        href={`/user/${userId}`}
        className="group relative p-2.5 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-1.5 text-sm font-semibold"
      >
        <Eye size={16} />
        <span className="hidden sm:inline">View</span>
        <ChevronRight
          size={14}
          className="group-hover:translate-x-0.5 transition-transform opacity-0 group-hover:opacity-100"
        />
      </a>

      {/* Edit Button */}
      <button
        onClick={() => onEdit && onEdit(userId)}
        className="p-2.5 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-1.5 text-sm font-semibold"
      >
        <Edit3 size={16} />
        <span className="hidden sm:inline">Edit</span>
      </button>

      {/* Delete Button */}
      <button
        onClick={() => onDelete && onDelete(userId)}
        className="p-2.5 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-1.5 text-sm font-semibold"
      >
        <Trash2 size={16} />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
};

export default UserActions;