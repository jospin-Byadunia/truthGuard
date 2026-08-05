import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import logoImg from '../../assets/logo.jpeg'; // Import your logo image

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2.5">
          <img src={logoImg} alt="TruthGuard Logo" className="h-10 w-auto object-contain" />
        </div>

        <p className="text-xs text-[#6B7280] text-center md:text-left">
          {t('footer.desc')}
        </p>

        <p className="text-xs text-[#6B7280]">
          © {new Date().getFullYear()} TruthGuard. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};