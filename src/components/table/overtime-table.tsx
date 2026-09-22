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
import { overtimeRequests, type OvertimeStatus } from "@/mocks/overtime";

const statusStyles: Record<OvertimeStatus, string> = {
  Pending: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Approved: "bg-green-600/15 text-green-600 border-green-600",
  Rejected: "bg-red-500/15 text-red-500 border-red-500",
  Paid: "bg-violet-600/15 text-violet-600 border-violet-600",
};

const statuses: OvertimeStatus[] = ["Pending", "Approved", "Rejected", "Paid"];

const OvertimeTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState<"all" | OvertimeStatus>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return overtimeRequests.filter((request) => {
      const matchesQuery =
        !q ||
        request.employeeName.toLowerCase().includes(q) ||
        request.reason.toLowerCase().includes(q) ||
        request.department.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || request.department === department;
      const matchesStatus = status === "all" || request.status === status;
      return matchesQuery && matchesDepartment && matchesStatus;
    });
  }, [query, department, status]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search employees or reason..."
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
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Reason</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Date</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Hours</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Cost</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Status</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No overtime requests match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={request.avatar}
                        alt={request.employeeName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{request.employeeName}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{request.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {request.reason}
                    {request.note && (
                      <span className="block text-sm text-neutral-500 dark:text-neutral-300">{request.note}</span>
                    )}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                    {request.date}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    {request.hours}h
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end whitespace-nowrap">
                    £{(request.hours * request.rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${statusStyles[request.status]}`}>
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    {request.status === "Pending" ? (
                      <div className="flex justify-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full text-green-600 bg-green-600/10"
                          onClick={() => toast.success(`${request.employeeName}'s overtime approved (preview only).`)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full text-red-500 bg-red-500/10"
                          onClick={() => toast.error(`${request.employeeName}'s overtime rejected (preview only).`)}
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
        {filtered.length} of {overtimeRequests.length} requests
      </p>
    </div>
  );
};

export default OvertimeTable;
