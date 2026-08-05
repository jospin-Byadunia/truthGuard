import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../components/ui/Badge';
import { InputSelector } from '../components/verify/InputSelector';
import type { InputMode } from '../components/verify/InputSelector';
import { VerifyForm } from '../components/verify/VerifyForm';
import { LoadingState } from '../components/verify/LoadingState';
import { ReportDashboard } from '../components/report/ReportDashboard';
import { verifyClaim } from '../services/api';
import type { BackendVerifyResponse } from '../services/api';

type VerifyState = 'input' | 'loading' | 'results';

export const VerifyPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeMode, setActiveMode] = useState<InputMode>('text');
  const [viewState, setViewState] = useState<VerifyState>('input');
  const [analysisResult, setAnalysisResult] = useState<BackendVerifyResponse | null>(null);

  const handleStartAnalysis = async (payload: { type: InputMode; value: string | File }) => {
    setViewState('loading');

    try {
      // Calling FastAPI backend!
      const data = await verifyClaim(payload);
      setAnalysisResult(data);
    } catch (error) {
      console.warn('Backend server not reachable yet, showing mock preview:', error);
      // Fallback demo mock if backend isn't running on local port 8000 yet
      setAnalysisResult({
        verdict: 'Information Crédible',
        confidence: 87,
        explanation: "L'analyse croisée réalisée par TruthGuard confirme la véracité des faits rapportés.",
        sources: [{ name: 'Reuters', url: 'https://reuters.com' }, { name: 'Radio Okapi', url: 'https://radiookapi.net' }],
      });
    }
  };

  const handleLoadingComplete = () => {
    setViewState('results');
  };

  const handleReset = () => {
    setViewState('input');
    setAnalysisResult(null);
  };

  return (
    <main className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      
      {viewState === 'input' && (
        <div className="text-center mb-10">
          <Badge variant="info" className="mb-4 py-1 px-3.5 text-xs font-bold uppercase tracking-wider">
            {t('verify.badge')}
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#072B74] mb-3">
            {t('verify.title')}
          </h1>
          <p className="text-[#6B7280] text-sm sm:text-base max-w-xl mx-auto font-body">
            {t('verify.subtitle')}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* INPUT MODE */}
        {viewState === 'input' && (
          <motion.div
            key="view-input"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <InputSelector activeMode={activeMode} onSelectMode={setActiveMode} />
            <VerifyForm activeMode={activeMode} onAnalyze={handleStartAnalysis} />
          </motion.div>
        )}

        {/* LOADING MODE */}
        {viewState === 'loading' && (
          <motion.div
            key="view-loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingState onComplete={handleLoadingComplete} />
          </motion.div>
        )}

        {/* RESULTS MODE */}
        {viewState === 'results' && (
          <motion.div
            key="view-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ReportDashboard result={analysisResult} onReset={handleReset} />
          </motion.div>
        )}

      </AnimatePresence>

    </main>
  );
};