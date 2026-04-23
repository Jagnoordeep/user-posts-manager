import React from 'react';
import { useUsersContext } from '../Context/UserContext';
import { useTranslation } from 'react-i18next';
import BloodGroupBar from '../Components/Charts/BloodGroupBar';
import AgeGroupLine from '../Components/Charts/AgeGroupLine';
import { getBloodGroupData, getAgeGroupData, getGenderData } from '../Utils/ChartData';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import { BarChart3, Users } from 'lucide-react';

const UserCharts = () => {
  const { users, loading } = useUsersContext();
  const { t } = useTranslation();

  if (loading) return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4"><LoadingSpinner /></div>
    </div>
  );

  const bloodGroupData = getBloodGroupData(users);
  const ageGroupData = getAgeGroupData(users);
  const genderData = getGenderData(users);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-3xl shadow-xl border border-white/50 mb-8">
            <BarChart3 className="w-12 h-12 text-blue-600" />
            <div>
              <h1 className="text-5xl font-black bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                {t('charts.title')}
              </h1>
              <p className="text-xl text-gray-600 font-semibold">{t('charts.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <BloodGroupBar data={bloodGroupData} />
          <AgeGroupLine data={ageGroupData} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl text-white">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{users.length}</p>
                <p className="text-gray-600 font-semibold">{t('charts.totalUsers')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-2xl text-white">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">
                  {genderData.find(d => d.name === 'male')?.count || 0}
                </p>
                <p className="text-gray-600 font-semibold">{t('charts.maleUsers')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-linear-to-r from-pink-500 to-rose-600 rounded-2xl text-white">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">
                  {genderData.find(d => d.name === 'female')?.count || 0}
                </p>
                <p className="text-gray-600 font-semibold">{t('charts.femaleUsers')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCharts;