import apiClient from "./axios";
import { generateTheatresForCity, MOCK_THEATRES } from "./mockData";

function convertFallbackTheatresToShows(theatres, date = '2026-10-23', movieId = 1) {
  const converted = [];
  theatres.forEach((th, thIdx) => {
    (th.shows || []).forEach((s, sIdx) => {
      let hour = 10;
      let minute = 30;
      if (s.time) {
        const parts = s.time.split(/[: ]/);
        if (parts.length >= 2) {
          hour = parseInt(parts[0], 10);
          minute = parseInt(parts[1], 10);
          const ampm = (parts[2] || '').toUpperCase();
          if (ampm === 'PM' && hour < 12) hour += 12;
          if (ampm === 'AM' && hour === 12) hour = 0;
        }
      }
      const hourStr = String(hour).padStart(2, '0');
      const minStr = String(minute).padStart(2, '0');

      converted.push({
        id: s.id || (thIdx * 100 + sIdx + 1),
        theatre: {
          id: th.id || (thIdx + 1),
          name: th.name,
          city: th.city || 'Cinema City',
          address: th.location || th.address || th.name,
        },
        startAt: `${date}T${hourStr}:${minStr}:00`,
        ticketPrice: s.price || 250,
        availableSeats: s.status === 'Sold Out' ? 0 : 96,
        format: s.format || '2D'
      });
    });
  });
  return converted;
}

export const theatreApi = {
  // Fetch actual shows from the Spring Boot backend with automatic fallback
  getShowsByCity: async (city, date, movieId) => {
    const params = {
      city,
      date,
    };

    if (movieId !== undefined && movieId !== null && movieId !== "") {
      params.movieId = movieId;
    }

    try {
      const response = await apiClient.get("/shows", { params });
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn("Unable to fetch backend shows:", err.message);
    }

    // Dynamic fallback: ensure cinemas and shows are ALWAYS available for ANY city
    const fallbackTheatres = generateTheatresForCity(city);
    return convertFallbackTheatresToShows(fallbackTheatres, date, movieId);
  },

  // Fetch a single show by ID
  getShowById: async (id) => {
    try {
      const response = await apiClient.get(`/shows/${id}`);
      if (response.data) return response.data;
    } catch (err) {
      console.warn("Unable to fetch show by id:", err.message);
    }
    return null;
  },

  // Fetch seats for a particular show
  getShowSeats: async (id) => {
    try {
      const response = await apiClient.get(`/shows/${id}/seats`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn("Unable to fetch show seats:", err.message);
    }

    // Standard 96 seats (A1-H12) with realistic mock availability
    const fallbackSeats = [];
    for (let r = 65; r <= 72; r++) { // A to H
      const row = String.fromCharCode(r);
      for (let c = 1; c <= 12; c++) {
        fallbackSeats.push({
          id: `${row}${c}`,
          seatLabel: `${row}${c}`,
          reserved: (r === 66 && (c === 4 || c === 5)) || (r === 68 && (c === 8 || c === 9))
        });
      }
    }
    return fallbackSeats;
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
