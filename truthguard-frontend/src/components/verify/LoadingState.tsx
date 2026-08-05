import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  onComplete: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    t('loading.step1'),
    t('loading.step2'),
    t('loading.step3'),
    t('loading.step4'),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onComplete, 600); // Complete after last step
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-[18px] border border-gray-200 p-8 md:p-12 shadow-md max-w-xl mx-auto text-center">
      
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#072B74] flex items-center justify-center mx-auto mb-6 relative">
        <Shield className="w-8 h-8 text-[#1976D2]" />
        <Loader2 className="w-12 h-12 text-[#072B74] absolute animate-spin opacity-40" />
      </div>

      <h3 className="font-heading font-bold text-xl text-[#072B74] mb-8">
        TruthGuard AI Engine
      </h3>

      <div className="flex flex-col gap-4 text-left max-w-md mx-auto mb-8">
        {steps.map((stepText, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-[#1976D2] animate-spin" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                )}
              </div>
              <span
                className={`text-sm font-body transition-colors ${
                  isDone
                    ? 'text-gray-900 font-medium'
                    : isCurrent
                    ? 'text-[#072B74] font-semibold'
                    : 'text-gray-400'
                }`}
              >
                {stepText}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-[#1976D2] to-[#072B74] h-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

    </div>
  );
};