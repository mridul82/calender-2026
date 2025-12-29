
import React, { useState, useEffect } from 'react';
import MonthView from './components/MonthView';
import HolidayLegend from './components/HolidayLegend';
import { Holiday } from './types';
import { fetchHolidaysForYear } from './services/geminiService';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const App: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHolidays = async () => {
      setLoading(true);
      const data = await fetchHolidaysForYear(year);
      setHolidays(data);
      setLoading(false);
    };
    loadHolidays();
  }, [year]);

  const handlePrint = () => {
    // Small timeout to ensure any state changes or hovers are cleared
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const changeYear = (delta: number) => {
    setYear(prev => prev + delta);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Gamusa-inspired Top Border */}
      <div className="h-2 w-full gamusa-pattern no-print"></div>

      <header className="no-print bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="bg-red-600 p-3 rounded-2xl text-white shadow-xl shadow-red-200 rotate-3 transform transition hover:rotate-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white animate-bounce"></div>
            </div>
            <div>
              <h1 className="month-title text-3xl font-black text-gray-900 leading-none">Indo-Assamese</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-red-600 font-black uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">Regional & National Calendar</span>
                <span className="text-[10px] text-orange-600 font-black uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded">Axom Bihu Edition</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-900 rounded-2xl p-1.5 shadow-inner">
              <button 
                onClick={() => changeYear(-1)}
                className="p-2 hover:bg-gray-800 rounded-xl transition-all text-white/50 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="px-6 font-black text-2xl text-white month-title italic">{year}</span>
              <button 
                onClick={() => changeYear(1)}
                className="p-2 hover:bg-gray-800 rounded-xl transition-all text-white/50 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <button 
              onClick={handlePrint}
              className="group flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-200 active:scale-95 border-b-4 border-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="font-bold uppercase tracking-tight">Print Calendar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Print-Only Title Header */}
      <div className="hidden print-only text-center mb-10">
        <h1 className="month-title text-5xl font-black text-gray-900">{year} CALENDAR</h1>
        <p className="text-sm font-bold tracking-[0.3em] text-red-600 mt-2">NATIONAL & ASSAMESE REGIONAL HOLIDAYS</p>
      </div>

      <main className="flex-1 w-full max-w-[1700px] mx-auto p-6 md:p-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🦏</div>
            </div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-sm animate-pulse">Syncing Lunar Dates for {year}...</p>
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-12">
            {/* Calendar Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 calendar-grid">
                {months.map((name, index) => (
                  <MonthView 
                    key={index}
                    year={year}
                    monthIndex={index}
                    monthName={name}
                    holidays={holidays}
                  />
                ))}
              </div>
            </div>

            {/* Holiday Sidebar */}
            <div className="w-full xl:w-[400px] no-print">
              <HolidayLegend holidays={holidays} />
            </div>

            {/* Print Only Legend Section */}
            <div className="hidden print-only mt-12 pt-8" style={{ pageBreakBefore: 'always' }}>
              <div className="border-t-4 border-black pt-6">
                <h2 className="month-title text-4xl font-black mb-8 uppercase italic">{year} HOLIDAY REFERENCE</h2>
                <div className="grid grid-cols-3 gap-x-12 gap-y-4">
                  {holidays.sort((a,b) => a.date.localeCompare(b.date)).map((h, i) => (
                    <div key={i} className="flex gap-4 items-center py-2 border-b border-gray-100">
                      <span className="font-black text-xs text-red-600 whitespace-nowrap bg-red-50 px-2 py-0.5 rounded">{h.date}</span>
                      <span className="font-bold text-gray-800 text-xs truncate">{h.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="no-print p-12 text-center mt-auto">
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/50 backdrop-blur rounded-full border border-gray-100 shadow-sm">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
             AI Powered Accurate Regional Dates • Axom Special Edition
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
