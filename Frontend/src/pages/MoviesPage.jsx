import React, { useState, useEffect } from 'react';
import { movieApi } from '../api/movieApi';
import { useCity } from '../context/CityContext';
import MovieGrid from '../components/movies/MovieGrid';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { Filter, SlidersHorizontal, Search, Film } from 'lucide-react';

const MoviesPage = () => {
  const { selectedCity } = useCity();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [searchQuery, setSearchQuery] = useState('');

  const genres = ['All', 'Sci-Fi', 'Action', 'Comedy', 'Horror', 'Adventure', 'Drama'];
  const languages = ['All', 'Hindi', 'English', 'Telugu', 'Tamil'];
  const formats = ['All', '2D', '3D', 'IMAX 3D', '4DX'];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await movieApi.getMovies({
          city: selectedCity.id,
          genre: selectedGenre,
          language: selectedLanguage,
          search: searchQuery
        });
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedCity, selectedGenre, selectedLanguage, searchQuery]);

  // Apply Format & Sorting
  let filteredMovies = [...movies];

  if (selectedFormat !== 'All') {
    filteredMovies = filteredMovies.filter(m => m.formats && m.formats.includes(selectedFormat));
  }

  if (sortBy === 'Rating') {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'Newest') {
    filteredMovies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  }

  return (
    <div className="space-y-8 py-6 pb-16">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Explore Movies</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Discover and book tickets for top movies showing in {selectedCity.name}
          </p>
        </div>

        {/* Search bar inside page */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie title..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 shadow-xs"
          />
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-soft space-y-4">
        
        {/* Languages Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Language:
          </span>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedLanguage === lang
                  ? 'bg-brand-600 text-white shadow-glow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Genres Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Film className="w-3.5 h-3.5" /> Genre:
          </span>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedGenre === g
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Format & Sort Selection */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-slate-400 mr-1">Format:</span>
            {formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedFormat === fmt
                    ? 'bg-rose-100 text-brand-700 border border-rose-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="Popular">Popularity</option>
              <option value="Rating">Rating: High to Low</option>
              <option value="Newest">Release Date</option>
            </select>
          </div>
        </div>

      </div>

      {/* Movie Grid Section */}
      {loading ? (
        <Loader label="Loading movies..." />
      ) : filteredMovies.length === 0 ? (
        <EmptyState
          title="No movies found"
          description="Try relaxing your language or genre filter choices to see more available movies."
          actionText="Reset Filters"
          onAction={() => {
            setSelectedGenre('All');
            setSelectedLanguage('All');
            setSelectedFormat('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <MovieGrid movies={filteredMovies} />
      )}

    </div>
  );
};

export default MoviesPage;
