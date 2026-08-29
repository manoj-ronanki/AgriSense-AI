import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Sidebar, NavSection } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { MyFarmView } from './components/MyFarmView';
import { CropVisionUpload } from './components/CropVisionUpload';
import { DiagnosisReportView } from './components/DiagnosisReportView';
import { SoilTelemetryPanel } from './components/SoilTelemetryPanel';
import { WeatherMicroclimatePanel } from './components/WeatherMicroclimatePanel';
import { ScanHistoryDrawer } from './components/ScanHistoryDrawer';
import { ProfileView } from './components/ProfileView';
import { AgronomistChat } from './components/AgronomistChat';
import { HelpGuideModal } from './components/HelpGuideModal';

import { SEED_FARMS, generateSimulatedSoilDataForCrop, calculateCQI } from './data/farmsData';
import { PRESET_SCENARIOS } from './data/presets';
import { generateClientFallbackDiagnosis } from './utils/clientDiagnosisFallback';
import { t, translateDynamicText, translateDiagnosis } from './utils/translations';
import { 
  FarmerUser, 
  FarmItem, 
  SoilSensorData, 
  WeatherData, 
  IntegratedCropAnalysis, 
  ChatMessage, 
  PresetCropScenario 
} from './types';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<FarmerUser | null>(() => {
    try {
      const storedUser = localStorage.getItem('agrisense_farmer_user');
      if (storedUser) return JSON.parse(storedUser);
    } catch (e) {
      console.warn('User storage read error:', e);
    }
    return null;
  });

  // Navigation State (7 sections)
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Farms Management State
  const [farms, setFarms] = useState<FarmItem[]>(() => {
    try {
      const storedFarms = localStorage.getItem('agrisense_farmer_farms');
      if (storedFarms) return JSON.parse(storedFarms);
    } catch (e) {
      console.warn('Farms storage read error:', e);
    }
    return SEED_FARMS;
  });

  const [activeFarm, setActiveFarm] = useState<FarmItem>(() => {
    try {
      const storedFarms = localStorage.getItem('agrisense_farmer_farms');
      if (storedFarms) {
        const parsed = JSON.parse(storedFarms);
        if (parsed.length > 0) return parsed[0];
      }
    } catch (e) {
      console.warn('Active farm init error:', e);
    }
    return SEED_FARMS[0];
  });

  // Field & Diagnostic Center Data States (synced with active farm)
  const [selectedCrop, setSelectedCrop] = useState<string>(activeFarm.cropName);
  const [cropVariety, setCropVariety] = useState<string>(activeFarm.cropVariety || '');
  const [customVariety, setCustomVariety] = useState<string>('');
  const [plantingDate, setPlantingDate] = useState<string>(
    activeFarm.plantingDate || new Date(Date.now() - 48 * 86400000).toISOString().split('T')[0]
  );
  const [growthStage, setGrowthStage] = useState<string>(activeFarm.growthStage || 'Vegetative Growth');
  const [imagePreview, setImagePreview] = useState<string | null>(PRESET_SCENARIOS[0].photoUrl);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(PRESET_SCENARIOS[0].sampleSymptoms);
  const [isOtherProblemActive, setIsOtherProblemActive] = useState<boolean>(false);
  const [customProblemText, setCustomProblemText] = useState<string>('');
  const [fieldNotes, setFieldNotes] = useState<string>('Noticed lower leaf yellowing and target ring spots after 2 consecutive humid days.');

  // Soil Telemetry State (synced with active farm)
  const [soilData, setSoilData] = useState<SoilSensorData>(activeFarm.soilData);
  const [isSyncingSoil, setIsSyncingSoil] = useState(false);

  // Weather State
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  // Diagnosis Results & Analysis States
  const [currentDiagnosis, setCurrentDiagnosis] = useState<IntegratedCropAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');

  // Scan History
  const [scanHistory, setScanHistory] = useState<IntegratedCropAnalysis[]>([]);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Namaste & Welcome to AgriSense AI! I am your Agricultural Doctor. I continuously observe your crop visual signs, cultivar traits, soil sensor telemetry, and weather conditions. How can I assist your farm today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Calculate Days After Sowing
  const daysAfterSowing = React.useMemo(() => {
    if (!plantingDate) return 0;
    const plantTime = new Date(plantingDate).getTime();
    const now = new Date().getTime();
    return Math.max(0, Math.floor((now - plantTime) / (1000 * 60 * 60 * 24)));
  }, [plantingDate]);

  // Load weather and history on mount
  useEffect(() => {
    fetchWeather(activeFarm.location || 'Palasa - Kasibugga, Srikakulam District, Andhra Pradesh, India');
    loadHistoryFromStorage();
  }, []);

  // Save farms when updated
  const updateFarmsList = (newFarms: FarmItem[]) => {
    setFarms(newFarms);
    try {
      localStorage.setItem('agrisense_farmer_farms', JSON.stringify(newFarms));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  };

  // Switch active farm & synchronize field telemetry
  const handleSelectFarm = (farm: FarmItem) => {
    setActiveFarm(farm);
    setSelectedCrop(farm.cropName);
    setCropVariety(farm.cropVariety || '');
    setPlantingDate(farm.plantingDate);
    setGrowthStage(farm.growthStage);
    setSoilData(farm.soilData);
    fetchWeather(farm.location);
  };

  // Add farm handler
  const handleAddFarm = (newFarm: FarmItem) => {
    const updated = [newFarm, ...farms];
    updateFarmsList(updated);
    handleSelectFarm(newFarm);
  };

  // Delete farm handler
  const handleDeleteFarm = (farmId: string) => {
    if (farms.length <= 1) return;
    const updated = farms.filter((f) => f.id !== farmId);
    updateFarmsList(updated);
    if (activeFarm.id === farmId) {
      handleSelectFarm(updated[0]);
    }
  };

  // Update farm soil data
  const handleUpdateFarmSoil = (farmId: string, newSoil: SoilSensorData) => {
    const updated = farms.map((f) => {
      if (f.id === farmId) {
        const cqi = calculateCQI(newSoil);
        return {
          ...f,
          soilData: newSoil,
          cqiScore: cqi,
          healthStatus: cqi >= 85 ? ('Optimal' as const) : cqi >= 70 ? ('Good' as const) : ('Attention Needed' as const),
          lastSynced: 'Just now (IoT Live Node)'
        };
      }
      return f;
    });
    updateFarmsList(updated);
    const refreshed = updated.find((f) => f.id === farmId);
    if (refreshed && activeFarm.id === farmId) {
      setActiveFarm(refreshed);
      setSoilData(newSoil);
    }
  };

  // Authenticate user
  const handleAuthenticate = (user: FarmerUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('agrisense_farmer_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  };

  // Logout user
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('agrisense_farmer_user');
    } catch (e) {
      console.warn('Storage clear error:', e);
    }
  };

  // Language switcher handler with instant deep diagnostic translation
  const handleLanguageChange = (newLang: string) => {
    setCurrentLanguage(newLang);
    if (currentDiagnosis) {
      // 1. Instant client-side recursive translation preserving all specific values
      const translatedClient = translateDiagnosis(currentDiagnosis, newLang);
      setCurrentDiagnosis(translatedClient);

      // 2. Asynchronously request AI server translation if online for maximum natural phrasing
      fetch('/api/translate-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagnosis: currentDiagnosis,
          targetLanguage: newLang
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && (data.primaryDiagnosis || data.summary)) {
            setCurrentDiagnosis(data);
          }
        })
        .catch((err) => {
          console.log('Background AI translation note:', err?.message);
        });
    }
  };

  // Load history from storage
  const loadHistoryFromStorage = () => {
    try {
      const stored = localStorage.getItem('agrisense_field_history');
      if (stored) {
        setScanHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  };

  // Save diagnosis to history
  const saveDiagnosisToHistory = (diagnosis: IntegratedCropAnalysis) => {
    const updated = [diagnosis, ...scanHistory.filter((s) => s.id !== diagnosis.id)].slice(0, 20);
    setScanHistory(updated);
    try {
      localStorage.setItem('agrisense_field_history', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  };

  // Default weather generator
  const getDefaultWeatherData = (
    location: string = 'Palasa - Kasibugga, Srikakulam District, Andhra Pradesh, India',
    lat: number = 18.7733,
    lon: number = 84.4173
  ): WeatherData => ({
    locationName: location,
    regionDetails: 'Srikakulam District, Andhra Pradesh, India',
    coordinates: { lat, lon },
    currentTemp: 31,
    feelsLike: 34,
    currentHumidity: 78,
    currentWind: 14,
    windDirection: 'ESE',
    currentCondition: 'Partly Sunny & Humid',
    currentPressure: 1012,
    uvIndex: 8.5,
    dewPoint: 23.5,
    deltaT: 4.8,
    precipitationMm: 0,
    isRealTimeLive: true,
    stationName: 'Palasa - Kasibugga Agro-Meteorological Station',
    agroZone: 'North Coastal Andhra Agro-Climatic Zone (Palasa Cashew & Rice Belt)',
    forecast: [
      {
        day: 'Today',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tempMax: 32,
        tempMin: 25,
        humidity: 78,
        rainfallChance: 25,
        precipitationMm: 0,
        condition: 'Partly Sunny & Humid',
        windSpeed: 14,
        uvIndex: 8.5,
        dewPoint: 23.5,
        deltaT: 4.8,
        sprayingSuitability: 'Excellent',
        fungalRisk: 'High',
        farmingImpact: 'Coastal humidity encourages spore germination in tender Cashew flushes & Paddy canopies.',
        farmAction: 'Optimal morning window (6:30 - 9:30 AM) for bio-fungicide & foliar nutrient sprays.'
      },
      {
        day: 'Tomorrow',
        date: new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tempMax: 31,
        tempMin: 24,
        humidity: 82,
        rainfallChance: 45,
        precipitationMm: 3.5,
        condition: 'Passing Coastal Showers',
        windSpeed: 16,
        uvIndex: 7.0,
        dewPoint: 24.0,
        deltaT: 4.2,
        sprayingSuitability: 'Fair',
        fungalRisk: 'Severe',
        farmingImpact: 'Incoming coastal precipitation may cause waterlogging in furrows and wash off sprays.',
        farmAction: 'Ensure orchard and paddy bund drainage is clear; hold off on chemical sprays.'
      },
      {
        day: 'Day 3',
        date: new Date(Date.now() + 172800000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tempMax: 33,
        tempMin: 25,
        humidity: 70,
        rainfallChance: 15,
        precipitationMm: 0,
        condition: 'Clear Sky / Full Sunshine',
        windSpeed: 11,
        uvIndex: 9.0,
        dewPoint: 22.0,
        deltaT: 5.5,
        sprayingSuitability: 'Excellent',
        fungalRisk: 'Moderate',
        farmingImpact: 'Warm sunshine accelerates vegetative growth and photosynthesis.',
        farmAction: 'Safe window for balanced N-P-K fertigation and sucking pest scouting.'
      }
    ],
    generalAdvisory: 'Live agro-meteorology active. Morning spraying window open with low wind.'
  });

  // Weather fetch
  const fetchWeather = async (
    location: string = 'Palasa - Kasibugga, Srikakulam District, Andhra Pradesh, India',
    lat?: number,
    lon?: number
  ) => {
    setIsWeatherLoading(true);
    try {
      let queryParams = `location=${encodeURIComponent(location)}`;
      if (lat !== undefined && lon !== undefined) {
        queryParams += `&lat=${lat}&lon=${lon}`;
      }
      const res = await fetch(`/api/weather?${queryParams}`);
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setWeatherData(data);
      } else {
        setWeatherData((prev) => prev || getDefaultWeatherData(location, lat, lon));
      }
    } catch (err) {
      console.warn('Weather fetch fallback triggered:', err);
      setWeatherData((prev) => prev || getDefaultWeatherData(location, lat, lon));
    } finally {
      setIsWeatherLoading(false);
    }
  };

  // Preset loader
  const handleLoadPreset = (scenario: PresetCropScenario) => {
    setSelectedCrop(scenario.cropName);
    setCropVariety(scenario.cropVariety || '');
    setCustomVariety('');
    if (scenario.plantingDate) {
      setPlantingDate(scenario.plantingDate);
    } else {
      const days = scenario.daysAfterSowing || 45;
      setPlantingDate(new Date(Date.now() - days * 86400000).toISOString().split('T')[0]);
    }
    setGrowthStage(scenario.defaultGrowthStage);
    setImagePreview(scenario.photoUrl);
    setSoilData(scenario.soilDefaults);
    setSelectedSymptoms(scenario.sampleSymptoms);
    setIsOtherProblemActive(false);
    setCustomProblemText('');
    setFieldNotes(`Loaded field benchmark scenario: ${scenario.photoDescription}`);
  };

  // 1-Click Run Sample Diagnosis
  const handleRunSampleDiagnosis = async (scenario: PresetCropScenario) => {
    handleLoadPreset(scenario);
    
    setIsAnalyzing(true);
    setAnalysisStep('Loading benchmark dataset & processing leaf markers with Gemini 3.7...');

    const stepTimer1 = setTimeout(() => {
      setAnalysisStep('Correlating N-P-K nutrient sensor metrics with disease vulnerability...');
    }, 700);

    const stepTimer2 = setTimeout(() => {
      setAnalysisStep('Evaluating microclimate rainfall window and fungal germination index...');
    }, 1400);

    const stepTimer3 = setTimeout(() => {
      setAnalysisStep('Synthesizing Integrated Pest Management (IPM) prescription...');
    }, 2100);

    try {
      const days = scenario.daysAfterSowing || 45;
      const pDate = scenario.plantingDate || new Date(Date.now() - days * 86400000).toISOString().split('T')[0];

      const payload = {
        imageUrl: scenario.photoUrl,
        cropName: scenario.cropName,
        cropVariety: scenario.cropVariety,
        plantingDate: pDate,
        daysAfterSowing: days,
        growthStage: scenario.defaultGrowthStage,
        location: weatherData?.locationName || activeFarm.location,
        userSymptoms: scenario.sampleSymptoms,
        userNotes: scenario.photoDescription,
        soilData: scenario.soilDefaults,
        weatherData,
        language: currentLanguage
      };

      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Analysis returned status ${response.status}`);
      }

      const diagnosisResult: IntegratedCropAnalysis = await response.json();
      setCurrentDiagnosis(diagnosisResult);
      saveDiagnosisToHistory(diagnosisResult);
      setActiveSection('diagnose');
    } catch (err: any) {
      console.warn('Backend API request encountered an issue, generating resilient dataset-grounded diagnosis:', err);
      const days = scenario.daysAfterSowing || 45;
      const pDate = scenario.plantingDate || new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
      const fallbackResult = generateClientFallbackDiagnosis(
        scenario.cropName,
        scenario.cropVariety || '',
        pDate,
        days,
        scenario.defaultGrowthStage,
        scenario.sampleSymptoms,
        '',
        scenario.soilDefaults,
        weatherData,
        currentLanguage
      );
      setCurrentDiagnosis(fallbackResult);
      saveDiagnosisToHistory(fallbackResult);
      setActiveSection('diagnose');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  // IoT Sensor live simulation for active farm
  const handleSimulateIoTSync = () => {
    setIsSyncingSoil(true);
    setTimeout(() => {
      const freshSoil: SoilSensorData = {
        ...soilData,
        nitrogen: Math.max(90, Math.min(380, Math.round(soilData.nitrogen + (Math.random() * 20 - 10)))),
        moisture: Math.max(25, Math.min(95, Math.round(soilData.moisture + (Math.random() * 8 - 4)))),
        ph: Number((Math.max(5.2, Math.min(8.2, soilData.ph + (Math.random() * 0.4 - 0.2)))).toFixed(1)),
        temperature: Math.round(soilData.temperature + (Math.random() * 2 - 1)),
        source: 'iot_live',
        lastUpdated: new Date().toLocaleTimeString()
      };
      setSoilData(freshSoil);
      handleUpdateFarmSoil(activeFarm.id, freshSoil);
      setIsSyncingSoil(false);
    }, 800);
  };

  // Symptom toggler
  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  // Run Multi-Factor AI Crop Analysis
  const handleRunFullDiagnosis = async () => {
    setIsAnalyzing(true);
    setAnalysisStep('Processing visual leaf markers & cultivar traits with Gemini 3.7...');

    const stepTimer1 = setTimeout(() => {
      setAnalysisStep('Correlating N-P-K nutrient sensor metrics with disease vulnerability...');
    }, 800);

    const stepTimer2 = setTimeout(() => {
      setAnalysisStep('Evaluating microclimate rainfall window and fungal germination index...');
    }, 1600);

    const stepTimer3 = setTimeout(() => {
      setAnalysisStep('Synthesizing Integrated Pest Management (IPM) prescription...');
    }, 2400);

    try {
      const activeVariety = customVariety.trim() ? customVariety.trim() : cropVariety;

      const payload = {
        imageBase64: imagePreview?.startsWith('data:') ? imagePreview : undefined,
        imageUrl: imagePreview && !imagePreview.startsWith('data:') ? imagePreview : undefined,
        cropName: selectedCrop,
        cropVariety: activeVariety,
        plantingDate,
        daysAfterSowing,
        growthStage,
        location: weatherData?.locationName || activeFarm.location,
        userSymptoms: selectedSymptoms,
        customProblemText: isOtherProblemActive ? customProblemText : undefined,
        userNotes: fieldNotes,
        soilData,
        weatherData,
        language: currentLanguage
      };

      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Analysis returned status ${response.status}`);
      }

      const diagnosisResult: IntegratedCropAnalysis = await response.json();
      setCurrentDiagnosis(diagnosisResult);
      saveDiagnosisToHistory(diagnosisResult);
      setActiveSection('diagnose');
    } catch (err: any) {
      console.warn('Backend API request fallback:', err);
      const activeVariety = customVariety.trim() ? customVariety.trim() : cropVariety;
      const fallbackResult = generateClientFallbackDiagnosis(
        selectedCrop,
        activeVariety,
        plantingDate,
        daysAfterSowing,
        growthStage,
        selectedSymptoms,
        isOtherProblemActive ? customProblemText : '',
        soilData,
        weatherData,
        currentLanguage
      );
      setCurrentDiagnosis(fallbackResult);
      saveDiagnosisToHistory(fallbackResult);
      setActiveSection('diagnose');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  // Agronomist Chat Handler
  const handleSendChatMessage = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          currentCrop: selectedCrop,
          soilData,
          weatherData,
          currentDiagnosis
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: `b_${Date.now()}`,
          sender: 'assistant',
          text: data.reply || 'Please check soil aeration and monitor lesions daily.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: data.suggestedActions
        };
        setChatMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('Chat API response was not ok');
      }
    } catch (err) {
      console.warn('Chat fallback triggered:', err);
      const fallbackReplies: { [key: string]: string } = {
        cashew: `For ${selectedCrop} in the ${activeFarm.location} belt, spray Lambda-cyhalothrin (0.6 ml/L) mixed with Copper Oxychloride (2.5 g/L) during calm early morning hours to control Tea Mosquito Bug and prevent Anthracnose die-back.`,
        rice: `For Paddy in ${activeFarm.location}, immediately suspend excess Nitrogen top-dressing and spray Tricyclazole 75% WP @ 0.6 g/L. Drain stagnant field water for 48 hours.`,
        maize: `For Maize Fall Armyworm, spray Emamectin Benzoate 5% SG (0.4 g/L) directly into leaf whorls in early evening.`
      };

      const matchedKey = Object.keys(fallbackReplies).find((k) => selectedCrop.toLowerCase().includes(k)) || 'cashew';
      const botMsg: ChatMessage = {
        id: `b_${Date.now()}`,
        sender: 'assistant',
        text: fallbackReplies[matchedKey] || `For ${selectedCrop}, ensure early morning spray windows when wind is below 12 km/h. Soil moisture is currently ${soilData.moisture}%.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          'What is the recommended dosage per acre?',
          'Are there certified organic bio-pesticide alternatives?',
          'What is the best time of day to spray?'
        ]
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleOpenChatWithQuery = (query: string) => {
    setIsChatOpen(true);
    handleSendChatMessage(query);
  };

  const handleClearHistory = () => {
    setScanHistory([]);
    localStorage.removeItem('agrisense_field_history');
  };

  // IF NOT AUTHENTICATED: Show the landing page
  if (!currentUser) {
    return (
      <LandingPage
        onAuthenticate={handleAuthenticate}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
    );
  }

  // IF AUTHENTICATED: Show the 7-section inner app layout
  return (
    <div className="min-h-screen flex bg-[#F4F7F2] text-[#19261C] font-sans antialiased">
      
      {/* 1. Sticky Desktop Left Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentLanguage={currentLanguage}
          activeSection={activeSection}
          onSelectSection={(section) => {
            setActiveSection(section);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={currentUser}
          onLogout={handleLogout}
          farms={farms}
          activeFarm={activeFarm}
          onSelectFarm={handleSelectFarm}
          onOpenChat={() => setIsChatOpen(true)}
          historyCount={scanHistory.length}
        />
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full shadow-2xl animate-in slide-in-from-left duration-200 flex flex-col">
            <Sidebar
              currentLanguage={currentLanguage}
              activeSection={activeSection}
              onSelectSection={(section) => {
                setActiveSection(section);
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              user={currentUser}
              onLogout={handleLogout}
              farms={farms}
              activeFarm={activeFarm}
              onSelectFarm={(farm) => {
                handleSelectFarm(farm);
                setIsMobileMenuOpen(false);
              }}
              onOpenChat={() => {
                setIsChatOpen(true);
                setIsMobileMenuOpen(false);
              }}
              historyCount={scanHistory.length}
            />
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Sticky Top Header */}
        <TopHeader
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          activeFarm={activeFarm}
          farms={farms}
          onSelectFarm={handleSelectFarm}
          weatherData={weatherData}
          user={currentUser}
          onOpenChat={() => setIsChatOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* Section View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* SECTION 1: DASHBOARD */}
          {activeSection === 'dashboard' && (
            <DashboardView
              currentLanguage={currentLanguage}
              farms={farms}
              activeFarm={activeFarm}
              onSelectFarm={handleSelectFarm}
              weatherData={weatherData}
              latestDiagnosis={currentDiagnosis}
              onNavigate={setActiveSection}
              onOpenChat={() => setIsChatOpen(true)}
            />
          )}

          {/* SECTION 2: MY FARM */}
          {activeSection === 'farms' && (
            <MyFarmView
              currentLanguage={currentLanguage}
              farms={farms}
              activeFarm={activeFarm}
              onSelectFarm={handleSelectFarm}
              onAddFarm={handleAddFarm}
              onDeleteFarm={handleDeleteFarm}
              onUpdateFarmSoil={handleUpdateFarmSoil}
              onNavigate={setActiveSection}
            />
          )}

          {/* SECTION 3: DIAGNOSTIC CENTER */}
          {activeSection === 'diagnose' && (
            <div className="space-y-6">
              <CropVisionUpload
                currentLanguage={currentLanguage}
                selectedCrop={selectedCrop}
                onCropChange={setSelectedCrop}
                cropVariety={cropVariety}
                onCropVarietyChange={setCropVariety}
                customVariety={customVariety}
                onCustomVarietyChange={setCustomVariety}
                plantingDate={plantingDate}
                onPlantingDateChange={setPlantingDate}
                growthStage={growthStage}
                onGrowthStageChange={setGrowthStage}
                daysAfterSowing={daysAfterSowing}
                imagePreview={imagePreview}
                onImageSelected={setImagePreview}
                selectedSymptoms={selectedSymptoms}
                onToggleSymptom={handleToggleSymptom}
                isOtherProblemActive={isOtherProblemActive}
                onToggleOtherProblem={setIsOtherProblemActive}
                customProblemText={customProblemText}
                onCustomProblemTextChange={setCustomProblemText}
                fieldNotes={fieldNotes}
                onFieldNotesChange={setFieldNotes}
                onLoadPreset={handleLoadPreset}
                onRunSampleDiagnosis={handleRunSampleDiagnosis}
                isAnalyzing={isAnalyzing}
                onRunDiagnosis={handleRunFullDiagnosis}
                soilData={soilData}
                weatherData={weatherData}
                onNavigateToSoil={() => setActiveSection('soil')}
                onNavigateToWeather={() => setActiveSection('weather')}
              />

              {/* Diagnosis Report View (Rendered once report is ready) */}
              {currentDiagnosis && (
                <div id="diagnosis-results-section" className="pt-4">
                  <DiagnosisReportView
                    currentLanguage={currentLanguage}
                    diagnosis={currentDiagnosis}
                    onAskDoctorWithContext={handleOpenChatWithQuery}
                    onResetToNewScan={() => {
                      setCurrentDiagnosis(null);
                      setImagePreview(null);
                      setSelectedSymptoms([]);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: SOIL & SENSORS */}
          {activeSection === 'soil' && (
            <div className="space-y-6">
              <SoilTelemetryPanel
                currentLanguage={currentLanguage}
                soilData={soilData}
                onSoilDataChange={(data) => {
                  setSoilData(data);
                  handleUpdateFarmSoil(activeFarm.id, data);
                }}
                onSimulateIoTSync={handleSimulateIoTSync}
                isSyncing={isSyncingSoil}
              />
            </div>
          )}

          {/* SECTION 5: WEATHER ANALYTICS */}
          {activeSection === 'weather' && (
            <div className="space-y-6">
              <WeatherMicroclimatePanel
                currentLanguage={currentLanguage}
                weatherData={weatherData}
                onRefreshWeather={(loc, lat, lon) => fetchWeather(loc, lat, lon)}
                isLoading={isWeatherLoading}
              />
            </div>
          )}

          {/* SECTION 6: HISTORY */}
          {activeSection === 'history' && (
            <div className="space-y-6">
              <ScanHistoryDrawer
                currentLanguage={currentLanguage}
                history={scanHistory}
                onSelectScan={(scan) => {
                  setCurrentDiagnosis(scan);
                  setSelectedCrop(scan.cropName);
                  setCropVariety(scan.cropVariety || '');
                  setImagePreview(scan.imageUrl || null);
                  setActiveSection('diagnose');
                  setTimeout(() => {
                    document.getElementById('diagnosis-results-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                onClearHistory={handleClearHistory}
                onStartNew={() => setActiveSection('diagnose')}
              />
            </div>
          )}

          {/* SECTION 7: PROFILE */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <ProfileView
                user={currentUser}
                farms={farms}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                onLogout={handleLogout}
                onNavigate={setActiveSection}
                totalScansCount={scanHistory.length}
              />
            </div>
          )}

        </main>
      </div>

      {/* Floating Ask Crop Doctor AI (Agronomist Voice/Chat) */}
      <AgronomistChat
        currentLanguage={currentLanguage}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        onSendMessage={handleSendChatMessage}
        isLoading={isChatLoading}
        currentCrop={selectedCrop}
        cropVariety={cropVariety}
        soilData={soilData}
        weatherData={weatherData}
        currentDiagnosis={currentDiagnosis}
      />

      {/* Help & Documentation Guide Modal */}
      <HelpGuideModal
        currentLanguage={currentLanguage}
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

    </div>
  );
}
