import React from 'react';
import { Film, Search, Calendar, Ticket } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Film,
  title = 'No movies found',
  description = 'We couldn\'t find anything matching your filters. Try tweaking your search or city selection.',
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center max-w-md mx-auto bg-white rounded-2xl border border-slate-100 shadow-soft my-8">
      <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 text-brand-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
