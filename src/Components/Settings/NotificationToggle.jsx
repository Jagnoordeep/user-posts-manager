import React from 'react';
import { useSettings } from '../../Context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { Bell, CheckCircle, XCircle } from 'lucide-react';

const NotificationToggle = () => {
  const { notificationsEnabled, toggleNotifications } = useSettings();
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-linear-to-r from-emerald-500 to-teal-600 rounded-2xl text-white">
          <Bell className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('settings.notifications')}</h3>
          <p className="text-gray-600">{t('settings.notificationsSubtitle')}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-1">{t('settings.emailNotifications')}</h4>
            <p className="text-sm text-gray-600">{t('settings.emailNotificationsSubtitle')}</p>
          </div>
          <button
            onClick={toggleNotifications}
            className={`p-3 rounded-2xl shadow-lg transition-all hover:shadow-xl ${
              notificationsEnabled
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-300/50'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {notificationsEnabled ? <CheckCircle size={24} /> : <XCircle size={24} />}
          </button>
        </div>

        <div className={`p-6 rounded-2xl transition-all ${
          notificationsEnabled
            ? 'bg-emerald-50 border-2 border-emerald-200 shadow-md'
            : 'bg-gray-50 border-2 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg text-gray-900">{t('settings.status')}</h4>
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
              notificationsEnabled
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {notificationsEnabled ? t('settings.enabled') : t('settings.disabled')}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {notificationsEnabled
              ? t('settings.notificationsEnabledMsg')
              : t('settings.notificationsDisabledMsg')
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationToggle;