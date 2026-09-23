import { deductionLines, deductionsPeriod } from "@/mocks/deductions";
import { earningLines, earningsPeriod } from "@/mocks/earnings";
import type { Payslip } from "@/mocks/payslips";

export const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

/**
 * Itemised earnings/deductions only exist for the most recent payroll
 * period (the one mocks/earnings.ts and mocks/deductions.ts are seeded
 * for). Older payslips fall back to the summary figures already on the
 * Payslip record so nothing here disagrees with the Payslips table.
 */
export function getPayslipBreakdown(slip: Payslip) {
  const isCurrentPeriod = slip.period === earningsPeriod && slip.period === deductionsPeriod;
  const extraEarnings = isCurrentPeriod ? earningLines.filter((line) => line.employeeId === slip.employeeId) : [];
  const extraTotal = extraEarnings.reduce((sum, line) => sum + line.amount, 0);
  const basicPay = slip.gross - extraTotal;
  const itemisedDeductions = isCurrentPeriod ? deductionLines.filter((line) => line.employeeId === slip.employeeId) : [];

  return { isCurrentPeriod, basicPay, extraEarnings, itemisedDeductions };
}
