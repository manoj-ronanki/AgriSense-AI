import React, { useState } from 'react';
import { 
  Sprout, 
  Sparkles, 
  ShieldCheck, 
  CloudSun, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Globe2, 
  BarChart3, 
  MessageSquare, 
  Layers, 
  ChevronRight,
  Zap,
  Leaf,
  ScanLine,
  Check,
  AlertCircle
} from 'lucide-react';
import { FarmerUser } from '../types';
import { SUPPORTED_LANGUAGES, t } from '../utils/translations';

interface LandingPageProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onAuthenticate: (user: FarmerUser) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLanguage,
  onLanguageChange,
  onAuthenticate
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'google' | 'phone' | 'email'>('google');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Form states
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('+91 98480 22334');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '8', '2', '4', '1', '9']);
  const [otpInput, setOtpInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Demo direct login
  const handleDemoLogin = (farmerType: 'palasa' | 'guntur' | 'punjab') => {
    const demoUsers: Record<string, FarmerUser> = {
      palasa: {
        id: 'usr_palasa_farmer',
        name: 'Manoj Kumar (రైతు సోదరుడు)',
        email: 'manoj.farmer@agrisense.io',
        phone: '+91 98481 45290',
        authMethod: 'google',
        avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        location: 'Palasa - Kasibugga, Srikakulam District, AP',
        joinedDate: 'August 2025',
        preferredLanguage: currentLanguage
      },
      guntur: {
        id: 'usr_guntur_farmer',
        name: 'Ramesh Reddy',
        email: 'ramesh.reddy@agrisense.io',
        phone: '+91 94401 88921',
        authMethod: 'phone',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        location: 'Guntur Rural, Andhra Pradesh',
        joinedDate: 'September 2025',
        preferredLanguage: currentLanguage
      },
      punjab: {
        id: 'usr_punjab_farmer',
        name: 'Gurpreet Singh',
        email: 'gurpreet.farm@agrisense.io',
        phone: '+91 98140 33412',
        authMethod: 'email',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        location: 'Ludhiana, Punjab',
        joinedDate: 'July 2025',
        preferredLanguage: currentLanguage
      }
    };

    onAuthenticate(demoUsers[farmerType]);
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    setIsProcessing(true);
    setAuthError('');
    setTimeout(() => {
      onAuthenticate({
        id: `usr_google_${Date.now()}`,
        name: 'Manoj Kumar (Google User)',
        email: 'manojronankiop@gmail.com',
        authMethod: 'google',
        avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocL8jXm=s96-c',
        location: 'Palasa - Kasibugga, AP, India',
        joinedDate: new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        preferredLanguage: currentLanguage
      });
      setIsProcessing(false);
    }, 600);
  };

  // Handle Phone OTP Request & Verify
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.length < 10) {
      setAuthError('Please enter a valid 10-digit mobile number');
      return;
    }
    setAuthError('');
    setIsProcessing(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsProcessing(false);
      setOtpInput('582419'); // Pre-fill mock OTP for quick hackathon UX
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.length !== 6) {
      setAuthError('Please enter the 6-digit OTP code');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      onAuthenticate({
        id: `usr_phone_${Date.now()}`,
        name: nameInput.trim() || 'Kisan Mitra (Mobile Farmer)',
        phone: phoneInput,
        authMethod: 'phone',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        location: 'Andhra Pradesh, India',
        joinedDate: new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        preferredLanguage: currentLanguage
      });
      setIsProcessing(false);
    }, 600);
  };

  // Handle Email Auth
  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setAuthError('Please fill in all email and password fields');
      return;
    }
    if (passwordInput.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      onAuthenticate({
        id: `usr_email_${Date.now()}`,
        name: nameInput.trim() || emailInput.split('@')[0],
        email: emailInput,
        authMethod: 'email',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        location: 'Farm Estate Sector, India',
        joinedDate: new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        preferredLanguage: currentLanguage
      });
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F9F2] to-[#E2F0E0] text-[#143021] flex flex-col justify-between selection:bg-[#2D6A4F] selection:text-white">
      
      {/* Top Floating Glass Navigation Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/85 border-b border-[#D8E6D3] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1B4332] via-[#2D6A4F] to-[#52B788] text-white flex items-center justify-center shadow-md shadow-[#2D6A4F]/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-xl tracking-tight text-[#143021]">AgriSense</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-[#2D6A4F] text-white">AI Studio</span>
              </div>
              <p className="text-[11px] text-[#52796F] font-medium hidden sm:block">Smart Precision Agriculture & Crop Diagnostics</p>
            </div>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative flex items-center bg-[#EFF6EC] border border-[#CBDCC7] rounded-xl px-2.5 py-1 text-xs font-semibold text-[#1B4332] shadow-2xs">
              <Globe2 className="w-3.5 h-3.5 mr-1.5 text-[#2D6A4F]" />
              <select
                aria-label="Language selector"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-[#143021] focus:ring-0 focus:outline-none cursor-pointer pr-1"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName} ({lang.label})
                  </option>
                ))}
              </select>
            </div>

            {/* Direct Login CTA */}
            <button
              onClick={() => {
                setShowAuthModal(true);
                setAuthTab('google');
              }}
              className="px-4 py-2 text-xs font-bold text-[#1B4332] bg-white hover:bg-[#EFF5EB] border border-[#C5D9C0] rounded-xl transition-all shadow-xs hidden sm:block"
            >
              Sign In
            </button>

            <button
              onClick={() => {
                setShowAuthModal(true);
                setAuthTab('google');
              }}
              className="px-4 sm:px-5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] hover:from-[#1B4332] hover:to-[#0F2417] rounded-xl shadow-md shadow-[#2D6A4F]/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#EFF6EC] to-[#E2F0E0] border border-[#C5D9C0] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
            <span className="text-xs font-bold text-[#1B4332] tracking-wide">
              {t('app_subtitle', currentLanguage, 'Next-Generation Multi-Factor Agronomic AI Platform')}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#143021] tracking-tight leading-[1.15]">
            Smarter Farms, <span className="bg-gradient-to-r from-[#2D6A4F] via-[#40916C] to-[#52B788] bg-clip-text text-transparent">Healthier Harvests</span> With AI.
          </h1>

          <p className="text-sm sm:text-base text-[#4E6754] leading-relaxed max-w-2xl mx-auto">
            Eliminate agricultural crop misdiagnosis through real-time multi-modal AI fusing 
            <strong className="text-[#143021]"> Leaf Computer Vision</strong>, 
            <strong className="text-[#143021]"> IoT Soil Sensors</strong>, and 
            <strong className="text-[#143021]"> Microclimate Weather Radar</strong> into official ICAR & CIBRC treatment prescriptions.
          </p>

          {/* Quick Action & One-Click Hackathon Demo Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setShowAuthModal(true);
                setAuthTab('google');
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] hover:from-[#1B4332] hover:to-[#0F2417] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#2D6A4F]/30 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <span>Launch Farmer Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleDemoLogin('palasa')}
              className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-[#F4F8F2] border border-[#CBDCC7] text-[#1B4332] font-bold text-sm rounded-2xl transition-all shadow-xs flex items-center justify-center space-x-2 group"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400 group-hover:scale-110 transition-transform" />
              <span>⚡ 1-Click Instant Demo Login</span>
            </button>
          </div>

          {/* Live Platform Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#52796F]">
            <div className="flex items-center space-x-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              <span>16 Indian & Global Languages</span>
            </div>
            <div className="flex items-center space-x-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              <span>CIBRC Certified Dosages</span>
            </div>
            <div className="flex items-center space-x-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              <span>Voice Agronomist Speech AI</span>
            </div>
          </div>
        </div>

        {/* 7 Core Ecosystem Modules Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#143021]">Integrated 7-Pillar Farm Management</h3>
            <p className="text-xs sm:text-sm text-[#52796F]">Everything a modern grower needs from seed sowing to yield harvest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Dashboard */}
            <div 
              onClick={() => handleDemoLogin('palasa')}
              className="p-6 rounded-3xl bg-white/90 border border-[#D5E2D1] hover:border-[#2D6A4F] hover:shadow-lg transition-all duration-200 cursor-pointer group space-y-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-[#143021]">1. Farm Analytics Dashboard</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF5EB] text-[#2D6A4F]">CQI Index</span>
              </div>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Aggregated overview of all farmer plots, real-time Crop Quality Index (CQI), health status alerts, and multi-farm selector.
              </p>
            </div>

            {/* 2. My Farm */}
            <div 
              onClick={() => handleDemoLogin('palasa')}
              className="p-6 rounded-3xl bg-white/90 border border-[#D5E2D1] hover:border-[#2D6A4F] hover:shadow-lg transition-all duration-200 cursor-pointer group space-y-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-[#143021]">2. My Farm & Plot Manager</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF5EB] text-[#2D6A4F]">IoT Auto-Sync</span>
              </div>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Add and manage multiple fields with acreage, crop varieties, and automatically generated IoT soil telemetry for predictive analytics.
              </p>
            </div>

            {/* 3. Diagnostic Center */}
            <div 
              onClick={() => handleDemoLogin('palasa')}
              className="p-6 rounded-3xl bg-white/90 border border-[#D5E2D1] hover:border-[#2D6A4F] hover:shadow-lg transition-all duration-200 cursor-pointer group space-y-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                <ScanLine className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-[#143021]">3. Vision Diagnostic Center</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF5EB] text-[#2D6A4F]">Gemini 3.7 ML</span>
              </div>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Instant crop photo disease detection fused with soil and weather data for CIBRC chemical, biological, and organic prescriptions.
              </p>
            </div>

            {/* 4. Soil & Sensors */}
            <div 
              onClick={() => handleDemoLogin('palasa')}
              className="p-6 rounded-3xl bg-white/90 border border-[#D5E2D1] hover:border-[#2D6A4F] hover:shadow-lg transition-all duration-200 cursor-pointer group space-y-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-[#143021]">4. Soil & IoT Sensors</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF5EB] text-[#2D6A4F]">NPK Telemetry</span>
              </div>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Live monitoring of pH, Nitrogen, Phosphorus, Potassium, Moisture, and smart fertilizer dosage calculation.
              </p>
            </div>

            {/* 5. Weather Analytics */}
            <div 
              onClick={() => handleDemoLogin('palasa')}
              className="p-6 rounded-3xl bg-white/90 border border-[#D5E2D1] hover:border-[#2D6A4F] hover:shadow-lg transition-all duration-200 cursor-pointer group space-y-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                <CloudSun className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-[#143021]">5. Microclimate Weather</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF5EB] text-[#2D6A4F]">Spray Windows</span>
              </div>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Hyperlocal weather forecasting with hourly spraying suitability, delta-T evaporation drift index, and fungal sporulation warnings.
              </p>
            </div>

            {/* 6. History & Diary */}
            <div 
              onClick={() => handleDemoLogin('palasa')}
              className="p-6 rounded-3xl bg-white/90 border border-[#D5E2D1] hover:border-[#2D6A4F] hover:shadow-lg transition-all duration-200 cursor-pointer group space-y-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-[#143021]">6. Field Diary & History</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF5EB] text-[#2D6A4F]">Archive</span>
              </div>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Log and track historical diagnoses, treatment efficacy over time, and export prescriptions for agricultural extension officers.
              </p>
            </div>

          </div>
        </div>

        {/* Ask Crop Doctor Spotlight Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#143021] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs">
              <MessageSquare className="w-3.5 h-3.5 text-[#74C69D]" />
              <span>Interactive Multilingual Agronomist Voice Assistant</span>
            </div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">Ask Crop Doctor AI</h3>
            <p className="text-xs sm:text-sm text-[#D8F3DC] leading-relaxed">
              Ask any question in your native regional language using text or live speech-to-text voice recognition. The AI agronomist is synchronized directly with your farm sensors and past diagnoses.
            </p>
          </div>

          <button
            onClick={() => handleDemoLogin('palasa')}
            className="px-6 py-3.5 bg-white hover:bg-[#EFF6EC] text-[#1B4332] font-extrabold text-sm rounded-2xl shadow-md transition-all hover:scale-105 flex items-center space-x-2 shrink-0"
          >
            <span>Try Agronomist Chat</span>
            <ArrowRight className="w-4 h-4 text-[#2D6A4F]" />
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-[#D5E2D1] py-8 text-center text-xs text-[#52796F]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sprout className="w-4 h-4 text-[#2D6A4F]" />
            <span className="font-bold text-[#143021]">AgriSense AI &bull; Smart Farmer Decision Platform</span>
          </div>
          <p>© {new Date().getFullYear()} AgriSense AI. Grounded in ICAR & CIBRC agricultural standards.</p>
        </div>
      </footer>

      {/* Authentication Modal (Google / Phone OTP / Email) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#D5DDD2] space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E6EBE3]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1B4332] to-[#2D6A4F] text-white flex items-center justify-center shadow-xs">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#143021]">Sign In to AgriSense</h3>
                  <p className="text-xs text-[#52796F]">Access your farms, sensors & diagnostics</p>
                </div>
              </div>

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-8 h-8 rounded-full bg-[#F4F6F1] hover:bg-[#E8EDE4] text-[#52796F] flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Auth Method Tabs (Google / Phone OTP / Email) */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4F7F2] rounded-2xl border border-[#DCE4D8]">
              <button
                type="button"
                onClick={() => { setAuthTab('google'); setAuthError(''); }}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  authTab === 'google'
                    ? 'bg-white text-[#143021] shadow-xs'
                    : 'text-[#52796F] hover:text-[#143021]'
                }`}
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('phone'); setAuthError(''); }}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  authTab === 'phone'
                    ? 'bg-white text-[#143021] shadow-xs'
                    : 'text-[#52796F] hover:text-[#143021]'
                }`}
              >
                Phone OTP
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('email'); setAuthError(''); }}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  authTab === 'email'
                    ? 'bg-white text-[#143021] shadow-xs'
                    : 'text-[#52796F] hover:text-[#143021]'
                }`}
              >
                Email
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{authError}</span>
              </div>
            )}

            {/* TAB 1: GOOGLE ONE-CLICK AUTH */}
            {authTab === 'google' && (
              <div className="space-y-4 text-center py-2">
                <p className="text-xs text-[#52796F]">
                  Connect seamlessly with your Google Account for fast, secure access to farm records.
                </p>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 bg-white hover:bg-[#F8FAF6] border border-[#CBDCC7] hover:border-[#2D6A4F] text-[#143021] font-bold text-xs rounded-2xl transition-all shadow-xs flex items-center justify-center space-x-3 group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{isProcessing ? 'Authorizing...' : 'Continue with Google Account'}</span>
                </button>

                <div className="pt-2">
                  <div className="text-[11px] text-[#6B8772]">Or test directly with pre-loaded farmer data:</div>
                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => handleDemoLogin('palasa')}
                      className="px-3 py-1.5 bg-[#EFF6EC] hover:bg-[#DDECD7] text-[#1B4332] text-[11px] font-bold rounded-lg transition-colors"
                    >
                      Manoj (Palasa)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDemoLogin('guntur')}
                      className="px-3 py-1.5 bg-[#EFF6EC] hover:bg-[#DDECD7] text-[#1B4332] text-[11px] font-bold rounded-lg transition-colors"
                    >
                      Ramesh (Guntur)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PHONE OTP VERIFICATION */}
            {authTab === 'phone' && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#143021]">Your Name (Optional)</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#6B8772] absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. Manoj Kumar"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#143021]">Mobile Number (for OTP)</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#6B8772] absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98480 22334"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>{isProcessing ? 'Sending SMS...' : 'Send 6-Digit OTP'}</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="p-3 bg-[#EFF6EC] rounded-xl text-xs text-[#2D6A4F] font-medium text-center">
                      OTP sent to <strong>{phoneInput}</strong>. Enter code below:
                    </div>

                    <div className="space-y-1.5 text-center">
                      <label className="block text-xs font-bold text-[#143021]">Enter 6-Digit OTP</label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-full py-3 text-center tracking-[0.5em] text-lg font-mono font-bold bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isProcessing ? 'Verifying...' : 'Verify OTP & Enter'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-center text-xs text-[#52796F] hover:underline"
                    >
                      Change Phone Number
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: EMAIL & PASSWORD AUTH */}
            {authTab === 'email' && (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#143021]">Farmer Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#6B8772] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Manoj Kumar"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#143021]">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6B8772] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="farmer@agrisense.io"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#143021]">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#6B8772] absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{authMode === 'login' ? 'Sign In' : 'Create Farmer Account'}</span>
                </button>

                <div className="text-center text-xs text-[#52796F]">
                  {authMode === 'login' ? (
                    <span>Don't have an account? <button type="button" onClick={() => setAuthMode('signup')} className="font-bold text-[#2D6A4F] hover:underline">Sign Up</button></span>
                  ) : (
                    <span>Already registered? <button type="button" onClick={() => setAuthMode('login')} className="font-bold text-[#2D6A4F] hover:underline">Log In</button></span>
                  )}
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
