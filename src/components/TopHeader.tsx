import React from 'react';
import { 
  Globe2, 
  CloudSun, 
  MessageSquare, 
  Sparkles, 
  Sprout, 
  Menu, 
  Activity,
  Droplets,
  ChevronDown
} from 'lucide-react';
import { FarmItem, FarmerUser, WeatherData } from '../types';
import { SUPPORTED_LANGUAGES, t, translateDynamicText } from '../utils/translations';
import { NavSection } from './Sidebar';

interface TopHeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  activeFarm: FarmItem;
  farms: FarmItem[];
  onSelectFarm: (farm: FarmItem) => void;
  weatherData: WeatherData | null;
  user: FarmerUser;
  onOpenChat: () => void;
  onToggleMobileMenu?: () => void;
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeFarm,
  farms,
  onSelectFarm,
  weatherData,
  user,
  onOpenChat,
  onToggleMobileMenu,
  activeSection,
  onSelectSection
}) => {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#D8E6D3] px-4 sm:px-6 py-3 shadow-2xs">
      <div className="flex items-center justify-between gap-3">
        
        {/* Left Section: Mobile Menu + Active Farm Telemetry */}
        <div className="flex items-center space-x-3 overflow-hidden">
          
          {/* Mobile menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl bg-[#EFF6EC] text-[#1B4332] hover:bg-[#DDECD7] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Current Farm Breadcrumb / Pill */}
          <div className="flex items-center space-x-2 bg-[#F6FAF4] border border-[#CBDCC7] rounded-2xl px-3 py-1.5 shadow-2xs">
            <Sprout className="w-4 h-4 text-[#2D6A4F] shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="text-xs font-bold text-[#143021] truncate">
                {activeFarm.name}
              </span>
              <span className="text-[10px] text-[#2D6A4F] font-semibold bg-white px-2 py-0.5 rounded-full border border-[#D5E2D1] shrink-0">
                {translateDynamicText(activeFarm.cropName.split(' ')[0], currentLanguage)} &bull; {activeFarm.areaAcres} Ac
              </span>
            </div>
          </div>

          {/* Quick Soil Health Chip */}
          <div className="hidden lg:flex items-center space-x-1 text-xs text-[#52796F] bg-white border border-[#E0E8DC] px-2.5 py-1.5 rounded-xl">
            <Activity className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Soil pH: <strong className="text-[#143021]">{activeFarm.soilData.ph}</strong></span>
            <span className="mx-1">&bull;</span>
            <span>Moisture: <strong className="text-[#143021]">{activeFarm.soilData.moisture}%</strong></span>
          </div>
        </div>

        {/* Right Section: Weather Glance + Language Switcher + Crop Doctor CTA + User */}
        <div className="flex items-center space-x-2.5">
          
          {/* Weather Quick Glance */}
          <button
            onClick={() => onSelectSection('weather')}
            title="View full real-time microclimate forecast"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#F6FAF4] hover:bg-[#EFF6EC] border border-[#CBDCC7] rounded-2xl text-xs text-[#143021] transition-all cursor-pointer shadow-2xs"
          >
            <CloudSun className="w-4 h-4 text-[#2D6A4F]" />
            <span className="font-semibold">{weatherData?.currentTemp ?? 31}°C</span>
            <span className="text-[11px] text-[#52796F]">
              ({translateDynamicText(weatherData?.currentCondition || 'Partly Sunny', currentLanguage)})
            </span>
          </button>

          {/* Global Language Translator Dropdown */}
          <div className="flex items-center bg-[#EFF6EC] border border-[#CBDCC7] rounded-2xl px-2.5 py-1.5 shadow-2xs">
            <Globe2 className="w-3.5 h-3.5 mr-1.5 text-[#2D6A4F] shrink-0" />
            <select
              aria-label="Application Language"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-[#143021] focus:ring-0 focus:outline-none cursor-pointer pr-1"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* Ask Crop Doctor AI Button */}
          <button
            onClick={onOpenChat}
            className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] hover:from-[#1B4332] hover:to-[#0F2417] text-white font-bold text-xs rounded-2xl shadow-md shadow-[#2D6A4F]/20 transition-all hover:scale-[1.02] flex items-center space-x-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#74C69D]" />
            <span className="hidden sm:inline">{t('ask_doctor_btn', currentLanguage, 'Ask Crop Doctor')}</span>
          </button>

          {/* Profile Shortcut */}
          <button
            onClick={() => onSelectSection('profile')}
            title="Farmer Profile"
            className="w-8 h-8 rounded-full border border-[#C5D9C0] overflow-hidden hover:ring-2 hover:ring-[#2D6A4F] transition-all shrink-0"
          >
            {user.avatarUrl ? (
              <img referrerPolicy="no-referrer" src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#EFF6EC] text-[#2D6A4F] font-bold text-xs flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
