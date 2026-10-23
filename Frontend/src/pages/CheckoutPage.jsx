import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { bookingApi } from '../api/bookingApi';
import { profileApi } from '../api/profileApi';
import { MOCK_OFFERS } from '../api/mockData';
import { getLocalPoster, createFallbackPoster } from '../api/tmdbApi';
import { ShieldCheck, Ticket, Tag, CreditCard, Smartphone, Building2, Wallet, ArrowRight, Check, User, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    selectedMovie,
    selectedDate,
    selectedTheatre,
    selectedShow,
    selectedSeats,
    appliedOffer,
    setAppliedOffer,
    calculateSubtotal,
    calculateConvenienceFee,
    calculateDiscount,
    calculateTotal,
    clearBookingSelection
  } = useBooking();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const subtotal = calculateSubtotal();
  const convenienceFee = calculateConvenienceFee();
  const discount = calculateDiscount();
  const total = calculateTotal();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const foundOffer = MOCK_OFFERS.find(o => o.code.toUpperCase() === promoCodeInput.trim().toUpperCase());
    if (foundOffer) {
      setAppliedOffer(foundOffer);
      toast.success(`Promo code ${foundOffer.code} applied successfully!`);
    } else {
      toast.error('Invalid promo code. Try FILMY20 or WELCOME50');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedOffer(null);
    setPromoCodeInput('');
    toast.success('Promo code removed.');
  };

  const handlePayAndBook = async () => {
    if (selectedSeats.length === 0) {
      toast.error('No seats selected!');
      return;
    }

    if (selectedSeats.length > 8) {
      toast.error('Maximum 8 tickets allowed per booking');
      return;
    }

    const showId = selectedShow?.id;
    if (!showId) {
      toast.error('Booking session expired. Please select your show again.');
      navigate(-1);
      return;
    }

    setIsProcessing(true);

    let profileId = (user && !isNaN(Number(user.id)) && Number(user.id) > 0)
      ? Number(user.id)
      : null;
    let customerEmail = user?.email || guestEmail.trim();

    if (!user) {
      if (!guestEmail.trim()) {
        toast.error('Please enter your email to receive ticket details');
        setIsProcessing(false);
        return;
      }
      try {
        const registered = await profileApi.registerProfile({
          name: guestName.trim() || 'Movie Fan',
          email: guestEmail.trim(),
          phone: guestPhone.trim() || '9876543210'
        });
        if (registered && registered.id) {
          profileId = Number(registered.id);
          customerEmail = registered.email || guestEmail.trim();
        }
      } catch (e) {
        console.warn('Guest profile register notice:', e);
      }
    }

    if (!profileId) {
      profileId = 1;
    }

    const seatLabels = selectedSeats.map(s => s.code);
    const resolvedPoster =
      getLocalPoster(selectedMovie?.title) ||
      (selectedMovie?.posterUrl && !selectedMovie.posterUrl.includes('image.tmdb.org') ? selectedMovie.posterUrl : null) ||
      '/posters/3-idiots.jpg';

    const bookingPayload = {
      profileId,
      seatLabels,
      movieId: selectedMovie?.id || 1,
      movieTitle: selectedMovie?.title || 'Selected Movie',
      moviePoster: resolvedPoster,
      theatreName: selectedTheatre?.name || '',
      location: selectedTheatre?.location || selectedTheatre?.address || '',
      showDate: selectedDate || 'Today',
      showTime: selectedShow?.time || '01:45 PM',
      seats: seatLabels,
      subtotal,
      convenienceFee,
      discount,
      totalPrice: total,
      userEmail: customerEmail || 'guest@filmypass.com'
    };

    try {
      const resultBooking = await bookingApi.createBooking(showId, bookingPayload);
      toast.success('🎉 Booking Confirmed successfully!');
      clearBookingSelection();
      navigate(`/booking/success/${resultBooking.id}`);
    } catch (err) {
      console.error('Booking error:', err);
      const errMsg = err?.response?.data?.message || err?.message || 'Booking failed. Please try again.';
      toast.error(errMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 py-6 pb-16">
      
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Checkout Summary</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Review your tickets and select your preferred payment method</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Booking Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Movie & Show Info Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex items-start gap-4">
            <img
              src={
                getLocalPoster(selectedMovie?.title) ||
                (selectedMovie?.posterUrl && !selectedMovie.posterUrl.includes('image.tmdb.org') ? selectedMovie.posterUrl : null) ||
                '/posters/3-idiots.jpg'
              }
              alt={selectedMovie?.title || 'Movie'}
              onError={(e) => {
                const local = getLocalPoster(selectedMovie?.title);
                if (local && !e.target.src.includes(local)) {
                  e.target.src = local;
                } else {
                  e.target.src = createFallbackPoster(selectedMovie?.title);
                }
              }}
              className="w-20 h-28 object-cover rounded-xl shadow-md shrink-0 border border-slate-100"
            />
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                {selectedMovie?.title || 'Kalki 2898 AD'}
              </h2>
              <div className="text-xs text-slate-500 font-semibold">{selectedTheatre?.name || 'PVR Icon: Phoenix Palladium'}</div>
              <div className="text-xs text-slate-400 font-normal">{selectedTheatre?.location || 'Lower Parel, Mumbai'}</div>
              <div className="pt-2 text-xs font-bold text-slate-800 flex items-center gap-3">
                <span className="bg-rose-50 text-brand-600 px-2.5 py-0.5 rounded-md">
                  {selectedDate || 'Today'}, {selectedShow?.time || '01:45 PM'}
                </span>
                <span className="bg-slate-100 px-2.5 py-0.5 rounded-md text-slate-700">
                  {selectedShow?.format || 'IMAX 3D'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details Card (BookMyShow style) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-4">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Booking As</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{user.email} • {user.phone}</div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  Logged In
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-600" />
                    <span>Contact Information (For M-Ticket)</span>
                  </h3>
                  <Link
                    to="/login"
                    state={{ from: '/checkout' }}
                    className="text-xs font-bold text-brand-600 hover:underline"
                  >
                    Have an account? Sign In
                  </Link>
                </div>
                <p className="text-xs text-slate-500">
                  Your digital ticket & QR pass will be issued to these details.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="Mobile (10 digits)"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-brand-600" />
              <span>Ticket Price Breakdown</span>
            </h3>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Selected Seats ({selectedSeats.length}):</span>
                  <div className="text-xs text-slate-400 font-mono font-bold mt-0.5">
                    {selectedSeats.map(s => s.code).join(', ')}
                  </div>
                </div>
                <span className="font-bold text-slate-900">₹{subtotal}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span>Convenience Fee (incl. GST):</span>
                <span className="font-bold text-slate-900">₹{convenienceFee}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-600 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <span>Promo Offer Discount ({appliedOffer?.code}):</span>
                  <span>- ₹{discount}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-base font-black text-slate-900">
                <span>Total Amount Payable:</span>
                <span className="text-xl text-brand-600">₹{total}</span>
              </div>
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Apply Discount Coupon</span>
            </h3>

            {appliedOffer ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-emerald-700 block">{appliedOffer.code} Applied</span>
                  <span className="text-[11px] text-emerald-600">{appliedOffer.title}</span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Enter promo code (e.g. FILMY20)"
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm uppercase tracking-wider focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right Column: Payment Options UI */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-6">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Select Payment Method</span>
            </h3>

            {/* Payment Method Selector Pills */}
            <div className="space-y-3">
              
              {/* UPI Option */}
              <label
                onClick={() => setSelectedPaymentMethod('upi')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPaymentMethod === 'upi'
                    ? 'border-brand-600 bg-rose-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">UPI Payment</div>
                    <div className="text-xs text-slate-400">Google Pay, PhonePe, Paytm, BHIM</div>
                  </div>
                </div>
                <input type="radio" checked={selectedPaymentMethod === 'upi'} readOnly className="accent-brand-600" />
              </label>

              {/* Cards Option */}
              <label
                onClick={() => setSelectedPaymentMethod('card')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPaymentMethod === 'card'
                    ? 'border-brand-600 bg-rose-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Credit / Debit Cards</div>
                    <div className="text-xs text-slate-400">Visa, Mastercard, RuPay, Amex</div>
                  </div>
                </div>
                <input type="radio" checked={selectedPaymentMethod === 'card'} readOnly className="accent-brand-600" />
              </label>

              {/* Net Banking Option */}
              <label
                onClick={() => setSelectedPaymentMethod('netbanking')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPaymentMethod === 'netbanking'
                    ? 'border-brand-600 bg-rose-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Net Banking</div>
                    <div className="text-xs text-slate-400">All major Indian national banks</div>
                  </div>
                </div>
                <input type="radio" checked={selectedPaymentMethod === 'netbanking'} readOnly className="accent-brand-600" />
              </label>

              {/* Wallets Option */}
              <label
                onClick={() => setSelectedPaymentMethod('wallet')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPaymentMethod === 'wallet'
                    ? 'border-brand-600 bg-rose-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Wallets & Pay Later</div>
                    <div className="text-xs text-slate-400">Mobikwik, Amazon Pay, Simpl</div>
                  </div>
                </div>
                <input type="radio" checked={selectedPaymentMethod === 'wallet'} readOnly className="accent-brand-600" />
              </label>

            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayAndBook}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-brand-600 to-rose-500 hover:from-brand-700 hover:to-rose-600 text-white font-black text-base rounded-2xl shadow-glow flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <span>Pay ₹{total} & Confirm Booking</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              By proceeding, you agree to FilmyPass terms & cinema ticket cancellation rules.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CheckoutPage;
