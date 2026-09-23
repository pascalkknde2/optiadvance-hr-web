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
import { earningLines, earningTypes, type EarningType } from "@/mocks/earnings";

const typeStyles: Record<EarningType, string> = {
  Overtime: "bg-yellow-500/15 text-yellow-600 border-yellow-500",
  Commission: "bg-green-600/15 text-green-600 border-green-600",
  Bonus: "bg-violet-600/15 text-violet-600 border-violet-600",
  Allowance: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

const EarningsTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [type, setType] = useState<"all" | EarningType>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return earningLines.filter((line) => {
      const matchesQuery =
        !q ||
        line.employeeName.toLowerCase().includes(q) ||
        line.description.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || line.department === department;
      const matchesType = type === "all" || line.type === type;
      return matchesQuery && matchesDepartment && matchesType;
    });
  }, [query, department, type]);

  const total = filtered.reduce((sum, line) => sum + line.amount, 0);

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

          <Select value={type} onValueChange={(value) => setType(value as typeof type)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {earningTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
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
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Type</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Description</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No earnings match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((line) => (
                <TableRow key={line.id}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={line.avatar}
                        alt={line.employeeName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <p className="text-sm font-medium truncate">{line.employeeName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${typeStyles[line.type]}`}>
                      {line.type}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {line.description}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end font-medium whitespace-nowrap">
                    {gbp(line.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} line items · {gbp(total)} total
      </p>
    </div>
  );
};

export default EarningsTable;
