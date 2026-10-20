import apiClient from './axios';
import { generateTheatresForCity } from './mockData';

export const showApi = {
  // GET /shows?city={city}&date={date}
  getShows: async (city = 'mumbai', date = 'Today') => {
    try {
      const response = await apiClient.get('/shows', { params: { city, date } });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      // Fallback
    }

    return generateTheatresForCity(city);
  },

  getShowDetails: async (showId) => {
    try {
      const response = await apiClient.get(`/shows/${showId}`);
      if (response.data) return response.data;
    } catch (err) {
      // Fallback
    }

    const defaultTheatres = generateTheatresForCity('Mumbai');
    for (const theatre of defaultTheatres) {
      const foundShow = theatre.shows.find(s => s.id === parseInt(showId));
      if (foundShow) {
        return {
          show: foundShow,
          theatre: theatre
        };
      }
    }

    return {
      show: defaultTheatres[0].shows[0],
      theatre: defaultTheatres[0]
    };
  }
};
