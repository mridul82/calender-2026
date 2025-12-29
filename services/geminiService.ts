
import { GoogleGenAI, Type } from "@google/genai";
import { Holiday, HolidayCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CACHE_KEY = 'holidays_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedData {
  year: number;
  holidays: Holiday[];
  timestamp: number;
}

const getCachedHolidays = (year: number): Holiday[] | null => {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${year}`);
    if (cached) {
      const data: CachedData = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_DURATION) {
        return data.holidays;
      }
    }
  } catch (e) {
    console.warn('Cache read failed:', e);
  }
  return null;
};

const setCachedHolidays = (year: number, holidays: Holiday[]): void => {
  try {
    const data: CachedData = { year, holidays, timestamp: Date.now() };
    localStorage.setItem(`${CACHE_KEY}_${year}`, JSON.stringify(data));
  } catch (e) {
    console.warn('Cache write failed:', e);
  }
};

export const fetchHolidaysForYear = async (year: number): Promise<Holiday[]> => {
  // Check cache first
  const cached = getCachedHolidays(year);
  if (cached) {
    console.log(`Using cached holidays for ${year}`);
    return cached;
  }

  const prompt = `Generate a JSON list of all significant Indian National holidays and Assamese regional holidays (including festivals like Bihu, Ambubachi, etc.) for the year ${year}. Ensure accuracy of dates for festivals that follow the lunar calendar. Output should be an array of objects with 'date' (YYYY-MM-DD), 'name', and 'category' (either 'National' or 'Assamese').`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              date: { type: Type.STRING },
              name: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["date", "name", "category"]
          }
        }
      }
    });

    const result = JSON.parse(response.text);
    const holidays = result.map((h: any) => ({
      ...h,
      category: h.category.toLowerCase().includes('assam') ? HolidayCategory.REGIONAL : HolidayCategory.NATIONAL
    }));

    // Cache the results
    setCachedHolidays(year, holidays);
    return holidays;
  } catch (error) {
    console.error("Failed to fetch holidays:", error);
    // Return some fallback hardcoded holidays if API fails
    return [
      { date: `${year}-01-26`, name: "Republic Day", category: HolidayCategory.NATIONAL },
      { date: `${year}-04-14`, name: "Bohag Bihu", category: HolidayCategory.REGIONAL },
      { date: `${year}-08-15`, name: "Independence Day", category: HolidayCategory.NATIONAL },
      { date: `${year}-10-02`, name: "Gandhi Jayanti", category: HolidayCategory.NATIONAL },
    ];
  }
};
