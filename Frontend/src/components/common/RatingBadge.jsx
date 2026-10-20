import React from 'react';
import { Star } from 'lucide-react';

const RatingBadge = ({ rating, votes, size = 'sm' }) => {
  const isLg = size === 'lg';
  return (
    <div className={`inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-700 font-semibold rounded-full border border-amber-500/20 ${isLg ? 'px-3.5 py-1.5 text-base' : 'px-2.5 py-0.5 text-xs'}`}>
      <Star className={`${isLg ? 'w-5 h-5' : 'w-3.5 h-3.5'} fill-amber-500 text-amber-500`} />
      <span>{rating}</span>
      {votes && <span className="text-slate-400 font-normal">({votes})</span>}
    </div>
  );
};

export default RatingBadge;
