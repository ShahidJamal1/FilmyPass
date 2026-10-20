import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Users, Clock, Film, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
import { createFallbackPoster, getLocalPoster } from '../../api/tmdbApi';

const MOODS = [
  { id: 'action', label: 'Action & Thrills', emoji: '💥', genres: ['Action', 'Thriller', 'Adventure'] },
  { id: 'comedy', label: 'Comedy & Chill', emoji: '😂', genres: ['Comedy', 'Romance'] },
  { id: 'scifi', label: 'Sci-Fi & Epic', emoji: '🚀', genres: ['Sci-Fi', 'Fantasy', 'Mythology'] },
  { id: 'horror', label: 'Spooky & Mystery', emoji: '👻', genres: ['Horror', 'Mystery'] },
  { id: 'family', label: 'Family & Heartwarming', emoji: '🍿', genres: ['Animation', 'Drama', 'Family'] }
];

const COMPANIONS = [
  { id: 'solo', label: 'Solo Movie Lover', icon: '👤', tip: 'Best seat: Center Aisle' },
  { id: 'couple', label: 'Date Night', icon: '💑', tip: 'Best seat: Recliner Corner' },
  { id: 'friends', label: 'With Friends Gang', icon: '👯', tip: 'Book 3+ seats together' },
  { id: 'family', label: 'Family Outing', icon: '👨‍👩‍👧', tip: 'Prime Executive row' }
];

const TIME_SLOTS = [
  { id: 'matinee', label: 'Matinee (12 PM - 4 PM)', period: 'Afternoon' },
  { id: 'prime', label: 'Prime Time (4 PM - 8 PM)', period: 'Evening' },
  { id: 'night', label: 'Late Night (8 PM onwards)', period: 'Night' }
];

const MovieNightPlanner = ({ movies = [] }) => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('action');
  const [selectedCompanion, setSelectedCompanion] = useState('friends');
  const [selectedTime, setSelectedTime] = useState('prime');

  // Compute matched movies
  const matchedMovies = useMemo(() => {
    if (!movies || movies.length === 0) return [];

    const activeMood = MOODS.find(m => m.id === selectedMood);
    const targetGenres = activeMood ? activeMood.genres : [];

    // Score movies based on genre match and rating
    const scored = movies.map(m => {
      let score = 0;
      const movieGenres = (m.genre || []).map(g => g.toLowerCase());
      
      targetGenres.forEach(g => {
        if (movieGenres.some(mg => mg.includes(g.toLowerCase()))) {
          score += 3;
        }
      });

      // Factor in rating
      score += (Number(m.rating) || 5) * 0.5;

      return { ...m, matchScore: score };
    });

    // Sort descending by matchScore
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  }, [movies, selectedMood]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-6 sm:p-8 text-white border border-rose-500/20 shadow-glow">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Movie Night Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Can't Decide What to Watch?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
            Pick your mood, companions, and timing — we'll tailor the ultimate cinema plan in seconds.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-rose-200 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl shrink-0">
          <Compass className="w-4 h-4 text-rose-400" />
          <span>Curated for tonight's lineup</span>
        </div>
      </div>

      {/* Planner Controls Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-white/10">
        
        {/* Step 1: Mood */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <span>1. What's the Vibe?</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map(mood => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedMood === mood.id
                    ? 'bg-rose-600 text-white shadow-md scale-102 border border-rose-400'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/5'
                }`}
              >
                <span>{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Companions */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <span>2. Who's Coming Along?</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {COMPANIONS.map(comp => (
              <button
                key={comp.id}
                onClick={() => setSelectedCompanion(comp.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCompanion === comp.id
                    ? 'bg-rose-600 text-white shadow-md scale-102 border border-rose-400'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/5'
                }`}
              >
                <span>{comp.icon}</span>
                <span>{comp.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Time Slot */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <span>3. Preferred Showtime?</span>
          </label>
          <div className="flex flex-col gap-2">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot.id}
                onClick={() => setSelectedTime(slot.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTime === slot.id
                    ? 'bg-rose-600 text-white shadow-md border border-rose-400'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{slot.label}</span>
                </div>
                <span className="text-[10px] opacity-80">{slot.period}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Recommended Matches */}
      <div className="relative z-10 pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span>Top Matches for Your Night</span>
            <span className="text-xs font-bold bg-rose-500/30 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/40">
              {matchedMovies.length} movies ready
            </span>
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Smart seating tip: {COMPANIONS.find(c => c.id === selectedCompanion)?.tip}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {matchedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white/10 hover:bg-white/15 border border-white/15 hover:border-rose-400/50 rounded-2xl p-3.5 flex gap-3 transition-all backdrop-blur-md group"
            >
              <img
                src={getLocalPoster(movie.title) || movie.posterUrl || createFallbackPoster(movie.title, movie.genre?.[0])}
                alt={movie.title}
                onError={(e) => {
                  const local = getLocalPoster(movie.title);
                  if (local && !e.currentTarget.src.includes(local)) {
                    e.currentTarget.src = local;
                  } else if (movie.posterUrl && movie.posterUrl.includes('image.tmdb.org') && !e.currentTarget.src.includes('wsrv.nl')) {
                    e.currentTarget.src = `https://wsrv.nl/?url=${encodeURIComponent(movie.posterUrl)}`;
                  } else {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = createFallbackPoster(movie.title, movie.genre?.[0]);
                  }
                }}
                className="w-20 h-28 object-cover rounded-xl shadow-md shrink-0 group-hover:scale-102 transition-transform"
              />
              <div className="flex flex-col justify-between min-w-0 flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-amber-400">
                    <span>★ {movie.rating}/10</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300 truncate">{movie.duration}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white truncate mt-1">
                    {movie.title}
                  </h4>
                  <p className="text-[11px] text-rose-300 font-medium truncate mt-0.5">
                    {movie.genre?.join(', ')}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/movies/${movie.id}/shows`)}
                    className="flex-1 bg-gradient-to-r from-brand-600 to-rose-500 hover:from-brand-700 hover:to-rose-600 text-white text-xs font-extrabold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Book Shows</span>
                  </button>
                  <button
                    onClick={() => navigate(`/movies/${movie.id}`)}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-all"
                    title="View details"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MovieNightPlanner;
