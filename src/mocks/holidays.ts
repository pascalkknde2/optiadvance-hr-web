export interface Holiday {
  name: string;
  date: string; // dd MMM yyyy
  note?: string;
}

// England & Wales public/bank holidays, 2026.
export const holidays: Holiday[] = [
  { name: "New Year's Day", date: "01 Jan 2026" },
  { name: "Good Friday", date: "03 Apr 2026" },
  { name: "Easter Monday", date: "06 Apr 2026" },
  { name: "Early May Bank Holiday", date: "04 May 2026" },
  { name: "Spring Bank Holiday", date: "25 May 2026" },
  { name: "Summer Bank Holiday", date: "31 Aug 2026" },
  { name: "Christmas Day", date: "25 Dec 2026" },
  { name: "Boxing Day", date: "28 Dec 2026", note: "Substitute day (26 Dec falls on a Saturday)" },
];

export const holidayRegion = "England & Wales";
