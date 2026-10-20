import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('aryan@filmypass.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error('Please enter email/username and password');
      return;
    }

    setLoading(true);
    const result = await login(identifier, password);
    setLoading(false);

    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate('/profile');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-12">
        
        {/* Left: Cinematic Graphic Branding */}
        <div className="hidden md:flex md:col-span-6 bg-slate-950 text-white p-10 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop"
              alt="Cinema experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Film className="w-5 h-5" />
              </div>
              <span>Filmy<span className="text-brand-500">Pass</span></span>
            </div>
            <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider">
              Premier Entertainment Ticketing
            </p>
          </div>

          <div className="relative z-10 space-y-4 max-w-sm">
            <h2 className="text-3xl font-black leading-tight text-white">
              Unlock Cinematic Magic & Instant Seat Booking
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Sign in to manage your tickets, access exclusive promo discounts, and get instant booking confirmations.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Over 1,00,000+ happy moviegoers across India</span>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Enter your account credentials to access your FilmyPass tickets
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Email or Username</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <span className="text-xs font-bold text-brand-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-rose-500 hover:from-brand-700 hover:to-rose-600 text-white font-extrabold text-sm rounded-xl shadow-glow flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              {loading ? <span>Signing In...</span> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-brand-600 hover:underline">
              Create an account now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
