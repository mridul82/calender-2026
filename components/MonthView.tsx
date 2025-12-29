
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
    { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }, // Jan
    { bg: 'bg-cyan-600', light: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' }, // Feb
    { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }, // Mar
    { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }, // Apr (Bihu)
    { bg: 'bg-yellow-500', light: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' }, // May
    { bg: 'bg-green-600', light: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }, // Jun
    { bg: 'bg-teal-600', light: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' }, // Jul
    { bg: 'bg-indigo-600', light: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' }, // Aug
    { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' }, // Sep
    { bg: 'bg-red-600', light: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }, // Oct
    { bg: 'bg-amber-600', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }, // Nov
    { bg: 'bg-slate-700', light: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' }, // Dec
  ];
  return themes[index];
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
    calendarDays.push(<div key={`empty-${i}`} className="h-9 w-9 md:h-11 md:w-11"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const holiday = getHoliday(day);
    const isSunday = (startDay + day - 1) % 7 === 0;
    const isAssamese = holiday?.category === HolidayCategory.REGIONAL;
    
    calendarDays.push(
      <div 
        key={day} 
        className={`relative h-9 w-9 md:h-11 md:w-11 flex items-center justify-center text-sm md:text-base font-semibold group cursor-default
          ${holiday ? 'text-red-600' : isSunday ? 'text-red-400' : 'text-gray-700'}
        `}
      >
        {/* Holiday Highlight Background */}
        {holiday && (
          <div className={`absolute inset-1 rounded-lg ${isAssamese ? 'bg-red-50 border-2 border-red-200 border-dashed' : 'bg-red-100'} -z-10 group-hover:scale-110 transition-transform`}></div>
        )}
        
        <span>{day}</span>

        {/* Holiday Tooltip */}
        {holiday && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-xl">
            {holiday.name}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="month-card paper-texture rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col transform hover:-translate-y-1 transition-all duration-300">
      {/* Month Header */}
      <div className={`${theme.bg} p-4 text-center relative`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-black/10"></div>
        <h3 className="month-title text-2xl font-black text-white tracking-wide uppercase italic">{monthName}</h3>
        <div className="text-white/60 text-[10px] font-bold tracking-widest uppercase mt-0.5">{year}</div>
      </div>
      
      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 p-2 bg-gray-50/50 border-b border-gray-100">
        {dayLabels.map(label => (
          <div key={label} className={`h-8 flex items-center justify-center text-[10px] font-black uppercase tracking-tighter ${label === 'Sun' ? 'text-red-500' : 'text-gray-400'}`}>
            {label}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="p-3 grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
    </div>
  );
};

export default MonthView;
