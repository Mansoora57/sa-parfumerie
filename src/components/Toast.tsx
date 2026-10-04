import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-[#171410] border border-[#c5a059] text-[#f4efe6] px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 text-xs max-w-md">
        <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
        <span className="font-medium tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );
};
