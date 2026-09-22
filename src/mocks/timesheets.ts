import { employees } from "@/mocks/employees";

export type TimesheetStatus = "Approved" | "Submitted" | "Draft" | "Rejected";

export interface Timesheet {
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  days: number[]; // Mon–Fri
  total: number;
  status: TimesheetStatus;
  note?: string;
}

export const timesheetWeek = "15–19 Sep 2026";

const dayPatterns: number[][] = [
  [8, 8, 8, 8, 7.5],
  [8, 8, 8, 8, 8],
  [7.5, 8, 8, 7.5, 8],
  [8, 8, 8.5, 8, 7.5],
];

const overrides: Record<string, { days: number[]; status: TimesheetStatus; note?: string }> = {
  "6": { days: [8, 8, 0, 0, 0], status: "Approved", note: "Annual leave from Wed" },
  "16": { days: [0, 0, 8, 8, 8], status: "Approved", note: "Sick leave Mon–Tue" },
  "1": { days: [8, 8, 8, 8, 7.5], status: "Submitted" },
  "5": { days: [8, 8, 8, 8.5, 8], status: "Submitted" },
  "13": { days: [8, 8, 8, 8, 8], status: "Submitted" },
  "9": { days: [8, 8, 8, 0, 0], status: "Draft", note: "Not yet submitted" },
  "12": { days: [8, 9, 8, 6, 8], status: "Rejected", note: "Hours don't match clock-in log — resubmit" },
};

export const timesheets: Timesheet[] = employees
  .filter((employee) => employee.status !== "Inactive")
  .map((employee, index) => {
    const override = overrides[employee.id];
    const days = override?.days ?? dayPatterns[index % dayPatterns.length];
    const total = Math.round(days.reduce((sum, hours) => sum + hours, 0) * 10) / 10;

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      avatar: employee.avatar,
      department: employee.department,
      days,
      total,
      status: override?.status ?? "Approved",
      note: override?.note,
    };
  });
