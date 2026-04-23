import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../Context/SettingsContext';
import LanguageSwitcher from '../Components/Settings/LanguageSwitcher';
import NotificationToggle from '../Components/Settings/NotificationToggle';
import { Settings as SettingsIcon, CheckCircle } from 'lucide-react';

const UserSettingsPage = () => {
  const { t } = useTranslation();
  const { notificationsEnabled, theme } = useSettings();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('notificationsEnabled', notificationsEnabled);
    localStorage.setItem('theme', theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-xl px-10 py-6 rounded-3xl shadow-2xl border border-white/50">
            <SettingsIcon className="w-16 h-16 text-indigo-600 bg-indigo-100 p-4 rounded-3xl" />
            <div>
              <h1 className="text-5xl font-black bg-linear-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-3">
                {t('settings.title')}
              </h1>
              <p className="text-xl text-gray-700 font-semibold opacity-90">
                {t('settings.customizeExperience')}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <LanguageSwitcher />
          <NotificationToggle />
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <button
            onClick={handleSave}
            className={`px-12 py-4 text-white text-lg font-bold rounded-3xl shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-3 ${
              saved
                ? 'bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                : 'bg-linear-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle size={22} />
                {t('settings.saved')}
              </>
            ) : (
              t('settings.saveChanges')
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserSettingsPage;