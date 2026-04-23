import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from '../Context/UserContext';
import { useTranslation } from 'react-i18next';
import UserModal from '../Components/Modals/UserModal';
import { ArrowLeft } from 'lucide-react';

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { addUser } = useUsersContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const newUser = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      phone: data.phone,
      gender: data.gender,
      age: parseInt(data.age),
      birthDate: new Date(Date.now() - parseInt(data.age) * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      ...(data.height && { height: parseFloat(data.height) }),
      ...(data.weight && { weight: parseFloat(data.weight) }),
      image: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    addUser(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 font-medium transition"
        >
          <ArrowLeft size={20} />
          {t('addUser.backToUsers')}
        </button>

        <UserModal
          isOpen={isModalOpen}
          onClose={() => navigate('/')}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddUser;