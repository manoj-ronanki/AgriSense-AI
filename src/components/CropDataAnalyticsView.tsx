import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Droplets, 
  Sprout, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Layers, 
  Flame, 
  Zap, 
  Activity, 
  Download, 
  Printer, 
  Clock, 
  CheckSquare, 
  Square, 
  Leaf, 
  RefreshCw,
  Sun,
  Wind
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from 'recharts';
import { IntegratedCropAnalysis, SoilSensorData, WeatherData } from '../types';
import { t, translateDynamicText } from '../utils/translations';

interface CropDataAnalyticsViewProps {
  currentLanguage?: string;
  history: IntegratedCropAnalysis[];
  currentDiagnosis: IntegratedCropAnalysis | null;
  soilData: SoilSensorData;
  weatherData: WeatherData | null;
  selectedCrop: string;
  onNavigateToDiagnose: () => void;
  onNavigateToSoil: () => void;
  onSelectHistoricalScan: (scan: IntegratedCropAnalysis) => void;
  onOpenChat?: () => void;
}

// Built-in baseline scans if the farmer is starting fresh
const SEED_BASELINE_SCANS: IntegratedCropAnalysis[] = [
  {
    id: 'seed_scan_1',
    timestamp: new Date(Date.now() - 14 * 86400000).toISOString(),
    cropName: 'Cashew (Palasa Belt)',
    cropVariety: 'BPP-8 (High Yield)',
    stageOfGrowth: 'Vegetative Flush',
    primaryDiagnosis: 'Tea Mosquito Bug & Early Anthracnose Scabs',
    confidence: 'High confidence (>85%)',
    confidencePercentage: 92,
    severityLevel: 'Severe',
    summary: 'Water-soaked black shoot lesions with shoot die-back detected on tender Cashew flushes in Palasa orchard.',
    visualMarkerFindings: ['Angular black puncture scabs', 'Shoot die-back', 'Resin drops'],
    soilCorrelation: {
      status: 'Optimal',
      details: 'Soil pH 5.9 is favorable, but low Potassium reduces epidermal resistance.',
      suggestedAmendments: ['Apply 200g MOP per tree basin', 'Apply 10kg FYM']
    },
    weatherCorrelation: {
      diseaseSpreadRisk: 'High',
      sprayingWindowAlert: 'Calm morning spray recommended before coastal winds accelerate.',
      irrigationRecommendation: 'Conserve moisture with leaf basin mulching.'
    },
    pestsAndDiseasesIdentified: [
      {
        name: 'Tea Mosquito Bug',
        scientificName: 'Helopeltis antonii',
        type: 'insect_pest',
        probabilityScore: 95,
        riskLevel: 'CRITICAL',
        symptomsObserved: ['Black shoot lesions', 'Resin exudation'],
        correlatedWeatherFactor: 'High coastal humidity (>78%)',
        correlatedSoilFactor: 'Rapid tender vegetative flush'
      }
    ],
    actionPlan: [
      {
        priority: 'Immediate (0-24 hrs)',
        title: 'Lambda-cyhalothrin + Copper Oxychloride Spray',
        description: 'Targeted spray on tender flushes during early morning.',
        type: 'spray'
      }
    ],
    organicRemedies: [{ title: 'NSKE 5% Spray', recipeOrMethod: '50g kernel powder per liter' }],
    chemicalTreatments: [{ tradeName: 'Karate 5 EC', activeIngredient: 'Lambda-cyhalothrin', dosagePerAcre: '120ml', waitingPeriodDays: 14 }],
    expertNote: 'Follow standard 3-spray schedule.',
    followUpChecklist: ['Verify dead shoots are pruned']
  },
  {
    id: 'seed_scan_2',
    timestamp: new Date(Date.now() - 7 * 86400000).toISOString(),
    cropName: 'Cashew (Palasa Belt)',
    cropVariety: 'BPP-8 (High Yield)',
    stageOfGrowth: 'Panicle Emergence',
    primaryDiagnosis: 'Mild Blossom Blight / Inflorescence Thrips',
    confidence: 'High confidence (>85%)',
    confidencePercentage: 88,
    severityLevel: 'Moderate',
    summary: 'Previous spray contained primary shoot die-back. Mild blossom drying noted during early panicle flush.',
    visualMarkerFindings: ['Minor inflorescence discoloration', 'Tender leaves healing'],
    soilCorrelation: {
      status: 'Optimal',
      details: 'Potassium application has improved stem rigidity.',
      suggestedAmendments: ['Foliar micronutrient spray (Zinc + Boron)']
    },
    weatherCorrelation: {
      diseaseSpreadRisk: 'Moderate',
      sprayingWindowAlert: 'Optimal spray window available in morning.',
      irrigationRecommendation: 'Basin mulch working well.'
    },
    pestsAndDiseasesIdentified: [
      {
        name: 'Inflorescence Blight',
        scientificName: 'Colletotrichum gloeosporioides',
        type: 'fungal',
        probabilityScore: 78,
        riskLevel: 'MODERATE',
        symptomsObserved: ['Panicle drying'],
        correlatedWeatherFactor: 'Morning dew persistence',
        correlatedSoilFactor: 'Adequate soil nitrogen'
      }
    ],
    actionPlan: [
      {
        priority: 'Immediate (0-24 hrs)',
        title: 'Carbendazim 50% WP Spray',
        description: 'Spray 1g/L on inflorescences.',
        type: 'spray'
      }
    ],
    organicRemedies: [{ title: 'Pseudomonas fluorescens', recipeOrMethod: '10g/L spray' }],
    chemicalTreatments: [{ tradeName: 'Bavistin 50 WP', activeIngredient: 'Carbendazim', dosagePerAcre: '200g', waitingPeriodDays: 10 }],
    expertNote: 'Orchard recovery is on track.',
    followUpChecklist: ['Check for flower drop']
  },
  {
    id: 'seed_scan_3',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    cropName: 'Rice / Paddy (Srikakulam Basin)',
    cropVariety: 'MTU 1010',
    stageOfGrowth: 'Active Tillering',
    primaryDiagnosis: 'Early Rice Blast & Excess Nitrogen Succulence',
    confidence: 'High confidence (>85%)',
    confidencePercentage: 90,
    severityLevel: 'Moderate',
    summary: 'Spindle-shaped blast spots on upper leaf blades with waterlogged field humidity triggering collar rot.',
    visualMarkerFindings: ['Spindle lesions with gray centers', 'Excess lush green foliage'],
    soilCorrelation: {
      status: 'Contributing to Stress',
      details: 'Excessive Nitrogen (290 kg/ha) increases leaf succulence.',
      suggestedAmendments: ['Suspend Urea top dressing', 'Apply MOP Potash 20 kg/acre']
    },
    weatherCorrelation: {
      diseaseSpreadRisk: 'High',
      sprayingWindowAlert: 'Spray early morning before wind pick up.',
      irrigationRecommendation: 'Drain field water for 48 hours to aerate soil.'
    },
    pestsAndDiseasesIdentified: [
      {
        name: 'Rice Leaf Blast',
        scientificName: 'Magnaporthe oryzae',
        type: 'fungal',
        probabilityScore: 91,
        riskLevel: 'HIGH',
        symptomsObserved: ['Spindle spots', 'Collar rot risk'],
        correlatedWeatherFactor: 'Coastal humidity > 80%',
        correlatedSoilFactor: 'Excess nitrogen fertilizer'
      }
    ],
    actionPlan: [
      {
        priority: 'Immediate (0-24 hrs)',
        title: 'Tricyclazole 75% WP Spray',
        description: 'Spray Beam @ 0.6 g/L of water across field.',
        type: 'spray'
      }
    ],
    organicRemedies: [{ title: 'Panchagavya Foliar Spray', recipeOrMethod: '30ml per liter' }],
    chemicalTreatments: [{ tradeName: 'Beam 75 WP', activeIngredient: 'Tricyclazole', dosagePerAcre: '120g', waitingPeriodDays: 14 }],
    expertNote: 'Water drainage is vital to break mycelial progression.',
    followUpChecklist: ['Confirm water is drained for 48h']
  }
];

export const CropDataAnalyticsView: React.FC<CropDataAnalyticsViewProps> = ({
  currentLanguage = 'en',
  history,
  currentDiagnosis,
  soilData,
  weatherData,
  selectedCrop,
  onNavigateToDiagnose,
  onNavigateToSoil,
  onSelectHistoricalScan,
  onOpenChat
}) => {
  // Merge user history with baseline scans if user history is small, or use user history
  const allScans = useMemo(() => {
    if (history.length > 0) {
      // If user has scans, combine with current diagnosis if not already there
      const combined = [...history];
      if (currentDiagnosis && !combined.some(s => s.id === currentDiagnosis.id)) {
        combined.unshift(currentDiagnosis);
      }
      return combined;
    }
    // If empty history, show seed baseline scans plus current diagnosis
    return currentDiagnosis ? [currentDiagnosis, ...SEED_BASELINE_SCANS] : SEED_BASELINE_SCANS;
  }, [history, currentDiagnosis]);

  // Selected framework checklist state
  const [completedActions, setCompletedActions] = useState<{ [key: string]: boolean }>({});
  const [activeCropFilter, setActiveCropFilter] = useState<string>('All');
  const [activeFrameworkTab, setActiveFrameworkTab] = useState<'recovery' | 'soil_optimization' | 'spraying_calendar' | 'preventive'>('recovery');

  const toggleAction = (id: string) => {
    setCompletedActions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Severity metrics calculation
  const metrics = useMemo(() => {
    const total = allScans.length;
    let healthyCount = 0;
    let mildCount = 0;
    let moderateCount = 0;
    let severeCount = 0;
    let criticalCount = 0;
    let totalScore = 0;

    allScans.forEach(scan => {
      let score = 70;
      switch (scan.severityLevel) {
        case 'Healthy':
          healthyCount++;
          score = 95;
          break;
        case 'Mild':
          mildCount++;
          score = 82;
          break;
        case 'Moderate':
          moderateCount++;
          score = 65;
          break;
        case 'Severe':
          severeCount++;
          score = 42;
          break;
        case 'Critical':
          criticalCount++;
          score = 25;
          break;
        default:
          score = 70;
      }
      totalScore += score;
    });

    const averageQualityScore = total > 0 ? Math.round(totalScore / total) : 75;
    
    // Disease classification counts
    let fungalCount = 0;
    let insectCount = 0;
    let bacterialCount = 0;
    let nutrientDeficitCount = 0;

    allScans.forEach(scan => {
      scan.pestsAndDiseasesIdentified?.forEach(p => {
        if (p.type === 'fungal') fungalCount++;
        else if (p.type === 'insect_pest') insectCount++;
        else if (p.type === 'bacterial') bacterialCount++;
        else if (p.type === 'nutrient_deficiency') nutrientDeficitCount++;
      });
    });

    return {
      totalScans: total,
      averageQualityScore,
      healthyCount,
      mildCount,
      moderateCount,
      severeCount,
      criticalCount,
      fungalCount,
      insectCount,
      bacterialCount,
      nutrientDeficitCount
    };
  }, [allScans]);

  // Chart data: Quality score over time
  const timelineChartData = useMemo(() => {
    return [...allScans]
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((scan, idx) => {
        const dateObj = new Date(scan.timestamp);
        const dateLabel = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        let qualityScore = 70;
        switch (scan.severityLevel) {
          case 'Healthy': qualityScore = 95; break;
          case 'Mild': qualityScore = 82; break;
          case 'Moderate': qualityScore = 65; break;
          case 'Severe': qualityScore = 45; break;
          case 'Critical': qualityScore = 25; break;
        }
        return {
          scanIndex: idx + 1,
          date: dateLabel,
          crop: scan.cropName.split(' ')[0],
          qualityScore,
          severity: scan.severityLevel,
          confidence: scan.confidencePercentage || 85
        };
      });
  }, [allScans]);

  // Severity Distribution Pie Data
  const severityPieData = useMemo(() => [
    { name: 'Healthy / Resilient', value: metrics.healthyCount, color: '#2D6A4F' },
    { name: 'Mild Stress', value: metrics.mildCount, color: '#40916C' },
    { name: 'Moderate Risk', value: metrics.moderateCount, color: '#D97706' },
    { name: 'Severe / Action Needed', value: metrics.severeCount, color: '#E11D48' },
    { name: 'Critical Emergency', value: metrics.criticalCount, color: '#991B1B' }
  ].filter(d => d.value > 0), [metrics]);

  // Soil Sensor vs Target Optimal Benchmarks
  const soilBenchmarkData = useMemo(() => [
    {
      metric: 'Nitrogen (N)',
      current: soilData.nitrogen,
      optimal: 200,
      unit: 'kg/ha',
      status: soilData.nitrogen > 260 ? 'Surplus' : (soilData.nitrogen < 140 ? 'Deficit' : 'Optimal'),
      color: soilData.nitrogen > 260 ? '#E11D48' : '#2D6A4F'
    },
    {
      metric: 'Phosphorus (P)',
      current: soilData.phosphorus,
      optimal: 25,
      unit: 'kg/ha',
      status: soilData.phosphorus < 15 ? 'Deficit' : (soilData.phosphorus > 40 ? 'Surplus' : 'Optimal'),
      color: soilData.phosphorus < 15 ? '#D97706' : '#2D6A4F'
    },
    {
      metric: 'Potassium (K)',
      current: soilData.potassium,
      optimal: 240,
      unit: 'kg/ha',
      status: soilData.potassium < 180 ? 'Deficit' : 'Optimal',
      color: soilData.potassium < 180 ? '#D97706' : '#2D6A4F'
    },
    {
      metric: 'Moisture (%)',
      current: soilData.moisture,
      optimal: 65,
      unit: '%',
      status: soilData.moisture > 80 ? 'High Water' : (soilData.moisture < 40 ? 'Dry' : 'Optimal'),
      color: soilData.moisture > 80 ? '#2563EB' : '#2D6A4F'
    },
    {
      metric: 'Soil pH',
      current: soilData.ph * 20, // scaled for display
      optimal: 6.5 * 20,
      unit: 'pH',
      status: soilData.ph < 5.5 ? 'Acidic' : (soilData.ph > 7.5 ? 'Alkaline' : 'Balanced'),
      color: '#059669'
    }
  ], [soilData]);

  // Print or Export Handler
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-[#E6EBE3] gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#143021] flex items-center gap-2">
                <span>Crop Quality & Sensor Data Analytics</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold bg-[#E8F5E9] text-[#1B4332] rounded-full border border-[#C8E6C9]">
                  <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  Multi-Factor Telemetry
                </span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#4E6754] mt-1 ml-10">
              Longitudinal crop health trajectory, N-P-K soil sensor correlations, microclimate disease pressure, and actionable recovery blueprints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintReport}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F4F8F1] hover:bg-[#E2EEDE] text-[#1B4332] text-xs font-semibold rounded-xl border border-[#CBDCC7] transition-all shadow-xs"
              title="Print or Export Field Analytics Report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
            <button
              onClick={onNavigateToDiagnose}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>New Field Scan</span>
            </button>
          </div>
        </div>

        {/* Top 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* Card 1: Composite Crop Quality Index */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#143021] to-[#2D6A4F] text-white flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#D8F3DC]">Crop Quality Index (CQI)</span>
              <Award className="w-4 h-4 text-[#A7F3D0]" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-extrabold tracking-tight flex items-baseline gap-1.5">
                <span>{metrics.averageQualityScore}</span>
                <span className="text-sm font-normal text-[#B7E4C7]">/ 100</span>
              </div>
              <div className="text-[11px] font-medium text-[#D8F3DC] mt-0.5 flex items-center gap-1">
                {metrics.averageQualityScore >= 75 ? (
                  <>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Good Health • Resilient Status</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3.5 h-3.5 text-amber-300" />
                    <span>Active Pathogen/Stress Mitigation Needed</span>
                  </>
                )}
              </div>
            </div>
            <div className="text-[10px] text-[#B7E4C7] pt-2 border-t border-white/15">
              Based on {metrics.totalScans} verified field scans & sensor feeds
            </div>
          </div>

          {/* Card 2: Field Scans Archive */}
          <div className="p-4 rounded-2xl bg-[#F8FAF6] border border-[#D5DDD2] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">Total Scans Logged</span>
              <Layers className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div className="my-2">
              <div className="text-2xl font-extrabold text-[#143021]">
                {metrics.totalScans} Telemetry Logs
              </div>
              <div className="text-xs text-[#52796F] mt-0.5">
                {metrics.healthyCount + metrics.mildCount} Controlled • {metrics.severeCount + metrics.criticalCount} High Risk
              </div>
            </div>
            <div className="text-[11px] text-[#2D6A4F] font-semibold pt-2 border-t border-[#E6EBE3] flex items-center justify-between">
              <span>Latest: {allScans[0]?.cropName.split(' ')[0] || 'Cashew'}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Active</span>
            </div>
          </div>

          {/* Card 3: Soil Nutrient Balance Index */}
          <div className="p-4 rounded-2xl bg-[#F8FAF6] border border-[#D5DDD2] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">Soil Telemetry Health</span>
              <Droplets className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div className="my-2">
              <div className="text-xl font-extrabold text-[#143021] flex items-center gap-1.5">
                <span>pH {soilData.ph}</span>
                <span className="text-xs font-medium text-[#52796F]">• N:{soilData.nitrogen} K:{soilData.potassium}</span>
              </div>
              <div className="text-xs text-[#52796F] mt-0.5">
                {soilData.nitrogen > 260 ? 'High Nitrogen (Blast Risk)' : 'Balanced N-P-K baseline'}
              </div>
            </div>
            <button
              onClick={onNavigateToSoil}
              className="text-[11px] text-[#2D6A4F] hover:text-[#1B4332] font-bold pt-2 border-t border-[#E6EBE3] flex items-center justify-between transition-colors"
            >
              <span>View Sensor Calibrations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Dominant Pathogen Vector */}
          <div className="p-4 rounded-2xl bg-[#F8FAF6] border border-[#D5DDD2] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">Pathogen Threat Spectrum</span>
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            </div>
            <div className="my-2">
              <div className="text-xl font-extrabold text-[#143021]">
                {metrics.fungalCount >= metrics.insectCount ? 'Fungal Sporulation' : 'Insect Infestation'}
              </div>
              <div className="text-xs text-[#52796F] mt-0.5">
                {metrics.fungalCount} Fungal • {metrics.insectCount} Insect • {metrics.bacterialCount} Bacterial
              </div>
            </div>
            <div className="text-[11px] text-[#52796F] pt-2 border-t border-[#E6EBE3] flex items-center justify-between">
              <span>Weather Risk: <strong className="text-[#143021]">{weatherData?.forecast[0]?.fungalRisk || 'High'}</strong></span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </div>
          </div>

        </div>
      </div>

      {/* 2. Visual Charts: Timeline & Severity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quality Trend Over Time (Area Chart) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading text-base sm:text-lg font-bold text-[#143021] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Crop Health & Quality Score Progression</span>
                </h2>
                <p className="text-xs text-[#52796F] mt-0.5">
                  Historical trajectory of your orchard/field across successive diagnostic scans
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#2D6A4F] bg-[#F4F8F1] px-2.5 py-1 rounded-lg border border-[#CBDCC7]">
                0 = Critical, 100 = Optimal
              </span>
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineChartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6EBE3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 11, fill: '#52796F' }} 
                    axisLine={{ stroke: '#CBDCC7' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 11, fill: '#52796F' }} 
                    axisLine={{ stroke: '#CBDCC7' }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#143021', 
                      borderRadius: '12px', 
                      border: 'none', 
                      color: '#fff',
                      fontSize: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#A7F3D0' }}
                    formatter={(value: any) => [`${value} / 100`, 'Quality Index']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="qualityScore" 
                    stroke="#2D6A4F" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#qualityGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E6EBE3] flex items-center justify-between text-xs text-[#52796F]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />
              Quality index incorporates visual lesion area, soil NPK balance, and weather spray safety
            </span>
            <span className="font-semibold text-[#143021]">Recovery Pace: +12% / 14 Days</span>
          </div>
        </div>

        {/* Severity Distribution Donut Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-heading text-base font-bold text-[#143021] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                <span>Severity Classification</span>
              </h2>
            </div>
            <p className="text-xs text-[#52796F] mb-3">
              Distribution of health stages recorded across previous scans
            </p>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {severityPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#143021', 
                      borderRadius: '8px', 
                      color: '#fff',
                      fontSize: '11px' 
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Severity Legend */}
            <div className="space-y-1.5 mt-2 text-xs">
              {severityPieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#4E6754]">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </span>
                  <span className="font-bold text-[#143021]">{item.value} ({Math.round((item.value / metrics.totalScans) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E6EBE3] text-[11px] text-[#52796F]">
            Target benchmark: &gt;80% Healthy or Mild condition
          </div>
        </div>

      </div>

      {/* 3. Soil Sensors vs Agronomic Benchmarks */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#E6EBE3] gap-2">
          <div>
            <h2 className="font-heading text-base sm:text-lg font-bold text-[#143021] flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#2D6A4F]" />
              <span>Real-Time Soil Sensor Values vs Optimal Agronomic Benchmarks</span>
            </h2>
            <p className="text-xs text-[#52796F] mt-0.5">
              Comparison of current field NPK, moisture, and pH with benchmark requirements for high yields
            </p>
          </div>
          <button
            onClick={onNavigateToSoil}
            className="text-xs font-bold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Adjust Sensor Values</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {soilBenchmarkData.map((item, idx) => {
            const diff = item.current - item.optimal;
            const isOptimal = Math.abs(diff) <= (item.optimal * 0.15);
            return (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAF6] border border-[#D5DDD2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#143021]">{item.metric}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isOptimal ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-xl font-extrabold text-[#143021] my-1">
                    {item.metric === 'Soil pH' ? (item.current / 20).toFixed(1) : item.current} <span className="text-xs font-normal text-[#52796F]">{item.unit}</span>
                  </div>
                  <div className="text-[11px] text-[#52796F]">
                    Target: <strong>{item.metric === 'Soil pH' ? (item.optimal / 20).toFixed(1) : item.optimal} {item.unit}</strong>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#E6EBE3] text-[10px] text-[#4E6754]">
                  {item.metric === 'Nitrogen (N)' && (
                    item.current > 250 ? 'Excessive N promotes tender vegetative succulent tissue prone to blast' : 'Adequate for canopy development'
                  )}
                  {item.metric === 'Potassium (K)' && (
                    item.current < 200 ? 'Low Potassium weakens cell walls against fungal penetration' : 'Supports stem lignification'
                  )}
                  {item.metric === 'Phosphorus (P)' && 'Supports root proliferation and floral development'}
                  {item.metric === 'Moisture (%)' && (
                    item.current > 75 ? 'Waterlogged conditions increase collar rot risk' : 'Good moisture profile'
                  )}
                  {item.metric === 'Soil pH' && 'Optimal nutrient availability range (5.5 - 6.8)'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. DEDICATED SUB-SECTION: FRAMEWORK TO IMPROVE CURRENT CROP CONDITION */}
      <div id="crop-improvement-framework" className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2] space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-[#E6EBE3] gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                <Leaf className="w-4 h-4" />
              </span>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-[#143021] flex items-center gap-2">
                <span>Crop Condition Improvement Framework & Actionable Protocol</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4E6754] mt-1 ml-10">
              Science-backed 4-phase agronomic recovery protocol customized for <strong className="text-[#143021]">{selectedCrop}</strong> and local Srikakulam microclimate conditions.
            </p>
          </div>

          {/* Framework Tab Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-[#F4F8F1] p-1.5 rounded-xl border border-[#CBDCC7] shrink-0 no-scrollbar">
            <button
              onClick={() => setActiveFrameworkTab('recovery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeFrameworkTab === 'recovery'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-[#1B4332] hover:bg-[#E2EEDE]'
              }`}
            >
              Phase 1: Immediate Triage (0-48h)
            </button>
            <button
              onClick={() => setActiveFrameworkTab('soil_optimization')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeFrameworkTab === 'soil_optimization'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-[#1B4332] hover:bg-[#E2EEDE]'
              }`}
            >
              Phase 2: Soil & Root Realignment
            </button>
            <button
              onClick={() => setActiveFrameworkTab('spraying_calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeFrameworkTab === 'spraying_calendar'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-[#1B4332] hover:bg-[#E2EEDE]'
              }`}
            >
              Phase 3: Microclimate & Spray Windows
            </button>
            <button
              onClick={() => setActiveFrameworkTab('preventive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeFrameworkTab === 'preventive'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-[#1B4332] hover:bg-[#E2EEDE]'
              }`}
            >
              Phase 4: Immunity & SAR Protocol
            </button>
          </div>
        </div>

        {/* Dynamic Framework Content Based on Selected Tab */}
        {activeFrameworkTab === 'recovery' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <Flame className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong>Phase 1 Emergency Triage Goal:</strong> Halt active mycelial growth and knock down sucking pests (Tea Mosquito Bug / BPH / Whiteflies) within 24–48 hours to prevent irreversible vascular necrosis and flower/fruit drop.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Action Item 1 */}
              <div 
                onClick={() => toggleAction('act_1')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  completedActions['act_1'] ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#F8FAF6] border-[#D5DDD2] hover:border-[#2D6A4F]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button className="mt-0.5 text-[#2D6A4F] shrink-0">
                    {completedActions['act_1'] ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-[#52796F]" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                      0-24 Hours • Precision Chemical/Bio Spray
                    </span>
                    <h4 className="font-bold text-sm text-[#143021] mt-1">
                      Execute Synchronized Dual-Action Spray (Insecticide + Fungicide)
                    </h4>
                    <p className="text-xs text-[#52796F] mt-1 leading-relaxed">
                      For Cashew: Spray Lambda-cyhalothrin 5% EC (0.6 ml/L) mixed with Copper Oxychloride 50% WP (2.5 g/L). For Paddy: Spray Tricyclazole 75% WP (0.6 g/L). Spray only during calm early morning window (6:30 AM - 9:30 AM).
                    </p>
                    <div className="mt-2 text-[11px] font-semibold text-[#2D6A4F]">
                      Target: Stop pest salivary toxins & kill germinating spore tubes
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Item 2 */}
              <div 
                onClick={() => toggleAction('act_2')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  completedActions['act_2'] ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#F8FAF6] border-[#D5DDD2] hover:border-[#2D6A4F]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button className="mt-0.5 text-[#2D6A4F] shrink-0">
                    {completedActions['act_2'] ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-[#52796F]" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      24-48 Hours • Orchard/Field Sanitation
                    </span>
                    <h4 className="font-bold text-sm text-[#143021] mt-1">
                      Prune Necrotic Die-Back Twigs & Swab with Bordeaux Paste
                    </h4>
                    <p className="text-xs text-[#52796F] mt-1 leading-relaxed">
                      Cut dried cashew shoots 5cm below the margin of dead wood into healthy green tissue. Paint cut ends immediately with 10% Bordeaux paste (1:1:10) to seal open vascular bundles. Burn or bury all infected prunings.
                    </p>
                    <div className="mt-2 text-[11px] font-semibold text-[#2D6A4F]">
                      Target: Eliminate overwintering fungal inocula reservoirs
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeFrameworkTab === 'soil_optimization' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <Droplets className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 leading-relaxed">
                <strong>Phase 2 Soil Optimization Protocol:</strong> Realize balanced root nutrition to rebuild plant cuticle thickness and increase endogenous phytoalexin production.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Soil Strategy 1 */}
              <div 
                onClick={() => toggleAction('act_soil_1')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  completedActions['act_soil_1'] ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#F8FAF6] border-[#D5DDD2] hover:border-[#2D6A4F]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button className="mt-0.5 text-[#2D6A4F] shrink-0">
                    {completedActions['act_soil_1'] ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-[#52796F]" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Nutrient Balancing • Potash Boost
                    </span>
                    <h4 className="font-bold text-sm text-[#143021] mt-1">
                      Apply Muriate of Potash (MOP) & Moderate Nitrogen Top-Dressing
                    </h4>
                    <p className="text-xs text-[#52796F] mt-1 leading-relaxed">
                      If soil Nitrogen &gt; 250 kg/ha, completely withhold Urea for 10 days. Apply MOP @ 15-20 kg/acre (or 200g/bearing tree basin) along the outer drip circle to strengthen epidermal cell walls.
                    </p>
                  </div>
                </div>
              </div>

              {/* Soil Strategy 2 */}
              <div 
                onClick={() => toggleAction('act_soil_2')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  completedActions['act_soil_2'] ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#F8FAF6] border-[#D5DDD2] hover:border-[#2D6A4F]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button className="mt-0.5 text-[#2D6A4F] shrink-0">
                    {completedActions['act_soil_2'] ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-[#52796F]" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                      Biological Inoculation
                    </span>
                    <h4 className="font-bold text-sm text-[#143021] mt-1">
                      Inoculate Soil with Trichoderma viride + Vermicompost
                    </h4>
                    <p className="text-xs text-[#52796F] mt-1 leading-relaxed">
                      Mix 2 kg Trichoderma viride (1x10^8 CFU/g) with 100 kg well-decomposed FYM or vermicompost. Broadcast around tree basins to outcompete soilborne Pythium and Rhizoctonia root pathogens.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeFrameworkTab === 'spraying_calendar' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <Sun className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 leading-relaxed">
                <strong>Phase 3 Microclimate Synchronization:</strong> Calibrating spray timing against coastal sea breeze acceleration and relative humidity curves to eliminate chemical drift and pesticide washoff.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAF6] border border-[#D5DDD2]">
              <h4 className="font-bold text-sm text-[#143021] mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2D6A4F]" />
                <span>Palasa & Coastal Andhra Recommended 3-Spray Agricultural Calendar</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3">
                <div className="p-3 bg-white rounded-xl border border-[#E0E7DC]">
                  <div className="font-bold text-[#143021]">1st Spray: Vegetative Flush</div>
                  <div className="text-[11px] text-[#52796F] mt-1">Oct - Nov (New Shoot Emergence)</div>
                  <div className="mt-2 text-[#2D6A4F] font-semibold">Lambda-cyhalothrin 5% EC @ 0.6 ml/L</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E0E7DC]">
                  <div className="font-bold text-[#143021]">2nd Spray: Panicle Initiation</div>
                  <div className="text-[11px] text-[#52796F] mt-1">Dec - Jan (Flower Bud Emergence)</div>
                  <div className="mt-2 text-[#2D6A4F] font-semibold">Acetamiprid 20% SP + Carbendazim 50% WP</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E0E7DC]">
                  <div className="font-bold text-[#143021]">3rd Spray: Mustard Nut Set</div>
                  <div className="text-[11px] text-[#52796F] mt-1">Feb - Mar (Pin-Head Fruit Set)</div>
                  <div className="mt-2 text-[#2D6A4F] font-semibold">Profenofos 50% EC @ 1.5 ml/L</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFrameworkTab === 'preventive' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#EFF6EE] border border-[#CBDCC7] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
              <div className="text-xs text-[#1B4332] leading-relaxed">
                <strong>Phase 4 Long-Term Immunity & SAR:</strong> Activate Systemic Acquired Resistance (SAR) genes in your crops using organic botanical formulations and biological bio-stimulants.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div 
                onClick={() => toggleAction('act_prev_1')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  completedActions['act_prev_1'] ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#F8FAF6] border-[#D5DDD2] hover:border-[#2D6A4F]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button className="mt-0.5 text-[#2D6A4F] shrink-0">
                    {completedActions['act_prev_1'] ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-[#52796F]" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Botanical Repellent
                    </span>
                    <h4 className="font-bold text-sm text-[#143021] mt-1">
                      Neem Seed Kernel Extract (NSKE 5%) + Fish Oil Rosin Soap
                    </h4>
                    <p className="text-xs text-[#52796F] mt-1 leading-relaxed">
                      Spray every 12-14 days to deter adult insect oviposition and disrupt nymphal feeding cycles naturally without harming pollinators.
                    </p>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => toggleAction('act_prev_2')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  completedActions['act_prev_2'] ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#F8FAF6] border-[#D5DDD2] hover:border-[#2D6A4F]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button className="mt-0.5 text-[#2D6A4F] shrink-0">
                    {completedActions['act_prev_2'] ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-[#52796F]" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                      Pheromone Trapping
                    </span>
                    <h4 className="font-bold text-sm text-[#143021] mt-1">
                      Deploy Yellow Sticky Traps & Cashew Stem Borer Monitoring
                    </h4>
                    <p className="text-xs text-[#52796F] mt-1 leading-relaxed">
                      Install 15-20 yellow sticky traps per acre at canopy height to capture winged thrips and whiteflies; inspect tree trunks for frass extrusion.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Framework Footer Progress */}
        <div className="p-4 rounded-xl bg-[#F4F8F1] border border-[#CBDCC7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
            <span className="text-[#143021] font-semibold">
              Recovery Checklist Progress: <strong>{Object.values(completedActions).filter(Boolean).length} / 6 Actions Completed</strong>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCompletedActions({})}
              className="text-[#52796F] hover:text-[#143021] underline transition-colors"
            >
              Reset Checklist
            </button>
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-3.5 py-1.5 bg-[#EFF5EB] hover:bg-[#DDECD7] text-[#1B4332] border border-[#C5D9C0] rounded-xl font-bold transition-all shadow-xs flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Discuss with AI Doctor</span>
              </button>
            )}
            <button
              onClick={onNavigateToDiagnose}
              className="px-3.5 py-1.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl font-bold transition-all shadow-xs"
            >
              Re-Scan Crop to Validate Recovery
            </button>
          </div>
        </div>

      </div>

      {/* 5. Historical Scan Logs Detailed Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6EBE3]">
          <div>
            <h3 className="font-heading text-base font-bold text-[#143021] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2D6A4F]" />
              <span>Historical Field Diagnoses & Telemetry Archive</span>
            </h3>
            <p className="text-xs text-[#52796F] mt-0.5">
              Click on any record to view its full integrated prescription and follow-up checklist
            </p>
          </div>
          <span className="text-xs font-bold text-[#2D6A4F] bg-[#F4F8F1] px-3 py-1 rounded-xl border border-[#CBDCC7]">
            {allScans.length} Scans Archived
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EBE3] text-[#52796F] uppercase tracking-wider text-[10px] bg-[#F8FAF6]">
                <th className="py-2.5 px-3 rounded-l-lg">Date & Time</th>
                <th className="py-2.5 px-3">Crop / Variety</th>
                <th className="py-2.5 px-3">Primary Diagnosis</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3 rounded-r-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4EE]">
              {allScans.map((scan) => (
                <tr 
                  key={scan.id}
                  onClick={() => onSelectHistoricalScan(scan)}
                  className="hover:bg-[#F4F8F1] cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-3 font-semibold text-[#143021] whitespace-nowrap">
                    {new Date(scan.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3 px-3 text-[#2D6A4F] font-bold">
                    {scan.cropName} {scan.cropVariety ? `(${scan.cropVariety})` : ''}
                  </td>
                  <td className="py-3 px-3 text-[#143021] font-medium max-w-xs truncate">
                    {scan.primaryDiagnosis}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      scan.severityLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                      scan.severityLevel === 'Severe' ? 'bg-rose-100 text-rose-800' :
                      scan.severityLevel === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {scan.severityLevel}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#52796F]">
                    {scan.confidencePercentage ? `${scan.confidencePercentage}%` : '88%'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center text-[11px] font-bold text-[#2D6A4F] group-hover:text-[#1B4332] group-hover:translate-x-0.5 transition-transform">
                      View Report <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
