"use client";

import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { Search, TrendingUp } from "lucide-react";
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
import { salaries } from "@/mocks/salaries";

const gradeStyles: Record<string, string> = {
  Leadership: "bg-violet-600/15 text-violet-600 border-violet-600",
  Senior: "bg-primary/15 text-primary border-primary",
  Mid: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Junior: "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

const SalariesTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return salaries.filter((salary) => {
      const matchesQuery =
        !q ||
        salary.employeeName.toLowerCase().includes(q) ||
        salary.position.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || salary.department === department;
      return matchesQuery && matchesDepartment;
    });
  }, [query, department]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search employees or roles..."
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

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Employee</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Grade</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Annual Salary</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Last Change</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Last Review</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Next Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No salary records match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((salary) => {
                const nextReview = parseISO(salary.nextReviewDate);
                const daysUntilReview = differenceInCalendarDays(nextReview, new Date());
                const dueSoon = daysUntilReview >= 0 && daysUntilReview <= 60;

                return (
                  <TableRow key={salary.employeeId}>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <div className="flex items-center gap-3">
                        <Image
                          src={salary.avatar}
                          alt={salary.employeeName}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{salary.employeeName}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{salary.position}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${gradeStyles[salary.grade]}`}>
                        {salary.grade}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end font-medium whitespace-nowrap">
                      {gbp(salary.annualSalary)}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                        <TrendingUp className="w-3.5 h-3.5" />+{salary.changePercent}%
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                      {format(parseISO(salary.lastReviewDate), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                      {format(nextReview, "dd MMM yyyy")}
                      {dueSoon && (
                        <span className="ms-2 px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/15 text-yellow-600 border border-yellow-500">
                          Due soon
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {salaries.length} employees
      </p>
    </div>
  );
};

export default SalariesTable;
