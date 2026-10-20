import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, User, Ticket, Menu, X, ChevronDown, Search, Film, Calendar, Sparkles, Locate } from 'lucide-react';
import { useCity } from '../../context/CityContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from './SearchBar';
import Modal from './Modal';
import { POPULAR_CITIES, OTHER_CITIES, MOCK_CITIES } from '../../api/mockData';
import toast from 'react-hot-toast';

// Custom Landmark SVG Icons for Popular Cities
const CityLandmarkIcon = ({ cityId, isSelected }) => {
  const strokeColor = isSelected ? '#e11d48' : '#475569';
  const fillColor = isSelected ? '#fff1f2' : 'none';

  switch (cityId) {
    case 'mumbai':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 52h40M16 52V28l8-6 8 6 8-6 8 6v24M24 52V36h16v16M28 36a4 4 0 0 1 8 0" fill={fillColor} />
          <path d="M20 22V14l12-6 12 6v8" />
        </svg>
      );
    case 'delhi':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 52h32M20 52V24l12-8 12 8v28M26 52V34a6 6 0 0 1 12 0v18" fill={fillColor} />
          <path d="M14 24h36M24 16v-6h16v6" />
        </svg>
      );
    case 'bengaluru':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 52h44M16 52V30l16-12 16 12v22M24 52V38h16v14" fill={fillColor} />
          <path d="M28 18V10l4-4 4 4v8" />
          <circle cx="32" cy="28" r="3" />
        </svg>
      );
    case 'hyderabad':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 52h40M16 52V26M48 52V26M16 26c0-6 7-10 16-10s16 4 16 10M20 52V38c0-4 5-6 12-6s12 2 12 6v14" fill={fillColor} />
          <path d="M14 26V10l4-4 4 4v16M42 26V10l4-4 4 4v16" />
        </svg>
      );
    case 'chandigarh':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 52V20M32 20c-6-8-16-4-16 4s10 12 16 12M32 20c6-8 16-4 16 4s-10 12-16 12" fill={fillColor} />
          <path d="M16 52h32" />
        </svg>
      );
    case 'ahmedabad':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 44c12-8 36-8 48 0M12 52h40M20 44V24l12-8 12 8v20" fill={fillColor} />
          <path d="M26 44V32a6 6 0 0 1 12 0v12" />
        </svg>
      );
    case 'pune':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 52h36M18 52V28l14-10 14 10v24M24 52V36h16v16" fill={fillColor} />
          <path d="M22 28h20M28 18v-8h8v8" />
        </svg>
      );
    case 'chennai':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 52h32M20 52l4-32h16l4 32M24 20l2-8h12l2 8" fill={fillColor} />
          <path d="M22 36h20M24 28h16M20 44h24" />
        </svg>
      );
    case 'kolkata':
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 48l8-24 16 12 16-12 8 24M12 48h40M32 20v28" fill={fillColor} />
          <path d="M16 36h32" />
        </svg>
      );
    case 'kochi':
    default:
      return (
        <svg className="w-12 h-12 transition-transform group-hover:scale-110" viewBox="0 0 64 64" fill="none" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 52h40M16 52V36c8-6 24-6 32 0v16" fill={fillColor} />
          <path d="M32 36V16M24 24c4-4 12-4 16 0M20 18c6-6 18-6 24 0" />
        </svg>
      );
  }
};

const Navbar = () => {
  const { selectedCity, changeCity, setUserCoords } = useCity();
  const { user, isLoggedIn } = useAuth();
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // City search & toggle inside modal
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [showAllCities, setShowAllCities] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Movies', path: '/movies', icon: Film },
    { name: 'Events', path: '/movies', icon: Calendar },
    { name: 'Cinemas', path: '/movies/1/shows', icon: MapPin },
    { name: 'Offers', path: '/movies', icon: Sparkles },
  ];

  const isActive = (path) => location.pathname === path;

  // Filter other cities by search
  const filteredOtherCities = useMemo(() => {
    if (!citySearchQuery.trim()) return OTHER_CITIES;
    const q = citySearchQuery.toLowerCase();
    return OTHER_CITIES.filter(c => c.toLowerCase().includes(q));
  }, [citySearchQuery]);

  const filteredPopularCities = useMemo(() => {
    if (!citySearchQuery.trim()) return POPULAR_CITIES;
    const q = citySearchQuery.toLowerCase();
    return POPULAR_CITIES.filter(c => c.name.toLowerCase().includes(q));
  }, [citySearchQuery]);

  // Known city coordinates lookup map
  const cityCoordsMap = {
    sitamarhi: { lat: 26.5982, lng: 85.4871 },
    patna: { lat: 25.5941, lng: 85.1376 },
    muzaffarpur: { lat: 26.1209, lng: 85.3647 },
    darbhanga: { lat: 26.1542, lng: 85.8918 },
    hyderabad: { lat: 17.3850, lng: 78.4867 },
    mumbai: { lat: 19.0760, lng: 72.8777 },
    delhi: { lat: 28.6139, lng: 77.2090 },
    bengaluru: { lat: 12.9716, lng: 77.5946 },
    chandigarh: { lat: 30.7333, lng: 76.7794 },
    ahmedabad: { lat: 23.0225, lng: 72.5714 },
    pune: { lat: 18.5204, lng: 73.8567 },
    chennai: { lat: 13.0827, lng: 80.2707 },
    kolkata: { lat: 22.5726, lng: 88.3639 },
    kochi: { lat: 9.9312, lng: 76.2673 },
  };

  const handleSelectCity = (cityName, cityId = null) => {
    const formattedId = cityId || cityName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    changeCity({ id: formattedId, name: cityName });
    
    // Set coordinates if known to enable nearest distance calculation
    const cleanKey = cityName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const popMatch = POPULAR_CITIES.find(p => p.id === formattedId || p.name.toLowerCase() === cityName.toLowerCase());
    if (popMatch) {
      setUserCoords({ lat: popMatch.lat, lng: popMatch.lng, isDetected: false });
    } else if (cityCoordsMap[cleanKey]) {
      setUserCoords({ lat: cityCoordsMap[cleanKey].lat, lng: cityCoordsMap[cleanKey].lng, isDetected: false });
    }

    setIsCityModalOpen(false);
    toast.success(`Location set to ${cityName}`);
  };

  // Dual-Tier Robust Location Detection (GPS Geolocation + IP Fallback)
  const handleDetectLocation = async () => {
    const toastId = toast.loading('Detecting your live GPS location...');

    const applyCityMatch = (detectedCityName, coords = null) => {
      if (!detectedCityName) return false;
      const cleanName = detectedCityName.trim();
      
      if (coords) {
        setUserCoords({ lat: coords.lat, lng: coords.lng, cityName: cleanName, isDetected: true });
      }

      const matched = MOCK_CITIES.find(
        c => c.name.toLowerCase() === cleanName.toLowerCase() ||
             cleanName.toLowerCase().includes(c.name.toLowerCase()) ||
             c.name.toLowerCase().includes(cleanName.toLowerCase())
      );

      if (matched) {
        changeCity(matched);
        toast.success(`📍 Location detected: ${matched.name}! Showing nearest cinemas.`, { id: toastId });
        setIsCityModalOpen(false);
        return true;
      } else {
        changeCity({ id: cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-'), name: cleanName });
        toast.success(`📍 Location detected: ${cleanName}! Showing nearest cinemas.`, { id: toastId });
        setIsCityModalOpen(false);
        return true;
      }
    };

    const fallbackIpLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data && data.city) {
          applyCityMatch(data.city, data.latitude && data.longitude ? { lat: data.latitude, lng: data.longitude } : null);
          return;
        }
      } catch (e) {
        console.warn('IP location fallback 1 failed:', e);
      }

      try {
        const res2 = await fetch('https://ip-api.com/json/');
        const data2 = await res2.json();
        if (data2 && data2.city) {
          applyCityMatch(data2.city, data2.lat && data2.lon ? { lat: data2.lat, lng: data2.lon } : null);
          return;
        }
      } catch (e) {
        console.warn('IP location fallback 2 failed:', e);
      }

      // Final default fallback
      setUserCoords({ lat: 26.5982, lng: 85.4871, cityName: 'Sitamarhi', isDetected: true });
      changeCity({ id: 'sitamarhi', name: 'Sitamarhi' });
      toast.success('📍 Location set to Sitamarhi', { id: toastId });
      setIsCityModalOpen(false);
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            setUserCoords({ lat: latitude, lng: longitude, isDetected: true });

            // Try Nominatim reverse geocode
            const nomRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            if (nomRes.ok) {
              const nomData = await nomRes.json();
              const addr = nomData.address || {};
              const cityName = addr.city || addr.town || addr.village || addr.suburb || addr.county || addr.state_district;
              if (cityName && applyCityMatch(cityName, { lat: latitude, lng: longitude })) return;
            }

            // Try BigDataCloud reverse geocode
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await res.json();
            const cityName = data.city || data.locality || data.principalSubdivision;
            
            if (cityName && applyCityMatch(cityName, { lat: latitude, lng: longitude })) return;
          } catch (e) {
            console.warn('Reverse geocode failed:', e);
          }
          fallbackIpLocation();
        },
        (error) => {
          console.warn('Browser geolocation error:', error.message);
          fallbackIpLocation();
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
      );
    } else {
      fallbackIpLocation();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 text-slate-900 font-extrabold text-xl sm:text-2xl tracking-tight group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-rose-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
                  <Film className="w-5 h-5" />
                </div>
                <span>Filmy<span className="text-brand-600">Pass</span></span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                        active
                          ? 'bg-rose-50 text-brand-600'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden lg:block flex-1 max-w-md mx-4">
              <SearchBar />
            </div>

            {/* Right: City Selector & Profile / Login */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Location Selector Trigger */}
              <button
                onClick={() => setIsCityModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors"
              >
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>{selectedCity.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* My Bookings Link */}
              <Link
                to="/my-bookings"
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <Ticket className="w-4 h-4 text-slate-500" />
                <span>My Bookings</span>
              </Link>

              {/* Profile or Login */}
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1.5 pl-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all shadow-sm"
                >
                  <span className="text-xs font-bold">{user?.name || 'Profile'}</span>
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.charAt(0) || 'U'
                    )}
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-600 to-rose-500 hover:from-brand-700 hover:to-rose-600 text-white font-semibold text-sm rounded-xl shadow-glow transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsCityModalOpen(true)}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 bg-slate-100 rounded-lg text-slate-700"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span>{selectedCity.name}</span>
              </button>

              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isMobileSearchOpen && (
          <div className="sm:hidden px-4 py-3 border-t border-slate-100 bg-white">
            <SearchBar isCompact />
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 font-semibold text-sm text-slate-800"
                >
                  <link.icon className="w-4 h-4 text-brand-600" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/my-bookings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-100 font-semibold text-slate-800 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-brand-600" />
                  <span>My Bookings</span>
                </div>
                <span className="text-xs text-slate-400">View Tickets</span>
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white font-semibold text-sm"
                >
                  <span>My Profile ({user?.name})</span>
                  <User className="w-4 h-4 text-rose-400" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-glow"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* BookMyShow Style City Selection Modal */}
      <Modal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        maxWidth="max-w-4xl"
      >
        <div className="space-y-6">
          
          {/* Top Search Input Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={citySearchQuery}
              onChange={(e) => setCitySearchQuery(e.target.value)}
              placeholder="Search for your city"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white shadow-xs"
            />
          </div>

          {/* Detect My Location Button */}
          <button
            onClick={handleDetectLocation}
            className="flex items-center gap-2 text-brand-600 font-extrabold text-sm hover:text-brand-700 transition-colors group"
          >
            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
              <Locate className="w-4 h-4" />
            </div>
            <span>Detect my location</span>
          </button>

          {/* Popular Cities Section */}
          {filteredPopularCities.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                Popular Cities
              </h4>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3 py-2">
                {filteredPopularCities.map((city) => {
                  const isSelected = selectedCity.name.toLowerCase() === city.name.toLowerCase();
                  return (
                    <button
                      key={city.id}
                      onClick={() => handleSelectCity(city.name, city.id)}
                      className={`group flex flex-col items-center justify-center p-2 rounded-2xl border transition-all text-center ${
                        isSelected
                          ? 'border-brand-500 bg-rose-50/70 shadow-sm text-brand-700 font-bold'
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <CityLandmarkIcon cityId={city.id} isSelected={isSelected} />
                      <span className="text-[11px] font-semibold mt-1 leading-tight line-clamp-1">
                        {city.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other Cities Section */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Other Cities ({filteredOtherCities.length})
              </h4>
              <button
                onClick={() => setShowAllCities(!showAllCities)}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                {showAllCities ? 'Hide cities' : 'View all cities'}
              </button>
            </div>

            {showAllCities && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-y-2.5 gap-x-4 max-h-64 overflow-y-auto pr-2">
                {filteredOtherCities.map((cityName, idx) => {
                  const isSelected = selectedCity.name.toLowerCase() === cityName.toLowerCase();
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectCity(cityName)}
                      className={`text-left text-xs transition-colors py-1 line-clamp-1 ${
                        isSelected
                          ? 'text-brand-600 font-extrabold'
                          : 'text-slate-600 hover:text-slate-900 font-medium'
                      }`}
                    >
                      {cityName}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </Modal>
    </>
  );
};

export default Navbar;
