import React from 'react';
import Seat from './Seat';

const SeatLayout = ({ selectedSeats, onToggleSeat, reservedSeats = [], basePrice = 250 }) => {
  const numericBasePrice = Number(basePrice) > 0 ? Number(basePrice) : 250;

  // Define row configurations with pricing & categories
  const categories = [
    {
      name: 'Royal Recliner',
      price: Math.round((numericBasePrice * 1.4) / 10) * 10,
      rows: [
        { letter: 'A', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { letter: 'B', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      ]
    },
    {
      name: 'Executive Prime',
      price: Math.round((numericBasePrice * 1.15) / 10) * 10,
      rows: [
        { letter: 'C', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { letter: 'D', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { letter: 'E', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      ]
    },
    {
      name: 'Club Classic',
      price: numericBasePrice,
      rows: [
        { letter: 'F', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { letter: 'G', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { letter: 'H', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      ]
    }
  ];

  const reservedSet = new Set((reservedSeats || []).map(s => String(s).toUpperCase()));

  const getSeatStatus = (code) => {
    if (reservedSet.has(code.toUpperCase())) {
      return 'Booked';
    }
    return 'Available';
  };

  const isSeatSelected = (code) => {
    return selectedSeats.some(s => s.code === code);
  };

  return (
    <div className="space-y-8 my-6 flex flex-col items-center w-full overflow-x-auto no-scrollbar py-4">
      
      {/* Cinema Screen Curve Visualization */}
      <div className="w-full max-w-2xl px-6 text-center space-y-2">
        <div className="relative mx-auto w-full h-8 flex items-center justify-center">
          <div className="absolute top-0 inset-x-8 h-4 border-t-4 border-brand-500 rounded-[50%/100%] shadow-[0_-5px_20px_rgba(244,63,94,0.4)]" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            SCREEN THIS WAY
          </span>
        </div>
      </div>

      {/* Seat Rows by Category */}
      <div className="space-y-6 w-full max-w-3xl min-w-[500px] px-4">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-bold">
              <span className="text-slate-900 tracking-wide">{cat.name}</span>
              <span className="text-brand-600 bg-rose-50 px-2.5 py-0.5 rounded-full">₹{cat.price}</span>
            </div>

            <div className="space-y-2 pt-1">
              {cat.rows.map((row) => (
                <div key={row.letter} className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="w-4 text-xs font-bold text-slate-400 text-right">{row.letter}</span>
                  
                  {/* Left Column Block (1-6) */}
                  <div className="flex gap-1.5 sm:gap-2">
                    {row.seats.slice(0, 6).map((num) => {
                      const code = `${row.letter}${num}`;
                      return (
                        <Seat
                          key={code}
                          code={code}
                          price={cat.price}
                          category={cat.name.split(' ')[0]}
                          status={getSeatStatus(code)}
                          isSelected={isSeatSelected(code)}
                          onToggle={onToggleSeat}
                        />
                      );
                    })}
                  </div>

                  {/* Aisle gap */}
                  <div className="w-4 sm:w-8" />

                  {/* Right Column Block (7-12) */}
                  <div className="flex gap-1.5 sm:gap-2">
                    {row.seats.slice(6, 12).map((num) => {
                      const code = `${row.letter}${num}`;
                      return (
                        <Seat
                          key={code}
                          code={code}
                          price={cat.price}
                          category={cat.name.split(' ')[0]}
                          status={getSeatStatus(code)}
                          isSelected={isSeatSelected(code)}
                          onToggle={onToggleSeat}
                        />
                      );
                    })}
                  </div>

                  <span className="w-4 text-xs font-bold text-slate-400 text-left">{row.letter}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Seat Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-600 border-t border-slate-200 w-full max-w-xl">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md border border-slate-300 bg-white" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-brand-600 border border-brand-600 shadow-glow" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-slate-200 border border-slate-200" />
          <span>Booked</span>
        </div>
      </div>

    </div>
  );
};

export default SeatLayout;
