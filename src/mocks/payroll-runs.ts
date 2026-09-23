export type PayrollRunStatus = "Draft" | "Approved" | "Paid";

export interface PayrollRun {
  id: string;
  period: string;
  runDate: string;
  employees: number;
  gross: number;
  employerCosts: number; // employer NI & pension
  deductions: number; // employee tax & deductions
  status: PayrollRunStatus;
}

const withNet = (run: Omit<PayrollRun, "id">, id: string): PayrollRun => ({ id, ...run });

// September figures match the Payroll Summary widget on the dashboard
// (£1.42M gross, £186K employer NI & pension, £146K deductions, £1.09M net).
export const payrollRuns: PayrollRun[] = [
  withNet({ period: "October 2026", runDate: "26 Oct 2026", employees: 1291, gross: 1435000, employerCosts: 188000, deductions: 148000, status: "Draft" }, "pr-8"),
  withNet({ period: "September 2026", runDate: "28 Sep 2026", employees: 1284, gross: 1420000, employerCosts: 186000, deductions: 146000, status: "Approved" }, "pr-7"),
  withNet({ period: "August 2026", runDate: "28 Aug 2026", employees: 1258, gross: 1385000, employerCosts: 181000, deductions: 142000, status: "Paid" }, "pr-6"),
  withNet({ period: "July 2026", runDate: "29 Jul 2026", employees: 1240, gross: 1355000, employerCosts: 177000, deductions: 139000, status: "Paid" }, "pr-5"),
  withNet({ period: "June 2026", runDate: "26 Jun 2026", employees: 1230, gross: 1340000, employerCosts: 175000, deductions: 137000, status: "Paid" }, "pr-4"),
  withNet({ period: "May 2026", runDate: "29 May 2026", employees: 1225, gross: 1325000, employerCosts: 173000, deductions: 135000, status: "Paid" }, "pr-3"),
  withNet({ period: "April 2026", runDate: "28 Apr 2026", employees: 1215, gross: 1310000, employerCosts: 171000, deductions: 134000, status: "Paid" }, "pr-2"),
];

export const netPay = (run: PayrollRun) => run.gross - run.employerCosts - run.deductions;
