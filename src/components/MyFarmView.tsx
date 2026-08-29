import React, { useState } from 'react';
import { 
  Sprout, 
  Plus, 
  MapPin, 
  Calendar, 
  Activity, 
  CloudSun, 
  BarChart3, 
  ScanLine, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Layers,
  Award,
  Zap,
  Info
} from 'lucide-react';
import { FarmItem, SoilSensorData } from '../types';
import { generateSimulatedSoilDataForCrop, calculateCQI } from '../data/farmsData';
import { t, translateDynamicText } from '../utils/translations';
import { NavSection } from './Sidebar';

interface MyFarmViewProps {
  currentLanguage: string;
  farms: FarmItem[];
  activeFarm: FarmItem;
  onSelectFarm: (farm: FarmItem) => void;
  onAddFarm: (farm: FarmItem) => void;
  onDeleteFarm: (farmId: string) => void;
  onUpdateFarmSoil: (farmId: string, newSoil: SoilSensorData) => void;
  onNavigate: (section: NavSection) => void;
}

export const MyFarmView: React.FC<MyFarmViewProps> = ({
  currentLanguage,
  farms,
  activeFarm,
  onSelectFarm,
  onAddFarm,
  onDeleteFarm,
  onUpdateFarmSoil,
  onNavigate
}) => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for adding a new farm
  const [farmName, setFarmName] = useState('');
  const [cropName, setCropName] = useState('Paddy / Rice (వరి)');
  const [cropVariety, setCropVariety] = useState('BPT-5204 (Samba Mahsuri)');
  const [areaAcres, setAreaAcres] = useState<number>(3.5);
  const [location, setLocation] = useState('Palasa - Kasibugga, Srikakulam District, AP');
  const [soilTexture, setSoilTexture] = useState('Red Sandy Loam');
  const [growthStage, setGrowthStage] = useState('Vegetative Flush / Tillering');
  const [plantingDate, setPlantingDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedYield, setExpectedYield] = useState<number>(22.0);

  // Crop options
  const CROP_OPTIONS = [
    { label: 'Paddy / Rice (వరి)', defaultVariety: 'BPT-5204', defaultYield: 28 },
    { label: 'Cashew (జీడిమామిడి)', defaultVariety: 'BPP-8 (High Yield)', defaultYield: 8.5 },
    { label: 'Maize / Corn (మొక్కజొన్న)', defaultVariety: 'Pioneer 3396', defaultYield: 35 },
    { label: 'Cotton (ప్రత్తి)', defaultVariety: 'Bollgard II Bt', defaultYield: 14 },
    { label: 'Chili / Pepper (మిర్చి)', defaultVariety: 'Teja / Guntur Sannam', defaultYield: 18 },
    { label: 'Tomato (టమాట)', defaultVariety: 'Arka Rakshak (F1)', defaultYield: 120 },
    { label: 'Potato (బంగాళాదుంప)', defaultVariety: 'Kufri Jyoti', defaultYield: 95 },
    { label: 'Sugarcane (చెరకు)', defaultVariety: 'Co 86032', defaultYield: 450 },
    { label: 'Wheat (గోధుమ)', defaultVariety: 'HD 2967', defaultYield: 22 },
    { label: 'Groundnut / Peanut (వేరుశనగ)', defaultVariety: 'Kadiri 6', defaultYield: 12 }
  ];

  const SOIL_TEXTURES = [
    'Red Sandy Loam',
    'Alluvial Clay Loam',
    'Black Cotton Loam (Regur)',
    'Laterite Coastal Soil',
    'Sandy Silt Loam',
    'Clay Loam'
  ];

  // Handle adding new farm
  const handleCreateFarmSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate simulated soil sensor data tuned for this crop and soil type
    const simulatedSoil = generateSimulatedSoilDataForCrop(cropName, soilTexture);
    const initialCQI = calculateCQI(simulatedSoil);

    const newFarm: FarmItem = {
      id: `farm_${Date.now()}`,
      name: farmName.trim() || `${cropName.split(' ')[0]} Field`,
      cropName,
      cropVariety: cropVariety.trim() || 'Standard Commercial',
      areaAcres: Number(areaAcres) || 2.0,
      location: location.trim() || 'Andhra Pradesh, India',
      plantingDate,
      growthStage,
      soilTexture,
      soilData: simulatedSoil,
      cqiScore: initialCQI,
      healthStatus: initialCQI >= 85 ? 'Optimal' : initialCQI >= 70 ? 'Good' : 'Attention Needed',
      lastSynced: 'Just now (Simulated IoT)',
      expectedYieldQuintalsPerAcre: Number(expectedYield) || 15,
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80'
    };

    onAddFarm(newFarm);
    onSelectFarm(newFarm);
    setShowAddModal(false);

    // Reset form
    setFarmName('');

    // Directly navigate to dashboard to show newly created analytics!
    onNavigate('dashboard');
  };

  // Run farm analytics CTA
  const handleRunAnalyticsForFarm = (farm: FarmItem) => {
    onSelectFarm(farm);
    onNavigate('dashboard');
  };

  // Resync simulated IoT sensors
  const handleResyncIoT = (farm: FarmItem) => {
    const freshSoil = generateSimulatedSoilDataForCrop(farm.cropName, farm.soilTexture);
    onUpdateFarmSoil(farm.id, freshSoil);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header & Add Farm Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5E2D1]">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFF6EC] text-xs font-bold text-[#2D6A4F] mb-1.5 border border-[#CBDCC7]">
            <Sprout className="w-3.5 h-3.5" />
            <span>{translateDynamicText('Farm Plots & IoT Telemetry Registration', currentLanguage)}</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143021] tracking-tight">
            {t('nav_my_farm', currentLanguage, 'My Farms & Crop Fields')}
          </h1>
          <p className="text-xs sm:text-sm text-[#52796F]">
            {translateDynamicText('Manage all your agricultural holdings, integrate simulated soil sensor nodes, and launch multi-factor farm analytics.', currentLanguage)}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] hover:from-[#1B4332] hover:to-[#0F2417] text-white font-bold text-xs rounded-2xl shadow-md shadow-[#2D6A4F]/25 transition-all hover:scale-105 flex items-center space-x-2 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{translateDynamicText('+ Add New Farm / Crop', currentLanguage)}</span>
        </button>
      </div>

      {/* Info Hackathon Simulated Banner */}
      <div className="p-4 rounded-2xl bg-[#F8FAF6] border border-[#CBDCC7] text-xs text-[#2D6A4F] flex items-start space-x-3 shadow-2xs">
        <Info className="w-5 h-5 shrink-0 text-[#2D6A4F] mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-[#143021]">{translateDynamicText('Automated IoT Soil Sensor Generation Active', currentLanguage)}</span>
          <p className="text-[#52796F] leading-relaxed">
            {translateDynamicText('When you register a new farm, AgriSense automatically generates realistic, crop-calibrated soil sensor telemetry (N-P-K, pH, Moisture, Organic Carbon, EC) and synchronizes with real-time weather for the farm\'s location.', currentLanguage)}
          </p>
        </div>
      </div>

      {/* Farm Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {farms.map((farm) => {
          const isActive = farm.id === activeFarm.id;
          return (
            <div
              key={farm.id}
              className={`rounded-3xl border bg-white p-6 shadow-xs transition-all space-y-5 relative overflow-hidden ${
                isActive
                  ? 'border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20'
                  : 'border-[#D5E2D1] hover:border-[#2D6A4F]/50'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 bg-[#2D6A4F] text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-2xl uppercase tracking-wider">
                  Active in Session
                </div>
              )}

              {/* Farm Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-[#143021]">
                    {farm.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-[#2D6A4F] bg-[#EFF6EC] px-2.5 py-0.5 rounded-lg border border-[#CBDCC7]">
                      {translateDynamicText(farm.cropName, currentLanguage)}
                    </span>
                    <span className="text-[#52796F] font-medium">
                      Variety: <strong className="text-[#143021]">{farm.cropVariety || 'Standard'}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#52796F]">CQI Health</div>
                  <div className="text-lg font-extrabold text-[#2D6A4F]">{farm.cqiScore}/100</div>
                </div>
              </div>

              {/* Field Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#F9FBF8] p-3.5 rounded-2xl border border-[#E3EBE0]">
                <div>
                  <div className="text-[10px] text-[#52796F] font-medium">Acreage</div>
                  <div className="font-bold text-[#143021]">{farm.areaAcres} Acres</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#52796F] font-medium">Location</div>
                  <div className="font-bold text-[#143021] truncate" title={farm.location}>
                    {farm.location.split(',')[0]}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#52796F] font-medium">Soil Texture</div>
                  <div className="font-bold text-[#143021] truncate">{farm.soilTexture}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#52796F] font-medium">Yield Est.</div>
                  <div className="font-bold text-[#143021]">{farm.expectedYieldQuintalsPerAcre} Q/Ac</div>
                </div>
              </div>

              {/* Live IoT Sensor Telemetry Strip */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#143021] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>IoT Sensor Telemetry</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleResyncIoT(farm)}
                    className="text-[11px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1"
                    title="Simulate live sensor reading update"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Sync Node</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-[#EFF6EC] border border-[#CBDCC7]">
                    <div className="text-[10px] text-[#52796F]">Soil pH</div>
                    <div className="font-bold text-[#143021]">{farm.soilData.ph}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#EFF6EC] border border-[#CBDCC7]">
                    <div className="text-[10px] text-[#52796F]">Nitrogen (N)</div>
                    <div className="font-bold text-[#143021]">{farm.soilData.nitrogen} <span className="text-[9px] font-normal">kg/ha</span></div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#EFF6EC] border border-[#CBDCC7]">
                    <div className="text-[10px] text-[#52796F]">Potassium (K)</div>
                    <div className="font-bold text-[#143021]">{farm.soilData.potassium} <span className="text-[9px] font-normal">kg/ha</span></div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#EFF6EC] border border-[#CBDCC7]">
                    <div className="text-[10px] text-[#52796F]">Moisture</div>
                    <div className="font-bold text-[#143021]">{farm.soilData.moisture}%</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Run Farm Analytics CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#EEF2EB]">
                <button
                  type="button"
                  onClick={() => handleRunAnalyticsForFarm(farm)}
                  className="flex-1 py-2.5 px-4 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  <BarChart3 className="w-4 h-4 text-[#74C69D]" />
                  <span>Run Farm Analytics</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectFarm(farm);
                    onNavigate('diagnose');
                  }}
                  className="py-2.5 px-3.5 bg-[#EFF6EC] hover:bg-[#DDECD7] text-[#1B4332] font-bold text-xs rounded-xl border border-[#CBDCC7] transition-colors flex items-center space-x-1.5"
                  title="Run photo diagnosis for this farm"
                >
                  <ScanLine className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Diagnose</span>
                </button>

                {farms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onDeleteFarm(farm.id)}
                    className="p-2.5 text-[#52796F] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Remove farm plot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD NEW FARM MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#D5DDD2] space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E6EBE3]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-xs">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#143021]">Register New Farm Plot</h3>
                  <p className="text-xs text-[#52796F]">Add crop type, acreage & integrate IoT sensor nodes</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#F4F6F1] hover:bg-[#E8EDE4] text-[#52796F] flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFarmSubmit} className="space-y-4">
              
              {/* Farm Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#143021]">Farm / Field Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Green Valley North Plot, Kasibugga Cashew Block"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                />
              </div>

              {/* Crop & Variety Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#143021]">Crop Type</label>
                  <select
                    value={cropName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCropName(val);
                      const opt = CROP_OPTIONS.find((c) => c.label === val);
                      if (opt) {
                        setCropVariety(opt.defaultVariety);
                        setExpectedYield(opt.defaultYield);
                      }
                    }}
                    className="w-full px-3 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none font-medium cursor-pointer"
                  >
                    {CROP_OPTIONS.map((c) => (
                      <option key={c.label} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#143021]">Variety / Cultivar</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BPT-5204, BPP-8, Pioneer 3396"
                    value={cropVariety}
                    onChange={(e) => setCropVariety(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Area & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#143021]">Area / Acreage (in Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={areaAcres}
                    onChange={(e) => setAreaAcres(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#143021]">Location of the Farm</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Palasa - Kasibugga, Guntur, AP"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Soil Texture & Expected Yield */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#143021]">Soil Texture Classification</label>
                  <select
                    value={soilTexture}
                    onChange={(e) => setSoilTexture(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none cursor-pointer"
                  >
                    {SOIL_TEXTURES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#143021]">Expected Yield (Quintals/Acre)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={expectedYield}
                    onChange={(e) => setExpectedYield(parseFloat(e.target.value) || 10)}
                    className="w-full px-3.5 py-2.5 bg-[#F9FBF8] border border-[#D5DDD2] rounded-xl text-xs text-[#143021] focus:bg-white focus:border-[#2D6A4F] focus:outline-none font-bold"
                  />
                </div>
              </div>

              {/* IoT Integration Notice */}
              <div className="p-3 bg-[#EFF6EC] rounded-2xl text-[11px] text-[#2D6A4F] border border-[#CBDCC7] flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                <span>Simulated IoT sensor nodes will automatically calibrate to this crop and integrate with weather radar.</span>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-[#52796F] hover:bg-[#F4F7F2] rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105 flex items-center space-x-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Create & Run Farm Analytics</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
