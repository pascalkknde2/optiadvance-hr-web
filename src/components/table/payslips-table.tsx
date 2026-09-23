"use client";

import { Download, Search } from "lucide-react";
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
import { payslipPeriods, payslips, type PayslipStatus } from "@/mocks/payslips";

const statusStyles: Record<PayslipStatus, string> = {
  Issued: "bg-green-600/15 text-green-600 border-green-600",
  Processing: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

const PayslipsTable = () => {
  const [period, setPeriod] = useState(payslipPeriods[0]?.period ?? "");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return payslips.filter((slip) => {
      if (slip.period !== period) return false;
      const matchesQuery =
        !q ||
        slip.employeeName.toLowerCase().includes(q) ||
        slip.position.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || slip.department === department;
      return matchesQuery && matchesDepartment;
    });
  }, [period, query, department]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              {payslipPeriods.map(({ period: p }) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-[240px]">
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Employee</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Gross</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Tax & NI</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Pension</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Net Pay</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Status</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No payslips match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((slip) => (
                <TableRow key={slip.id}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={slip.avatar}
                        alt={slip.employeeName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{slip.employeeName}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{slip.position}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end whitespace-nowrap">
                    {gbp(slip.gross)}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end whitespace-nowrap text-red-500">
                    −{gbp(slip.taxAndNI)}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end whitespace-nowrap text-red-500">
                    −{gbp(slip.pension)}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end whitespace-nowrap font-medium">
                    {gbp(slip.netPay)}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${statusStyles[slip.status]}`}>
                      {slip.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full text-primary bg-primary/10"
                      onClick={() => toast(`${slip.employeeName}'s payslip download isn't wired up yet.`)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} payslips for {period}
      </p>
    </div>
  );
};

export default PayslipsTable;
