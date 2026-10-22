export type Language = 'fr' | 'en' | 'zh';

export interface ProjectImage {
  id: string;
  dataUrl: string;
  name: string;
  caption: string;
  target: 'general' | string; // 'general' or task id
  timestamp: string;
  sizeKb: number;
}

export interface TaskItem {
  id: string;
  text: string;
}

export interface ProjectReport {
  id: string;
  title: string;
  siteLocation: string;
  date: string;
  personnelCount: number | ''; // Mandatory field (>= 1)
  tasks: TaskItem[];
  generalNotes: string;
  images: ProjectImage[];
  confidentialityNotice: boolean;
}
