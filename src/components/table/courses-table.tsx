"use client";

import { Search } from "lucide-react";
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
import { courseCategories, courseFormats, courses, type CourseCategory, type CourseFormat } from "@/mocks/courses";

const categoryStyles: Record<CourseCategory, string> = {
  Compliance: "bg-red-500/15 text-red-500 border-red-500",
  Technical: "bg-primary/15 text-primary border-primary",
  Leadership: "bg-violet-600/15 text-violet-600 border-violet-600",
  "Soft Skills": "bg-cyan-500/15 text-cyan-600 border-cyan-500",
};

const rateColor = (rate: number) => {
  if (rate >= 80) return "bg-green-600";
  if (rate >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const CoursesTable = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | CourseCategory>("all");
  const [format, setFormat] = useState<"all" | CourseFormat>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery = !q || course.title.toLowerCase().includes(q);
      const matchesCategory = category === "all" || course.category === category;
      const matchesFormat = format === "all" || course.format === format;
      return matchesQuery && matchesCategory && matchesFormat;
    });
  }, [query, category, format]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[260px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses..."
            className="ps-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={category} onValueChange={(value) => setCategory(value as typeof category)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {courseCategories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={format} onValueChange={(value) => setFormat(value as typeof format)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All formats</SelectItem>
              {courseFormats.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
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
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Course</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Category</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Format</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Duration</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Enrolled</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg w-[180px]">Completion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No courses match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((course) => {
                const rate = Math.round((course.completed / course.enrolled) * 100);
                return (
                  <TableRow key={course.id}>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${categoryStyles[course.category]}`}>
                        {course.category}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      {course.format}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center whitespace-nowrap">
                      {course.durationHours}h
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                      {course.completed} / {course.enrolled}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-neutral-100 dark:bg-slate-700 overflow-hidden">
                          <div className={`h-full rounded-full ${rateColor(rate)}`} style={{ width: `${rate}%` }} />
                        </div>
                        <span className="text-sm text-neutral-500 dark:text-neutral-300 w-9 text-right">{rate}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {courses.length} courses
      </p>
    </div>
  );
};

export default CoursesTable;
