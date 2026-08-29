import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, LanguageOption, t as translateKey, translateDynamicText } from '../utils/translations';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  translateText: (text: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('agrisense_language');
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Could not read language from storage:', e);
    }
    return 'en';
  });

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('agrisense_language', lang);
    } catch (e) {
      console.warn('Could not persist language:', e);
    }
  };

  const t = (key: string, fallback?: string) => {
    return translateKey(key, currentLanguage, fallback);
  };

  const translateText = (text: string) => {
    return translateDynamicText(text, currentLanguage);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, translateText, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
