import apiClient from "./axios";
import { generateTheatresForCity, MOCK_THEATRES } from "./mockData";

export const theatreApi = {
  // Fetch actual shows from the Spring Boot backend
  getShowsByCity: async (city, date, movieId) => {
    const params = {
      city,
      date,
    };

    if (movieId !== undefined && movieId !== null && movieId !== "") {
      params.movieId = movieId;
    }

    const response = await apiClient.get("/shows", { params });

    return Array.isArray(response.data) ? response.data : [];
  },

  // Fetch a single show by ID
  getShowById: async (id) => {
    const response = await apiClient.get(`/shows/${id}`);
    return response.data;
  },

  // Fetch seats for a particular show
  getShowSeats: async (id) => {
    const response = await apiClient.get(`/shows/${id}/seats`);

    return Array.isArray(response.data) ? response.data : [];
  },

  // Existing function preserved for compatibility with other pages
  getTheatresByCity: async (city = "mumbai", userCoords = null) => {
    try {
      const response = await apiClient.get("/theatres", {
        params: { city },
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn("Unable to fetch theatres:", err.message);
    }

    return generateTheatresForCity(city, userCoords);
  },

  // Existing function preserved for compatibility
  getTheatreById: async (id) => {
    try {
      const response = await apiClient.get(`/theatres/${id}`);

      if (response.data) {
        return response.data;
      }
    } catch (err) {
      console.warn("Unable to fetch theatre:", err.message);
    }

    return (
      MOCK_THEATRES.find((theatre) => theatre.id === id) || MOCK_THEATRES[0]
    );
  },
};
