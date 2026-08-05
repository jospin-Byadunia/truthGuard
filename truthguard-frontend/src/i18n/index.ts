import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frCommon from '../locales/fr/common.json';
import enCommon from '../locales/en/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frCommon },
      en: { translation: enCommon },
    },
    fallbackLng: 'fr',
    lng: 'fr', // French is default
    interpolation: {
      escapeValue: false, // React handles XSS escaping automatically
    },
  });

export default i18n;