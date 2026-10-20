import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { theatreApi } from '../api/theatreApi';
import SeatLayout from '../components/seats/SeatLayout';
import BookingSummary from '../components/seats/BookingSummary';
import Loader from '../components/common/Loader';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const SeatSelectionPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const {
    selectedMovie,
    setSelectedMovie,
    selectedDate,
    setSelectedDate,
    selectedTheatre,
    setSelectedTheatre,
    selectedShow,
    setSelectedShow,
    selectedSeats,
    toggleSeat,
    calculateSubtotal,
    calculateConvenienceFee,
    calculateTotal,
    clearBookingSelection
  } = useBooking();

  const [loading, setLoading] = useState(true);
  const [reservedSeats, setReservedSeats] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadShowAndSeats = async () => {
      setLoading(true);
      try {
        // 1. Fetch live seat reservation state for this show
        const seatsData = await theatreApi.getShowSeats(showId);
        if (isMounted && Array.isArray(seatsData)) {
          const booked = seatsData
            .filter((s) => s.reserved)
            .map((s) => s.seatLabel?.toUpperCase());
          setReservedSeats(booked);
        }

        // 2. Fetch or restore show metadata if missing in context (e.g. on direct navigation or page refresh)
        if (!selectedShow || String(selectedShow.id) !== String(showId)) {
          const showDetails = await theatreApi.getShowById(showId);
          if (isMounted && showDetails) {
            const startAtDate = showDetails.startAt ? new Date(showDetails.startAt) : null;
            const timeStr = startAtDate
              ? startAtDate.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : '01:45 PM';

            setSelectedShow({
              ...showDetails,
              time: timeStr,
              price: showDetails.ticketPrice || 250,
            });

            if (showDetails.movie) {
              setSelectedMovie(showDetails.movie);
            }
            if (showDetails.theatre) {
              setSelectedTheatre(showDetails.theatre);
            }
            if (startAtDate) {
              setSelectedDate(startAtDate.toISOString().split('T')[0]);
            }
          }
        }
      } catch (err) {
        console.warn('Unable to load show seat layout:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (showId) {
      loadShowAndSeats();
    }

    return () => {
      isMounted = false;
    };
  }, [showId]);

  const movieTitle = selectedMovie?.title || 'Selected Movie';
  const theatreName = selectedTheatre?.name || 'Cinema Multiplex';
  const time = selectedShow?.time || '01:45 PM';
  const basePrice = selectedShow?.ticketPrice || selectedShow?.price || 250;

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
    if (selectedSeats.length > 8) {
      toast.error('Maximum 8 tickets allowed per booking');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return <Loader label="Loading cinema seating layout..." />;
  }

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
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {movieTitle}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mt-0.5">
              <span>{theatreName}</span>
              <span>•</span>
              <span className="text-rose-400 font-bold">
                {selectedDate}, {time}
              </span>
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
          reservedSeats={reservedSeats}
          basePrice={basePrice}
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
