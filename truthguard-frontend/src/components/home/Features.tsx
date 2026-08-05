import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Newspaper, Image as ImageIcon, SearchCheck } from 'lucide-react';
import { Card } from '../ui/Card';

export const Features: React.FC = () => {
  const { t } = useTranslation();

  const featureCards = [
    {
      icon: <Brain className="w-8 h-8 text-[#1976D2]" />,
      titleKey: 'features.card1_title',
      descKey: 'features.card1_desc',
    },
    {
      icon: <Newspaper className="w-8 h-8 text-[#1976D2]" />,
      titleKey: 'features.card2_title',
      descKey: 'features.card2_desc',
    },
    {
      icon: <ImageIcon className="w-8 h-8 text-[#1976D2]" />,
      titleKey: 'features.card3_title',
      descKey: 'features.card3_desc',
    },
    {
      icon: <SearchCheck className="w-8 h-8 text-[#1976D2]" />,
      titleKey: 'features.card4_title',
      descKey: 'features.card4_desc',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white border-t border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1976D2] mb-2 block">
            {t('features.tag')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#072B74]">
            {t('features.title')}
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureCards.map((card, index) => (
            <Card key={index} className="flex flex-col items-start h-full">
              <div className="p-3.5 rounded-2xl bg-blue-50/80 mb-6">
                {card.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-[#072B74] mb-3">
                {t(card.titleKey)}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed font-body">
                {t(card.descKey)}
              </p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};