import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import PrintButton from "@/components/payroll/print-button";
import { gbp, getPayslipBreakdown } from "@/lib/payslip";
import { employees } from "@/mocks/employees";
import { payrollRuns } from "@/mocks/payroll-runs";
import { payslips } from "@/mocks/payslips";

export const metadata: Metadata = {
  title: "Payslip | OptiAdvance HR",
  description: "Itemised payslip, ready to print or save as PDF.",
};

export default async function PayslipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slip = payslips.find((candidate) => candidate.id === decodeURIComponent(id));

  if (!slip) {
    return (
      <div className="card py-16 text-center">
        <p className="text-neutral-500 dark:text-neutral-300 mb-4">Payslip not found.</p>
        <Link href="/payroll/payslips" className="font-medium text-primary hover:underline">
          Back to Payslips
        </Link>
      </div>
    );
  }

  const employee = employees.find((candidate) => candidate.id === slip.employeeId);
  const run = payrollRuns.find((candidate) => candidate.period === slip.period);
  const { basicPay, extraEarnings, itemisedDeductions } = getPayslipBreakdown(slip);
  const totalDeductions = slip.gross - slip.netPay;

  return (
    <>
      <div className="print:hidden mb-6 flex items-center justify-between">
        <Link
          href="/payroll/payslips"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Payslips
        </Link>
        <PrintButton />
      </div>

      <div className="card mx-auto max-w-3xl print:border-0 print:shadow-none">
        {/* Letterhead */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 dark:border-slate-600 pb-6 mb-6">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, next/image's optimizer rejects local SVGs without extra config */}
            <img src="/logo/optiadvance-logo-refined.svg" alt="OptiAdvance" width={160} height={38} />
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-300">1 Aldgate Square, London, EC3N 1AH</p>
          </div>
          <div className="text-right">
            <h5 className="font-semibold mb-1">Payslip</h5>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">{slip.period}</p>
            {run && <p className="text-sm text-neutral-500 dark:text-neutral-300">Pay date: {run.runDate}</p>}
          </div>
        </div>

        {/* Employee details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-sm">
          <div>
            <p className="text-neutral-500 dark:text-neutral-300">Employee</p>
            <p className="font-medium">{slip.employeeName}</p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-300">Employee ID</p>
            <p className="font-medium">{employee?.employeeCode ?? "—"}</p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-300">Department</p>
            <p className="font-medium">{slip.department}</p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-300">Position</p>
            <p className="font-medium">{slip.position}</p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-300">Payment Method</p>
            <p className="font-medium">Bank Transfer</p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-300">Status</p>
            <p className="font-medium">{slip.status}</p>
          </div>
        </div>

        {/* Earnings / Deductions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h6 className="font-semibold mb-2">Earnings</h6>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-300">Basic Pay</span>
                <span>{gbp(basicPay)}</span>
              </div>
              {extraEarnings.map((line) => (
                <div key={line.id} className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-300">{line.description}</span>
                  <span>{gbp(line.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-1.5 border-t border-neutral-200 dark:border-slate-600">
                <span>Gross Pay</span>
                <span>{gbp(slip.gross)}</span>
              </div>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mb-2">Deductions</h6>
            <div className="space-y-1.5 text-sm">
              {itemisedDeductions.length > 0 ? (
                itemisedDeductions.map((line) => (
                  <div key={line.id} className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-300">{line.type}</span>
                    <span className="text-red-500">−{gbp(line.amount)}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-300">Tax & National Insurance</span>
                    <span className="text-red-500">−{gbp(slip.taxAndNI)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-300">Pension</span>
                    <span className="text-red-500">−{gbp(slip.pension)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between font-semibold pt-1.5 border-t border-neutral-200 dark:border-slate-600">
                <span>Total Deductions</span>
                <span className="text-red-500">−{gbp(totalDeductions)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net pay */}
        <div className="flex items-center justify-between rounded-lg bg-primary/10 px-5 py-4 mb-6">
          <span className="font-semibold">Net Pay</span>
          <span className="text-xl font-semibold text-primary">{gbp(slip.netPay)}</span>
        </div>

        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          This is a computer-generated payslip and does not require a signature.
        </p>
      </div>
    </>
  );
}
