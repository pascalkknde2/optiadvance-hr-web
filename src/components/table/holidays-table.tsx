"use client";

import { format, isFuture, isToday, parse } from "date-fns";
import { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { holidays } from "@/mocks/holidays";

type Filter = "all" | "upcoming" | "past";

const parseDate = (date: string) => parse(date, "dd MMM yyyy", new Date());

const HolidaysTable = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(() => {
    return holidays
      .map((holiday) => {
        const parsed = parseDate(holiday.date);
        const status = isToday(parsed) ? "Today" : isFuture(parsed) ? "Upcoming" : "Past";
        return { ...holiday, parsed, status };
      })
      .filter((holiday) => {
        if (filter === "all") return true;
        if (filter === "upcoming") return holiday.status === "Upcoming" || holiday.status === "Today";
        return holiday.status === "Past";
      });
  }, [filter]);

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h6 className="font-semibold mb-0">2026 Bank Holidays</h6>

        <Select value={filter} onValueChange={(value) => setFilter(value as Filter)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Holiday</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Date</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Day</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No holidays match this filter.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((holiday) => (
                <TableRow key={holiday.name}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <p className="text-sm font-medium">{holiday.name}</p>
                    {holiday.note && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">{holiday.note}</p>
                    )}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                    {holiday.date}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {format(holiday.parsed, "EEEE")}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span
                      className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${
                        holiday.status === "Past"
                          ? "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400"
                          : "bg-primary/15 text-primary border-primary"
                      }`}
                    >
                      {holiday.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HolidaysTable;
