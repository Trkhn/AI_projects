import { Language } from '../types/document';

export interface Translations {
  appName: string;
  appSubtitle: string;
  zeroPersistenceBadge: string;
  zeroPersistenceTooltip: string;
  downloadPdf: string;
  generatingPdf: string;
  purgeSession: string;
  purgeConfirm: string;
  loadSample: string;
  sampleLoaded: string;
  editorTab: string;
  previewTab: string;
  viewA4Fullscreen: string;
  mobileCardPreview: string;
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
  fitWidth: string;
  close: string;
  
  // Section Headers
  sectionProjectInfo: string;
  sectionPersonnel: string;
  sectionTasks: string;
  sectionNotes: string;
  sectionGeneralGallery: string;
  
  // Fields
  projectTitle: string;
  projectTitlePlaceholder: string;
  siteLocation: string;
  siteLocationPlaceholder: string;
  date: string;
  
  // Personnel Count Mandatory
  personnelLabel: string;
  personnelSublabel: string;
  personnelPlaceholder: string;
  personnelRequiredError: string;
  personnelUnit: string;
  
  // Tasks
  tasksHeaderTitle: string;
  tasksSubtitle: string;
  addTask: string;
  taskPlaceholder: string;
  taskItemPrefix: string;
  noTasksYet: string;
  batchImportBtn: string;
  batchImportTitle: string;
  batchImportDesc: string;
  batchImportPlaceholder: string;
  batchImportConfirm: string;
  cancel: string;
  attachPhotoToTask: string;
  attachedPhotosCount: string;
  
  // Images & Mobile Camera
  uploadPhotosTitle: string;
  uploadPhotosHint: string;
  takePhotoCamera: string;
  pickFromGallery: string;
  captionPlaceholder: string;
  assignedTo: string;
  assignGeneral: string;
  assignTaskPrefix: string;
  deleteImage: string;
  zoomImage: string;
  noImagesYet: string;
  
  // Notes
  generalNotesPlaceholder: string;
  
  // Preview & PDF
  documentHeaderSummary: string;
  pdfTitleDefault: string;
  pdfPersonnelBadge: string;
  pdfTasksSection: string;
  pdfNotesSection: string;
  pdfGeneralGallerySection: string;
  pdfPageOf: string;
  pdfConfidentialBadge: string;
  pdfZeroRetentionFootnote: string;
  pdfGeneratedOn: string;
  
  // Validation & alerts
  fillRequiredFields: string;
  exportSuccess: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    appName: "DocuPulse",
    appSubtitle: "Studio PDF & Documentation de Chantier",
    zeroPersistenceBadge: "100% Éphémère · Zéro Persistance",
    zeroPersistenceTooltip: "Aucune donnée n'est enregistrée en base de données ou sur serveur. Tout s'exécute dans la mémoire de votre navigateur.",
    downloadPdf: "Télécharger le PDF",
    generatingPdf: "Génération en cours...",
    purgeSession: "Réinitialiser",
    purgeConfirm: "Voulez-vous réinitialiser le document ? Toutes les données et photos seront définitivement effacées de la mémoire.",
    loadSample: "Exemple",
    sampleLoaded: "Exemple de chantier chargé",
    editorTab: "Formulaire",
    previewTab: "Aperçu Mobile",
    viewA4Fullscreen: "Voir feuille A4",
    mobileCardPreview: "Fiche d'intervention mobile",
    zoomIn: "Zoom +",
    zoomOut: "Zoom -",
    zoomReset: "100%",
    fitWidth: "Ajuster",
    close: "Fermer",
    
    sectionProjectInfo: "1. Projet & Chantier",
    sectionPersonnel: "2. Effectif d'Intervention sur Site",
    sectionTasks: "3. Tâches Réalisées & Interventions",
    sectionNotes: "4. Observations & Synthèse Générale",
    sectionGeneralGallery: "5. Galerie d'Avancement Global (Fin de document)",
    
    projectTitle: "Titre du projet / Intervention",
    projectTitlePlaceholder: "ex: Rénovation Réseau CVC & Électrique - Bâtiment C",
    siteLocation: "Lieu du chantier / Site",
    siteLocationPlaceholder: "ex: Site Industriel Ouest - Hangar 4, Lyon",
    date: "Date d'intervention",
    
    personnelLabel: "Nombre de personnes ayant travaillé sur site",
    personnelSublabel: "Champ obligatoire pour la conformité et la sécurité du rapport",
    personnelPlaceholder: "ex: 4",
    personnelRequiredError: "Veuillez renseigner le nombre de personnes sur site (minimum 1)",
    personnelUnit: "personnes sur site",
    
    tasksHeaderTitle: "Détail des tâches effectuées",
    tasksSubtitle: "Chaque tâche est précédée d'un tiret (-) dans le rapport. Vous pouvez ajouter des photos à chaque tâche.",
    addTask: "Ajouter une tâche",
    taskPlaceholder: "Description de la tâche effectuée...",
    taskItemPrefix: "—",
    noTasksYet: "Aucune tâche ajoutée. Appuyez sur le bouton ci-dessous pour démarrer.",
    batchImportBtn: "Coller une liste",
    batchImportTitle: "Import rapide de tâches",
    batchImportDesc: "Collez votre texte avec ou sans tirets. Chaque ligne deviendra une tâche distincte.",
    batchImportPlaceholder: "- Diagnostic et consignation\n- Démontage du groupe défectueux\n- Pose des nouveaux raccords étanches\n- Mise en service et tests de pression",
    batchImportConfirm: "Importer les tâches",
    cancel: "Annuler",
    attachPhotoToTask: "Photo",
    attachedPhotosCount: "photo(s)",
    
    uploadPhotosTitle: "Photos et Preuves Visuelles",
    uploadPhotosHint: "Prenez une photo en direct avec votre appareil ou sélectionnez dans votre galerie.",
    takePhotoCamera: "Appareil photo",
    pickFromGallery: "Galerie photos",
    captionPlaceholder: "Légende ou annotation...",
    assignedTo: "Emplacement dans le rapport :",
    assignGeneral: "Galerie générale (fin de document)",
    assignTaskPrefix: "Tâche :",
    deleteImage: "Supprimer",
    zoomImage: "Agrandir",
    noImagesYet: "Aucune photo pour le moment.",
    
    generalNotesPlaceholder: "Remarques complémentaires, consignes particulières, conformité technique, état d'avancement...",
    
    documentHeaderSummary: "RAPPORT D'INTERVENTION & DOCUMENTATION DE CHANTIER",
    pdfTitleDefault: "Rapport Technique de Chantier",
    pdfPersonnelBadge: "EFFECTIF SUR SITE",
    pdfTasksSection: "TÂCHES EFFECTUÉES SUR SITE",
    pdfNotesSection: "OBSERVATIONS & SYNTHÈSE",
    pdfGeneralGallerySection: "GALERIE D'AVANCEMENT GÉNÉRAL",
    pdfPageOf: "Page",
    pdfConfidentialBadge: "DOCUMENT ÉPHÉMÈRE · AUCUNE PERSISTANCE EN BASE DE DONNÉES",
    pdfZeroRetentionFootnote: "Rapport généré localement côté client par DocuPulse. Données non stockées conformément au protocole de confidentialité totale.",
    pdfGeneratedOn: "Émis le",
    
    fillRequiredFields: "Veuillez renseigner le titre du projet et le nombre obligatoire d'intervenants sur site.",
    exportSuccess: "Rapport PDF généré et téléchargé avec succès."
  },
  en: {
    appName: "DocuPulse",
    appSubtitle: "Site Report & Documentation Studio",
    zeroPersistenceBadge: "100% Ephemeral · Zero Persistence",
    zeroPersistenceTooltip: "No data is saved to any database or server. Everything executes strictly in your browser memory.",
    downloadPdf: "Download PDF",
    generatingPdf: "Generating PDF...",
    purgeSession: "Reset",
    purgeConfirm: "Do you want to reset the document? All text and photos will be permanently deleted from browser memory.",
    loadSample: "Sample",
    sampleLoaded: "Sample project report loaded",
    editorTab: "Form",
    previewTab: "Mobile Preview",
    viewA4Fullscreen: "View A4 Sheet",
    mobileCardPreview: "Mobile Intervention Card",
    zoomIn: "Zoom +",
    zoomOut: "Zoom -",
    zoomReset: "100%",
    fitWidth: "Fit Width",
    close: "Close",
    
    sectionProjectInfo: "1. Project & Site",
    sectionPersonnel: "2. On-Site Workforce Count",
    sectionTasks: "3. Completed Tasks & Actions",
    sectionNotes: "4. General Observations & Notes",
    sectionGeneralGallery: "5. General Progress Gallery (End of Document)",
    
    projectTitle: "Project Title / Intervention",
    projectTitlePlaceholder: "e.g., HVAC & Electrical Retrofit - Building C",
    siteLocation: "Site / Location",
    siteLocationPlaceholder: "e.g., West Industrial Facility - Hangar 4, Lyon",
    date: "Intervention Date",
    
    personnelLabel: "Number of people who worked on site",
    personnelSublabel: "Mandatory field for report compliance and site safety records",
    personnelPlaceholder: "e.g., 4",
    personnelRequiredError: "Please enter the number of on-site personnel (minimum 1)",
    personnelUnit: "people on site",
    
    tasksHeaderTitle: "Itemized Tasks Executed",
    tasksSubtitle: "Each task is formatted with a dash (-) in the report. You can link photos directly to any task.",
    addTask: "Add task",
    taskPlaceholder: "Description of the executed task...",
    taskItemPrefix: "—",
    noTasksYet: "No tasks added yet. Tap the button below to get started.",
    batchImportBtn: "Paste Task List",
    batchImportTitle: "Quick Task Import",
    batchImportDesc: "Paste raw text with or without dashes. Each line converts into a distinct task bullet.",
    batchImportPlaceholder: "- Safety lock-out tag-out inspection\n- Dismantled old condenser unit\n- Installed new high-efficiency manifold\n- Hydrostatic pressure test certified",
    batchImportConfirm: "Import Tasks",
    cancel: "Cancel",
    attachPhotoToTask: "Photo",
    attachedPhotosCount: "photo(s)",
    
    uploadPhotosTitle: "Photos & Visual Evidence",
    uploadPhotosHint: "Take a live photo with your mobile camera or pick from your phone gallery.",
    takePhotoCamera: "Take Photo",
    pickFromGallery: "Photo Gallery",
    captionPlaceholder: "Photo caption or note...",
    assignedTo: "Placement in document:",
    assignGeneral: "General Progress Gallery (End)",
    assignTaskPrefix: "Task:",
    deleteImage: "Delete",
    zoomImage: "Zoom",
    noImagesYet: "No photos uploaded yet.",
    
    generalNotesPlaceholder: "Additional remarks, technical compliance notes, safety warnings...",
    
    documentHeaderSummary: "SITE INTERVENTION & PROJECT DOCUMENTATION REPORT",
    pdfTitleDefault: "Technical Project Report",
    pdfPersonnelBadge: "ON-SITE WORKFORCE",
    pdfTasksSection: "EXECUTED TASKS ON SITE",
    pdfNotesSection: "OBSERVATIONS & TECHNICAL SUMMARY",
    pdfGeneralGallerySection: "GENERAL PROGRESS GALLERY",
    pdfPageOf: "Page",
    pdfConfidentialBadge: "EPHEMERAL DOCUMENT · ZERO DATABASE PERSISTENCE",
    pdfZeroRetentionFootnote: "Generated client-side in browser memory via DocuPulse. No data stored per total privacy protocol.",
    pdfGeneratedOn: "Issued on",
    
    fillRequiredFields: "Please provide the project title and mandatory on-site headcount.",
    exportSuccess: "PDF report generated and downloaded successfully."
  },
  zh: {
    appName: "DocuPulse",
    appSubtitle: "现场施工与项目文档生成器",
    zeroPersistenceBadge: "100% 临时内存 · 零数据库留存",
    zeroPersistenceTooltip: "所有数据均在浏览器本地内存中处理，绝不上传到任何服务器或数据库，保障绝对隐私。",
    downloadPdf: "下载 PDF 报告",
    generatingPdf: "正在生成...",
    purgeSession: "重置清空",
    purgeConfirm: "确定要重置当前文档吗？所有文本和图片将从浏览器内存中彻底销毁。",
    loadSample: "载入示例",
    sampleLoaded: "已加载现场作业示例文档",
    editorTab: "编辑表单",
    previewTab: "手机卡片预览",
    viewA4Fullscreen: "查看A4纸张",
    mobileCardPreview: "手机端简报卡片",
    zoomIn: "放大 +",
    zoomOut: "缩小 -",
    zoomReset: "100%",
    fitWidth: "适应宽度",
    close: "关闭",
    
    sectionProjectInfo: "1. 项目与施工地点",
    sectionPersonnel: "2. 现场作业人员数量",
    sectionTasks: "3. 已执行任务明细清单",
    sectionNotes: "4. 现场综合观察与总结",
    sectionGeneralGallery: "5. 整体施工进展图片库 (文末)",
    
    projectTitle: "项目名称 / 任务标题",
    projectTitlePlaceholder: "例如：C座暖通动力系统节能改造",
    siteLocation: "现场施工地点",
    siteLocationPlaceholder: "例如：高新园区4号总装车间",
    date: "现场作业日期",
    
    personnelLabel: "现场作业人数 (必填)",
    personnelSublabel: "安全合规及工时核验必填项，确保报告合规性",
    personnelPlaceholder: "例如：4",
    personnelRequiredError: "请填写现场作业人数 (至少为1人)",
    personnelUnit: "人（在场作业）",
    
    tasksHeaderTitle: "具体执行任务列表",
    tasksSubtitle: "每一项任务都将在报告中以破折号破题 (-) 排列，支持直接拍照关联专属照片。",
    addTask: "添加一项任务",
    taskPlaceholder: "输入已完成的具体任务说明...",
    taskItemPrefix: "—",
    noTasksYet: "暂无任务项目，请点击下方按钮添加。",
    batchImportBtn: "批量粘贴清单",
    batchImportTitle: "快速导入多项任务",
    batchImportDesc: "可直接粘贴带破折号或换行的文本，每行将自动拆分为独立任务项。",
    batchImportPlaceholder: "- 系统停机闭锁与安全隔离检查\n- 拆卸老旧机组与环保冷媒回收\n- 安装高能效机组与管网连接\n- 压力试验合格并完成联动调试",
    batchImportConfirm: "确认导入任务",
    cancel: "取消",
    attachPhotoToTask: "拍照",
    attachedPhotosCount: "张照片",
    
    uploadPhotosTitle: "现场照片与影像存证",
    uploadPhotosHint: "可直接调用手机相机拍照，或从手机相册中选择上传。",
    takePhotoCamera: "直接拍照",
    pickFromGallery: "从相册选取",
    captionPlaceholder: "输入图片说明或技术批注...",
    assignedTo: "在报告中的排版位置：",
    assignGeneral: "文档末尾整体进展画廊",
    assignTaskPrefix: "关联至任务：",
    deleteImage: "删除",
    zoomImage: "放大查看",
    noImagesYet: "暂未上传现场照片。",
    
    generalNotesPlaceholder: "补充说明、安全交底情况、验收结论或后续工序安排...",
    
    documentHeaderSummary: "现场作业交底与项目工程报告",
    pdfTitleDefault: "工程技术项目总结",
    pdfPersonnelBadge: "现场在岗人数",
    pdfTasksSection: "已执行任务清单与实施过程",
    pdfNotesSection: "现场总结与技术批注",
    pdfGeneralGallerySection: "整体施工进展图片集",
    pdfPageOf: "第",
    pdfConfidentialBadge: "纯内存临时文档 · 绝无数据库存储记录",
    pdfZeroRetentionFootnote: "本报告由 DocuPulse 在用户浏览器本地内存即时渲染，遵循严格零留存隐私规范。",
    pdfGeneratedOn: "出具日期",
    
    fillRequiredFields: "请填写项目名称以及必填的现场作业人数。",
    exportSuccess: "PDF 报告已在本地生成并开始下载。"
  }
};
