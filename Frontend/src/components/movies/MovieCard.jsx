import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Ticket, Play } from "lucide-react";
import RatingBadge from "../common/RatingBadge";
import { getLocalPoster, createFallbackPoster } from "../../api/tmdbApi";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const posterSrc =
    getLocalPoster(movie.title) ||
    (movie.posterUrl && !movie.posterUrl.includes("image.tmdb.org")
      ? movie.posterUrl
      : null) ||
    getLocalPoster(movie.title) ||
    movie.posterUrl;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col h-full cursor-pointer"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
        <img
          src={posterSrc}
          alt={movie.title}
          onError={(e) => {
            const local = getLocalPoster(movie.title);
            if (local && !e.target.src.includes(local)) {
              e.target.src = local;
            } else {
              e.target.src = createFallbackPoster(movie.title);
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <RatingBadge rating={movie.rating} votes={movie.votes} />
          {movie.isTrending && (
            <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
              Trending
            </span>
          )}
          {movie.isComingSoon && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
              Coming Soon
            </span>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movies/${movie.id}/shows`);
            }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-600 to-rose-500 text-white font-bold text-sm rounded-xl shadow-glow flex items-center justify-center gap-2 hover:from-brand-700 hover:to-rose-600 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
          >
            <Ticket className="w-4 h-4" />
            <span>Book Tickets</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movies/${movie.id}`);
            }}
            className="w-full py-2 px-4 bg-white/20 backdrop-blur-md text-white font-semibold text-xs rounded-xl hover:bg-white/30 transition-all flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Movie Details Content */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-brand-600 transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
            {Array.isArray(movie.genre)
              ? movie.genre.join(", ")
              : typeof movie.genre === "string"
                ? movie.genre
                : "Genre unavailable"}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
          <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
            {Array.isArray(movie.languages)
              ? movie.languages[0]
              : typeof movie.languages === "string"
                ? movie.languages.split("/")[0]?.trim()
                : "Hindi"}
          </span>
          <span className="text-slate-400">{movie.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
