
import { GoogleGenAI, Type } from "@google/genai";
import { Holiday, HolidayCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchHolidaysForYear = async (year: number): Promise<Holiday[]> => {
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
    return result.map((h: any) => ({
      ...h,
      category: h.category.toLowerCase().includes('assam') ? HolidayCategory.REGIONAL : HolidayCategory.NATIONAL
    }));
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
