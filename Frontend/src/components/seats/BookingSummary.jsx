import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({
  selectedSeats,
  subtotal,
  convenienceFee,
  total,
  onProceed
}) => {
  const navigate = useNavigate();
  const seatCodes = selectedSeats.map(s => s.code).join(', ');
  const ticketCount = selectedSeats.length;

  if (ticketCount === 0) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl p-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Seats Summary Info */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center font-bold">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">
                Seats ({ticketCount} {ticketCount === 1 ? 'Ticket' : 'Tickets'}):
              </div>
              <div className="text-base font-extrabold text-slate-900 tracking-wide line-clamp-1">
                {seatCodes}
              </div>
            </div>
          </div>

          <div className="text-right sm:text-left border-l border-slate-200 pl-4 sm:pl-6">
            <div className="text-xs text-slate-400 font-medium">Subtotal: ₹{subtotal} + Fee ₹{convenienceFee}</div>
            <div className="text-lg font-black text-brand-600">
              Total: ₹{total}
            </div>
          </div>
        </div>

        {/* Action CTA */}
        <button
          onClick={onProceed}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-rose-500 hover:from-brand-700 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-glow flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </motion.div>
  );
};

export default BookingSummary;
