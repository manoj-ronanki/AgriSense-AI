import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Leaf, 
  Droplets, 
  Clock, 
  Printer, 
  MessageSquare, 
  Calendar,
  AlertTriangle,
  Beaker,
  Sprout,
  Volume2,
  VolumeX,
  ShieldCheck,
  ArrowRight,
  Eye,
  Layers
} from 'lucide-react';
import { IntegratedCropAnalysis } from '../types';
import { t, translateDynamicText } from '../utils/translations';

interface DiagnosisReportViewProps {
  currentLanguage?: string;
  diagnosis: IntegratedCropAnalysis;
  imagePreview: string | null;
  onOpenChatWithQuery: (query: string) => void;
  onStartNewDiagnosis: () => void;
}

export const DiagnosisReportView: React.FC<DiagnosisReportViewProps> = ({
  currentLanguage = 'en',
  diagnosis,
  imagePreview,
  onOpenChatWithQuery,
  onStartNewDiagnosis
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getSeverityBadge = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-600 text-white border-red-700';
      case 'Severe':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      case 'Moderate':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'Mild':
        return 'bg-blue-50 text-blue-900 border-blue-300';
      case 'Healthy':
      default:
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const translatedCrop = translateDynamicText(diagnosis.cropName, currentLanguage);
    const translatedDiagnosis = translateDynamicText(diagnosis.primaryDiagnosis, currentLanguage);
    const translatedSummary = translateDynamicText(diagnosis.summary, currentLanguage);
    const translatedAction = diagnosis.actionPlan?.[0] ? translateDynamicText(diagnosis.actionPlan[0].title, currentLanguage) : '';

    const textToSpeak = `${translatedCrop}. ${translatedDiagnosis}. ${translatedSummary}. ${translatedAction}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLanguage === 'te' ? 'te-IN' : currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'es' ? 'es-ES' : currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'ta' ? 'ta-IN' : currentLanguage === 'kn' ? 'kn-IN' : 'en-US';
    utterance.rate = 0.92;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Action Bar */}
      <div className="no-print bg-white p-4 rounded-2xl border border-[#D5DDD2] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-pulse"></span>
          <span className="text-sm font-bold text-[#143021]">
            {t('report_title', currentLanguage, 'Agronomic Diagnostic Report')}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EFF6EC] text-[#2D6A4F] font-semibold border border-[#CBDCC7] hidden sm:inline-block">
            ✓ {t('verified_stamp', currentLanguage, 'AI Verified')}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleAudio}
            className="px-3.5 py-2 bg-[#EFF5EB] hover:bg-[#DDECD7] text-[#1B4332] text-xs sm:text-sm font-semibold rounded-xl border border-[#CBDCC7] transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-red-600 animate-pulse" /> : <Volume2 className="w-4 h-4 text-[#2D6A4F]" />}
            <span>{isSpeaking ? t('audio_speaking', currentLanguage, 'Speaking...') : t('audio_listen', currentLanguage, 'Listen (Audio)')}</span>
          </button>

          <button
            id="print-report-btn"
            onClick={handlePrint}
            className="px-3.5 py-2 bg-[#F4F6F1] hover:bg-[#E2EEDE] text-[#1B4332] text-xs sm:text-sm font-semibold rounded-xl border border-[#CBDCC7] transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">{t('export_pdf', currentLanguage, 'Print / PDF')}</span>
          </button>

          <button
            id="new-diagnosis-btn"
            onClick={onStartNewDiagnosis}
            className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            {t('start_new_diagnosis', currentLanguage, 'Start New Scan')}
          </button>
        </div>
      </div>

      {/* Main Diagnostic Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#D5DDD2] space-y-7">
        
        {/* Header: Crop details, Disease Title, and Severity Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#E6EBE3] gap-5">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-xl bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7]">
                🌱 {translateDynamicText(diagnosis.cropName, currentLanguage)}
              </span>
              {diagnosis.cropVariety && (
                <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-xl bg-[#EFF5EB] text-[#143021] border border-[#C5D9C0]">
                  🏷️ {translateDynamicText(diagnosis.cropVariety, currentLanguage)}
                </span>
              )}
              {diagnosis.plantingDate && (
                <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-xl bg-[#F4F6F1] text-[#3D5A45] border border-[#D5DDD2]">
                  🗓️ {diagnosis.plantingDate} {diagnosis.daysAfterSowing ? `(${diagnosis.daysAfterSowing} ${t('das_unit', currentLanguage, 'DAS')})` : ''}
                </span>
              )}
              <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-xl border ${getSeverityBadge(diagnosis.severityLevel)}`}>
                {translateDynamicText(diagnosis.severityLevel, currentLanguage)} {t('severity_label', currentLanguage, 'Severity')}
              </span>
            </div>
            
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#11291B] tracking-tight leading-snug">
              {translateDynamicText(diagnosis.primaryDiagnosis, currentLanguage)}
            </h1>
          </div>

          {/* Model Confidence Meter */}
          <div className="bg-[#F8FAF6] p-4 rounded-2xl border border-[#E0E7DC] flex items-center space-x-4 shrink-0 self-start lg:self-center">
            <div className="relative w-14 h-14 rounded-full bg-[#E8EDE4] flex items-center justify-center border-4 border-[#2D6A4F]">
              <span className="text-sm font-extrabold text-[#143021]">{diagnosis.confidencePercentage}%</span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block">
                {t('confidence_label', currentLanguage, 'Model Confidence')}
              </span>
              <span className="text-sm font-bold text-[#143021] block">
                {translateDynamicText(diagnosis.confidence, currentLanguage)}
              </span>
            </div>
          </div>
        </div>

        {/* Agronomic Executive Summary Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#EFF6EC] to-[#F8FAF6] border-l-4 border-[#2D6A4F] text-[#143021] text-base leading-relaxed font-normal shadow-2xs">
          {translateDynamicText(diagnosis.summary, currentLanguage)}
        </div>

        {/* 3-Pillar Breakdown: Visual Signs | Soil Interplay | Weather Advisory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Pillar 1: Visual Disease Signs */}
          <div className="p-5 rounded-2xl bg-[#F9FBF8] border border-[#E0E7DC] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-[#1B4332] font-bold text-sm sm:text-base mb-3">
                <Leaf className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{t('visual_findings_label', currentLanguage, 'Visual Signs & Symptoms')}</span>
              </div>
              
              <ul className="space-y-2.5 text-sm text-[#264633] leading-relaxed">
                {diagnosis.visualMarkerFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-700 font-bold text-base leading-none shrink-0 mt-1">•</span>
                    <span>{translateDynamicText(finding, currentLanguage)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {imagePreview && (
              <div className="pt-3 border-t border-[#E8EDE4]">
                <img 
                  src={imagePreview} 
                  alt="Diagnostic Focus" 
                  className="w-full h-28 object-cover rounded-xl border border-[#D5DDD2]" 
                />
              </div>
            )}
          </div>

          {/* Pillar 2: Soil Nutrients & IoT Sensor Interplay */}
          <div className="p-5 rounded-2xl bg-[#F9FBF8] border border-[#E0E7DC] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-[#1B4332] font-bold text-sm sm:text-base mb-3">
                <span className="flex items-center">
                  <Sprout className="w-5 h-5 mr-2 text-amber-700 shrink-0" />
                  <span>{t('soil_correlation_label', currentLanguage, 'Soil Health Interplay')}</span>
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-200">
                  {translateDynamicText(diagnosis.soilCorrelation.status, currentLanguage)}
                </span>
              </div>

              <p className="text-sm text-[#264633] leading-relaxed mb-3">
                {translateDynamicText(diagnosis.soilCorrelation.details, currentLanguage)}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8EDE4]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2">
                {t('soil_panel_title', currentLanguage, 'Soil Action')}:
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[#264633] leading-relaxed">
                {diagnosis.soilCorrelation.suggestedAmendments.map((amend, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span>{translateDynamicText(amend, currentLanguage)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pillar 3: Weather & Spray Safety */}
          <div className="p-5 rounded-2xl bg-[#F9FBF8] border border-[#E0E7DC] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-[#1B4332] font-bold text-sm sm:text-base mb-3">
                <span className="flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-blue-600 shrink-0" />
                  <span>{t('weather_correlation_label', currentLanguage, 'Weather & Spray Safety')}</span>
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 border border-blue-200">
                  {translateDynamicText(diagnosis.weatherCorrelation.diseaseSpreadRisk, currentLanguage)}
                </span>
              </div>

              <div className="space-y-3 text-sm text-[#264633] leading-relaxed">
                <div>
                  <strong className="text-[#143021] block text-xs font-bold uppercase tracking-wider mb-1 text-[#2D6A4F]">
                    {t('spraying_window_risk', currentLanguage, 'Spray Suitability')}:
                  </strong>
                  <span>{translateDynamicText(diagnosis.weatherCorrelation.sprayingWindowAlert, currentLanguage)}</span>
                </div>

                <div>
                  <strong className="text-[#143021] block text-xs font-bold uppercase tracking-wider mb-1 text-[#2D6A4F]">
                    {t('irrigation_advice', currentLanguage, 'Irrigation Guidance')}:
                  </strong>
                  <span>{translateDynamicText(diagnosis.weatherCorrelation.irrigationRecommendation, currentLanguage)}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8EDE4]">
              <button
                onClick={() => onOpenChatWithQuery(`How does the current weather impact ${diagnosis.primaryDiagnosis}?`)}
                className="w-full py-2 bg-[#EFF5EB] hover:bg-[#DDECD7] text-[#1B4332] text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer border border-[#CBDCC7]"
              >
                <MessageSquare className="w-4 h-4 text-[#2D6A4F]" />
                <span>{t('nav_ask_ai', currentLanguage, 'Ask Crop Doctor AI')}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Action & Prescription Plan */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2 text-[#1B4332] font-bold text-base sm:text-lg">
            <Clock className="w-5 h-5 text-[#2D6A4F]" />
            <span>{t('action_plan_label', currentLanguage, 'Prescribed Treatment Protocol')}</span>
          </div>

          <div className="space-y-3.5">
            {diagnosis.actionPlan.map((action, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F8FAF6] border border-[#DCE4D8] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#2D6A4F] text-white">
                      {t('step_num', currentLanguage, 'Step')} {idx + 1} &bull; {translateDynamicText(action.priority, currentLanguage)}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#143021]">
                      {translateDynamicText(action.title, currentLanguage)}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#2D4A38] leading-relaxed">
                    {translateDynamicText(action.description, currentLanguage)}
                  </p>

                  {action.safetyNote && (
                    <div className="text-xs sm:text-sm text-amber-800 font-medium flex items-center space-x-1.5 pt-1">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{translateDynamicText(action.safetyNote, currentLanguage)}</span>
                    </div>
                  )}
                </div>

                {action.productName && (
                  <div className="bg-white p-4 rounded-xl border border-[#CBDCC7] shrink-0 text-left lg:text-right min-w-[200px]">
                    <span className="text-xs text-[#52796F] block font-medium mb-0.5">
                      {t('cibrc_chemical_label', currentLanguage, 'Recommended Formulation')}
                    </span>
                    <strong className="text-sm sm:text-base text-[#143021] block font-bold">
                      {action.productName}
                    </strong>
                    {action.dosage && (
                      <span className="text-xs sm:text-sm text-[#2D6A4F] font-bold block mt-1">
                        {translateDynamicText(action.dosage, currentLanguage)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dual Treatment Solutions: Organic vs Chemical */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4 border-t border-[#E6EBE3]">
          
          {/* Organic / Biological Management */}
          <div className="p-5 rounded-2xl bg-[#F0F7EE] border border-[#C8DEC3] space-y-3.5">
            <div className="flex items-center space-x-2 text-[#1B4332] font-bold text-base">
              <Leaf className="w-5 h-5 text-emerald-700" />
              <span>{t('organic_remedies_label', currentLanguage, 'Organic & Biological Solutions')}</span>
            </div>
            
            <div className="space-y-3">
              {diagnosis.organicRemedies.map((remedy, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-[#D2E4CE] shadow-2xs space-y-1.5">
                  <h4 className="text-sm sm:text-base text-[#1B4332] font-bold">
                    {translateDynamicText(remedy.title, currentLanguage)}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3D5A45] leading-relaxed">
                    {translateDynamicText(remedy.recipeOrMethod, currentLanguage)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chemical CIBRC Options */}
          <div className="p-5 rounded-2xl bg-[#F6F8F9] border border-[#CBD5E1] space-y-3.5">
            <div className="flex items-center space-x-2 text-[#1E293B] font-bold text-base">
              <Beaker className="w-5 h-5 text-blue-700" />
              <span>{t('cibrc_chemical_label', currentLanguage, 'Certified Chemical Formulations (CIBRC)')}</span>
            </div>
            
            <div className="space-y-3">
              {diagnosis.chemicalTreatments.map((chem, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm sm:text-base text-[#0F172A] font-bold">
                      {chem.tradeName}
                    </h4>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-bold border border-amber-200">
                      {chem.waitingPeriodDays} {t('phi_days', currentLanguage, 'Days PHI')}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-[#475569] space-y-1">
                    <div>Active: <span className="font-semibold text-[#1E293B]">{chem.activeIngredient}</span></div>
                    <div>Dosage: <span className="font-bold text-[#0F766E]">{translateDynamicText(chem.dosagePerAcre, currentLanguage)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Expert Agronomist Note */}
        <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EBE6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1.5 flex-1">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              {t('expert_note_label', currentLanguage, 'Agronomist Advisory Note')}
            </span>
            <p className="text-sm sm:text-base text-[#5C5340] leading-relaxed">
              {translateDynamicText(diagnosis.expertNote, currentLanguage)}
            </p>
          </div>

          <button
            onClick={() => onOpenChatWithQuery(`Can you explain the exact spray preparation steps for ${diagnosis.primaryDiagnosis}?`)}
            className="no-print px-5 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs flex items-center space-x-2 shrink-0 self-start sm:self-center cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('nav_ask_ai', currentLanguage, 'Ask Crop Doctor AI')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
