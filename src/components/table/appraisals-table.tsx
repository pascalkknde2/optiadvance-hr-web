"use client";

import { Award, Search } from "lucide-react";
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
import { appraisals, type CalibrationStatus } from "@/mocks/appraisals";
import { departments } from "@/mocks/employees";
import type { ReviewRating } from "@/mocks/reviews";

const ratingStyles: Record<ReviewRating, string> = {
  "Exceeds Expectations": "bg-primary/15 text-primary border-primary",
  "Meets Expectations": "bg-green-600/15 text-green-600 border-green-600",
  "Development Needed": "bg-red-500/15 text-red-500 border-red-500",
};

const calibrationStyles: Record<CalibrationStatus, string> = {
  "Pending Calibration": "bg-yellow-500/15 text-yellow-600 border-yellow-500",
  "Signed Off": "bg-green-600/15 text-green-600 border-green-600",
};

const AppraisalsTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [calibration, setCalibration] = useState<"all" | CalibrationStatus>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return appraisals.filter((appraisal) => {
      const matchesQuery = !q || appraisal.employeeName.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || appraisal.department === department;
      const matchesCalibration = calibration === "all" || appraisal.calibrationStatus === calibration;
      return matchesQuery && matchesDepartment && matchesCalibration;
    });
  }, [query, department, calibration]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[240px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search employees..."
            className="ps-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
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

          <Select value={calibration} onValueChange={(value) => setCalibration(value as typeof calibration)}>
            <SelectTrigger className="w-[190px]">
              <SelectValue placeholder="Calibration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All calibration</SelectItem>
              <SelectItem value="Pending Calibration">Pending Calibration</SelectItem>
              <SelectItem value="Signed Off">Signed Off</SelectItem>
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
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Rating</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Score</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Rec. Increase</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Promotion</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Calibration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No appraisals match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((appraisal) => (
                <TableRow key={appraisal.employeeId}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={appraisal.avatar}
                        alt={appraisal.employeeName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{appraisal.employeeName}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{appraisal.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${ratingStyles[appraisal.rating]}`}>
                      {appraisal.rating}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center font-medium">
                    {appraisal.score.toFixed(1)}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center text-green-600 dark:text-green-400">
                    +{appraisal.recommendedIncrease}%
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    {appraisal.promotionRecommended ? (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        <Award className="w-4 h-4" />
                        Recommended
                      </span>
                    ) : (
                      <span className="text-neutral-400 dark:text-neutral-500">—</span>
                    )}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${calibrationStyles[appraisal.calibrationStatus]}`}>
                      {appraisal.calibrationStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {appraisals.length} appraisals
      </p>
    </div>
  );
};

export default AppraisalsTable;
