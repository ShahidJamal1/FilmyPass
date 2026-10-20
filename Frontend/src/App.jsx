import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Providers
import { CityProvider } from './context/CityContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import ShowsPage from './pages/ShowsPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import MyBookingsPage from './pages/MyBookingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BookingProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
              
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: '600',
                    borderRadius: '12px',
                  },
                }}
              />

              <Navbar />

              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
                    <Route path="/movies/:movieId/shows" element={<ShowsPage />} />
                    <Route path="/shows/:showId/seats" element={<SeatSelectionPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/booking/success/:bookingId" element={<BookingSuccessPage />} />
                    <Route path="/my-bookings" element={<MyBookingsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </ErrorBoundary>
              </main>

              <Footer />

            </div>
          </Router>
        </BookingProvider>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
