import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [appliedOffer, setAppliedOffer] = useState(null);

  const toggleSeat = (seatCode, seatPrice = 280) => {
    setSelectedSeats((prevSeats) => {
      const exists = prevSeats.find(s => s.code === seatCode);
      if (exists) {
        return prevSeats.filter(s => s.code !== seatCode);
      }
      if (prevSeats.length >= 8) {
        toast.error('Maximum 8 tickets allowed per booking');
        return prevSeats; // Max 8 seats allowed by backend constraint
      }
      return [...prevSeats, { code: seatCode, price: seatPrice }];
    });
  };

  const clearBookingSelection = () => {
    setSelectedSeats([]);
    setAppliedOffer(null);
  };

  const calculateSubtotal = () => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  };

  const calculateConvenienceFee = () => {
    if (selectedSeats.length === 0) return 0;
    return selectedSeats.length * 20 + 10; // Flat ₹10 base + ₹20 per ticket
  };

  const calculateDiscount = () => {
    if (!appliedOffer) return 0;
    const subtotal = calculateSubtotal();
    if (appliedOffer.discountPercentage) {
      const disc = (subtotal * appliedOffer.discountPercentage) / 100;
      return Math.min(disc, appliedOffer.maxDiscount || 200);
    }
    if (appliedOffer.discountFlat) {
      return appliedOffer.discountFlat;
    }
    return 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const fee = calculateConvenienceFee();
    const discount = calculateDiscount();
    return Math.max(0, subtotal + fee - discount);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        selectedDate,
        setSelectedDate,
        selectedTheatre,
        setSelectedTheatre,
        selectedShow,
        setSelectedShow,
        selectedSeats,
        setSelectedSeats,
        toggleSeat,
        appliedOffer,
        setAppliedOffer,
        clearBookingSelection,
        calculateSubtotal,
        calculateConvenienceFee,
        calculateDiscount,
        calculateTotal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
