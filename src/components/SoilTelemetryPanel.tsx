import React from 'react';
import { Activity, Droplets, Thermometer, Zap, Layers, RefreshCw, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SoilSensorData } from '../types';
import { SOIL_PARAM_STANDARDS } from '../data/presets';
import { t, translateDynamicText } from '../utils/translations';

interface SoilTelemetryPanelProps {
  currentLanguage?: string;
  soilData: SoilSensorData;
  onSoilDataChange: (data: SoilSensorData) => void;
  onSimulateIoTSync: () => void;
  isSyncing?: boolean;
}

export const SoilTelemetryPanel: React.FC<SoilTelemetryPanelProps> = ({
  currentLanguage = 'en',
  soilData,
  onSoilDataChange,
  onSimulateIoTSync,
  isSyncing = false
}) => {

  const handleValueChange = (key: keyof SoilSensorData, value: number) => {
    onSoilDataChange({
      ...soilData,
      [key]: value,
      source: 'manual',
      lastUpdated: new Date().toLocaleTimeString()
    });
  };

  const getStatus = (key: 'ph' | 'nitrogen' | 'phosphorus' | 'potassium' | 'organicCarbon' | 'moisture' | 'temperature' | 'electricalConductivity', val: number) => {
    const std = SOIL_PARAM_STANDARDS[key];
    if (!std) return { label: t('status_optimal', currentLanguage, 'Optimal'), color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val < std.min) return { label: t('status_low', currentLanguage, 'Low / Deficient'), color: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertTriangle };
    if (val > std.max) return { label: t('status_high', currentLanguage, 'Excess / High'), color: 'text-rose-700 bg-rose-50 border-rose-200', icon: AlertTriangle };
    return { label: t('status_optimal', currentLanguage, 'Optimal'), color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle2 };
  };

  // Quick Soil Type Presets
  const applySoilPreset = (type: string) => {
    switch (type) {
      case 'nitrogen-deficient':
        onSoilDataChange({
          ...soilData,
          ph: 6.2,
          nitrogen: 120,
          phosphorus: 28,
          potassium: 220,
          organicCarbon: 0.42,
          moisture: 48,
          temperature: 25,
          electricalConductivity: 1.0,
          source: 'preset_kaggle'
        });
        break;
      case 'waterlogged-fungal':
        onSoilDataChange({
          ...soilData,
          ph: 5.8,
          nitrogen: 290,
          phosphorus: 20,
          potassium: 160,
          organicCarbon: 0.85,
          moisture: 88,
          temperature: 26,
          electricalConductivity: 1.1,
          source: 'preset_kaggle'
        });
        break;
      case 'alkaline-saline':
        onSoilDataChange({
          ...soilData,
          ph: 8.2,
          nitrogen: 190,
          phosphorus: 14,
          potassium: 310,
          organicCarbon: 0.40,
          moisture: 35,
          temperature: 31,
          electricalConductivity: 2.8,
          source: 'preset_kaggle'
        });
        break;
      case 'balanced-healthy':
      default:
        onSoilDataChange({
          ...soilData,
          ph: 6.8,
          nitrogen: 275,
          phosphorus: 32,
          potassium: 260,
          organicCarbon: 0.85,
          moisture: 58,
          temperature: 24,
          electricalConductivity: 1.2,
          source: 'preset_kaggle'
        });
        break;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#E6EBE3] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold">2</span>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-[#143021]">
              {t('soil_panel_title', currentLanguage, 'Soil Health & IoT Sensor Telemetry')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6754] mt-1 ml-9">
            {t('soil_panel_desc', currentLanguage, 'Soil nutrient bioavailability, moisture saturation, and pH directly drive crop immunity')}
          </p>
        </div>

        {/* Sync & Preset Actions */}
        <div className="flex items-center space-x-2">
          <button
            id="sync-iot-btn"
            onClick={onSimulateIoTSync}
            disabled={isSyncing}
            className="px-3.5 py-1.5 bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] font-semibold text-xs rounded-xl border border-[#A5D6A7] transition-all flex items-center space-x-1.5 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? t('sensor_connected', currentLanguage, 'Connecting to Sensor...') : t('simulate_iot_sync', currentLanguage, 'Simulate IoT Sync')}</span>
          </button>
        </div>
      </div>

      {/* Preset soil conditions chips */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-[#35583D] shrink-0">{t('sample_label', currentLanguage, 'Soil Presets:')}</span>
        <button
          onClick={() => applySoilPreset('balanced-healthy')}
          className="px-3 py-1 bg-[#F4F8F1] hover:bg-[#E2EEDE] border border-[#CBDCC7] rounded-lg text-[#1B4332] font-medium transition-colors shrink-0"
        >
          {t('status_optimal', currentLanguage, 'Balanced Optimal')}
        </button>
        <button
          onClick={() => applySoilPreset('nitrogen-deficient')}
          className="px-3 py-1 bg-[#FDF7E7] hover:bg-[#F9EDC7] border border-[#F3DE9F] rounded-lg text-[#855B00] font-medium transition-colors shrink-0"
        >
          {t('nitrogen_label', currentLanguage, 'Low Nitrogen')} (Chlorosis)
        </button>
        <button
          onClick={() => applySoilPreset('waterlogged-fungal')}
          className="px-3 py-1 bg-[#EBF5FB] hover:bg-[#D4E6F1] border border-[#AED6F1] rounded-lg text-[#1B4F72] font-medium transition-colors shrink-0"
        >
          {t('moisture_label', currentLanguage, 'High Moisture')} (Fungal Risk)
        </button>
        <button
          onClick={() => applySoilPreset('alkaline-saline')}
          className="px-3 py-1 bg-[#FDEDEC] hover:bg-[#FADBD8] border border-[#F5B7B1] rounded-lg text-[#78281F] font-medium transition-colors shrink-0"
        >
          {t('ph_label', currentLanguage, 'Alkaline & Saline')}
        </button>
      </div>

      {/* Primary N-P-K Major Nutrients Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Nitrogen Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#F8FAF6] to-[#EFF5EB] border border-[#D1DFCD]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">{t('nitrogen_label', currentLanguage, 'Nitrogen (N)')}</span>
            {(() => {
              const st = getStatus('nitrogen', soilData.nitrogen);
              return (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${st.color}`}>
                  {st.label}
                </span>
              );
            })()}
          </div>
          <div className="flex items-baseline space-x-1.5 mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#143021]">{soilData.nitrogen}</span>
            <span className="text-xs text-[#52796F] font-semibold">kg/ha</span>
          </div>
          <input
            type="range"
            min="80"
            max="450"
            value={soilData.nitrogen}
            onChange={(e) => handleValueChange('nitrogen', Number(e.target.value))}
            className="w-full h-1.5 bg-[#CBDCC7] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
          />
          <div className="flex justify-between text-[10px] text-[#6B8772] mt-1.5">
            <span>Low (&lt;200)</span>
            <span className="font-semibold text-[#2D6A4F]">Opt: 250-300</span>
            <span>Excess (&gt;350)</span>
          </div>
        </div>

        {/* Phosphorus Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#F8FAF6] to-[#EFF5EB] border border-[#D1DFCD]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">{t('phosphorus_label', currentLanguage, 'Phosphorus (P)')}</span>
            {(() => {
              const st = getStatus('phosphorus', soilData.phosphorus);
              return (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${st.color}`}>
                  {st.label}
                </span>
              );
            })()}
          </div>
          <div className="flex items-baseline space-x-1.5 mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#143021]">{soilData.phosphorus}</span>
            <span className="text-xs text-[#52796F] font-semibold">kg/ha</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={soilData.phosphorus}
            onChange={(e) => handleValueChange('phosphorus', Number(e.target.value))}
            className="w-full h-1.5 bg-[#CBDCC7] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
          />
          <div className="flex justify-between text-[10px] text-[#6B8772] mt-1.5">
            <span>Low (&lt;15)</span>
            <span className="font-semibold text-[#2D6A4F]">Opt: 20-35</span>
            <span>Excess (&gt;45)</span>
          </div>
        </div>

        {/* Potassium Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#F8FAF6] to-[#EFF5EB] border border-[#D1DFCD]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">{t('potassium_label', currentLanguage, 'Potassium (K)')}</span>
            {(() => {
              const st = getStatus('potassium', soilData.potassium);
              return (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${st.color}`}>
                  {st.label}
                </span>
              );
            })()}
          </div>
          <div className="flex items-baseline space-x-1.5 mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#143021]">{soilData.potassium}</span>
            <span className="text-xs text-[#52796F] font-semibold">kg/ha</span>
          </div>
          <input
            type="range"
            min="100"
            max="500"
            value={soilData.potassium}
            onChange={(e) => handleValueChange('potassium', Number(e.target.value))}
            className="w-full h-1.5 bg-[#CBDCC7] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
          />
          <div className="flex justify-between text-[10px] text-[#6B8772] mt-1.5">
            <span>Low (&lt;180)</span>
            <span className="font-semibold text-[#2D6A4F]">Opt: 220-320</span>
            <span>Excess (&gt;400)</span>
          </div>
        </div>

      </div>

      {/* Secondary Soil Properties Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        {/* pH Card */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF6] border border-[#E0E7DC]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#52796F] uppercase tracking-wider">{t('ph_label', currentLanguage, 'Soil pH')}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#2D6A4F] border border-[#C5D9C0]">
              {getStatus('ph', soilData.ph).label}
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-bold text-[#143021]">{soilData.ph}</span>
            <span className="text-[10px] text-[#6B8772]">{soilData.ph < 6.0 ? 'Acidic' : soilData.ph > 7.5 ? 'Alkaline' : 'Neutral'}</span>
          </div>
          <input
            type="range"
            min="4.5"
            max="9.0"
            step="0.1"
            value={soilData.ph}
            onChange={(e) => handleValueChange('ph', Number(e.target.value))}
            className="w-full h-1 bg-[#CBDCC7] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F] mt-2"
          />
        </div>

        {/* Moisture Card */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF6] border border-[#E0E7DC]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#52796F] uppercase tracking-wider flex items-center">
              <Droplets className="w-3 h-3 mr-1 text-blue-600" />
              {t('moisture_label', currentLanguage, 'Moisture')}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#2D6A4F] border border-[#C5D9C0]">
              {getStatus('moisture', soilData.moisture).label}
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-bold text-[#143021]">{soilData.moisture}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="95"
            value={soilData.moisture}
            onChange={(e) => handleValueChange('moisture', Number(e.target.value))}
            className="w-full h-1 bg-[#CBDCC7] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F] mt-2"
          />
        </div>

        {/* Organic Carbon Card */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF6] border border-[#E0E7DC]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#52796F] uppercase tracking-wider flex items-center">
              <Layers className="w-3 h-3 mr-1 text-amber-700" />
              {t('organic_carbon_label', currentLanguage, 'Organic Carbon')}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#2D6A4F] border border-[#C5D9C0]">
              {getStatus('organicCarbon', soilData.organicCarbon).label}
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-bold text-[#143021]">{soilData.organicCarbon}%</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.5"
            step="0.05"
            value={soilData.organicCarbon}
            onChange={(e) => handleValueChange('organicCarbon', Number(e.target.value))}
            className="w-full h-1 bg-[#CBDCC7] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F] mt-2"
          />
        </div>

        {/* Soil EC Card */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF6] border border-[#E0E7DC]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#52796F] uppercase tracking-wider flex items-center">
              <Zap className="w-3 h-3 mr-1 text-purple-600" />
              {t('ec_label', currentLanguage, 'EC (Salinity)')}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#2D6A4F] border border-[#C5D9C0]">
              {getStatus('electricalConductivity', soilData.electricalConductivity).label}
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-bold text-[#143021]">{soilData.electricalConductivity}</span>
            <span className="text-[10px] text-[#6B8772]">dS/m</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="4.0"
            step="0.1"
            value={soilData.electricalConductivity}
            onChange={(e) => handleValueChange('electricalConductivity', Number(e.target.value))}
            className="w-full h-1 bg-[#CBDCC7] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F] mt-2"
          />
        </div>

      </div>

    </div>
  );
};
