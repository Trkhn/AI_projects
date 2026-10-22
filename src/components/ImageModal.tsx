import React from 'react';
import { X, ZoomIn, Calendar } from 'lucide-react';
import { ProjectImage } from '../types/document';

interface ImageModalProps {
  image: ProjectImage | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[90vh] bg-[#111827] border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0B0F17]">
          <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
            <ZoomIn className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-medium truncate">{image.name}</span>
            <span className="text-slate-500">·</span>
            <span className="font-mono text-slate-400">{image.sizeKb} KB</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="flex-1 overflow-auto bg-black flex items-center justify-center p-2 min-h-[300px]">
          <img
            src={image.dataUrl}
            alt={image.caption || image.name}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded"
          />
        </div>

        {/* Footer info & caption */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#0F172A] flex flex-col gap-1">
          {image.caption ? (
            <p className="text-sm text-slate-200 font-medium">{image.caption}</p>
          ) : (
            <p className="text-xs text-slate-500 italic">Aucune légende définie</p>
          )}
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{image.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
