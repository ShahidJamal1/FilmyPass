import apiClient from './axios';
import { MOCK_INITIAL_BOOKINGS } from './mockData';

// Local storage backup for dynamic user created bookings during testing
const getLocalBookings = () => {
  const saved = localStorage.getItem('filmypass_user_bookings');
  return saved ? JSON.parse(saved) : MOCK_INITIAL_BOOKINGS;
};

const saveLocalBookings = (bookings) => {
  localStorage.setItem('filmypass_user_bookings', JSON.stringify(bookings));
};

export const bookingApi = {
  // POST /bookings/shows/{showId}
  createBooking: async (showId, bookingData) => {
    try {
      const response = await apiClient.post(`/bookings/shows/${showId}`, bookingData);
      if (response.data) return response.data;
    } catch (err) {
      // Fallback: Generate local booking ID & saved state
    }

    const newBooking = {
      id: `BK${Math.floor(100000 + Math.random() * 900000)}`,
      movieId: bookingData.movieId || 1,
      movieTitle: bookingData.movieTitle || 'Kalki 2898 AD',
      moviePoster: bookingData.moviePoster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
      theatreName: bookingData.theatreName || 'PVR Icon: Phoenix Palladium',
      location: bookingData.location || 'Lower Parel, Mumbai',
      showDate: bookingData.showDate || 'Today',
      showTime: bookingData.showTime || '01:45 PM',
      seats: bookingData.seats || ['E4', 'E5'],
      ticketCount: bookingData.seats?.length || 2,
      subtotal: bookingData.subtotal || 600,
      convenienceFee: bookingData.convenienceFee || 40,
      discount: bookingData.discount || 0,
      totalPrice: bookingData.totalPrice || 640,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Upcoming',
      qrCode: `FILMYPASS-BK${Math.floor(100000 + Math.random() * 900000)}`
    };

    const current = getLocalBookings();
    const updated = [newBooking, ...current];
    saveLocalBookings(updated);

    return newBooking;
  },

  // GET /bookings/{bookingId}
  getBookingById: async (bookingId) => {
    try {
      const response = await apiClient.get(`/bookings/${bookingId}`);
      if (response.data) return response.data;
    } catch (err) {
      // Fallback
    }

    const bookings = getLocalBookings();
    const found = bookings.find(b => b.id === bookingId);
    return found || bookings[0];
  },

  // POST /bookings/{bookingId}/cancel
  cancelBooking: async (bookingId) => {
    try {
      const response = await apiClient.post(`/bookings/${bookingId}/cancel`);
      if (response.data) return response.data;
    } catch (err) {
      // Fallback
    }

    const bookings = getLocalBookings();
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b);
    saveLocalBookings(updated);
    return { success: true, message: 'Booking cancelled successfully' };
  },

  // GET /profiles/{profileId}/bookings
  getUserBookings: async (profileId = 'user123') => {
    try {
      const response = await apiClient.get(`/profiles/${profileId}/bookings`);
      if (response.data && Array.isArray(response.data)) return response.data;
    } catch (err) {
      // Fallback
    }

    return getLocalBookings();
  }
};
