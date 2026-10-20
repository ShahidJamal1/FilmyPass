import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ShieldCheck, HeartHandshake, Headphones, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 text-brand-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Safe Payments</h4>
              <p className="text-xs text-slate-400">Encrypted transactions & instant booking guarantees.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Instant Refund & Cancellation</h4>
              <p className="text-xs text-slate-400">Hassle-free ticket cancellations & instant wallet refunds.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">24/7 Customer Care</h4>
              <p className="text-xs text-slate-400">Dedicated support team ready to assist your show booking.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-2xl tracking-tight">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Film className="w-5 h-5" />
              </div>
              <span>Filmy<span className="text-brand-500">Pass</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              FilmyPass is a next-generation entertainment ticketing platform designed for effortless movie & live event bookings across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 transition-colors flex items-center justify-center text-white cursor-pointer text-sm font-bold">
                in
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 transition-colors flex items-center justify-center text-white cursor-pointer text-sm font-bold">
                X
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 transition-colors flex items-center justify-center text-white cursor-pointer text-sm font-bold">
                ig
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Movies Now Showing</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/movies/1" className="hover:text-white transition-colors">Kalki 2898 AD</Link></li>
              <li><Link to="/movies/2" className="hover:text-white transition-colors">Stree 2</Link></li>
              <li><Link to="/movies/3" className="hover:text-white transition-colors">Dune: Part Two</Link></li>
              <li><Link to="/movies/4" className="hover:text-white transition-colors">Deadpool & Wolverine</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Popular Cities</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Mumbai</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Delhi-NCR</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bengaluru</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Hyderabad</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/my-bookings" className="hover:text-white transition-colors">My Bookings</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">User Profile</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Account Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register Account</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 FilmyPass Technologies. All Rights Reserved. Built with React.js & Vite.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
