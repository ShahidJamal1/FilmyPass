import apiClient from './axios';
import { MOCK_MOVIES } from './mockData';

export const movieApi = {
  // GET /movies
  getMovies: async (params = {}) => {
    try {
      const response = await apiClient.get('/movies', { params });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      // Fallback to mock movies
    }

    // Filter mock movies by params if provided
    let filtered = [...MOCK_MOVIES];
    if (params.city) {
      filtered = filtered.filter(m => !m.cities || m.cities.includes(params.city.toLowerCase()));
    }
    if (params.genre && params.genre !== 'All') {
      filtered = filtered.filter(m => m.genre.includes(params.genre));
    }
    if (params.language && params.language !== 'All') {
      filtered = filtered.filter(m => m.languages.includes(params.language));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(m => m.title.toLowerCase().includes(q) || m.genre.some(g => g.toLowerCase().includes(q)));
    }
    return filtered;
  },

  // GET /movies/:id
  getMovieById: async (id) => {
    try {
      const response = await apiClient.get(`/movies/${id}`);
      if (response.data) return response.data;
    } catch (err) {
      // Fallback
    }
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(id) || m.id === id);
    return movie || MOCK_MOVIES[0];
  }
};
