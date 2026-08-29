import React, { useState } from 'react';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  MapPin, 
  Search, 
  Navigation, 
  Gauge, 
  Sunrise, 
  Sparkles, 
  Info,
  Clock
} from 'lucide-react';
import { WeatherData, WeatherDay } from '../types';
import { t, translateDynamicText } from '../utils/translations';

interface WeatherMicroclimatePanelProps {
  currentLanguage?: string;
  weatherData: WeatherData | null;
  onRefreshWeather: (location?: string, lat?: number, lon?: number) => void;
  isLoading?: boolean;
}

const SRIKAKULAM_AND_AP_LOCATIONS = [
  { 
    name: 'Palasa - Kasibugga', 
    label: 'Palasa (Cashew & Rice Hub)', 
    district: 'Srikakulam, AP', 
    lat: 18.7733, 
    lon: 84.4173, 
    badge: 'Primary Station' 
  },
  { 
    name: 'Srikakulam District HQ', 
    label: 'Srikakulam Town', 
    district: 'Srikakulam, AP', 
    lat: 18.2949, 
    lon: 83.8938 
  },
  { 
    name: 'Tekkali', 
    label: 'Tekkali Mandal', 
    district: 'Srikakulam, AP', 
    lat: 18.6146, 
    lon: 84.2372 
  },
  { 
    name: 'Sompeta (Uddanam)', 
    label: 'Sompeta (Uddanam Coconut/Cashew)', 
    district: 'Srikakulam, AP', 
    lat: 18.9312, 
    lon: 84.5888 
  },
  { 
    name: 'Kalingapatnam Coastal', 
    label: 'Kalingapatnam Coast', 
    district: 'Srikakulam, AP', 
    lat: 18.3370, 
    lon: 84.1280 
  },
  { 
    name: 'Narasannapeta', 
    label: 'Narasannapeta', 
    district: 'Srikakulam, AP', 
    lat: 18.4239, 
    lon: 84.0450 
  },
  { 
    name: 'Rajam', 
    label: 'Rajam Agro', 
    district: 'Srikakulam, AP', 
    lat: 18.4552, 
    lon: 83.6558 
  },
  { 
    name: 'Vijayawada (Krishna Delta)', 
    label: 'Vijayawada', 
    district: 'NTR Dist, AP', 
    lat: 16.5062, 
    lon: 80.6480 
  },
  { 
    name: 'Guntur', 
    label: 'Guntur (Chilli Belt)', 
    district: 'Guntur, AP', 
    lat: 16.3067, 
    lon: 80.4365 
  }
];

export const WeatherMicroclimatePanel: React.FC<WeatherMicroclimatePanelProps> = ({
  currentLanguage = 'en',
  weatherData,
  onRefreshWeather,
  isLoading = false
}) => {
  const [customLocation, setCustomLocation] = useState('');
  const [isLocatingGPS, setIsLocatingGPS] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Handle live search
  const handleSearchInputChange = async (val: string) => {
    setCustomLocation(val);
    if (val.trim().length >= 2) {
      try {
        const res = await fetch(`/api/weather/search?q=${encodeURIComponent(val.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
          setShowSearchResults(true);
        }
      } catch (e) {
        console.warn('Autocomplete search failed:', e);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSelectSearchResult = (item: any) => {
    onRefreshWeather(item.name, item.lat, item.lon);
    setCustomLocation(item.name);
    setShowSearchResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customLocation.trim()) {
      onRefreshWeather(customLocation.trim());
      setShowSearchResults(false);
    }
  };

  // Browser GPS auto-detection
  const handleUseGPSLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocatingGPS(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onRefreshWeather(`GPS Field (${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E)`, latitude, longitude);
        setIsLocatingGPS(false);
      },
      (err) => {
        console.warn('GPS location error:', err);
        setGpsError('Could not access GPS. Please check location permissions.');
        setIsLocatingGPS(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  if (!weatherData) {
    return (
      <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#D5DDD2] flex items-center justify-center">
        <div className="text-center py-6">
          <CloudSun className="w-8 h-8 text-[#2D6A4F] animate-bounce mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#143021]">{t('weather_bar_label', currentLanguage, 'Loading Real-Time Microclimate Telemetry...')}</p>
        </div>
      </div>
    );
  }

  const today = weatherData.forecast[0] || {} as WeatherDay;
  const isPalasaStation = weatherData.locationName.toLowerCase().includes('palasa') || weatherData.locationName.toLowerCase().includes('kasibugga');

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2]">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-5 border-b border-[#E6EBE3] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold">3</span>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-[#143021] flex items-center gap-2">
              <span>{t('weather_panel_title', currentLanguage, 'Real-Time Weather & Microclimate Intelligence')}</span>
              {weatherData.isRealTimeLive && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  {t('live_real_data', currentLanguage, 'Live Real-World Data')}
                </span>
              )}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6754] mt-1 ml-9">
            {t('weather_panel_desc', currentLanguage, 'Real-world telemetry calibrated for Palasa - Kasibugga & Srikakulam District, Andhra Pradesh with live spore germination indices & spray windows.')}
          </p>
        </div>

        {/* Action Buttons & Location Search */}
        <div className="flex flex-wrap items-center gap-2 relative">
          <button
            onClick={handleUseGPSLocation}
            disabled={isLocatingGPS || isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EFF6EE] hover:bg-[#DDEBDB] border border-[#CBDCC7] rounded-xl text-xs font-semibold text-[#1B4332] transition-colors shadow-xs"
          >
            <Navigation className={`w-3.5 h-3.5 text-[#2D6A4F] ${isLocatingGPS ? 'animate-spin' : ''}`} />
            <span>{isLocatingGPS ? t('locating_gps', currentLanguage, 'Locating GPS...') : t('use_gps', currentLanguage, 'Use My GPS')}</span>
          </button>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#52796F]" />
              <input
                type="text"
                value={customLocation}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onFocus={() => { if (searchResults.length > 0) setShowSearchResults(true); }}
                placeholder={t('search_location_placeholder', currentLanguage, 'Search Palasa, Sompeta, Tekkali, AP...')}
                className="pl-8 pr-2.5 py-1.5 text-xs bg-[#F8FAF6] border border-[#CBDCC7] rounded-xl text-[#143021] placeholder-[#769380] focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none w-48 sm:w-56"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="ml-1.5 p-1.5 bg-[#2D6A4F] text-white hover:bg-[#1B4332] rounded-xl transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Autocomplete Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white border border-[#CBDCC7] rounded-xl shadow-lg z-30 py-1 max-h-56 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-bold text-[#52796F] uppercase border-b border-[#E6EBE3]">
                  Select Agro-Location
                </div>
                {searchResults.map((r, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSearchResult(r)}
                    className="w-full text-left px-3 py-2 hover:bg-[#F4F8F1] transition-colors border-b last:border-0 border-[#F0F4EE] flex flex-col"
                  >
                    <span className="text-xs font-bold text-[#143021]">{r.name}</span>
                    <span className="text-[10px] text-[#52796F]">{r.region}</span>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      {gpsError && (
        <div className="mb-4 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Srikakulam & Andhra Pradesh Regional Selector Chips */}
      <div className="mb-5">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="font-bold text-[#35583D] shrink-0 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Srikakulam & AP Stations:</span>
          </span>
          {SRIKAKULAM_AND_AP_LOCATIONS.map((loc) => {
            const isSelected = weatherData.locationName.toLowerCase().includes(loc.name.toLowerCase().split(' ')[0]);
            return (
              <button
                key={loc.name}
                onClick={() => onRefreshWeather(loc.name, loc.lat, loc.lon)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 whitespace-nowrap flex items-center gap-1.5 text-xs ${
                  isSelected
                    ? 'bg-[#1B4332] text-white font-semibold shadow-xs'
                    : 'bg-[#F4F8F1] hover:bg-[#E2EEDE] border border-[#CBDCC7] text-[#1B4332]'
                }`}
              >
                {loc.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
                <span>{loc.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Agro-Station Banner */}
      <div className="p-4 rounded-xl bg-[#F4F8F1] border border-[#C5D9C0] mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#143021] text-sm">{weatherData.locationName}</span>
              {weatherData.regionDetails && (
                <span className="text-[#52796F] font-medium">• {weatherData.regionDetails}</span>
              )}
            </div>
            <div className="text-[#4E6754] text-[11px] mt-0.5 flex flex-wrap items-center gap-3">
              <span>Coordinates: {weatherData.coordinates.lat.toFixed(4)}°N, {weatherData.coordinates.lon.toFixed(4)}°E</span>
              {weatherData.agroZone && (
                <span>• Agro-Zone: <strong className="text-[#1B4332]">{weatherData.agroZone}</strong></span>
              )}
            </div>
          </div>
        </div>

        {isPalasaStation && (
          <div className="bg-white px-3 py-1.5 rounded-lg border border-[#CBDCC7] text-[11px] text-[#1B4332] font-semibold flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Palasa Cashew & Srikakulam Paddy Belt Protocol Active</span>
          </div>
        )}
      </div>

      {/* Highlights Bar: Current Weather + Fungal Disease Index + Spray Suitability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Current Weather Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#143021] to-[#2D6A4F] text-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#D8F3DC] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {weatherData.locationName.split(' ')[0]} Telemetry
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#40916C] text-[#D8F3DC] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
              {t('live_real_data', currentLanguage, 'Real-World')}
            </span>
          </div>

          <div className="my-3 flex items-center justify-between">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {weatherData.currentTemp}°C
              </div>
              <div className="text-xs font-medium text-[#B7E4C7] mt-0.5">
                Feels like {weatherData.feelsLike ?? weatherData.currentTemp}°C • {translateDynamicText(weatherData.currentCondition, currentLanguage)}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <CloudSun className="w-7 h-7 text-[#D8F3DC]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-[#D8F3DC] pt-3 border-t border-white/15">
            <span className="flex items-center"><Droplets className="w-3.5 h-3.5 mr-1 text-[#74C69D]" /> {weatherData.currentHumidity}% Humidity</span>
            <span className="flex items-center"><Wind className="w-3.5 h-3.5 mr-1 text-[#95D5B2]" /> {weatherData.currentWind} km/h</span>
            <span className="flex items-center"><Gauge className="w-3.5 h-3.5 mr-1 text-[#74C69D]" /> {weatherData.currentPressure || 1012} hPa</span>
            <span className="flex items-center"><Sun className="w-3.5 h-3.5 mr-1 text-[#FEE440]" /> UV {today.uvIndex || 8.0}</span>
          </div>
        </div>

        {/* Fungal & Disease Spore Index Card */}
        <div className="p-5 rounded-2xl bg-[#F8FAF6] border border-[#D5DDD2] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
              {t('fungal_spore_index', currentLanguage, 'Fungal Spore Risk Index')}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
              today.fungalRisk === 'Severe' ? 'bg-rose-100 text-rose-800' :
              today.fungalRisk === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {translateDynamicText(today.fungalRisk, currentLanguage)} {t('disease_spread_risk', currentLanguage, 'Risk')}
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-center space-x-2 text-sm font-bold text-[#143021]">
              <ShieldAlert className={`w-5 h-5 ${today.fungalRisk === 'Severe' || today.fungalRisk === 'High' ? 'text-amber-600' : 'text-emerald-600'}`} />
              <span>{today.fungalRisk === 'Severe' || today.fungalRisk === 'High' ? 'High Coastal Spore Pressure' : 'Normal Spore Index'}</span>
            </div>
            <p className="text-xs text-[#52796F] mt-1 leading-relaxed">
              {today.humidity > 75 
                ? `Coastal humidity (${today.humidity}%) & temp (${today.tempMax}°C) trigger rapid sporulation for Blast, Cashew Anthracnose & Blight.` 
                : 'Dry ambient conditions suppress fungal spore multiplication.'}
            </p>
          </div>

          <div className="pt-2 border-t border-[#E6EBE3] flex items-center justify-between text-[11px] text-[#4E6754]">
            <span>Dew Point: <strong>{today.dewPoint ?? 22.5}°C</strong></span>
            <span>Delta-T (Drift): <strong>{today.deltaT ?? 4.8}°C</strong></span>
          </div>
        </div>

        {/* Spraying Suitability & Washoff Window */}
        <div className="p-5 rounded-2xl bg-[#F8FAF6] border border-[#D5DDD2] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
              {t('spraying_window_risk', currentLanguage, 'Chemical Spray Safety')}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
              today.sprayingSuitability.startsWith('Avoid') ? 'bg-red-100 text-red-800' :
              today.sprayingSuitability === 'Fair' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {today.sprayingSuitability === 'Excellent' ? t('status_optimal', currentLanguage, 'Optimal Window') : (today.sprayingSuitability === 'Fair' ? 'Caution' : 'Do Not Spray')}
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-center space-x-2 text-sm font-bold text-[#143021]">
              {today.sprayingSuitability === 'Excellent' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              )}
              <span>{translateDynamicText(today.sprayingSuitability, currentLanguage)}</span>
            </div>
            <p className="text-xs text-[#52796F] mt-1 leading-relaxed">
              {today.rainfallChance > 45 
                ? `Rain expected (${today.precipitationMm || 0} mm). Chemical application will wash off within 4h, wasting farmer investment.`
                : 'Safe spraying window: Apply during calm morning (6:30 AM - 9:30 AM) when wind < 12 km/h.'}
            </p>
          </div>

          <div className="pt-2 border-t border-[#E6EBE3] flex items-center justify-between text-[11px] text-[#2D6A4F] font-semibold">
            <span className="flex items-center"><CloudRain className="w-3.5 h-3.5 mr-1" /> Rain: {today.rainfallChance}% ({today.precipitationMm || 0} mm)</span>
            <span className="flex items-center"><Sunrise className="w-3.5 h-3.5 mr-1" /> Sun: {weatherData.sunrise || '5:48 AM'} - {weatherData.sunset || '6:15 PM'}</span>
          </div>
        </div>
      </div>

      {/* Hourly Spraying Window Bar (if available) */}
      {weatherData.hourlyForecast && weatherData.hourlyForecast.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-[#F8FAF6] border border-[#D5DDD2]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{t('hourly_spray_title', currentLanguage, 'Next 12 Hours: Precision Spray Window & Wind Velocity')}</span>
            </h3>
            <span className="text-[11px] text-[#52796F]">{t('safe_spray_note', currentLanguage, 'Green = Safe to spray')}</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {weatherData.hourlyForecast.map((h, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-center border text-xs flex flex-col justify-between ${
                  h.sprayingSafe
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="font-bold text-[11px]">{h.time}</div>
                <div className="text-xs font-extrabold my-1">{h.temp}°C</div>
                <div className="text-[10px] text-[#52796F]">{h.windSpeed} km/h</div>
                <div className="mt-1 font-semibold text-[9px]">
                  {h.sprayingSafe ? '✓ Safe' : '✗ Avoid'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5-Day Agricultural Weather & Action Forecast */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-3">
          {t('forecast_5day_title', currentLanguage, '5-Day Agricultural Weather & Field Advisory Forecast')}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {weatherData.forecast.map((day, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                idx === 0 ? 'bg-[#EFF5EB] border-[#A3C89B] shadow-xs' : 'bg-[#F9FBF8] border-[#E0E7DC]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#143021]">{day.day}</span>
                  <span className="text-[10px] text-[#6B8772]">{day.date}</span>
                </div>

                <div className="flex items-center space-x-2 my-2">
                  <div className="text-lg font-extrabold text-[#143021]">
                    {day.tempMax}°
                  </div>
                  <div className="text-xs text-[#6B8772]">
                    / {day.tempMin}°
                  </div>
                </div>

                <div className="text-[11px] text-[#2D6A4F] font-semibold mb-2 truncate">
                  {translateDynamicText(day.condition, currentLanguage)}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6EBE3] space-y-1.5 text-[10px]">
                <div className="flex justify-between text-[#52796F]">
                  <span>Rain Chance:</span>
                  <strong className="text-[#143021]">{day.rainfallChance}% ({day.precipitationMm || 0}mm)</strong>
                </div>
                <div className="flex justify-between text-[#52796F]">
                  <span>Humidity:</span>
                  <strong className="text-[#143021]">{day.humidity}%</strong>
                </div>
                <div className="flex justify-between text-[#52796F]">
                  <span>Wind:</span>
                  <strong className="text-[#143021]">{day.windSpeed} km/h</strong>
                </div>
                <div className="mt-2 p-2 rounded-lg bg-white border border-[#E0E7DC] text-[#2C4A36] font-medium leading-tight">
                  {translateDynamicText(day.farmAction, currentLanguage)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory Footer */}
      <div className="mt-5 p-3 rounded-xl bg-[#F8FAF6] border border-[#D5DDD2] text-xs text-[#4E6754] flex items-center gap-2">
        <Info className="w-4 h-4 text-[#2D6A4F] shrink-0" />
        <span><strong>Agro-Advisory:</strong> {translateDynamicText(weatherData.generalAdvisory, currentLanguage)}</span>
      </div>
    </div>
  );
};
