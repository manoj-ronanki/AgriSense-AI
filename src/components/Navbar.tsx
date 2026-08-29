import React from 'react';
import { Sprout, Activity, CloudSun, Sparkles, Languages, HelpCircle, BarChart3 } from 'lucide-react';
import { SUPPORTED_LANGUAGES, t } from '../utils/translations';

interface NavbarProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onOpenHelp: () => void;
  onOpenChat?: () => void;
  activeTab: 'diagnose' | 'soil' | 'weather' | 'analytics' | 'history';
  onTabChange: (tab: 'diagnose' | 'soil' | 'weather' | 'analytics' | 'history') => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenHelp,
  onOpenChat,
  activeTab,
  onTabChange,
  historyCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#163828] text-white border-b border-[#24523B] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('diagnose')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#40916C] to-[#52B788] flex items-center justify-center shadow-inner border border-[#74C69D]/30">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                  {t('app_title', currentLanguage, 'AgriSense AI')}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#2D6A4F] text-[#D8F3DC] border border-[#52B788]/30">
                  {t('version_tag', currentLanguage, 'v3.7 Multi-Modal')}
                </span>
              </div>
              <p className="text-xs text-[#B7E4C7] hidden md:block">
                {t('app_subtitle', currentLanguage, 'Unified Crop Doctor • Photo Vision • Soil IoT • Weather Fusion')}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#102B1E] p-1.5 rounded-xl border border-[#24523B]">
            <button
              id="nav-diagnose-btn"
              onClick={() => onTabChange('diagnose')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'diagnose'
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-[#D8F3DC] hover:text-white hover:bg-[#1B4332]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#74C69D]" />
              <span>{t('nav_diagnose', currentLanguage, 'Diagnostic Center')}</span>
            </button>

            <button
              id="nav-soil-btn"
              onClick={() => onTabChange('soil')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'soil'
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-[#D8F3DC] hover:text-white hover:bg-[#1B4332]'
              }`}
            >
              <Activity className="w-4 h-4 text-[#95D5B2]" />
              <span>{t('nav_soil', currentLanguage, 'Soil & Sensors')}</span>
            </button>

            <button
              id="nav-weather-btn"
              onClick={() => onTabChange('weather')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'weather'
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-[#D8F3DC] hover:text-white hover:bg-[#1B4332]'
              }`}
            >
              <CloudSun className="w-4 h-4 text-[#D8F3DC]" />
              <span>{t('nav_weather', currentLanguage, 'Weather & Spraying')}</span>
            </button>

            <button
              id="nav-analytics-btn"
              onClick={() => onTabChange('analytics')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-[#D8F3DC] hover:text-white hover:bg-[#1B4332]'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#A7F3D0]" />
              <span>{t('nav_analytics', currentLanguage, 'Data Analytics')}</span>
            </button>

            <button
              id="nav-history-btn"
              onClick={() => onTabChange('history')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-[#D8F3DC] hover:text-white hover:bg-[#1B4332]'
              }`}
            >
              <span>{t('nav_history', currentLanguage, 'Field Log')}</span>
              {historyCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-xs rounded-full bg-[#52B788] text-[#081C15] font-bold">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Controls: Language & Help */}
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <label htmlFor="language-select" className="sr-only">Language</label>
              <div className="flex items-center bg-[#102B1E] border border-[#24523B] rounded-lg px-2.5 py-1.5 text-xs text-[#D8F3DC] focus-within:ring-2 focus-within:ring-[#52B788]">
                <Languages className="w-4 h-4 mr-1.5 text-[#74C69D] shrink-0" />
                <select
                  id="language-select"
                  value={currentLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-[#1B4332] text-white py-1">
                      {l.flag} {l.nativeName} ({l.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {onOpenChat && (
              <button
                id="navbar-chat-btn"
                onClick={onOpenChat}
                title="Ask Crop Doctor AI (Gemini 3.5 Flash)"
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#2D6A4F] hover:bg-[#40916C] text-white text-xs font-bold border border-[#52B788]/40 shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#74C69D]" />
                <span>{t('nav_ask_ai', currentLanguage, 'AI Chat')}</span>
              </button>
            )}

            <button
              id="help-guide-btn"
              onClick={onOpenHelp}
              title={t('nav_help', currentLanguage, 'Help & Knowledge')}
              className="p-2 rounded-lg bg-[#102B1E] hover:bg-[#1F4E37] text-[#D8F3DC] border border-[#24523B] transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-1.5 custom-scrollbar border-t border-[#24523B]">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-[#2D6A4F] text-white flex items-center space-x-1 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#74C69D]" />
              <span>{t('nav_ask_ai', currentLanguage, 'AI Chat')}</span>
            </button>
          )}
          <button
            onClick={() => onTabChange('diagnose')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'diagnose' ? 'bg-[#2D6A4F] text-white' : 'text-[#D8F3DC] bg-[#102B1E]'
            }`}
          >
            {t('nav_diagnose', currentLanguage, 'Diagnostic')}
          </button>
          <button
            onClick={() => onTabChange('soil')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'soil' ? 'bg-[#2D6A4F] text-white' : 'text-[#D8F3DC] bg-[#102B1E]'
            }`}
          >
            {t('nav_soil', currentLanguage, 'Soil & Sensors')}
          </button>
          <button
            onClick={() => onTabChange('weather')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'weather' ? 'bg-[#2D6A4F] text-white' : 'text-[#D8F3DC] bg-[#102B1E]'
            }`}
          >
            {t('nav_weather', currentLanguage, 'Weather')}
          </button>
          <button
            onClick={() => onTabChange('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'analytics' ? 'bg-[#2D6A4F] text-white' : 'text-[#D8F3DC] bg-[#102B1E]'
            }`}
          >
            {t('nav_analytics', currentLanguage, 'Analytics')}
          </button>
          <button
            onClick={() => onTabChange('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'history' ? 'bg-[#2D6A4F] text-white' : 'text-[#D8F3DC] bg-[#102B1E]'
            }`}
          >
            {t('nav_history', currentLanguage, 'Field Log')} ({historyCount})
          </button>
        </div>
      </div>
    </header>
  );
};
