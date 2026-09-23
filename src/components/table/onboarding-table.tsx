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
import { CHECKLIST_ITEMS, newHires, type OnboardingStatus } from "@/mocks/onboarding";

const statusStyles: Record<OnboardingStatus, string> = {
  "Not Started": "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
  "In Progress": "bg-yellow-500/15 text-yellow-600 border-yellow-500",
  Completed: "bg-green-600/15 text-green-600 border-green-600",
};

const statuses: OnboardingStatus[] = ["Not Started", "In Progress", "Completed"];

const OnboardingTable = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | OnboardingStatus>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return newHires.filter((hire) => {
      const matchesQuery =
        !q ||
        hire.name.toLowerCase().includes(q) ||
        hire.jobTitle.toLowerCase().includes(q) ||
        hire.department.toLowerCase().includes(q);
      const matchesStatus = status === "all" || hire.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[260px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search new hire, role..."
            className="ps-9"
          />
        </div>

        <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
          <SelectTrigger className="w-[160px]">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">New Hire</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Department</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Start Date</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Onboarding Buddy</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 w-[180px]">Checklist</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No new hires match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((hire) => {
                const percent = Math.round((hire.tasksDone / CHECKLIST_ITEMS.length) * 100);
                return (
                  <TableRow key={hire.id}>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <div className="flex items-center gap-3">
                        <Image
                          src={hire.avatar}
                          alt={hire.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{hire.name}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{hire.jobTitle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      {hire.department}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                      {hire.startDate}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      {hire.buddy}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-neutral-100 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-sm text-neutral-500 dark:text-neutral-300 whitespace-nowrap">
                          {hire.tasksDone}/{CHECKLIST_ITEMS.length}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                      <span className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${statusStyles[hire.status]}`}>
                        {hire.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {newHires.length} new hires
      </p>
    </div>
  );
};

export default OnboardingTable;
