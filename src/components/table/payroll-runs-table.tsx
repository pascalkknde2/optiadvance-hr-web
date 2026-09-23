"use client";

import { Play } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { payrollRuns, netPay, type PayrollRunStatus } from "@/mocks/payroll-runs";

const statusStyles: Record<PayrollRunStatus, string> = {
  Draft: "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
  Approved: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Paid: "bg-green-600/15 text-green-600 border-green-600",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

const PayrollRunsTable = () => {
  return (
    <div className="card">
      <h6 className="font-semibold mb-5">Payroll Runs</h6>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Period</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Run Date</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Employees</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Gross Pay</TableHead>
              <TableHead className="px-4 h-12 text-end bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Net Pay</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Status</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollRuns.map((run) => (
              <TableRow key={run.id}>
                <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 font-medium">
                  {run.period}
                </TableCell>
                <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                  {run.runDate}
                </TableCell>
                <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                  {run.employees.toLocaleString()}
                </TableCell>
                <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end whitespace-nowrap">
                  {gbp(run.gross)}
                </TableCell>
                <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-end whitespace-nowrap font-medium">
                  {gbp(netPay(run))}
                </TableCell>
                <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                  <span className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${statusStyles[run.status]}`}>
                    {run.status}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                  {run.status === "Draft" ? (
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={() => toast.success(`${run.period} payroll run started (preview only).`)}
                    >
                      <Play className="w-3.5 h-3.5" />
                      Run
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast(`${run.period} payroll details aren't wired up yet.`)}
                    >
                      View
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PayrollRunsTable;
