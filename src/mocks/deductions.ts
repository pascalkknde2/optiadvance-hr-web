import { employees } from "@/mocks/employees";
import { payslipPeriods, payslips } from "@/mocks/payslips";

export type DeductionType = "Income Tax" | "National Insurance" | "Pension" | "Student Loan" | "Season Ticket Loan";

export interface DeductionLine {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  type: DeductionType;
  amount: number;
}

export const deductionsPeriod = payslipPeriods[0]?.period ?? "";

const currentPayslips = payslips.filter((slip) => slip.period === deductionsPeriod);

// Statutory deductions, derived from each payslip's combined tax & NI and
// pension figures so this page never disagrees with Payslips.
const statutoryLines: DeductionLine[] = currentPayslips.flatMap((slip) => {
  const incomeTax = Math.round(slip.taxAndNI * 0.65);
  const nationalInsurance = slip.taxAndNI - incomeTax;

  return [
    { id: `${slip.employeeId}-tax`, employeeId: slip.employeeId, employeeName: slip.employeeName, avatar: slip.avatar, department: slip.department, type: "Income Tax" as const, amount: incomeTax },
    { id: `${slip.employeeId}-ni`, employeeId: slip.employeeId, employeeName: slip.employeeName, avatar: slip.avatar, department: slip.department, type: "National Insurance" as const, amount: nationalInsurance },
    { id: `${slip.employeeId}-pension`, employeeId: slip.employeeId, employeeName: slip.employeeName, avatar: slip.avatar, department: slip.department, type: "Pension" as const, amount: slip.pension },
  ];
});

// A handful of employees also have voluntary/loan deductions this period.
const voluntaryOverrides: { employeeId: string; type: DeductionType; amount: number }[] = [
  { employeeId: "11", type: "Student Loan", amount: 85 }, // Olivia Bennett
  { employeeId: "13", type: "Student Loan", amount: 42 }, // Isabella Rossi
  { employeeId: "2", type: "Season Ticket Loan", amount: 120 }, // Daniel Osei
];

const voluntaryLines: DeductionLine[] = voluntaryOverrides
  .map(({ employeeId, type, amount }) => {
    const slip = currentPayslips.find((s) => s.employeeId === employeeId);
    if (!slip) return null;
    return {
      id: `${employeeId}-${type}`,
      employeeId,
      employeeName: slip.employeeName,
      avatar: slip.avatar,
      department: slip.department,
      type,
      amount,
    };
  })
  .filter((line): line is DeductionLine => line !== null);

export const deductionLines: DeductionLine[] = [...statutoryLines, ...voluntaryLines];

export const deductionTypes: DeductionType[] = [
  "Income Tax",
  "National Insurance",
  "Pension",
  "Student Loan",
  "Season Ticket Loan",
];
