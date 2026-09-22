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
import { leaveBalances } from "@/mocks/leave-balances";

const barColor = (remaining: number) => {
  if (remaining <= 3) return "bg-red-500";
  if (remaining <= 8) return "bg-yellow-500";
  return "bg-green-600";
};

const LeaveBalancesTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leaveBalances.filter((balance) => {
      const matchesQuery =
        !q ||
        balance.employeeName.toLowerCase().includes(q) ||
        balance.department.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || balance.department === department;
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

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Employee</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Department</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Entitlement</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Used</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Remaining</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg w-[180px]">Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No employees match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((balance) => (
                <TableRow key={balance.employeeId}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={balance.avatar}
                        alt={balance.employeeName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <p className="text-sm font-medium truncate">{balance.employeeName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {balance.department}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    {balance.entitlement}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    {balance.used}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center font-medium">
                    {balance.remaining}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-neutral-100 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor(balance.remaining)}`}
                          style={{ width: `${balance.percentUsed}%` }}
                        />
                      </div>
                      <span className="text-sm text-neutral-500 dark:text-neutral-300 w-9 text-right">
                        {balance.percentUsed}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {leaveBalances.length} employees
      </p>
    </div>
  );
};

export default LeaveBalancesTable;
