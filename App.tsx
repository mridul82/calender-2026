
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

      <header className="no-print bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-30 px-6 py-5 shadow-lg shadow-black/5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-orange-600 p-3.5 rounded-2xl text-white shadow-2xl rotate-3 transform transition-all duration-300 group-hover:rotate-0 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
            </div>
            <div>
              <h1 className="month-title text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-none">Indo-Assamese</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[10px] text-red-700 font-black uppercase tracking-widest bg-gradient-to-r from-red-100 to-pink-100 px-3 py-1 rounded-full border border-red-200">Regional & National Calendar</span>
                <span className="text-[10px] text-orange-700 font-black uppercase tracking-widest bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1 rounded-full border border-orange-200">Axom Bihu Edition</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-1.5 shadow-xl shadow-gray-900/20">
              <button
                onClick={() => changeYear(-1)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-white/50 hover:text-white active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="px-6 font-black text-2xl md:text-3xl text-white month-title italic">{year}</span>
              <button
                onClick={() => changeYear(1)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-white/50 hover:text-white active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="group relative flex items-center gap-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-6 py-3.5 rounded-2xl hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all shadow-xl shadow-red-500/30 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="font-bold uppercase tracking-tight relative z-10">Print Calendar</span>
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
          <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-30 animate-pulse"></div>
              {/* Main spinner */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 border-r-orange-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-amber-400 border-l-yellow-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl animate-bounce">🦏</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-black uppercase tracking-widest text-sm">Loading Calendar</p>
              <p className="text-gray-400 text-xs mt-1 animate-pulse">Syncing holidays for {year}...</p>
            </div>
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
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/70 backdrop-blur-xl rounded-full border border-white/50 shadow-xl shadow-gray-200/50">
           <div className="relative">
             <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse"></div>
             <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-50"></div>
           </div>
           <p className="text-gray-600 text-[11px] font-black uppercase tracking-[0.2em]">
             AI Powered Accurate Regional Dates
           </p>
           <span className="w-1 h-1 rounded-full bg-gray-300"></span>
           <span className="text-[10px] font-bold text-orange-600 bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1 rounded-full">Axom Special Edition</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
