import React from 'react';
import { X, Sparkles, Camera, Activity, CloudSun, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { t } from '../utils/translations';

interface HelpGuideModalProps {
  currentLanguage?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const HelpGuideModal: React.FC<HelpGuideModalProps> = ({ currentLanguage = 'en', isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D5DDD2] space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6EBE3]">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#143021]">
                {t('app_name', currentLanguage, 'AgriSense AI')} &bull; {t('help_title', currentLanguage, 'Multi-Factor Agronomy Guide')}
              </h3>
              <p className="text-xs text-[#52796F]">
                {t('intake_desc', currentLanguage, 'Eliminating agricultural misdiagnosis through multi-sensor fusion')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B8772] hover:text-[#143021] hover:bg-[#F4F6F1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Pillars Flow */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            <div className="p-4 rounded-2xl bg-[#EFF5EB] border border-[#C5D9C0] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#143021]">1. {t('visual_findings_label', currentLanguage, 'Vision AI')}</h4>
              <p className="text-[11px] text-[#4F6C57] leading-relaxed">
                Analyzes leaf lesions, spore patterns, pest chewing, and discoloration rings with high optical sensitivity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EFF5EB] border border-[#C5D9C0] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#143021]">2. {t('soil_panel_title', currentLanguage, 'Soil Health IoT')}</h4>
              <p className="text-[11px] text-[#4F6C57] leading-relaxed">
                Checks pH, Nitrogen, Phosphorus, Potassium & moisture to separate true pathogens from nutrient deficiencies.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EFF5EB] border border-[#C5D9C0] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center">
                <CloudSun className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#143021]">3. {t('weather_panel_title', currentLanguage, 'Weather Microclimate')}</h4>
              <p className="text-[11px] text-[#4F6C57] leading-relaxed">
                Calculates fungal sporulation risks and warns when rainfall would wash away chemical applications.
              </p>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAF6] border border-[#DCE4D8] space-y-2 text-xs text-[#3D5A45]">
            <div className="font-bold text-[#143021] flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Grounding in ICAR & CIBRC Certified Protocols</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Every chemical dosage lists active ingredients and Pre-Harvest Intervals (PHI) calibrated against official Central Insecticides Board & Registration Committee (CIBRC) standards to ensure farmer safety.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center space-x-1.5"
          >
            <span>{t('got_it_btn', currentLanguage, 'Got It, Return to Farm')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
