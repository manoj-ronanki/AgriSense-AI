import { FarmItem, SoilSensorData } from '../types';

export const SEED_FARMS: FarmItem[] = [
  {
    id: 'farm_palasa_cashew',
    name: 'Palasa Cashew Orchard (East Block)',
    cropName: 'Cashew (జీడిమామిడి)',
    cropVariety: 'BPP-8 (High Yield)',
    areaAcres: 4.5,
    location: 'Palasa - Kasibugga, Srikakulam District, AP',
    plantingDate: '2025-06-15',
    growthStage: 'Vegetative Flush & Panicle Emergence',
    soilTexture: 'Red Sandy Loam',
    cqiScore: 84,
    healthStatus: 'Good',
    lastSynced: 'Just now (Live IoT)',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&auto=format&fit=crop&q=80',
    expectedYieldQuintalsPerAcre: 8.5,
    soilData: {
      ph: 5.9,
      nitrogen: 165,
      phosphorus: 24,
      potassium: 190,
      organicCarbon: 0.52,
      moisture: 38,
      temperature: 28,
      electricalConductivity: 0.95,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'iot_live'
    }
  },
  {
    id: 'farm_krishna_paddy',
    name: 'Krishna Delta Wet Paddy (Plot 2A)',
    cropName: 'Paddy / Rice (వరి)',
    cropVariety: 'BPT-5204 (Samba Mahsuri)',
    areaAcres: 6.0,
    location: 'Guntur / Vijayawada Rural, AP',
    plantingDate: '2026-07-01',
    growthStage: 'Tillering to Panicle Initiation',
    soilTexture: 'Alluvial Clay Loam',
    cqiScore: 92,
    healthStatus: 'Optimal',
    lastSynced: '12 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1536704689299-247d8e87498c?w=600&auto=format&fit=crop&q=80',
    expectedYieldQuintalsPerAcre: 28.0,
    soilData: {
      ph: 6.8,
      nitrogen: 240,
      phosphorus: 38,
      potassium: 280,
      organicCarbon: 0.72,
      moisture: 72,
      temperature: 26,
      electricalConductivity: 1.4,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'iot_live'
    }
  },
  {
    id: 'farm_godavari_maize',
    name: 'Godavari Uplands Maize Field',
    cropName: 'Maize / Corn (మొక్కజొన్న)',
    cropVariety: 'Pioneer 3396 (Hybrid)',
    areaAcres: 3.2,
    location: 'Eluru / Rajahmundry Belt, AP',
    plantingDate: '2026-07-20',
    growthStage: 'Knee-high (V6 stage)',
    soilTexture: 'Black Cotton Loam',
    cqiScore: 76,
    healthStatus: 'Attention Needed',
    lastSynced: '25 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    expectedYieldQuintalsPerAcre: 35.0,
    soilData: {
      ph: 7.4,
      nitrogen: 140, // Deficient N
      phosphorus: 18,
      potassium: 210,
      organicCarbon: 0.48,
      moisture: 45,
      temperature: 29,
      electricalConductivity: 1.1,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'iot_live'
    }
  }
];

export function generateSimulatedSoilDataForCrop(cropName: string, soilTexture: string): SoilSensorData {
  const cropLower = cropName.toLowerCase();
  let basePh = 6.5;
  let baseN = 200;
  let baseP = 28;
  let baseK = 220;
  let baseMoisture = 50;
  let baseOC = 0.6;

  if (cropLower.includes('cashew')) {
    basePh = 5.8 + (Math.random() * 0.4 - 0.2);
    baseN = 160 + Math.floor(Math.random() * 30);
    baseP = 22 + Math.floor(Math.random() * 8);
    baseK = 180 + Math.floor(Math.random() * 40);
    baseMoisture = 35 + Math.floor(Math.random() * 10);
    baseOC = 0.5 + +(Math.random() * 0.1).toFixed(2);
  } else if (cropLower.includes('rice') || cropLower.includes('paddy') || cropLower.includes('వరి')) {
    basePh = 6.6 + (Math.random() * 0.4 - 0.2);
    baseN = 230 + Math.floor(Math.random() * 40);
    baseP = 35 + Math.floor(Math.random() * 12);
    baseK = 270 + Math.floor(Math.random() * 50);
    baseMoisture = 70 + Math.floor(Math.random() * 15);
    baseOC = 0.7 + +(Math.random() * 0.15).toFixed(2);
  } else if (cropLower.includes('cotton')) {
    basePh = 7.5 + (Math.random() * 0.4 - 0.2);
    baseN = 180 + Math.floor(Math.random() * 30);
    baseP = 25 + Math.floor(Math.random() * 10);
    baseK = 240 + Math.floor(Math.random() * 40);
    baseMoisture = 42 + Math.floor(Math.random() * 12);
    baseOC = 0.55 + +(Math.random() * 0.1).toFixed(2);
  } else if (cropLower.includes('tomato') || cropLower.includes('chili') || cropLower.includes('pepper')) {
    basePh = 6.4 + (Math.random() * 0.4 - 0.2);
    baseN = 210 + Math.floor(Math.random() * 35);
    baseP = 32 + Math.floor(Math.random() * 10);
    baseK = 250 + Math.floor(Math.random() * 45);
    baseMoisture = 55 + Math.floor(Math.random() * 10);
    baseOC = 0.65 + +(Math.random() * 0.1).toFixed(2);
  } else {
    // General crops like Maize, Wheat, Pulses
    basePh = 6.8 + (Math.random() * 0.4 - 0.2);
    baseN = 190 + Math.floor(Math.random() * 40);
    baseP = 26 + Math.floor(Math.random() * 10);
    baseK = 215 + Math.floor(Math.random() * 40);
    baseMoisture = 48 + Math.floor(Math.random() * 12);
    baseOC = 0.58 + +(Math.random() * 0.1).toFixed(2);
  }

  // Adjust for soil texture
  if (soilTexture.toLowerCase().includes('sandy')) {
    baseMoisture = Math.max(25, baseMoisture - 12);
    baseN = Math.max(120, baseN - 25);
  } else if (soilTexture.toLowerCase().includes('clay') || soilTexture.toLowerCase().includes('black')) {
    baseMoisture = Math.min(85, baseMoisture + 10);
    baseK = baseK + 25;
  }

  return {
    ph: +basePh.toFixed(1),
    nitrogen: Math.round(baseN),
    phosphorus: Math.round(baseP),
    potassium: Math.round(baseK),
    organicCarbon: +baseOC.toFixed(2),
    moisture: Math.round(baseMoisture),
    temperature: 27 + Math.floor(Math.random() * 4),
    electricalConductivity: +(0.9 + Math.random() * 0.6).toFixed(2),
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    source: 'iot_live'
  };
}

export function calculateCQI(soil: SoilSensorData, weatherFungalRisk: string = 'Low'): number {
  let score = 85;

  // pH score (optimal 6.0 - 7.5)
  if (soil.ph >= 6.0 && soil.ph <= 7.5) {
    score += 5;
  } else if (soil.ph < 5.5 || soil.ph > 8.0) {
    score -= 10;
  }

  // Nitrogen score
  if (soil.nitrogen >= 180 && soil.nitrogen <= 300) {
    score += 5;
  } else if (soil.nitrogen < 150) {
    score -= 12;
  }

  // Moisture score
  if (soil.moisture >= 35 && soil.moisture <= 75) {
    score += 4;
  } else if (soil.moisture < 25) {
    score -= 15; // severe drought stress
  }

  // Weather risk
  if (weatherFungalRisk === 'High' || weatherFungalRisk === 'Severe') {
    score -= 8;
  }

  return Math.min(98, Math.max(45, Math.round(score)));
}
