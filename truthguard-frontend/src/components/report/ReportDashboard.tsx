import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink, RefreshCw, AlertTriangle, CheckCircle2, FileSearch } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AiAssistantCard } from './AiAssistantCard';
import type { BackendVerifyResponse } from '../../services/api';

interface ReportDashboardProps {
  result: BackendVerifyResponse | null;
  onReset: () => void;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({ result, onReset }) => {
  const { t } = useTranslation();

  // Fallback defaults if result is null (or for preview)
  const confidenceScore = result?.confidence ?? 87;
  const verdictText = result?.verdict || t('report.highly_credible');
  const explanationText = result?.explanation || "Aucune explication disponible.";
  const ocrText = result?.ocr_text;

  // Determine badge style based on confidence or verdict
  const isHigh = confidenceScore >= 70;
  const isMedium = confidenceScore >= 40 && confidenceScore < 70;

  const badgeVariant = isHigh ? 'success' : isMedium ? 'warning' : 'danger';

  // Normalize sources list
  const sourcesList = Array.isArray(result?.sources) ? result.sources : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto flex flex-col gap-6"
    >
      
      {/* Top Banner Card: Score Gauge */}
      <Card className={`flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 ${
        isHigh ? 'border-l-[#16A34A]' : isMedium ? 'border-l-[#F59E0B]' : 'border-l-[#DC2626]'
      }`}>
        <div className="flex items-center gap-6">
          
          {/* Large Confidence Circle */}
          <div className={`relative w-24 h-24 flex items-center justify-center rounded-2xl font-heading font-extrabold text-3xl shadow-inner ${
            isHigh ? 'bg-emerald-50 text-[#16A34A]' : isMedium ? 'bg-amber-50 text-[#F59E0B]' : 'bg-rose-50 text-[#DC2626]'
          }`}>
            {confidenceScore}%
          </div>

          <div>
            <Badge variant={badgeVariant} className="mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              {verdictText}
            </Badge>
            <h2 className="font-heading font-bold text-2xl text-[#072B74]">
              {verdictText}
            </h2>
            <p className="text-xs text-[#6B7280] font-body mt-1">
              Score de confiance calculé par le moteur TruthGuard
            </p>
          </div>

        </div>

        <Button variant="outline" size="sm" onClick={onReset} icon={<RefreshCw className="w-4 h-4" />}>
          {t('report.btn_new_verify')}
        </Button>
      </Card>

      {/* OCR Text Extracted (If Image Mode) */}
      {ocrText && (
        <Card className="bg-blue-50/40 border-blue-200/60">
          <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#072B74] mb-2">
            <FileSearch className="w-4 h-4 text-[#1976D2]" />
            <span>Texte Extrait de l'Image (OCR)</span>
          </div>
          <p className="text-xs text-gray-700 font-mono bg-white p-3 rounded-xl border border-gray-200 leading-relaxed">
            {ocrText}
          </p>
        </Card>
      )}

      {/* Explanation Summary */}
      <Card>
        <h3 className="font-heading font-bold text-lg text-[#072B74] mb-3">
          {t('report.summary_title')}
        </h3>
        <p className="text-sm text-[#111827] leading-relaxed font-body whitespace-pre-line">
          {explanationText}
        </p>
      </Card>

      {/* Consulted Clickable Sources */}
      {sourcesList.length > 0 && (
        <Card>
          <h3 className="font-heading font-bold text-lg text-[#072B74] mb-4">
            {t('report.sources_title')}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sourcesList.map((src, index) => {
              const srcName = typeof src === 'string' ? src : src.name || src.title || 'Source Officielle';
              const srcUrl = typeof src === 'object' && src.url ? src.url : '#';

              return (
                <a
                  key={index}
                  href={srcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-gray-200/80 hover:border-[#1976D2] hover:shadow-md transition-all flex items-center justify-between group bg-gray-50/50"
                >
                  <span className="font-heading font-bold text-[#072B74] text-sm group-hover:text-[#1976D2]">
                    {srcName}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#1976D2] group-hover:translate-x-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </Card>
      )}

      {/* Recommendation Banner */}
      <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold ${
        isHigh
          ? 'bg-emerald-50 border-emerald-200 text-[#16A34A]'
          : 'bg-amber-50 border-amber-200 text-[#F59E0B]'
      }`}>
        {isHigh ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        <span>{isHigh ? t('report.safe_to_share') : t('report.warning_share')}</span>
      </div>

      {/* AI Assistant Chatbot Card */}
      <AiAssistantCard />

    </motion.div>
  );
};