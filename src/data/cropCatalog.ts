export interface CropCategoryData {
  id: string;
  name: string;
  botanicalName: string;
  category: string;
  icon: string;
  typicalMaturityDays: number;
  varieties: string[];
  growthStages: string[];
  commonPests: string[];
  sampleDescription: string;
}

export const CROP_CATALOG: CropCategoryData[] = [
  {
    id: 'cashew',
    name: 'Cashew (Palasa Belt)',
    botanicalName: 'Anacardium occidentale',
    category: 'Horticulture / Plantation (Palasa Kasibugga)',
    icon: '🥜',
    typicalMaturityDays: 120,
    varieties: [
      'BPP-8 (High Yield Cashew)',
      'VRI-3 (Palasa Special)',
      'BPP-4 (Godavari Selection)',
      'BPP-6 (Coastal AP Selection)',
      'Priyanka (H-1591)',
      'Bhaskara',
      'Ullal-1 / Ullal-3',
      'Other / Local Palasa Graft'
    ],
    growthStages: [
      'Post-Monsoon Vegetative Flush (Sep-Nov)',
      'Panicle Initiation & Flowering (Dec-Feb)',
      'Fruit Set & Mustard Nut Stage',
      'Nut Bulking & Apple Enlargement',
      'Harvest Maturity & Nut Dropping (Mar-May)',
      'Post-Harvest Pruning & Basin Cleaning'
    ],
    commonPests: ['Tea Mosquito Bug (Helopeltis antonii)', 'Cashew Stem & Root Borer (CSRB)', 'Cashew Anthracnose (Colletotrichum)', 'Inflorescence Thrips', 'Powdery Mildew'],
    sampleDescription: 'Angular brownish-black lesions with resin exudation on tender shoots, flower drying, or trunk frass.'
  },
  {
    id: 'apples',
    name: 'Apple',
    botanicalName: 'Malus domestica',
    category: 'Pome Fruit / Orchard',
    icon: '🍎',
    typicalMaturityDays: 150,
    varieties: [
      'Kashmiri Delicious (Ambri)',
      'Royal Gala',
      'Fuji Apple',
      'Honeycrisp',
      'Granny Smith (Green Apple)',
      'Golden Delicious',
      'Red Chief / Super Chief',
      'Kinnaur Red Delicious',
      'Gala Mast',
      'Pink Lady (Cripps Pink)',
      'Other / Local Apple Variety'
    ],
    growthStages: [
      'Dormancy / Silver Tip',
      'Green Tip & Half-Inch Green',
      'Tight Cluster / Pink Bud',
      'Full Bloom & Petal Fall',
      'Fruit Set & Early Development (10-20mm)',
      'Fruit Bulking & Color Development',
      'Pre-Harvest & Maturity',
      'Post-Harvest Orchard Stage'
    ],
    commonPests: ['Apple Scab (Venturia)', 'Codling Moth', 'San Jose Scale', 'Woolly Apple Aphid', 'Powdery Mildew'],
    sampleDescription: 'Leaves displaying olive-green velvety spots or fruit russeting.'
  },
  {
    id: 'tomatoes',
    name: 'Tomato',
    botanicalName: 'Solanum lycopersicum',
    category: 'Solanaceous Vegetable',
    icon: '🍅',
    typicalMaturityDays: 90,
    varieties: [
      'Roma / Plum Tomato',
      'Pusa Ruby',
      'Vaishali / Hybrid 101',
      'Cherry / Grape Tomato',
      'Beefsteak',
      'San Marzano',
      'Arka Rakshak (Triple Resistant)',
      'Abhinav / Syngenta Hybrid',
      'Heirloom Brandywine',
      'Other / Local Tomato Variety'
    ],
    growthStages: [
      'Nursery / Seedling (0-20 DAS)',
      'Early Vegetative & Transplanting (20-35 DAS)',
      'First Flower Truss Emergence (35-50 DAS)',
      'Fruit Setting & Cluster Expansion (50-70 DAS)',
      'Fruit Breaker & Ripening Stage (70-90 DAS)',
      'Peak Harvest & Multiple Pickings'
    ],
    commonPests: ['Early Blight', 'Late Blight', 'Tomato Leaf Curl Virus', 'Tomato Fruit Borer (Helicoverpa)', 'Bacterial Wilt'],
    sampleDescription: 'Lower leaf yellowing with dark target rings, leaf curl, or blossom end rot.'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    botanicalName: 'Gossypium hirsutum',
    category: 'Commercial Fiber Crop',
    icon: '☁️',
    typicalMaturityDays: 160,
    varieties: [
      'Bt Cotton (Bollgard II / BG-II)',
      'Suraj (Desi / Non-Bt)',
      'Suvin (Extra Long Staple ELS)',
      'American Cotton (G. hirsutum)',
      'MCU-5 / MCU-7',
      'Hybrid 6 / Bunny Bt',
      'RCH-659 Hybrid',
      'Other / Local Cotton Variety'
    ],
    growthStages: [
      'Germination & Emergence (0-15 DAS)',
      'Early Vegetative & Square Initiation (15-40 DAS)',
      'Peak Flowering & Squaring (40-75 DAS)',
      'Boll Development & Bulking (75-115 DAS)',
      'Boll Bursting & Maturity (115-150 DAS)',
      'Harvest & Post-Harvest'
    ],
    commonPests: ['Cotton Leaf Curl Virus (CLCuV)', 'Whitefly (Bemisia tabaci)', 'Pink Bollworm', 'Aphids', 'Spodoptera litura'],
    sampleDescription: 'Leaves curling upward like cups with vein thickening or chewed bolls with frass.'
  },
  {
    id: 'rice',
    name: 'Rice / Paddy',
    botanicalName: 'Oryza sativa',
    category: 'Cereal / Staple Grain',
    icon: '🌾',
    typicalMaturityDays: 130,
    varieties: [
      'Basmati 1121 / Pusa 1509',
      'Sona Masoori (BPT 5204)',
      'IR 64 / IR 36',
      'Swarna (MTU 7029)',
      'Jasmine / Aromatic Rice',
      'Ponni / Samba Mahsuri',
      'PR 126 / PR 121 (Short Duration)',
      'Pusa 44',
      'CR Dhan 310',
      'Other / Local Rice Variety'
    ],
    growthStages: [
      'Seedbed & Nursery (0-25 DAS)',
      'Tillering & Active Vegetative (25-50 DAS)',
      'Stem Elongation & Panicle Initiation (50-70 DAS)',
      'Booting & Heading (70-85 DAS)',
      'Flowering & Milk Stage (85-105 DAS)',
      'Dough & Grain Hardening (105-125 DAS)',
      'Harvest Maturity (125-140 DAS)'
    ],
    commonPests: ['Rice Blast (Pyricularia)', 'Brown Plant Hopper (BPH)', 'Sheath Blight', 'Bacterial Leaf Blight', 'Stem Borer'],
    sampleDescription: 'Spindle/diamond-shaped gray leaf lesions or yellowing leaf tips drying downwards.'
  },
  {
    id: 'maize',
    name: 'Maize / Corn',
    botanicalName: 'Zea mays',
    category: 'Cereal / Coarse Grain',
    icon: '🌽',
    typicalMaturityDays: 105,
    varieties: [
      'Sweet Corn (Madhuri / Sugar 75)',
      'Yellow Dent Corn (Grain Feed)',
      'Pioneer Hybrid (P3396 / P3501)',
      'African Tall (Fodder Maize)',
      'Flint Corn / Desi Makka',
      'Baby Corn (G-5414)',
      'DKC 9108 / Bayer Hybrid',
      'Other / Local Maize Variety'
    ],
    growthStages: [
      'Seedling VE & V2 (0-15 DAS)',
      'Early Vegetative V4-V6 Whorl Stage (15-30 DAS)',
      'Rapid Vegetative V8-V12 (30-50 DAS)',
      'Tasseling (VT) & Silking (R1) (50-65 DAS)',
      'Blister & Milk Stage (R2-R3) (65-80 DAS)',
      'Dough & Dent Stage (R4-R5) (80-95 DAS)',
      'Black Layer & Harvest (R6) (95-115 DAS)'
    ],
    commonPests: ['Fall Armyworm (Spodoptera frugiperda)', 'Stem Borer (Chilo partellus)', 'Northern Corn Leaf Blight', 'Common Rust'],
    sampleDescription: 'Windowpane tears in central whorl, sawdust frass, or long tan necrotic streaks.'
  },
  {
    id: 'potato',
    name: 'Potato',
    botanicalName: 'Solanum tuberosum',
    category: 'Tuber / Vegetable',
    icon: '🥔',
    typicalMaturityDays: 95,
    varieties: [
      'Kufri Jyoti (Hills & Plains)',
      'Kufri Pukhraj (Early)',
      'Russet Burbank',
      'Yukon Gold',
      'Kufri Chipsona (Processing)',
      'Kufri Bahar',
      'Kennebec',
      'Other / Local Potato Variety'
    ],
    growthStages: [
      'Sprout Development (0-15 DAP)',
      'Vegetative Canopy Growth (15-35 DAP)',
      'Tuber Initiation & Hooking (35-50 DAP)',
      'Tuber Bulking & Sizing (50-80 DAP)',
      'Canopy Senescence & Skin Setting (80-95 DAP)',
      'Tuber Digging / Harvest'
    ],
    commonPests: ['Late Blight (Phytophthora)', 'Early Blight (Alternaria)', 'Potato Tuber Moth', 'Black Scurf (Rhizoctonia)'],
    sampleDescription: 'Water-soaked irregular black blotches with white downy cottony ring on leaf underside.'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    botanicalName: 'Triticum aestivum',
    category: 'Rabi Cereal Grain',
    icon: '🌾',
    typicalMaturityDays: 135,
    varieties: [
      'HD-2967',
      'PBW-343 / PBW-550',
      'Sharbati (MP Lok-1)',
      'Durum (Pasta Wheat / Malavshakti)',
      'HD-3086 (Pusa Gautami)',
      'DBW-187 (Karan Vandana)',
      'DBW-222 (Karan Narendra)',
      'Other / Local Wheat Variety'
    ],
    growthStages: [
      'Crown Root Initiation (CRI) (18-25 DAS)',
      'Tillering Stage (25-45 DAS)',
      'Jointing & Stem Extension (45-65 DAS)',
      'Booting & Ear Emergence (65-80 DAS)',
      'Anthesis & Flowering (80-95 DAS)',
      'Milking & Dough Grain Filling (95-120 DAS)',
      'Maturity & Golden Harvest (120-140 DAS)'
    ],
    commonPests: ['Yellow Stripe Rust', 'Brown Leaf Rust', 'Powdery Mildew', 'Wheat Aphids', 'Karnal Bunt'],
    sampleDescription: 'Bright yellow-orange parallel powdery pustules arranged in stripes along leaf veins.'
  },
  {
    id: 'grapes',
    name: 'Grapes / Vineyard',
    botanicalName: 'Vitis vinifera',
    category: 'Vine / Berry Fruit',
    icon: '🍇',
    typicalMaturityDays: 120,
    varieties: [
      'Thompson Seedless',
      'Flame Seedless',
      'Sharad Seedless (Black)',
      'Concord Grape',
      'Cabernet Sauvignon',
      'Bangalore Blue / Isabella',
      'Manik Chaman / Sonaka',
      'Other / Local Grape Variety'
    ],
    growthStages: [
      'Bud Break / Sprouting',
      'Shoot Elongation & Cane Growth',
      'Inflorescence & Flowering / Cap Fall',
      'Berry Set & Pea Size Stage',
      'Veraison (Berry Softening & Color Turn)',
      'Harvest Brix Ripening Stage',
      'Post-Harvest Pruning & Rest'
    ],
    commonPests: ['Downy Mildew (Plasmopara)', 'Powdery Mildew (Uncinula)', 'Anthracnose (Bird-eye Rot)', 'Thrips', 'Mealybug'],
    sampleDescription: 'Oily yellow translucent patches on top leaf with white fungal down on undersides.'
  },
  {
    id: 'chili',
    name: 'Chili / Pepper',
    botanicalName: 'Capsicum annuum',
    category: 'Spice / Vegetable',
    icon: '🌶️',
    typicalMaturityDays: 110,
    varieties: [
      'Guntur Sannam (S4 / S10)',
      'Byadagi (High Color / Low Pungency)',
      'Bell Pepper / Green Capsicum',
      'Bird\'s Eye Chili (Kanthari)',
      'Ghost Pepper (Bhut Jolokia)',
      'Jalapeño',
      'Pusa Jwala',
      'Other / Local Chili Variety'
    ],
    growthStages: [
      'Nursery & Seedling (0-30 DAS)',
      'Transplanting & Early Vegetative (30-50 DAS)',
      'Branching & First Flowering (50-70 DAS)',
      'Pod Formation & Green Chili Picking (70-95 DAS)',
      'Red Ripe Chili Harvest & Multiple Flushes (95-130 DAS)'
    ],
    commonPests: ['Chili Leaf Curl Virus (Gemini virus)', 'Thrips (Scirtothrips dorsalis)', 'Yellow Mites', 'Anthracnose (Dieback/Fruit Rot)', 'Bacterial Spot'],
    sampleDescription: 'Boat-shaped upward leaf curling, crinkling, or circular sunken necrotic spots on chili pods.'
  },
  {
    id: 'citrus',
    name: 'Citrus / Orange & Lemon',
    botanicalName: 'Citrus spp.',
    category: 'Citrus Orchard',
    icon: '🍊',
    typicalMaturityDays: 240,
    varieties: [
      'Nagpur Mandarin (Santra)',
      'Mosambi (Sweet Lime)',
      'Valencia Orange',
      'Kagzi Acid Lime / Nimbu',
      'Eureka Lemon',
      'Kinnow Mandarin',
      'Blood Orange',
      'Other / Local Citrus Variety'
    ],
    growthStages: [
      'New Leaf Flushing (Ambe / Mrig Bahar)',
      'Flower Budding & Full Bloom',
      'Fruitlet Setting & Pea/Marble Sizing',
      'Fruit Bulking & Juice Cell Expansion',
      'Degreening & Fruit Color Turn',
      'Harvest & Maturity'
    ],
    commonPests: ['Citrus Canker (Xanthomonas)', 'Citrus Greening (HLB)', 'Leaf Miner', 'Citrus Psylla', 'Gummosis (Phytophthora)'],
    sampleDescription: 'Raised corky tan pustules with yellow water-soaked halos on leaves or twig dieback.'
  },
  {
    id: 'mango',
    name: 'Mango',
    botanicalName: 'Mangifera indica',
    category: 'Tropical Fruit Orchard',
    icon: '🥭',
    typicalMaturityDays: 120,
    varieties: [
      'Alphonso (Hapus)',
      'Kesar',
      'Dasheri',
      'Banganapalli (Safeda)',
      'Totapuri',
      'Langra',
      'Chaunsa',
      'Amrapali Hybrid',
      'Other / Local Mango Variety'
    ],
    growthStages: [
      'Dormancy & Terminal Bud Swelling',
      'Panicle Emergence & Flowering',
      'Fruit Set (Mustard / Pea Sized)',
      'Marble to Egg Sized Fruit Development',
      'Full Fruit Maturity & Harvest',
      'Post-Harvest Vegetative Flush'
    ],
    commonPests: ['Mango Hopper (Idioscopus)', 'Powdery Mildew', 'Anthracnose', 'Mango Malformation', 'Fruit Fly (Bactrocera)'],
    sampleDescription: 'Blossom drying, sooty mold from hopper secretion, or dark irregular tear-stain fruit lesions.'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    botanicalName: 'Saccharum officinarum',
    category: 'Commercial Sugar Crop',
    icon: '🎋',
    typicalMaturityDays: 360,
    varieties: [
      'Co 0238 (Karan 4)',
      'Co 86032 (Nayana)',
      'CoM 0265',
      'CoLk 94184 (Birendra)',
      'Co 0118',
      'Other / Local Sugarcane Variety'
    ],
    growthStages: [
      'Germination Phase (0-45 DAS)',
      'Formative / Tillering Phase (45-120 DAS)',
      'Grand Growth Phase / Cane Elongation (120-270 DAS)',
      'Ripening & Cane Sucrose Accumulation (270-360 DAS)',
      'Harvesting Phase'
    ],
    commonPests: ['Red Rot (Colletotrichum)', 'Early Shoot Borer', 'Top Borer', 'Sugarcane Woolly Aphid', 'Smut'],
    sampleDescription: 'Third or fourth leaf drying with midrib red discoloration and crosswise white patches.'
  },
  {
    id: 'banana',
    name: 'Banana',
    botanicalName: 'Musa acuminata',
    category: 'Tropical Fruit',
    icon: '🍌',
    typicalMaturityDays: 300,
    varieties: [
      'Grand Naine (G-9)',
      'Robusta',
      'Dwarf Cavendish',
      'Nendran (Plantain)',
      'Red Banana (Chenkadali)',
      'Rasthali / Silk Banana',
      'Other / Local Banana Variety'
    ],
    growthStages: [
      'Sucker / Tissue Culture Planting (0-3 Months)',
      'Active Vegetative & Pseudostem Growth (3-6 Months)',
      'Shooting / Flower Bud Emergence (7-8 Months)',
      'Bunch Development & Finger Filling (8-10 Months)',
      'Bunch Maturity & Harvest (10-12 Months)'
    ],
    commonPests: ['Sigatoka Leaf Spot', 'Panama Wilt (Fusarium Race 4)', 'Banana Pseudostem Weevil', 'Bunchy Top Virus'],
    sampleDescription: 'Dark brown elliptical leaf streaks turning into gray centered dead patches with bright yellow halos.'
  },
  {
    id: 'soybean',
    name: 'Soybean',
    botanicalName: 'Glycine max',
    category: 'Oilseed / Legume',
    icon: '🌱',
    typicalMaturityDays: 100,
    varieties: [
      'JS 335',
      'JS 9560 (Early)',
      'NRC 37 (Ahilya 4)',
      'Bragg',
      'JS 20-34',
      'Other / Local Soybean Variety'
    ],
    growthStages: [
      'Emergence (VE) & Unifoliate (VC) (0-10 DAS)',
      'Vegetative V1-V4 (10-30 DAS)',
      'Beginning Bloom (R1-R2) (30-45 DAS)',
      'Pod Development (R3-R4) (45-65 DAS)',
      'Seed Filling (R5-R6) (65-85 DAS)',
      'Full Maturity & Leaf Drop (R7-R8) (85-105 DAS)'
    ],
    commonPests: ['Yellow Mosaic Virus (YMV)', 'Girdle Beetle', 'Semilooper Caterpillar', 'Charcoal Rot', 'Rust'],
    sampleDescription: 'Bright yellow mosaic patches on leaves or girdle ring incisions around stem petiole.'
  },
  {
    id: 'other',
    name: 'Custom / Other Crop',
    botanicalName: 'Custom species',
    category: 'Agricultural / Horticultural',
    icon: '🌿',
    typicalMaturityDays: 100,
    varieties: [
      'Local Landrace Variety',
      'Commercial Hybrid',
      'Certified Seed Variety',
      'Open Pollinated Variety',
      'Custom / Other Variety'
    ],
    growthStages: [
      'Seedling & Germination',
      'Early Vegetative Growth',
      'Branching / Tillering / Canopy Expansion',
      'Flowering & Budding',
      'Fruit / Grain / Pod Bulking',
      'Ripening & Harvest'
    ],
    commonPests: ['Fungal Leaf Spots', 'Sucking Pests', 'Borer Caterpillars', 'Nutrient Deficiency', 'Stem Rot'],
    sampleDescription: 'Describe your crop signs, discoloration, or pest observations below.'
  }
];

// Categorized Problems & Symptoms Matrix
export const CATEGORIZED_PROBLEMS = {
  pests: [
    { id: 'p_whitefly', label: 'Whitefly swarms on leaf underside & sooty mold', icon: '🪰' },
    { id: 'p_aphids', label: 'Aphids, curling & sticky honeydew secretion', icon: '🐜' },
    { id: 'p_armyworm', label: 'Caterpillar / Armyworm windowpane feeding & holes', icon: '🐛' },
    { id: 'p_borer', label: 'Stem / shoot borer holes with sawdust-like frass', icon: '🕳️' },
    { id: 'p_thrips', label: 'Thrips feeding, silver sheen & upward leaf edge curl', icon: '✨' },
    { id: 'p_mites', label: 'Red spider mites & fine webbing under foliage', icon: '🕸️' },
    { id: 'p_leafminer', label: 'Leaf miner serpentine silvery-white tunnels', icon: '〰️' },
    { id: 'p_fruitborer', label: 'Fruit / pod borer entry holes & premature dropping', icon: '🍏' },
    { id: 'p_rootgrub', label: 'Root grubs / cutworms / termites damaging root zone', icon: '🪴' }
  ],
  colorChanges: [
    { id: 'c_yellow_lower', label: 'Yellowing of lower / older leaves (Nitrogen chlorosis)', icon: '🟡' },
    { id: 'c_yellow_young', label: 'Yellowing of young top leaves with green veins (Iron/Sulfur)', icon: '🌱' },
    { id: 'c_purple_bronze', label: 'Purple or bronze leaf margins (Phosphorus deficiency/Cold)', icon: '🟣' },
    { id: 'c_mosaic', label: 'Mosaic mottling (alternating dark & light green patches)', icon: '🔲' },
    { id: 'c_bleached', label: 'Bleached white spots or silvery scorch bands', icon: '⚪' },
    { id: 'c_burnt_tips', label: 'Burnt, scorched leaf margins (Potassium deficiency / Salt burn)', icon: '🔥' },
    { id: 'c_pale_canopy', label: 'General pale light-green canopy & stunted vigor', icon: '🌾' }
  ],
  decayingAndLesions: [
    { id: 'd_target_rings', label: 'Concentric dark brown target-rings (Early Blight / Alternaria)', icon: '🎯' },
    { id: 'd_water_soaked', label: 'Water-soaked black/brown rotting lesions (Late Blight)', icon: '💧' },
    { id: 'd_collar_rot', label: 'Stem collar rot / dark decaying girdle at soil line', icon: '🪵' },
    { id: 'd_spindle_spots', label: 'Spindle / eye-shaped spots with gray center (Blast)', icon: '👁️' },
    { id: 'd_powdery_mildew', label: 'White powdery fungal talc-like dust on leaf surface', icon: '💨' },
    { id: 'd_downy_mold', label: 'Downy grayish-purple cottony mold under leaves in morning', icon: '☁️' },
    { id: 'd_soft_rot', label: 'Soft soggy fruit/tuber rot with foul water discharge', icon: '🍂' },
    { id: 'd_cankers', label: 'Sunken woody cankers or oozing gummy bacterial sap', icon: '🩹' }
  ],
  growthAndDeformities: [
    { id: 'g_leaf_curl_up', label: 'Upward leaf cupping & vein thickening (Viral / Heat stress)', icon: '🥣' },
    { id: 'g_leaf_roll_down', label: 'Downward leaf rolling & brittleness', icon: '🔄' },
    { id: 'g_dwarfism', label: 'Shortened internodes, bushy stunt dwarfism & bunching', icon: '📉' },
    { id: 'g_wilting', label: 'Sudden daytime wilting / drooping despite moist soil', icon: '🥀' },
    { id: 'g_drop', label: 'Premature shedding / dropping of flowers, buds, or pin-head fruit', icon: '🍃' },
    { id: 'g_galls', label: 'Leaf blisters, puckering, or root knot swellings', icon: '🫧' }
  ]
};
