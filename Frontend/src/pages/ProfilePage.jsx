import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Ticket, LogOut, ShieldCheck, Settings, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn || !user) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Please Log In</h2>
        <p className="text-sm text-slate-500">You need to be signed in to view your profile dashboard.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 bg-brand-600 text-white font-bold text-sm rounded-xl"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/');
  };

  return (
    <div className="space-y-8 py-6 pb-16 max-w-4xl mx-auto">
      
      {/* Profile Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-600 flex items-center justify-center text-white text-2xl font-black shadow-glow border-2 border-white/20 shrink-0">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name?.charAt(0) || 'U'
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-extrabold text-white">{user.name}</h1>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                <Award className="w-3 h-3" /> VIP Member
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1">{user.email}</p>
            <p className="text-xs text-slate-400 font-mono">{user.phone}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2.5 bg-white/10 hover:bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors border border-white/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Personal Info */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-600" />
            <span>Personal Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Full Name</span>
              <span className="font-bold text-slate-900">{user.name}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Email Address</span>
              <span className="font-bold text-slate-900">{user.email}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Phone Number</span>
              <span className="font-bold text-slate-900">{user.phone}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Account Tier</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Verified FilmyPass
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links & Shortcuts */}
        <div className="space-y-4">
          
          <Link
            to="/my-bookings"
            className="block p-5 bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Booking History</h3>
                <p className="text-xs text-slate-400">View M-Tickets & passes</p>
              </div>
            </div>
          </Link>

          <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-soft space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Account Preferences</h3>
                <p className="text-xs text-slate-400">Notification & city settings</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;
