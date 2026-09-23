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
import { goalStatuses, goalTypes, goals, type GoalStatus, type GoalType } from "@/mocks/goals";

const statusStyles: Record<GoalStatus, string> = {
  "On Track": "bg-green-600/15 text-green-600 border-green-600",
  "At Risk": "bg-yellow-500/15 text-yellow-600 border-yellow-500",
  Completed: "bg-primary/15 text-primary border-primary",
  "Not Started": "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
};

const typeStyles: Record<GoalType, string> = {
  Individual: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Team: "bg-violet-600/15 text-violet-600 border-violet-600",
  Company: "bg-primary/15 text-primary border-primary",
};

const barColor: Record<GoalStatus, string> = {
  "On Track": "bg-green-600",
  "At Risk": "bg-yellow-500",
  Completed: "bg-primary",
  "Not Started": "bg-gray-400",
};

const GoalsTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [type, setType] = useState<"all" | GoalType>("all");
  const [status, setStatus] = useState<"all" | GoalStatus>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return goals.filter((goal) => {
      const matchesQuery =
        !q ||
        goal.employeeName.toLowerCase().includes(q) ||
        goal.title.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || goal.department === department;
      const matchesType = type === "all" || goal.type === type;
      const matchesStatus = status === "all" || goal.status === status;
      return matchesQuery && matchesDepartment && matchesType && matchesStatus;
    });
  }, [query, department, type, status]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[240px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search employees or goals..."
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

          <Select value={type} onValueChange={(value) => setType(value as typeof type)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {goalTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
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
              {goalStatuses.map((s) => (
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
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Goal</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Type</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 w-[180px]">Progress</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Due</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No goals match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={goal.avatar}
                        alt={goal.employeeName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{goal.employeeName}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{goal.cycle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 max-w-[260px]">
                    {goal.title}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${typeStyles[goal.type]}`}>
                      {goal.type}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-neutral-100 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor[goal.status]}`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-neutral-500 dark:text-neutral-300 w-9 text-right">
                        {goal.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                    {goal.dueDate}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${statusStyles[goal.status]}`}>
                      {goal.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {goals.length} goals
      </p>
    </div>
  );
};

export default GoalsTable;
