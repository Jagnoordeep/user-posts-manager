import React from 'react';
import UserForm from '../Forms/UserForm';
import { X } from 'lucide-react';

const UserModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  defaultValues = {}, 
  isEditMode = false,
  title 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100">
            <div className="p-8 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditMode ? 'Edit User' : 'Add New User'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <UserForm
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                onCancel={onClose}
                isEditMode={isEditMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;