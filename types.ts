
export enum HolidayCategory {
  NATIONAL = 'National',
  REGIONAL = 'Assamese',
  OTHER = 'Other'
}

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  category: HolidayCategory;
  description?: string;
}

export interface CalendarMonth {
  index: number;
  name: string;
  days: number;
  startDay: number;
}
