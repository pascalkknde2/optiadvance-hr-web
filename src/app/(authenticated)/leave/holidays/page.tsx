import { differenceInCalendarDays, isFuture, parse } from "date-fns";
import { CalendarHeart, Globe2, PartyPopper } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import HolidaysTable from "@/components/table/holidays-table";
import { holidayRegion, holidays } from "@/mocks/holidays";

export const metadata: Metadata = {
  title: "Holidays | OptiAdvance HR",
  description: "Company public holiday calendar.",
};

export default function HolidaysPage() {
  const now = new Date();
  const parsed = holidays.map((holiday) => ({
    ...holiday,
    parsed: parse(holiday.date, "dd MMM yyyy", new Date()),
  }));

  const upcoming = parsed.filter((holiday) => isFuture(holiday.parsed));
  const next = upcoming[0];

  const summary = [
    { label: "Total Holidays", value: holidays.length, icon: PartyPopper },
    { label: "Upcoming", value: upcoming.length, icon: CalendarHeart },
    {
      label: next ? `Next: ${next.name}` : "Next Holiday",
      value: next ? `${differenceInCalendarDays(next.parsed, now)}d` : "—",
      icon: CalendarHeart,
    },
    { label: "Region", value: holidayRegion, icon: Globe2 },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Leave" text="Holidays" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {summary.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">{label}</p>
              <h5 className="font-semibold mb-0">{value}</h5>
            </div>
          </div>
        ))}
      </div>

      <HolidaysTable />
    </>
  );
}
