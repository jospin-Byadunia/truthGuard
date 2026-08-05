import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/80 border border-gray-200 text-[#072B74] hover:bg-gray-50 transition-all cursor-pointer shadow-xs"
      title="Switch Language"
    >
      <Globe className="w-3.5 h-3.5 text-[#1976D2]" />
      <span>{i18n.language === 'fr' ? '🇨🇩 FR' : '🇬🇧 EN'}</span>
    </button>
  );
};