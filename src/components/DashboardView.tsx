import React from 'react';
import { 
  BarChart3, 
  Sprout, 
  Activity, 
  CloudSun, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Droplets, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Leaf, 
  Zap, 
  Award,
  Layers,
  ChevronRight,
  RefreshCw,
  ScanLine
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  Cell 
} from 'recharts';
import { FarmItem, IntegratedCropAnalysis, WeatherData } from '../types';
import { t, translateDynamicText } from '../utils/translations';
import { NavSection } from './Sidebar';

interface DashboardViewProps {
  currentLanguage: string;
  farms: FarmItem[];
  activeFarm: FarmItem;
  onSelectFarm: (farm: FarmItem) => void;
  weatherData: WeatherData | null;
  latestDiagnosis: IntegratedCropAnalysis | null;
  onNavigate: (section: NavSection) => void;
  onOpenChat: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentLanguage,
  farms,
  activeFarm,
  onSelectFarm,
  weatherData,
  latestDiagnosis,
  onNavigate,
  onOpenChat
}) => {
  // Aggregate stats across all farms
  const totalFarms = farms.length;
  const totalAcreage = farms.reduce((acc, f) => acc + f.areaAcres, 0);
  const averageCQI = Math.round(farms.reduce((acc, f) => acc + f.cqiScore, 0) / (farms.length || 1));

  // Dynamic weekly trend data for the currently active farm
  const cqiTrendData = [
    { week: 'Week 1', score: Math.max(50, activeFarm.cqiScore - 14), baseline: 75 },
    { week: 'Week 2', score: Math.max(55, activeFarm.cqiScore - 9), baseline: 75 },
    { week: 'Week 3', score: Math.max(60, activeFarm.cqiScore - 4), baseline: 75 },
    { week: 'Week 4', score: activeFarm.cqiScore, baseline: 75 },
    { week: 'Projected', score: Math.min(98, activeFarm.cqiScore + 5), baseline: 75 }
  ];

  // Soil Telemetry health distribution
  const soilMetricBars = [
    { name: 'Nitrogen (N)', current: activeFarm.soilData.nitrogen, optimal: 220, unit: 'kg/ha', pct: Math.min(100, Math.round((activeFarm.soilData.nitrogen / 220) * 100)) },
    { name: 'Phosphorus (P)', current: activeFarm.soilData.phosphorus, optimal: 30, unit: 'kg/ha', pct: Math.min(100, Math.round((activeFarm.soilData.phosphorus / 30) * 100)) },
    { name: 'Potassium (K)', current: activeFarm.soilData.potassium, optimal: 240, unit: 'kg/ha', pct: Math.min(100, Math.round((activeFarm.soilData.potassium / 240) * 100)) },
    { name: 'Soil Moisture', current: activeFarm.soilData.moisture, optimal: 60, unit: '%', pct: activeFarm.soilData.moisture }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner & High Level Insights */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#143021] rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-[#D8F3DC] backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#74C69D]" />
              <span>{t('dashboard_hero_tag', currentLanguage, 'Multi-Farm Precision Agro Intelligence')}</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              {t('dashboard_hero_title', currentLanguage, 'Farm Health & Quality Dashboard')}
            </h1>
            <p className="text-xs sm:text-sm text-[#D8F3DC] max-w-xl">
              {translateDynamicText('Watching live telemetry for', currentLanguage)} <strong className="text-white">{totalFarms} {translateDynamicText('Registered Crops', currentLanguage)}</strong> {translateDynamicText('across', currentLanguage)} <strong className="text-white">{totalAcreage.toFixed(1)} {translateDynamicText('Acres', currentLanguage)}</strong> {translateDynamicText('with real-time Crop Quality Indexing (CQI).', currentLanguage)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('diagnose')}
              className="px-4 py-2.5 bg-white hover:bg-[#EFF6EC] text-[#1B4332] font-bold text-xs rounded-2xl shadow-md transition-all hover:scale-105 flex items-center space-x-1.5 shrink-0"
            >
              <ScanLine className="w-4 h-4 text-[#2D6A4F]" />
              <span>{t('quick_scan_cta', currentLanguage, 'Scan New Leaf Photo')}</span>
            </button>
            <button
              onClick={() => onNavigate('farms')}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-2xl border border-white/20 transition-all flex items-center space-x-1.5 shrink-0"
            >
              <Sprout className="w-4 h-4" />
              <span>{t('nav_my_farm', currentLanguage, 'My Farm')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Key Metric Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Total Crops & Acreage */}
        <div className="p-5 rounded-3xl bg-white border border-[#D5E2D1] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#52796F]">{t('active_crops_label', currentLanguage, 'Active Crops')}</span>
            <div className="w-8 h-8 rounded-xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143021]">{totalFarms}</span>
            <span className="text-xs text-[#52796F] font-semibold">{translateDynamicText('Crops', currentLanguage)} ({totalAcreage.toFixed(1)} Ac)</span>
          </div>
          <p className="text-[11px] text-[#2D6A4F] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{translateDynamicText('All plots synced with IoT', currentLanguage)}</span>
          </p>
        </div>

        {/* 2. Crop Quality Index (CQI) */}
        <div className="p-5 rounded-3xl bg-white border border-[#D5E2D1] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#52796F]">{t('dashboard_cqi_title', currentLanguage, 'Crop Quality Index (CQI)')}</span>
            <div className="w-8 h-8 rounded-xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D6A4F]">{activeFarm.cqiScore}</span>
            <span className="text-xs text-[#52796F] font-semibold">/ 100</span>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              activeFarm.cqiScore >= 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {translateDynamicText(activeFarm.healthStatus, currentLanguage)}
            </span>
          </div>
          <p className="text-[11px] text-[#52796F]">
            {translateDynamicText(activeFarm.name.split('(')[0], currentLanguage)}
          </p>
        </div>

        {/* 3. Soil Telemetry Status */}
        <div 
          onClick={() => onNavigate('soil')}
          className="p-5 rounded-3xl bg-white border border-[#D5E2D1] shadow-xs space-y-2 hover:border-[#2D6A4F] cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#52796F]">{t('soil_distribution_title', currentLanguage, 'Soil NPK Health')}</span>
            <div className="w-8 h-8 rounded-xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143021]">pH {activeFarm.soilData.ph}</span>
            <span className="text-xs text-[#52796F] font-semibold">{activeFarm.soilData.moisture}% {t('moisture_label', currentLanguage, 'Moisture')}</span>
          </div>
          <p className="text-[11px] text-[#2D6A4F] font-medium flex items-center gap-1">
            <span>N: {activeFarm.soilData.nitrogen} &bull; P: {activeFarm.soilData.phosphorus} &bull; K: {activeFarm.soilData.potassium}</span>
          </p>
        </div>

        {/* 4. Weather & Spraying Safety */}
        <div 
          onClick={() => onNavigate('weather')}
          className="p-5 rounded-3xl bg-white border border-[#D5E2D1] shadow-xs space-y-2 hover:border-[#2D6A4F] cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#52796F]">{t('spraying_safety', currentLanguage, 'Microclimate Safety')}</span>
            <div className="w-8 h-8 rounded-xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center">
              <CloudSun className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143021]">{weatherData?.currentTemp ?? 31}°C</span>
            <span className="text-xs text-[#52796F] font-semibold">{weatherData?.currentHumidity ?? 76}% RH</span>
          </div>
          <p className="text-[11px] text-[#2D6A4F] font-medium flex items-center gap-1">
            <span>{t('spraying_window_risk', currentLanguage, 'Spray Window')}: <strong>{translateDynamicText('Optimal Calm', currentLanguage)}</strong></span>
          </p>
        </div>

      </div>

      {/* Farm Selector Strip: Watch Analytics for Any Selected Farm */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#143021]">{translateDynamicText('Select Field to Watch Analytics', currentLanguage)}</h3>
            <p className="text-xs text-[#52796F]">{translateDynamicText('Click any registered crop plot below to view its specific health curves and sensor telemetry.', currentLanguage)}</p>
          </div>

          <button
            onClick={() => onNavigate('farms')}
            className="text-xs font-bold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1"
          >
            <span>+ {translateDynamicText('Add New Crop / Farm', currentLanguage)}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {farms.map((farm) => {
            const isSelected = farm.id === activeFarm.id;
            return (
              <div
                key={farm.id}
                onClick={() => onSelectFarm(farm)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#EFF6EC] to-white border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20 shadow-md scale-[1.01]'
                    : 'bg-white border-[#D8E6D3] hover:border-[#2D6A4F]/50 shadow-xs'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-[#2D6A4F] text-white text-[9px] font-extrabold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider">
                    {translateDynamicText('Active Focus', currentLanguage)}
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="font-heading font-bold text-sm text-[#143021] truncate pr-12">
                      {farm.name}
                    </div>
                    <div className="text-xs text-[#2D6A4F] font-semibold">
                      {translateDynamicText(farm.cropName.split(' ')[0], currentLanguage)} &bull; {translateDynamicText(farm.cropVariety || 'Standard', currentLanguage)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#E5EDE3] grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#F8FAF6] p-1.5 rounded-xl">
                    <div className="text-[10px] text-[#52796F]">{translateDynamicText('Area', currentLanguage)}</div>
                    <div className="font-bold text-[#143021]">{farm.areaAcres} Ac</div>
                  </div>
                  <div className="bg-[#F8FAF6] p-1.5 rounded-xl">
                    <div className="text-[10px] text-[#52796F]">CQI</div>
                    <div className="font-bold text-[#2D6A4F]">{farm.cqiScore}/100</div>
                  </div>
                  <div className="bg-[#F8FAF6] p-1.5 rounded-xl">
                    <div className="text-[10px] text-[#52796F]">{translateDynamicText('Yield Est.', currentLanguage)}</div>
                    <div className="font-bold text-[#143021]">{farm.expectedYieldQuintalsPerAcre} Q/Ac</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Farm Deep-Dive Analytics (Charts + NPK Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: CQI Growth & Recovery Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#D5E2D1] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EEF2EB]">
            <div>
              <h3 className="font-heading font-bold text-base text-[#143021] flex items-center gap-2">
                <span>Crop Quality Index (CQI) Trajectory &bull; {activeFarm.name}</span>
              </h3>
              <p className="text-xs text-[#52796F]">Weekly multi-factor index combining leaf health, NPK nutrition, and microclimate.</p>
            </div>
            <span className="text-xs font-bold text-[#2D6A4F] bg-[#EFF6EC] px-3 py-1 rounded-full border border-[#CBDCC7] shrink-0 self-start sm:self-auto">
              Current: {activeFarm.cqiScore}%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cqiTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cqiColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2EB" />
                <XAxis dataKey="week" stroke="#52796F" fontSize={11} />
                <YAxis domain={[40, 100]} stroke="#52796F" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #CBDCC7', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#2D6A4F" strokeWidth={3} fillOpacity={1} fill="url(#cqiColor)" name="Crop Quality Index" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-[#52796F] pt-2">
            <span>Baseline Healthy Threshold: <strong className="text-[#143021]">75 CQI</strong></span>
            <span className="text-[#2D6A4F] font-bold">Predicted Season Harvest: High Yield (+12%)</span>
          </div>
        </div>

        {/* Right 1 Col: Soil Health Radar & Nutrients */}
        <div className="bg-white rounded-3xl p-6 border border-[#D5E2D1] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF2EB]">
              <h3 className="font-heading font-bold text-base text-[#143021]">Nutrient Health Gauges</h3>
              <button onClick={() => onNavigate('soil')} className="text-xs text-[#2D6A4F] font-bold hover:underline">
                View IoT
              </button>
            </div>

            <div className="space-y-3.5 pt-3">
              {soilMetricBars.map((metric) => (
                <div key={metric.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#143021]">{metric.name}</span>
                    <span className="text-[#52796F]">
                      <strong className="text-[#143021]">{metric.current}</strong> / {metric.optimal} {metric.unit}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#EFF6EC] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        metric.pct >= 80 ? 'bg-[#2D6A4F]' : metric.pct >= 60 ? 'bg-[#52B788]' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, metric.pct)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Fertilizer Recommendation */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAF6] border border-[#DCE4D8] space-y-1.5 mt-4">
            <div className="text-xs font-bold text-[#143021] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Smart Nutrition Tip</span>
            </div>
            <p className="text-[11px] text-[#52796F]">
              {activeFarm.soilData.nitrogen < 180 
                ? 'Apply 25 kg/Acre Urea to correct vegetative nitrogen deficit.'
                : 'Nutrient balance is optimal for the current growth stage.'}
            </p>
          </div>
        </div>

      </div>

      {/* Quick Action Dock */}
      <div className="p-6 rounded-3xl bg-white border border-[#D5E2D1] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EFF6EC] text-[#2D6A4F] flex items-center justify-center shrink-0">
            <ScanLine className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#143021]">Have a crop leaf symptom or pest concern?</div>
            <div className="text-xs text-[#52796F]">Capture or upload a picture to run immediate multi-modal vision analysis.</div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('diagnose')}
          className="w-full sm:w-auto px-6 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs rounded-2xl shadow-md transition-all hover:scale-105 flex items-center justify-center space-x-2 shrink-0"
        >
          <span>Open Diagnostic Center</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
