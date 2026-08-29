// ============================================================================
// AGRI-INTELLIGENCE KNOWLEDGE ENGINE GROUNDED ON 5 MAJOR KAGGLE BENCHMARKS:
// 1. Pestopia: Indian Pests & Pesticides Dataset (shruthisindhura/pestopia)
// 2. Crop & Soil Dataset (shankarpriya2913/crop-and-soil-dataset)
// 3. Crop Yield Data with Soil & Weather Dataset (anshumish/crop-yield-data-with-soil-and-weather-dataset)
// 4. PlantVillage Dataset (Plant Pathology & Computer Vision Taxonomy)
// 5. Agriculture & Farming Dataset (bhadramohit/agriculture-and-farming-dataset)
// ============================================================================

export interface PestopiaEntry {
  pestName: string;
  scientificName: string;
  targetCrops: string[];
  pestType: 'chewing_insect' | 'sucking_pest' | 'borer' | 'fungal_pathogen' | 'bacterial' | 'viral_vector' | 'mite' | 'nematode';
  damageSymptoms: string[];
  economicThresholdLevel: string;
  chemicalPesticides: {
    tradeName: string;
    activeIngredient: string;
    cibrcDosagePerLiter: string;
    cibrcDosagePerAcre: string;
    waterVolumeLiters: number;
    waitingPeriodDays: number; // Pre-Harvest Interval (PHI)
    modeOfAction: string;
  }[];
  bioPesticidesAndOrganic: {
    productOrAgent: string;
    formulation: string;
    dosage: string;
    applicationMethod: string;
  }[];
}

export interface CropSoilThreshold {
  cropName: string;
  idealSoilTypes: string[];
  phRange: { min: number; optimal: number; max: number };
  nitrogenKgHa: { min: number; optimal: number; max: number };
  phosphorusKgHa: { min: number; optimal: number; max: number };
  potassiumKgHa: { min: number; optimal: number; max: number };
  moisturePercent: { min: number; optimal: number; max: number };
  organicCarbonPercent: { min: number; optimal: number };
  deficiencySymptoms: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    zincOrBoron: string;
  };
  recommendedFertilizerRegime: string;
}

export interface WeatherDiseaseRiskModel {
  diseaseOrPest: string;
  hostCrops: string[];
  temperatureRangeC: { min: number; optimalMin: number; optimalMax: number; max: number };
  relativeHumidityThresholdPercent: number;
  favorableWeatherTrigger: string;
  rainWashoffRiskHours: number;
  spraySafetyWindowRule: string;
  irrigationAction: string;
}

export interface PlantVillageClass {
  classId: string;
  crop: string;
  condition: string;
  isHealthy: boolean;
  visualLesionDescription: string;
  leafSurfaceSignature: string;
  progressionPattern: string;
  confusableLookalikes: string[];
}

export interface AgriFarmingLifecycle {
  crop: string;
  totalDurationDays: number;
  stages: {
    stageName: string;
    dasRange: string; // Days after sowing
    criticalActivities: string[];
    waterRequirementMm: number;
    fertilizerDose: string;
    keyThreats: string[];
  }[];
  ipmTierStrategy: {
    cultural: string[];
    mechanical: string[];
    biological: string[];
    chemicalThreshold: string;
  };
}

// ----------------------------------------------------------------------------
// 1. PESTOPIA: INDIAN PESTS & PESTICIDES DATASET
// ----------------------------------------------------------------------------
export const PESTOPIA_DATABASE: PestopiaEntry[] = [
  {
    pestName: 'Whitefly (Bemisia tabaci)',
    scientificName: 'Bemisia tabaci (Gennadius)',
    targetCrops: ['Cotton', 'Tomato', 'Chili', 'Brinjal / Eggplant', 'Okra / Bhendi', 'Soybean', 'Papaya'],
    pestType: 'sucking_pest',
    damageSymptoms: [
      'Chlorotic speckling and yellowing on upper leaf surfaces',
      'Sticky honeydew secretion leading to black sooty mold (Capnodium spp.)',
      'Upward leaf curling and severe vectoring of Cotton Leaf Curl Virus (CLCuV) & Tomato Yellow Leaf Curl Virus (TYLCV)',
      'Severe stunting of young shoots and blossom drop'
    ],
    economicThresholdLevel: '6-8 adults/nymphs per leaf in middle/lower canopy',
    chemicalPesticides: [
      {
        tradeName: 'Sefina (Afidopyropen 50 g/L DC)',
        activeIngredient: 'Afidopyropen 50 g/L DC',
        cibrcDosagePerLiter: '2.0 ml/L',
        cibrcDosagePerAcre: '400 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 7,
        modeOfAction: 'IRAC Group 9D - Chordotonal organ TRPV channel modulator'
      },
      {
        tradeName: 'Pegasus (Diafenthiuron 50% WP)',
        activeIngredient: 'Diafenthiuron 50% WP',
        cibrcDosagePerLiter: '1.25 g/L',
        cibrcDosagePerAcre: '250 g in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 14,
        modeOfAction: 'IRAC Group 12A - Inhibitor of mitochondrial ATP synthase'
      },
      {
        tradeName: 'Confidor (Imidacloprid 17.8% SL)',
        activeIngredient: 'Imidacloprid 17.8% SL',
        cibrcDosagePerLiter: '0.3 - 0.5 ml/L',
        cibrcDosagePerAcre: '60 - 80 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 15,
        modeOfAction: 'IRAC Group 4A - Neonicotinoid nAChR agonist'
      },
      {
        tradeName: 'Lano / Pyriproxyfen 10% EC',
        activeIngredient: 'Pyriproxyfen 10% EC',
        cibrcDosagePerLiter: '1.5 ml/L',
        cibrcDosagePerAcre: '300 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 10,
        modeOfAction: 'IRAC Group 7C - Juvenile hormone mimic (IGR)'
      }
    ],
    bioPesticidesAndOrganic: [
      {
        productOrAgent: 'Neem Oil (Azadirachtin 10,000 PPM)',
        formulation: 'Cold pressed Azadirachtin EC',
        dosage: '3-5 ml per Liter water with 1 ml organic surfactant',
        applicationMethod: 'Foliar spray on leaf undersides early morning or evening'
      },
      {
        productOrAgent: 'Beauveria bassiana 1.15% WP',
        formulation: 'Entomopathogenic fungal bio-inoculant (1x10^8 CFU/g)',
        dosage: '5 g per Liter water',
        applicationMethod: 'Targeted spray during high humidity (>75%) cool evening hours'
      },
      {
        productOrAgent: 'Yellow Sticky Traps',
        formulation: '20x30 cm UV-resistant sticky sheets',
        dosage: '15-20 traps per acre',
        applicationMethod: 'Erected at canopy height facing prevailing wind'
      }
    ]
  },
  {
    pestName: 'Tomato Fruit Borer / American Bollworm (Helicoverpa armigera)',
    scientificName: 'Helicoverpa armigera (Hübner)',
    targetCrops: ['Tomato', 'Cotton', 'Chickpea', 'Pigeon Pea', 'Maize / Corn', 'Chili'],
    pestType: 'borer',
    damageSymptoms: [
      'Circular bore holes on tomato fruits and cotton bolls with caterpillar half inside',
      'Frass (fecal pellets) accumulated near entrance holes',
      'Premature rotting and secondary bacterial invasion inside fruit cavity',
      'Skeletonized floral buds and shedding of young fruit trusses'
    ],
    economicThresholdLevel: '1 larva per meter row or 5% fruit damage',
    chemicalPesticides: [
      {
        tradeName: 'Coragen (Chlorantraniliprole 18.5% SC)',
        activeIngredient: 'Chlorantraniliprole 18.5% SC',
        cibrcDosagePerLiter: '0.3 - 0.4 ml/L',
        cibrcDosagePerAcre: '60 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 3,
        modeOfAction: 'IRAC Group 28 - Ryanodine receptor modulator'
      },
      {
        tradeName: 'Fame (Flubendiamide 39.35% SC)',
        activeIngredient: 'Flubendiamide 39.35% SC',
        cibrcDosagePerLiter: '0.25 ml/L',
        cibrcDosagePerAcre: '50 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 5,
        modeOfAction: 'IRAC Group 28 - Ryanodine receptor modulator'
      },
      {
        tradeName: 'Proclaim (Emamectin Benzoate 5% SG)',
        activeIngredient: 'Emamectin Benzoate 5% SG',
        cibrcDosagePerLiter: '0.5 g/L',
        cibrcDosagePerAcre: '80 - 100 g in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 3,
        modeOfAction: 'IRAC Group 6 - Glutamate-gated chloride channel allosteric activator'
      }
    ],
    bioPesticidesAndOrganic: [
      {
        productOrAgent: 'Helicoverpa NPV (HaNPV 100 LE/acre)',
        formulation: 'Nuclear Polyhedrosis Virus viral suspension',
        dosage: '250 LE/ha or 1.5 ml/L + 0.1% jaggery as feeding attractant',
        applicationMethod: 'Spray on young 1st and 2nd instar larvae in late afternoon'
      },
      {
        productOrAgent: 'Bacillus thuringiensis var. kurstaki (Bt 8% WP)',
        formulation: 'Endotoxin crystalline protein (53,000 SU/mg)',
        dosage: '1.5 - 2.0 g per Liter water',
        applicationMethod: 'Foliar spray covering flower trusses and tender fruits'
      },
      {
        productOrAgent: 'Helilure Pheromone Traps',
        formulation: 'Funnel traps with synthetic sex pheromone septa',
        dosage: '5-8 traps per acre',
        applicationMethod: 'Installed 30 cm above crop canopy for monitoring & mating disruption'
      }
    ]
  },
  {
    pestName: 'Apple Scab (Venturia inaequalis)',
    scientificName: 'Venturia inaequalis (Cooke) G. Wint.',
    targetCrops: ['Apple', 'Pear'],
    pestType: 'fungal_pathogen',
    damageSymptoms: [
      'Olive-green to velvety dark brown lesions on foliage with feathery margins',
      'Distorted, scabby, cracked fruit lesions causing stunted unmarketable apples',
      'Premature summer defoliation and reduction in fruit bud initiation for next year',
      'Corky necrotic blisters on twigs and sepals'
    ],
    economicThresholdLevel: '1 lesion per 100 leaves during pink bud / petal fall stage',
    chemicalPesticides: [
      {
        tradeName: 'Score 250 EC (Difenoconazole 25% EC)',
        activeIngredient: 'Difenoconazole 25% EC',
        cibrcDosagePerLiter: '0.3 ml/L',
        cibrcDosagePerAcre: '60 - 80 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 14,
        modeOfAction: 'FRAC Group 3 - Demethylation Inhibitor (DMI/Triazole)'
      },
      {
        tradeName: 'Antracol 70% WP (Propineb)',
        activeIngredient: 'Propineb 70% WP',
        cibrcDosagePerLiter: '3.0 g/L',
        cibrcDosagePerAcre: '600 g in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 21,
        modeOfAction: 'FRAC Group M03 - Multi-site contact dithiocarbamate'
      },
      {
        tradeName: 'Nativo 75 WG (Tebuconazole 50% + Trifloxystrobin 25% WG)',
        activeIngredient: 'Tebuconazole 50% + Trifloxystrobin 25% WG',
        cibrcDosagePerLiter: '0.4 g/L',
        cibrcDosagePerAcre: '80 g in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 15,
        modeOfAction: 'FRAC Group 3 + 11 - Dual systemic DMI + QoI Strobilurin'
      }
    ],
    bioPesticidesAndOrganic: [
      {
        productOrAgent: 'Liquid Lime Sulfur (32° Baumé)',
        formulation: 'Polysulfide sulfur solution',
        dosage: '15-20 ml per Liter water (dormant) or 2 ml/L (summer)',
        applicationMethod: 'Dormant wash and pink bud spray to prevent ascospore discharge'
      },
      {
        productOrAgent: 'Bacillus subtilis QST 713 (Serenade ASO)',
        formulation: 'Bio-fungicidal bacterial spores (1x10^9 CFU/g)',
        dosage: '3 - 4 ml per Liter water',
        applicationMethod: 'Preventive application covering blossoming clusters'
      },
      {
        productOrAgent: '5% Agricultural Urea Orchard Floor Wash',
        formulation: 'Nitrogenous leaf digestion catalyst',
        dosage: '5 kg Urea in 100 Liters water',
        applicationMethod: 'Post-harvest spray on fallen leaves to decompose overwintering pseudothecia'
      }
    ]
  },
  {
    pestName: 'Rice Blast (Magnaporthe oryzae / Pyricularia oryzae)',
    scientificName: 'Magnaporthe oryzae (B.C. Couch)',
    targetCrops: ['Rice / Paddy', 'Finger Millet / Ragi', 'Wheat'],
    pestType: 'fungal_pathogen',
    damageSymptoms: [
      'Spindle-shaped elliptical lesions with grayish-white centers and brownish-red borders on leaves',
      'Collar rot at leaf junction causing complete leaf sheath collapse',
      'Neck rot causing black girdling at panicle base and empty chaffy whiteheads',
      'Rapid field burning effect during high humidity and dense nitrogen fertilization'
    ],
    economicThresholdLevel: '2-5% leaf area infected or 1 neck blast lesion per 10 hills',
    chemicalPesticides: [
      {
        tradeName: 'Beam 75% WP (Tricyclazole 75% WP)',
        activeIngredient: 'Tricyclazole 75% WP',
        cibrcDosagePerLiter: '0.6 g/L',
        cibrcDosagePerAcre: '120 g in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 30,
        modeOfAction: 'FRAC Group 16.1 - Melanin biosynthesis inhibitor (MBI-D)'
      },
      {
        tradeName: 'Amistar Top (Azoxystrobin 18.2% + Difenoconazole 11.4% SC)',
        activeIngredient: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
        cibrcDosagePerLiter: '1.0 ml/L',
        cibrcDosagePerAcre: '200 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 21,
        modeOfAction: 'FRAC Group 11 + 3 - Broad spectrum preventive & curative'
      },
      {
        tradeName: 'Bavistin (Carbendazim 50% WP)',
        activeIngredient: 'Carbendazim 50% WP',
        cibrcDosagePerLiter: '1.0 g/L',
        cibrcDosagePerAcre: '200 g in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 25,
        modeOfAction: 'FRAC Group 1 - Beta-tubulin mitosis inhibitor'
      }
    ],
    bioPesticidesAndOrganic: [
      {
        productOrAgent: 'Pseudomonas fluorescens (1% WP)',
        formulation: 'Plant Growth Promoting Rhizobacteria PGPR (2x10^8 CFU/g)',
        dosage: '10 g/kg seed treatment + 5 g/L foliar spray',
        applicationMethod: 'Seed soaking and foliar spray at tillering stage'
      },
      {
        productOrAgent: 'Trichoderma harzianum Bio-Fungicide',
        formulation: 'Antagonistic fungal spores (2x10^6 CFU/g)',
        dosage: '5 g/L foliar spray + 2.5 kg/acre in compost',
        applicationMethod: 'Basal soil enrichment and preventive foliar coating'
      },
      {
        productOrAgent: 'Silica / Potassium Silicate Foliar Spray',
        formulation: 'Liquid orthosilicic acid (OSA)',
        dosage: '2 ml per Liter water',
        applicationMethod: 'Foliar spray to deposit biogenic silica layer in leaf epidermis'
      }
    ]
  },
  {
    pestName: 'Fall Armyworm (Spodoptera frugiperda)',
    scientificName: 'Spodoptera frugiperda (J.E. Smith)',
    targetCrops: ['Maize / Corn', 'Sorghum', 'Sugarcane', 'Rice'],
    pestType: 'chewing_insect',
    damageSymptoms: [
      'Characteristic pinhole feeding and window-paning on whorl leaves',
      'Severe shot-hole damage with heavy sawdust-like frass clogging the central whorl',
      'Head capsule exhibiting distinct inverted Y-shaped suture',
      'Four dark spots arranged in a square on the 8th abdominal segment of the caterpillar'
    ],
    economicThresholdLevel: '5% damaged plants in seedling stage; 10% in mid-whorl stage',
    chemicalPesticides: [
      {
        tradeName: 'Delegate (Spinetoram 11.7% SC)',
        activeIngredient: 'Spinetoram 11.7% SC',
        cibrcDosagePerLiter: '0.5 ml/L',
        cibrcDosagePerAcre: '100 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 14,
        modeOfAction: 'IRAC Group 5 - Nicotinic acetylcholine receptor allosteric modulator'
      },
      {
        tradeName: 'Ampligo (Chlorantraniliprole 9.3% + Lambda-cyhalothrin 4.6% ZC)',
        activeIngredient: 'Chlorantraniliprole + Lambda-cyhalothrin',
        cibrcDosagePerLiter: '0.4 ml/L',
        cibrcDosagePerAcre: '80 - 100 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 14,
        modeOfAction: 'IRAC Group 28 + 3A - Dual nerve & muscle action'
      },
      {
        tradeName: 'Exponus (Broflanilide 300 g/L SC)',
        activeIngredient: 'Broflanilide 300 g/L SC',
        cibrcDosagePerLiter: '0.08 ml/L',
        cibrcDosagePerAcre: '17 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 7,
        modeOfAction: 'IRAC Group 30 - GABA-gated chloride channel allosteric modulator'
      }
    ],
    bioPesticidesAndOrganic: [
      {
        productOrAgent: 'Metarhizium rileyi / anisopliae Bio-Pesticide',
        formulation: 'Entomopathogenic green muscardine fungus (1x10^8 CFU/g)',
        dosage: '5 g per Liter water',
        applicationMethod: 'Directed whorl application during dusk'
      },
      {
        productOrAgent: 'Poison Sand-Ash Baiting in Whorls',
        formulation: 'Sand + Wood Ash + 5% Neem seed powder mixture (9:1)',
        dosage: 'Pinch application per whorl',
        applicationMethod: 'Dropped manually into infested whorls to suffocate and irritate young larvae'
      },
      {
        productOrAgent: 'Spodoptera frugiperda Pheromone Traps',
        formulation: 'Funnel trap with FAW lure',
        dosage: '5-6 traps per acre',
        applicationMethod: 'Placed 1 foot above crop canopy'
      }
    ]
  },
  {
    pestName: 'Early & Late Leaf Blight (Alternaria solani & Phytophthora infestans)',
    scientificName: 'Alternaria solani / Phytophthora infestans',
    targetCrops: ['Potato', 'Tomato', 'Eggplant'],
    pestType: 'fungal_pathogen',
    damageSymptoms: [
      'Early Blight: Target-board concentric brown-black rings surrounded by yellow chlorotic halo on older leaves',
      'Late Blight: Water-soaked pale green to dark brown lesions rapidly expanding from leaf edges with white mildew on undersides during morning dew',
      'Brown purplish dry rot under potato tuber skin and greasy firm tomato fruit rot',
      'Total field collapse within 48-72 hours under cool foggy wet weather'
    ],
    economicThresholdLevel: '1st appearance of water-soaked lesions under favorable blight forecasting conditions',
    chemicalPesticides: [
      {
        tradeName: 'Ridomil Gold MZ 68 WG (Metalaxyl-M 4% + Mancozeb 64% WG)',
        activeIngredient: 'Metalaxyl-M 4% + Mancozeb 64% WG',
        cibrcDosagePerLiter: '2.5 g/L',
        cibrcDosagePerAcre: '500 g in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 7,
        modeOfAction: 'FRAC Group 4 + M03 - Systemic RNA Polymerase I + Multi-site contact'
      },
      {
        tradeName: 'Cabrio Top (Pyraclostrobin 5% + Metiram 55% WG)',
        activeIngredient: 'Pyraclostrobin 5% + Metiram 55% WG',
        cibrcDosagePerLiter: '3.0 g/L',
        cibrcDosagePerAcre: '600 g in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 7,
        modeOfAction: 'FRAC Group 11 + M03 - Premium curative and protective'
      },
      {
        tradeName: 'Revus (Mandipropamid 23.4% SC)',
        activeIngredient: 'Mandipropamid 23.4% SC',
        cibrcDosagePerLiter: '0.8 ml/L',
        cibrcDosagePerAcre: '160 ml in 200L water',
        waterVolumeLiters: 200,
        waitingPeriodDays: 3,
        modeOfAction: 'FRAC Group 40 - Phospholipid biosynthesis and cell wall synthesis inhibitor'
      }
    ],
    bioPesticidesAndOrganic: [
      {
        productOrAgent: 'Bordeaux Mixture (1:1:100)',
        formulation: 'Copper sulphate + Quicklime in water',
        dosage: '10 g Copper Sulphate + 10 g Lime in 1 Liter water',
        applicationMethod: 'Thorough preventive foliar spray prior to rain'
      },
      {
        productOrAgent: 'Trichoderma viride 1.5% WP',
        formulation: 'Bio-fungicide (2x10^8 CFU/g)',
        dosage: '5 g/L spray + 2.5 kg/acre soil application with FYM',
        applicationMethod: 'Seed tuber dip and preventive canopy wash'
      }
    ]
  }
];

// ----------------------------------------------------------------------------
// 2. CROP AND SOIL DATASET (shankarpriya2913/crop-and-soil-dataset)
// ----------------------------------------------------------------------------
export const CROP_SOIL_DATABASE: Record<string, CropSoilThreshold> = {
  Tomato: {
    cropName: 'Tomato',
    idealSoilTypes: ['Well-drained Sandy Loam', 'Alluvial Red Loam', 'Clay Loam with good drainage'],
    phRange: { min: 6.0, optimal: 6.5, max: 7.5 },
    nitrogenKgHa: { min: 140, optimal: 220, max: 280 },
    phosphorusKgHa: { min: 40, optimal: 75, max: 100 },
    potassiumKgHa: { min: 120, optimal: 240, max: 320 },
    moisturePercent: { min: 50, optimal: 65, max: 80 },
    organicCarbonPercent: { min: 0.5, optimal: 0.85 },
    deficiencySymptoms: {
      nitrogen: 'Uniform pale yellowing (chlorosis) beginning on older lower leaves; thin erect stems; small fruits.',
      phosphorus: 'Dark purplish-bronze coloration on leaf undersides and main veins; delayed flowering; poor root expansion.',
      potassium: 'Marginal leaf scorch, curling leaf tips, uneven fruit ripening (yellow shoulder / blotchy ripening).',
      zincOrBoron: 'Boron deficiency causes blossom end rot and internal fruit corking; Zinc causes mottled interveinal chlorosis.'
    },
    recommendedFertilizerRegime: 'Basal: 50% N + 100% P + 50% K (e.g. 10:26:26). Top dress remaining N & K in 3 splits at 25, 45, and 65 DAS.'
  },
  Apple: {
    cropName: 'Apple',
    idealSoilTypes: ['Deep Loamy Soil', 'Well-drained Rich Mountain Clay Loam', 'High Organic Matter Alluvial'],
    phRange: { min: 5.8, optimal: 6.5, max: 7.2 },
    nitrogenKgHa: { min: 120, optimal: 180, max: 240 },
    phosphorusKgHa: { min: 45, optimal: 80, max: 110 },
    potassiumKgHa: { min: 150, optimal: 280, max: 360 },
    moisturePercent: { min: 55, optimal: 70, max: 85 },
    organicCarbonPercent: { min: 0.75, optimal: 1.2 },
    deficiencySymptoms: {
      nitrogen: 'Short terminal shoots, pale light-green leaves, premature autumn leaf fall.',
      phosphorus: 'Dull dark-green leaves turning bronze; stunted root proliferation in young orchard trees.',
      potassium: 'Marginal leaf necrosis (edge browning), poor fruit color development, reduced fruit firmness and storability.',
      zincOrBoron: 'Boron deficiency leads to internal cork spots in apple flesh and rosette terminal buds; Zinc causes Little Leaf.'
    },
    recommendedFertilizerRegime: 'Apply 700g N, 350g P2O5, 700g K2O per bearing tree basin in December-January along with 40-50 kg well-decomposed FYM.'
  },
  Cotton: {
    cropName: 'Cotton',
    idealSoilTypes: ['Deep Black Regur Soil', 'Medium Alluvial Clay Loam', 'Sandy Loam with subsurface moisture'],
    phRange: { min: 6.5, optimal: 7.5, max: 8.5 },
    nitrogenKgHa: { min: 160, optimal: 240, max: 300 },
    phosphorusKgHa: { min: 35, optimal: 60, max: 80 },
    potassiumKgHa: { min: 100, optimal: 200, max: 280 },
    moisturePercent: { min: 45, optimal: 60, max: 75 },
    organicCarbonPercent: { min: 0.4, optimal: 0.7 },
    deficiencySymptoms: {
      nitrogen: 'Stunted plant height, pale lower foliage, premature square and young boll shedding.',
      phosphorus: 'Dark green stunted leaves, delayed squaring and delayed boll opening.',
      potassium: 'Cotton Rust / Marginal leaf bronzing, yellow mottling between veins, premature leaf drop and small bolls.',
      zincOrBoron: 'Boron deficiency causes ringed bolls and square abscission; Magnesium causes purplish-red leaves (Lalya).'
    },
    recommendedFertilizerRegime: 'Apply 120:60:60 kg N:P2O5:K2O/ha. Basal: 20% N + 100% P + 50% K. Remaining N & K split at Square Initiation (35 DAS) and Peak Flowering (65 DAS).'
  },
  Rice: {
    cropName: 'Rice / Paddy',
    idealSoilTypes: ['Clayey Loam', 'Submerged Alluvial Soils', 'Heavy Black Soils with high water holding capacity'],
    phRange: { min: 5.5, optimal: 6.5, max: 7.8 },
    nitrogenKgHa: { min: 180, optimal: 260, max: 340 },
    phosphorusKgHa: { min: 30, optimal: 55, max: 80 },
    potassiumKgHa: { min: 90, optimal: 160, max: 220 },
    moisturePercent: { min: 70, optimal: 90, max: 100 },
    organicCarbonPercent: { min: 0.6, optimal: 0.9 },
    deficiencySymptoms: {
      nitrogen: 'Yellowing of older leaves, reduced tillering, short erect stunted panicles.',
      phosphorus: 'Dirty dark green leaves, erect thin tillers, delayed panicle emergence and high chaffiness.',
      potassium: 'Dark brown marginal leaf scorch on older leaves, poor grain filling, lodging susceptibility and blast proneness.',
      zincOrBoron: 'Zinc deficiency (Khaira disease) causes rust-brown blotches and streaks on lower leaves within 2-3 weeks after transplanting.'
    },
    recommendedFertilizerRegime: 'Apply 120:60:40 kg N:P2O5:K2O/ha + 25 kg Zinc Sulphate/ha. N in 3 splits: 50% Basal + 25% Active Tillering + 25% Panicle Initiation.'
  },
  Maize: {
    cropName: 'Maize / Corn',
    idealSoilTypes: ['Deep Alluvial Loam', 'Red Loam', 'Well-drained Silt Loam rich in organic matter'],
    phRange: { min: 5.8, optimal: 6.8, max: 7.8 },
    nitrogenKgHa: { min: 180, optimal: 280, max: 350 },
    phosphorusKgHa: { min: 40, optimal: 70, max: 95 },
    potassiumKgHa: { min: 100, optimal: 190, max: 260 },
    moisturePercent: { min: 50, optimal: 68, max: 80 },
    organicCarbonPercent: { min: 0.5, optimal: 0.8 },
    deficiencySymptoms: {
      nitrogen: 'V-shaped chlorosis extending from leaf tip along the midrib down the leaf on older foliage.',
      phosphorus: 'Distinct reddish-purple bands and margins on seedling leaves and stems.',
      potassium: 'Marginal browning and firing of lower leaves starting from tip along edges.',
      zincOrBoron: 'Zinc deficiency (White Bud) causes broad bleached white to pale yellow bands between midrib and edge of young leaves.'
    },
    recommendedFertilizerRegime: 'Apply 150:60:40 kg N:P2O5:K2O/ha. Basal: 33% N + 100% P + 100% K. Remaining N top-dressed at Knee-high (30 DAS) and Tasseling (55 DAS).'
  }
};

// ----------------------------------------------------------------------------
// 3. CROP YIELD & WEATHER CORRELATION DATASET
// ----------------------------------------------------------------------------
export const WEATHER_DISEASE_RISK_MODELS: WeatherDiseaseRiskModel[] = [
  {
    diseaseOrPest: 'Fungal Blight & Leaf Spots (Early/Late Blight, Scab, Blast)',
    hostCrops: ['Apple', 'Tomato', 'Potato', 'Rice', 'Grapes', 'Chili'],
    temperatureRangeC: { min: 14, optimalMin: 18, optimalMax: 26, max: 32 },
    relativeHumidityThresholdPercent: 80,
    favorableWeatherTrigger: 'Continuous leaf wetness > 6 hours accompanied by relative humidity > 80% and temperatures between 18°C - 26°C.',
    rainWashoffRiskHours: 4,
    spraySafetyWindowRule: 'Never spray within 4 hours before expected rainfall. Add 0.5 ml/L organosilicone sticker to protect against dew washoff.',
    irrigationAction: 'Strictly avoid overhead sprinkler irrigation; switch to root-zone drip irrigation to keep foliage completely dry.'
  },
  {
    diseaseOrPest: 'Sucking Pests & Mites (Whiteflies, Thrips, Aphids, Spider Mites)',
    hostCrops: ['Cotton', 'Tomato', 'Chili', 'Okra', 'Papaya', 'Apple'],
    temperatureRangeC: { min: 24, optimalMin: 28, optimalMax: 36, max: 44 },
    relativeHumidityThresholdPercent: 60, // Thrives under low to moderate humidity
    favorableWeatherTrigger: 'Prolonged hot dry spells with low relative humidity (<60%) and bright sunshine accelerating egg-to-adult reproduction cycles.',
    rainWashoffRiskHours: 2,
    spraySafetyWindowRule: 'Spray during early morning (6:00 AM - 9:00 AM) when insects are calm and wind velocity is < 8 km/h.',
    irrigationAction: 'Maintain regular light soil moisture; avoid severe moisture stress which forces pests into lush terminal shoots.'
  },
  {
    diseaseOrPest: 'Bacterial Wilt & Bacterial Leaf Spot (Ralstonia, Xanthomonas)',
    hostCrops: ['Tomato', 'Potato', 'Chili', 'Paddy', 'Citrus'],
    temperatureRangeC: { min: 24, optimalMin: 28, optimalMax: 35, max: 40 },
    relativeHumidityThresholdPercent: 85,
    favorableWeatherTrigger: 'Waterlogged soil conditions coupled with high temperatures (28-35°C) and heavy storm splashing causing mechanical wounds.',
    rainWashoffRiskHours: 6,
    spraySafetyWindowRule: 'Apply bactericides (Copper Oxychloride 50 WP + Streptocycline 100 ppm) immediately after storm events.',
    irrigationAction: 'Dig deep drainage trenches immediately; do not let standing water stagnate around crop root collars.'
  }
];

// ----------------------------------------------------------------------------
// 4. PLANTVILLAGE DATASET COMPUTER VISION TAXONOMY (38 Classes)
// ----------------------------------------------------------------------------
export const PLANTVILLAGE_CLASSES: PlantVillageClass[] = [
  {
    classId: 'apple_scab',
    crop: 'Apple',
    condition: 'Apple Scab (Venturia inaequalis)',
    isHealthy: false,
    visualLesionDescription: 'Olive-green, velvety spots on upper leaf surface turning dark brown to black with age, often puckered or distorted.',
    leafSurfaceSignature: 'Velvety fungal sporulation with indistinct feathery margins.',
    progressionPattern: 'Begins on young expanding leaves in spring, expanding into corky fruit lesions that crack.',
    confusableLookalikes: ['Cedar Apple Rust (has bright orange pycnia)', 'Alternaria blotch']
  },
  {
    classId: 'apple_black_rot',
    crop: 'Apple',
    condition: 'Black Rot (Botryosphaeria obtusa)',
    isHealthy: false,
    visualLesionDescription: 'Frogeye leaf spots with small purple specks expanding into circular lesions with tan centers and purple borders.',
    leafSurfaceSignature: 'Concentric tan rings with distinct purple borders ("frog-eye").',
    progressionPattern: 'Foliar spots lead to black mummified rotting fruit hanging on the tree.',
    confusableLookalikes: ['Cedar apple rust', 'Magnesium deficiency']
  },
  {
    classId: 'apple_cedar_rust',
    crop: 'Apple',
    condition: 'Cedar Apple Rust (Gymnosporangium juniperi-virginianae)',
    isHealthy: false,
    visualLesionDescription: 'Bright yellow-orange circular spots on the upper leaf surface with tiny black dots (spermagonia) in the center.',
    leafSurfaceSignature: 'Raised yellow-orange lesions on top; tubular aecia structures on underside.',
    progressionPattern: 'Appears 10-14 days after blossom; causes heavy defoliation in susceptible cultivars.',
    confusableLookalikes: ['Apple scab', 'Leaf miner tunnels']
  },
  {
    classId: 'apple_healthy',
    crop: 'Apple',
    condition: 'Healthy Foliage',
    isHealthy: true,
    visualLesionDescription: 'Uniform deep green leaves, smooth surface, no discoloration, necrosis, or pest frass.',
    leafSurfaceSignature: 'Intact cuticle with vibrant chlorophyll coloration.',
    progressionPattern: 'Normal vegetative and fruit development.',
    confusableLookalikes: []
  },
  {
    classId: 'tomato_early_blight',
    crop: 'Tomato',
    condition: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    visualLesionDescription: 'Dark brown to black concentric target-like rings (concentric zones) surrounded by prominent yellow chlorotic halos.',
    leafSurfaceSignature: 'Dry, papery concentric rings on older lower leaves.',
    progressionPattern: 'Ascends from lower canopy upwards; leaves turn brown, wither, and drop.',
    confusableLookalikes: ['Septoria leaf spot (smaller spots with black pycnidia)', 'Target spot']
  },
  {
    classId: 'tomato_late_blight',
    crop: 'Tomato',
    condition: 'Late Blight (Phytophthora infestans)',
    isHealthy: false,
    visualLesionDescription: 'Large, irregular water-soaked pale green lesions rapidly turning dark purplish-brown to black.',
    leafSurfaceSignature: 'Delicate white fungal-like sporulation on the underside of leaves in humid mornings.',
    progressionPattern: 'Extremely fast destruction of stems, foliage, and fruits within 3-5 days of cool wet weather.',
    confusableLookalikes: ['Early blight', 'Frost damage']
  },
  {
    classId: 'tomato_leaf_curl_virus',
    crop: 'Tomato',
    condition: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    isHealthy: false,
    visualLesionDescription: 'Upward curling and cupping of leaflet margins, severe reduction in leaf blade size, and pronounced interveinal chlorosis.',
    leafSurfaceSignature: 'Thickened, leathery, cupped young leaves with stunted internodes.',
    progressionPattern: 'Transmitted by Whitefly (Bemisia tabaci); plants become bushy, erect, and flowers drop without setting fruit.',
    confusableLookalikes: ['Tomato Mosaic Virus', 'Physiological leaf roll from heat']
  },
  {
    classId: 'tomato_septoria',
    crop: 'Tomato',
    condition: 'Septoria Leaf Spot (Septoria lycopersici)',
    isHealthy: false,
    visualLesionDescription: 'Numerous small circular spots (1.5-3mm) with gray to tan centers and dark brown borders; tiny black dots (pycnidia) inside center.',
    leafSurfaceSignature: 'Dense, peppered speckles on lower foliage.',
    progressionPattern: 'Progresses from lowest foliage up, causing rapid yellowing and complete defoliation without affecting the fruit directly.',
    confusableLookalikes: ['Bacterial spot', 'Early blight']
  },
  {
    classId: 'tomato_spider_mites',
    crop: 'Tomato',
    condition: 'Two-Spotted Spider Mite (Tetranychus urticae)',
    isHealthy: false,
    visualLesionDescription: 'Fine yellow-white stippling / speckled chlorosis on the upper leaf surface; delicate silken webbing on leaf undersides.',
    leafSurfaceSignature: 'Bronzed, dusty, desiccated leaf texture with minute crawling red/yellow mites.',
    progressionPattern: 'Rapid explosion during hot dry weather; leaves turn bronze and drop.',
    confusableLookalikes: ['Thrips damage', 'Nutrient chlorosis']
  },
  {
    classId: 'tomato_bacterial_spot',
    crop: 'Tomato',
    condition: 'Bacterial Spot (Xanthomonas perforans / vesicatoria)',
    isHealthy: false,
    visualLesionDescription: 'Small (2-3mm), dark brown to black angular water-soaked spots, often with a faint yellow-green halo.',
    leafSurfaceSignature: 'Greasy angular lesions restricted by small veins.',
    progressionPattern: 'Lesions coalesce causing ragged torn leaves; fruits develop raised scab-like rough black specks.',
    confusableLookalikes: ['Septoria leaf spot', 'Early blight']
  },
  {
    classId: 'potato_early_blight',
    crop: 'Potato',
    condition: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    visualLesionDescription: 'Concentric ring target lesions on mature leaves, yellowing and dying of lower haulm.',
    leafSurfaceSignature: 'Dry brown concentric rings bounded by major veins.',
    progressionPattern: 'Attacks older foliage during tuber initiation, reducing photosynthetic bulking capacity.',
    confusableLookalikes: ['Late blight', 'Brown spot']
  },
  {
    classId: 'potato_late_blight',
    crop: 'Potato',
    condition: 'Late Blight (Phytophthora infestans)',
    isHealthy: false,
    visualLesionDescription: 'Water-soaked brownish-black greasy lesions spreading rapidly from tips/margins with white downy growth underneath.',
    leafSurfaceSignature: 'Rapid necrotic collapse of haulm with putrid odor in field.',
    progressionPattern: 'Spreads systemically through potato foliage down to tubers causing coppery-brown dry rot.',
    confusableLookalikes: ['Blackleg bacterial rot', 'Early blight']
  },
  {
    classId: 'corn_common_rust',
    crop: 'Maize / Corn',
    condition: 'Common Rust (Puccinia sorghi)',
    isHealthy: false,
    visualLesionDescription: 'Golden-brown to cinnamon-brown powdery pustules (uredinia) scattered across both upper and lower leaf surfaces.',
    leafSurfaceSignature: 'Raised pustules rupturing epidermis to release rust-colored powdery spores.',
    progressionPattern: 'Favored by cool humid nights (16-23°C); can lead to premature leaf death in sweet corn and seed maize.',
    confusableLookalikes: ['Southern corn rust (lighter orange pustules on top only)', 'Gray leaf spot']
  },
  {
    classId: 'corn_northern_leaf_blight',
    crop: 'Maize / Corn',
    condition: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    isHealthy: false,
    visualLesionDescription: 'Long, cigar-shaped / elliptical grayish-green to tan lesions (2.5 to 15 cm long) parallel to leaf veins.',
    leafSurfaceSignature: 'Large elongated necrotic stripes with dark dirty sporulation.',
    progressionPattern: 'Starts on lower leaves around silking, spreading to upper canopy causing scorched appearance.',
    confusableLookalikes: ['Stewart wilt', 'Goss wilt']
  },
  {
    classId: 'grape_black_rot',
    crop: 'Grapes',
    condition: 'Black Rot (Guignardia bidwellii)',
    isHealthy: false,
    visualLesionDescription: 'Reddish-brown circular spots with dark margins on leaves with black pycnidia; fruit shrivels into hard black wrinkled mummies.',
    leafSurfaceSignature: 'Tan necrotic spots with tiny black fruiting bodies in a ring.',
    progressionPattern: 'Infects young shoots, tendrils, and berries directly destroying entire grape clusters.',
    confusableLookalikes: ['Anthracnose', 'Downy mildew']
  }
];

// ----------------------------------------------------------------------------
// 5. AGRICULTURE & FARMING DATASET (Agronomic Lifecycle & IPM Protocols)
// ----------------------------------------------------------------------------
export const AGRI_FARMING_PROTOCOLS: Record<string, AgriFarmingLifecycle> = {
  Tomato: {
    crop: 'Tomato',
    totalDurationDays: 110,
    stages: [
      {
        stageName: 'Nursery & Seedbed (0-25 DAS)',
        dasRange: '0 - 25 DAS',
        criticalActivities: ['Solarized raised nursery beds', 'Seed treatment with Trichoderma (10g/kg)', 'Nylon net coverage against whiteflies'],
        waterRequirementMm: 50,
        fertilizerDose: '19:19:19 foliar spray at 15 DAS (2g/L)',
        keyThreats: ['Damping-off (Pythium)', 'Whitefly transmission of TYLCV']
      },
      {
        stageName: 'Transplanting & Vegetative (25-45 DAS)',
        dasRange: '25 - 45 DAS',
        criticalActivities: ['Transplant on raised ridges with silver-black mulch', 'Staking with bamboo poles', 'Installation of yellow sticky traps'],
        waterRequirementMm: 120,
        fertilizerDose: 'Basal dose 50kg DAP + 50kg MOP + 25kg Urea/acre',
        keyThreats: ['Early Blight', 'Cutworms', 'Bacterial Spot']
      },
      {
        stageName: 'Flowering & Fruit Set (45-75 DAS)',
        dasRange: '45 - 75 DAS',
        criticalActivities: ['Pruning suckers up to first flower cluster', 'Installation of Helicoverpa pheromone traps', 'Foliar spray of 13:0:45 + Calcium-Boron'],
        waterRequirementMm: 220,
        fertilizerDose: 'Urea (25kg/acre) + Potassium Nitrate 13:0:45 (5g/L spray)',
        keyThreats: ['Fruit Borer (Helicoverpa)', 'Blossom End Rot', 'Late Blight']
      },
      {
        stageName: 'Fruit Bulking & Harvesting (75-110 DAS)',
        dasRange: '75 - 110 DAS',
        criticalActivities: ['Multiple pickings at breaker stage', 'Strict adherence to pesticide Pre-Harvest Intervals (PHI)', 'Post-harvest grading'],
        waterRequirementMm: 160,
        fertilizerDose: '0:0:50 Potassium Sulphate foliar spray (4g/L) for fruit firmness and color',
        keyThreats: ['Anthracnose fruit rot', 'Sunscald', 'Bacterial Wilt']
      }
    ],
    ipmTierStrategy: {
      cultural: ['Crop rotation with non-solanaceous crops (Maize/Legumes)', 'Silver reflective mulch to repel aphids/whiteflies', 'Removal of lower senescent leaves'],
      mechanical: ['Erect 15 yellow sticky traps and 6 pheromone traps per acre', 'Manual destruction of borer-infested fruits', 'Bird perches (10/acre)'],
      biological: ['Release Trichogramma chilonis egg parasitoids @ 50,000/ha', 'Spray HaNPV (250 LE/ha) or Bt @ 2g/L', 'Foliar spray of Neem Azadirachtin 10,000 ppm'],
      chemicalThreshold: 'Intervene with Chlorantraniliprole 18.5% SC @ 0.3ml/L if >1 fruit borer larva/plant or Difenoconazole 25% EC @ 0.5ml/L for early blight.'
    }
  },
  Apple: {
    crop: 'Apple',
    totalDurationDays: 160,
    stages: [
      {
        stageName: 'Dormancy & Silver Tip (Jan - Feb)',
        dasRange: 'Dormant Stage',
        criticalActivities: ['Winter pruning of diseased twigs', 'Sanitation spray of 5% Urea on orchard floor', 'Dormant Spray Oil (Tree Spray Oil 2%)'],
        waterRequirementMm: 80,
        fertilizerDose: 'FYM 40kg + Basal NPK (700g:350g:700g per tree)',
        keyThreats: ['San Jose Scale', 'Overwintering Scab Pseudothecia', 'Woolly Apple Aphid']
      },
      {
        stageName: 'Pink Bud to Petal Fall (March - April)',
        dasRange: 'Bloom Stage',
        criticalActivities: ['Protect pollinator honeybees', 'Maintain clean tree basin', 'Preventive fungicide spray for primary scab'],
        waterRequirementMm: 150,
        fertilizerDose: 'Foliar Boron (0.1%) + Zinc Sulphate (0.5%) before flowering',
        keyThreats: ['Apple Scab Primary Inoculum', 'Powdery Mildew', 'Blossom Thrips']
      },
      {
        stageName: 'Fruit Set & Bulking (May - July)',
        dasRange: 'Bulking Stage',
        criticalActivities: ['Fruit thinning to 1 fruit per cluster', 'Installation of Codling moth traps', 'Regular drip irrigation during dry spells'],
        waterRequirementMm: 350,
        fertilizerDose: 'Calcium Nitrate foliar spray (0.5%) to prevent bitter pit',
        keyThreats: ['Secondary Scab', 'Alternaria Blotch', 'Codling Moth', 'Spider Mites']
      },
      {
        stageName: 'Maturity & Harvest (August - October)',
        dasRange: 'Harvest Stage',
        criticalActivities: ['Harvesting at optimal maturity index', 'Gentle hand picking with stalks intact', 'Grading into Extra Fancy/Fancy'],
        waterRequirementMm: 120,
        fertilizerDose: 'Sulfate of Potash (SOP) foliar wash (0.5%) for color luster',
        keyThreats: ['Fruit Russeting', 'Blue Mold storage rot (Penicillium)']
      }
    ],
    ipmTierStrategy: {
      cultural: ['Post-harvest orchard floor clearance of fallen leaves', 'Proper pruning for canopy aeration and sunlight penetration', 'Basin mulching with straw'],
      mechanical: ['Banding tree trunks with corrugated cardboard for codling moth larvae', 'Pheromone traps for San Jose scale and Codling moth'],
      biological: ['Encourage predatory phytoseiid mites against two-spotted spider mites', 'Bacillus subtilis bio-fungicide during cluster stage'],
      chemicalThreshold: 'Apply Difenoconazole 25% EC @ 0.3ml/L or Nativo 75 WG @ 0.4g/L immediately upon scab ascospore discharge alert.'
    }
  },
  Cotton: {
    crop: 'Cotton',
    totalDurationDays: 165,
    stages: [
      {
        stageName: 'Germination & Seedling (0-30 DAS)',
        dasRange: '0 - 30 DAS',
        criticalActivities: ['Interculturing & weed clearance', 'Gap filling and thinning to maintain 1 plant per hill', 'Stem application of Flonicamid against early sucking pests'],
        waterRequirementMm: 90,
        fertilizerDose: 'Basal 20% N + 100% P + 50% K (10:26:26 @ 100kg/acre)',
        keyThreats: ['Aphids', 'Thrips', 'Damping off', 'Jassids']
      },
      {
        stageName: 'Square Formation & Peak Flowering (30-75 DAS)',
        dasRange: '30 - 75 DAS',
        criticalActivities: ['Installation of 15 yellow sticky traps per acre', 'Monitoring Whitefly nymphs on leaf undersides', 'Erection of Pink Bollworm pheromone traps'],
        waterRequirementMm: 280,
        fertilizerDose: 'Top dress 40% Nitrogen + Foliar spray 13:0:45 (10g/L)',
        keyThreats: ['Whitefly (vectoring CLCuV)', 'Pink Bollworm (PBW)', 'Spodoptera litura']
      },
      {
        stageName: 'Boll Development & Bursting (75-130 DAS)',
        dasRange: '75 - 130 DAS',
        criticalActivities: ['Inspect 20 green bolls weekly for PBW entrance rosettes', 'Avoid water stress during boll expansion', 'Foliar application of Planofix (NAA) against boll drop'],
        waterRequirementMm: 250,
        fertilizerDose: 'Top dress remaining 40% N + 50% K + Magnesium Sulphate (10g/L spray against Lalya)',
        keyThreats: ['Pink Bollworm internal damage', 'Boll rot (Colletotrichum/Fusarium)', 'Grey Mildew']
      },
      {
        stageName: 'Harvest & Post-Harvest (130-165 DAS)',
        dasRange: '130 - 165 DAS',
        criticalActivities: ['Clean picking of fully opened dry bolls into cotton bags', 'Avoid plastic bags to prevent polypropylene contamination', 'Terminate crop by January to break PBW cycle'],
        waterRequirementMm: 60,
        fertilizerDose: 'Nil (Stop fertilization)',
        keyThreats: ['Staining of lint by Dysdercus cingulatus (Red cotton bug)']
      }
    ],
    ipmTierStrategy: {
      cultural: ['Grow non-Bt refuge border rows', 'Avoid staggered sowing; complete sowing within 15 days in the tract', 'Deep summer ploughing to expose pupae to birds and solar heat'],
      mechanical: ['Yellow sticky traps (15-20/acre) for whiteflies', 'Funnel pheromone traps with Pectino-lure (8/acre) for Pink Bollworm'],
      biological: ['Release Trichogrammatoidea bactrae @ 60,000/acre for pink bollworm eggs', 'Spray Beauveria bassiana @ 5g/L for sucking pests', 'Conserve Chrysoperla carnea (Green lacewing)'],
      chemicalThreshold: 'Apply Afidopyropen 50 g/L DC @ 2ml/L for Whiteflies >6/leaf; Emamectin Benzoate 5% SG @ 0.5g/L for bollworm larvae.'
    }
  }
};

// Summary helper providing key statistical metadata for the UI and AI Grounding
export const AGRI_DATASETS_META = {
  datasets: [
    {
      id: 'pestopia',
      name: 'Pestopia: Indian Pests and Pesticides Dataset',
      source: 'Kaggle (shruthisindhura/pestopia)',
      records: '400+ Pest-Host-Pesticide Associations',
      focus: 'CIBRC Registered Dosages, Active Chemical Ingredients, PHI Waiting Periods, Bio-Pesticides, Mode of Action Groups',
      keyBenefits: 'Precise chemical dosages (ml/L, g/acre), Pre-Harvest Intervals, resistance management (MoA rotation).'
    },
    {
      id: 'crop_soil',
      name: 'Crop and Soil Dataset',
      source: 'Kaggle (shankarpriya2913/crop-and-soil-dataset)',
      records: '2,200+ Multi-Factor Soil & Nutrient Profiles',
      focus: 'N, P, K, pH, Moisture %, Organic Carbon %, Soil Classification, Deficiency Signatures',
      keyBenefits: 'Identifies whether nutrient starvation (e.g. low Nitrogen, sub-optimal Potassium) triggers or compounds disease.'
    },
    {
      id: 'crop_yield_weather',
      name: 'Crop Yield Data with Soil and Weather Dataset',
      source: 'Kaggle (anshumish/crop-yield-data-with-soil-and-weather-dataset)',
      records: '15,000+ Meteorological & Yield Microclimate Points',
      focus: 'Temperature, Relative Humidity, Rainfall, Evapotranspiration, Spore Dispersion Index',
      keyBenefits: 'Calculates fungal spore germination risk, rain washoff window safety, and optimal spray hours.'
    },
    {
      id: 'plant_village',
      name: 'PlantVillage Visual Pathology Dataset',
      source: 'Kaggle / PlantVillage (Penn State / EPFL)',
      records: '54,300+ Expertly Labeled Leaf Disease Photographs (38 Classes)',
      focus: 'Visual lesion morphology, concentric ring signatures, bacterial water-soaking, viral leaf curl, rust pustules',
      keyBenefits: 'Gold-standard computer vision ontology for leaf and fruit symptom recognition.'
    },
    {
      id: 'agriculture_farming',
      name: 'Agriculture and Farming Dataset',
      source: 'Kaggle (bhadramohit/agriculture-and-farming-dataset)',
      records: '3,500+ Agronomic Calendars & Phenology Tables',
      focus: 'Days After Sowing (DAS) milestones, critical irrigation points, split fertilizer regimes, 4-tier IPM protocols',
      keyBenefits: 'Provides holistic farm management from seedling to harvest with cultural, biological, and chemical IPM tiers.'
    }
  ]
};
