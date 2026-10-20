import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookingApi } from '../api/bookingApi';
import TicketCard from '../components/booking/TicketCard';
import Loader from '../components/common/Loader';
import { CheckCircle2, Home, Ticket } from 'lucide-react';

const BookingSuccessPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const data = await bookingApi.getBookingById(bookingId);
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) return <Loader label="Generating your digital ticket..." />;

  return (
    <div className="space-y-8 py-8 pb-16 text-center max-w-4xl mx-auto">
      
      {/* Confirmation Celebration Header */}
      <div className="space-y-3">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Your movie ticket pass has been issued. Show the M-ticket QR code on your mobile at the cinema gate.
        </p>
      </div>

      {/* Digital Ticket Pass Component */}
      <div className="pt-2">
        <TicketCard booking={booking} showActions={true} />
      </div>

      {/* Bottom Action Navigation Links */}
      <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl flex items-center gap-2 shadow-sm transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/my-bookings"
          className="px-6 py-3 bg-rose-50 text-brand-700 hover:bg-rose-100 font-extrabold text-sm rounded-2xl flex items-center gap-2 transition-all border border-rose-200"
        >
          <Ticket className="w-4 h-4" />
          <span>View All Bookings</span>
        </Link>
      </div>

    </div>
  );
};

export default BookingSuccessPage;
