"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { leaveDayEvents, leaveTypeDotColors, type LeaveType } from "@/mocks/leave";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MAX_VISIBLE = 3;

const LeaveCalendar = () => {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  const eventsFor = (day: Date) => leaveDayEvents.filter((event) => isSameDay(event.date, day));

  return (
    <div className="card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h6 className="font-semibold mb-0">{format(month, "MMMM yyyy")}</h6>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setMonth((prev) => subMonths(prev, 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setMonth(startOfMonth(new Date()))}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={() => setMonth((prev) => addMonths(prev, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        {(Object.keys(leaveTypeDotColors) as LeaveType[]).map((type) => (
          <span key={type} className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-300">
            <span className={cn("w-2 h-2 rounded-full", leaveTypeDotColors[type])} />
            {type}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-px bg-neutral-200 dark:bg-slate-600 rounded-lg overflow-hidden border border-neutral-200 dark:border-slate-600">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="bg-neutral-100 dark:bg-slate-700 text-center text-sm font-medium py-2 text-neutral-600 dark:text-neutral-200"
          >
            {label}
          </div>
        ))}

        {days.map((day) => {
          const events = eventsFor(day);
          const visible = events.slice(0, MAX_VISIBLE);
          const overflow = events.length - visible.length;
          const inMonth = isSameMonth(day, month);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "bg-white dark:bg-slate-800 min-h-[104px] p-2 flex flex-col gap-1",
                !inMonth ? "opacity-40" : ""
              )}
            >
              <span
                className={cn(
                  "text-sm w-6 h-6 flex items-center justify-center rounded-full",
                  isToday(day) ? "bg-primary text-white font-semibold" : "text-neutral-600 dark:text-neutral-300"
                )}
              >
                {format(day, "d")}
              </span>

              <div className="flex flex-col gap-1">
                {visible.map((event) => (
                  <span
                    key={`${event.employeeId}-${event.date.toISOString()}`}
                    className="flex items-center gap-1.5 text-xs truncate"
                    title={`${event.employeeName} · ${event.type}`}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", leaveTypeDotColors[event.type])} />
                    <span className="truncate">{event.employeeName.split(" ")[0]}</span>
                  </span>
                ))}
                {overflow > 0 && (
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">+{overflow} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveCalendar;
