import apiClient from './axios';
import { MOCK_MOVIES } from './mockData';
import { getLocalPoster, TMDB_CURATED_MOVIES } from './tmdbApi';

// Enrich backend movie with rich cast, director, rating, and local reliable poster assets
export const enrichMovie = (movie) => {
  if (!movie) return null;

  const title = movie.title || '';
  const localPoster = getLocalPoster(title);

  // Match in curated TMDB metadata
  const match = TMDB_CURATED_MOVIES.find(
    (c) =>
      (movie.tmdbId && c.tmdbId === movie.tmdbId) ||
      (c.title && c.title.toLowerCase() === title.toLowerCase()) ||
      (c.title && title.toLowerCase().includes(c.title.toLowerCase())) ||
      (c.title && c.title.toLowerCase().includes(title.toLowerCase()))
  );

  const durationMin = movie.durationMinutes || match?.durationMinutes || 150;
  const durationStr = `${Math.floor(durationMin / 60)}h ${durationMin % 60}m`;

  const finalPoster = localPoster || match?.posterUrl || (movie.posterUrl && !movie.posterUrl.includes('image.tmdb.org') ? movie.posterUrl : null) || localPoster || movie.posterUrl;

  return {
    ...match,
    ...movie,
    id: movie.id,
    title: movie.title || match?.title,
    posterUrl: finalPoster,
    bannerUrl: finalPoster || match?.bannerUrl || movie.bannerUrl || movie.posterUrl,
    rating: match?.rating || movie.rating || 8.5,
    votes: match?.votes || movie.votes || '250K',
    director: match?.director || movie.director || 'Renowned Filmmaker',
    cast: match?.cast || (movie.cast ? (Array.isArray(movie.cast) ? movie.cast : [movie.cast]) : ['Lead Cast']),
    castDetails: match?.castDetails || movie.castDetails || null,
    duration: match?.duration || durationStr,
    durationMinutes: durationMin,
    languages: movie.language ? (Array.isArray(movie.language) ? movie.language : [movie.language]) : (match?.languages || ['Hindi']),
    genre: movie.genre ? (Array.isArray(movie.genre) ? movie.genre : movie.genre.split(',').map(s => s.trim())) : (match?.genre || ['Comedy', 'Drama']),
    description: movie.description || match?.description || ''
  };
};

export const movieApi = {
  // GET /movies
  getMovies: async (params = {}) => {
    try {
      const response = await apiClient.get('/movies', { params });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map(enrichMovie);
      }
    } catch (err) {
      console.warn("Unable to fetch movies from server, using fallback:", err.message);
    }

    // Filter mock movies by params if provided
    let filtered = [...MOCK_MOVIES];
    if (params.city) {
      filtered = filtered.filter(m => !m.cities || m.cities.includes(params.city.toLowerCase()));
    }
    if (params.genre && params.genre !== 'All') {
      filtered = filtered.filter(m => m.genre && m.genre.includes(params.genre));
    }
    if (params.language && params.language !== 'All') {
      filtered = filtered.filter(m => m.languages && m.languages.includes(params.language));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(m => m.title.toLowerCase().includes(q) || (m.genre && m.genre.some(g => g.toLowerCase().includes(q))));
    }
    return filtered.map(enrichMovie);
  },

  // GET /movies/:id
  getMovieById: async (id) => {
    try {
      const response = await apiClient.get(`/movies/${id}`);
      if (response.data) return enrichMovie(response.data);
    } catch (err) {
      console.warn("Unable to fetch movie from server, using fallback:", err.message);
    }
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(id) || m.id === id);
    return enrichMovie(movie || MOCK_MOVIES[0]);
  }
};
