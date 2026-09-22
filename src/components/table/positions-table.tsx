"use client";

import { Plus, Search } from "lucide-react";
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
import { positionDepartments, positions, type PositionGrade } from "@/mocks/positions";

const gradeStyles: Record<PositionGrade, string> = {
  Leadership: "bg-violet-600/15 text-violet-600 border-violet-600",
  Senior: "bg-primary/15 text-primary border-primary",
  Mid: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Junior: "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
};

const PositionsTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [grade, setGrade] = useState<"all" | PositionGrade>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return positions.filter((position) => {
      const matchesQuery =
        !q ||
        position.title.toLowerCase().includes(q) ||
        position.department.toLowerCase().includes(q) ||
        position.reportsTo.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || position.department === department;
      const matchesGrade = grade === "all" || position.grade === grade;
      return matchesQuery && matchesDepartment && matchesGrade;
    });
  }, [query, department, grade]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search positions..."
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
              {positionDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={grade} onValueChange={(value) => setGrade(value as typeof grade)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All grades</SelectItem>
              <SelectItem value="Leadership">Leadership</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
              <SelectItem value="Mid">Mid</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => toast("Add Position isn't wired up yet.")}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Position
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Position</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Department</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Grade</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Filled</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Open</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Salary Band</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Reports To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No positions match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((position) => (
                <TableRow key={position.title}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 font-medium">
                    {position.title}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {position.department}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${gradeStyles[position.grade]}`}>
                      {position.grade}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    {position.headcount}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    {position.openings > 0 ? (
                      <span className="px-2.5 py-1 rounded text-xs font-medium bg-cyan-500/15 text-cyan-600 border border-cyan-500">
                        {position.openings} open
                      </span>
                    ) : (
                      <span className="text-neutral-400 dark:text-neutral-500">—</span>
                    )}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                    {position.salaryBand}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {position.reportsTo}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {positions.length} positions
      </p>
    </div>
  );
};

export default PositionsTable;
