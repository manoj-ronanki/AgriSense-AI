import React, { useState, useRef, useMemo } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  CheckCircle2, 
  Image as ImageIcon, 
  AlertCircle, 
  X, 
  Calendar, 
  Bug, 
  Palette, 
  Biohazard, 
  Sparkles, 
  Layers,
  ArrowRight,
  Droplets,
  Activity,
  CloudSun
} from 'lucide-react';
import { CROP_CATALOG, CATEGORIZED_PROBLEMS } from '../data/cropCatalog';
import { PRESET_SCENARIOS } from '../data/presets';
import { PresetCropScenario, SoilSensorData, WeatherData } from '../types';
import { t, translateDynamicText } from '../utils/translations';

interface CropVisionUploadProps {
  currentLanguage?: string;
  // Crop & Variety
  selectedCrop: string;
  onCropChange: (crop: string) => void;
  cropVariety: string;
  onCropVarietyChange: (variety: string) => void;
  customVariety: string;
  onCustomVarietyChange: (custom: string) => void;
  
  // Planting date & Growth Stage
  plantingDate: string;
  onPlantingDateChange: (date: string) => void;
  growthStage: string;
  onGrowthStageChange: (stage: string) => void;
  daysAfterSowing: number;
  
  // Photo
  imagePreview: string | null;
  onImageSelected: (base64: string | null, url?: string) => void;
  
  // Symptoms & Problems
  selectedSymptoms: string[];
  onToggleSymptom: (symptom: string) => void;
  isOtherProblemActive: boolean;
  onToggleOtherProblem: (active: boolean) => void;
  customProblemText: string;
  onCustomProblemTextChange: (text: string) => void;
  
  // Notes & Presets
  fieldNotes: string;
  onFieldNotesChange: (notes: string) => void;
  onLoadPreset: (scenario: PresetCropScenario) => void;
  onRunSampleDiagnosis?: (scenario: PresetCropScenario) => void;
  isAnalyzing: boolean;
  onRunDiagnosis?: () => void;
  soilData?: SoilSensorData;
  weatherData?: WeatherData | null;
  onNavigateToSoil?: () => void;
  onNavigateToWeather?: () => void;
}

export const CropVisionUpload: React.FC<CropVisionUploadProps> = ({
  currentLanguage = 'en',
  selectedCrop,
  onCropChange,
  cropVariety,
  onCropVarietyChange,
  customVariety,
  onCustomVarietyChange,
  plantingDate,
  onPlantingDateChange,
  growthStage,
  onGrowthStageChange,
  daysAfterSowing,
  imagePreview,
  onImageSelected,
  selectedSymptoms,
  onToggleSymptom,
  isOtherProblemActive,
  onToggleOtherProblem,
  customProblemText,
  onCustomProblemTextChange,
  fieldNotes,
  onFieldNotesChange,
  onLoadPreset,
  onRunSampleDiagnosis,
  isAnalyzing,
  onRunDiagnosis,
  soilData,
  weatherData,
  onNavigateToSoil,
  onNavigateToWeather
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeProblemCategory, setActiveProblemCategory] = useState<'pests' | 'color' | 'decay' | 'growth'>('pests');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Find active crop config
  const currentCropConfig = useMemo(() => {
    const found = CROP_CATALOG.find((c) => 
      selectedCrop.toLowerCase().includes(c.name.toLowerCase()) || 
      c.name.toLowerCase().includes(selectedCrop.toLowerCase())
    );
    return found || CROP_CATALOG[0];
  }, [selectedCrop]);

  const handleCropSelect = (cropName: string) => {
    onCropChange(cropName);
    const matched = CROP_CATALOG.find((c) => c.name === cropName);
    if (matched) {
      if (matched.varieties.length > 0) {
        onCropVarietyChange(matched.varieties[0]);
      }
      if (matched.growthStages.length > 0) {
        onGrowthStageChange(matched.growthStages[2] || matched.growthStages[0]);
      }
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Camera access unavailable in this browser. You can upload a photo or use a sample case.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const compressImage = (dataUrl: string, maxWidth = 1280, maxHeight = 1280): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      onImageSelected(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const rawBase64 = reader.result as string;
        const compressed = await compressImage(rawBase64);
        onImageSelected(compressed);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E1E8DD] space-y-8">
      
      {/* Clean Header & Quick Preset Selector */}
      <div className="flex flex-col gap-4 pb-6 border-b border-[#EEF2EB]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#143021] tracking-tight">
              {t('intake_title', currentLanguage, 'Crop Health & Disease Diagnostic Intake')}
            </h2>
            <p className="text-xs sm:text-sm text-[#52796F] mt-1">
              {t('intake_desc', currentLanguage, 'Attach leaf photo, select symptoms, and verify field telemetry for real-time treatment prescription.')}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EFF5EB] text-[#2D6A4F] border border-[#CBDCC7] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Factor AI Reasoning Active</span>
            </span>
          </div>
        </div>

        {/* Quick Sample Benchmark Presets Strip with 1-Click Run */}
        <div className="p-3.5 rounded-2xl bg-[#F8FAF6] border border-[#DCE4D8] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#143021] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>{t('sample_label', currentLanguage, 'Test Sample Diagnostics:')}</span>
              <span className="text-[11px] font-normal text-[#52796F] hidden sm:inline">(Click any benchmark to load field conditions or run instant AI diagnosis)</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PRESET_SCENARIOS.map((scenario) => {
              const isCurrent = selectedCrop.toLowerCase().includes(scenario.cropName.split(' ')[0].toLowerCase());
              return (
                <div
                  key={scenario.id}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'bg-[#E8F5E9] border-[#2D6A4F] shadow-xs'
                      : 'bg-white border-[#E0E7DC] hover:border-[#2D6A4F]/60'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-bold text-[#143021] truncate">
                      {translateDynamicText(scenario.cropName.split(' ')[0], currentLanguage)}
                    </div>
                    <div className="text-[10px] text-[#52796F] truncate mt-0.5" title={scenario.commonThreats[0]}>
                      {scenario.commonThreats[0].split('(')[0].trim()}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-[#E8EDE4]">
                    <button
                      type="button"
                      onClick={() => onLoadPreset(scenario)}
                      className="flex-1 py-1 px-1.5 text-[10px] font-semibold rounded bg-[#EFF5EB] hover:bg-[#DDECD7] text-[#1B4332] transition-colors text-center"
                    >
                      Load
                    </button>
                    {onRunSampleDiagnosis && (
                      <button
                        type="button"
                        onClick={() => onRunSampleDiagnosis(scenario)}
                        title="Run instant AI diagnosis on this sample"
                        className="py-1 px-2 text-[10px] font-bold rounded bg-[#2D6A4F] hover:bg-[#1B4332] text-white transition-colors flex items-center justify-center gap-0.5"
                      >
                        ⚡ Run
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 Cols): Image / Camera */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1.5">
              <Camera className="w-4 h-4" />
              <span>{t('leaf_photo_label', currentLanguage, 'Plant / Leaf Photography')}</span>
            </label>
            {imagePreview && (
              <span className="text-xs text-[#2D6A4F] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t('attached_badge', currentLanguage, 'Attached')}
              </span>
            )}
          </div>

          <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#F8FAF6] border-2 border-dashed border-[#CBDCC7] overflow-hidden flex flex-col items-center justify-center text-center p-3 transition-colors hover:border-[#2D6A4F]/60">
            
            {/* Live Camera Stream */}
            {isCameraActive ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-x-0 bottom-3 flex justify-center space-x-3">
                  <button
                    id="capture-photo-btn"
                    onClick={capturePhoto}
                    className="px-4 py-2 bg-[#2D6A4F] text-white rounded-xl font-bold text-xs shadow-lg hover:bg-[#1B4332] flex items-center space-x-1.5 active:scale-95 transition-transform"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{t('capture_snapshot', currentLanguage, 'Capture Snapshot')}</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-3 py-2 bg-[#424242] text-white rounded-xl font-medium text-xs hover:bg-[#212121]"
                  >
                    {t('cancel', currentLanguage, 'Cancel')}
                  </button>
                </div>
              </div>
            ) : imagePreview ? (
              /* Attached Image Preview */
              <div className="relative w-full h-full group">
                <img
                  src={imagePreview}
                  alt="Crop Leaf Snapshot"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rounded-xl">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-white text-[#1B4332] hover:bg-[#E8F5E9] text-xs font-bold flex items-center space-x-1.5 shadow-md"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t('replace', currentLanguage, 'Replace')}</span>
                  </button>
                  <button
                    onClick={() => onImageSelected(null)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold flex items-center space-x-1.5 shadow-md"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{t('remove', currentLanguage, 'Remove')}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Empty Upload Prompt */
              <div className="flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-xl bg-[#EFF5EB] text-[#2D6A4F] flex items-center justify-center mb-2.5">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-[#143021]">
                  {t('upload_box_title', currentLanguage, 'Take or Upload Leaf / Crop Photo')}
                </p>
                <p className="text-[11px] text-[#52796F] mt-0.5 max-w-[240px]">
                  {t('upload_box_desc', currentLanguage, 'Close-up view of leaves, lesions, or discolored veins gives the highest precision')}
                </p>

                <div className="flex items-center space-x-2 mt-3.5">
                  <button
                    id="upload-file-btn"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{t('browse_btn', currentLanguage, 'Browse')}</span>
                  </button>
                  <button
                    id="open-camera-btn"
                    onClick={startCamera}
                    className="px-3 py-1.5 bg-[#EFF5EB] hover:bg-[#DDECD7] text-[#1B4332] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all active:scale-95"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{t('camera_btn', currentLanguage, 'Camera')}</span>
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {cameraError && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): Crop Details & Sowing Timeline */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Crop Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1.5">
              {t('step1_crop', currentLanguage, '1. Select Crop')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CROP_CATALOG.slice(0, 6).map((item) => {
                const isSelected = selectedCrop.toLowerCase().includes(item.name.toLowerCase()) || 
                                   item.name.toLowerCase().includes(selectedCrop.toLowerCase());
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCropSelect(item.name)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left ${
                      isSelected
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                        : 'bg-[#F8FAF6] text-[#223E2B] border-[#D1DCCF] hover:bg-[#EBF3E8]'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="truncate">{translateDynamicText(item.name.split(' ')[0], currentLanguage)}</span>
                  </button>
                );
              })}
            </div>

            {/* Dropdown for other crops */}
            <div className="pt-2">
              <select
                id="crop-type-select"
                value={CROP_CATALOG.some(c => c.name === selectedCrop) ? selectedCrop : 'other'}
                onChange={(e) => {
                  if (e.target.value === 'other') {
                    onCropChange('Other / Custom Crop');
                  } else {
                    handleCropSelect(e.target.value);
                  }
                }}
                className="w-full bg-[#F8FAF6] border border-[#CBDCC7] text-[#143021] rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
              >
                <option value="" disabled>{t('or_choose_catalog', currentLanguage, 'Or choose from full catalog...')}</option>
                {CROP_CATALOG.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.icon} {translateDynamicText(c.name, currentLanguage)} ({c.botanicalName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cultivar / Variety & Sowing Date in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="crop-variety-select" className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                {t('step2_variety', currentLanguage, '2. Cultivar / Variety')}
              </label>
              <select
                id="crop-variety-select"
                value={cropVariety}
                onChange={(e) => onCropVarietyChange(e.target.value)}
                className="w-full bg-[#F8FAF6] border border-[#CBDCC7] text-[#143021] rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
              >
                {currentCropConfig.varieties.map((v) => (
                  <option key={v} value={v}>
                    {translateDynamicText(v, currentLanguage)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="planting-date-input" className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('step3_sowing', currentLanguage, '3. Sowing Date')}</span>
                </label>
                {daysAfterSowing >= 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#1B5E20] font-bold">
                    {daysAfterSowing} {t('das_unit', currentLanguage, 'DAS')}
                  </span>
                )}
              </div>
              <input
                id="planting-date-input"
                type="date"
                value={plantingDate}
                onChange={(e) => onPlantingDateChange(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#F8FAF6] border border-[#CBDCC7] text-[#143021] rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
              />
            </div>
          </div>

          {/* Growth Stage */}
          <div>
            <label htmlFor="growth-stage-input" className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
              {t('step4_stage', currentLanguage, '4. Growth Stage')}
            </label>
            <select
              id="growth-stage-input"
              value={growthStage}
              onChange={(e) => onGrowthStageChange(e.target.value)}
              className="w-full bg-[#F8FAF6] border border-[#CBDCC7] text-[#143021] rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
            >
              {currentCropConfig.growthStages.map((stage) => (
                <option key={stage} value={stage}>
                  {translateDynamicText(stage, currentLanguage)}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Symptoms & Visible Signs Section */}
      <div className="pt-6 border-t border-[#EEF2EB] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-[#143021]">
              {t('symptoms_heading', currentLanguage, 'Observed Symptoms & Distress Signs')}
            </h3>
            <p className="text-xs text-[#52796F]">
              {t('symptoms_subheading', currentLanguage, 'Tap symptoms matching your field condition')}
            </p>
          </div>

          {/* Clear or count */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#EFF5EB] text-[#1B4332]">
              {selectedSymptoms.length + (isOtherProblemActive && customProblemText.trim() ? 1 : 0)} {t('selected_badge', currentLanguage, 'Selected')}
            </span>
            {selectedSymptoms.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  CATEGORIZED_PROBLEMS.pests.forEach(p => { if (selectedSymptoms.includes(p.label)) onToggleSymptom(p.label); });
                  CATEGORIZED_PROBLEMS.colorChanges.forEach(p => { if (selectedSymptoms.includes(p.label)) onToggleSymptom(p.label); });
                  CATEGORIZED_PROBLEMS.decayingAndLesions.forEach(p => { if (selectedSymptoms.includes(p.label)) onToggleSymptom(p.label); });
                  CATEGORIZED_PROBLEMS.growthAndDeformities.forEach(p => { if (selectedSymptoms.includes(p.label)) onToggleSymptom(p.label); });
                }}
                className="text-[11px] text-[#52796F] hover:text-red-600 underline font-medium"
              >
                {t('clear_btn', currentLanguage, 'Clear')}
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveProblemCategory('pests')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeProblemCategory === 'pests'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'bg-[#F4F6F1] text-[#2C4A36] hover:bg-[#E5ECE0]'
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-[#74C69D]" />
            <span>{t('cat_pests', currentLanguage, 'Pests & Chewing')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveProblemCategory('color')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeProblemCategory === 'color'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'bg-[#F4F6F1] text-[#2C4A36] hover:bg-[#E5ECE0]'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('cat_color', currentLanguage, 'Yellowing & Discoloration')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveProblemCategory('decay')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeProblemCategory === 'decay'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'bg-[#F4F6F1] text-[#2C4A36] hover:bg-[#E5ECE0]'
            }`}
          >
            <Biohazard className="w-3.5 h-3.5 text-rose-500" />
            <span>{t('cat_decay', currentLanguage, 'Spots, Rot & Lesions')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveProblemCategory('growth')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeProblemCategory === 'growth'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'bg-[#F4F6F1] text-[#2C4A36] hover:bg-[#E5ECE0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>{t('cat_growth', currentLanguage, 'Wilting & Stunting')}</span>
          </button>
        </div>

        {/* Symptoms Grid */}
        <div className="p-3 bg-[#F8FAF6] rounded-2xl border border-[#E5ECE0]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {CATEGORIZED_PROBLEMS[
              activeProblemCategory === 'pests' 
                ? 'pests' 
                : activeProblemCategory === 'color' 
                ? 'colorChanges' 
                : activeProblemCategory === 'decay' 
                ? 'decayingAndLesions' 
                : 'growthAndDeformities'
            ].map((item) => {
              const isSelected = selectedSymptoms.includes(item.label);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onToggleSymptom(item.label)}
                  className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-start space-x-2 ${
                    isSelected
                      ? 'bg-[#2D6A4F] text-white border-[#1B4332] shadow-xs'
                      : 'bg-white text-[#193222] border-[#D8E2D4] hover:bg-[#EFF5EB]'
                  }`}
                >
                  <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                  <span className="leading-snug">{translateDynamicText(item.label, currentLanguage)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Symptom Box (Optional) */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 cursor-pointer select-none text-xs font-semibold text-[#143021]">
            <input
              type="checkbox"
              checked={isOtherProblemActive}
              onChange={(e) => onToggleOtherProblem(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
            />
            <span>{t('custom_problem_toggle', currentLanguage, 'Add custom description in my own words')}</span>
          </label>
        </div>

        {isOtherProblemActive && (
          <textarea
            rows={2}
            value={customProblemText}
            onChange={(e) => onCustomProblemTextChange(e.target.value)}
            placeholder={t('custom_problem_placeholder', currentLanguage, 'Describe any unlisted symptom (e.g. Amber sap oozing from stem base, silver webbing under leaves)...')}
            className="w-full bg-white border border-[#2D6A4F] text-[#143021] rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none placeholder-[#879E8D]"
          />
        )}
      </div>

      {/* Live Soil & Weather Telemetry Summary Bar */}
      {soilData && weatherData && (
        <div className="p-4 rounded-2xl bg-[#F4F6F1] border border-[#D5DDD2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-[#2D6A4F]" />
              <span className="text-[#52796F]">{t('soil_bar_label', currentLanguage, 'Soil:')}</span>
              <strong className="text-[#143021]">pH {soilData.ph} &bull; N: {soilData.nitrogen} kg/ha &bull; Moist: {soilData.moisture}%</strong>
              {onNavigateToSoil && (
                <button
                  type="button"
                  onClick={onNavigateToSoil}
                  className="text-[#2D6A4F] hover:underline font-bold ml-1 text-[11px]"
                >
                  {t('adjust_btn', currentLanguage, '(Adjust)')}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-1.5">
              <CloudSun className="w-4 h-4 text-[#2D6A4F]" />
              <span className="text-[#52796F]">{t('weather_bar_label', currentLanguage, 'Weather:')}</span>
              <strong className="text-[#143021]">{weatherData.currentTemp}°C &bull; {translateDynamicText(weatherData.currentCondition, currentLanguage)}</strong>
              {onNavigateToWeather && (
                <button
                  type="button"
                  onClick={onNavigateToWeather}
                  className="text-[#2D6A4F] hover:underline font-bold ml-1 text-[11px]"
                >
                  {t('view_radar_btn', currentLanguage, '(View Radar)')}
                </button>
              )}
            </div>
          </div>

          <div className="text-[11px] text-[#52796F] italic">
            {t('telemetry_fused_note', currentLanguage, 'Telemetry will fuse into the diagnosis')}
          </div>
        </div>
      )}

      {/* PRIMARY ACTION CTA: DIAGNOSE NOW */}
      {onRunDiagnosis && (
        <div className="pt-2">
          <button
            id="run-analysis-btn"
            type="button"
            onClick={onRunDiagnosis}
            disabled={isAnalyzing}
            className="w-full py-4 bg-[#2D6A4F] hover:bg-[#1B4332] disabled:bg-[#40916C] text-white font-bold text-sm sm:text-base rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 active:scale-98"
          >
            <Sparkles className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? t('analyzing_cta', currentLanguage, 'Analyzing Crop & Telemetry...') : t('run_diagnosis_cta', currentLanguage, 'Run Farm Diagnosis Now')}</span>
            {!isAnalyzing && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      )}

    </div>
  );
};
