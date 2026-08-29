export interface SoilSensorData {
  ph: number; // e.g. 6.2
  nitrogen: number; // kg/ha (e.g. 180)
  phosphorus: number; // kg/ha (e.g. 24)
  potassium: number; // kg/ha (e.g. 220)
  organicCarbon: number; // % (e.g. 0.55)
  moisture: number; // % (e.g. 42)
  temperature: number; // °C (e.g. 26)
  electricalConductivity: number; // dS/m (e.g. 1.2)
  lastUpdated?: string;
  source?: 'iot_live' | 'lab_test' | 'preset_kaggle' | 'manual';
}

export interface HourlyWeatherPoint {
  time: string; // e.g. "06:00"
  temp: number;
  humidity: number;
  rainChance: number;
  windSpeed: number;
  sprayingSafe: boolean;
}

export interface WeatherDay {
  day: string; // 'Today', 'Tomorrow', 'Wed'
  date: string; // 'Aug 29'
  tempMax: number;
  tempMin: number;
  humidity: number; // %
  rainfallChance: number; // 0-100%
  precipitationMm?: number;
  condition: string; // 'Sunny', 'Rainy', 'Cloudy', 'Thunderstorm', 'Humid'
  windSpeed: number; // km/h
  windDirection?: string;
  uvIndex?: number;
  dewPoint?: number;
  deltaT?: number; // Evaporative drift delta
  sprayingSuitability: 'Excellent' | 'Fair' | 'Avoid - High Drift/Rain Washout';
  fungalRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  farmingImpact: string;
  farmAction: string;
}

export interface WeatherData {
  locationName: string;
  regionDetails?: string;
  coordinates: { lat: number; lon: number };
  currentTemp: number;
  feelsLike?: number;
  currentHumidity: number;
  currentWind: number;
  windDirection?: string;
  currentCondition: string;
  currentPressure?: number;
  uvIndex?: number;
  dewPoint?: number;
  deltaT?: number;
  precipitationMm?: number;
  sunrise?: string;
  sunset?: string;
  isRealTimeLive?: boolean;
  stationName?: string;
  agroZone?: string;
  hourlyForecast?: HourlyWeatherPoint[];
  forecast: WeatherDay[];
  generalAdvisory: string;
}

export interface PestDiseaseRisk {
  name: string;
  scientificName?: string;
  type: 'fungal' | 'bacterial' | 'viral' | 'insect_pest' | 'oomycete' | 'nutrient_deficiency' | 'environmental_stress';
  probabilityScore: number; // 0 - 100
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  symptomsObserved: string[];
  correlatedWeatherFactor: string;
  correlatedSoilFactor: string;
}

export interface ActionStep {
  priority: 'Immediate (0-24 hrs)' | 'Short Term (2-4 days)' | 'Preventive / Maintenance' | string;
  title: string;
  description: string;
  type: 'spray' | 'fertilizer' | 'irrigation' | 'cultural' | 'biological' | string;
  productName?: string;
  dosage?: string;
  safetyNote?: string;
}

export interface IntegratedCropAnalysis {
  id: string;
  timestamp: string;
  cropName: string;
  cropVariety?: string;
  stageOfGrowth: string;
  plantingDate?: string;
  daysAfterSowing?: number;
  primaryDiagnosis: string;
  confidence: 'High confidence (>85%)' | 'Moderate confidence (60-85%)' | 'Preliminary screening (needs confirmation)' | string;
  confidencePercentage: number;
  severityLevel: 'Healthy' | 'Mild' | 'Moderate' | 'Severe' | 'Critical' | string;
  summary: string;
  visualMarkerFindings: string[];
  
  // Multi-factor fusion breakdowns
  soilCorrelation: {
    status: 'Optimal' | 'Contributing to Stress' | 'Deficiency Detected' | string;
    details: string;
    suggestedAmendments: string[];
  };
  weatherCorrelation: {
    diseaseSpreadRisk: 'Low' | 'Moderate' | 'High' | 'Extremely High' | string;
    sprayingWindowAlert: string;
    irrigationRecommendation: string;
  };
  pestsAndDiseasesIdentified: PestDiseaseRisk[];
  
  actionPlan: ActionStep[];
  organicRemedies: { title: string; recipeOrMethod: string }[];
  chemicalTreatments: { tradeName: string; activeIngredient: string; dosagePerAcre: string; waitingPeriodDays: number }[];
  
  expertNote: string;
  followUpChecklist: string[];
}

export interface PresetCropScenario {
  id: string;
  cropName: string;
  cropCategory: string;
  cropVariety?: string;
  plantingDate?: string;
  daysAfterSowing?: number;
  defaultGrowthStage: string;
  defaultPlantingDaysAgo?: number;
  photoUrl: string;
  photoDescription: string;
  soilDefaults: SoilSensorData;
  commonThreats: string[];
  sampleSymptoms: string[];
  customNote?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  model?: string;
  suggestedActions?: string[];
}

export interface ChatThread {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface FarmItem {
  id: string;
  name: string;
  cropName: string;
  cropVariety: string;
  areaAcres: number;
  location: string;
  plantingDate: string;
  growthStage: string;
  soilTexture: string;
  soilData: SoilSensorData;
  cqiScore: number; // Crop Quality Index (0-100)
  healthStatus: 'Optimal' | 'Attention Needed' | 'Critical Stress' | 'Good';
  lastSynced: string;
  imageUrl?: string;
  expectedYieldQuintalsPerAcre: number;
}

export interface FarmerUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  authMethod: 'google' | 'phone' | 'email';
  avatarUrl?: string;
  location: string;
  joinedDate: string;
  preferredLanguage: string;
}
