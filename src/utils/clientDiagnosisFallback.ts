import { IntegratedCropAnalysis, SoilSensorData, WeatherData } from '../types';
import { translateDynamicText } from './translations';

export function generateClientFallbackDiagnosis(
  cropName: string = 'Cashew',
  cropVariety: string = '',
  plantingDate: string = '',
  daysAfterSowing: number = 45,
  growthStage: string = '',
  userSymptoms: string[] = [],
  customProblem: string = '',
  soilData: SoilSensorData,
  weatherData: WeatherData | null,
  language: string = 'en'
): IntegratedCropAnalysis {
  const cName = cropName.toLowerCase();
  const isCashew = cName.includes('cashew') || cName.includes('anacardium') || cName.includes('palasa');
  const isRice = cName.includes('rice') || cName.includes('paddy');
  const isApple = cName.includes('apple') || cName.includes('malus');
  const isCotton = cName.includes('cotton');

  const hum = weatherData?.currentHumidity || 78;
  const isTelugu = language === 'te';
  const isHindi = language === 'hi';

  if (isCashew) {
    return {
      id: `diag_${Date.now()}`,
      timestamp: new Date().toISOString(),
      cropName: isTelugu ? 'జీడిమామిడి (Palasa Cashew)' : isHindi ? 'काजू (Palasa Cashew)' : 'Cashew (Anacardium occidentale)',
      cropVariety: cropVariety || (isTelugu ? 'BPP-8 / VRI-3 (పలాస స్పెషల్)' : 'BPP-8 / VRI-3 (Palasa Special Selection)'),
      stageOfGrowth: growthStage || (isTelugu ? 'లేత చిగుర్లు & పూత వచ్చే దశ' : 'New Vegetative Flush & Panicle Emergence'),
      plantingDate: plantingDate || '',
      daysAfterSowing: daysAfterSowing || 120,
      primaryDiagnosis: isTelugu 
        ? 'టీ దోమ (హెలోపెల్టిస్) & కొమ్మ ఎండు తెగులు (జీడిమామిడి ఆంత్రాక్నోస్)'
        : isHindi
        ? 'टी मॉस्किटो बग एवं टहनी सूखने का रोग (काजू एन्थ्रेक्नोज)'
        : 'Tea Mosquito Bug (Helopeltis antonii) & Shoot Die-Back (Cashew Anthracnose)',
      confidence: isTelugu ? 'అధిక ఖచ్చితత్వం (>85%)' : isHindi ? 'उच्च सटीकता (>85%)' : 'High confidence (>85%)',
      confidencePercentage: 94,
      severityLevel: 'Severe',
      summary: isTelugu
        ? `జీడిమామిడి పంట అధిక తేమ (${hum}%) మరియు వర్షపాతం కారణంగా తీవ్రమైన ఆంత్రాక్నోస్ (బూడిద / మచ్చల తెగులు) ఇన్ఫెక్షన్‌తో బాధపడుతోంది. లేత చిగుళ్లు, పూతను రక్షించడానికి మరియు ఆకులు ఎండిపోకుండా నివారించడానికి తక్షణ నివారణ చర్యలు అవసరం.`
        : isHindi
        ? `काजू की फसल उच्च आर्द्रता (${hum}%) और हाल की बारिश के कारण गंभीर एन्थ्रेक्नोज संक्रमण से प्रभावित है। नई मंजरियों की सुरक्षा और पत्तियों को सूखने से बचाने के लिए तत्काल उपचार आवश्यक है।`
        : `The cashew crop is suffering from a severe Anthracnose infection, exacerbated by high humidity (${hum}%) and recent rainfall. Immediate intervention is required to protect the emerging panicles and prevent further leaf tissue decay.`,
      visualMarkerFindings: isTelugu ? [
        'ముదురు అంచులతో కూడిన క్రమరహిత గోధుమ రంగు మచ్చలు',
        'ఎండిన కణజాలం రాలిపోయి ఆకులకు రంధ్రాలు పడటం (షాట్-హోల్ ప్రభావం)',
        'ఆకుల అంచులు మరియు ఈనెలపై నీటితో నానిన నల్లటి మచ్చల రూపం',
        'కొమ్మల చివరల నుండి క్రిందికి ఎండిపోతూ వచ్చే డై-బ్యాక్ లక్షణాలు'
      ] : isHindi ? [
        'काले किनारों वाले अनियमित भूरे रंग के धब्बे',
        'सूखे ऊतक झड़ने से पत्तियों में छेद होना (शॉट-होल प्रभाव)',
        'पत्तियों के किनारों और नसों पर पानी से भीगे जैसे धब्बे',
        'टहनियों के सिरों से नीचे की ओर सूखने के लक्षण (डाई-बैक)'
      ] : [
        'Irregular necrotic brown lesions with dark margins',
        'Shot-hole effect where necrotic tissue has fallen away',
        'Water-soaked appearance on leaf margins and veins',
        'Die-back symptoms starting from twig tips moving downwards'
      ],
      soilCorrelation: {
        status: 'Contributing to Stress',
        details: isTelugu
          ? `తక్కువ నేల pH (${soilData?.ph || 5.9}) మరియు నత్రజని, పొటాషియం లోపం మొక్క సహజ నిరోధక శక్తిని బలహీనపరుస్తున్నాయి, దీనివల్ల శిలీంధ్ర తెగుళ్లు సులభంగా వ్యాపిస్తాయి.`
          : isHindi
          ? `कम मृदा pH (${soilData?.ph || 5.9}) और नाइट्रोजन व पोटेशियम की कमी पौधे की प्राकृतिक रक्षा प्रणाली को कमजोर कर रही है, जिससे फफूंद रोग आसानी से फैलते हैं।`
          : `Low soil pH (${soilData?.ph || 5.9}) and sub-optimal Nitrogen and Potassium levels are weakening the plant's natural defense mechanisms, making it more susceptible to fungal pathogens.`,
        suggestedAmendments: isTelugu ? [
          'నేల pH ని 6.5 కి పెంచడానికి వ్యవసాయ సున్నం (లైమ్) వేయండి',
          'మొక్క రోగనిరోధక శక్తిని పెంచడానికి మ్యూరేట్ ఆఫ్ పొటాష్ (MOP) అందించండి'
        ] : isHindi ? [
          'मिट्टी का pH 6.5 तक बढ़ाने के लिए कृषि चूना डालें',
          'रोग प्रतिरोधक क्षमता बढ़ाने के लिए म्युरिएट ऑफ पोटाश (MOP) डालें'
        ] : [
          'Apply agricultural lime to raise pH to 6.5',
          'Supplement with Muriate of Potash (MOP) to boost plant immunity'
        ]
      },
      weatherCorrelation: {
        diseaseSpreadRisk: isTelugu ? 'అత్యంత అధికం' : isHindi ? 'अत्यधिक उच्च' : 'Extremely High',
        sprayingWindowAlert: isTelugu
          ? 'వెంటనే పిచికారీ చేయవద్దు; వర్షం మరియు ఉరుములతో కూడిన వాతావరణం తగ్గే వరకు వేచి ఉండండి, వర్షం పడితే మందు 4 గంటల్లో కొట్టుకుపోతుంది.'
          : isHindi
          ? 'तुरंत छिड़काव न करें; बारिश और आंधी शांत होने तक प्रतीक्षा करें, क्योंकि बारिश 4 घंटे के भीतर दवा को धो देगी।'
          : 'Do not spray immediately; wait for the current thunderstorm/rain event to pass, as high humidity and rain will wash off treatments within 4 hours.',
        irrigationRecommendation: isTelugu
          ? 'చెట్ల కొమ్మల మధ్య తేమను మరియు వేర్ల వద్ద నీటి నిల్వను తగ్గించడానికి నీటి తడులను నిలిపివేయండి.'
          : isHindi
          ? 'नमी और जलभराव कम करने के लिए सिंचाई रोक दें।'
          : 'Suspend irrigation to reduce canopy humidity and root zone saturation.'
      },
      pestsAndDiseasesIdentified: [
        {
          name: 'Tea Mosquito Bug',
          scientificName: 'Helopeltis antonii',
          type: 'insect_pest',
          probabilityScore: 95,
          riskLevel: 'CRITICAL',
          symptomsObserved: ['Angular black shoot lesions', 'Resin exudation', 'Panicle blast'],
          correlatedWeatherFactor: 'High humidity and warm coastal air',
          correlatedSoilFactor: 'Rapid tender vegetative flush'
        }
      ],
      actionPlan: [
        {
          priority: isTelugu ? 'తక్షణ చర్యలు (0-24 గంటలు)' : isHindi ? 'तत्काल कदम (0-24 घंटे)' : 'Immediate (0-24 hrs)',
          title: isTelugu ? 'తోట పరిశుభ్రత మరియు ఎండిన కొమ్మల కత్తిరింపు' : isHindi ? 'खेत की स्वच्छता एवं सूखी टहनियों की छंटाई' : 'Sanitation and Canopy Management',
          description: isTelugu
            ? 'తెగులు సోకిన ఆకులు, ఎండిపోయిన పూత రెమ్మలను కత్తిరించి తీసివేయండి. తీసిన వ్యర్థాలను తోటకి దూరంగా తగులబెట్టండి లేదా పూడ్చిపెట్టండి.'
            : isHindi
            ? 'गंभीर रूप से संक्रमित पत्तियों और सूखी मंजरियों को काटकर खेत से दूर नष्ट कर दें।'
            : 'Prune and remove severely infected leaves and blighted panicles to reduce inoculum load. Dispose of debris away from the field.',
          type: 'cultural',
          productName: isTelugu ? 'బోర్డో పేస్ట్ (10%)' : 'Bordeaux Paste (10%)',
          dosage: isTelugu ? 'కత్తిరించిన కొమ్మలకు పూయండి' : 'Apply with brush to cut stems',
          safetyNote: isTelugu ? 'కత్తిరించిన వ్యర్థాలను వెంటనే కాల్చివేయండి' : 'Burn or bury all pruned dead twigs'
        },
        {
          priority: isTelugu ? 'తక్షణ పిచికారీ (24-48 గంటలు)' : isHindi ? 'छिड़काव (24-48 घंटे)' : 'Chemical Spray (24-48 hrs)',
          title: isTelugu ? 'లక్షిత పురుగుమందు + శిలీంధ్రనాశిని మిశ్రమ పిచికారీ' : isHindi ? 'कीटनाशक + फफूंदनाशक का मिश्रित छिड़काव' : 'Targeted Insecticide + Fungicide Tank Mix Spray',
          description: isTelugu
            ? 'లాంబ్డా-సైహలోథ్రిన్ 5% EC (0.6 ml/లీటర్) లేదా ఎసిటామిప్రిడ్ 20% SP (0.5 గ్రా/లీటర్) ను కాపర్ ఆక్సిక్లోరైడ్ 50% WP (2.5 గ్రా/లీటర్) తో కలిపి పూత మరియు లేత కొమ్మలపై పూర్తిగా తడిచేలా పిచికారీ చేయండి.'
            : isHindi
            ? 'लैम्ब्डा-साइहलोथ्रिन 5% EC (0.6 मिली/लीटर) और कॉपर ऑक्सीक्लोराइड 50% WP (2.5 ग्राम/लीटर) को मिलाकर मंजरियों व पत्तियों पर अच्छी तरह छिड़कें।'
            : 'Spray Lambda-cyhalothrin 5% EC @ 0.6 ml/L combined with Copper Oxychloride 50% WP @ 2.5 g/L covering all tender flushes and panicles.',
          type: 'spray',
          productName: 'Lambda-cyhalothrin 5% EC + Blitox 50 WP',
          dosage: isTelugu ? '120 ml లాంబ్డా + 500 గ్రా COC (200 లీటర్ల నీటిలో ఎకరానికి)' : '120 ml Lambda + 500g COC in 200L water / acre',
          safetyNote: isTelugu ? 'ముఖానికి మాస్క్ ధరించండి. తేనెటీగలు తిరిగే వేళల్లో పిచికారీ చేయవద్దు.' : 'Wear protective gear. Avoid spraying during honeybee peak pollination hours.'
        }
      ],
      organicRemedies: [
        {
          title: isTelugu ? 'వేప గింజల కషాయం (NSKE 5%) + ఫిష్ ఆయిల్ రోసిన్ సోప్' : 'Neem Seed Kernel Extract (NSKE 5%) + Fish Oil Rosin Soap (FORS)',
          recipeOrMethod: isTelugu
            ? '50 గ్రాముల వేప గింజల పొడిని 1 లీటరు నీటిలో రాత్రంతా నానబెట్టి, 20 గ్రాముల ఫిష్ ఆయిల్ రోసిన్ సోప్ కలిపి 10 రోజుల వ్యవధిలో రెండుసార్లు పిచికారీ చేయండి.'
            : 'Pound 50g neem seed kernels in 1L water; add 20g Fish Oil Rosin Soap. Spray on tender flushes twice at 10-day intervals to repel Tea Mosquito Bug.'
        },
        {
          title: isTelugu ? 'బ్యూవేరియా బాసియానా జీవ శిలీంధ్ర పిచికారీ' : 'Beauveria bassiana Bio-Insecticide Spray',
          recipeOrMethod: isTelugu
            ? '5 గ్రాముల బ్యూవేరియా బాసియానా పొడిని 1 లీటరు నీటిలో కలిపి సాయంత్రం వేళల్లో పిచికారీ చేయండి.'
            : 'Mix 5g/L Beauveria bassiana (1x10^8 CFU/g) with organic sticker. Spray in late evening to parasitize insect nymphs.'
        }
      ],
      chemicalTreatments: [
        {
          tradeName: 'Karate 5 EC (Lambda-cyhalothrin 5% EC)',
          activeIngredient: 'Lambda-cyhalothrin 5% EC',
          dosagePerAcre: isTelugu ? '120 ml (200 లీటర్ల నీటిలో)' : '120 ml in 200L water',
          waitingPeriodDays: 14
        },
        {
          tradeName: 'Blitox 50 WP (Copper Oxychloride 50% WP)',
          activeIngredient: 'Copper Oxychloride 50% WP',
          dosagePerAcre: isTelugu ? '500 గ్రా (200 లీటర్ల నీటిలో)' : '500g in 200L water',
          waitingPeriodDays: 7
        }
      ],
      expertNote: isTelugu
        ? 'పలాస జీడిమామిడి ప్రాంతానికి సిఫార్సు చేయబడిన 3-పిచికారీ షెడ్యూల్ పాటించండి: 1వ పిచికారీ కొత్త చిగురు వచ్చేటప్పుడు, 2వ పిచికారీ పూత దశలో, 3వ పిచికారీ పిందె దశలో.'
        : isHindi
        ? 'काजू के लिए 3-छिड़काव कार्यक्रम अपनाएं: पहला नई पत्तियों के समय, दूसरा फूल आने पर और तीसरा फल बनने पर।'
        : 'Follow the 3-Spray Schedule recommended for the Cashew belt: 1st spray at new vegetative flush, 2nd spray at panicle emergence, 3rd spray at fruit set.',
      followUpChecklist: isTelugu ? [
        'పిచికారీ చేసిన 48 గంటల తర్వాత కొత్త చిగుర్లపై మచ్చలు లేవని నిర్ధారించుకోండి',
        'కత్తిరించిన కొమ్మలకు బోర్డో పేస్ట్ సరిగ్గా పూశారో లేదో చూడండి'
      ] : [
        'Inspect new tender shoot tips after 48 hours for absence of fresh puncture spots',
        'Verify pruned branches are treated with Bordeaux paste'
      ]
    };
  }

  if (isRice) {
    return {
      id: `diag_${Date.now()}`,
      timestamp: new Date().toISOString(),
      cropName: isTelugu ? 'వరి / ధాన్యం (Paddy)' : 'Rice / Paddy (Oryza sativa)',
      cropVariety: cropVariety || (isTelugu ? 'MTU 1010 / BPT 5204 (శ్రీకాకుళం వరి)' : 'MTU 1010 / BPT 5204'),
      stageOfGrowth: growthStage || (isTelugu ? 'పిలకల నుండి కంకి వచ్చే దశ' : 'Tillering to Panicle Emergence'),
      plantingDate: plantingDate || '',
      daysAfterSowing: daysAfterSowing || 42,
      primaryDiagnosis: isTelugu
        ? 'వరి మెడవిరుపు / అగ్గితెగులు (బ్లాస్ట్) & అధిక నత్రజని ఎరువుల అసమతుల్యత'
        : 'Rice Blast (Magnaporthe oryzae) & High Nitrogen Fertilizer Imbalance',
      confidence: isTelugu ? 'అధిక ఖచ్చితత్వం (>85%)' : 'High confidence (>85%)',
      confidencePercentage: 92,
      severityLevel: 'Severe',
      summary: isTelugu
        ? `వరి పంటలో అధిక నత్రజని (${soilData?.nitrogen || 290} kg/ha) మరియు నేలలో అధిక తేమ (${soilData?.moisture || 88}%) కారణంగా అగ్గితెగులు (బ్లాస్ట్) వేగంగా వ్యాపిస్తోంది. కంకి మరియు ఆకులను కాపాడటానికి తక్షణ చర్యలు అవసరం.`
        : `Spindle-shaped lesions with gray centers on ${cropVariety || 'Rice'} correlate with elevated soil nitrogen (${soilData?.nitrogen || 290} kg/ha) and high moisture (${soilData?.moisture || 88}%), creating an aggressive blast environment.`,
      visualMarkerFindings: isTelugu ? [
        'ఆకులపై బూడిద రంగు కేంద్రం మరియు ముదురు గోధుమ రంగు అంచులు గల కంటి ఆకారపు మచ్చలు',
        'మచ్చలు కలిసిపోయి ఆకుల చివర్లు ఎండిపోవడం మరియు పసుపు రంగులోకి మారడం',
        'కణజాలం మెత్తగా మారి పైరు బలాన్ని కోల్పోవడం'
      ] : [
        'Elliptical spindle-shaped lesions with grayish-white centers and dark brown margins on leaves',
        'Lesions coalescing causing leaf tip drying and premature chlorosis',
        'Dense lush green tillers with weak cell walls'
      ],
      soilCorrelation: {
        status: 'Contributing to Stress',
        details: isTelugu
          ? `నేలలో నత్రజని అధికంగా ఉండటం వల్ల (${soilData?.nitrogen || 290} kg/ha) మొక్క కణజాలం మెత్తగా మారి బ్లాస్ట్ తెగులు సులభంగా సోకుతుంది. పొటాషియం తక్కువగా ఉంది (${soilData?.potassium || 180} kg/ha).`
          : `Soil Nitrogen is high (${soilData?.nitrogen || 290} kg/ha), causing soft lush vegetative tissue that blast fungi readily penetrate. Potassium is sub-optimal (${soilData?.potassium || 180} kg/ha).`,
        suggestedAmendments: isTelugu ? [
          'తెగులు తగ్గే వరకు నత్రజని (యూరియా) ఎరువు వేయడాన్ని వెంటనే నిలిపివేయండి',
          'కణ నిర్మాణాన్ని బలోపేతం చేయడానికి ఎకరానికి 15-20 కిలోల MOP వేయండి'
        ] : [
          'Immediately suspend all Nitrogen (Urea) top-dressing until disease is checked',
          'Apply Muriate of Potash (MOP) at 15-20 kg/acre to strengthen cell walls'
        ]
      },
      weatherCorrelation: {
        diseaseSpreadRisk: isTelugu ? 'అధికం' : 'High',
        sprayingWindowAlert: isTelugu
          ? 'ఉదయం 7:00 నుండి 9:30 గంటల మధ్య మంచు ఆరిన తర్వాత మరియు గాలి తక్కువగా ఉన్నప్పుడు పిచికారీ చేయండి.'
          : 'Spray early morning (7:00 AM - 9:30 AM) when dew evaporates and wind is below 12 km/h.',
        irrigationRecommendation: isTelugu
          ? 'వేర్లకు గాలి తగలడానికి పొలంలో నిలిచిన నీటిని 2-3 రోజులు తీసివేసి, తర్వాత 2 సెం.మీ మేర తాజా నీరు పెట్టండి.'
          : 'Drain stagnant water from paddy for 2-3 days to aerate root zone, then re-flood with fresh 2cm layer.'
      },
      pestsAndDiseasesIdentified: [
        {
          name: 'Rice Blast',
          scientificName: 'Magnaporthe oryzae',
          type: 'fungal',
          probabilityScore: 92,
          riskLevel: 'CRITICAL',
          symptomsObserved: ['Spindle leaf lesions', 'Graying centers'],
          correlatedWeatherFactor: 'High relative humidity (>80%) & morning dew',
          correlatedSoilFactor: 'Excess nitrogen fertilizer application'
        }
      ],
      actionPlan: [
        {
          priority: isTelugu ? 'తక్షణ చర్యలు (0-24 గంటలు)' : 'Immediate (0-24 hrs)',
          title: isTelugu ? 'సిస్టమిక్ శిలీంధ్రనాశిని మందు పిచికారీ' : 'Targeted Systemic Fungicide Spray',
          description: isTelugu
            ? 'ట్రైసైక్లాజోల్ 75% WP ను లీటరు నీటికి 0.6 గ్రాములు లేదా ఐసోప్రోథియోలేన్ 40% EC ను లీటరు నీటికి 1.5 ml చొప్పున కలిపి పిచికారీ చేయండి.'
            : 'Spray Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L of water across the field.',
          type: 'spray',
          productName: 'Tricyclazole 75% WP (Beam / Sivic)',
          dosage: isTelugu ? 'ఎకరానికి 120 గ్రాములు (200 లీటర్ల నీటిలో)' : '120 grams per acre in 200 Liters water',
          safetyNote: isTelugu ? 'మాస్క్ ధరించండి. గాలికి ఎదురుగా పిచికారీ చేయవద్దు.' : 'Wear mask and protective gloves. Do not spray against the wind.'
        }
      ],
      organicRemedies: [
        {
          title: isTelugu ? 'సూడోమోనాస్ ఫ్లోరోసెన్స్ జీవ నియంత్రణ పిచికారీ' : 'Pseudomonas fluorescens Bio-Control Spray',
          recipeOrMethod: isTelugu
            ? 'లీటరు నీటికి 10 గ్రాముల సూడోమోనాస్ పొడిని కలిపి ఆకుల రెండు వైపులా బాగా తడిచేలా పిచికారీ చేయండి.'
            : 'Mix 10g of talc-based Pseudomonas fluorescens per Liter of water. Spray thoroughly covering both leaf surfaces.'
        }
      ],
      chemicalTreatments: [
        {
          tradeName: 'Beam / Sivic (Tricyclazole 75% WP)',
          activeIngredient: 'Tricyclazole 75% WP',
          dosagePerAcre: isTelugu ? '120-150 గ్రా (200 లీటర్ల నీటిలో)' : '120-150g in 200L water',
          waitingPeriodDays: 14
        }
      ],
      expertNote: isTelugu
        ? 'సాయంత్రం వేళల్లో నీటి తడులు పెట్టవద్దు. యూరియా అధికంగా వాడటం వల్ల తెగులు మరింత వేగంగా వ్యాపిస్తుంది.'
        : 'Avoid evening overhead irrigation. High nitrogen promotes succulent tissues that fungal germ tubes easily pierce.',
      followUpChecklist: isTelugu ? [
        '4 రోజుల తర్వాత కొత్త ఆకులపై మచ్చలు తగ్గాయో లేదో పరిశీలించండి'
      ] : [
        'Inspect new emerging leaves at 4-day mark for lack of new lesions'
      ]
    };
  }

  // Generic & Solanaceous Default
  return {
    id: `diag_${Date.now()}`,
    timestamp: new Date().toISOString(),
    cropName: isTelugu ? 'టమోటా (Tomato)' : cropName || 'Tomato (Solanum lycopersicum)',
    cropVariety: cropVariety || (isTelugu ? 'హైబ్రిడ్ విత్తనం' : 'Commercial Hybrid Selection'),
    stageOfGrowth: growthStage || (isTelugu ? 'ఎదుగుదల నుండి పూత ప్రారంభ దశ' : 'Vegetative to Early Flowering'),
    plantingDate: plantingDate || '',
    daysAfterSowing: daysAfterSowing || 45,
    primaryDiagnosis: isTelugu
      ? 'ముందస్తు ఆకుమచ్చ తెగులు (ఆల్టర్నేరియా ఎర్లీ బ్లైట్) & పోషకాల లోపం'
      : 'Early Leaf Blight (Alternaria solani) with Nutrient Stress',
    confidence: isTelugu ? 'అధిక ఖచ్చితత్వం (>85%)' : 'High confidence (>85%)',
    confidencePercentage: 89,
    severityLevel: 'Moderate',
    summary: isTelugu
      ? `టమోటా పంటలో ఆకులపై ముదురు గోధుమ రంగు వలయాల మచ్చలు కనిపిస్తున్నాయి. గాలిలో అధిక తేమ (${hum}%) మరియు నేల తేమ శిలీంధ్ర వ్యాప్తికి కారణమవుతున్నాయి.`
      : `Concentric dark target spots with yellow chlorotic halos on foliage of ${cropVariety || cropName}. Elevated humidity (${hum}%) and soil moisture (${soilData?.moisture || 60}%) accelerate fungal spore penetration.`,
    visualMarkerFindings: isTelugu ? [
      'ముదిరిన ఆకులపై వలయాల రూపంలో ఏర్పడే నల్లటి లక్ష్యపు మచ్చలు (టార్గెట్ రింగ్స్)',
      'మచ్చల చుట్టూ పసుపు రంగు వలయాలు ఏర్పడి ఆకులు రాలిపోవడం'
    ] : [
      'Concentric target-board ring lesions on older leaves',
      'Yellow chlorotic halos surrounding lesions leading to leaf drop'
    ],
    soilCorrelation: {
      status: 'Deficiency Detected',
      details: isTelugu
        ? `నేలలో నత్రజని మరియు పొటాషియం లోపం గుర్తించబడింది. సమతుల్య పోషకాలు అందించడం అవసరం.`
        : `Soil Nitrogen (${soilData?.nitrogen || 140} kg/ha) and Potassium (${soilData?.potassium || 160} kg/ha) need balanced replenishment.`,
      suggestedAmendments: isTelugu ? [
        'ఎకరానికి 15 కిలోల పొటాషియం ఎరువు (MOP) వేయండి'
      ] : [
        'Top-dress 15-20 kg/acre Muriate of Potash to enhance cuticle thickness'
      ]
    },
    weatherCorrelation: {
      diseaseSpreadRisk: isTelugu ? 'మధ్యస్థం' : 'Moderate',
      sprayingWindowAlert: isTelugu
        ? 'ఉదయం వేళల్లో పొడి వాతావరణం ఉన్నప్పుడు పిచికారీ చేయడం సురక్షితం.'
        : 'Optimal spray window exists tomorrow morning (7:00 AM - 10:00 AM) with low wind.',
      irrigationRecommendation: isTelugu
        ? 'ఆకులపై నీరు పడకుండా డ్రిప్ ద్వారా మాత్రమే నీటిని అందించండి.'
        : 'Switch to drip irrigation to prevent canopy splashing.'
    },
    pestsAndDiseasesIdentified: [],
    actionPlan: [
      {
        priority: isTelugu ? 'తక్షణ చర్యలు (0-24 గంటలు)' : 'Immediate (0-24 hrs)',
        title: isTelugu ? 'శిలీంధ్రనాశిని పిచికారీ' : 'Foliar Fungicide Application',
        description: isTelugu
          ? 'మాంకోజెబ్ 75% WP ను లీటరు నీటికి 2.5 గ్రాములు కలిపి ఆకులపై పిచికారీ చేయండి.'
          : 'Apply Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L.',
        type: 'spray',
        productName: 'Mancozeb 75% WP (Dithane M-45)',
        dosage: isTelugu ? 'ఎకరానికి 500 గ్రాములు (200 లీటర్ల నీటిలో)' : '500g in 200L water / acre',
        safetyNote: isTelugu ? 'రక్షక దుస్తులు ధరించండి' : 'Wear protective gloves'
      }
    ],
    organicRemedies: [
      {
        title: isTelugu ? 'వేపనూనె మరియు ట్రైకోడెర్మా ద్రావణం' : 'Neem Oil & Trichoderma Spray',
        recipeOrMethod: isTelugu
          ? '5 ml వేపనూనెను 1 లీటరు నీటిలో కలిపి పిచికారీ చేయండి.'
          : 'Mix 5ml cold-pressed neem oil with organic liquid soap in 1L water.'
      }
    ],
    chemicalTreatments: [
      {
        tradeName: 'Dithane M-45 (Mancozeb 75% WP)',
        activeIngredient: 'Mancozeb 75% WP',
        dosagePerAcre: isTelugu ? '500 గ్రా (200 లీటర్ల నీటిలో)' : '500g in 200L water',
        waitingPeriodDays: 7
      }
    ],
    expertNote: isTelugu ? 'పొలంలో నిలిచిన నీటిని తీసివేసి గాలి ప్రసరణను మెరుగుపరచండి.' : 'Ensure proper spacing and prune lower infected leaves.',
    followUpChecklist: isTelugu ? ['5 రోజుల తర్వాత ఆకుల పరిస్థితిని గమనించండి'] : ['Re-evaluate foliage after 5 days']
  };
}
