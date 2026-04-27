import React from 'react';
import { Mail, Phone, MapPin, User, Cake, Ruler, Scale } from 'lucide-react';
import { calculateAge } from '../Utils/helpers';

const UserDetailsCard = ({ user }) => {
  if (!user) return null;

  const age = calculateAge(user.birthDate);

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex items-start gap-6">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-32 h-32 rounded-3xl ring-4 ring-white/50 shadow-2xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold mb-2 leading-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-xl opacity-90 mb-1">@{user.username}</p>
            <p className={`text-lg font-semibold px-4 py-1 rounded-full inline-block ${
              age < 50 ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'
            }`}>
              {age} years old
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 divide-y divide-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email</span>
            </div>
            <a href={`mailto:${user.email}`} className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition block">
              {user.email}
            </a>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Phone</span>
            </div>
            <a href={`tel:${user.phone}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition block">
              {user.phone}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Gender</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-lg font-semibold rounded-2xl">
              {user.gender}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Cake className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Birth Date</span>
            </div>
            <div className="text-xl font-semibold text-gray-900">
              {new Date(user.birthDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {user.address && (
          <div className="py-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Address</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                <div><span className="font-semibold text-gray-700">Street: </span>{user.address.address}</div>
                <div><span className="font-semibold text-gray-700">City: </span>{user.address.city}</div>
                <div><span className="font-semibold text-gray-700">State: </span>{user.address.state}</div>
                <div><span className="font-semibold text-gray-700">ZIP: </span>{user.address.zip}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsCard; 
