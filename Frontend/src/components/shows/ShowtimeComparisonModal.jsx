import React, { useState, useMemo } from 'react';
import Modal from '../common/Modal';
import { Sparkles, MapPin, Navigation, Tag, Clock, Check, ArrowRight, Zap, Filter } from 'lucide-react';

const ShowtimeComparisonModal = ({ isOpen, onClose, theatres = [], movieTitle, onSelectShow }) => {
  const [selectedFormat, setSelectedFormat] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(1000);

  // Extract unique formats across all shows
  const availableFormats = useMemo(() => {
    const set = new Set();
    theatres.forEach(t => {
      (t.shows || []).forEach(s => {
        if (s.format) set.add(s.format);
      });
    });
    return ['ALL', ...Array.from(set)];
  }, [theatres]);

  // Find lowest price and nearest theatre
  const { lowestPrice, nearestTheatre, totalShowsCount } = useMemo(() => {
    let minPrice = Infinity;
    let nearest = null;
    let minDistance = Infinity;
    let showCount = 0;

    theatres.forEach(t => {
      if (t.distance !== undefined && t.distance < minDistance) {
        minDistance = t.distance;
        nearest = t;
      }
      (t.shows || []).forEach(s => {
        showCount++;
        const p = Number(s.price) || 250;
        if (p < minPrice) minPrice = p;
      });
    });

    return {
      lowestPrice: minPrice === Infinity ? 200 : minPrice,
      nearestTheatre: nearest,
      totalShowsCount: showCount
    };
  }, [theatres]);

  // Filtered theatres and shows
  const comparisonList = useMemo(() => {
    return theatres.map(theatre => {
      const filteredShows = (theatre.shows || []).filter(s => {
        const matchesFormat = selectedFormat === 'ALL' || s.format?.toUpperCase() === selectedFormat.toUpperCase();
        const matchesPrice = (Number(s.price) || 250) <= maxPrice;
        return matchesFormat && matchesPrice;
      });

      const prices = filteredShows.map(s => Number(s.price) || 250);
      const minP = prices.length ? Math.min(...prices) : null;
      const maxP = prices.length ? Math.max(...prices) : null;

      return {
        ...theatre,
        matchingShows: filteredShows,
        minPrice: minP,
        maxPrice: maxP
      };
    }).filter(t => t.matchingShows.length > 0);
  }, [theatres, selectedFormat, maxPrice]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-brand-700 text-xs font-black tracking-wider uppercase mb-1">
                <Zap className="w-3.5 h-3.5 text-brand-600" />
                <span>Smart Showtime & Price Matrix</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Compare Cinemas for {movieTitle || 'Selected Movie'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Compare formats, timings, and ticket pricing side-by-side across all city venues
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Lowest Price</span>
              <span className="text-base sm:text-lg font-black text-emerald-600">₹{lowestPrice}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Nearest Cinema</span>
              <span className="text-xs sm:text-sm font-black text-slate-800 truncate block">
                {nearestTheatre?.name?.split(':')[0] || 'Nearby'} ({nearestTheatre?.distance || 1.5} km)
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Matching Shows</span>
              <span className="text-base sm:text-lg font-black text-rose-600">
                {comparisonList.reduce((acc, t) => acc + t.matchingShows.length, 0)} shows
              </span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Format:
              </span>
              {availableFormats.map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                    selectedFormat === fmt
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span>Max Price: ₹{maxPrice}</span>
              <input
                type="range"
                min="150"
                max="800"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-brand-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Comparison Matrix List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {comparisonList.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-medium">
              No shows match your current format and price filter. Try adjusting the filters above.
            </div>
          ) : (
            comparisonList.map((theatre) => (
              <div
                key={theatre.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-soft transition-all space-y-3"
              >
                {/* Theatre Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                      <span>{theatre.name}</span>
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span>{theatre.location}</span>
                      {theatre.distance !== undefined && (
                        <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.2 rounded-md">
                          {theatre.distance} km away
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Starting From</span>
                    <span className="text-base font-black text-slate-900">
                      ₹{theatre.minPrice}
                      {theatre.maxPrice !== theatre.minPrice && (
                        <span className="text-xs text-slate-400 font-medium"> - ₹{theatre.maxPrice}</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Showtimes Pill Row */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {theatre.matchingShows.map((show) => {
                    const isSoldOut = show.status === 'Sold Out';
                    return (
                      <button
                        key={show.id}
                        disabled={isSoldOut}
                        onClick={() => {
                          onClose();
                          onSelectShow(theatre, show);
                        }}
                        className={`group px-3 py-2 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSoldOut
                            ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                            : 'bg-slate-50 hover:bg-rose-50 border-slate-200 hover:border-brand-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900 group-hover:text-brand-600">
                            {show.time}
                          </span>
                          <span className="text-[10px] font-extrabold text-white bg-slate-800 px-1.5 py-0.2 rounded">
                            {show.format}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-1 text-[11px] font-bold">
                          <span className="text-brand-600">₹{show.price}</span>
                          <span className={`text-[9px] uppercase ${
                            show.status === 'Filling Fast' ? 'text-amber-600' :
                            show.status === 'Almost Full' ? 'text-rose-600' :
                            'text-emerald-600'
                          }`}>
                            {show.status}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </Modal>
  );
};

export default ShowtimeComparisonModal;
