import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 hover:text-gray-900"
      title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <Languages className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'हिं' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;