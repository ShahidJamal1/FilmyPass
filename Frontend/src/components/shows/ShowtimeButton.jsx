import React from "react";
import { motion } from "framer-motion";

const ShowtimeButton = ({ show, onSelect }) => {
  const availableSeats = Number(show.availableSeats ?? 0);
  const isSoldOut =
    show.status === "sold_out" ||
    show.status === "Sold Out" ||
    availableSeats <= 0;

  const getStatus = () => {
    if (isSoldOut) return "Sold Out";

    if (show.status === "Filling Fast" || show.status === "Almost Full") {
      return show.status;
    }

    return "Available";
  };

  const status = getStatus();

  const getStatusStyles = () => {
    switch (status) {
      case "Available":
        return "border-emerald-500/30 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/80 hover:border-emerald-500";

      case "Filling Fast":
        return "border-amber-500/40 text-amber-800 bg-amber-50/60 hover:bg-amber-100 hover:border-amber-500";

      case "Almost Full":
        return "border-rose-500/40 text-rose-800 bg-rose-50/60 hover:bg-rose-100 hover:border-rose-500";

      case "Sold Out":
        return "border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed opacity-60";

      default:
        return "border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100";
    }
  };

  const formatTime = () => {
    if (show.time) return show.time;
    if (!show.startAt) return "Time unavailable";

    const date = new Date(show.startAt);

    if (Number.isNaN(date.getTime())) return "Time unavailable";

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const price = show.price ?? show.ticketPrice;

  return (
    <motion.button
      whileHover={!isSoldOut ? { scale: 1.05 } : {}}
      whileTap={!isSoldOut ? { scale: 0.95 } : {}}
      disabled={isSoldOut}
      onClick={() => !isSoldOut && onSelect(show)}
      className={`relative px-4 py-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${getStatusStyles()}`}
    >
      <span className="text-sm font-extrabold">{formatTime()}</span>

      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-semibold">
        <span>{show.format || "Standard"}</span>
        <span>•</span>
        <span>{price != null ? `₹${price}` : "Price unavailable"}</span>
      </div>

      {status !== "Available" && (
        <span
          className={`text-[9px] font-bold uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded ${
            status === "Filling Fast"
              ? "bg-amber-200/80 text-amber-900"
              : status === "Almost Full"
                ? "bg-rose-200/80 text-rose-900"
                : "bg-slate-200 text-slate-600"
          }`}
        >
          {status}
        </span>
      )}
    </motion.button>
  );
};

export default ShowtimeButton;
