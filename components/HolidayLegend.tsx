
import React from 'react';
import { Holiday, HolidayCategory } from '../types';

interface HolidayLegendProps {
  holidays: Holiday[];
}

const HolidayLegend: React.FC<HolidayLegendProps> = ({ holidays }) => {
  const sortedHolidays = [...holidays].sort((a, b) => a.date.localeCompare(b.date));
  const nationalCount = holidays.filter(h => h.category === HolidayCategory.NATIONAL).length;
  const regionalCount = holidays.filter(h => h.category === HolidayCategory.REGIONAL).length;

  return (
    <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 sticky top-28 max-h-[calc(100vh-140px)] flex flex-col overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="month-title text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            Festival List
          </h2>
          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-200">{holidays.length} EVENTS</span>
        </div>

        {/* Category stats */}
        <div className="flex gap-2">
          <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
            <div className="text-2xl font-black text-blue-600">{nationalCount}</div>
            <div className="text-[9px] font-bold text-blue-500 uppercase tracking-wider">National</div>
          </div>
          <div className="flex-1 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-100">
            <div className="text-2xl font-black text-orange-600">{regionalCount}</div>
            <div className="text-[9px] font-bold text-orange-500 uppercase tracking-wider">Regional</div>
          </div>
        </div>
      </div>

      {/* Holiday List */}
      <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar flex-1">
        {sortedHolidays.map((holiday, idx) => {
          const isRegional = holiday.category === HolidayCategory.REGIONAL;
          const date = new Date(holiday.date);

          return (
            <div
              key={idx}
              className={`group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 border cursor-pointer
                ${isRegional
                  ? 'bg-gradient-to-r from-orange-50/80 to-amber-50/50 border-orange-200/50 hover:from-orange-100 hover:to-amber-100 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100'
                  : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border-blue-200/50 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100'
                }`}
            >
              <div className={`flex flex-col items-center justify-center min-w-[58px] h-[58px] rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105
                ${isRegional
                  ? 'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 text-white'
                  : 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-tight opacity-90">
                  {date.toLocaleString('default', { month: 'short' })}
                </span>
                <span className="text-xl font-black leading-none">
                  {date.getDate()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-gray-900 truncate">{holiday.name}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider
                    ${isRegional
                      ? 'bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800'
                      : 'bg-gradient-to-r from-blue-200 to-indigo-200 text-blue-800'
                    }`}
                  >
                    {isRegional ? 'Assamese' : 'National'}
                  </span>
                  {isRegional && <span className="text-sm">🦏</span>}
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200/50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Assamese Regional Calendar
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default HolidayLegend;
