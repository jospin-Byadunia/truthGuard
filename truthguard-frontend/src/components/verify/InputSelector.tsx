import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Link2, Image as ImageIcon } from 'lucide-react';

export type InputMode = 'text' | 'url' | 'image';

interface InputSelectorProps {
  activeMode: InputMode;
  onSelectMode: (mode: InputMode) => void;
}

export const InputSelector: React.FC<InputSelectorProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const { t } = useTranslation();

  const options: { id: InputMode; icon: React.ReactNode; title: string; desc: string }[] = [
    {
      id: 'text',
      icon: <FileText className="w-7 h-7 text-[#1976D2]" />,
      title: t('verify.tab_text'),
      desc: t('verify.tab_text_desc'),
    },
    {
      id: 'url',
      icon: <Link2 className="w-7 h-7 text-[#1976D2]" />,
      title: t('verify.tab_url'),
      desc: t('verify.tab_url_desc'),
    },
    {
      id: 'image',
      icon: <ImageIcon className="w-7 h-7 text-[#1976D2]" />,
      title: t('verify.tab_image'),
      desc: t('verify.tab_image_desc'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {options.map((option) => {
        const isSelected = activeMode === option.id;
        return (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode(option.id)}
            className={`flex flex-col items-start p-6 rounded-[18px] border text-left cursor-pointer transition-all duration-300 relative ${
              isSelected
                ? 'bg-white border-[#072B74] shadow-xl ring-2 ring-[#072B74]/10'
                : 'bg-white/60 border-gray-200/80 hover:bg-white hover:border-gray-300 shadow-sm'
            }`}
          >
            {isSelected && (
              <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#072B74] animate-pulse" />
            )}
            <div
              className={`p-3 rounded-2xl mb-4 transition-colors ${
                isSelected ? 'bg-blue-50 text-[#072B74]' : 'bg-gray-100/80 text-gray-500'
              }`}
            >
              {option.icon}
            </div>
            <h3 className="font-heading font-bold text-lg text-[#072B74] mb-1">
              {option.title}
            </h3>
            <p className="text-xs text-[#6B7280] font-body">
              {option.desc}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
};