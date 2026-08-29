import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  LogOut, 
  Sprout, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Layers, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FarmerUser, FarmItem } from '../types';
import { SUPPORTED_LANGUAGES, t, translateDynamicText } from '../utils/translations';
import { NavSection } from './Sidebar';

interface ProfileViewProps {
  user: FarmerUser;
  farms: FarmItem[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onLogout: () => void;
  onNavigate: (section: NavSection) => void;
  totalScansCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  farms,
  currentLanguage,
  onLanguageChange,
  onLogout,
  onNavigate,
  totalScansCount
}) => {
  const totalAcreage = farms.reduce((sum, f) => sum + f.areaAcres, 0);
  const avgCQI = Math.round(farms.reduce((sum, f) => sum + f.cqiScore, 0) / (farms.length || 1));

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#143021] rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user.avatarUrl ? (
                <img
                  referrerPolicy="no-referrer"
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-18 h-18 rounded-3xl object-cover border-2 border-[#74C69D] shadow-md"
                />
              ) : (
                <div className="w-18 h-18 rounded-3xl bg-[#EFF6EC] text-[#2D6A4F] font-bold text-2xl flex items-center justify-center border-2 border-[#74C69D]">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-white text-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="font-heading font-extrabold text-2xl text-white tracking-tight">{user.name}</h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#52B788] text-white">
                  Verified Grower
                </span>
              </div>
              <p className="text-xs text-[#D8F3DC] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#74C69D]" />
                <span>{user.location}</span>
              </p>
              <p className="text-[11px] text-[#A7D7B5]">
                Member Since {user.joinedDate} &bull; Auth: {user.authMethod.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-white/15 hover:bg-rose-600/80 hover:border-rose-400 text-white font-bold text-xs rounded-2xl border border-white/20 transition-all flex items-center space-x-1.5 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Aggregate Stats Cards inside Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl">
            <div className="text-[11px] text-[#D8F3DC]">Registered Farms</div>
            <div className="text-xl font-bold text-white">{farms.length} Plots</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl">
            <div className="text-[11px] text-[#D8F3DC]">Total Acreage</div>
            <div className="text-xl font-bold text-white">{totalAcreage.toFixed(1)} Acres</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl">
            <div className="text-[11px] text-[#D8F3DC]">Average CQI</div>
            <div className="text-xl font-bold text-[#74C69D]">{avgCQI}/100</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl">
            <div className="text-[11px] text-[#D8F3DC]">Total Vision Scans</div>
            <div className="text-xl font-bold text-white">{totalScansCount} Scans</div>
          </div>
        </div>
      </div>

      {/* Profile Details & Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Information */}
        <div className="bg-white rounded-3xl p-6 border border-[#D5E2D1] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-[#143021] pb-3 border-b border-[#EEF2EB]">
            Contact & Account Details
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F9FBF8] border border-[#E3EBE0]">
              <div className="flex items-center space-x-2.5 text-[#52796F]">
                <Mail className="w-4 h-4 text-[#2D6A4F]" />
                <span className="font-medium">Email Address</span>
              </div>
              <span className="font-bold text-[#143021]">{user.email || 'Not connected'}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F9FBF8] border border-[#E3EBE0]">
              <div className="flex items-center space-x-2.5 text-[#52796F]">
                <Phone className="w-4 h-4 text-[#2D6A4F]" />
                <span className="font-medium">Mobile Phone</span>
              </div>
              <span className="font-bold text-[#143021]">{user.phone || '+91 98480 22334'}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F9FBF8] border border-[#E3EBE0]">
              <div className="flex items-center space-x-2.5 text-[#52796F]">
                <Globe2 className="w-4 h-4 text-[#2D6A4F]" />
                <span className="font-medium">Primary Language</span>
              </div>
              <select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-white border border-[#CBDCC7] rounded-xl px-2 py-1 text-xs font-bold text-[#143021] cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Security & Grounding Credentials */}
        <div className="bg-white rounded-3xl p-6 border border-[#D5E2D1] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-[#143021] pb-3 border-b border-[#EEF2EB]">
            Diagnostic AI Standard Grounding
          </h3>

          <div className="space-y-2.5 text-xs text-[#52796F]">
            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-[#EFF6EC]">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#143021]">CIBRC Chemical Compliance:</strong> All chemical active ingredients, spray dilutions, and pre-harvest intervals (PHI) follow Central Insecticides Board regulations.
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-[#EFF6EC]">
              <Sparkles className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#143021]">ICAR Benchmark Integration:</strong> Multi-factor correlation combines N-P-K soil thresholds with regional weather epidemiology.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Farmer Registered Lands & Plots Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-[#D5E2D1] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EEF2EB]">
          <div>
            <h3 className="font-heading font-bold text-base text-[#143021]">Registered Farms & Land Holdings</h3>
            <p className="text-xs text-[#52796F]">Overview of all geographical plots, active crops, and acreage</p>
          </div>

          <button
            onClick={() => onNavigate('farms')}
            className="text-xs font-bold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1"
          >
            <span>Manage in My Farm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {farms.map((farm) => (
            <div key={farm.id} className="p-4 rounded-2xl bg-[#F8FAF6] border border-[#DCE4D8] space-y-2">
              <div className="flex items-start justify-between">
                <div className="font-bold text-xs text-[#143021] truncate">{farm.name}</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF5EB] text-[#2D6A4F]">
                  {farm.areaAcres} Ac
                </span>
              </div>
              <div className="text-[11px] text-[#2D6A4F] font-semibold">
                {translateDynamicText(farm.cropName, currentLanguage)}
              </div>
              <div className="text-[10px] text-[#52796F] truncate flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span>{farm.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
