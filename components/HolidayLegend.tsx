
import React from 'react';
import { Holiday, HolidayCategory } from '../types';

interface HolidayLegendProps {
  holidays: Holiday[];
}

const HolidayLegend: React.FC<HolidayLegendProps> = ({ holidays }) => {
  const sortedHolidays = [...holidays].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="paper-texture p-6 rounded-3xl shadow-2xl border-2 border-white sticky top-28 max-h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="month-title text-2xl font-black text-gray-900 flex items-center gap-2">
          <span className="text-red-600">🔔</span>
          Festival List
        </h2>
        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">{holidays.length} EVENTS</span>
      </div>

      <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {sortedHolidays.map((holiday, idx) => {
          const isRegional = holiday.category === HolidayCategory.REGIONAL;
          const date = new Date(holiday.date);
          
          return (
            <div key={idx} className={`group flex items-center gap-4 p-3 rounded-2xl transition-all border ${isRegional ? 'bg-orange-50/50 border-orange-100 hover:bg-orange-100' : 'bg-blue-50/30 border-blue-50 hover:bg-blue-50'}`}>
              <div className={`flex flex-col items-center justify-center min-w-[54px] h-[54px] rounded-xl shadow-sm border ${isRegional ? 'bg-orange-500 text-white border-orange-400' : 'bg-blue-600 text-white border-blue-500'}`}>
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-80">
                  {date.toLocaleString('default', { month: 'short' })}
                </span>
                <span className="text-xl font-black leading-none">
                  {date.getDate()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-gray-900">{holiday.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${isRegional ? 'bg-orange-200 text-orange-800' : 'bg-blue-200 text-blue-800'}`}>
                    {isRegional ? 'Assamese' : 'National'}
                  </span>
                  {isRegional && <span className="text-[10px]">🦏</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between opacity-50 text-[10px] font-bold uppercase tracking-widest text-gray-500">
        <span>Assamese Regional Calendar</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default HolidayLegend;
