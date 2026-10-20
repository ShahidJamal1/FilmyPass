import React from 'react';
import { Film, MapPin, Calendar, Clock, QrCode, Download, Printer, CheckCircle, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';

const TicketCard = ({ booking, showActions = true }) => {
  if (!booking) return null;

  const handleDownload = () => {
    toast.success(`Ticket #${booking.id} downloaded successfully!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft-lg transition-all">
      
      {/* Top Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <Film className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-base tracking-tight">FilmyPass <span className="text-rose-400 font-normal">M-Ticket</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{booking.status || 'Confirmed'}</span>
        </div>
      </div>

      {/* Ticket Main Content */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Movie Poster & Title info */}
        <div className="md:col-span-8 flex items-start gap-4">
          <img
            src={booking.moviePoster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop'}
            alt={booking.movieTitle}
            className="w-24 h-36 object-cover rounded-xl shadow-md shrink-0"
          />
          
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              {booking.movieTitle}
            </h3>

            <div className="space-y-1 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span>{booking.theatreName}</span>
              </div>
              <div className="text-slate-400 text-[11px] pl-5">{booking.location}</div>

              <div className="flex items-center gap-4 pt-1 text-slate-800">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{booking.showDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{booking.showTime}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Seats:</span>
              <span className="px-2.5 py-0.5 bg-rose-50 text-brand-700 font-black text-sm rounded-lg border border-rose-200">
                {Array.isArray(booking.seats) ? booking.seats.join(', ') : booking.seats}
              </span>
            </div>
          </div>
        </div>

        {/* QR Code Placeholder Section */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-2">
          <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
            <QrCode className="w-full h-full text-slate-900" />
          </div>
          <div className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">
            ID: {booking.id}
          </div>
          <div className="text-[9px] text-slate-400">Scan at entrance gate</div>
        </div>

      </div>

      {/* Decorative Ticket Perforated Tear Line */}
      <div className="relative flex items-center justify-between px-4">
        <div className="w-6 h-6 rounded-full bg-slate-50 -ml-7 border-r border-slate-200" />
        <div className="w-full border-t-2 border-dashed border-slate-200" />
        <div className="w-6 h-6 rounded-full bg-slate-50 -mr-7 border-l border-slate-200" />
      </div>

      {/* Ticket Footer Meta & Action Controls */}
      <div className="px-6 py-4 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600">
        <div>
          <span>Total Paid: </span>
          <span className="font-extrabold text-slate-900 text-sm">₹{booking.totalPrice}</span>
          <span className="text-slate-400 ml-2">({booking.ticketCount} {booking.ticketCount === 1 ? 'ticket' : 'tickets'})</span>
        </div>

        {showActions && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl shadow-xs transition-colors font-bold"
            >
              <Download className="w-3.5 h-3.5 text-brand-600" />
              <span>Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-colors font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default TicketCard;
