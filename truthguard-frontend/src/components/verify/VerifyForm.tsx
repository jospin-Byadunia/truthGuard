import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UploadCloud, Link as LinkIcon, FileText, CheckCircle2 } from 'lucide-react';
import type { InputMode } from './InputSelector';
import { Button } from '../ui/Button';

interface VerifyFormProps {
  activeMode: InputMode;
  onAnalyze: (payload: { type: InputMode; value: string | File }) => void;
}

export const VerifyForm: React.FC<VerifyFormProps> = ({
  activeMode,
  onAnalyze,
}) => {
  const { t } = useTranslation();
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMode === 'text' && textContent.trim()) {
      onAnalyze({ type: 'text', value: textContent });
    } else if (activeMode === 'url' && urlContent.trim()) {
      onAnalyze({ type: 'url', value: urlContent });
    } else if (activeMode === 'image' && selectedFile) {
      onAnalyze({ type: 'image', value: selectedFile });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[18px] border border-gray-200 p-6 md:p-8 shadow-sm">
      <AnimatePresence mode="wait">
        
        {/* TEXT INPUT MODE */}
        {activeMode === 'text' && (
          <motion.div
            key="mode-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <label className="text-sm font-semibold text-[#072B74] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1976D2]" />
              {t('verify.tab_text')}
            </label>
            <textarea
              rows={6}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder={t('verify.placeholder_text')}
              className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 text-[#111827] placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#072B74] focus:ring-2 focus:ring-[#072B74]/10 transition-all font-body text-sm resize-none"
              required
            />
          </motion.div>
        )}

        {/* URL INPUT MODE */}
        {activeMode === 'url' && (
          <motion.div
            key="mode-url"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <label className="text-sm font-semibold text-[#072B74] flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-[#1976D2]" />
              {t('verify.tab_url')}
            </label>
            <div className="relative">
              <input
                type="url"
                value={urlContent}
                onChange={(e) => setUrlContent(e.target.value)}
                placeholder={t('verify.placeholder_url')}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-[#111827] placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#072B74] focus:ring-2 focus:ring-[#072B74]/10 transition-all font-body text-sm"
                required
              />
              <LinkIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
        )}

        {/* IMAGE INPUT MODE */}
        {activeMode === 'image' && (
          <motion.div
            key="mode-image"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <label className="text-sm font-semibold text-[#072B74] flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-[#1976D2]" />
              {t('verify.tab_image')}
            </label>
            
            <div className="relative border-2 border-dashed border-gray-300 hover:border-[#1976D2] rounded-xl p-8 text-center bg-gray-50/50 hover:bg-blue-50/20 transition-all cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                required={!selectedFile}
              />
              
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                  <span className="font-semibold text-sm">{selectedFile.name}</span>
                  <span className="text-xs text-gray-400">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-blue-50 text-[#1976D2] group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">
                      {t('verify.drop_image')}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {t('verify.drop_image_hint')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* SUBMIT BUTTON */}
      <div className="mt-8 flex justify-end">
        <Button variant="primary" size="lg" icon={<Search className="w-5 h-5" type="submit" />}>
          {t('verify.btn_analyze')}
        </Button>
      </div>

    </form>
  );
};