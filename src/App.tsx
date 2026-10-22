/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectReport, Language, ProjectImage } from './types/document';
import { sampleReports } from './utils/sampleData';
import { translations } from './i18n/translations';
import { exportDocumentToPdf } from './utils/pdfGenerator';
import { Header } from './components/Header';
import { ReportEditor } from './components/ReportEditor';
import { DocumentPreview } from './components/DocumentPreview';
import { MobileCardPreview } from './components/MobileCardPreview';
import { ImageModal } from './components/ImageModal';
import { 
  FileEdit, 
  Eye, 
  FileDown, 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Loader2
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [report, setReport] = useState<ProjectReport>(sampleReports.fr);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [showFullscreenA4Modal, setShowFullscreenA4Modal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<ProjectImage | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const t = translations[language];

  // Validate mandatory on-site personnel count
  const isPersonnelValid = 
    typeof report.personnelCount === 'number' && 
    !isNaN(report.personnelCount) && 
    report.personnelCount >= 1;

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleLoadSample = () => {
    setReport(sampleReports[language]);
    showToast(t.sampleLoaded, 'success');
  };

  const handlePurgeSession = () => {
    if (window.confirm(t.purgeConfirm)) {
      setReport({
        id: `report-${Date.now()}`,
        title: '',
        siteLocation: '',
        date: new Date().toISOString().split('T')[0],
        personnelCount: '',
        tasks: [],
        generalNotes: '',
        images: [],
        confidentialityNotice: true
      });
      showToast(
        language === 'fr' 
          ? 'Session réinitialisée. Mémoire purgée.' 
          : language === 'zh'
          ? '会话已重置，内存已彻底销毁。'
          : 'Session reset. Memory completely purged.',
        'info'
      );
    }
  };

  const handleDownloadPdf = async () => {
    if (!isPersonnelValid) {
      showToast(t.personnelRequiredError, 'error');
      setMobileTab('editor');
      return;
    }

    if (!report.title.trim()) {
      showToast(t.fillRequiredFields, 'error');
      setMobileTab('editor');
      return;
    }

    try {
      setIsGeneratingPdf(true);
      await exportDocumentToPdf('pdf-document-canvas', {
        fileName: report.title || 'DocuPulse_Rapport'
      });
      showToast(t.exportSuccess, 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast(
        language === 'fr'
          ? 'Erreur lors de la génération du PDF. Veuillez réessayer.'
          : language === 'zh'
          ? '生成PDF失败，请重试。'
          : 'Failed to generate PDF. Please try again.',
        'error'
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        onDownloadPdf={handleDownloadPdf}
        isGeneratingPdf={isGeneratingPdf}
        onPurgeSession={handlePurgeSession}
        onLoadSample={handleLoadSample}
        personnelValid={isPersonnelValid}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col">
        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setMobileTab('editor')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition-all ${
                mobileTab === 'editor'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>{t.editorTab}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition-all ${
                mobileTab === 'preview'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{t.previewTab}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowFullscreenA4Modal(true)}
            className="px-3 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-sky-400 text-xs font-medium flex items-center gap-1.5 whitespace-nowrap"
            title="Voir feuille A4"
          >
            <FileCheck2 className="w-4 h-4" />
            <span className="hidden sm:inline">A4</span>
          </button>
        </div>

        {/* Dual Layout: Responsive Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form Editor View */}
          <div className={`${mobileTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
            <ReportEditor
              report={report}
              language={language}
              onUpdateReport={setReport}
              onSelectImageForZoom={setZoomedImage}
              personnelValid={isPersonnelValid}
            />
          </div>

          {/* Mobile Card Preview (Visible only on mobile when preview tab active) */}
          <div className={`lg:hidden ${mobileTab === 'preview' ? 'block' : 'hidden'}`}>
            <MobileCardPreview
              report={report}
              language={language}
              onSelectImageForZoom={setZoomedImage}
              onOpenFullscreenA4={() => setShowFullscreenA4Modal(true)}
              personnelValid={isPersonnelValid}
            />
          </div>

          {/* Desktop Live A4 Document Preview */}
          <div className="hidden lg:block lg:sticky lg:top-20">
            <DocumentPreview
              report={report}
              language={language}
              onSelectImageForZoom={setZoomedImage}
              personnelValid={isPersonnelValid}
              showFullscreenA4Modal={false}
            />
          </div>
        </div>

        {/* Hidden or Fullscreen A4 Sheet for PDF Capture and Inspection */}
        <div className={showFullscreenA4Modal ? 'block' : 'hidden'}>
          <DocumentPreview
            report={report}
            language={language}
            onSelectImageForZoom={setZoomedImage}
            personnelValid={isPersonnelValid}
            showFullscreenA4Modal={showFullscreenA4Modal}
            onCloseFullscreenA4Modal={() => setShowFullscreenA4Modal(false)}
          />
        </div>
      </main>

      {/* MOBILE STICKY BOTTOM ACTION BAR (Thumb Zone, < 15% viewport height) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMobileTab(mobileTab === 'editor' ? 'preview' : 'editor')}
          className="px-3.5 py-2.5 min-h-[48px] rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 shrink-0"
        >
          {mobileTab === 'editor' ? (
            <>
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Aperçu</span>
            </>
          ) : (
            <>
              <FileEdit className="w-4 h-4 text-sky-400" />
              <span>Éditer</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 min-h-[48px] rounded-xl font-bold text-xs text-white shadow-lg transition-all ${
            isGeneratingPdf
              ? 'bg-slate-700 opacity-80'
              : !isPersonnelValid
              ? 'bg-slate-800 border border-amber-500/50 text-slate-200'
              : 'bg-gradient-to-r from-sky-500 to-indigo-600 active:scale-98 shadow-sky-500/20'
          }`}
        >
          {isGeneratingPdf ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.generatingPdf}</span>
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4" />
              <span>{t.downloadPdf}</span>
            </>
          )}
        </button>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-16 lg:bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-5 duration-200 max-w-sm">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold border ${
            toast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200'
              : toast.type === 'error'
              ? 'bg-rose-950/95 border-rose-500/50 text-rose-200'
              : 'bg-slate-900/95 border-slate-700 text-slate-200'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      <ImageModal
        image={zoomedImage}
        onClose={() => setZoomedImage(null)}
      />
    </div>
  );
}
