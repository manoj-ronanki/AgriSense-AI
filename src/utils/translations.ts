import { IntegratedCropAnalysis, ActionStep, SoilSensorData, WeatherData } from '../types';

export interface LanguageOption {
  code: string;
  label: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🌐', region: 'Global' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Andhra Pradesh & Telangana' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'India (National)' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Tamil Nadu' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'Karnataka' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', region: 'Kerala' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'Maharashtra' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', region: 'West Bengal & Bangladesh' },
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'Gujarat' },
  { code: 'pa', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', region: 'Punjab' },
  { code: 'or', label: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', region: 'Odisha' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Spain & Latin America' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France & Francophone' },
  { code: 'pt', label: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', region: 'Brazil & Portugal' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Middle East & North Africa' },
  { code: 'sw', label: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', region: 'East Africa' }
];

export interface TranslationDictionary {
  [key: string]: string;
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  en: {
    // Nav & General
    app_title: 'AgriSense AI',
    app_subtitle: 'Unified Crop Doctor • Photo Vision • Soil IoT • Weather Fusion',
    version_tag: 'v3.7 Multi-Modal',
    nav_dashboard: 'Dashboard',
    nav_my_farm: 'My Farm',
    nav_diagnose: 'Diagnostic Center',
    nav_soil: 'Soil & Sensors',
    nav_weather: 'Weather Analytics',
    nav_history: 'History & Diary',
    nav_profile: 'Profile',
    nav_ask_ai: 'Crop Doctor AI',
    nav_help: 'Help & Guide',
    
    // Intake & Diagnostic
    intake_title: 'Crop Health & Disease Diagnostic Intake',
    intake_desc: 'Attach leaf photo, select symptoms, and verify field telemetry for real-time treatment prescription.',
    sample_label: 'Sample Benchmark Scenarios:',
    leaf_photo_label: 'Plant / Leaf Photography',
    attached_badge: 'Attached',
    capture_snapshot: 'Capture Snapshot',
    cancel: 'Cancel',
    replace: 'Replace Photo',
    remove: 'Remove',
    upload_box_title: 'Take or Upload Leaf / Crop Photo',
    upload_box_desc: 'Close-up view of leaves, lesions, or discolored veins gives the highest precision',
    browse_btn: 'Browse Gallery',
    camera_btn: 'Take Photo',
    step1_crop: '1. Select Crop',
    step2_variety: '2. Variety / Cultivar',
    step3_sowing: '3. Sowing Date',
    step4_stage: '4. Growth Stage',
    das_unit: 'DAS',
    or_choose_catalog: 'Or choose from full crop catalog...',
    
    // Symptoms
    symptoms_heading: 'Observed Field Symptoms & Distress Signs',
    symptoms_subheading: 'Select visible symptoms matching your current crop condition',
    selected_badge: 'Selected',
    clear_btn: 'Clear All',
    cat_pests: 'Pests & Chewing',
    cat_color: 'Yellowing & Discoloration',
    cat_decay: 'Spots, Rot & Lesions',
    cat_growth: 'Wilting & Stunting',
    custom_problem_toggle: 'Add custom description in my own words',
    custom_problem_placeholder: 'Describe any unlisted symptom (e.g. Amber sap oozing from stem base, silver webbing under leaves)...',
    
    // Telemetry summary bar
    soil_bar_label: 'Soil Sensors:',
    weather_bar_label: 'Microclimate:',
    adjust_btn: 'Adjust Values',
    view_radar_btn: 'View Radar',
    telemetry_fused_note: 'Soil & weather data will be fused into the AI diagnosis',
    run_diagnosis_cta: 'Run Farm Diagnosis Now',
    analyzing_cta: 'Analyzing Crop & Telemetry...',

    // Diagnosis View
    report_title: 'Agronomic Diagnostic Report',
    verified_stamp: 'AI Verified Agronomic Analysis',
    primary_diagnosis: 'Primary Diagnosis',
    severity_label: 'Severity Level',
    confidence_label: 'Model Confidence',
    summary_label: 'Agronomic Summary',
    visual_findings_label: 'Visual Symptoms & Signs',
    soil_correlation_label: 'Soil Health Interplay',
    weather_correlation_label: 'Weather & Spray Safety',
    action_plan_label: 'Prescribed Action Plan',
    cibrc_chemical_label: 'CIBRC Approved Chemical Formulation',
    organic_remedies_label: 'Organic & Biological Solutions',
    followup_label: 'Farmer Follow-up Checklist',
    expert_note_label: 'Agronomist Advisory Note',
    audio_listen: 'Listen (Audio)',
    audio_speaking: 'Speaking...',
    export_pdf: 'Export / Print PDF',
    save_to_log: 'Saved to History',
    start_new_diagnosis: 'Start New Scan',
    spraying_window_risk: 'Spray Window',
    disease_spread_risk: 'Disease Risk',
    irrigation_advice: 'Irrigation Guidance',
    contributing_stress: 'Stress Factor',
    safe_to_spray: 'Safe to Spray',
    do_not_spray: 'Do Not Spray',
    step_num: 'Step',
    dosage_label: 'Recommended Dosage',
    phi_days: 'Days PHI',

    // Soil Panel
    soil_panel_title: 'Soil Nutrient & IoT Sensor Hub',
    soil_panel_desc: 'Real-time NPK, pH, moisture, and organic carbon readings calibrated with agronomic standards.',
    simulate_iot_sync: 'Sync IoT Sensor Node',
    sync_lab_test: 'Load Soil Test Data',
    nitrogen_label: 'Nitrogen (N)',
    phosphorus_label: 'Phosphorus (P)',
    potassium_label: 'Potassium (K)',
    ph_label: 'Soil pH',
    moisture_label: 'Soil Moisture',
    temp_label: 'Soil Temp',
    ec_label: 'Electrical Cond. (EC)',
    organic_carbon_label: 'Organic Carbon',
    status_optimal: 'Optimal',
    status_low: 'Deficient',
    status_high: 'High',
    sensor_connected: 'IoT Sensor Node Active',
    last_sync: 'Last synced',

    // Weather Panel
    weather_panel_title: 'Agro-Meteorological Radar & Spray Safety',
    weather_panel_desc: 'Temperature, humidity, rain probability, dew point, and microclimate spray safety advisory.',
    refresh_weather: 'Refresh Radar',
    current_temp: 'Current Temperature',
    feels_like: 'Feels Like',
    current_humidity: 'Relative Humidity',
    wind_speed: 'Wind Velocity',
    dew_point: 'Dew Point',
    delta_t: 'Delta-T (Evap.)',
    uv_index: 'UV Radiation',
    spraying_safety: 'Spraying Window Safety',
    suitability_good: 'Optimal for Application',
    suitability_caution: 'Marginal — Exercise Caution',
    suitability_avoid: 'Do Not Spray (Rain / High Wind)',
    hourly_title: 'Hourly Agro-Forecast',
    five_day_title: '5-Day Microclimate Trend',
    rain_prob: 'Rain Probability',

    // History & Profile & Dashboard
    history_title: 'Crop Health History & Farm Diary',
    history_desc: 'Past diagnostic scans, soil telemetry logs, and treatments applied.',
    empty_history: 'No historical diagnoses found.',
    export_history: 'Export All Records',
    clear_history: 'Clear History',
    view_record: 'View Details',
    delete_record: 'Delete',
    profile_title: 'Farmer Profile & Field Settings',
    sign_out: 'Sign Out',
    
    // Dashboard
    dashboard_hero_title: 'Farm Health & Quality Dashboard',
    dashboard_hero_tag: 'Multi-Farm Precision Agro Intelligence',
    dashboard_cqi_title: 'Crop Quality Index (CQI)',
    dashboard_cqi_desc: 'Integrated score synthesizing visual pathology, soil nutrients, and microclimate risk.',
    active_crops_label: 'Active Crops',
    healthy_farms_label: 'Healthy Farms',
    at_risk_label: 'Action Required',
    total_acreage_label: 'Total Acreage',
    quick_scan_cta: 'Scan New Leaf Photo',
    recent_activity_title: 'Recent Diagnostic Records',
    soil_distribution_title: 'Soil Nutrient Distribution',

    // Chat
    chat_title: 'Crop Doctor AI Assistant',
    chat_desc: 'Ask questions about chemical dosages, tank mixtures, organic alternatives, or microclimate safety in your regional language.',
    chat_input_placeholder: 'Ask any crop or farming question here...',
    send: 'Send',
    quick_query_1: 'Calculate exact fertilizer dosage for 1 acre',
    quick_query_2: 'Is it safe to spray fungicide today?',
    quick_query_3: 'Organic bio-pesticide preparation guide',
    quick_query_4: 'Explain Phase 1 Recovery steps from analytics'
  },

  te: {
    // Nav & General
    app_title: 'అగ్రిసెన్స్ AI',
    app_subtitle: 'సమగ్ర పంట వైద్యుడు • ఫోటో విశ్లేషణ • మట్టి IoT • వాతావరణ సమన్వయం',
    version_tag: 'v3.7 బహుళ-విధానం',
    nav_dashboard: 'డాష్‌బోర్డ్',
    nav_my_farm: 'నా పొలం',
    nav_diagnose: 'వ్యాధి నిర్ధారణ',
    nav_soil: 'మట్టి & సెన్సార్లు',
    nav_weather: 'వాతావరణ విశ్లేషణ',
    nav_history: 'చరిత్ర & డైరీ',
    nav_profile: 'ప్రొఫైల్',
    nav_ask_ai: 'క్రాప్ డాక్టర్ AI',
    nav_help: 'సహాయం & గైడ్',
    
    // Intake & Diagnostic
    intake_title: 'పంట ఆరోగ్యం & తెగుళ్ల నిర్ధారణ విభాగం',
    intake_desc: 'ఆకు ఫోటోను జతచేయండి, లక్షణాలను ఎంచుకోండి మరియు తక్షణ చికిత్స సూచనల కోసం మట్టి, వాతావరణ సమాచారాన్ని సరిచూడండి.',
    sample_label: 'నమూనా ప్రామాణిక పంటలు:',
    leaf_photo_label: 'మొక్క / ఆకు ఫోటోగ్రఫీ',
    attached_badge: 'జతచేయబడింది',
    capture_snapshot: 'ఫోటో తీయండి',
    cancel: 'రద్దు చేయండి',
    replace: 'ఫోటో మార్చండి',
    remove: 'తొలగించండి',
    upload_box_title: 'ఆకు లేదా పంట ఫోటో తీయండి / అప్‌లోడ్ చేయండి',
    upload_box_desc: 'ఆకులు, మచ్చలు లేదా రంగు మారిన భాగాల క్లోజప్ ఫోటో అత్యంత ఖచ్చితమైన ఫలితాలను ఇస్తుంది',
    browse_btn: 'గ్యాలరీ నుండి ఎంచుకోండి',
    camera_btn: 'కెమెరా తెరవండి',
    step1_crop: '1. పంటను ఎంచుకోండి',
    step2_variety: '2. రకం / విత్తనం',
    step3_sowing: '3. విత్తిన తేదీ',
    step4_stage: '4. పెరుగుదల దశ',
    das_unit: 'రోజుల వయస్సు (DAS)',
    or_choose_catalog: 'లేదా పూర్తి జాబితా నుండి ఎంచుకోండి...',
    
    // Symptoms
    symptoms_heading: 'పొలంలో గమనించిన లక్షణాలు & తెగులు గుర్తులు',
    symptoms_subheading: 'మీ పంటలో కనిపించే లక్షణాలను ఎంచుకోండి',
    selected_badge: 'ఎంచుకున్నవి',
    clear_btn: 'అన్నీ తొలగించు',
    cat_pests: 'పురుగులు & కొరికిన గుర్తులు',
    cat_color: 'పసుపు మారడం & రంగు మార్పు',
    cat_decay: 'మచ్చలు, కుళ్లు & తెగుళ్లు',
    cat_growth: 'వాడిపోవడం & ఎదుగుదల లోపం',
    custom_problem_toggle: 'నా స్వంత మాటల్లో వివరణ జోడించు',
    custom_problem_placeholder: 'జాబితాలో లేని ఇతర లక్షణాలను ఇక్కడ రాయండి (ఉదా: కాండం నుండి జిగురు కారడం, ఆకుల వెనుక తెల్లటి పురుగులు)...',
    
    // Telemetry summary bar
    soil_bar_label: 'మట్టి సెన్సార్లు:',
    weather_bar_label: 'వాతావరణం:',
    adjust_btn: 'సవరించు',
    view_radar_btn: 'రాడార్ చూడండి',
    telemetry_fused_note: 'మట్టి & వాతావరణ సమాచారం విశ్లేషణలో కలుపబడుతుంది',
    run_diagnosis_cta: 'పంట వ్యాధి నిర్ధారణ ప్రారంభించండి',
    analyzing_cta: 'పంట & సమాచారాన్ని విశ్లేషిస్తోంది...',

    // Diagnosis View
    report_title: 'వ్యవసాయ నిపుణుల నివేదిక',
    verified_stamp: 'AI నిర్ధారిత ప్రామాణిక నివేదిక',
    primary_diagnosis: 'ప్రధాన వ్యాధి / సమస్య',
    severity_label: 'తీవ్రత స్థాయి',
    confidence_label: 'ఖచ్చితత్వం',
    summary_label: 'విశ్లేషణ సారాంశం',
    visual_findings_label: 'కనిపించే ముఖ్య సంకేతాలు',
    soil_correlation_label: 'మట్టి పోషకాల విశ్లేషణ',
    weather_correlation_label: 'వాతావరణం & పిచికారీ భద్రత',
    action_plan_label: 'నివారణ చర్యలు & చికిత్స ప్రణాళిక',
    cibrc_chemical_label: 'ప్రభుత్వ గుర్తింపు పొందిన మందులు (CIBRC)',
    organic_remedies_label: 'సేంద్రీయ & జీవ నియంత్రణ పద్ధతులు',
    followup_label: 'రైతు చేయవలసిన తదుపరి పనులు',
    expert_note_label: 'వ్యవసాయ నిపుణుడి సలహా',
    audio_listen: 'వినండి (ఆడియో)',
    audio_speaking: 'నివేదిక చదువుతోంది...',
    export_pdf: 'PDF ఎగుమతి / ముద్రించు',
    save_to_log: 'చరిత్రలో భద్రపరచబడింది',
    start_new_diagnosis: 'కొత్త స్కానింగ్ ప్రారంభించండి',
    spraying_window_risk: 'పిచికారీ సమయం',
    disease_spread_risk: 'తెగులు వ్యాప్తి ప్రమాదం',
    irrigation_advice: 'నీటి యాజమాన్యం',
    contributing_stress: 'ఒత్తిడిని పెంచుతోంది',
    safe_to_spray: 'పిచికారీకి అనుకూలం',
    do_not_spray: 'పిచికారీ చేయవద్దు',
    step_num: 'దశ',
    dosage_label: 'సిఫార్సు చేసిన మోతాదు',
    phi_days: 'రోజుల వేచి ఉండే కాలం (PHI)',

    // Soil Panel
    soil_panel_title: 'మట్టి పోషకాలు & IoT సెన్సార్ సమాచారం',
    soil_panel_desc: 'వ్యవసాయ ప్రమాణాలతో సరిపోల్చబడిన రియల్-టైమ్ NPK, pH, తేమ మరియు సేంద్రీయ కర్బనం రీడింగులు.',
    simulate_iot_sync: 'IoT సెన్సార్‌లను సింక్ చేయండి',
    sync_lab_test: 'మట్టి పరీక్ష డేటాను లోడ్ చేయండి',
    nitrogen_label: 'నత్రజని (N)',
    phosphorus_label: 'భాస్వరం (P)',
    potassium_label: 'పొటాషియం (K)',
    ph_label: 'నేల pH',
    moisture_label: 'నేల తేమ',
    temp_label: 'నేల ఉష్ణోగ్రత',
    ec_label: 'విద్యుత్ వాహకత (EC)',
    organic_carbon_label: 'సేంద్రీయ కర్బనం',
    status_optimal: 'సరిపడా ఉంది',
    status_low: 'లోపం ఉంది',
    status_high: 'అధికంగా ఉంది',
    sensor_connected: 'IoT సెన్సార్ అనుసంధానమైంది',
    last_sync: 'చివరి సింక్',

    // Weather Panel
    weather_panel_title: 'వాతావరణ రాడార్ & పిచికారీ సమాచారం',
    weather_panel_desc: 'ఉష్ణోగ్రత, తేమ, వర్ష సూచన, మంచు బిందువు మరియు సురక్షిత పిచికారీ సమయాల సూచిక.',
    refresh_weather: 'రాడార్‌ను రిఫ్రెష్ చేయండి',
    current_temp: 'ప్రస్తుత ఉష్ణోగ్రత',
    feels_like: 'అనిపించే ఉష్ణోగ్రత',
    current_humidity: 'గాలిలో తేమ (హ్యుమిడిటీ)',
    wind_speed: 'గాలి వేగం',
    dew_point: 'మంచు బిందువు',
    delta_t: 'డెల్టా-T (బాష్పీభవనం)',
    uv_index: 'UV తీవ్రత',
    spraying_safety: 'పిచికారీ అనుకూలత',
    suitability_good: 'పిచికారీకి చాలా మంచి సమయం',
    suitability_caution: 'జాగ్రత్తగా పిచికారీ చేయండి',
    suitability_avoid: 'పిచికారీ చేయవద్దు (వర్షం / గాలి ప్రమాదం)',
    hourly_title: 'గంటల వారీ వాతావరణ అంచనా',
    five_day_title: '5 రోజుల వ్యవసాయ వాతావరణ సూచన',
    rain_prob: 'వర్షం పడే అవకాశం',

    // History & Profile & Dashboard
    history_title: 'పంట వ్యాధి రికార్డులు & డైరీ',
    history_desc: 'గతంలో చేసిన పంట స్కాన్‌లు, మట్టి రీడింగ్‌లు మరియు చేసిన చికిత్సల చరిత్ర.',
    empty_history: 'ఇంతవరకు ఎటువంటి పంట రికార్డులు నమోదు కాలేదు.',
    export_history: 'అన్ని రికార్డులను ఎగుమతి చేయండి',
    clear_history: 'చరిత్రను క్లియర్ చేయండి',
    view_record: 'వివరాలు చూడండి',
    delete_record: 'తొలగించండి',
    profile_title: 'రైతు ప్రొఫైల్ & వివరాలు',
    sign_out: 'లాగ్ అవుట్',

    // Dashboard
    dashboard_hero_title: 'పంట ఆరోగ్యం & నాణ్యత డాష్‌బోర్డ్',
    dashboard_hero_tag: 'ఖచ్చితత్వ వ్యవసాయ మేధస్సు',
    dashboard_cqi_title: 'పంట నాణ్యత సూచిక (CQI)',
    dashboard_cqi_desc: 'ఆకుల ఆరోగ్యం, నేల పోషకాలు మరియు వాతావరణ సూచికల సమగ్ర స్కోరు.',
    active_crops_label: 'సాగులో ఉన్న పంటలు',
    healthy_farms_label: 'ఆరోగ్యకరమైన పొలాలు',
    at_risk_label: 'చర్యలు అవసరమైనవి',
    total_acreage_label: 'మొత్తం సాగు విస్తీర్ణం',
    quick_scan_cta: 'కొత్త ఆకు ఫోటో స్కాన్ చేయండి',
    recent_activity_title: 'ఇటీవలి వ్యాధి నిర్ధారణలు',
    soil_distribution_title: 'నేల పోషకాల పంపిణీ',

    // Chat
    chat_title: 'క్రాప్ డాక్టర్ AI సహాయకుడు',
    chat_desc: 'మందుల మోతాదు, ఎరువుల కలయిక, సేంద్రీయ పద్ధతులు లేదా వాతావరణ సలహాల గురించి మీ భాషలోనే అడగండి.',
    chat_input_placeholder: 'వ్యవసాయ లేదా పంట సమస్యలను ఇక్కడ అడగండి...',
    send: 'పంపు',
    quick_query_1: '1 ఎకరానికి ఖచ్చితమైన ఎరువుల మోతాదు లెక్కించండి',
    quick_query_2: 'ఈ రోజు పురుగుమందు పిచికారీ చేయడం సురక్షితమేనా?',
    quick_query_3: 'సేంద్రీయ జీవ నియంత్రణ కషాయం తయారీ విధానం',
    quick_query_4: 'పంట కోలుకోవడానికి తదుపరి చర్యలను వివరించండి'
  },

  hi: {
    // Nav & General
    app_title: 'एग्रीसेंस AI',
    app_subtitle: 'एकीकृत फसल चिकित्सक • फोटो विज़न • मृदा IoT • मौसम समन्वय',
    version_tag: 'v3.7 बहु-मॉडल',
    nav_dashboard: 'डैशबोर्ड',
    nav_my_farm: 'मेरा खेत',
    nav_diagnose: 'निदान केंद्र',
    nav_soil: 'मृदा एवं सेंसर',
    nav_weather: 'मौसम विश्लेषण',
    nav_history: 'इतिहास व डायरी',
    nav_profile: 'प्रोफ़ाइल',
    nav_ask_ai: 'क्रॉप डॉक्टर AI',
    nav_help: 'मार्गदर्शिका',
    
    // Intake & Diagnostic
    intake_title: 'फसल स्वास्थ्य एवं रोग निदान केंद्र',
    intake_desc: 'पत्ती की तस्वीर लगाएं, लक्षण चुनें और तुरंत उपचार सलाह पाने के लिए मिट्टी व मौसम डेटा की पुष्टि करें।',
    sample_label: 'मानक नमूना फसलें:',
    leaf_photo_label: 'पौधे / पत्ती की फोटोग्राफी',
    attached_badge: 'संलग्न',
    capture_snapshot: 'फोटो लें',
    cancel: 'रद्द करें',
    replace: 'फोटो बदलें',
    remove: 'हटाएं',
    upload_box_title: 'पत्ती या फसल की फोटो खींचें / अपलोड करें',
    upload_box_desc: 'पत्तियों, धब्बों या बदरंग नसों की नजदीकी फोटो सबसे सटीक परिणाम देती है',
    browse_btn: 'गैलरी से चुनें',
    camera_btn: 'कैमरा खोलें',
    step1_crop: '1. फसल चुनें',
    step2_variety: '2. किस्म / बीज',
    step3_sowing: '3. बुवाई की तारीख',
    step4_stage: '4. वृद्धि की अवस्था',
    das_unit: 'दिन (DAS)',
    or_choose_catalog: 'या पूरी फसल सूची से चुनें...',
    
    // Symptoms
    symptoms_heading: 'खेत में देखे गए लक्षण व कीट संकेत',
    symptoms_subheading: 'अपनी फसल की स्थिति से मेल खाने वाले लक्षणों का चयन करें',
    selected_badge: 'चयनित',
    clear_btn: 'सभी हटाएं',
    cat_pests: 'कीट व कुतरने के निशान',
    cat_color: 'पीलापन व रंग परिवर्तन',
    cat_decay: 'धब्बे, सड़न व छाले',
    cat_growth: 'मुरझाना व रुका हुआ विकास',
    custom_problem_toggle: 'अपने शब्दों में अन्य विवरण जोड़ें',
    custom_problem_placeholder: 'सूची में न दिए गए अन्य लक्षण लिखें...',
    
    // Telemetry summary bar
    soil_bar_label: 'मिट्टी सेंसर:',
    weather_bar_label: 'मौसम:',
    adjust_btn: 'संशोधित करें',
    view_radar_btn: 'रडार देखें',
    telemetry_fused_note: 'मिट्टी व मौसम का डेटा विश्लेषण में शामिल किया जाएगा',
    run_diagnosis_cta: 'फसल रोग निदान शुरू करें',
    analyzing_cta: 'फसल व डेटा का विश्लेषण हो रहा है...',

    // Diagnosis View
    report_title: 'कृषि विशेषज्ञ निदान रिपोर्ट',
    verified_stamp: 'AI प्रमाणित कृषि विश्लेषण',
    primary_diagnosis: 'प्रमुख रोग / समस्या',
    severity_label: 'गंभीरता स्तर',
    confidence_label: 'सटीकता स्तर',
    summary_label: 'कृषि सारांश',
    visual_findings_label: 'दिखाई देने वाले मुख्य लक्षण',
    soil_correlation_label: 'मृदा पोषक तत्व विश्लेषण',
    weather_correlation_label: 'मौसम एवं छिड़काव सुरक्षा',
    action_plan_label: 'उपचार व कार्य योजना',
    cibrc_chemical_label: 'सरकार द्वारा अनुमोदित रसायन (CIBRC)',
    organic_remedies_label: 'जैविक एवं प्राकृतिक उपचार',
    followup_label: 'किसान के लिए आवश्यक कदम',
    expert_note_label: 'कृषि विशेषज्ञ की सलाह',
    audio_listen: 'सुनें (ऑडियो)',
    audio_speaking: 'रिपोर्ट पढ़ी जा रही है...',
    export_pdf: 'PDF एक्सपोर्ट / प्रिंट करें',
    save_to_log: 'इतिहास में सहेजा गया',
    start_new_diagnosis: 'नया स्कैन शुरू करें',
    spraying_window_risk: 'छिड़काव समय',
    disease_spread_risk: 'रोग प्रसार जोखिम',
    irrigation_advice: 'सिंचाई प्रबंधन',
    contributing_stress: 'तनाव कारक',
    safe_to_spray: 'छिड़काव के लिए सुरक्षित',
    do_not_spray: 'छिड़काव न करें',
    step_num: 'चरण',
    dosage_label: 'अनुशंसित खुराक',
    phi_days: 'दिन प्रतीक्षा अवधि (PHI)',

    // Soil Panel
    soil_panel_title: 'मृदा पोषक तत्व एवं IoT सेंसर हब',
    soil_panel_desc: 'कृषि मानकों के अनुसार रीयल-टाइम NPK, pH, नमी और जैविक कार्बन डेटा।',
    simulate_iot_sync: 'IoT सेंसर सिंक करें',
    sync_lab_test: 'मिट्टी जांच डेटा लोड करें',
    nitrogen_label: 'नाइट्रोजन (N)',
    phosphorus_label: 'फास्फोरस (P)',
    potassium_label: 'पोटेशियम (K)',
    ph_label: 'मृदा pH',
    moisture_label: 'मृदा नमी',
    temp_label: 'मृदा तापमान',
    ec_label: 'विद्युत चालकता (EC)',
    organic_carbon_label: 'जैविक कार्बन',
    status_optimal: 'अनुकूल',
    status_low: 'कमी है',
    status_high: 'अधिक है',
    sensor_connected: 'IoT सेंसर सक्रिय',
    last_sync: 'अंतिम सिंक',

    // Weather Panel
    weather_panel_title: 'कृषि मौसम रडार एवं छिड़काव सलाहकार',
    weather_panel_desc: 'तापमान, आर्द्रता, वर्षा जोखिम, ओस बिंदु और सुरक्षित छिड़काव विंडो सूचकांक।',
    refresh_weather: 'रडार रीफ्रेश करें',
    current_temp: 'वर्तमान तापमान',
    feels_like: 'अनुभूत तापमान',
    current_humidity: 'हवा में नमी (आर्द्रता)',
    wind_speed: 'हवा की गति',
    dew_point: 'ओस बिंदु',
    delta_t: 'डेल्टा-टी',
    uv_index: 'UV विकिरण',
    spraying_safety: 'छिड़काव अनुकूलता',
    suitability_good: 'छिड़काव के लिए उत्तम',
    suitability_caution: 'सावधानी बरतें',
    suitability_avoid: 'छिड़काव न करें (वर्षा / तेज हवा)',
    hourly_title: 'प्रति घंटे का कृषि पूर्वानुमान',
    five_day_title: '5 दिवसीय मौसम पूर्वानुमान',
    rain_prob: 'वर्षा की संभावना',

    // History & Profile & Dashboard
    history_title: 'खेत निदान इतिहास व डायरी',
    history_desc: 'पिछले फसल स्कैन, मिट्टी परीक्षण और किए गए उपचारों का रिकॉर्ड।',
    empty_history: 'अभी तक कोई रिकॉर्ड दर्ज नहीं हुआ है।',
    export_history: 'सभी रिकॉर्ड एक्सपोर्ट करें',
    clear_history: 'इतिहास साफ़ करें',
    view_record: 'विवरण देखें',
    delete_record: 'हटाएं',
    profile_title: 'किसान प्रोफ़ाइल व खेत विवरण',
    sign_out: 'लॉग आउट',

    // Dashboard
    dashboard_hero_title: 'फसल स्वास्थ्य एवं गुणवत्ता डैशबोर्ड',
    dashboard_hero_tag: 'सटीक कृषि आसूचना',
    dashboard_cqi_title: 'फसल गुणवत्ता सूचकांक (CQI)',
    dashboard_cqi_desc: 'पत्ती स्वास्थ्य, मिट्टी पोषक तत्वों और मौसम जोखिम का समग्र स्कोर।',
    active_crops_label: 'सक्रिय फसलें',
    healthy_farms_label: 'स्वस्थ खेत',
    at_risk_label: 'कार्रवाई आवश्यक',
    total_acreage_label: 'कुल रकबा (एकड़)',
    quick_scan_cta: 'नई पत्ती की फोटो स्कैन करें',
    recent_activity_title: 'हालिया निदान रिकॉर्ड',
    soil_distribution_title: 'मृदा पोषक तत्व वितरण',

    // Chat
    chat_title: 'क्रॉप डॉक्टर AI सहायक',
    chat_desc: 'दवा की खुराक, खाद का मिश्रण, जैविक विधियों या मौसम सुरक्षा से संबंधित प्रश्न अपनी भाषा में पूछें।',
    chat_input_placeholder: 'फसल व खेती संबंधी प्रश्न यहां पूछें...',
    send: 'भेजें',
    quick_query_1: '1 एकड़ के लिए सटीक खाद खुराक की गणना करें',
    quick_query_2: 'क्या आज कीटनाशक छिड़काव करना सुरक्षित है?',
    quick_query_3: 'जैविक कीटनाशक घोल बनाने की विधि',
    quick_query_4: 'फसल सुधार के अगले चरण विस्तार से बताएं'
  },

  ta: {
    app_title: 'அக்ரிசென்ஸ் AI',
    app_subtitle: 'ஒருங்கிணைந்த பயிர் மருத்துவர் • புகைப்பட பார்வை • மண் IoT • வானிலை',
    version_tag: 'v3.7 பல முறைமை',
    nav_dashboard: 'டாஷ்போர்டு',
    nav_my_farm: 'எனது பண்ணை',
    nav_diagnose: 'நோய் கண்டறிதல்',
    nav_soil: 'மண் & சென்சார்கள்',
    nav_weather: 'வானிலை பகுப்பாய்வு',
    nav_history: 'வரலாறு & நாட்குறிப்பு',
    nav_profile: 'சுயவிவரம்',
    nav_ask_ai: 'பயிர் டாக்டர் AI',
    nav_help: 'உதவி வழிகாட்டி',
    intake_title: 'பயிர் சுகாதார மற்றும் நோய் கண்டறிதல் பிரிவு',
    intake_desc: 'இலை புகைப்படத்தை இணைத்து, அறிகுறிகளைத் தேர்வுசெய்து சிகிச்சை பரிந்துரைகளைப் பெறுங்கள்.',
    run_diagnosis_cta: 'பயிர் பரிசோதனை தொடங்கவும்',
    analyzing_cta: 'பயிர் பகுப்பாய்வு செய்யப்படுகிறது...',
    report_title: 'வேளாண் நிபுணர் அறிக்கை',
    primary_diagnosis: 'முதன்மை நோய் / பிரச்சனை',
    severity_label: 'தீவிரத்தன்மை',
    confidence_label: 'துல்லியம்',
    summary_label: 'சுருக்கம்',
    visual_findings_label: 'தென்படும் அறிகுறிகள்',
    soil_correlation_label: 'மண் ஊட்டச்சத்து பகுப்பாய்வு',
    weather_correlation_label: 'வானிலை & தெளிப்பு பாதுகாப்பு',
    action_plan_label: 'செயல் திட்டம் & தீர்வுகள்',
    cibrc_chemical_label: 'அங்கீகரிக்கப்பட்ட மருந்துகள் (CIBRC)',
    organic_remedies_label: 'இயற்கை & உயிரியல் முறைகள்',
    followup_label: 'விவசாயி செய்ய வேண்டியவை',
    expert_note_label: 'நிபுணர் ஆலோசனை',
    audio_listen: 'கேட்கவும் (ஆடியோ)',
    audio_speaking: 'அறிக்கை படிக்கப்படுகிறது...',
    export_pdf: 'அச்சிட / PDF',
    start_new_diagnosis: 'புதிய ஸ்கேன் தொடங்கவும்',
    dashboard_hero_title: 'பண்ணை நலம் & தர டாஷ்போர்டு',
    chat_title: 'பயிர் டாக்டர் AI உதவியாளர்',
    chat_input_placeholder: 'விவசாய கேள்விகளை இங்கே கேட்கவும்...',
    send: 'அனுப்பு'
  },

  kn: {
    app_title: 'ಅಗ್ರಿಸೆನ್ಸ್ AI',
    app_subtitle: 'ಸಮಗ್ರ ಬೆಳೆ ವೈದ್ಯ • ಫೋಟೋ ದೃಷ್ಟಿ • ಮಣ್ಣು IoT • ಹವಾಮಾನ',
    version_tag: 'v3.7 ಬಹು-ಮಾದರಿ',
    nav_dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    nav_my_farm: 'ನನ್ನ ಜಮೀನು',
    nav_diagnose: 'ರೋಗ ಪತ್ತೆ ಕೇಂದ್ರ',
    nav_soil: 'ಮಣ್ಣು ಮತ್ತು ಸೆನ್ಸಾರ್‌ಗಳು',
    nav_weather: 'ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ',
    nav_history: 'ಇತಿಹಾಸ ಮತ್ತು ಡೈರಿ',
    nav_profile: 'ಪ್ರೊಫೈಲ್',
    nav_ask_ai: 'ಕ್ರಾಪ್ ಡಾಕ್ಟರ್ AI',
    nav_help: 'ಮಾರ್ಗದರ್ಶಿ',
    intake_title: 'ಬೆಳೆ ಆರೋಗ್ಯ ಮತ್ತು ರೋಗ ತಪಾಸಣಾ ಕೇಂದ್ರ',
    intake_desc: 'ಎಲೆಯ ಫೋಟೋ ಲಗತ್ತಿಸಿ, ಲಕ್ಷಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    run_diagnosis_cta: 'ಬೆಳೆ ತಪಾಸಣೆ ಪ್ರಾರಂಭಿಸಿ',
    analyzing_cta: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    report_title: 'ಕೃಷಿ ತಜ್ಞರ ವರದಿ',
    primary_diagnosis: 'ಪ್ರಮುಖ ರೋಗ / ಸಮಸ್ಯೆ',
    severity_label: 'ತೀವ್ರತೆ ಮಟ್ಟ',
    confidence_label: 'ನಿಖರತೆ',
    summary_label: 'ಸಾರಾಂಶ',
    visual_findings_label: 'ಕಾಣುವ ಲಕ್ಷಣಗಳು',
    soil_correlation_label: 'ಮಣ್ಣಿನ ಪೋಷಕಾಂಶ ವಿಶ್ಲೇಷಣೆ',
    weather_correlation_label: 'ಹವಾಮಾನ ಮತ್ತು ಸಿಂಪಡಣೆ ಸುರಕ್ಷತೆ',
    action_plan_label: 'ಕ್ರಿಯಾ ಯೋಜನೆ',
    cibrc_chemical_label: 'ಅನುಮೋದಿತ ಔಷಧಗಳು (CIBRC)',
    organic_remedies_label: 'ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ನಿಯಂತ್ರಣ',
    followup_label: 'ಮುಂದಿನ ಕ್ರಮಗಳು',
    expert_note_label: 'ತಜ್ಞರ ಸಲಹೆ',
    audio_listen: 'ಆಲಿಸಿ (ಆಡಿಯೋ)',
    audio_speaking: 'ವರದಿ ಓದಲಾಗುತ್ತಿದೆ...',
    export_pdf: 'ಪಿಡಿಎಫ್ ಮುದ್ರಿಸಿ',
    start_new_diagnosis: 'ಹೊಸ ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ',
    dashboard_hero_title: 'ಬೆಳೆ ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    chat_title: 'ಕ್ರಾಪ್ ಡಾಕ್ಟರ್ AI ಸಹಾಯಕ',
    chat_input_placeholder: 'ಕೃಷಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಇಲ್ಲಿ ಕೇಳಿ...',
    send: 'ಕಳುಹಿಸಿ'
  },

  es: {
    app_title: 'AgriSense AI',
    app_subtitle: 'Doctor de Cultivos Unificado • Visión por Foto • IoT de Suelo • Clima',
    version_tag: 'v3.7 Multimodal',
    nav_dashboard: 'Panel Principal',
    nav_my_farm: 'Mi Finca',
    nav_diagnose: 'Diagnóstico',
    nav_soil: 'Suelo y Sensores',
    nav_weather: 'Analítica Climática',
    nav_history: 'Historial y Diario',
    nav_profile: 'Perfil',
    nav_ask_ai: 'Doctor IA',
    nav_help: 'Ayuda y Guía',
    intake_title: 'Admisión de Diagnóstico de Cultivos',
    intake_desc: 'Adjunte foto de la hoja, seleccione síntomas y revise telemetría para prescripción en tiempo real.',
    run_diagnosis_cta: 'Ejecutar Diagnóstico Ahora',
    analyzing_cta: 'Analizando Cultivo y Sensores...',
    report_title: 'Informe Diagnóstico Agronómico',
    primary_diagnosis: 'Diagnóstico Principal',
    severity_label: 'Nivel de Severidad',
    confidence_label: 'Confianza del Modelo',
    summary_label: 'Resumen Agronómico',
    visual_findings_label: 'Síntomas y Signos Visuales',
    soil_correlation_label: 'Interacción del Suelo',
    weather_correlation_label: 'Clima y Seguridad de Pulverización',
    action_plan_label: 'Plan de Acción Prescrito',
    cibrc_chemical_label: 'Formulación Química Autorizada',
    organic_remedies_label: 'Soluciones Orgánicas y Biológicas',
    followup_label: 'Lista de Seguimiento',
    expert_note_label: 'Nota del Asesor Agrónomo',
    audio_listen: 'Escuchar (Audio)',
    audio_speaking: 'Leyendo informe...',
    export_pdf: 'Exportar / Imprimir PDF',
    start_new_diagnosis: 'Iniciar Nuevo Escaneo',
    dashboard_hero_title: 'Panel de Salud y Calidad del Cultivo',
    chat_title: 'Asistente Agrónomo IA',
    chat_input_placeholder: 'Haga cualquier pregunta agrícola aquí...',
    send: 'Enviar'
  }
};

/**
 * Get static translated string by key with language fallback
 */
export function t(key: string, lang: string = 'en', fallback?: string): string {
  const targetDict = TRANSLATIONS[lang];
  if (targetDict && targetDict[key]) {
    return targetDict[key];
  }
  const enDict = TRANSLATIONS['en'];
  if (enDict && enDict[key]) {
    return enDict[key];
  }
  return fallback || key;
}

/**
 * Comprehensive Term and Entity Multi-lingual Dictionary
 */
export const TERM_TRANSLATION_MAP: Record<string, Record<string, string>> = {
  // Severities & Confidence
  'Healthy': { te: 'ఆరోగ్యంగా ఉంది', hi: 'स्वस्थ', ta: 'ஆரோக்கியமானது', kn: 'ಆರೋಗ್ಯಕರ', es: 'Saludable', fr: 'Sain' },
  'Mild': { te: 'స్వల్పం', hi: 'हल्का', ta: 'லேசானது', kn: 'ಸೌಮ್ಯ', es: 'Leve', fr: 'Léger' },
  'Moderate': { te: 'మధ్యస్థం', hi: 'मध्यम', ta: 'மிதமான', kn: 'ಮಧ್ಯಮ', es: 'Moderado', fr: 'Modéré' },
  'Severe': { te: 'తీవ్రం', hi: 'गंभीर', ta: 'கடுமையான', kn: 'ತೀವ್ರ', es: 'Severo', fr: 'Sévère' },
  'Critical': { te: 'అత్యంత విషమం', hi: 'अत्यधिक गंभीर', ta: 'மிகவும் ஆபத்தானது', kn: 'ಅತ್ಯಂತ ಗಂಭೀರ', es: 'Crítico', fr: 'Critique' },
  'High confidence (>85%)': { te: 'అధిక ఖచ్చితత్వం (>85%)', hi: 'उच्च सटीकता (>85%)', ta: 'உயர் துல்லியம் (>85%)', kn: 'ಹೆಚ್ಚಿನ ನಿಖರತೆ (>85%)', es: 'Alta confianza (>85%)' },
  'Moderate confidence (60-85%)': { te: 'మధ్యస్థ ఖచ్చితత్వం (60-85%)', hi: 'मध्यम सटीकता (60-85%)', ta: 'மிதமான துல்லியம் (60-85%)', kn: 'ಮಧ್ಯಮ ನಿಖರತೆ (60-85%)', es: 'Confianza moderada (60-85%)' },
  'Preliminary screening (needs confirmation)': { te: 'ప్రాథమిక పరిశీలన (నిర్ధారణ అవసరం)', hi: 'प्रारंभिक जांच (पुष्टि आवश्यक)', ta: 'ஆரம்ப ஆய்வு', kn: 'ಪ್ರಾಥಮಿಕ ತಪಾಸಣೆ', es: 'Detección preliminar' },

  // Soil & Weather Status Badges
  'Contributing to Stress': { te: 'ఒత్తిడిని పెంచుతోంది', hi: 'तनाव बढ़ा रहा है', ta: 'அழுத்தத்தை அதிகரிக்கிறது', kn: 'ಒತ್ತಡ ಹೆಚ್ಚಿಸುತ್ತಿದೆ', es: 'Contribuye al estrés' },
  'Optimal': { te: 'సరిపడా ఉంది (అనుకూలం)', hi: 'अनुकूल', ta: 'உகந்தது', kn: 'ಸೂಕ್ತವಾಗಿದೆ', es: 'Óptimo', fr: 'Optimal' },
  'Deficiency Detected': { te: 'పోషకాల లోపం గుర్తించబడింది', hi: 'पोषक तत्वों की कमी', ta: 'ஊட்டச்சத்து குறைபாடு', kn: 'ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ', es: 'Deficiencia detectada' },
  'High': { te: 'అధికం', hi: 'उच्च', ta: 'அதிகம்', kn: 'ಹೆಚ್ಚು', es: 'Alto', fr: 'Élevé' },
  'Extremely High': { te: 'అత్యంత అధికం', hi: 'अत्यधिक उच्च', ta: 'மிகவும் அதிகம்', kn: 'ಅತ್ಯಂತ ಹೆಚ್ಚು', es: 'Extremadamente alto' },
  'Low': { te: 'తక్కువ', hi: 'कम', ta: 'குறைவு', kn: 'ಕಡಿಮೆ', es: 'Bajo', fr: 'Faible' },

  // Growth stages
  'New Vegetative Flush & Panicle Emergence': { te: 'లేత చిగుర్లు & పూత వచ్చే దశ', hi: 'नई पत्तियां व फूल आने की अवस्था', ta: 'புதிய தளிர் & பூக்கும் நிலை', kn: 'ಹೊಸ ಚಿಗುರು ಮತ್ತು ಹೂಬಿಡುವ ಹಂತ', es: 'Brote vegetativo y floración' },
  'Tillering to Panicle Emergence': { te: 'పిలకల నుండి కంకి వచ్చే దశ', hi: 'कल्ले फूटने से बाली निकलने की अवस्था', ta: 'தூர்கட்டுதல் முதல் பூக்கும் வரை', kn: 'ಕವಲೊಡೆಯುವ ಮತ್ತು ಹೂಬಿಡುವ ಹಂತ', es: 'Ahijamiento a emergencia de panícula' },
  'Vegetative Growth': { te: 'శాకీయ ఎదుగుదల దశ', hi: 'वानस्पतिक वृद्धि अवस्था', ta: 'வளர்ச்சி நிலை', kn: 'ಸಸ್ಯೀಯ ಬೆಳವಣಿಗೆ ಹಂತ', es: 'Crecimiento vegetativo' },
  'Vegetative to Early Flowering': { te: 'ఎదుగుదల నుండి పూత ప్రారంభ దశ', hi: 'वृद्धि से प्रारंभिक फूल अवस्था', ta: 'வளர்ச்சி முதல் பூக்கும் நிலை வரை', kn: 'ಬೆಳವಣಿಗೆಯಿಂದ ಹೂಬಿಡುವ ಹಂತ', es: 'Vegetativo a floración temprana' },
  'Peak Flowering & Squaring (40-75 DAS)': { te: 'పూర్తి పూత & మొగ్గ దశ (40-75 రోజులు)', hi: 'पूर्ण फूल व गूलर अवस्था (40-75 दिन)', ta: 'முழு பூக்கும் நிலை (40-75 நாட்கள்)', kn: 'ಹೂಬಿಡುವ ಹಂತ (40-75 ದಿನಗಳು)', es: 'Floración máxima (40-75 DAS)' },
  'Fruit Setting & Cluster Expansion (50-70 DAS)': { te: 'కాయ కట్టే దశ & గుత్తుల విస్తరణ (50-70 రోజులు)', hi: 'फल विकास अवस्था (50-70 दिन)', ta: 'காய் பிடிக்கும் நிலை (50-70 நாட்கள்)', kn: 'ಕಾಯಿ ಕಟ್ಟುವ ಹಂತ (50-70 ದಿನಗಳು)', es: 'Cuajado de fruto (50-70 DAS)' },
  'Active Tillering & Panicle Primordia (35-55 DAS)': { te: 'చురుకైన పిలకలు & కంకి మొదలయ్యే దశ (35-55 రోజులు)', hi: 'सक्रिय कल्ले फूटने की अवस्था (35-55 दिन)', ta: 'தீவிர தூர்கட்டுதல் நிலை (35-55 நாட்கள்)', kn: 'ಚುರುಕಾದ ಕವಲೊಡೆಯುವ ಹಂತ', es: 'Ahijamiento activo (35-55 DAS)' },

  // Crops
  'Cashew (Anacardium occidentale)': { te: 'జీడిమామిడి (Cashew)', hi: 'काजू (Cashew)', ta: 'முந்திரி (Cashew)', kn: 'ಗೇರು (Cashew)', es: 'Anacardo (Cashew)' },
  'Cashew': { te: 'జీడిమామిడి', hi: 'काजू', ta: 'முந்திரி', kn: 'ಗೇರು', es: 'Anacardo' },
  'Rice / Paddy (Oryza sativa)': { te: 'వరి / ధాన్యం (Paddy)', hi: 'धान / चावल (Paddy)', ta: 'நெல் (Paddy)', kn: 'ಭತ್ತ (Paddy)', es: 'Arroz (Paddy)' },
  'Rice': { te: 'వరి', hi: 'धान', ta: 'நெல்', kn: 'ಭತ್ತ', es: 'Arroz' },
  'Paddy': { te: 'వరి', hi: 'धान', ta: 'நெல்', kn: 'ಭತ್ತ', es: 'Arroz' },
  'Tomato (Solanum lycopersicum)': { te: 'టమోటా (Tomato)', hi: 'टमाटर (Tomato)', ta: 'தக்காளி (Tomato)', kn: 'ಟೊಮೆಟೊ (Tomato)', es: 'Tomate' },
  'Tomato': { te: 'టమోటా', hi: 'टमाटर', ta: 'தக்காளி', kn: 'ಟೊಮೆಟೊ', es: 'Tomate' },
  'Cotton (Gossypium hirsutum)': { te: 'పత్తి (Cotton)', hi: 'कपास (Cotton)', ta: 'பருத்தி (Cotton)', kn: 'ಹತ್ತಿ (Cotton)', es: 'Algodón' },
  'Cotton': { te: 'పత్తి', hi: 'कपास', ta: 'பருத்தி', kn: 'ಹತ್ತಿ', es: 'Algodón' },
  'Apple (Malus domestica)': { te: 'యాపిల్ (Apple)', hi: 'सेब (Apple)', ta: 'ஆப்பிள் (Apple)', kn: 'ಸೇಬು (Apple)', es: 'Manzana' },
  'Apple': { te: 'యాపిల్', hi: 'सेब', ta: 'ஆப்பிள்', kn: 'ಸೇಬು', es: 'Manzana' },
  'Maize (Corn)': { te: 'మొక్కజొన్న (Maize)', hi: 'मक्का (Maize)', ta: 'மக்காச்சோளம்', kn: 'ಮೆಕ್ಕೆಜೋಳ', es: 'Maíz' },
  'Chilli (Pepper)': { te: 'మిరప (Chilli)', hi: 'मिर्च (Chilli)', ta: 'மிளகாய்', kn: 'ಮೆಣಸಿನಕಾಯಿ', es: 'Chile / Pimiento' },
  'Potato (Solanum tuberosum)': { te: 'బంగాళాదుంప (Potato)', hi: 'आलू (Potato)', ta: 'உருளைக்கிழங்கு', kn: 'ಆಲೂಗಡ್ಡೆ', es: 'Patata' },

  // Varieties
  'BPP-8 / VRI-3 (Palasa Special Selection)': { te: 'BPP-8 / VRI-3 (పలాస స్పెషల్ సెలెక్షన్)', hi: 'BPP-8 / VRI-3 (पलासा विशेष)', ta: 'BPP-8 / VRI-3 (பலாசா ரகம்)', kn: 'BPP-8 / VRI-3 (ಪಲಾಸ ವಿಶೇಷ)' },
  'Basmati 1121 / Pusa 1509': { te: 'బాస్మతి 1121 / పూసా 1509', hi: 'बासमती 1121 / पूसा 1509', ta: 'பாசுமதி 1121 / பூசா 1509', kn: 'ಬಾಸ್ಮತಿ 1121 / ಪೂಸಾ 1509' },
  'Bt Cotton BG-II (Bollgard-2 Hybrid)': { te: 'బీటీ పత్తి బీజీ-2 (బోల్‌గార్డ్-2 హైబ్రిడ్)', hi: 'बीटी कपास बीजी-2 (बोलगार्ड-2 संकर)', ta: 'பிடி பருத்தி பிஜி-2', kn: 'ಬಿಟಿ ಹತ್ತಿ ಬಿಜಿ-2' },
  'Kashmiri Royal Delicious (Red Gold)': { te: 'కాశ్మీరీ రాయల్ డెలిషియస్ (రెడ్ గోల్డ్)', hi: 'कश्मीरी रॉयल डिलीशियस (रेड गोल्ड)', ta: 'காஷ்மீரி ராயல் டெலிசியஸ்', kn: 'ಕಾಶ್ಮೀರಿ ರಾಯಲ್ ಡೆಲಿಶಿಯಸ್' },
  'Pusa Ruby / Arka Rakshak F1': { te: 'పూసా రూబీ / అర్కా రక్షక్ F1', hi: 'पूसा रूबी / अर्का रक्षक F1', ta: 'பூசா ரூபி / அர்கா ரக்ஷக் F1', kn: 'ಪೂಸಾ ರೂಬಿ / ಅರ್ಕಾ ರಕ್ಷಕ್ F1' },

  // Major Diagnoses
  'Tea Mosquito Bug (Helopeltis antonii) & Shoot Die-Back (Cashew Anthracnose)': {
    te: 'టీ దోమ (హెలోపెల్టిస్) & కొమ్మ ఎండు తెగులు (జీడిమామిడి ఆంత్రాక్నోస్)',
    hi: 'टी मॉस्किटो बग एवं टहनी सूखने का रोग (काजू एन्थ्रेक्नोज)',
    ta: 'தேயிலை கொசு வண்டு & நுனி கருகல் நோய் (முந்திரி)',
    kn: 'ಟೀ ಸೊಳ್ಳೆ ಕೀಟ ಮತ್ತು ಕೊಂಬೆ ಒಣಗುವ ರೋಗ (ಗೇರು)',
    es: 'Chinche del té y muerte regresiva del anacardo'
  },
  'Rice Blast (Magnaporthe oryzae) & High Nitrogen Fertilizer Imbalance': {
    te: 'వరి మెడవిరుపు / అగ్గితెగులు (బ్లాస్ట్) & అధిక నత్రజని ఎరువుల అసమతుల్యత',
    hi: 'धान का झुलसा रोग (ब्लास्ट) एवं अत्यधिक नाइट्रोजन असंतुलन',
    ta: 'நெல் குலை நோய் & அதிக தழைச்சத்து சமநிலையின்மை',
    kn: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ ಮತ್ತು ಅತಿಯಾದ ಸಾರಜನಕ ಅಸಮತೋಲನ',
    es: 'Piricularia del arroz y exceso de nitrógeno'
  },
  'Rice Blast (Magnaporthe oryzae) & Excess Nitrogen Stress': {
    te: 'వరి అగ్గితెగులు (బ్లాస్ట్) & అధిక నత్రజని ఒత్తిడి',
    hi: 'धान का झुलसा रोग (ब्लास्ट) एवं अत्यधिक नाइट्रोजन तनाव',
    ta: 'நெல் குலை நோய் & அதிக தழைச்சத்து அழுத்தம்',
    kn: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ ಮತ್ತು ಅತಿಯಾದ ಸಾರಜನಕ ಒತ್ತಡ'
  },
  'Cotton Leaf Curl Virus (CLCuV) & Whitefly Infestation': {
    te: 'పత్తి ఆకు ముడుత వైరస్ (CLCuV) & తెల్లదోమల దాడి',
    hi: 'कपास पत्ती मरोड़ वायरस (CLCuV) एवं सफेद मक्खी का प्रकोप',
    ta: 'பருத்தி இலை சுருள் வைரஸ் & வெள்ளை ஈ தாக்குதல்',
    kn: 'ಹತ್ತಿ ಎಲೆ ಮುಟುರು ವೈರಸ್ ಮತ್ತು ಬಿಳಿ ನೊಣದ ಬಾಧೆ',
    es: 'Virus del enrollamiento de la hoja del algodón'
  },
  'Apple Scab (Venturia inaequalis) & Foliar Nutrient Stress': {
    te: 'యాపిల్ స్కాబ్ తెగులు (వెంచురియా) & ఆకుల పోషకాల లోపం',
    hi: 'सेब का स्केब रोग (वेंचुरिया) एवं पर्णीय पोषक तत्व तनाव',
    ta: 'ஆப்பிள் ஸ்கேப் நோய்',
    kn: 'ಸೇಬು ಸ್ಕ್ಯಾಬ್ ರೋಗ',
    es: 'Moteado del manzano (Venturia inaequalis)'
  },
  'Early Leaf Blight (Alternaria solani) with Nutrient Stress': {
    te: 'ముందస్తు ఆకుమచ్చ తెగులు (ఆల్టర్నేరియా ఎర్లీ బ్లైట్) & పోషకాల లోపం',
    hi: 'अगेती झुलसा रोग (अर्ली ब्लाइट) एवं पोषक तत्व तनाव',
    ta: 'ஆரம்ப இலை கருகல் நோய்',
    kn: 'ಆರಂಭಿಕ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ',
    es: 'Tizón temprano (Alternaria solani)'
  },

  // Action Priority strings
  'Immediate (0-24 hrs)': { te: 'తక్షణ చర్యలు (0-24 గంటలు)', hi: 'तत्काल कदम (0-24 घंटे)', ta: 'உடனடி நடவடிக்கை (0-24 மணிநேரம்)', kn: 'ತಕ್ಷಣದ ಕ್ರಮಗಳು (0-24 ಗಂಟೆ)', es: 'Inmediato (0-24 hrs)' },
  'Short Term (2-4 days)': { te: 'స్వల్పకాలిక చర్యలు (2-4 రోజులు)', hi: 'अल्पकालिक कदम (2-4 दिन)', ta: 'குறுகிய கால நடவடிக்கை (2-4 நாட்கள்)', kn: 'ಸ್ವಲ್ಪ ಸಮಯದ ಕ್ರಮಗಳು (2-4 ದಿನ)', es: 'Corto plazo (2-4 días)' },
  'Preventive / Maintenance': { te: 'ముందస్తు నివారణ & నిర్వహణ', hi: 'निवारक व रखरखाव', ta: 'தடுப்பு மற்றும் பராமரிப்பு', kn: 'ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು', es: 'Preventivo / Mantenimiento' },

  // Action Titles & Types
  'Targeted Systemic Fungicide Spray': { te: 'లక్ష్యిత సిస్టమిక్ శిలీంధ్రనాశిని పిచికారీ', hi: 'लक्षित प्रणालीगत फफूंदनाशी छिड़काव', ta: 'முறையான பூஞ்சாணக்கொல்லி தெளிப்பு', kn: 'ವ್ಯವಸ್ಥಿತ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪರಣೆ' },
  'Targeted Insecticide Spray for Sucking Pests': { te: 'రసం పీల్చే పురుగుల నివారణకు పురుగుమందు పిచికారీ', hi: 'रस चूसक कीटों के लिए कीटनाशक छिड़काव', ta: 'பூச்சிக்கொல்லி தெளிப்பு', kn: 'ಕೀಟನಾಶಕ ಸಿಂಪರಣೆ' },
  'Potassium Soil Supplementation & Water Aeration': { te: 'పొటాషియం పోషకాల సవరణ & నీటి పారుదల నియంత్రణ', hi: 'पोटाश आपूर्ति एवं जल प्रबंधन', ta: 'பொட்டாசியம் உரம் மற்றும் நீர் மேலாண்மை', kn: 'ಪೊಟ್ಯಾಶ್ ಪೂರೈಕೆ ಮತ್ತು ನೀರಿನ ನಿರ್ವಹಣೆ' },
  'Whitefly Population Knockdown & Vector Suppression': { te: 'తెల్లదోమల నియంత్రణ & వైరస్ వ్యాప్తి నిరోధం', hi: 'सफेद मक्खी नियंत्रण व वायरस रोकथाम', ta: 'வெள்ளை ஈ கட்டுப்பாடு', kn: 'ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣ' },
  'Protective & Curative Fungicide Application': { te: 'రక్షణ & నివారణ శిలీంధ్రనాశిని పిచికారీ', hi: 'सुरक्षात्मक व उपचारात्मक फफूंदनाशी छिड़काव', ta: 'பூஞ்சாணக்கொல்லி பயன்பாடு', kn: 'ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಕೆ' },

  // Organic Remedies
  'Pseudomonas fluorescens Bio-Control Spray': { te: 'స్యూడోమోనాస్ ఫ్లోరోసెన్స్ జీవ నియంత్రణ పిచికారీ', hi: 'स्यूडोमोनास फ्लोरोसेंस जैविक छिड़काव', ta: 'சூடோமோனாஸ் தெளிப்பு', kn: 'ಸ್ಯೂಡೋಮೊನಾಸ್ ಜೈವಿಕ ಸಿಂಪರಣೆ' },
  'Fermented Cow Urine & Neem Solution (Panchagavya)': { te: 'పులిసిన ఆవు మూత్రం, వేప మరియు పంచగవ్య ద్రావణం', hi: 'पंचगव्य एवं नीम का घोल', ta: 'பஞ்சகவ்யா மற்றும் வேப்பங்கொட்டை கரைசல்', kn: 'ಪಂಚಗವ್ಯ ಮತ್ತು ಬೇವಿನ ದ್ರಾವಣ' },
  'Neem Oil (Azadirachtin 10,000 ppm) Emulsion': { te: 'వేపనూనె (అజాడిరక్టిన్ 10,000 ppm) ద్రావణం', hi: 'नीम का तेल (10,000 ppm) घोल', ta: 'வேப்பெண்ணெய் கரைசல்', kn: 'ಬೇವಿನ ಎಣ್ಣೆ ದ್ರಾವಣ' },
  'Yellow Sticky Traps & Castor Border Barrier': { te: 'పసుపు రంగు జిగురు అట్టలు & ఆముదం రక్షణ కంచె', hi: 'पीले चिपचिपे जाल व अरंडी की बाड़', ta: 'மஞ்சள் ஒட்டும் பொறிகள்', kn: 'ಹಳದಿ ಅಂಟು ಬಲೆಗಳು' },

  // Problems & Symptoms
  'Whitefly swarms on leaf underside & sooty mold': { te: 'ఆకుల వెనుక భాగంలో తెల్లదోమ సమూహాలు & నల్లటి బూజు', hi: 'पत्तियों के नीचे सफेद मक्खी व काला फफूंद', ta: 'இலைகளின் அடியில் வெள்ளை ஈக்கள்', kn: 'ಎಲೆಗಳ ಕೆಳಗೆ ಬಿಳಿ ನೊಣಗಳು' },
  'Aphids, curling & sticky honeydew secretion': { te: 'పేనుబంక (ఆఫిడ్స్), ఆకులు ముడుచుకోవడం & జిగురు స్రావం', hi: 'माहू (एफिड्स), पत्ती मुड़ना व चिपचिपा स्राव', ta: 'அசுவினி பூச்சிகள் & இலை சுருளல்', kn: 'ಹೇನು ಕೀಟಗಳು ಮತ್ತು ಜಿಗುಟು ಸ್ರವಿಸುವಿಕೆ' },
  'Caterpillar / Armyworm windowpane feeding & holes': { te: 'లద్దెపురుగు / పచ్చపురుగు ఆకులను కొరికి రంధ్రాలు చేయడం', hi: 'इल्ली / सुंडी द्वारा पत्तियों को काटना व छेद करना', ta: 'புழுக்கள் இலைகளை அரித்து துளையிடுதல்', kn: 'ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು ಮತ್ತು ಎಲೆ ರಂಧ್ರಗಳು' },
  'Stem / shoot borer holes with sawdust-like frass': { te: 'కాండం / కొమ్మ తొలుచు పురుగు & చెక్కపొట్టు వంటి వ్యర్థాలు', hi: 'तना छेदक कीट के छेद व बुरादा जैसा कचरा', ta: 'தண்டு துளைப்பான் புழு', kn: 'ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು' },
  'Thrips feeding, silver sheen & upward leaf edge curl': { te: 'తామర పురుగులు (థ్రిప్స్), వెండి మెరుపు & ఆకుల అంచులు పైకి ముడుచుకోవడం', hi: 'थ्रिप्स का प्रकोप, चांदी जैसी चमक व पत्तियां ऊपर मुड़ना', ta: 'இலைப்பேன் தாக்குதல்', kn: 'ತಾಮ್ರ ಕೀಟಗಳ ಬಾಧೆ' },
  'Red spider mites & fine webbing under foliage': { te: 'ఎర్ర నల్లి (మైట్స్) & ఆకుల కింద సన్నని బూజు గూడు', hi: 'लाल मकड़ी व पत्तियों के नीचे जाला', ta: 'சிவப்பு சிலந்தி பேன்', kn: 'ಕೆಂಪು ಜೇಡರ ಕೀಟ' },
  'Leaf miner serpentine silvery-white tunnels': { te: 'ఆకు తొలుచు పురుగు (లీఫ్ మైనర్) గీసిన తెల్లటి వంకరటింకర గీతలు', hi: 'पत्ती सुरंग कीट की टेढ़ी-मेढ़ी सफेद धारियां', ta: 'இலை துளைப்பான்', kn: 'ಎಲೆ ಸುರಂಗ ಹುಳು' },
  'Yellowing of lower / older leaves (Nitrogen chlorosis)': { te: 'దిగువ / ముదిరిన ఆకులు పసుపు రంగులోకి మారడం (నత్రజని లోపం)', hi: 'निचली / पुरानी पत्तियों का पीला पड़ना (नाइट्रोजन की कमी)', ta: 'கீழ் இலைகள் மஞ்சள் நிறமாக மாறுதல்', kn: 'ಕೆಳಗಿನ ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು' },
  'Concentric dark brown target-rings (Early Blight / Alternaria)': { te: 'ముదురు గోధుమ రంగు వలయాల మచ్చలు (ఎర్లీ బ్లైట్ / ఆల్టర్నేరియా)', hi: 'गहरे भूरे रंग के छल्लेदार धब्बे (अगेती झुलसा)', ta: 'வட்ட வடிவ கருகல் புள்ளிகள்', kn: 'ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಚುಕ್ಕೆಗಳು' },
  'Water-soaked black/brown rotting lesions (Late Blight)': { te: 'నీటితో నానిన నల్లటి/గోధుమ రంగు కుళ్లు మచ్చలు (లేట్ బ్లైట్)', hi: 'पानी से भीगे काले/भूरे सड़न वाले धब्बे (पछेती झुलसा)', ta: 'நீர் தோய்ந்த அழுகல் புள்ளிகள்', kn: 'ನೀರಿನಿಂದ ನೆನೆದಂತಹ ಕೊಳೆತ ಕಲೆಗಳು' },
  'Spindle / eye-shaped spots with gray center (Blast)': { te: 'బూడిద రంగు కేంద్రంతో కంటి ఆకారపు మచ్చలు (అగ్గితెగులు / బ్లాస్ట్)', hi: 'धूसर केंद्र वाले आंख के आकार के धब्बे (झुलसा / ब्लास्ट)', ta: 'கண் வடிவ குலை நோய் புள்ளிகள்', kn: 'ಕಣ್ಣಿನ ಆಕಾರದ ಬೆಂಕಿ ರೋಗದ ಚುಕ್ಕೆಗಳು' },
  'White powdery fungal talc-like dust on leaf surface': { te: 'ఆకులపై తెల్లటి బూడిద వంటి పొడి (బూడిద తెగులు / పౌడరీ మిల్డో)', hi: 'पत्तियों पर सफेद पाउडर जैसा फफूंद (चूर्णी फफूंद)', ta: 'வெள்ளை சாம்பல் நோய்', kn: 'ಬಿಳಿ ಬೂದಿ ರೋಗ' },
  'Upward leaf cupping & vein thickening (Viral / Heat stress)': { te: 'ఆకులు పైకి దోనెలా ముడుచుకోవడం & ఈనెలు లావెక్కడం (వైరస్ / ఎండ ఒత్తిడి)', hi: 'पत्तियों का ऊपर मुड़ना व नसों का मोटा होना (वायरस)', ta: 'இலைகள் மேல்நோக்கி சுருளுதல்', kn: 'ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಮುದುರುವುದು' },
  'Premature shedding / dropping of flowers, buds, or pin-head fruit': { te: 'పూత, పిందెలు మరియు మొగ్గలు అకాలంగా రాలిపోవడం', hi: 'फूल, कलियों और छोटे फलों का समय से पहले गिरना', ta: 'பூக்கள் மற்றும் பிஞ்சுகள் உதிர்தல்', kn: 'ಹೂವು ಮತ್ತು ಸಣ್ಣ ಕಾಯಿಗಳು ಉದುರುವುದು' }
};

/**
 * Intelligent Bidirectional & Phrase-Level Dynamic Text Translator
 */
export function translateDynamicText(text: string, targetLang: string = 'en'): string {
  if (!text) return '';
  if (targetLang === 'en') return text;

  const cleanText = text.trim();

  // 1. Direct forward lookup in English canonical key
  if (TERM_TRANSLATION_MAP[cleanText] && TERM_TRANSLATION_MAP[cleanText][targetLang]) {
    return TERM_TRANSLATION_MAP[cleanText][targetLang];
  }

  // 2. Reverse lookup: If text is already in another language, find canonical English key then target
  for (const [canonicalKey, translations] of Object.entries(TERM_TRANSLATION_MAP)) {
    // Check if input matches any language value
    for (const [langCode, val] of Object.entries(translations)) {
      if (val.toLowerCase() === cleanText.toLowerCase()) {
        return translations[targetLang] || canonicalKey;
      }
    }
  }

  // 3. Case-insensitive forward match
  for (const [key, mapping] of Object.entries(TERM_TRANSLATION_MAP)) {
    if (mapping[targetLang] && key.toLowerCase() === cleanText.toLowerCase()) {
      return mapping[targetLang];
    }
  }

  // 4. Substring token replacement for compound sentences
  let result = text;
  let hasReplaced = false;

  for (const [key, mapping] of Object.entries(TERM_TRANSLATION_MAP)) {
    if (mapping[targetLang] && result.includes(key)) {
      result = result.split(key).join(mapping[targetLang]);
      hasReplaced = true;
    }
  }

  return result;
}

/**
 * Translate an entire IntegratedCropAnalysis object recursively to target language
 */
export function translateDiagnosis(
  diagnosis: IntegratedCropAnalysis,
  targetLang: string = 'en'
): IntegratedCropAnalysis {
  if (!diagnosis) return diagnosis;
  if (targetLang === 'en') return diagnosis;

  return {
    ...diagnosis,
    cropName: translateDynamicText(diagnosis.cropName, targetLang),
    cropVariety: diagnosis.cropVariety ? translateDynamicText(diagnosis.cropVariety, targetLang) : diagnosis.cropVariety,
    stageOfGrowth: translateDynamicText(diagnosis.stageOfGrowth, targetLang),
    primaryDiagnosis: translateDynamicText(diagnosis.primaryDiagnosis, targetLang),
    confidence: translateDynamicText(diagnosis.confidence, targetLang),
    severityLevel: translateDynamicText(diagnosis.severityLevel, targetLang),
    summary: translateDynamicText(diagnosis.summary, targetLang),
    visualMarkerFindings: Array.isArray(diagnosis.visualMarkerFindings)
      ? diagnosis.visualMarkerFindings.map((f) => translateDynamicText(f, targetLang))
      : diagnosis.visualMarkerFindings,
    soilCorrelation: diagnosis.soilCorrelation
      ? {
          status: translateDynamicText(diagnosis.soilCorrelation.status, targetLang),
          details: translateDynamicText(diagnosis.soilCorrelation.details, targetLang),
          suggestedAmendments: Array.isArray(diagnosis.soilCorrelation.suggestedAmendments)
            ? diagnosis.soilCorrelation.suggestedAmendments.map((a) => translateDynamicText(a, targetLang))
            : diagnosis.soilCorrelation.suggestedAmendments
        }
      : diagnosis.soilCorrelation,
    weatherCorrelation: diagnosis.weatherCorrelation
      ? {
          diseaseSpreadRisk: translateDynamicText(diagnosis.weatherCorrelation.diseaseSpreadRisk, targetLang),
          sprayingWindowAlert: translateDynamicText(diagnosis.weatherCorrelation.sprayingWindowAlert, targetLang),
          irrigationRecommendation: translateDynamicText(diagnosis.weatherCorrelation.irrigationRecommendation, targetLang)
        }
      : diagnosis.weatherCorrelation,
    actionPlan: Array.isArray(diagnosis.actionPlan)
      ? diagnosis.actionPlan.map((step) => ({
          ...step,
          priority: translateDynamicText(step.priority, targetLang),
          title: translateDynamicText(step.title, targetLang),
          description: translateDynamicText(step.description, targetLang),
          dosage: step.dosage ? translateDynamicText(step.dosage, targetLang) : step.dosage,
          safetyNote: step.safetyNote ? translateDynamicText(step.safetyNote, targetLang) : step.safetyNote
        }))
      : diagnosis.actionPlan,
    organicRemedies: Array.isArray(diagnosis.organicRemedies)
      ? diagnosis.organicRemedies.map((remedy) => ({
          ...remedy,
          title: translateDynamicText(remedy.title, targetLang),
          recipeOrMethod: translateDynamicText(remedy.recipeOrMethod, targetLang)
        }))
      : diagnosis.organicRemedies,
    chemicalTreatments: Array.isArray(diagnosis.chemicalTreatments)
      ? diagnosis.chemicalTreatments.map((chem) => ({
          ...chem,
          tradeName: translateDynamicText(chem.tradeName, targetLang),
          dosagePerAcre: translateDynamicText(chem.dosagePerAcre, targetLang)
        }))
      : diagnosis.chemicalTreatments,
    expertNote: diagnosis.expertNote ? translateDynamicText(diagnosis.expertNote, targetLang) : diagnosis.expertNote,
    followUpChecklist: Array.isArray(diagnosis.followUpChecklist)
      ? diagnosis.followUpChecklist.map((item) => translateDynamicText(item, targetLang))
      : diagnosis.followUpChecklist
  };
}
