import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../Utils/validation';
import { mockUsernames } from '../../Utils/validation';

const UserForm = ({ 
  defaultValues = {}, // ✅ Safe default
  onSubmit, 
  onCancel, 
  isEditMode = false 
}) => {
  
  const safeDefaultValues = {
    firstName: defaultValues.firstName || '',
    lastName: defaultValues.lastName || '',
    email: defaultValues.email || '',
    username: defaultValues.username || '',
    phone: defaultValues.phone || '',
    gender: defaultValues.gender || 'male',
    age: defaultValues.age || 25,
    height: defaultValues.height || '',
    weight: defaultValues.weight || '',
    showAdvanced: defaultValues.showAdvanced || false
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    clearErrors
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: safeDefaultValues
  });

  const showAdvancedFields = watch('showAdvanced');

  const handleUsernameChange = (username) => {
    setValue('username', username);
    clearErrors('username');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            {...register('firstName')}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            {...register('lastName')}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            {...register('email')}
            type="email"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username * 
            <span className="text-xs text-gray-500 ml-1">(Click suggestions)</span>
          </label>
          <div className="relative">
            <input
              {...register('username')}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-32 ${
                errors.username ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="johndoe"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 flex-wrap max-w-30">
              {mockUsernames.slice(0, 3).map((username) => (
                <button
                  key={username}
                  type="button"
                  onClick={() => handleUsernameChange(username)}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition whitespace-nowrap"
                >
                  {username}
                </button>
              ))}
            </div>
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
          <input
            {...register('phone')}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
          <input
            {...register('age', { valueAsNumber: true })}
            type="number"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.age ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="25"
            min="18"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
        <select
          {...register('gender')}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            errors.gender ? 'border-red-300 bg-red-50' : 'border-gray-200'
          }`}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      {/* Dynamic Advanced Fields */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('showAdvanced')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            Add Height & Weight (Advanced)
          </span>
        </label>

        {showAdvancedFields && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                {...register('height')}
                type="number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="175"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                {...register('weight')}
                type="number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="70"
              />
            </div>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update User' : 'Add New User'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
