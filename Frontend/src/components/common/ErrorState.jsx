import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorState = ({
  title = 'Something went wrong',
  description = 'Unable to connect to FilmyPass servers right now. Please check your internet or retry.',
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center max-w-md mx-auto bg-amber-50/50 rounded-2xl border border-amber-200 shadow-soft my-8">
      <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3 text-amber-600">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-600 text-sm mb-5 leading-relaxed">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-soft"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
