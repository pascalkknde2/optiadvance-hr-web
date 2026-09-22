"use client";

import { Check, Search, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
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
import { timesheets, timesheetWeek, type TimesheetStatus } from "@/mocks/timesheets";

const statusStyles: Record<TimesheetStatus, string> = {
  Approved: "bg-green-600/15 text-green-600 border-green-600",
  Submitted: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Draft: "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
  Rejected: "bg-red-500/15 text-red-500 border-red-500",
};

const statuses: TimesheetStatus[] = ["Approved", "Submitted", "Draft", "Rejected"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const TimesheetsTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState<"all" | TimesheetStatus>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return timesheets.filter((sheet) => {
      const matchesQuery =
        !q ||
        sheet.employeeName.toLowerCase().includes(q) ||
        sheet.department.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || sheet.department === department;
      const matchesStatus = status === "all" || sheet.status === status;
      return matchesQuery && matchesDepartment && matchesStatus;
    });
  }, [query, department, status]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-300">Week of</p>
          <h6 className="font-semibold mb-0">{timesheetWeek}</h6>
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

          <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
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
              {dayLabels.map((day) => (
                <TableHead key={day} className="px-3 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">
                  {day}
                </TableHead>
              ))}
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Total</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Status</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No timesheets match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((sheet) => (
                <TableRow key={sheet.employeeId}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={sheet.avatar}
                        alt={sheet.employeeName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{sheet.employeeName}</p>
                        {sheet.note && (
                          <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{sheet.note}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  {sheet.days.map((hours, i) => (
                    <TableCell key={i} className="py-3 px-3 border-b border-neutral-200 dark:border-slate-600 text-center">
                      {hours > 0 ? hours : <span className="text-neutral-400 dark:text-neutral-500">—</span>}
                    </TableCell>
                  ))}
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center font-medium">
                    {sheet.total}h
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${statusStyles[sheet.status]}`}>
                      {sheet.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    {sheet.status === "Submitted" ? (
                      <div className="flex justify-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full text-green-600 bg-green-600/10"
                          onClick={() => toast.success(`${sheet.employeeName}'s timesheet approved (preview only).`)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full text-red-500 bg-red-500/10"
                          onClick={() => toast.error(`${sheet.employeeName}'s timesheet rejected (preview only).`)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-neutral-400 dark:text-neutral-500">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {timesheets.length} timesheets
      </p>
    </div>
  );
};

export default TimesheetsTable;
