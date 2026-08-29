import React from 'react';
import { 
  BarChart3, 
  Sprout, 
  ScanLine, 
  Activity, 
  CloudSun, 
  History, 
  User, 
  LogOut, 
  MessageSquare, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { FarmItem, FarmerUser } from '../types';
import { t } from '../utils/translations';

export type NavSection = 'dashboard' | 'farms' | 'diagnose' | 'soil' | 'weather' | 'history' | 'profile';

interface SidebarProps {
  currentLanguage: string;
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  user: FarmerUser;
  onLogout: () => void;
  farms: FarmItem[];
  activeFarm: FarmItem;
  onSelectFarm: (farm: FarmItem) => void;
  onOpenChat: () => void;
  historyCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLanguage,
  activeSection,
  onSelectSection,
  user,
  onLogout,
  farms,
  activeFarm,
  onSelectFarm,
  onOpenChat,
  historyCount
}) => {
  const navItems: { id: NavSection; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number }[] = [
    { 
      id: 'dashboard', 
      label: t('nav_dashboard', currentLanguage, 'Dashboard'), 
      icon: BarChart3,
      badge: 'CQI'
    },
    { 
      id: 'farms', 
      label: t('nav_my_farm', currentLanguage, 'My Farm'), 
      icon: Sprout,
      badge: farms.length
    },
    { 
      id: 'diagnose', 
      label: t('nav_diagnose', currentLanguage, 'Diagnostic Center'), 
      icon: ScanLine,
      badge: 'AI ML'
    },
    { 
      id: 'soil', 
      label: t('nav_soil', currentLanguage, 'Soil & Sensors'), 
      icon: Activity,
      badge: 'IoT'
    },
    { 
      id: 'weather', 
      label: t('nav_weather', currentLanguage, 'Weather Analytics'), 
      icon: CloudSun,
      badge: 'Radar'
    },
    { 
      id: 'history', 
      label: t('nav_history', currentLanguage, 'History & Diary'), 
      icon: History,
      badge: historyCount > 0 ? historyCount : undefined
    },
    { 
      id: 'profile', 
      label: t('nav_profile', currentLanguage, 'Profile'), 
      icon: User
    }
  ];

  return (
    <aside className="w-68 bg-gradient-to-b from-white via-[#F7FAF5] to-[#EEF5EB] border-r border-[#D5E2D1] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none shadow-xs">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E1EDE0] space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1B4332] via-[#2D6A4F] to-[#52B788] text-white flex items-center justify-center shadow-md shadow-[#2D6A4F]/20 shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-extrabold text-lg text-[#143021] tracking-tight">AgriSense</span>
              <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#2D6A4F] text-white">AI</span>
            </div>
            <p className="text-[10px] text-[#52796F] font-medium truncate">Smart Precision Agriculture</p>
          </div>
        </div>

        {/* Active Farm Switcher Widget */}
        <div className="bg-white rounded-2xl p-2.5 border border-[#CBDCC7] shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#52796F]">
            <span className="flex items-center gap-1 text-[#2D6A4F]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Active Field:</span>
            </span>
            <span className="px-1.5 py-0.2 bg-[#EFF6EC] text-[#2D6A4F] rounded-md font-semibold">
              {activeFarm.areaAcres} Acres
            </span>
          </div>

          <div className="relative">
            <select
              aria-label="Active field selector"
              value={activeFarm.id}
              onChange={(e) => {
                const found = farms.find((f) => f.id === e.target.value);
                if (found) onSelectFarm(found);
              }}
              className="w-full text-xs font-bold text-[#143021] bg-[#F8FAF6] hover:bg-[#F0F5ED] border border-[#E0E9DD] rounded-xl py-1.5 px-2 focus:ring-1 focus:ring-[#2D6A4F] focus:outline-none cursor-pointer truncate"
            >
              {farms.map((farm) => (
                <option key={farm.id} value={farm.id}>
                  🌱 {farm.name} ({farm.cropName.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Navigation List (7 Sections) */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-md shadow-[#2D6A4F]/25 scale-[1.01]'
                  : 'text-[#3E5C46] hover:bg-white hover:text-[#143021]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#74C69D]' : 'text-[#52796F]'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#EFF6EC] text-[#2D6A4F]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Ask Crop Doctor AI Spotlight in Sidebar */}
        <div className="pt-3">
          <button
            onClick={onOpenChat}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#EFF6EC] to-[#E2F0E0] border border-[#CBDCC7] hover:border-[#2D6A4F] text-left transition-all group shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#143021] flex items-center gap-1">
                    <span>Ask Crop Doctor</span>
                    <Sparkles className="w-3 h-3 text-[#2D6A4F]" />
                  </div>
                  <div className="text-[10px] text-[#52796F]">Voice & Agronomist AI</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#52796F] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </nav>

      {/* Farmer Profile Footer & Logout */}
      <div className="p-4 border-t border-[#E1EDE0] bg-white/70 space-y-3">
        <div 
          onClick={() => onSelectSection('profile')}
          className="flex items-center justify-between p-2 rounded-2xl hover:bg-[#F4F8F2] cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-2.5 overflow-hidden">
            {user.avatarUrl ? (
              <img
                referrerPolicy="no-referrer"
                src={user.avatarUrl}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border border-[#C5D9C0] shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#EFF6EC] text-[#2D6A4F] font-bold flex items-center justify-center text-xs shrink-0">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-[#143021] truncate">{user.name}</div>
              <div className="text-[10px] text-[#52796F] truncate">{user.phone || user.email || 'Farm Owner'}</div>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full py-2 px-3 bg-[#F8FAF6] hover:bg-rose-50 hover:text-rose-700 text-[#52796F] font-bold text-xs rounded-xl border border-[#E0E8DC] hover:border-rose-200 transition-colors flex items-center justify-center space-x-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
};
