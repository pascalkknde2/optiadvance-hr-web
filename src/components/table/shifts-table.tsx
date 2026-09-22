"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
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
import { departments } from "@/mocks/employees";
import { shiftRoster, shiftWeek, type ShiftCode } from "@/mocks/shifts";

const shiftStyles: Record<ShiftCode, string> = {
  Morning: "bg-yellow-500/15 text-yellow-600 border-yellow-500",
  Day: "bg-primary/15 text-primary border-primary",
  Evening: "bg-violet-600/15 text-violet-600 border-violet-600",
  Off: "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
};

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const ShiftsTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shiftRoster.filter((roster) => {
      const matchesQuery =
        !q ||
        roster.employeeName.toLowerCase().includes(q) ||
        roster.department.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || roster.department === department;
      return matchesQuery && matchesDepartment;
    });
  }, [query, department]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-300">Week of</p>
          <h6 className="font-semibold mb-0">{shiftWeek}</h6>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-[220px]">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search employees..."
              className="ps-9"
            />
          </div>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Employee</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Department</TableHead>
              {dayLabels.map((day) => (
                <TableHead key={day} className="px-3 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 last:rounded-tr-lg">
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No roster entries match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((roster) => (
                <TableRow key={roster.employeeId}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={roster.avatar}
                        alt={roster.employeeName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <p className="text-sm font-medium truncate">{roster.employeeName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {roster.department}
                  </TableCell>
                  {roster.days.map((shift, i) => (
                    <TableCell key={i} className="py-3 px-3 border-b border-neutral-200 dark:border-slate-600 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${shiftStyles[shift]}`}>
                        {shift}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {shiftRoster.length} employees
      </p>
    </div>
  );
};

export default ShiftsTable;
