import { employees } from "@/mocks/employees";
import { overtimeRequests } from "@/mocks/overtime";

export type EarningType = "Overtime" | "Commission" | "Bonus" | "Allowance";

export interface EarningLine {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  type: EarningType;
  description: string;
  amount: number;
}

const byId = new Map(employees.map((employee) => [employee.id, employee]));

const earningsFor = (
  employeeId: string,
  type: EarningType,
  description: string,
  amount: number,
  suffix: string
): EarningLine => {
  const employee = byId.get(employeeId)!;
  return {
    id: `${employeeId}-${suffix}`,
    employeeId,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
    type,
    description,
    amount,
  };
};

// Overtime earnings for the period reuse the already-approved/paid overtime
// requests, so the two pages never disagree.
const overtimeLines: EarningLine[] = overtimeRequests
  .filter((request) => request.status === "Approved" || request.status === "Paid")
  .map((request) =>
    earningsFor(request.employeeId, "Overtime", request.reason, request.hours * request.rate, request.id)
  );

const commissionLines: EarningLine[] = [
  earningsFor("16", "Commission", "September new-business commission", 1200, "comm"),
  earningsFor("4", "Commission", "September new-business commission", 850, "comm"),
  earningsFor("10", "Commission", "September new-business commission", 320, "comm"),
];

const bonusLines: EarningLine[] = [
  earningsFor("17", "Bonus", "Recognition — incident response", 500, "bonus"),
  earningsFor("3", "Bonus", "Q3 performance bonus", 750, "bonus"),
];

const remoteAllowanceIds = ["8", "17", "5", "13", "20"];
const allowanceLines: EarningLine[] = remoteAllowanceIds.map((id) =>
  earningsFor(id, "Allowance", "Home working allowance", 40, "allowance")
);

export const earningsPeriod = "September 2026";

export const earningLines: EarningLine[] = [
  ...overtimeLines,
  ...commissionLines,
  ...bonusLines,
  ...allowanceLines,
];

export const earningTypes: EarningType[] = ["Overtime", "Commission", "Bonus", "Allowance"];
