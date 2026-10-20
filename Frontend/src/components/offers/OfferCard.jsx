import React, { useState } from 'react';
import { Tag, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const OfferCard = ({ offer }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    toast.success(`Coupon code ${offer.code} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r ${offer.bgGradient || 'from-rose-500 to-red-600'} text-white shadow-soft flex flex-col justify-between h-full`}>
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" /> Promo Offer
          </span>
          <span className="text-[11px] text-white/80 font-medium">Expires {offer.validTill}</span>
        </div>

        <h3 className="font-extrabold text-lg leading-snug">{offer.title}</h3>
        <p className="text-xs text-white/90 leading-relaxed font-normal">{offer.subtitle}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between relative z-10">
        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 font-mono font-bold text-sm tracking-wider">
          {offer.code}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Code'}</span>
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
