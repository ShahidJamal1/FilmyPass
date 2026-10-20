import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import { theatreApi } from "../api/theatreApi";
import { useCity } from "../context/CityContext";
import { useBooking } from "../context/BookingContext";
import DateSelector from "../components/shows/DateSelector";
import TheatreCard from "../components/shows/TheatreCard";
import Loader from "../components/common/Loader";
import { MapPin, Locate, SlidersHorizontal, Calendar } from "lucide-react";
import toast from "react-hot-toast";

const ShowsPage = () => {
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
  const [error, setError] = useState("");
  const [selectedDate, setDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });
  const [loading, setLoading] = useState(true);
  const [sortNearest, setSortNearest] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const m = await movieApi.getMovieById(movieId || 1);

        const city = selectedCity.name || selectedCity.id;

        const shows = await theatreApi.getShowsByCity(
          city,
          selectedDate,
          movieId ? Number(movieId) : m.id,
        );
        console.log("Selected city:", city);
        console.log("Backend shows response:", shows);
        console.log("Backend shows:", shows);

        // Group backend shows by theatre
        const theatreMap = new Map();

        shows.forEach((show) => {
          const theatre = show.theatre;

          if (!theatre) return;

          if (!theatreMap.has(theatre.id)) {
            theatreMap.set(theatre.id, {
              id: theatre.id,
              name: theatre.name,
              location: theatre.address || theatre.city || "",
              city: theatre.city,
              distance: null,
              amenities: [],
              shows: [],
            });
          }

          const startAt = new Date(show.startAt);

          const time = startAt.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          theatreMap.get(theatre.id).shows.push({
            ...show,
            time,
            price: show.ticketPrice,
            status: show.availableSeats > 0 ? "available" : "sold_out",
          });
        });

        setMovie(m);
        setTheatres(Array.from(theatreMap.values()));
        setSelectedMovie(m);
      } catch (err) {
        console.error("Failed to fetch movie shows:", err);
        setTheatres([]);
        setError(
          "Unable to load shows. Please check your connection and try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (selectedCity) {
      fetchData();
    }
  }, [movieId, selectedCity, selectedDate, userCoords]);

  const handleSelectShowtime = (theatre, show) => {
    setSelectedMovie(movie);
    setSelectedDate(selectedDate);
    setSelectedTheatre(theatre);
    setSelectedShow(show);
    navigate(`/shows/${show.id}/seats`);
  };

  const displayedTheatres = [...theatres].sort((a, b) => {
    if (sortNearest) {
      return (a.distance || 99) - (b.distance || 99);
    }
    return 0;
  });

  if (loading) return <Loader label="Fetching available cinema halls..." />;

  return (
    <div className="space-y-8 py-6 pb-16">
      {/* Top Header Card */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Showtime Schedules
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {movie?.title || "Selected Movie"}
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-semibold">
            <span>
              {Array.isArray(movie?.languages)
                ? movie.languages.join("/")
                : typeof movie?.languages === "string"
                  ? movie.languages
                  : "Hindi"}
            </span>
            <span>•</span>
            <span>
              {Array.isArray(movie?.genre)
                ? movie.genre.join(", ")
                : typeof movie?.genre === "string"
                  ? movie.genre
                  : "Genre unavailable"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              {selectedCity?.name || "Selected City"}
            </span>
          </div>
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

      {/* Distance Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <span>Cinemas in {selectedCity?.name || "Selected City"}</span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {displayedTheatres.length} halls
          </span>
        </h2>

        <button
          onClick={() => {
            setSortNearest(!sortNearest);
            if (!sortNearest) toast.success("Showing nearest cinemas first!");
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
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
            <p className="font-bold text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : displayedTheatres.length > 0 ? (
          displayedTheatres.map((theatre) => (
            <TheatreCard
              key={theatre.id}
              theatre={theatre}
              onSelectShow={handleSelectShowtime}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h3 className="text-lg font-bold text-slate-800">
              No Shows Available
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              No shows were found for this movie, city, and date. Please select
              another date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowsPage;
