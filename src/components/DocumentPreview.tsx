import React, { useState } from 'react';
import { ProjectReport, Language, ProjectImage } from '../types/document';
import { translations } from '../i18n/translations';
import { 
  Users, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  FileText,
  FileCheck2,
  X
} from 'lucide-react';

interface DocumentPreviewProps {
  report: ProjectReport;
  language: Language;
  onSelectImageForZoom: (image: ProjectImage) => void;
  personnelValid: boolean;
  showFullscreenA4Modal?: boolean;
  onCloseFullscreenA4Modal?: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  report,
  language,
  onSelectImageForZoom,
  personnelValid,
  showFullscreenA4Modal = false,
  onCloseFullscreenA4Modal
}) => {
  const t = translations[language];
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [mobileMode, setMobileMode] = useState<'card' | 'sheet'>('card');

  const generalImages = report.images.filter((img) => img.target === 'general');

  const handlePrint = () => {
    window.print();
  };

  // Reusable Printable A4 Paper Sheet (rendered on desktop and in export canvas)
  const renderA4Sheet = (isModal = false) => (
    <div
      id="pdf-document-canvas"
      className="pdf-printable-page bg-white text-slate-900 w-[794px] min-h-[1123px] p-10 sm:p-12 shadow-2xl relative font-sans flex flex-col justify-between selection:bg-sky-200 selection:text-slate-900"
    >
      <div>
        {/* Top Confidentiality Banner */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200 text-[10px] text-slate-500 font-mono tracking-wider">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{t.pdfConfidentialBadge}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{report.date || new Date().toISOString().split('T')[0]}</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-sky-600 mb-1">
            {t.documentHeaderSummary}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {report.title || t.pdfTitleDefault}
          </h1>
        </div>

        {/* Location & Date Minimal Strip */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg mb-6 text-xs">
          <div>
            <span className="block text-[10px] uppercase font-semibold text-slate-500 mb-0.5">
              {t.siteLocation}
            </span>
            <div className="flex items-center gap-1.5 text-slate-800 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{report.siteLocation || 'Non spécifié'}</span>
            </div>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-semibold text-slate-500 mb-0.5">
              {t.date}
            </span>
            <div className="flex items-center gap-1.5 text-slate-800 font-mono font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{report.date || '—'}</span>
            </div>
          </div>
        </div>

        {/* MANDATORY ON-SITE HEADCOUNT EXECUTIVE CARD */}
        <div className={`p-4 rounded-xl mb-6 flex items-center justify-between border ${
          personnelValid 
            ? 'bg-gradient-to-r from-sky-50 to-indigo-50/60 border-sky-200' 
            : 'bg-rose-50 border-rose-300'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold shadow-sm ${
              personnelValid ? 'bg-sky-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {t.pdfPersonnelBadge}
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {t.personnelLabel}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className={`text-3xl font-extrabold font-mono tabular-nums leading-none ${
              personnelValid ? 'text-sky-700' : 'text-rose-600'
            }`}>
              {report.personnelCount !== '' ? report.personnelCount : '—'}
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              {t.personnelUnit}
            </div>
          </div>
        </div>

        {/* ITEMISED TASKS SECTION WITH DASHED BULLET POINTS */}
        <div className="mb-6">
          <div className="flex items-center justify-between pb-1.5 mb-3 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t.pdfTasksSection}
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              {report.tasks.length} {language === 'fr' ? 'actions' : language === 'zh' ? '项任务' : 'actions'}
            </span>
          </div>

          {report.tasks.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">
              {t.noTasksYet}
            </p>
          ) : (
            <div className="space-y-3">
              {report.tasks.map((task, idx) => {
                const taskPhotos = report.images.filter((img) => img.target === task.id);

                return (
                  <div key={task.id} className="text-xs text-slate-800">
                    {/* Dashed bullet line */}
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-sky-600 font-mono text-base leading-none pt-0.5 select-none shrink-0">
                        —
                      </span>
                      <div className="flex-1 font-medium leading-relaxed">
                        <span>{task.text || `Tâche #${idx + 1}`}</span>
                      </div>
                    </div>

                    {/* Task Photos Row */}
                    {taskPhotos.length > 0 && (
                      <div className="mt-2 ml-5 pl-2 border-l-2 border-sky-200">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {taskPhotos.map((photo) => (
                            <div 
                              key={photo.id}
                              onClick={() => onSelectImageForZoom(photo)}
                              className="group cursor-pointer rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-xs hover:border-sky-400 transition-colors"
                            >
                              <div className="w-full h-24 bg-slate-100 overflow-hidden">
                                <img
                                  src={photo.dataUrl}
                                  alt={photo.caption || photo.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              {photo.caption && (
                                <div className="p-1.5 text-[10px] text-slate-600 line-clamp-2 bg-white border-t border-slate-100">
                                  {photo.caption}
                                </div>
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

        {/* GENERAL OBSERVATIONS */}
        {report.generalNotes && (
          <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              {t.pdfNotesSection}
            </h4>
            <p className="text-slate-700 whitespace-pre-line leading-relaxed">
              {report.generalNotes}
            </p>
          </div>
        )}

        {/* GENERAL PROGRESS GALLERY (End of document) */}
        {generalImages.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between pb-1.5 mb-3 border-b border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                {t.pdfGeneralGallerySection}
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                {generalImages.length} {language === 'fr' ? 'photos' : language === 'zh' ? '张照片' : 'photos'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {generalImages.map((img, i) => (
                <div
                  key={img.id}
                  onClick={() => onSelectImageForZoom(img)}
                  className="cursor-pointer border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shadow-xs hover:border-sky-500 transition-colors group"
                >
                  <div className="w-full h-32 bg-slate-200 overflow-hidden relative">
                    <img
                      src={img.dataUrl}
                      alt={img.caption || img.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white font-mono text-[9px]">
                      #{i + 1}
                    </span>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-[10px] text-slate-700 font-medium line-clamp-2">
                      {img.caption || img.name}
                    </p>
                    <span className="text-[9px] font-mono text-slate-400 mt-0.5 block">
                      {img.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{t.pdfZeroRetentionFootnote}</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span>DocuPulse</span>
          <span>·</span>
          <span>{t.pdfPageOf} 1 / 1</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Studio Header Bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-[#111827] border border-slate-800 rounded-t-2xl shrink-0">
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="hidden sm:inline">Aperçu en direct</span>
          <span className="font-mono text-slate-400 tabular-nums">{zoomLevel}%</span>
        </div>

        {/* Zoom & Print */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={t.zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="px-2 py-1 min-h-[32px] rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={t.zoomReset}
          >
            100%
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={t.zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-slate-700 mx-1"></div>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1 px-2.5 py-1 min-h-[32px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Imprimer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-auto p-3 sm:p-6 bg-[#0B0F17] flex justify-center items-start border-x border-b border-slate-800 rounded-b-2xl min-h-[500px]">
        {/* On Desktop: Direct Zoomable A4 Canvas */}
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="transition-all"
        >
          {renderA4Sheet(false)}
        </div>
      </div>

      {/* FULLSCREEN A4 MODAL (For mobile when user taps "Voir la feuille A4") */}
      {showFullscreenA4Modal && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
          onClick={onCloseFullscreenA4Modal}
        >
          {/* Modal Header */}
          <div 
            className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <FileCheck2 className="w-4 h-4 text-sky-400" />
              <span>Aperçu de la Feuille A4</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onCloseFullscreenA4Modal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Scrollable Sheet */}
          <div 
            className="flex-1 overflow-auto p-4 flex justify-center items-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center'
              }}
            >
              {renderA4Sheet(true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
