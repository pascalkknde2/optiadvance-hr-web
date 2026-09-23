import { payrollRuns } from "@/mocks/payroll-runs";
import { salaries } from "@/mocks/salaries";

export type PayslipStatus = "Issued" | "Processing";

export interface Payslip {
  id: string;
  period: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof salaries)[number]["avatar"];
  department: string;
  position: string;
  gross: number;
  taxAndNI: number;
  pension: number;
  netPay: number;
  status: PayslipStatus;
}

const deductionRateByGrade: Record<string, number> = {
  Leadership: 0.32,
  Senior: 0.28,
  Mid: 0.24,
  Junior: 0.18,
};

const PENSION_RATE = 0.05;

export const payslipPeriods = payrollRuns
  .filter((run) => run.status !== "Draft")
  .map((run) => ({ period: run.period, status: run.status === "Paid" ? "Issued" : "Processing" as PayslipStatus }));

export const payslips: Payslip[] = payslipPeriods.flatMap(({ period, status }) =>
  salaries.map((salary) => {
    const gross = Math.round(salary.annualSalary / 12);
    const totalRate = deductionRateByGrade[salary.grade] ?? 0.22;
    const pension = Math.round(gross * PENSION_RATE);
    const taxAndNI = Math.round(gross * (totalRate - PENSION_RATE));
    const netPay = gross - taxAndNI - pension;

    return {
      id: `${salary.employeeId}-${period}`,
      period,
      employeeId: salary.employeeId,
      employeeName: salary.employeeName,
      avatar: salary.avatar,
      department: salary.department,
      position: salary.position,
      gross,
      taxAndNI,
      pension,
      netPay,
      status,
    };
  })
);
