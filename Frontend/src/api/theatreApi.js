import apiClient from './axios';
import { generateTheatresForCity, MOCK_THEATRES } from './mockData';

export const theatreApi = {
  // GET /theatres?city={city}
  getTheatresByCity: async (city = 'mumbai', userCoords = null) => {
    try {
      const response = await apiClient.get('/theatres', { params: { city } });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      // Fallback to dynamic city theatres
    }

    // Return dynamic city-tailored theatres for ANY selected Indian city!
    return generateTheatresForCity(city, userCoords);
  },

  getTheatreById: async (id) => {
    try {
      const response = await apiClient.get(`/theatres/${id}`);
      if (response.data) return response.data;
    } catch (err) {
      // Fallback
    }
    return MOCK_THEATRES.find(t => t.id === id) || MOCK_THEATRES[0];
  }
};
