import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import { theatreApi } from "../api/theatreApi";
import { useCity } from "../context/CityContext";
import { useBooking } from "../context/BookingContext";
import RatingBadge from "../components/common/RatingBadge";
import DateSelector from "../components/shows/DateSelector";
import TheatreCard from "../components/shows/TheatreCard";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";
import {
  Ticket,
  Play,
  Share2,
  Locate,
  SlidersHorizontal,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { selectedCity, userCoords } = useCity();
  const {
    setSelectedMovie,
    setSelectedDate,
    setSelectedTheatre,
    setSelectedShow,
  } = useBooking();

  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [selectedDate, setDate] = useState("Today");
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Sort / Filter state
  const [sortNearest, setSortNearest] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movieData = await movieApi.getMovieById(movieId);
        const theatreData = await theatreApi.getTheatresByCity(
          selectedCity.name || selectedCity.id,
          userCoords,
        );
        setMovie(movieData);
        setTheatres(theatreData);
        setSelectedMovie(movieData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId, selectedCity, userCoords]);

  const handleSelectShowtime = (theatre, show) => {
    setSelectedMovie(movie);
    setSelectedDate(selectedDate);
    setSelectedTheatre(theatre);
    setSelectedShow(show);
    navigate(`/shows/${show.id}/seats`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Movie link copied to clipboard!");
  };

  // Distance sorted theatres
  const displayedTheatres = [...theatres].sort((a, b) => {
    if (sortNearest) {
      return (a.distance || 99) - (b.distance || 99);
    }
    return 0;
  });

  if (loading) return <Loader label="Loading movie showcase..." />;
  if (!movie) return <div className="text-center py-12">Movie not found.</div>;

  return (
    <div className="space-y-10 pb-16">
      {/* Top Banner Hero Showcase */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-soft-lg p-6 sm:p-10 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={movie.bannerUrl || movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover blur-sm scale-105"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Movie Poster */}
          <div className="md:col-span-4 justify-self-center md:justify-self-start">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-56 sm:w-64 aspect-[2/3] object-cover rounded-2xl shadow-2xl border-2 border-white/20"
            />
          </div>

          {/* Right: Movie Details */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <RatingBadge
                rating={movie.rating}
                votes={movie.votes}
                size="lg"
              />
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-300 border border-white/10">
                {movie.duration}
              </span>
              <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                {Array.isArray(movie.languages)
                  ? movie.languages.join("/")
                  : typeof movie.languages === "string"
                    ? movie.languages
                    : "Hindi"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {movie.title}
            </h1>

            <div className="text-sm font-semibold text-rose-400">
              {Array.isArray(movie.genre)
                ? movie.genre.join(" • ")
                : typeof movie.genre === "string"
                  ? movie.genre
                  : "Genre unavailable"}
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {movie.description}
            </p>

            <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <span className="font-bold text-white block mb-0.5">
                  Director:
                </span>
                <span>{movie.director}</span>
              </div>
              <div>
                <span className="font-bold text-white block mb-0.5">
                  Starring Cast:
                </span>
                <span>
                  {Array.isArray(movie.cast)
                    ? movie.cast.join(", ")
                    : typeof movie.cast === "string"
                      ? movie.cast
                      : "Cast information unavailable"}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#available-shows"
                className="px-8 py-3.5 bg-gradient-to-r from-brand-600 to-rose-500 hover:from-brand-700 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-glow flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Tickets</span>
              </a>

              <button
                onClick={() => setIsTrailerOpen(true)}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-2xl backdrop-blur-md border border-white/15 flex items-center gap-2 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Trailer</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl backdrop-blur-md border border-white/15 transition-all"
                title="Share Movie"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Star Cast & Crew Showcase */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <span>Star Cast & Crew</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3.5">
          {movie.castDetails
            ? movie.castDetails.map((actor, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-soft flex items-center gap-3 hover:border-brand-300 hover:shadow-soft-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-rose-50 border border-slate-100 shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={actor.photo}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">
                      {actor.name}
                    </h4>
                    <p className="text-[11px] font-medium text-brand-600 truncate mt-0.5">
                      {actor.role}
                    </p>
                  </div>
                </div>
              ))
            : movie.cast?.map((actorName, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-2xl border border-slate-100 shadow-soft flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {actorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {actorName}
                    </h4>
                    <p className="text-[10px] font-medium text-slate-400">
                      Actor
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Available Shows & Theatre Selection Section */}
      <div id="available-shows" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Available Shows
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Select date & cinema showtimes in{" "}
              {selectedCity?.name || "Selected City"}
            </p>
          </div>

          <DateSelector
            selectedDate={selectedDate}
            onSelectDate={(d) => setDate(d)}
          />
        </div>

        {/* Selected Date Indicator Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-3.5 px-5 rounded-2xl flex items-center justify-between shadow-soft border border-rose-500/20">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-black">
            <Calendar className="w-4.5 h-4.5 text-rose-400 shrink-0" />
            <span>
              Booking Showtimes For:{" "}
              <strong className="text-rose-400 font-black text-sm sm:text-base ml-1">
                {selectedDate}
              </strong>
            </span>
          </div>
          <span className="bg-rose-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            Selected Date
          </span>
        </div>

        {/* Live Geolocation Alert Banner */}
        {userCoords?.isDetected && (
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-rose-500/10 border border-emerald-500/30 text-slate-800 p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-bold shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                <Locate className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <span className="text-emerald-700 font-extrabold uppercase tracking-wider block text-[10px]">
                  Exact GPS Location Detected
                </span>
                <span>
                  Showing nearest cinema halls sorted by real distance from your
                  position in{" "}
                  <strong>{selectedCity?.name || "Selected City"}</strong>
                </span>
              </div>
            </div>
            <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold shrink-0">
              Live Active
            </span>
          </div>
        )}

        {/* Distance Filter & Sorting Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            <span>
              Cinemas in {selectedCity?.name || "Selected City"} (
              {displayedTheatres.length})
            </span>
          </div>

          <button
            onClick={() => {
              setSortNearest(!sortNearest);
              if (!sortNearest)
                toast.success("Sorted by nearest cinema location!");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border ${
              sortNearest
                ? "bg-rose-50 text-brand-700 border-brand-500 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Locate
              className={`w-3.5 h-3.5 ${sortNearest ? "text-brand-600" : "text-slate-400"}`}
            />
            <span>
              {sortNearest
                ? "📍 Nearest First (Active)"
                : "Sort by Distance (Near Me)"}
            </span>
          </button>
        </div>

        {/* Theatres Listing */}
        <div className="space-y-6">
          {displayedTheatres.map((theatre) => (
            <TheatreCard
              key={theatre.id}
              theatre={theatre}
              onSelectShow={handleSelectShowtime}
            />
          ))}
        </div>
      </div>

      {/* Trailer Video Modal */}
      <Modal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        maxWidth="max-w-4xl"
      >
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
          {movie.trailerUrl ? (
            <iframe
              src={`${movie.trailerUrl}?autoplay=1`}
              title={`${movie.title} Trailer`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
              <Play className="w-12 h-12 text-slate-600" />
              <p>Trailer not available</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MovieDetailsPage;
