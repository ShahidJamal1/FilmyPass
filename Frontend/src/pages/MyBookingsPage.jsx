import React, { useState, useEffect } from 'react';
import { bookingApi } from '../api/bookingApi';
import { getLocalPoster, createFallbackPoster } from '../api/tmdbApi';
import { useAuth } from '../context/AuthContext';
import TicketCard from '../components/booking/TicketCard';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { Ticket, Calendar, MapPin, XCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const MyBookingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const profileId = (user && !isNaN(Number(user.id)) && Number(user.id) > 0)
        ? Number(user.id)
        : 1;
      const data = await bookingApi.getUserBookings(profileId);
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? Refunds will be credited within 24 hours.')) {
      try {
        const profileId = (user && !isNaN(Number(user.id)) && Number(user.id) > 0)
          ? Number(user.id)
          : 1;
        await bookingApi.cancelBooking(bookingId, profileId);
        toast.success(`Booking #${bookingId} cancelled successfully.`);
        fetchBookings();
      } catch (err) {
        console.error('Cancel booking error:', err);
        const errMsg = err?.response?.data?.message || err?.message || 'Failed to cancel booking.';
        toast.error(errMsg);
      }
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const status = b.status || (b.rawStatus === 'CANCELLED' ? 'Cancelled' : 'Upcoming');
    return status === activeTab;
  });

  return (
    <div className="space-y-8 py-6 pb-16">
      {/* Page Title & User Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Movie Tickets</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage your upcoming, completed, and cancelled movie show bookings
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          {['Upcoming', 'Completed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <Loader label="Fetching your ticket history..." />
      ) : filteredBookings.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title={`No ${activeTab.toLowerCase()} bookings`}
          description={`You don't have any ${activeTab.toLowerCase()} movie tickets at the moment.`}
          actionText="Explore Movies"
          onAction={() => window.location.href = '/movies'}
        />
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const seats = b.seats || b.seatLabels || [];
            const location = b.location || b.theatreAddress || 'Cinema Hall';
            const startsAt = b.showStartsAt ? new Date(b.showStartsAt) : null;
            const showDate = b.showDate || (startsAt ? startsAt.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' }) : 'Today');
            const showTime = b.showTime || (startsAt ? startsAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : '01:45 PM');
            const isUpcoming = (b.status === 'Upcoming' || b.rawStatus === 'CONFIRMED');

            const posterSrc =
              getLocalPoster(b.movieTitle) ||
              (b.moviePoster && !b.moviePoster.includes('image.tmdb.org') ? b.moviePoster : null) ||
              getLocalPoster(b.movieTitle) ||
              '/posters/3-idiots.jpg';

            return (
              <div
                key={b.id}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-soft-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={posterSrc}
                    alt={b.movieTitle || 'Movie'}
                    onError={(e) => {
                      const local = getLocalPoster(b.movieTitle);
                      if (local && !e.target.src.includes(local)) {
                        e.target.src = local;
                      } else {
                        e.target.src = createFallbackPoster(b.movieTitle);
                      }
                    }}
                    className="w-20 h-28 object-cover rounded-xl shadow-md shrink-0 border border-slate-100"
                  />

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        #{b.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        b.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
                        b.status === 'Completed' ? 'bg-slate-100 text-slate-700' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {b.status || 'Upcoming'}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900">{b.movieTitle}</h3>

                    <div className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span>{b.theatreName}</span>
                    </div>

                    <div className="text-slate-400 text-[11px] pl-5">{location}</div>

                    <div className="text-xs text-slate-500 font-medium flex items-center gap-4 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {showDate} at {showTime}
                      </span>
                      <span className="bg-rose-50 text-brand-700 font-bold px-2 py-0.5 rounded-md text-[11px]">
                        Seats: {Array.isArray(seats) ? seats.join(', ') : seats}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <button
                    onClick={() => setSelectedTicketModal(b)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Ticket</span>
                  </button>

                  {isUpcoming && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-rose-200"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ticket Pass Modal */}
      <Modal
        isOpen={!!selectedTicketModal}
        onClose={() => setSelectedTicketModal(null)}
        maxWidth="max-w-3xl"
      >
        <TicketCard booking={selectedTicketModal} showActions={true} />
      </Modal>
    </div>
  );
};

export default MyBookingsPage;
