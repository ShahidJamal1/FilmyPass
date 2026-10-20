import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
          {event.category}
        </span>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-brand-600 transition-colors">
            {event.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-medium">
            <Calendar className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">{event.price}</span>
          <span className="text-xs font-bold text-brand-600 hover:underline">Book Now →</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
