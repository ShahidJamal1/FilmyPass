import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Ticket, Play, Star, Clock, Globe, Shield } from 'lucide-react';
import Modal from '../common/Modal';

const MovieBanner = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const navigate = useNavigate();

  const currentMovie = movies[currentIndex] || movies[0];

  if (!currentMovie) return null;

  return (
    <>
      <div className="relative w-full min-h-[460px] md:min-h-[520px] rounded-3xl overflow-hidden bg-slate-950 shadow-soft-lg my-6 flex items-center">
        
        {/* Background Backdrop with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentMovie.bannerUrl || currentMovie.posterUrl}
            alt={currentMovie.title}
            className="w-full h-full object-cover object-center opacity-40 blur-xs scale-105 transition-all duration-700"
          />
          {/* Dual Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        </div>

        {/* Content Section */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Text Information (Left / Mobile Center) */}
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 text-white space-y-4"
          >
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="bg-rose-600 text-white px-3 py-1 rounded-full uppercase tracking-wider text-[11px] font-extrabold shadow-sm">
                Spotlight Feature
              </span>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{currentMovie.rating}/10</span>
                <span className="text-slate-300 font-normal">({currentMovie.votes})</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-slate-300">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentMovie.duration}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {currentMovie.title}
            </h1>

            {/* Tags: Languages & Genres */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
              <span className="flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-md text-white font-medium text-xs">
                <Globe className="w-3 h-3" />
                {currentMovie.languages?.join(', ')}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-medium text-slate-200">
                {currentMovie.genre?.join(' • ')}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl line-clamp-3 font-normal">
              {currentMovie.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(`/movies/${currentMovie.id}/shows`)}
                className="px-6 py-3.5 bg-gradient-to-r from-brand-600 to-rose-500 hover:from-brand-700 hover:to-rose-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-glow flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Tickets</span>
              </button>

              <button
                onClick={() => setIsTrailerOpen(true)}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-2xl backdrop-blur-md border border-white/15 flex items-center gap-2 transition-all hover:border-white/30"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </motion.div>

          {/* Poster Card (Right) */}
          <motion.div
            key={`poster-${currentMovie.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block md:col-span-4 justify-self-end"
          >
            <div className="relative group cursor-pointer" onClick={() => navigate(`/movies/${currentMovie.id}`)}>
              <img
                src={currentMovie.posterUrl}
                alt={currentMovie.title}
                className="w-56 lg:w-64 aspect-[2/3] object-cover rounded-2xl shadow-2xl border-2 border-white/20 transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1">
                  View Full Details →
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Hero Carousel Navigation Dots */}
        {movies.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {movies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-brand-500' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trailer Video Modal */}
      <Modal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        maxWidth="max-w-4xl"
      >
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
          {currentMovie.trailerUrl ? (
            <iframe
              src={`${currentMovie.trailerUrl}?autoplay=1`}
              title={`${currentMovie.title} Trailer`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
              <Play className="w-12 h-12 text-slate-600" />
              <p>Trailer coming soon for this movie.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default MovieBanner;
