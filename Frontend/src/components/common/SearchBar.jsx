import React, { useState, useRef, useEffect } from "react";
import { Search, Film, MapPin, Calendar, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_MOVIES, MOCK_THEATRES, MOCK_EVENTS } from "../../api/mockData";
import { getLocalPoster, createFallbackPoster } from "../../api/tmdbApi";

const SearchBar = ({ isCompact = false }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMovies = query.trim()
    ? MOCK_MOVIES.filter((m) => {
        const searchTerm = query.toLowerCase();

        const title = typeof m.title === "string" ? m.title.toLowerCase() : "";

        const genres = Array.isArray(m.genre)
          ? m.genre
          : typeof m.genre === "string"
            ? [m.genre]
            : [];

        return (
          title.includes(searchTerm) ||
          genres.some(
            (g) =>
              typeof g === "string" && g.toLowerCase().includes(searchTerm),
          )
        );
      })
    : [];

  const filteredTheatres = query.trim()
    ? MOCK_THEATRES.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.location.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const filteredEvents = query.trim()
    ? MOCK_EVENTS.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const hasResults =
    filteredMovies.length > 0 ||
    filteredTheatres.length > 0 ||
    filteredEvents.length > 0;

  const handleSelectMovie = (id) => {
    setIsOpen(false);
    setQuery("");
    navigate(`/movies/${id}`);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div
        className={`relative flex items-center bg-slate-100/80 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 rounded-full border border-slate-200 transition-all ${isCompact ? "py-1.5 px-3" : "py-2 px-4"}`}
      >
        <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search movies, cinemas or events"
          className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Popover Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {!hasResults ? (
            <div className="p-4 text-center text-sm text-slate-500">
              No matching movies, cinemas or events found for "{query}".
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredMovies.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5" /> Movies
                  </div>
                  {filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleSelectMovie(movie.id)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={getLocalPoster(movie.title) || movie.posterUrl}
                        alt={movie.title}
                        onError={(e) => {
                          const local = getLocalPoster(movie.title);
                          if (local && !e.target.src.includes(local)) {
                            e.target.src = local;
                          } else {
                            e.target.src = createFallbackPoster(movie.title);
                          }
                        }}
                        className="w-9 h-12 object-cover rounded-md shadow-sm"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {movie.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {Array.isArray(movie.genre)
                            ? movie.genre.join(", ")
                            : typeof movie.genre === "string"
                              ? movie.genre
                              : "Genre unavailable"}
                          {" • "}
                          {Array.isArray(movie.languages)
                            ? movie.languages.join("/")
                            : typeof movie.languages === "string"
                              ? movie.languages
                              : "Hindi"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredTheatres.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Cinemas
                  </div>
                  {filteredTheatres.map((theatre) => (
                    <div
                      key={theatre.id}
                      onClick={() => {
                        setIsOpen(false);
                        navigate(`/movies/1/shows`);
                      }}
                      className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="text-sm font-semibold text-slate-900">
                        {theatre.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {theatre.location}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredEvents.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Events
                  </div>
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => {
                        setIsOpen(false);
                        navigate(`/movies`);
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {event.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {event.category} • {event.venue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
