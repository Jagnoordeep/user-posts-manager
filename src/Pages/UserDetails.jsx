import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserDetails } from '../Hooks/useUserDetails';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import ErrorMessage from '../Components/Common/ErrorMessage';
import UserDetailsCard from '../Components/UserDetailsCard';
import { ArrowLeft, User } from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useUserDetails();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <ErrorMessage 
            message={error || 'User not found'} 
            onRetry={() => navigate(0)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 mb-12 text-gray-600 hover:text-gray-900 font-semibold transition-all group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Users</span>
        </button>

        {/* User Details Card */}
        <UserDetailsCard user={user} />

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="group bg-linear-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
            <User size={20} />
            Edit Profile
          </button>
          <button className="group bg-linear-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
            📧 Send Email
          </button>
          <button className="group bg-linear-to-r from-rose-500 to-rose-600 text-white p-6 rounded-2xl font-semibold hover:from-rose-600 hover:to-rose-700 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
            🗑️ Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails; // ✅ DEFAULT EXPORT (this fixes the error!)