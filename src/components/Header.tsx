import React from 'react';
import { Language } from '../types/document';
import { translations } from '../i18n/translations';
import { 
  FileDown, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  Loader2 
} from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onDownloadPdf: () => void;
  isGeneratingPdf: boolean;
  onPurgeSession: () => void;
  onLoadSample: () => void;
  personnelValid: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onDownloadPdf,
  isGeneratingPdf,
  onPurgeSession,
  onLoadSample,
  personnelValid
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-bold text-sm tracking-tighter">
            DP
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
              {t.appName}
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline whitespace-nowrap">
              {t.appSubtitle}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation & Status Affordances */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Zero-Persistence Badge */}
          <div 
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium cursor-help"
            title={t.zeroPersistenceTooltip}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="whitespace-nowrap">{t.zeroPersistenceBadge}</span>
          </div>

          {/* Quick Actions: Sample & Purge */}
          <button
            onClick={onLoadSample}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors whitespace-nowrap"
            title={t.loadSample}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.loadSample}</span>
          </button>

          <button
            onClick={onPurgeSession}
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 transition-colors whitespace-nowrap"
            title={t.purgeSession}
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">{t.purgeSession}</span>
          </button>

          {/* Language Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            {(['fr', 'en', 'zh'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  language === lang
                    ? 'bg-sky-500 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'fr' ? 'FR' : lang === 'en' ? 'EN' : '中文'}
              </button>
            ))}
          </div>
        </div>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onDownloadPdf}
            disabled={isGeneratingPdf}
            type="button"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-md ${
              isGeneratingPdf
                ? 'bg-slate-700 cursor-not-allowed opacity-75'
                : !personnelValid
                ? 'bg-slate-700 hover:bg-slate-600 border border-amber-500/50 text-slate-200'
                : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-sky-500/25 active:scale-[0.98]'
            } whitespace-nowrap`}
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{t.generatingPdf}</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 text-white" />
                <span>{t.downloadPdf}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
