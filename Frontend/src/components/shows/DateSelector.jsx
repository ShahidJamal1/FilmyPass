import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const DateSelector = ({ selectedDate, onSelectDate }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // Generate next 7 days dynamically starting today
  const generateUpcomingDays = () => {
    const daysList = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dayName = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate().toString().padStart(2, '0');
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });

      const formattedLabel = `${dayName} ${dayNum} ${monthName}`;
      const isoString = d.toISOString().split('T')[0];

      daysList.push({
        label: formattedLabel,
        dayName: dayName,
        dateNum: dayNum,
        monthName: monthName,
        isoString: isoString,
        isToday: i === 0
      });
    }
    return daysList;
  };

  const quickDays = generateUpcomingDays();

  // If selectedDate is a custom date outside the 7-day strip, add it dynamically
  const isSelectedInQuick = quickDays.some(
    item => selectedDate === item.label || (item.isToday && (selectedDate === 'Today' || selectedDate.includes('Today')))
  );

  let displayedDays = [...quickDays];
  if (!isSelectedInQuick && selectedDate && selectedDate !== 'Today') {
    const parts = selectedDate.split(' ');
    const dayName = parts[0] || 'Selected';
    const dateNum = parts[1] || '';
    const monthName = parts[2] || '';

    displayedDays.unshift({
      label: selectedDate,
      dayName: dayName,
      dateNum: dateNum,
      monthName: monthName,
      isCustom: true
    });
  }

  // Calendar month view builder
  const getDaysInMonthGrid = () => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const daysGrid = [];
    for (let i = 0; i < firstDayIndex; i++) {
      daysGrid.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      daysGrid.push(new Date(year, month, day));
    }
    return daysGrid;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePickCalendarDate = (dateObj) => {
    if (!dateObj || dateObj < today) return;
    
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = dateObj.getDate().toString().padStart(2, '0');
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
    
    const formatted = `${dayName} ${dayNum} ${monthName}`;
    onSelectDate(formatted);
    setIsCalendarOpen(false);
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentMonthDate);
    prev.setMonth(prev.getMonth() - 1);
    if (prev.getMonth() >= new Date().getMonth() || prev.getFullYear() > new Date().getFullYear()) {
      setCurrentMonthDate(prev);
    }
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonthDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonthDate(next);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
        
        {/* Calendar Trigger Button */}
        <button
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-brand-300 text-slate-700 hover:text-brand-600 transition-all font-bold text-xs shrink-0 shadow-2xs group"
          title="Open Full Calendar"
        >
          <div className="w-6 h-6 rounded-xl bg-rose-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline">DATES</span>
        </button>

        {/* Dynamic Days Strip */}
        {displayedDays.map((item) => {
          const isSelected = selectedDate === item.label || (item.isToday && (selectedDate === 'Today' || selectedDate.includes('Today')));
          
          return (
            <button
              key={item.label}
              onClick={() => onSelectDate(item.label)}
              className={`px-3.5 py-2 rounded-2xl flex flex-col items-center justify-center shrink-0 border transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-brand-600 to-rose-500 text-white border-brand-600 shadow-glow font-bold scale-105 ring-2 ring-rose-300 ring-offset-1'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-medium hover:bg-slate-50'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-85">
                {item.dayName}
              </span>
              <span className="text-xs font-black">
                {item.dateNum} {item.monthName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Calendar Date Picker Popover */}
      {isCalendarOpen && (
        <div className="absolute right-0 sm:left-0 top-full mt-2 z-50 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 w-80 sm:w-96 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <h4 className="font-extrabold text-sm text-slate-900">
                {currentMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-2">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {getDaysInMonthGrid().map((dateObj, idx) => {
              if (!dateObj) return <div key={idx} />;

              const isPast = dateObj < today;
              const formattedDateStr = `${dateObj.toLocaleDateString('en-US', { weekday: 'short' })} ${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.toLocaleDateString('en-US', { month: 'short' })}`;
              const isSelected = selectedDate === formattedDateStr;

              return (
                <button
                  key={idx}
                  disabled={isPast}
                  onClick={() => handlePickCalendarDate(dateObj)}
                  className={`h-9 w-9 mx-auto rounded-xl flex items-center justify-center font-bold transition-all ${
                    isPast
                      ? 'text-slate-300 cursor-not-allowed'
                      : isSelected
                      ? 'bg-brand-600 text-white shadow-glow scale-110'
                      : 'hover:bg-rose-50 hover:text-brand-600 text-slate-700'
                  }`}
                >
                  {dateObj.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-semibold">
              Selected: <strong className="text-brand-600 font-extrabold">{selectedDate}</strong>
            </span>
            <button
              onClick={() => {
                const todayFormatted = `${today.toLocaleDateString('en-US', { weekday: 'short' })} ${today.getDate().toString().padStart(2, '0')} ${today.toLocaleDateString('en-US', { month: 'short' })}`;
                onSelectDate(todayFormatted);
                setIsCalendarOpen(false);
              }}
              className="text-brand-600 font-extrabold hover:underline"
            >
              Select Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
