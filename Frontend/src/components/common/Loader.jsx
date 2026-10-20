import React from 'react';
import { Film } from 'lucide-react';

const Loader = ({ label = 'Loading cinematic experience...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-14 h-14 border-4 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
        <Film className="w-6 h-6 text-brand-600 absolute" />
      </div>
      <p className="text-slate-500 font-medium text-sm animate-pulse">{label}</p>
    </div>
  );
};

export default Loader;
