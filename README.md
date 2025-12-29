# Assamese & National Indian Calendar 🗓️

A high-performance, aesthetically pleasing yearly calendar web application designed for the modern user. This tool provides a comprehensive 12-month overview featuring Indian National holidays and specific Assamese regional festivals, optimized for both digital viewing and high-quality physical printing.

## ✨ Key Features

- **All-in-One View**: See the entire year at a glance with a clean, grid-based interface.
- **AI-Powered Holidays**: Uses Google Gemini API (Gemini 3 Flash) to dynamically fetch and calculate accurate dates for lunar-based festivals like Bihu, Eid, and Diwali.
- **Assamese Cultural Focus**: Native support for regional holidays (Bohag Bihu, Magh Bihu, Kati Bihu, Ambubachi Mela, etc.) with cultural motifs.
- **Colorful Seasonal Themes**: Each month features a unique color palette reflecting its seasonal characteristics (e.g., Saffron for Spring, Teal for Monsoon).
- **Print Optimization**: Dedicated "Print-to-Paper" engine that re-layouts the calendar into a 3x4 landscape grid for perfect A4/Legal size prints.
- **Interactive UI**: Hover states for holiday details and smooth transitions between years.

## 🛠️ Technical Stack

- **Frontend**: React 19 (Hooks, Functional Components)
- **Styling**: Tailwind CSS for responsive and print-ready utility-first design.
- **AI Engine**: `@google/genai` (Gemini 3 Flash) for intelligent holiday scheduling.
- **Typography**: Playfair Display (Serif) for a classic calendar look and Inter (Sans) for maximum readability.

## 🚀 How It Works

1. **Initialization**: On load, the app communicates with the Gemini API to retrieve the official holiday list for the selected year.
2. **Holiday Mapping**: National holidays are highlighted in solid red, while Assamese regional festivals use a distinctive dashed-border aesthetic.
3. **Printing**: When the user clicks "Print Calendar", the application applies specific `@media print` CSS rules to hide UI elements and format the grid for landscape orientation.

## 📄 License

This project is designed as a template for high-quality regional calendar applications. Feel free to fork and adapt it for other regional needs!

---
*Developed with ❤️ for the community.*
