import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import SeatLayout from '../components/seats/SeatLayout';
import BookingSummary from '../components/seats/BookingSummary';
import { MapPin, Calendar, Clock, Film, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const SeatSelectionPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const {
    selectedMovie,
    selectedDate,
    selectedTheatre,
    selectedShow,
    selectedSeats,
    toggleSeat,
    calculateSubtotal,
    calculateConvenienceFee,
    calculateTotal,
    clearBookingSelection
  } = useBooking();

  // Fallback defaults if accessed directly via URL
  const movieTitle = selectedMovie?.title || 'Kalki 2898 AD';
  const theatreName = selectedTheatre?.name || 'PVR Icon: Phoenix Palladium';
  const location = selectedTheatre?.location || 'Lower Parel, Mumbai';
  const time = selectedShow?.time || '01:45 PM';

  const subtotal = calculateSubtotal();
  const convenienceFee = calculateConvenienceFee();
  const total = calculateTotal();

  const handleToggle = (code, price) => {
    toggleSeat(code, price);
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat to proceed!');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="space-y-6 py-4 pb-28 min-h-screen">
      
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-3xl shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">{movieTitle}</h1>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mt-0.5">
              <span>{theatreName}</span>
              <span>•</span>
              <span className="text-rose-400 font-bold">{selectedDate}, {time}</span>
            </div>
          </div>
        </div>

        {/* Clear selection button */}
        {selectedSeats.length > 0 && (
          <button
            onClick={clearBookingSelection}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline"
          >
            Clear Selected ({selectedSeats.length})
          </button>
        )}
      </div>

      {/* Interactive Seat Selection Grid Container */}
      <div className="bg-slate-50/50 p-4 sm:p-8 rounded-3xl border border-slate-200">
        <SeatLayout
          selectedSeats={selectedSeats}
          onToggleSeat={handleToggle}
        />
      </div>

      {/* Sticky Bottom Booking Summary Bar */}
      <BookingSummary
        selectedSeats={selectedSeats}
        subtotal={subtotal}
        convenienceFee={convenienceFee}
        total={total}
        onProceed={handleProceedToCheckout}
      />

    </div>
  );
};

export default SeatSelectionPage;
