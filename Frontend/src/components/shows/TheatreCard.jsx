import React from 'react';
import { MapPin, Info, Sparkles, Navigation } from 'lucide-react';
import ShowtimeButton from './ShowtimeButton';

const TheatreCard = ({ theatre, onSelectShow }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5 sm:p-6 space-y-4 hover:shadow-soft-lg transition-shadow">
      
      {/* Theatre Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
            <span>{theatre.name}</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>{theatre.location}</span>
            </div>

            {theatre.distance !== undefined && theatre.distance !== null && (
              <span className={`inline-flex items-center gap-1 font-extrabold px-2.5 py-0.5 rounded-full text-[11px] border shadow-2xs ${
                theatre.distance <= 3
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-rose-50 text-brand-700 border-rose-200'
              }`}>
                <Navigation className={`w-3 h-3 ${theatre.distance <= 3 ? 'text-emerald-600' : 'text-brand-600'}`} />
                {theatre.distance <= 3 ? `📍 Nearest (${theatre.distance} km away)` : `${theatre.distance} km away`}
              </span>
            )}
          </div>
        </div>

        {/* Amenities badges */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {theatre.amenities?.map((amenity, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Cancellation policy alert */}
      {theatre.cancellationPolicy && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{theatre.cancellationPolicy}</span>
        </div>
      )}

      {/* Showtimes Grid */}
      <div className="pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Available Showtimes
        </div>
        <div className="flex flex-wrap gap-3">
          {theatre.shows?.map((show) => (
            <ShowtimeButton
              key={show.id}
              show={show}
              onSelect={(selectedShow) => onSelectShow(theatre, selectedShow)}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default TheatreCard;
