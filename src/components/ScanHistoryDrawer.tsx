import React from 'react';
import { Clock, Eye, Trash2, Sprout, ArrowRight, ShieldAlert, FileSpreadsheet } from 'lucide-react';
import { IntegratedCropAnalysis } from '../types';
import { t, translateDynamicText } from '../utils/translations';

interface ScanHistoryProps {
  currentLanguage?: string;
  history: IntegratedCropAnalysis[];
  onSelectScan: (scan: IntegratedCropAnalysis) => void;
  onClearHistory: () => void;
  onStartNew: () => void;
}

export const ScanHistoryDrawer: React.FC<ScanHistoryProps> = ({
  currentLanguage = 'en',
  history,
  onSelectScan,
  onClearHistory,
  onStartNew
}) => {
  const getSeverityPill = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Severe':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Mild':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Healthy':
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#D5DDD2] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E6EBE3] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold">
              <Clock className="w-4 h-4" />
            </span>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-[#143021]">
              {t('nav_history', currentLanguage, 'Farmer Field Diary & History Log')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6754] mt-1 ml-9">
            {t('intake_desc', currentLanguage, 'Review past multi-factor diagnoses, monitor treatment effectiveness, and track recurring field issues')}
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3 py-1.5 bg-[#FDF2F2] hover:bg-[#FDE8E8] text-[#9B1C1C] text-xs font-semibold rounded-xl border border-[#F8B4B4] transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t('clear_btn', currentLanguage, 'Clear History')}</span>
          </button>
        )}
      </div>

      {/* History Items Grid */}
      {history.length === 0 ? (
        <div className="text-center py-12 space-y-3 bg-[#F9FBF8] rounded-2xl border border-dashed border-[#CBDCC7]">
          <div className="w-12 h-12 rounded-full bg-[#E8EDE4] text-[#2D6A4F] flex items-center justify-center mx-auto">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-[#143021] text-base">No previous scans recorded</h3>
          <p className="text-xs text-[#52796F] max-w-sm mx-auto">
            Once you perform a multi-factor crop diagnosis, reports will be archived here for tracking disease trends.
          </p>
          <button
            onClick={onStartNew}
            className="mt-2 px-4 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            {t('run_diagnosis_cta', currentLanguage, 'Start First Field Diagnosis')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((scan) => (
            <div
              key={scan.id}
              onClick={() => onSelectScan(scan)}
              className="p-4 rounded-2xl bg-[#F8FAF6] hover:bg-[#F0F5EC] border border-[#DCE4D8] hover:border-[#A3C89B] cursor-pointer transition-all flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#2D6A4F]">{translateDynamicText(scan.cropName, currentLanguage)}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getSeverityPill(scan.severityLevel)}`}>
                    {translateDynamicText(scan.severityLevel, currentLanguage)}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-[#143021] group-hover:text-[#2D6A4F] transition-colors line-clamp-1 mb-1">
                  {translateDynamicText(scan.primaryDiagnosis, currentLanguage)}
                </h4>

                <p className="text-xs text-[#52796F] line-clamp-2 leading-relaxed mb-3">
                  {translateDynamicText(scan.summary, currentLanguage)}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6EBE3] flex items-center justify-between text-[11px] text-[#6B8772]">
                <span>{new Date(scan.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                <span className="text-[#2D6A4F] font-bold flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{t('report_title', currentLanguage, 'View Prescription')}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
