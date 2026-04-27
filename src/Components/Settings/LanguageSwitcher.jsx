import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  
  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en';

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl text-white">
          <Globe className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('settings.language')}</h3>
          <p className="text-gray-600">{t('settings.languageSubtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => changeLanguage('en')}
          className={`group p-6 rounded-2xl border-2 transition-all hover:shadow-xl ${
            currentLang === 'en'
              ? 'border-indigo-500 bg-indigo-50 shadow-lg'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-gray-900">🇺🇸 English</span>
            {currentLang === 'en' && (
              <div className="w-3 h-3 bg-indigo-500 rounded-full ring-2 ring-indigo-200 group-hover:scale-110 transition-transform" />
            )}
          </div>
          <p className="text-sm text-gray-600">{t('settings.defaultLanguage')}</p>
        </button>

        <button
          onClick={() => changeLanguage('es')}
          className={`group p-6 rounded-2xl border-2 transition-all hover:shadow-xl ${
            currentLang === 'es'
              ? 'border-orange-500 bg-orange-50 shadow-lg'
              : 'border-gray-200 hover:border-orange-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-gray-900">🇪🇸 Español</span>
            {currentLang === 'es' && (
              <div className="w-3 h-3 bg-orange-500 rounded-full ring-2 ring-orange-200 group-hover:scale-110 transition-transform" />
            )}
          </div>
          <p className="text-sm text-gray-600">{t('settings.spanishLanguage')}</p>
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
