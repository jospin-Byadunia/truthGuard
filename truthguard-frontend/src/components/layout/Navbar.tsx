import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldCheck, Search } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '../ui/Button';
import logoImg from '../../assets/logo.jpeg'; // Import your logo image

export const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="TruthGuard Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B7280]">
          <Link to="/" className="text-[#072B74] font-semibold hover:text-[#1976D2] transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/verify" className="hover:text-[#072B74] transition-colors">
            {t('nav.verify')}
          </Link>
          <a href="#features" className="hover:text-[#072B74] transition-colors">
            {t('nav.about')}
          </a>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/verify">
            <Button variant="primary" size="sm" icon={<Search className="w-4 h-4" />}>
              {t('nav.btn_verify')}
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
};