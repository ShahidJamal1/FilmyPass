import React from 'react';
import { motion } from 'framer-motion';

const Seat = ({ code, status, price, category, isSelected, onToggle }) => {
  const isBooked = status === 'Booked';
  const isUnavailable = status === 'Unavailable';

  const getSeatColor = () => {
    if (isSelected) {
      return 'bg-brand-600 text-white border-brand-600 shadow-glow font-bold scale-110';
    }
    if (isBooked) {
      return 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed';
    }
    if (isUnavailable) {
      return 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed opacity-40';
    }

    switch (category) {
      case 'Royal':
        return 'bg-white text-slate-700 border-amber-300 hover:border-amber-500 hover:bg-amber-50';
      case 'Executive':
        return 'bg-white text-slate-700 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50';
      case 'Club':
      default:
        return 'bg-white text-slate-700 border-slate-300 hover:border-brand-500 hover:bg-rose-50';
    }
  };

  return (
    <motion.button
      whileHover={!isBooked && !isUnavailable ? { scale: 1.15 } : {}}
      whileTap={!isBooked && !isUnavailable ? { scale: 0.9 } : {}}
      disabled={isBooked || isUnavailable}
      onClick={() => onToggle(code, price)}
      title={`${code} - ${category} (₹${price})`}
      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border text-[11px] font-semibold flex items-center justify-center transition-all ${getSeatColor()}`}
    >
      {code.substring(1)}
    </motion.button>
  );
};

export default Seat;
