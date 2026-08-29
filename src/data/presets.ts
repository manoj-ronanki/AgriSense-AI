import { PresetCropScenario, SoilSensorData } from '../types';

export const PRESET_SCENARIOS: PresetCropScenario[] = [
  {
    id: 'case-img-01-tomato',
    cropName: 'Tomato (Solanum lycopersicum)',
    cropCategory: 'Solanaceous Vegetable (Case 1)',
    cropVariety: 'Pusa Ruby / Hybrid High-Yield',
    defaultGrowthStage: 'Vegetative to Early Flowering (40-60 DAS)',
    defaultPlantingDaysAgo: 52,
    photoUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb228cc?auto=format&fit=crop&w=800&q=80',
    photoDescription: 'CASE_IMG_01 (Tomato Early Blight): Concentric dark brown target-board spots with yellow halos on foliage caused by Alternaria solani.',
    soilDefaults: {
      ph: 6.2,
      nitrogen: 160,
      phosphorus: 28,
      potassium: 190,
      organicCarbon: 0.55,
      moisture: 72,
      temperature: 25.0,
      electricalConductivity: 1.1,
      source: 'preset_kaggle'
    },
    commonThreats: ['Early Blight (Alternaria solani)', 'Late Blight (Phytophthora)', 'Bacterial Spot', 'Tomato Hornworm'],
    sampleSymptoms: ['Concentric dark brown target-rings', 'Yellowing of lower / older leaves', 'Water-soaked black/brown rotting lesions'],
    customNote: 'Trained Benchmark CASE_IMG_01: Controlled with Mancozeb 75% WP @ 2 g/L or Azoxystrobin 23% SC @ 1 mL/L water.'
  },
  {
    id: 'case-img-02-rice',
    cropName: 'Rice / Paddy (Oryza sativa)',
    cropCategory: 'Cereal / Staple Grain (Case 2)',
    cropVariety: 'BPT 5204 (Samba Mahsuri) / MTU 1010',
    defaultGrowthStage: 'Active Tillering & Panicle Primordia (35-50 DAS)',
    defaultPlantingDaysAgo: 42,
    photoUrl: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80',
    photoDescription: 'CASE_IMG_02 (Rice Blast): Spindle-shaped diamond lesions with grayish-white centers and brownish-red borders on leaf blades (Magnaporthe oryzae).',
    soilDefaults: {
      ph: 5.8,
      nitrogen: 320, // Excess nitrogen triggers blast!
      phosphorus: 20,
      potassium: 160,
      organicCarbon: 0.85,
      moisture: 90,
      temperature: 26.5,
      electricalConductivity: 0.9,
      source: 'preset_kaggle'
    },
    commonThreats: ['Rice Leaf Blast (Magnaporthe oryzae)', 'Brown Plant Hopper (BPH)', 'Sheath Blight (Rhizoctonia)', 'Stem Borer'],
    sampleSymptoms: ['Spindle / eye-shaped spots with gray center (Blast)', 'General pale light-green canopy & stunted vigor', 'Downy grayish-purple cottony mold under leaves in morning'],
    customNote: 'Trained Benchmark CASE_IMG_02: Controlled with Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 mL/L.'
  },
  {
    id: 'case-img-03-chilli',
    cropName: 'Chilli (Capsicum annuum)',
    cropCategory: 'Spice & Cash Crop (Case 3)',
    cropVariety: 'Guntur Sannam (S4) / Teja Hybrid',
    defaultGrowthStage: 'Vegetative to Early Flowering (30-60 DAS)',
    defaultPlantingDaysAgo: 48,
    photoUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    photoDescription: 'CASE_IMG_03 (Chilli Leaf Curl & Dieback): Upward and downward leaf curling, puckering, necrosis on tips and stunted chlorotic leaves (Begomovirus & Thrips).',
    soilDefaults: {
      ph: 6.8,
      nitrogen: 180,
      phosphorus: 28,
      potassium: 220,
      organicCarbon: 0.60,
      moisture: 48,
      temperature: 30.0,
      electricalConductivity: 1.3,
      source: 'preset_kaggle'
    },
    commonThreats: ['Chilli Leaf Curl Begomovirus', 'Chilli Thrips (Scirtothrips dorsalis)', 'Whitefly (Bemisia tabaci)', 'Anthracnose / Fruit Rot'],
    sampleSymptoms: ['Upward leaf cupping & vein thickening', 'Whitefly swarms on leaf underside & sooty mold', 'Shortened internodes, bushy stunt dwarfism & bunching'],
    customNote: 'Trained Benchmark CASE_IMG_03: Controlled with Imidacloprid 17.8% SL @ 0.3 mL/L or Fipronil 5% SC @ 1.5 mL/L.'
  },
  {
    id: 'case-img-04-cotton',
    cropName: 'Cotton (Gossypium hirsutum)',
    cropCategory: 'Commercial Fiber Crop (Case 4)',
    cropVariety: 'Bt Cotton (Bollgard II / BG-II)',
    defaultGrowthStage: 'Squaring, Flowering & Boll Formation (60-90 DAS)',
    defaultPlantingDaysAgo: 75,
    photoUrl: 'https://images.unsplash.com/photo-1594488554238-6f81a7b8e1a3?auto=format&fit=crop&w=800&q=80',
    photoDescription: 'CASE_IMG_04 (Pink Bollworm): Rosetted flowers, pink caterpillars / larvae boring into squares and bolls with lint staining (Pectinophora gossypiella).',
    soilDefaults: {
      ph: 7.5,
      nitrogen: 200,
      phosphorus: 24,
      potassium: 260,
      organicCarbon: 0.52,
      moisture: 42,
      temperature: 31.5,
      electricalConductivity: 1.5,
      source: 'preset_kaggle'
    },
    commonThreats: ['Pink Bollworm (Pectinophora gossypiella)', 'American Bollworm', 'Cotton Leaf Curl Virus', 'Whitefly'],
    sampleSymptoms: ['Stem / shoot borer holes with sawdust-like frass', 'Premature shedding / dropping of flowers, buds, or pin-head fruit', 'Caterpillar / Armyworm windowpane feeding & holes'],
    customNote: 'Trained Benchmark CASE_IMG_04: Controlled with Emamectin Benzoate 5% SG @ 0.4 g/L or Chlorantraniliprole 18.5% SC @ 0.3 mL/L.'
  },
  {
    id: 'case-img-05-potato',
    cropName: 'Potato (Solanum tuberosum)',
    cropCategory: 'Tuber / Vegetable (Case 5)',
    cropVariety: 'Kufri Jyoti / Kufri Pukhraj',
    defaultGrowthStage: 'Tuber Bulking & Sizing (45-75 DAP)',
    defaultPlantingDaysAgo: 60,
    photoUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    photoDescription: 'CASE_IMG_05 / case_image6 (Potato Late Blight): Water-soaked dark brown/black lesions spreading rapidly from margins with white mildew under humid conditions (Phytophthora infestans).',
    soilDefaults: {
      ph: 5.9,
      nitrogen: 190,
      phosphorus: 35,
      potassium: 280,
      organicCarbon: 0.72,
      moisture: 82, // High moisture triggers late blight
      temperature: 17.5, // Cool and humid
      electricalConductivity: 1.2,
      source: 'preset_kaggle'
    },
    commonThreats: ['Late Blight (Phytophthora infestans)', 'Early Blight (Alternaria solani)', 'Potato Tuber Moth', 'Black Scurf'],
    sampleSymptoms: ['Water-soaked black/brown rotting lesions', 'Downy grayish-purple cottony mold under leaves in morning', 'Sudden daytime wilting / drooping despite moist soil'],
    customNote: 'Trained Benchmark CASE_IMG_05: Controlled with Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L water or Cymoxanil 8% + Mancozeb 64% WP @ 2 g/L.'
  },
  {
    id: 'palasa-cashew',
    cropName: 'Cashew (Anacardium occidentale)',
    cropCategory: 'Horticulture / Plantation (Palasa Belt)',
    cropVariety: 'BPP-8 / VRI-3 (Palasa Special Selection)',
    defaultGrowthStage: 'New Vegetative Flush & Panicle Emergence',
    defaultPlantingDaysAgo: 120,
    photoUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    photoDescription: 'Palasa Srikakulam orchard: Black necrotic scabs and resinous exudation on tender cashew shoots, with die-back caused by Tea Mosquito Bug and Anthracnose.',
    soilDefaults: {
      ph: 5.9,
      nitrogen: 180,
      phosphorus: 24,
      potassium: 230,
      organicCarbon: 0.62,
      moisture: 65,
      temperature: 28.5,
      electricalConductivity: 0.8,
      source: 'preset_kaggle'
    },
    commonThreats: ['Tea Mosquito Bug (Helopeltis antonii)', 'Cashew Anthracnose (Colletotrichum)', 'Cashew Stem & Root Borer (CSRB)', 'Powdery Mildew'],
    sampleSymptoms: ['Water-soaked black/brown rotting lesions', 'Premature shedding / dropping of flowers, buds, or pin-head fruit', 'Upward leaf cupping & vein thickening']
  }
];

export const SOIL_PARAM_STANDARDS: Record<string, { min: number; max: number; optimal: string; unit: string; description: string }> = {
  ph: { min: 6.0, max: 7.5, optimal: '6.5 - 7.0', unit: 'pH', description: 'Soil acidity/alkalinity influencing nutrient availability' },
  nitrogen: { min: 200, max: 350, optimal: '250 - 300', unit: 'kg/ha', description: 'Essential for vegetative growth and green chlorophyll synthesis' },
  phosphorus: { min: 20, max: 40, optimal: '25 - 35', unit: 'kg/ha', description: 'Crucial for root establishment, flowering, and energy transfer' },
  potassium: { min: 200, max: 350, optimal: '220 - 300', unit: 'kg/ha', description: 'Imparts disease resistance, drought tolerance, and fruit quality' },
  organicCarbon: { min: 0.5, max: 1.2, optimal: '0.75 - 1.0', unit: '%', description: 'Microbial activity, moisture retention, and soil structure health' },
  moisture: { min: 40, max: 70, optimal: '50 - 65', unit: '%', description: 'Water availability for plant uptake; >75% encourages root rot and fungal sporulation' },
  temperature: { min: 18, max: 30, optimal: '22 - 28', unit: '°C', description: 'Affects root respiration and soil bacterial nitrification rate' },
  electricalConductivity: { min: 0.4, max: 1.8, optimal: '0.8 - 1.5', unit: 'dS/m', description: 'Measure of soil salinity; >2.5 causes osmotic root burning' }
};
