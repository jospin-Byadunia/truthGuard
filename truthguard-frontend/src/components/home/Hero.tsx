import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Link2, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative overflow-hidden">
      
      {/* Badge Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="info" className="mb-6 py-1.5 px-4 text-xs font-semibold uppercase tracking-wider">
          {t('hero.badge')}
        </Badge>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#072B74] tracking-tight leading-[1.15] max-w-4xl mb-6"
      >
        {t('hero.title_part1')} <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1976D2] to-[#072B74]">
          {t('hero.title_part2')}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mb-10 leading-relaxed font-body"
      >
        {t('hero.subtitle')}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
      >
        <Link to="/verify">
          <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            {t('hero.btn_primary')}
          </Button>
        </Link>
        <a href="#features">
          <Button variant="outline" size="lg">
            {t('hero.btn_secondary')}
          </Button>
        </a>
      </motion.div>

      {/* Input Options Preview Pills */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-6 p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm text-sm font-medium text-[#6B7280]"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 text-[#072B74]">
          <FileText className="w-4 h-4 text-[#1976D2]" />
          <span>Texte Copié</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 text-[#072B74]">
          <Link2 className="w-4 h-4 text-[#1976D2]" />
          <span>Lien URL</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 text-[#072B74]">
          <ImageIcon className="w-4 h-4 text-[#1976D2]" />
          <span>Capture d'écran</span>
        </div>
      </motion.div>

    </section>
  );
};