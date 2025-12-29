
import React from 'react';
import { Holiday, HolidayCategory } from '../types';

interface MonthViewProps {
  year: number;
  monthIndex: number;
  monthName: string;
  holidays: Holiday[];
}

const getMonthTheme = (index: number) => {
  const themes = [
    { gradient: 'from-blue-500 via-blue-600 to-indigo-700', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', accent: 'blue' }, // Jan
    { gradient: 'from-pink-400 via-rose-500 to-red-600', light: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', accent: 'pink' }, // Feb
    { gradient: 'from-emerald-400 via-green-500 to-teal-600', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', accent: 'emerald' }, // Mar
    { gradient: 'from-orange-400 via-amber-500 to-yellow-500', light: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', accent: 'orange' }, // Apr (Bihu)
    { gradient: 'from-yellow-400 via-amber-400 to-orange-500', light: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', accent: 'yellow' }, // May
    { gradient: 'from-green-400 via-emerald-500 to-teal-600', light: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', accent: 'green' }, // Jun
    { gradient: 'from-cyan-400 via-teal-500 to-emerald-600', light: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', accent: 'teal' }, // Jul
    { gradient: 'from-orange-500 via-amber-600 to-green-600', light: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', accent: 'orange' }, // Aug (Independence)
    { gradient: 'from-violet-500 via-purple-600 to-indigo-700', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', accent: 'purple' }, // Sep
    { gradient: 'from-amber-400 via-orange-500 to-red-600', light: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', accent: 'red' }, // Oct (Durga Puja)
    { gradient: 'from-amber-500 via-yellow-500 to-orange-500', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', accent: 'amber' }, // Nov (Diwali)
    { gradient: 'from-slate-600 via-gray-700 to-zinc-800', light: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', accent: 'slate' }, // Dec
  ];
  return themes[index];
};

const isToday = (year: number, monthIndex: number, day: number) => {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === monthIndex && today.getDate() === day;
};

const MonthView: React.FC<MonthViewProps> = ({ year, monthIndex, monthName, holidays }) => {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startDay = new Date(year, monthIndex, 1).getDay();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const theme = getMonthTheme(monthIndex);

  const getHoliday = (day: number) => {
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.find(h => h.date === dateStr);
  };

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-14 w-9 md:h-16 md:w-11"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const holiday = getHoliday(day);
    const isSunday = (startDay + day - 1) % 7 === 0;
    const isAssamese = holiday?.category === HolidayCategory.REGIONAL;
    const isTodayDate = isToday(year, monthIndex, day);

    calendarDays.push(
      <div
        key={day}
        className={`relative h-14 w-9 md:h-16 md:w-11 flex flex-col items-center justify-start pt-1 text-sm md:text-base font-semibold group cursor-default transition-all duration-200
          ${isTodayDate ? 'text-white font-bold' : holiday ? 'text-red-600 font-bold' : isSunday ? 'text-red-400' : 'text-gray-700 hover:text-gray-900'}
        `}
      >
        {/* Today Highlight */}
        {isTodayDate && (
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 z-0 shadow-lg shadow-red-300"></div>
        )}

        {/* Holiday Highlight Background */}
        {holiday && !isTodayDate && (
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full ${isAssamese ? 'bg-gradient-to-br from-orange-200 to-amber-100' : 'bg-gradient-to-br from-red-200 to-pink-100'} z-0`}></div>
        )}

        <span className="relative z-10">{day}</span>

        {/* Holiday Name */}
        {holiday && (
          <span className={`relative z-10 text-[6px] md:text-[7px] leading-tight text-center px-0.5 truncate max-w-full ${isAssamese ? 'text-orange-600' : 'text-red-600'}`}>
            {holiday.name.length > 10 ? holiday.name.substring(0, 10) + '..' : holiday.name}
          </span>
        )}

        {/* Holiday Tooltip */}
        {holiday && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-[11px] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20 whitespace-nowrap shadow-2xl border border-white/10">
            <span className="font-medium">{holiday.name}</span>
            <div className={`text-[9px] mt-0.5 ${isAssamese ? 'text-orange-300' : 'text-blue-300'}`}>
              {isAssamese ? 'Regional Holiday' : 'National Holiday'}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="month-card paper-texture rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col transform hover:-translate-y-2 hover:shadow-3xl transition-all duration-300 group/card">
      {/* Month Header */}
      <div className={`bg-gradient-to-r ${theme.gradient} p-5 text-center relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-2 left-4 w-12 h-12 border-2 border-white/30 rounded-full"></div>
          <div className="absolute bottom-2 right-4 w-8 h-8 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/10 rounded-full"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        <h3 className="month-title text-2xl md:text-3xl font-black text-white tracking-wide uppercase italic relative z-10 drop-shadow-lg">{monthName}</h3>
        <div className="text-white/70 text-[11px] font-bold tracking-[0.3em] uppercase mt-1 relative z-10">{year}</div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 p-3 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        {dayLabels.map(label => (
          <div key={label} className={`h-8 flex items-center justify-center text-[10px] font-black uppercase tracking-tight ${label === 'Sun' ? 'text-red-500' : 'text-gray-400'}`}>
            {label}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="p-4 grid grid-cols-7 gap-1 bg-white">
        {calendarDays}
      </div>
    </div>
  );
};

export default MonthView;
