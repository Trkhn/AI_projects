import React from 'react';
import { ProjectReport, Language, ProjectImage } from '../types/document';
import { translations } from '../i18n/translations';
import { 
  Users, 
  MapPin, 
  Calendar, 
  FileCheck2, 
  Camera, 
  Sparkles,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

interface MobileCardPreviewProps {
  report: ProjectReport;
  language: Language;
  onSelectImageForZoom: (image: ProjectImage) => void;
  onOpenFullscreenA4: () => void;
  personnelValid: boolean;
}

export const MobileCardPreview: React.FC<MobileCardPreviewProps> = ({
  report,
  language,
  onSelectImageForZoom,
  onOpenFullscreenA4,
  personnelValid
}) => {
  const t = translations[language];
  const generalImages = report.images.filter((img) => img.target === 'general');

  return (
    <div className="space-y-4 pb-24">
      {/* Quick Trigger to view the real A4 sheet */}
      <div className="bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-800/60 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <FileCheck2 className="w-5 h-5 text-sky-400 shrink-0" />
          <div>
            <span className="text-xs font-bold text-white block">
              {t.viewA4Fullscreen}
            </span>
            <span className="text-[11px] text-slate-400">
              Format impression officiel 210 × 297 mm
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenFullscreenA4}
          className="px-3 py-2 min-h-[40px] rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Aperçu A4</span>
        </button>
      </div>

      {/* Primary Project Header Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-1">
          {t.documentHeaderSummary}
        </div>
        <h2 className="text-lg font-bold text-white leading-snug">
          {report.title || t.pdfTitleDefault}
        </h2>

        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">{report.siteLocation || 'Non renseigné'}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">{report.date}</span>
          </div>
        </div>
      </div>

      {/* Mandatory On-site Personnel Card */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${
        personnelValid 
          ? 'bg-sky-950/30 border-sky-800/60' 
          : 'bg-rose-950/30 border-rose-600'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
            personnelValid ? 'bg-sky-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {t.pdfPersonnelBadge}
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {t.personnelLabel}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-2xl font-bold font-mono tabular-nums ${
            personnelValid ? 'text-sky-400' : 'text-rose-400'
          }`}>
            {report.personnelCount !== '' ? report.personnelCount : '—'}
          </div>
          <span className="text-[10px] text-slate-500">
            {t.personnelUnit}
          </span>
        </div>
      </div>

      {/* Tasks Executed List with Dashed Bullets */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            {t.pdfTasksSection}
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {report.tasks.length} actions
          </span>
        </div>

        {report.tasks.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">
            {t.noTasksYet}
          </p>
        ) : (
          <div className="space-y-3.5">
            {report.tasks.map((task, idx) => {
              const taskPhotos = report.images.filter((img) => img.target === task.id);

              return (
                <div key={task.id} className="text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-sky-400 font-mono text-base leading-none pt-0.5 shrink-0">
                      —
                    </span>
                    <span className="text-slate-200 font-medium leading-relaxed">
                      {task.text || `Tâche #${idx + 1}`}
                    </span>
                  </div>

                  {/* Task photos */}
                  {taskPhotos.length > 0 && (
                    <div className="mt-2 ml-5 pl-2 border-l-2 border-sky-800/60">
                      <div className="grid grid-cols-2 gap-2">
                        {taskPhotos.map((photo) => (
                          <div 
                            key={photo.id}
                            onClick={() => onSelectImageForZoom(photo)}
                            className="rounded-xl overflow-hidden border border-slate-700 bg-black cursor-pointer"
                          >
                            <img
                              src={photo.dataUrl}
                              alt={photo.caption || photo.name}
                              className="w-full h-24 object-cover"
                            />
                            {photo.caption && (
                              <p className="p-1.5 text-[10px] text-slate-300 truncate bg-slate-900">
                                {photo.caption}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Observations */}
      {report.generalNotes && (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm text-xs">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            {t.pdfNotesSection}
          </h4>
          <p className="text-slate-300 whitespace-pre-line leading-relaxed">
            {report.generalNotes}
          </p>
        </div>
      )}

      {/* General Progress Photos */}
      {generalImages.length > 0 && (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 pb-2 border-b border-slate-800">
            {t.pdfGeneralGallerySection} ({generalImages.length})
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {generalImages.map((img) => (
              <div
                key={img.id}
                onClick={() => onSelectImageForZoom(img)}
                className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer"
              >
                <img
                  src={img.dataUrl}
                  alt={img.caption || img.name}
                  className="w-full h-28 object-cover"
                />
                <div className="p-2">
                  <p className="text-[10px] text-slate-200 font-medium truncate">
                    {img.caption || img.name}
                  </p>
                  <span className="text-[9px] font-mono text-slate-500 block mt-0.5">
                    {img.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Notice Card */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{t.zeroPersistenceTooltip}</span>
      </div>
    </div>
  );
};
