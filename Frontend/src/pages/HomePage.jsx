import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { movieApi } from '../api/movieApi';
import { useCity } from '../context/CityContext';
import { MOCK_EVENTS, MOCK_OFFERS } from '../api/mockData';
import MovieBanner from '../components/movies/MovieBanner';
import MovieCarousel from '../components/movies/MovieCarousel';
import MovieGrid from '../components/movies/MovieGrid';
import EventCard from '../components/events/EventCard';
import OfferCard from '../components/offers/OfferCard';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { Sparkles, Calendar, TrendingUp, Flame } from 'lucide-react';

const HomePage = () => {
  const { selectedCity } = useCity();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieApi.getMovies({ city: selectedCity.id });
      setMovies(data);
    } catch (err) {
      setError('Failed to fetch movies list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedCity]);

  if (loading) return <Loader label="Loading cinematic experiences..." />;
  if (error) return <ErrorState title="Error Loading Movies" description={error} onRetry={fetchMovies} />;

  const recommendedMovies = movies.filter(m => m.isRecommended);
  const nowShowingMovies = movies.filter(m => m.isNowShowing);
  const comingSoonMovies = movies.filter(m => m.isComingSoon);
  const trendingMovies = movies.filter(m => m.isTrending);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Spotlight Section */}
      {movies.length > 0 && <MovieBanner movies={movies.slice(0, 3)} />}

      {/* Recommended Movies Section */}
      <section>
        <MovieCarousel
          title="Recommended Movies"
          subtitle={`Popular picks in ${selectedCity.name} right now`}
          movies={recommendedMovies.length > 0 ? recommendedMovies : movies}
        />
      </section>

      {/* Promotional Offers Banner Carousel */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Exclusive Offers & Discounts</h2>
            <p className="text-xs text-slate-500 font-medium">Use promo codes at checkout for instant cashbacks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* Now Showing Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-brand-600 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Now Showing</h2>
              <p className="text-xs text-slate-500 font-medium">Book your seats in theatres near you</p>
            </div>
          </div>
        </div>

        <MovieGrid movies={nowShowingMovies.length > 0 ? nowShowingMovies : movies} />
      </section>

      {/* Trending Near You */}
      {trendingMovies.length > 0 && (
        <section>
          <MovieCarousel
            title={`Trending in ${selectedCity.name}`}
            subtitle="Movies selling out fast this weekend"
            movies={trendingMovies}
          />
        </section>
      )}

      {/* Live Events & Concerts Section */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Live Events & Experiences</h2>
            <p className="text-xs text-slate-500 font-medium">Concerts, Stand-up Comedy, Theatre & Sports</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      {comingSoonMovies.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Coming Soon</h2>
              <p className="text-xs text-slate-500 font-medium">Blockbuster movies releasing soon</p>
            </div>
          </div>

          <MovieGrid movies={comingSoonMovies} />
        </section>
      )}

    </div>
  );
};

export default HomePage;
