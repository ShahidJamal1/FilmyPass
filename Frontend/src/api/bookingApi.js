import apiClient from './axios';
import { MOCK_INITIAL_BOOKINGS } from './mockData';

// Local storage backup for offline or test persistence
const getLocalBookings = () => {
  try {
    const saved = localStorage.getItem('filmypass_user_bookings');
    return saved ? JSON.parse(saved) : MOCK_INITIAL_BOOKINGS;
  } catch (e) {
    return MOCK_INITIAL_BOOKINGS;
  }
};

const saveLocalBookings = (bookings) => {
  try {
    localStorage.setItem('filmypass_user_bookings', JSON.stringify(bookings));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
};

export const normalizeBooking = (b, fallback = {}) => {
  if (!b) return null;

  const startsAt = b.showStartsAt ? new Date(b.showStartsAt) : null;
  const showDate = b.showDate || (startsAt ? startsAt.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' }) : (fallback.showDate || 'Today'));
  const showTime = b.showTime || (startsAt ? startsAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : (fallback.showTime || '01:45 PM'));
  const seats = b.seatLabels || b.seats || fallback.seats || [];
  const rawStatus = b.status || fallback.status || 'CONFIRMED';
  const normalizedStatus = rawStatus === 'CANCELLED' ? 'Cancelled' : (rawStatus === 'COMPLETED' ? 'Completed' : 'Upcoming');
  const location = b.theatreAddress || b.location || fallback.location || '';
  const totalPrice = b.totalAmount ?? b.totalPrice ?? fallback.totalPrice ?? 0;

  return {
    ...b,
    id: b.id,
    movieId: b.movieId || fallback.movieId || 1,
    movieTitle: b.movieTitle || fallback.movieTitle || 'Movie Ticket',
    moviePoster: b.moviePoster || fallback.moviePoster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop',
    theatreName: b.theatreName || fallback.theatreName || 'Cinema Multiplex',
    theatreAddress: location,
    location: location,
    showDate: showDate,
    showTime: showTime,
    showStartsAt: b.showStartsAt || (startsAt ? startsAt.toISOString() : null),
    seats: Array.isArray(seats) ? seats : [seats],
    seatLabels: Array.isArray(seats) ? seats : [seats],
    ticketCount: (Array.isArray(seats) ? seats : [seats]).length,
    totalPrice: Number(totalPrice),
    totalAmount: Number(totalPrice),
    status: normalizedStatus,
    rawStatus: rawStatus,
    customerName: b.customerName || fallback.customerName || 'Movie Guest',
    customerEmail: b.customerEmail || fallback.customerEmail || '',
    customerPhone: b.customerPhone || fallback.customerPhone || '',
    qrCode: b.qrCode || `FILMYPASS-BK${b.id}`
  };
};

export const bookingApi = {
  // POST /bookings/shows/{showId}
  createBooking: async (showId, bookingData) => {
    const payload = {
      profileId: Number(bookingData.profileId) || 1,
      seatLabels: bookingData.seatLabels || bookingData.seats || []
    };

    const response = await apiClient.post(`/bookings/shows/${showId}`, payload);
    if (response.data) {
      const normalized = normalizeBooking(response.data, bookingData);
      const current = getLocalBookings();
      saveLocalBookings([normalized, ...current.filter(b => String(b.id) !== String(normalized.id))]);
      return normalized;
    }

    throw new Error('Server returned empty booking confirmation.');
  },

  // GET /bookings/{bookingId}
  getBookingById: async (bookingId) => {
    try {
      const response = await apiClient.get(`/bookings/${bookingId}`);
      if (response.data) {
        return normalizeBooking(response.data);
      }
    } catch (err) {
      console.warn("Unable to fetch booking from server:", err.message);
    }

    const bookings = getLocalBookings();
    const found = bookings.find(b => String(b.id) === String(bookingId));
    return found ? normalizeBooking(found) : normalizeBooking(bookings[0]);
  },

  // POST /bookings/{bookingId}/cancel
  cancelBooking: async (bookingId, profileId = 1) => {
    const validProfileId = (!isNaN(Number(profileId)) && Number(profileId) > 0) ? Number(profileId) : 1;
    try {
      const response = await apiClient.post(`/bookings/${bookingId}/cancel`, {
        profileId: validProfileId
      });
      if (response.data) {
        const normalized = normalizeBooking(response.data);
        const current = getLocalBookings();
        const updated = current.map(b => String(b.id) === String(bookingId) ? { ...b, status: 'Cancelled', rawStatus: 'CANCELLED' } : b);
        saveLocalBookings(updated);
        return normalized;
      }
    } catch (err) {
      console.warn("Unable to cancel booking on server:", err.message);
      throw err;
    }

    const current = getLocalBookings();
    const updated = current.map(b => String(b.id) === String(bookingId) ? { ...b, status: 'Cancelled', rawStatus: 'CANCELLED' } : b);
    saveLocalBookings(updated);
    return { success: true, message: 'Booking cancelled successfully' };
  },

  // GET /profiles/{profileId}/bookings
  getUserBookings: async (profileId = 1) => {
    const validProfileId = (!isNaN(Number(profileId)) && Number(profileId) > 0) ? Number(profileId) : 1;
    try {
      const response = await apiClient.get(`/profiles/${validProfileId}/bookings`);
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(b => normalizeBooking(b));
      }
    } catch (err) {
      console.warn("Unable to fetch user bookings from server:", err.message);
    }

    return getLocalBookings().map(b => normalizeBooking(b));
  }
};
