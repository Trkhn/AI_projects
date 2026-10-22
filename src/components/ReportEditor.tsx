import React, { useState, useRef } from 'react';
import { 
  ProjectReport, 
  TaskItem, 
  ProjectImage, 
  Language 
} from '../types/document';
import { translations } from '../i18n/translations';
import { 
  Building2, 
  Users, 
  CheckSquare, 
  FileText, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Upload, 
  Camera, 
  ImagePlus, 
  AlertCircle, 
  ClipboardList,
  Calendar,
  MapPin
} from 'lucide-react';

interface ReportEditorProps {
  report: ProjectReport;
  language: Language;
  onUpdateReport: (updater: (prev: ProjectReport) => ProjectReport) => void;
  onSelectImageForZoom: (image: ProjectImage) => void;
  personnelValid: boolean;
}

export const ReportEditor: React.FC<ReportEditorProps> = ({
  report,
  language,
  onUpdateReport,
  onSelectImageForZoom,
  personnelValid
}) => {
  const t = translations[language];

  // Hidden file inputs for General Gallery
  const generalGalleryInputRef = useRef<HTMLInputElement>(null);
  const generalCameraInputRef = useRef<HTMLInputElement>(null);

  // Hidden file inputs for Task-specific photos
  const taskGalleryInputRef = useRef<HTMLInputElement>(null);
  const taskCameraInputRef = useRef<HTMLInputElement>(null);
  const [activeTaskIdForUpload, setActiveTaskIdForUpload] = useState<string | null>(null);

  // Batch paste modal state
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchText, setBatchText] = useState('');
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text: newTaskText.trim()
    };
    onUpdateReport((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
    setNewTaskText('');
  };

  const handleRemoveTask = (taskId: string) => {
    onUpdateReport((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
      images: prev.images.map((img) => 
        img.target === taskId ? { ...img, target: 'general' } : img
      )
    }));
  };

  const handleUpdateTaskText = (taskId: string, newText: string) => {
    onUpdateReport((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => 
        task.id === taskId ? { ...task, text: newText } : task
      )
    }));
  };

  const handleMoveTask = (index: number, direction: 'up' | 'down') => {
    onUpdateReport((prev) => {
      const newTasks = [...prev.tasks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newTasks.length) return prev;
      const temp = newTasks[index];
      newTasks[index] = newTasks[targetIndex];
      newTasks[targetIndex] = temp;
      return { ...prev, tasks: newTasks };
    });
  };

  const handleConfirmBatchImport = () => {
    if (!batchText.trim()) return;
    const lines = batchText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((l) => l.replace(/^[-*•—–\d.)\s]+/, '').trim())
      .filter((l) => l.length > 0);

    const createdTasks: TaskItem[] = lines.map((line, idx) => ({
      id: `task-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 5)}`,
      text: line
    }));

    onUpdateReport((prev) => ({
      ...prev,
      tasks: [...prev.tasks, ...createdTasks]
    }));

    setBatchText('');
    setShowBatchModal(false);
  };

  // Image Upload Processor
  const handleFilesSelected = (files: FileList | null, targetId: string = 'general') => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const newImage: ProjectImage = {
          id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          dataUrl,
          name: file.name,
          caption: '',
          target: targetId,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sizeKb: Math.round(file.size / 1024)
        };

        onUpdateReport((prev) => ({
          ...prev,
          images: [...prev.images, newImage]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (imageId: string) => {
    onUpdateReport((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId)
    }));
  };

  const handleUpdateImageCaption = (imageId: string, caption: string) => {
    onUpdateReport((prev) => ({
      ...prev,
      images: prev.images.map((img) => 
        img.id === imageId ? { ...img, caption } : img
      )
    }));
  };

  const handleUpdateImageTarget = (imageId: string, target: string) => {
    onUpdateReport((prev) => ({
      ...prev,
      images: prev.images.map((img) => 
        img.id === imageId ? { ...img, target } : img
      )
    }));
  };

  // Task Photo Trigger
  const triggerTaskUpload = (taskId: string, mode: 'camera' | 'gallery') => {
    setActiveTaskIdForUpload(taskId);
    if (mode === 'camera' && taskCameraInputRef.current) {
      taskCameraInputRef.current.value = '';
      taskCameraInputRef.current.click();
    } else if (mode === 'gallery' && taskGalleryInputRef.current) {
      taskGalleryInputRef.current.value = '';
      taskGalleryInputRef.current.click();
    }
  };

  const generalImages = report.images.filter((img) => img.target === 'general');

  return (
    <div className="space-y-5 pb-20 lg:pb-12">
      {/* Hidden inputs for general gallery */}
      <input
        ref={generalGalleryInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFilesSelected(e.target.files, 'general')}
      />
      <input
        ref={generalCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFilesSelected(e.target.files, 'general')}
      />

      {/* Hidden inputs for task photos */}
      <input
        ref={taskGalleryInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (activeTaskIdForUpload) {
            handleFilesSelected(e.target.files, activeTaskIdForUpload);
            setActiveTaskIdForUpload(null);
          }
        }}
      />
      <input
        ref={taskCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          if (activeTaskIdForUpload) {
            handleFilesSelected(e.target.files, activeTaskIdForUpload);
            setActiveTaskIdForUpload(null);
          }
        }}
      />

      {/* SECTION 1: Streamlined Project Info */}
      <section className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-800/80">
          <Building2 className="w-4 h-4 text-sky-400" />
          <h2 className="text-xs sm:text-sm font-semibold text-slate-100 uppercase tracking-wider">
            {t.sectionProjectInfo}
          </h2>
        </div>

        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {t.projectTitle} <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={report.title}
              onChange={(e) => onUpdateReport((p) => ({ ...p, title: e.target.value }))}
              placeholder={t.projectTitlePlaceholder}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.siteLocation}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={report.siteLocation}
                  onChange={(e) => onUpdateReport((p) => ({ ...p, siteLocation: e.target.value }))}
                  placeholder={t.siteLocationPlaceholder}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                />
                <MapPin className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.date}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={report.date}
                  onChange={(e) => onUpdateReport((p) => ({ ...p, date: e.target.value }))}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors font-mono"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MANDATORY ON-SITE PERSONNEL COUNT */}
      <section className={`border rounded-2xl p-4 sm:p-5 shadow-sm transition-all ${
        !personnelValid 
          ? 'bg-rose-950/25 border-rose-600/70' 
          : 'bg-[#111827] border-slate-800'
      }`}>
        <div className="flex items-start justify-between gap-3 mb-2.5 pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Users className={`w-4 h-4 ${!personnelValid ? 'text-rose-400' : 'text-sky-400'}`} />
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                {t.sectionPersonnel}
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500/20 border border-rose-500/40 text-rose-300">
                  Obligatoire
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.personnelSublabel}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 mt-2">
          {/* Stepper with minimum 44px touch targets */}
          <div className="flex items-center gap-2.5">
            <input
              type="number"
              min="1"
              max="999"
              value={report.personnelCount}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                onUpdateReport((p) => ({
                  ...p,
                  personnelCount: isNaN(val as number) ? '' : val
                }));
              }}
              placeholder={t.personnelPlaceholder}
              className={`w-28 min-h-[48px] px-3 rounded-xl bg-slate-900 text-xl font-bold font-mono tabular-nums text-center transition-all ${
                !personnelValid
                  ? 'border-2 border-rose-500 text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500'
                  : 'border border-slate-700 text-sky-400 focus:outline-none focus:border-sky-500'
              }`}
            />

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  const current = typeof report.personnelCount === 'number' ? report.personnelCount : 0;
                  if (current > 1) {
                    onUpdateReport((p) => ({ ...p, personnelCount: current - 1 }));
                  }
                }}
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-xl transition-all"
                title="-1"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => {
                  const current = typeof report.personnelCount === 'number' ? report.personnelCount : 0;
                  onUpdateReport((p) => ({ ...p, personnelCount: current + 1 }));
                }}
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-xl transition-all"
                title="+1"
              >
                +
              </button>
            </div>

            <span className="text-xs text-slate-300 font-medium whitespace-nowrap hidden sm:inline">
              {t.personnelUnit}
            </span>
          </div>

          {/* Preset Chips */}
          <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
            {[1, 2, 4, 6, 8, 12].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onUpdateReport((p) => ({ ...p, personnelCount: num }))}
                className={`min-h-[36px] min-w-[36px] px-3 py-1.5 text-xs font-mono tabular-nums rounded-lg transition-colors ${
                  report.personnelCount === num
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {!personnelValid && (
          <div className="mt-2.5 flex items-center gap-2 text-xs text-rose-400 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{t.personnelRequiredError}</span>
          </div>
        )}
      </section>

      {/* SECTION 3: ITEMISED TASKS WITH DASHED BULLETS & DIRECT PHOTO ATTACHMENTS */}
      <section className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3.5 pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-sky-400" />
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-100 uppercase tracking-wider">
                {t.sectionTasks}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.tasksSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowBatchModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors whitespace-nowrap"
          >
            <ClipboardList className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.batchImportBtn}</span>
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {report.tasks.length === 0 ? (
            <div className="py-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
              {t.noTasksYet}
            </div>
          ) : (
            report.tasks.map((task, idx) => {
              const taskImages = report.images.filter((img) => img.target === task.id);

              return (
                <div 
                  key={task.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-3.5 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    {/* Dash indicator */}
                    <div className="w-6 h-9 flex items-center justify-center shrink-0 font-bold text-sky-400 font-mono text-lg select-none">
                      —
                    </div>

                    {/* Task text editable */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={task.text}
                        onChange={(e) => handleUpdateTaskText(task.id, e.target.value)}
                        placeholder={t.taskPlaceholder}
                        className="w-full bg-transparent border-0 border-b border-transparent hover:border-slate-700 focus:border-sky-500 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 py-1.5 transition-colors"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      {/* Move up */}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveTask(idx, 'up')}
                        className="w-8 h-8 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 disabled:opacity-20 hover:bg-slate-800"
                        title="Monter"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move down */}
                      <button
                        type="button"
                        disabled={idx === report.tasks.length - 1}
                        onClick={() => handleMoveTask(idx, 'down')}
                        className="w-8 h-8 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 disabled:opacity-20 hover:bg-slate-800"
                        title="Descendre"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleRemoveTask(task.id)}
                        className="w-8 h-8 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Task Photo Controls: Mobile Camera + Gallery */}
                  <div className="mt-2 pl-8 flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => triggerTaskUpload(task.id, 'camera')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-sky-400 text-xs font-medium active:scale-95 transition-all"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerTaskUpload(task.id, 'gallery')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs font-medium active:scale-95 transition-all"
                    >
                      <ImagePlus className="w-3.5 h-3.5" />
                      <span>Galerie</span>
                    </button>

                    {taskImages.length > 0 && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        {taskImages.length} {t.attachedPhotosCount}
                      </span>
                    )}
                  </div>

                  {/* Task Photos Thumbnails */}
                  {taskImages.length > 0 && (
                    <div className="mt-2.5 pt-2 pl-8 flex items-center gap-2 flex-wrap">
                      {taskImages.map((img) => (
                        <div 
                          key={img.id}
                          className="relative group/thumb w-14 h-14 rounded-lg overflow-hidden border border-slate-700 bg-black shrink-0 cursor-pointer"
                          onClick={() => onSelectImageForZoom(img)}
                        >
                          <img 
                            src={img.dataUrl} 
                            alt={img.caption || img.name} 
                            className="w-full h-full object-cover" 
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(img.id);
                            }}
                            className="absolute top-0.5 right-0.5 p-1 bg-black/80 text-rose-400 rounded transition-opacity"
                            title="Supprimer la photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Add single task row */}
        <div className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTask();
                }
              }}
              placeholder={t.taskPlaceholder}
              className="w-full min-h-[44px] pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <span className="absolute left-3 top-3 font-bold text-sky-400 font-mono select-none">
              —
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddTask}
            className="inline-flex items-center justify-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addTask}</span>
          </button>
        </div>
      </section>

      {/* SECTION 4: GENERAL OBSERVATIONS & TECHNICAL NOTES */}
      <section className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2.5 pb-2.5 border-b border-slate-800/80">
          <FileText className="w-4 h-4 text-sky-400" />
          <h2 className="text-xs sm:text-sm font-semibold text-slate-100 uppercase tracking-wider">
            {t.sectionNotes}
          </h2>
        </div>

        <textarea
          rows={3}
          value={report.generalNotes}
          onChange={(e) => onUpdateReport((p) => ({ ...p, generalNotes: e.target.value }))}
          placeholder={t.generalNotesPlaceholder}
          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
        />
      </section>

      {/* SECTION 5: GENERAL PROGRESS PHOTOS (End of document) */}
      <section className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3.5 pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-sky-400" />
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-100 uppercase tracking-wider">
                {t.sectionGeneralGallery}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.uploadPhotosHint}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Camera and Gallery Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <button
            type="button"
            onClick={() => generalCameraInputRef.current?.click()}
            className="flex items-center justify-center gap-2 py-3 px-4 min-h-[48px] rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 active:scale-98 text-white font-semibold text-xs shadow-md transition-all"
          >
            <Camera className="w-4 h-4" />
            <span>{t.takePhotoCamera}</span>
          </button>

          <button
            type="button"
            onClick={() => generalGalleryInputRef.current?.click()}
            className="flex items-center justify-center gap-2 py-3 px-4 min-h-[48px] rounded-xl bg-slate-800 hover:bg-slate-750 active:scale-98 border border-slate-700 text-slate-200 font-semibold text-xs transition-all"
          >
            <Upload className="w-4 h-4 text-sky-400" />
            <span>{t.pickFromGallery}</span>
          </button>
        </div>

        {/* Photos Grid & Manager */}
        {report.images.length > 0 && (
          <div className="mt-4 space-y-3.5">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Toutes les photos ({report.images.length})</span>
              <span className="text-[11px] text-slate-500 font-normal">
                {generalImages.length} galerie globale · {report.images.length - generalImages.length} aux tâches
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.images.map((img) => (
                <div 
                  key={img.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex gap-3 items-start"
                >
                  <div 
                    className="relative w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-slate-700 cursor-pointer"
                    onClick={() => onSelectImageForZoom(img)}
                  >
                    <img
                      src={img.dataUrl}
                      alt={img.caption || img.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) => handleUpdateImageCaption(img.id, e.target.value)}
                      placeholder={t.captionPlaceholder}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />

                    <div>
                      <select
                        value={img.target}
                        onChange={(e) => handleUpdateImageTarget(img.id, e.target.value)}
                        className="w-full px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-200 focus:outline-none focus:border-sky-500"
                      >
                        <option value="general">
                          {t.assignGeneral}
                        </option>
                        {report.tasks.map((task, i) => (
                          <option key={task.id} value={task.id}>
                            {t.assignTaskPrefix} #{i + 1} — {task.text.slice(0, 24)}...
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-0.5 text-[10px] text-slate-500">
                      <span className="font-mono">{img.timestamp}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.id)}
                        className="text-rose-400 hover:text-rose-300 font-medium text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{t.deleteImage}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* BATCH IMPORT MODAL */}
      {showBatchModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setShowBatchModal(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-[#111827] border border-slate-700 rounded-2xl p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-5 h-5 text-sky-400" />
              <h3 className="text-base font-bold text-white">
                {t.batchImportTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              {t.batchImportDesc}
            </p>

            <textarea
              rows={6}
              value={batchText}
              onChange={(e) => setBatchText(e.target.value)}
              placeholder={t.batchImportPlaceholder}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 font-mono placeholder-slate-600 focus:outline-none focus:border-sky-500"
            />

            <div className="mt-4 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowBatchModal(false)}
                className="px-4 py-2 min-h-[44px] rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmBatchImport}
                className="px-4 py-2 min-h-[44px] rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-sm"
              >
                {t.batchImportConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
