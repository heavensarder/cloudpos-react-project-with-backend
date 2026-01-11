import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
